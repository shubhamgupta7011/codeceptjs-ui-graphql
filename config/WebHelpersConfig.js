const envURL = require('./EnvConfig');
let { HOST_URL } = envURL[envURL.env].web;
let { serverURL } = envURL[envURL.env].server;
const path = require('path');
const downloadDir = path.join(__dirname, '../output/Download');
const config = require('../Codecept.property');

const WebDriver = {
    url: HOST_URL,
    restart: config.uniqueBrowser,
    keepCookies: config.keepCookies,
    windowSize: config.browserSize,
    waitForTimeout: config.waitForTimeout,

    browser: config.browser,

    keepBrowserState: true,
    "desiredCapabilities": {
        "chromeOptions": {
            'args': config.headless ? config.args : ['--window-size=1325x744'],
            "useAutomationExtension": true,
            "prefs": {
                'download.default_directory': downloadDir,
            },
        },

        /* config to support single execution via CBT */

        /*url: HOST_URL,
        browser: 'chrome',
        host: 'hub.crossbrowsertesting.com',
        port: 80,
        user: YOUR_USERNAME,
        key: YOUR_AUTHKEY,
        desiredCapabilities:{
            name: "CLM Tests Single Execution",
            platform: "Windows 10",
            browserName: 'chrome',
            version: '79',
            record_video: 'true',
        },*/
    },


    // browser: 'firefox',
    //  'moz:firefoxOptions': {
    //      args: ["--headless", "--disable-gpu", "--window-size=1325x744", "--no-sandbox", "--disable-dev-shm-usage"],
    //  },
    //  "prefs": {
    //      'download.default_directory': downloadDir,
    // },

    // browser: "internet explorer",
    // desiredCapabilities: {
    //     ieOptions: {
    //         "ie.browserCommandLineSwitches": "-private",
    //         "ie.usePerProcessProxy": true,
    //         "ie.ensureCleanSession": true,
    //     }
    // }

};

const REST = {
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
};

const Puppeteer = {
    url: HOST_URL,
    restart: config.uniqueBrowser,
    windowSize:config.browserSize,
    waitForNavigation: "domcontentloaded",
    waitForAction: 200,
    show: config.headless? false: true ,
    keepCookies: config.keepCookies,
    browser: config.browser,
};

const GraphQL = {
    endpoint: serverURL,
    timeout: 40000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
};


module.exports = {WebDriver, Puppeteer, REST, GraphQL};
