/* This js file contains some helpers which is use to find out the status of the locator */
const Helper = codecept_helper;
const Window = require('window');
const window = new Window();
const request = require('request');
let YOUR_USERNAME = ``;
let YOUR_AUTHKEY = ``;

class MyHelper extends Helper {

    /* ========================================== Window Handel functions ============================================= */

    /* url :- 'https://webdriver.io'
     windowName:- 'WebdriverIO window'
     windowFeature :- 'width=420,height=230,resizable,scrollbars=yes,status=1'
     */
    async openNewWindow(url, windowName, windowFeature) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        await browser.newWindow(url, windowName, windowFeature)
    }

    async grabWindowHandles() {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        return await browser.getWindowHandles().then((handle) => {
            return handle
        })
    }

    async closeCurrentWindow() {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        await browser.closeWindow()
    }

    async switchToWindow(handle) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        await browser.switchToWindow(handle)
    }

    async maximizeWindowSize() {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        await browser.maximizeWindow()
    }

    /* ================================================================================================================ */


    /* =========================================== Locator State functions ============================================ */

    /* return true or false */

    async isEnable(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForEnabled(textOrLocator, timeout || 5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isPresent(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForElement(textOrLocator, timeout || 5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isTextPresent(text, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForText(text, timeout || 5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isElementVisible(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForVisible(textOrLocator, timeout || 5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async getBrowserLogs() {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        let b = await browser.getLogs("browser");
        if (b === undefined || b === []) {
            console.log('NO BROWSER LOGS');
            return;
        }
        for (let i = 0; i < b.length; i++) {
            console.log(b[i].message)
        }
        return b;
    }

    async getDriverLogs() {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        let b = await browser.getLogs("driver");
        if (b === undefined || b === []) {
            console.log('NO DRIVER LOGS');
            return;
        }
        for (let i = 0; i < b.length; i++) {
            console.log(b[i])
        }
        return b;
    }

    /* ================================================================================================================ */

    /* =================================================CBT HELPERS==================================================== */

    /* ==============================================Capture ScreenShots=============================================== */

    async takeSnapShots() {
        return new Promise((resolve, fulfill) => {
            let sessionId = this.helpers.WebDriver.browser.sessionId;
            let result = {error: false, message: null};

            if (sessionId) {
                request({
                        method: 'POST',
                        uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId + '/snapshots'
                    },
                    function (error, response, body) {
                        if (error) {
                            result.error = true;
                            result.message = error;
                        } else if (response.statusCode !== 200) {
                            result.error = true;
                            result.message = body;
                        } else {
                            result.error = false;
                            result.message = 'success';
                        }
                    }
                )
                    .auth(YOUR_USERNAME, YOUR_AUTHKEY);

            } else {
                result.error = true;
                result.message = 'Session Id was not defined';

            }

            result.error ? fulfill('Fail') : resolve('Pass');
        })
    }

    /* =============================================To get the execution status======================================== */

    /* return Pass or fail */

    async setPass() {
        let session_id = this.helpers.WebDriver.browser.sessionId;
        let result = {error: false, message: null};

        if (session_id) {
            request({
                    method: 'PUT',
                    uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + session_id,
                    body: {'action': 'set_score', 'score': 'pass'},
                    json: true
                },
                function (error, response, body) {
                    if (error) {
                        result.error = true;
                        result.message = error;
                    } else if (response.statusCode !== 200) {
                        result.error = true;
                        result.message = body;
                    } else {
                        result.error = false;
                        result.message = 'success';
                    }
                })
                .auth(YOUR_USERNAME, YOUR_AUTHKEY);
        } else {
            result.error = true;
            result.message = 'Session Id was not defined';
        }
    }

    async setFail() {
        let session_id = this.helpers.WebDriver.browser.sessionId;
        let result = {error: false, message: null};

        if (session_id) {

            request({
                    method: 'PUT',
                    uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + session_id,
                    body: {'action': 'set_score', 'score': 'fail'},
                    json: true
                },
                function (error, response, body) {
                    if (error) {
                        result.error = true;
                        result.message = error;
                    } else if (response.statusCode !== 200) {
                        result.error = true;
                        result.message = body;
                    } else {
                        result.error = false;
                        result.message = 'success';
                    }
                })
                .auth(YOUR_USERNAME, YOUR_AUTHKEY);
        } else {
            result.error = true;
            result.message = 'Session Id was not defined';
        }
    }

    /* ================================================================================================================ */

    /* =================================================== Hooks ====================================================== */

    _init() {

    }

    _before() {
        // remove if not used
    }

    _after() {
        // remove if not used
    }

// _finishTest(){
//
// }

    async _failed() {
        // await this.getBrowserLogs();
        // await this.getDriverLogs();
        // // await this.setFail();        /* To be used while executing via CBT */
    }

    /* To be used while executing via CBT */
// async _passed(test) {
//     await this.setPass();
// }

    /* To be used while executing via CBT */
// async _afterStep(step) {
//     await this.takeSnapShots();
// }

    /* ================================================================================================================== */
}

module.exports = MyHelper;
