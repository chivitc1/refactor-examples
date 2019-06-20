var expect = require('chai').expect;
var { statement } = require('./statement');

let invoice = {
  "customer": "BigCo",
  "performances": [
      {
          "playID": "hamlet",
          "audience": 55
      },
      {
          "playID": "as­like",
          "audience": 35
      },
      {
          "playID": "othello",
          "audience": 40
      }
  ]
};
let plays = {
  "hamlet": {
      "name": "Hamlet",
      "type": "tragedy"
  },
  "as­like": {
      "name": "As You Like It",
      "type": "comedy"
  },
  "othello": {
      "name": "Othello",
      "type": "tragedy"
  }
};

describe('Statement', function() {
  describe('#statement() - charge for each play', function() {
    it('should return result contain <<Hamlet: $650.00 (55)>>', function() {
      expect(statement(invoice, plays)).contains('Hamlet: $650.00 (55)');
    });
  });

  describe('#statement() - total amount charge', function() {
    it('should return result contain <<Amount owed is $1,730.00>>', function() {
        expect(statement(invoice, plays)).contains('Amount owed is $1,730.00');
    });
  });

  describe('#statement() - earned credits', function() {
    it('should return result contain <<You earned 43 credits>>', function() {
        expect(statement(invoice, plays)).contains('You earned 43 credits');
    });
  });
});
