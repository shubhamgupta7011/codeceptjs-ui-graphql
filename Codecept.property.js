module.exports = {

  browser: 'chrome',
  headless: false,
  args: ['--headless', '--disable-gpu', '--window-size=1325x744', '--no-sandbox', '--disable-dev-shm-usage'],
  uniqueBrowser: false,
  browserSize: 'maximize',
  keepCookies: true,
  waitForTimeout: 10000,

  //put latest for latest version or put a version of driver
  browserVersion:"latest",

  // report portal
  reportPortal: false,

  // start server manually for parallel execution
  bootstrapAll: false,
  teardownAll: false,

  // In which environment you want to run
  env: 'int-g1ds',

};
