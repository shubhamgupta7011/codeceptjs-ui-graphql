const I = actor();
const browserConfig = require('./browser-config');
const apiConfig = require('./api-config');

class Browser {
  apiConfig;
  browserConfig;

  constructor() {
    this.browserConfig = browserConfig;
    this.apiConfig = apiConfig;
    this.browser = I;
  }

  /**
   * Use to attach files in dropdown
   * @param selector
   * @param path of the file
   * @param timeout for optional wait
   * @returns {this} for command chaining
   */
  browseFile = (selector,filePath, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT ) => {
    this.browser.waitForVisible(selector,timeout);
    this.browser.attachFile(selector, filePath);
    return this;
  }

  /**
   * wait for timeout
   * @param timeout for optional wait
   * @returns {this} for command chaining
   */
  clockWait = (timeout = browserConfig.DEFAULT_CLOCK_WAIT ) => {
    this.browser.wait(timeout);
    return this;
  }

  /**
   * Navigate to the url
   * @param {String} url
   * @returns {this} for command chaining
   */
  gotoUrl = (url = '') => {
    this.browser.amOnPage(url);
  }

  /**
   * click the element
   * @param {string} selector of element to clicked
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  click = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.waitForEnabled(selector, timeout);
    this.browser.click(selector);
    return this;
  }

  /**
   * double click on the element
   * @param {string} selector of element to clicked
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  doubleClick = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.waitForEnabled(selector, timeout);
    this.browser.doubleClick(selector);
    return this;
  }

  /**
   * right click on the element
   * @param {string} selector of element to clicked
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  rightClick = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.waitForEnabled(selector, timeout);
    this.browser.rightClick(selector);
    return this;
  }

  /**
   * Check the Checkbox or Radio button
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  check = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.waitForEnabled(selector, timeout);
    this.browser.checkOption(selector);
    return this;
  }

  /**
   * Un-Check the Checkbox or Radio button
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  unCheck = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.waitForEnabled(selector, timeout);
    this.browser.uncheckOption(selector);
    return this;
  }

  /**
   * To clear input field fourcely
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  forceClearFields = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.click(selector);
    this.browser.pressKey(['\uE009', 'a', '\uE009']);
    this.browser.pressKey('Backspace');
    return this;
  }

  /**
   * To clear input field
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  clearFields = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.clearField(selector);
    return this;
  }

  /**
   * enter value to the input fields
   * @param {string} selector
   * @param {string} value
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  type = (selector, value, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.fillField(selector, value);
    return this;
  }

  /**
   * enter value to the input fields
   * @param {any} key
   * @returns {this} for command chaining
   */
  press = (key) => {
    this.browser.pressKey(key);
    return this;
  }

  /**
   * select option in selector 
   * @param {string} selector
   * @param {any} option
   * @param {number} timeout
   * @returns {this} for command chaining
   */
  select = (selector, option, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.selectOption(selector, option);
    return this;
  }

  /**
   * Check if element is visible
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isVisible = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.seeElement(selector);
    return this;
  }

  /**
   * check element is not visible
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isNotVisible = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitForInvisible(selector, timeout);
    this.browser.dontSeeElement(selector);
    return this;
  }

  /**
   * Check if element exists
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isExists = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT)  => {
    this.browser.waitForElement(selector, timeout);
    this.browser.seeElementInDOM(selector);
    return this;
  }

  /**
   * Check if element not exists
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isNotExists = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT)  => {
    this.browser.waitForInvisible(selector, timeout);
    this.browser.dontSeeElementInDOM(selector);
    return this;
  }

  /**
   * Check if checkbox is checked
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isChecked = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT)  => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.seeCheckboxIsChecked(selector);
    return this;
  }

    /**
   * Check if checkbox is not checked
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isNotChecked = (selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT)  => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.dontSeeCheckboxIsChecked(selector);
    return this;
  }

  /**
   * Check if element having text
   * @param {string} selector
   * @param {string} textValue
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isHavingText = (selector, textValue, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT)  => {
    this.browser.waitForVisible(selector, timeout);
    this.browser.seeTextEquals(selector,textValue);
    return this;
  }

  /**
   * Check the title of the page
   * @param {string} title
   * @returns {this} for command chaining
   */
  isHavingTitle = (title)  => {
    this.browser.seeInTitle(title);
    return this;
  }

