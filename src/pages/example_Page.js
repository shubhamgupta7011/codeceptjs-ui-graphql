const I = actor();

module.exports = {
    //static locator example
    //you can use this as this.fields.staticLocator
    fields: {
        staticLocator: "//input[@placeholder='Convention Name']",
        email: "//input",
        //this.fields.email
    },

    //dynamic locator example
    //you can use this as this.fields.dynamicLocator("")
    //do not pass static string as it is in locators

    dynamicLocator(channel) {
        return (`//*[text()='${channel}']/../span/span`);
    },

    exampleFunction() {
        //contain all the logic
        //try to use only local variable
        //Do not use await in every statment
        //do not create global variable in every js file, use models
        // Use dynamic wait insted of hard wait
        I.amOnPage("/");
        I.waitForVisible(this.fields.email, 20);

    },
};
