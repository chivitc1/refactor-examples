const TRAGEDY_INITIAL_AMOUNT = 40000;
const COMEDY_INITIAL_AMOUNT = 30000;
const AUDIENCE_NUM_GET_CREDITS = 30;
const TRAGEDY_AUDIENCES_STANDARD = 30;
const COMEDY_AUDIENCES_STANDARD = 20;
const COMEDY_AUDIENCES_EARN_CREDIT = 10;

function createStatementData(invoice, plays) {
    let statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(copy);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function copy(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function createPerformanceCalculator(aPerformance, aPlay) {
        switch (aPlay.type) {
            case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
            case "comedy": return new ComedyCalculator(aPerformance, aPlay)
            default:
                throw new Error(`unknown type: ${aPlay.type}`);
        }
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalAmount() {
        return statementData.performances
            .reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits() {
        return statementData.performances
            .reduce((total, p) => total + p.volumeCredits, 0);
    }
}

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - AUDIENCE_NUM_GET_CREDITS, 0)
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = TRAGEDY_INITIAL_AMOUNT;
        if (this.performance.audience > TRAGEDY_AUDIENCES_STANDARD) {
            result += 1000 * (this.performance.audience - TRAGEDY_AUDIENCES_STANDARD);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = COMEDY_INITIAL_AMOUNT;
        if (this.performance.audience > COMEDY_AUDIENCES_STANDARD) {
            result += 10000 + 500 * (this.performance.audience - COMEDY_AUDIENCES_STANDARD);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / COMEDY_AUDIENCES_EARN_CREDIT);
    }
}

module.exports = createStatementData;
