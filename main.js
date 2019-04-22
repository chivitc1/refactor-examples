const statement = require('./statement');
let playsJson = require('./plays.json');
let invoicesJson = require('./invoices.json');
// console.log(playsJson);

for (let invoice of invoicesJson) {
    let result = statement(invoice, playsJson);
    console.log(result);
}