  /**
   * Check endpoint in the current url
   * @param {string} endpoint
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isHavingEndpointInCurrentURL = (endpoint, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT)  => {
    this.browser.waitInUrl(endpoint, timeout);
    this.browser.seeInCurrentUrl(endpoint);
    return this;
  }

  /**
   * Check number of elements present in DOM
   * @param {string} selector
   * @param {number} numberOfElement
   * @param {number} timeout for optional wait
   * @returns {this} for command chaining
   */
  isHavingNumberOfElements = (selector, numberOfElement, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) => {
    this.browser.waitNumberOfVisibleElements(selector, numberOfElement, timeout);
    this.browser.seeNumberOfElements(selector, numberOfElement);
    return this;
  }

  /**
   * to grab text or value from attribute
   * @param {string} selector
   * @param {number} attribute of the element
   * @param {number} timeout for optional wait
   * @returns {string} value of the attribute
   */
  async getTextFromAttribute (selector, attribute, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) {
    this.browser.waitForVisible(selector, timeout);
    return await this.browser.grabAttributeFrom(selector, attribute);
  }

  /**
   * To grab text from element
   * @param {string} selector
   * @param {number} timeout for optional wait
   * @returns {string} text of the element
   */
  async getTextFromElement(selector, timeout = this.browserConfig.ELEMENT_TIMEOUT_SHORT) {
    this.browser.waitForVisible(selector, timeout);
    return await this.browser.grabTextFrom(selector);
  }

  /**
   * grab the Bearer token 
   * @returns {this} for command chaining
   */
  async getToken() {
    let token = await this.browser.executeScript(
      (storage) => localStorage.getItem(storage), 'okta-token-storage');
    token = JSON.stringify(token);
    token = JSON.parse(JSON.parse(token));
    return `Bearer ${token.accessToken.accessToken}`;
  }

  /**
   * To delete the spacific data
   * @param {string} ulr
   * @param {object} request or payload
   * @param {object} require header
   * @returns {object} response
   */
  async deletePayload(url, request, header = this.apiConfig.HEADERS) {
    const axios = require('axios');
    return await axios.delete(url, {
      headers: header,
      data: request
    }).then((response)=>{
     return response.data
    });
  }

  /**
   * To get a perticular or array of data
   * @param {string} ulr
   * @param {object} require header
   * @returns {object} response
   */
  async get(url, header = this.apiConfig.HEADERS){
    return await this.browser.sendGetRequest(url,header).then(
        async (response) => response.data
    );
  }

  /**
   * To insert data
   * @param {string} ulr
   * @param {object} request or payload
   * @param {object} require header
   * @returns {object} response
   */
  async post(url, request, header = this.apiConfig.HEADERS) {
    return await this.browser.sendPostRequest(url, request, header).then(
        async (response) =>  response.data
    );
  }

  /**
   * To update or insert data
   * @param {string} ulr
   * @param {object} request or payload
   * @param {object} require header
   * @returns {object} response
   */
  async put(url, request, header = this.apiConfig.HEADERS){
    return await this.browser.sendPutRequest(url, request, header).then(
        async (response) =>  response.data
    );
  }

  /**
   * To update previous data
   * @param {string} ulr
   * @param {object} request or payload
   * @param {object} require header
   * @returns {object} response
   */
  async update(url, request, header = this.apiConfig.HEADERS){
    return await this.browser.sendPatchRequest(url, request, header).then(
        async (response) =>  response.data
    );
  }

  /**
   * To grab text from element
   * @param {string} ulr
   * @param {object} require header
   * @returns {object} response
   */
  async delete(url, header = this.apiConfig.HEADERS){
    return await this.browser.sendDeleteRequest(url,header).then(
        async (response) => response.data
    );
  } 


  /**
   * To get the data from graphql server using  query string
   * @param {string} queryString
   * @param {object} variables or request
   * @param {object} require headers
   * @returns {object} response
   */
  async query(queryString, variables = {}, options = {}, headers = this.apiConfig.HEADERS) {
    return await this.browser.sendQuery(
        queryString, variables, options, headers
    );
  }

  /**
   * To insert the data into graphql server using mutation string
   * @param {string} mutationString
   * @param {object} variables or request
   * @param {object} require headers
   * @returns {object} response
   */
  async mutation(mutationString, variables = {}, options = {}, headers = this.apiConfig.HEADERS) {
    return await this.browser.sendMutation(
        mutationString, variables, options, headers
    );
  }

}

module.exports = Browser;