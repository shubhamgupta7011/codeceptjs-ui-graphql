const I = actor();
const envURL = require('../../config/EnvConfig');
let {market, client, appName, CMSCollection} = envURL[envURL.env];
const genericMethod = require('../../factories/GenericFuctions');
const CmsContext = require('../../factories/CMSContent');
const url = require('url');
let envStatus = envURL.env === 'int-g1ds' || envURL.env === 'nft-g1ds' || envURL.env === 'stg-g1ds';
const querystring = require('querystring');

module.exports = {

    fields: {
        profileIcon: '//select/..//span[@icon="chevron-down"]',
        email: '#okta-signin-username',
        password: '//input[@name="password"]',
        nextButton: '//input[@value=\'Next\']',
        verifyButton: '//input[@value="Verify"]',
        oktaGlobal: '//a/span[text()="global"]',
        oktaSignOut: '//span[text()="Logout"]/..',
        logoutButton: '//li[text()=\'Logout\']',
        submitButton: '//input[@id=\'okta-signin-submit\']',
        appHeader: '//div[text()="Data mapping"]',
    },

    landingPage: {
        header: `//h1[text()='Welcome to the Media Ecosystem']`,
        marketAndClientSelector: (clientName, selector) =>
            `//div[text()='${clientName}']/..//div[contains(text(),'${selector}')]/..//input`,
        agreeButton: '//span[text()=\'I agree\']/..',
        acceptButton: '//span[text()=\'Accept cookies\']/..',
        launchButton: clientName => `//div[text()='${clientName}']/..//span[text()='Launch']/..`,
        languageSelector: '//select[@name=\'language\']',
        languageOption: language => `//option[text()='${language}']`,
        frame: `//div[@id='container']//iframe`,
    },

//============================================= CMS ====================================================================

    async changeLanguage(language, collection) {
        I.waitForVisible(this.landingPage.languageSelector, 20);
        I.click(this.landingPage.languageSelector);
        I.waitForVisible(this.landingPage.languageOption(language), 20);
        I.click(this.landingPage.languageOption(language));
        CmsContext.language = language;
        await this.getCMSContentThroughLanguage(collection, CmsContext.language);
    },

    async getCMSContentThroughLanguage(collection, lang) {
        const cmsContent = await genericMethod.getCMSContentFromGraphQL(collection, lang);
        CmsContext[collection] = (cmsContent.status === 200
            && (cmsContent.data.data.getContent.result !== null
                || cmsContent.data.data.getContent.result !== []))
            ? cmsContent.data.data.getContent.result
            : CmsContext[collection];
    },

//======================================================================================================================
//
// ============================================ Okta Login =============================================================
    verifyLoginFields() {
        I.waitForVisible(this.fields.email, 30);
        I.seeElement(this.fields.email);
    },

    fillEmail(user) {
        I.waitForVisible(this.fields.email, 30);
        I.fillField(this.fields.email, user);
    },

    fillPassword(pass) {
        I.waitForVisible(this.fields.password, 30);
        I.fillField(this.fields.password, pass);
    },

    logoutFromME() {
        I.waitForEnabled(this.fields.profileIcon, 20);
        I.click(this.fields.profileIcon);
        I.waitForEnabled(this.fields.oktaSignOut, 20);
        I.click(this.fields.oktaSignOut);
        this.verifyLoginFields();
    },

    loginInOkta(user, pass) {
        this.fillEmail(user);
        I.waitForEnabled(this.fields.nextButton, 20);
        I.click(this.fields.nextButton);
        this.fillPassword(pass);
        I.click(this.fields.verifyButton);
    },

    login(user, pass) {
        this.fillEmail(user);
        this.fillPassword(pass);
        I.click(this.fields.submitButton);
    },

    verifyUserOnLandingPage() {
        I.waitForVisible(this.landingPage.header, 40);
        I.seeElement(this.landingPage.header);
    },

    async Login(user, pass) {
        await I.isPresent(this.fields.email, 10).then(async (isButtonRendered) => {
            if (isButtonRendered === true) {
                if (!envStatus) {
                    this.login(user, pass);
                    I.waitForVisible(this.fields.appHeader, 20);
                } else {
                    this.loginInOkta(user, pass);
                    this.verifyUserOnLandingPage();
                     await this.getCMSContentThroughLanguage(CMSCollection, CmsContext.language);
                }
            }
        });
        await this.acceptCookiesOnLandingPage();
    },

    async tempLogin(user, pass) {
        await I.isPresent(this.fields.email, 20).then(async (isButtonRendered) => {
            if (isButtonRendered === true) {
                if (!envStatus) {
                    this.login(user, pass);
                } else {
                    this.loginInOkta(user, pass);
                }
            }
        });
    },

//======================================================================================================================
//
// ================================ accept cookies and terms and conditation ===========================================

    async acceptCookiesOnLandingPage() {
        if (envStatus) {
            await I.isPresent(this.landingPage.agreeButton, 5).then((status) => {
                if (status) {
                    I.waitForVisible(this.landingPage.agreeButton, 20);
                    I.click(this.landingPage.agreeButton);
                }
            });
            await I.isPresent(this.landingPage.acceptButton, 1).then((status) => {
                if (status) {
                    I.waitForVisible(this.landingPage.acceptButton, 40);
                    I.waitForEnabled(this.landingPage.acceptButton, 40);
                    I.click(this.landingPage.acceptButton);
                }
            });
        }
    },

//======================================================================================================================
//
//===================================== select Client,Market and Application ===========================================

    async selectClientAndMarket(table) {
        if (envStatus) {
            appName = table['application'] || appName;
            market = table['Market'] || market;
            client = table['Client'] || client;
            this.verifyUserOnLandingPage();
            this.selectClient();
            this.selectMarket();
            I.waitForVisible(this.landingPage.launchButton(appName), 40);
            I.click(this.landingPage.launchButton(appName));
        }
    },

    selectMarket() {
        I.waitForVisible(this.landingPage.marketAndClientSelector(appName
            , 'Select an account'), 20);
        I.scrollTo(this.landingPage.marketAndClientSelector(appName
            , 'Select an account'));
        if (market) {
            I.fillField(this.landingPage.marketAndClientSelector(appName,
                'Select an account'), market);
            I.pressKey('Enter');
        } else {
            I.click(`//p[text()="${appName}"]/..//div[text()="Select an account"]/..`);
            I.waitForVisible(`//div[contains(@id,'-option-0')]`, 20);
            I.click(`//div[contains(@id,'-option-0')]`);
        }
    },

    selectApplication(app) {
        I.waitForVisible(`//div[text()="${app}"]/..`, 20);
        I.click(`//div[text()="${app}"]/..`);
    },

    selectClient() {
        this.selectApplication(appName);
        I.waitForElement(this.landingPage.marketAndClientSelector(appName,
            'Select a client'), 20);
        I.scrollTo(this.landingPage.marketAndClientSelector(appName,
            'Select a client'), 20);
        I.fillField(this.landingPage.marketAndClientSelector(appName,
            'Select a client'), client);
        I.pressKey('Enter');
    },

    switchToFrame() {
        if (envStatus) {
            I.waitForVisible(this.landingPage.frame, 40);
            I.switchTo(this.landingPage.frame);
        }
    },

//======================================================================================================================

    async getServiceConfig() {
        let currentURL = await I.grabCurrentUrl();
        if (currentURL.includes('tenantId')) {
            let query = url.parse(currentURL).query;
            let {tenantId, subTenantId, clientCode, marketCode} = querystring.parse(query);
            let serviceConfig = {
                'tenantId': tenantId, 'subTenantId': subTenantId, 'clientCode': clientCode,
            };
            return JSON.stringify((marketCode)
                ? {...serviceConfig, 'marketCode': marketCode}
                : serviceConfig);
        } else {
            let {marketCode, clientCode, tenantId, subTenantId} = envURL[envURL.env];
            let serviceConfig = {
                'tenantId': tenantId, 'subTenantId': subTenantId, 'clientCode': clientCode,
            };
            return JSON.stringify((marketCode)
                ? {...serviceConfig, 'marketCode': marketCode}
                : serviceConfig);
        }
    },
};
