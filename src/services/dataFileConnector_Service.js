const I = actor();
const apiURL = require('../../factories/ApiHelper');
const genericMethod = require('../../factories/GenericFuctions');
const loginPage = require('../pages/login_Page');

const userService = {

    async getDataFileName() {
        const token = await genericMethod.getOktaToken();
        return await I.sendGetRequest(apiURL.getBaseApiUrl('/files/filestore-data-files/'),{
            Authorization: token,
            serviceconfig: await loginPage.getServiceConfig() || {},
        }).then(async (response) => response.data);
    },

};

module.exports = userService;
