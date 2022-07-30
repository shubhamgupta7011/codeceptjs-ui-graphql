const Client = require('pg').Client;
 let client;
let results;
module.exports = {
//const connectionString = "postgres://mastertenantmgt@mefpoc-postgresql-server-1:bcx6v7375XUhMX46@mefpoc-postgresql-server-1.postgres.database.azure.com:5432/mastertenantmgt?ssl=true";

    async connectToPostGreSQLDB(postGreSQLHost,
                                postGreSQLPort,
                                postGreSQLUser,
                                postGreSQLPassword,
                                postGreSQLSSL,
                                postGreSQLTimeOut,
                                postGreSQLDBName) {
        client = new Client(
            {
                host: postGreSQLHost,
                port: postGreSQLPort,
                user: postGreSQLUser,
                password: postGreSQLPassword,
                database: postGreSQLDBName,
                ssl: postGreSQLSSL,
                query_timeout: postGreSQLTimeOut
            }
        );
           await client.connect();
                console.log('Connected successfully');
    },

    async disconnectFromPostgreSQLDB() {
        await client.end();

    },

  getQuery(query){
      return client.query(query);
  }

};
