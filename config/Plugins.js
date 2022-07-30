const config = require('../Codecept.property');

const plugins = {
    screenshotOnFail: {enabled: true},
    allure: { enabled: true },
    reportportal: config.reportportal,

    wdio: !config.bootstrapAll && !config.teardownAll ? {
        enabled: true, services: ['selenium-standalone'],
        seleniumArgs: config.browserVersion === 'latest' ? {} : {
            drivers: {
                chrome: {
                    version: config.browserVersion, // Chromedriver version
                    arch: process.arch,
                },
                firefox: {
                    version: config.browserVersion, // Geckodriver version
                    arch: process.arch,
                },
            },
        },
        seleniumInstallArgs: config.browserVersion === 'latest' ? {} : {
            baseURL: 'https://selenium-release.storage.googleapis.com',
            drivers: {
                chrome: {
                    version: config.browserVersion,
                    arch: process.arch,
                    baseURL: 'https://chromedriver.storage.googleapis.com',
                },
                firefox: {
                    version: config.browserVersion,
                    arch: process.arch,
                    baseURL: 'https://github.com/mozilla/geckodriver/releases/download',
                },
            },
        },
    } : {},
}

module.exports = plugins;