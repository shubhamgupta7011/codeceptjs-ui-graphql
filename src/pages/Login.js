const I = actor();


module.exports = {

    fields: {},

    navigateToUrl() {
        I.amOnPage("")
    },

    enterTextInSearch(str) {
        I.waitForVisible('//input[@name="q"]', 20);
        I.fillField('//input[@name="q"]', str);
        I.pressKey('Enter')
    },

    clickOnfirstLink() {
        I.waitForVisible('//h3[text()="CodeceptJS"]/..', 20);
        I.click('//h3[text()="CodeceptJS"]/..');
    },

    userOncodeceptjsPage() {
        I.waitForVisible('//span[text()="CodeceptJS"]/..', 20);
        I.seeElement('//span[text()="CodeceptJS"]/..');
    }
};

