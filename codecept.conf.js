const {include, gherkin} = require('./config/BddConfig');
const {WebDriver, REST, GraphQL} = require('./config/WebHelpersConfig');
const browser = ["chrome", "chrome", "chrome", "chrome"];
const hooks = require('./config/BootStrapAndTearDownHooks');
const config = require('./Codecept.property');

const rptoken = process.env.RP_TOKEN;
const rpendpoint = process.env.RP_ENDPOINT;
const rplaunchname = process.env.RP_LAUNCH_NAME;
const env_name = process.env.ENV_NAME;
const core_env = process.env.CORE_ENV;
const app_name = process.env.APP_NAME;
const rp_test_type = process.env.RP_TEST_TYPE;

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

    helpers: {
        WebDriver, REST, GraphQL,
        customHelper: {require: './factories/MyHelper.js'}
    },

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

    bootstrapAll: config.bootstrapAll ? hooks.setBootstrap : null,
    teardownAll: config.teardownAll ? hooks.setTeardown : null,
    bootstrap: config.bootstrapAll ? hooks.setBootstrap : null,
    teardown: config.teardownAll ? hooks.setTeardown : null,

    include,
    gherkin,

    plugins: {
        screenshotOnFail: {enabled: true},

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

        allure: {enabled: true},

        reportportal: config.reportPortal ? {
            enabled: true,
            require: '@reportportal/agent-js-codecept',
            token: rptoken,
            endpoint: rpendpoint,
            launchName: rplaunchname,
            launchAttributes: [
                {
                    'key': 'env',
                    'value': env_name,
                },
                {
                    'key': 'app',
                    'value': app_name,
                },
                {
                    'key': 'test_type',
                    'value': rp_test_type,
                },
                {
                    'key': 'core_env',
                    'value': core_env,
                },
            ],
            projectName: 'media_ecosystem',
            rerun: false,
            debug: true,
            hasStats: false,
        } : null,
    },
    name: 'Codeceptjs-Skeleton'
};
