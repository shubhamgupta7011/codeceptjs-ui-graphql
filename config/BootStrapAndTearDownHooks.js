const selenium = require('selenium-standalone');
const config = require('../Codecept.property');

module.exports =  {
    setBootstrap:  config.bootstrap ? () => {
        selenium.start((err, child) => {
            if (err) {
                throw err;
            }
            selenium.__child = child;
        });
    }: null,

    setTeardown: config.teardown ? () => {
        setTimeout(() => {
            try {
                if (selenium.__child) selenium.__child.kill();
            } catch (e) {}
        }, 3000);
    }: null,
};