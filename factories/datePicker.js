const I = actor();
const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
const genericFunction = require('./GenericFuctions');

module.exports = {

    // from component library
    dateRangePicker(startDate, EndDate, locator) {
        const startDateYear = new Date(startDate).getFullYear();
        const currentYear = new Date().getFullYear();
        const startDateMonth = new Date(startDate).getMonth();
        const currentMonth = new Date().getMonth();
        const startDatePicked = new Date(startDate).getDate();
        const EndDateYear = new Date(EndDate).getFullYear();
        const EndDateMonth = new Date(EndDate).getMonth();
        const EndDatePicked = new Date(EndDate).getDate();

        I.waitForVisible(locator, 20);
        I.waitForEnabled(locator, 20);
        I.scrollTo(locator);
        I.click(locator);
        genericFunction.waitAndClick(`(//option[text()='${currentYear}']/..)[1]`, 20);
        genericFunction.waitAndClick(`(//option[text()='${startDateYear}'])[1]`, 20);
        genericFunction.waitAndClick(`(//option[text()='${months[currentMonth]}']/..)[1]`, 20);
        genericFunction.waitAndClick(`(//option[text()='${months[startDateMonth]}'])[1]`, 20);
        genericFunction.waitAndClick(`(//div[text()='${startDatePicked}'][@aria-disabled='false'])[1]`, 20);
        if (startDateMonth === EndDateMonth && startDateYear === EndDateYear) {
            genericFunction.waitAndClick(`(//div[text()='${EndDatePicked}'][@aria-disabled='false'])[1]`, 20);
        } else {
            genericFunction.waitAndClick(`(//option[text()='${currentYear}']/..)[2]`, 20);
            genericFunction.waitAndClick(`(//option[text()='${EndDateYear}'])[2]`, 20);
            genericFunction.waitAndClick(`(//option[text()='${months[startDateMonth + 1]}']/..)[2]`, 20);
            genericFunction.waitAndClick(`(//option[text()='${months[EndDateMonth]}'])[2]`, 20);
            genericFunction.waitAndClick(`(//div[text()='${EndDatePicked}'][@aria-disabled='false'])[1]`, 20);
        }
    },

    datePickerInput(date, locator) {
        const year = new Date(date).getFullYear();
        const currentYear = new Date().getFullYear();
        const month = new Date(date).getMonth();
        const currentMonth = new Date().getMonth();
        const datePick = new Date(date).getDate();
        genericFunction.waitAndClick(locator, 20);
        genericFunction.waitAndClick(`(//option[text()='${currentYear}']/..)[1]`, 20);
        genericFunction.waitAndClick(`//option[text()='${year}']`, 20);
        genericFunction.waitAndClick(`//option[text()='${months[currentMonth]}']/..`, 20);
        genericFunction.waitAndClick(`//option[text()='${months[month]}']`, 20);
        genericFunction.waitAndClick(`(//div[text()='${datePick}'])[1]`, 20);
    },
};
