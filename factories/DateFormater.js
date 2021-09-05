let monthInShortWords = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'];
let numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const date = {

    format(date, dateFormat) {
        let newDate = new Date(date);

        if (dateFormat.includes('DD')) {
            dateFormat = dateFormat.replace('DD', ('0' + newDate.getDate()).slice(-2));
        }
        if (dateFormat.includes('MMMM')) {
            dateFormat = dateFormat.replace('MMMM', monthNames[newDate.getMonth()]);
        }
        if (dateFormat.includes('MMM')) {
            dateFormat = dateFormat.replace('MMM', monthInShortWords[newDate.getMonth()]);
        }
        if (dateFormat.includes('MM')) {
            dateFormat = dateFormat.replace('MM', ('0' + (newDate.getMonth() + 1)).slice(-2));
        }
        if (dateFormat.includes('M')) {
            dateFormat = dateFormat.replace('M', (newDate.getMonth() + 1));
        }
        if (dateFormat.includes('YYYY')) {
            dateFormat = dateFormat.replace('YYYY', newDate.getFullYear());
        }
        if (dateFormat.includes('YY')) {
            dateFormat = dateFormat.replace('YY', ('' + newDate.getFullYear()).slice(-2));
        }
        if (dateFormat.includes('EE')) {
            dateFormat = dateFormat.replace('EE', days[newDate.getDay()]);
        }
        if (dateFormat.includes('E')) {
            dateFormat = dateFormat.replace('E', day[newDate.getDay()]);
        }
        if (dateFormat.includes('HH')) {
            dateFormat = dateFormat.replace('HH', ('0' + newDate.getHours()).slice(-2));
        }
        if (dateFormat.includes('hh')) {
            dateFormat = dateFormat.replace('hh', ('0' + (newDate.getHours() > 12 ? newDate.getHours() - 12 : newDate.getHours())).slice(-2));
        }
        if (dateFormat.includes('a')) {
            dateFormat = dateFormat.replace('a', newDate.getHours() >= 12 ? 'PM' : 'AM');
        }
        if (dateFormat.includes('mm')) {
            dateFormat = dateFormat.replace('mm', ('0' + newDate.getMinutes()).slice(-2));
        }
        if (dateFormat.includes('ss')) {
            dateFormat = dateFormat.replace('ss', ('0' + newDate.getSeconds()).slice(-2));
        }
        return dateFormat;
    },

    isLeapYear(year){
        if (year % 400 === 0) {  return true;}
        if (year % 100 === 0){ return false;}
        return year % 4 === 0;
    },

    getNumberOfDaysInMonth(date) {
        let newDate = new Date(date);
        if (this.isLeapYear(newDate.getFullYear())) { numberOfDays[1] = numberOfDays[1] + 1; }
        return numberOfDays[newDate.getMonth()]
    },

};

module.exports = date;

//console.log(date.format(new Date(), 'DD/MM/YY hh:mm:ss a'));
