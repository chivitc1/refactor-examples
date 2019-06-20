
function statement(invoice, plays) {
    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n-------------------\n- You ordered:`;
    
    for (let perf of invoice.performances) {

        // print line for this order
        result += `\n---- ${playFor(perf).name}: ${usd(amountFor(perf)/100)} (${perf.audience})`;
        totalAmount += amountFor(perf);
    }

    result += `\n- Amount owed is ${usd(totalAmount/100)}`;
    result += `\n- You earned ${totalVolumeCreditsFor()} credits\n`;
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber);
    }
    function totalVolumeCreditsFor() {
        let volumeCredits = 0;
        for (let perf of invoice.performances) {
            volumeCredits += volumeCreditsFor(perf);
        }
        return volumeCredits;
    }

    function volumeCreditsFor(aPerformance) {
        let volumeCredits =0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === playFor(aPerformance).type)
            volumeCredits += Math.floor(aPerformance.audience / 10);
        return volumeCredits
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        let result = 0;
        switch (playFor(aPerformance).type) {
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
                throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
    }
}

module.exports = statement;