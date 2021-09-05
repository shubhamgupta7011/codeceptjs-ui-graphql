const I = actor();
const envURL = require('../../config/EnvConfig');
const loginPage = require('../pages/loginPage');
const genericMethod = require('../../factories/GenericFuctions');
let envStatus = envURL.env === 'int-g1ds' || envURL.env === 'nft-g1ds' || envURL.env === 'stg-g1ds';

// const CryptoJS = require("crypto-js");
// const oktaPass = process.env.OKTA_PASS;
// const oktaKey = process.env.OKTA_KEY;

let table = '';

When('User enter credentials', async () => {
    let user = (!envStatus) ? "global.admin1" : 'Daniel.Diego@dan-demo.com';
    let pass = (!envStatus) ? "Sh@kazu!u1" : "DG@plan#~11";
    await loginPage.Login(user,pass);
});

When(/^User login into mapping setting$/, async function () {
    let user = (!envStatus) ? "global.admin1" : 'Daniel.Diego@dan-demo.com';
    let pass = (!envStatus) ? "Sh@kazu!u1" : "ybRY84{@rh";
    await loginPage.tempLogin(user, pass)
});

Given(/^User is on landing page$/, async () => {
    I.amOnPage('');
});

Then(/^User select client, market and application$/, async (input) => {
    if (envStatus) {
        table = table || genericMethod.transformTable(input);
        await loginPage.selectClientAndMarket(table[0]);
        loginPage.switchToFrame();
    }
});

Then(/^verify user is on landing page$/, function () {
    loginPage.verifyUserOnLandingPage()
});
