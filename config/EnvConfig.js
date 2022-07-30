/* you can use url like this:- envURL[envURL.envConfig].web.HOST_URL before this you have to add require this envConfig file.
this envConfig file is use to manage all the URLS of your app you can use multiple base ulr like this:-
I.amOnPage(envURL[envURL.env].web.HOST_URL+"/dashboard")

and also you can use this in
API like this:- I.sendGetRequest(envURL[envURL.env].api.REST_API_ENDPOINT+`/api/...`)

"process.envConfig.e2e_env" is for set envType from node script like
for Windows :- "(SET e2e_env=test) && codeceptjs run --steps"" "
or for linux :- "(e2e_env=test) && codeceptjs run --steps "
for pipeline :- "(e2e_env=test) && npm run test:e2e"
"process.envConfig.AppEnv" is use for set envType from your system variable or test is by default. */

//All the urls should be encoded by URL_ENcode.js

const config = require('../Codecept.property');

const envConfig = {

    env: config.env,

    dev: {
        web: {
            HOST_URL: 'https://www.google.com/',
        },
        
        server: {
            serverURL: '',
        },

        service: {
            serverURL: '',
        },
    },

    test: {
        web: {
            HOST_URL: 'https://www.google.com/',
        },
       
        server: {
            serverURL: '',
        },

        service: {
            serverURL: '',
        },
    },

};

module.exports = envConfig;
