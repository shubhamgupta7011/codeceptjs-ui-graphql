const selenium = require('selenium-standalone');

module.exports =  {
    setBootstrap: (done) => {
        selenium.start((err, child) => {
            if (err) {
                throw err;
            }
            selenium.__child = child;
        });
    },

    setTeardown: (done) => {
        setTimeout(() => {
            try {
                if (selenium.__child) selenium.__child.kill();
            } catch (e) {}
        }, 3000);
    },
};