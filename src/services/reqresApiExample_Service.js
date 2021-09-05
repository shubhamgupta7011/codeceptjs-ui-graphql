const I = actor();
const apiURL = require('../../factories/ApiHelper');

const userService= {

    async getUserNameAPI() {
        return await I.sendGetRequest(apiURL.getBaseApiUrl(`api/users?page=2`))
            .then(async (response) => {
                return response;
            });
    },

    async createUserNameAPI(request) {
        return await I.sendPostRequest(apiURL.getBaseApiUrl(`api/users`)
            , request).then(async (response) => {
            return response.data;
        });
    },
};
module.exports = userService;
