var createStatementData = require('./createStatmentData');

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n-------------------\n- You ordered:`;
    for (let perf of data.performances) {
        result += `\n---- ${perf.play.name}: ${usd(perf.amount)} (${perf.audience})`;
    }
    result += `\n- Amount owed is ${usd(data.totalAmount)}`;
    result += `\n- You earned ${data.totalVolumeCredits} credits\n`;
    return result;


}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
}

module.exports = statement;