import * as mongoose from 'mongoose';

module.exports = {
    async connectWithMongoDB(mongoUrl) {
        try {
            await mongoose.connect(mongoUrl, {useNewUrlParser: true});
        } catch (error) {
            mongoose.connection.on('error', err => {
                console.log(err);
                //const a =strings.successMessage.publishMessage
            });
        }
    },

    open({mongoUri, testEnv}) {
        return new Promise((resolve, reject) => {
            // Mongoose options
            const options = {
                autoIndex: false, // Don't build indexes
                bufferMaxEntries: 0,
                keepAlive: 1,
                poolSize: 10, // Maintain up to 10 socket connections
                reconnectInterval: 500, // Reconnect every 500ms
                reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
                socketTimeoutMS: 0,
                useNewUrlParser: true,
            };

            // Mock the mongoose for testing purpose using Mockgoose
            // connect to mongo db
            mongoose.connect(mongoUri, options, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            }).then(() => {
                console.log("connected with db")
            });

            mongoose.connection.on('error', (err) => {
                throw new Error(`unable to connect to database: ${mongoUri}`);
            });

        });
    },

    close() {
        mongoose.disconnect().then(() => {
            console.log("disconnected")
        });
    }
};
