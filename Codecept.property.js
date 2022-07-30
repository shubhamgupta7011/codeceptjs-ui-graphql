const rpToken = process.env.RP_TOKEN || '5b898b25-0ef2-4365-8522-71654351a75e';
const rpEndpoint = process.env.RP_ENDPOINT || 'https://demo.reportportal.io/api/v1';
const rpLaunchname = process.env.RP_LAUNCH_NAME || 'default_TEST_EXAMPLE';
const rpProjectName = process.env.RP_PROJECT_NAME || 'default_personal';
const rpDescription = 'Codecept_+_Cucumber_+_Allure_+_Report_portal_+_Puppeteer_+_webdriverio'
const app_name = 'codeceptjs.io';
const env = process.env.E2E_ENV || 'test'

module.exports = {

  browser: 'chrome',
  headless: false,
  //args: ['--headless', '--disable-gpu', '--window-size=1325x744', '--no-sandbox', '--disable-dev-shm-usage'],
  uniqueBrowser: false,
  browserSize: '1536×864',
  keepCookies: true,
  waitForTimeout: 10000,

  //put latest for latest version or put a version of driver
  browserVersion:"latest",

  // start server manually for parallel execution
  bootstrap: false,
  teardown: false,
  
  // In which environment you want to run
  env: env,

  // report portal
  reportportal: {
    enabled: true,
    require: '@reportportal/agent-js-codecept',
    token: rpToken,
    projectName: rpProjectName,
    endpoint: rpEndpoint,
    launchName: rpLaunchname,
    description: rpDescription,
    launchAttributes: [
        {
            'key': 'env',
            'value': env,
        },
        {
            'key': 'app',
            'value': app_name,
        },
    ],
    rerun: false,
    debug: true,
    hasStats: false,
},

};
