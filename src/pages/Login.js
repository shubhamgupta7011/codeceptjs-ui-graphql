const page = require('./page')

class login extends page{
    
    constructor() {
        super();
    }

    selector = {
        SEARCH_FIELD:'//input[@name="q"]',
        FIRST_LINK:'//h3[text()="CodeceptJS"]/..',
        HEADER:'//span[text()="CodeceptJS"]/..',
    }

    navigateToUrl() {
        this.browser.gotoUrl();
    }

    enterTextInSearch(str) {
        this.browser
            .type(this.selector.SEARCH_FIELD, str, 20)
            .press('Enter');
    }

    clickOnfirstLink() {
        this.browser
            .click(this.selector.FIRST_LINK, 20)
    }

    userOncodeceptjsPage() {
        this.browser
            .clockWait(5)
            .isVisible(this.selector.HEADER, 20);
    }
    
}
module.exports = new login()
