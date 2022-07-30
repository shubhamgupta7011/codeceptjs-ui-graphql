const date = require('./DateFormater');

module.exports = {
  date,

  transformTable(table) {
    const {rows} = table;
    const headerRow = rows.shift();
    const headers = headerRow.cells.map((item) => item.value);
    return rows.map((row) => {
      const obj = {};
      row.cells.forEach((item, index) => {
        obj[headers[index]] = item.value;
      });
      return obj;
    });
  },

  transFormList(table) {
    const {cells} = table.rows[0];
    cells.forEach((item, index) => {
      cells[index] = item.value;
    });
    return cells;
  },

  replaceAll(str, term, replacement) {
    return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
  },

};
