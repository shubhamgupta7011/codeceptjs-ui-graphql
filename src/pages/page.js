const Browser = require('../../factories/browser');
const Excel = require('../../factories/filesSystem/fileHandeler');
const commonConfig = require('../config/common.config');
const envConfig = require('../../config/EnvConfig');
const data = require('../data');

class Page {
    browser;
    excel;
  
    constructor() {
      this.browser = new Browser();
      this.excel = Excel;
    }

    get appUser() {
      const username = process.env.username || '';
      const password = process.env.password || '';
      if (username && password) {
        return {
          username,
          password,
        };
      }
      throw new Error('App user credentials unavailable!!');
    }

    get siteLanguage() {
      return;
    }
  
    get testEnvironment() {
      return envConfig.env
    }

    get appURL() {
      return envConfig[envConfig.env].web
    }

    get serverURL() {
      return envConfig[envConfig.env].server
    }

    get apiEndPoint() {
      return envConfig[envConfig.env].service;
    }

    get testData(){
      return data;
    }

    get appTimeout() {
      return commonConfig.TIMEOUT_IN_SECS;
    }
}

module.exports = Page;