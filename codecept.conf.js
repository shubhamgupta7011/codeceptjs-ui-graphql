const { include, gherkin } = require('./config/BddConfig');
const {WebDriver,Puppeteer, REST, GraphQL} = require('./config/WebHelpersConfig');
const plugins = require('./config/Plugins');
const browser = ["chrome", "chrome", "chrome", "chrome"];
const hooks = require('./config/BootStrapAndTearDownHooks');

exports.config = {
    output: './output',

    multiple: {
        default: {grep: '@Sm3', browsers: browser[0]},
        group1: {grep: '@Sm1', browsers: browser[1]},
        group2: {grep: '@Sm2', browsers: browser[2]},
        group3: {grep: '@Sm4', browsers: browser[3]},
    },

    /* config to support Parallel execution via browser stack */

    /*multiple: {
        basic: {
            grep: "@browserStack",
            outputName: "browserStack",
            browsers: [
                {
                    browser: "Chrome",
                    "desiredCapabilities": {
                        'os': 'Windows',
                        'os_version': '8',
                        'project': 'dan-client-mgt',
                        'browser_version': '79',
                        'build': 'Parallel_UI',
                        'name': 'Parallel Test: Chrome-@browserStack',
                        'browserstack.debug': 'true',
                        'browserstack.networkLogs': 'true'
                    }
                },
                {
                    browser: "Firefox",
                    "desiredCapabilities": {
                        'os': 'Windows',
                        'os_version': '8.1',
                        'project': 'dan-client-mgt',
                        'browser_version': '78',
                        'build': 'Parallel_UI',
                        'name': 'Parallel Test: Firefox-@browserStack',
                        'browserstack.debug': 'true',
                        'browserstack.networkLogs': 'true'
                    }
                }
            ]
        }
    },
*/

 /*multiple: {
        smoke: {
            browsers: [
                {
                    browser: 'Safari',
                    desiredCapabilities: {
                        version: '13',
                        platform: 'Mac OSX 10.15',
                        name: 'CLM Safari Parallel',
                    }
                },
                {
                    browser: "Chrome",
                    desiredCapabilities: {
                        version: '88',
                        platform: 'Windows 10',
                        name: 'CLM Chrome 88 Parallel',
                    }
                },
                {
                    browser: "Chrome",
                    desiredCapabilities: {
                        version: '79',
                        platform: 'Windows 10',
                        name: 'CLM Chrome 79 Parallel',
                    }
                },
                {
                    browser: "Chrome",
                    desiredCapabilities: {
                        version: '81',
                        platform: 'Windows 10',
                        name: 'CLM Chrome 81 Parallel',
                    }
                },
                {
                    browser: "Chrome",
                    desiredCapabilities: {
                        version: '86',
                        platform: 'Windows 10',
                        name: 'CLM Chrome 86 Parallel',
                    }
                },
            ],
        },
    },
    */


    helpers: {
        Puppeteer, REST, GraphQL,
        customHelper: { require: './factories/support/MyHelper.js' }
    },

    bootstrapAll: hooks.setBootstrap,
    teardownAll: hooks.setTeardown,
    bootstrap: hooks.setBootstrap,
    teardown: hooks.setTeardown,

    include,
    gherkin,

    plugins: plugins,

    name: 'Codeceptjs-Skeleton'
};
