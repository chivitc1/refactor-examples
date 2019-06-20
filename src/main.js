const { statement, htmlStatement } = require('./statement');
let playsJson = require('./plays.json');
let invoicesJson = require('./invoices.json');

for (let invoice of invoicesJson) {
    let result = statement(invoice, playsJson);
    console.log(result);
}

for (let invoice of invoicesJson) {
    let result = htmlStatement(invoice, playsJson);
    console.log(result);
}
