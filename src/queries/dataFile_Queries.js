const I = actor();
const genericMethod = require('../../factories/GenericFuctions');

module.exports = {

    async getData() {
        let token = await genericMethod.getOktaToken();
        return await I.sendQuery(
            `query {
                 getDataSource {
                    results {
                        ID
                        connection_name
                        data_provider
                        FileTypes{
                            ID
                            Name
                        }
                    }
                 }
            }`, {}, {}, {"Authorization": token}
        );
    },

    async getDataFile_MetaData(id) {
        let token = await genericMethod.getOktaToken();
        return await I.sendQuery(
            `query{ 
                getMetaData(id:"${id}"){
                        number_of_lines
                }
            }`, {}, {}, {"Authorization": token}
        );
    },

    async getDataFile_Records(id, start, end) {
        let token = await genericMethod.getOktaToken();
        return await I.sendQuery(
            `query {
                  getRecords(id:"${id}",start:${start},total: ${end})  {
                        lines   
                  }
            }`, {}, {}, {"Authorization": token}
        );
    },

};
