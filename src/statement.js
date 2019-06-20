
function statement(invoice, plays) {
    let statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(copy);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return renderPlainText(statementData, plays);

    function copy(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${aPerformance.play.type}`);
        }
        return result;
    }

    function volumeCreditsFor(aPerformance) {
        let result =0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === aPerformance.play.type)
            result += Math.floor(aPerformance.audience / 10);
        return result
    }

    function totalAmount() {
        let result = 0;
        for (let perf of statementData.performances) {
            result += perf.amount;
        }
        return result;
    }

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of statementData.performances) {
            result += perf.volumeCredits;
        }
        return result;
    }
}

function renderPlainText(data, plays) {
    let result = `Statement for ${data.customer}\n-------------------\n- You ordered:`;
    for (let perf of data.performances) {
        result += `\n---- ${perf.play.name}: ${usd(perf.amount)} (${perf.audience})`;
    }
    result += `\n- Amount owed is ${usd(data.totalAmount)}`;
    result += `\n- You earned ${data.totalVolumeCredits} credits\n`;
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100);
    }
}

module.exports = statement;