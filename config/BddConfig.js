// In this file you have to add path of all the page file over here.
const include = {
    I: './steps_file.js',
};

const gherkin = {
    features: './src/features/*/*/*.feature',
    steps: [
        "./src/step_definitions/web/steps.js"
    ],
};

module.exports = {
    include,
    gherkin,
};
