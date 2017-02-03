if ( typeof window === 'undefined' ) {
  require('../../app/arrays');
  var expect = require('chai').expect;
}

describe('Exercise One', function() {

  it("a 'Hello World!'' message should be displayed", function() {
    var string = "Hello World!";
    expect(exerciseOneMethods.firstTestMethod(string)).to.eql(string);
  });

  it("an amount provided as a 'string' type should be returned as an amount of 'string' type", function() {
     var numericalAmt = "1234.56";
     expect(exerciseOneMethods.inputAmtToString(numericalAmt)).to.be.a('string');
  });

  it("an amount provided as a 'string' type should be returned as an amount of 'number' type", function() {
    var numericalAmt = "1234.56";
    expect(exerciseOneMethods.inputAmtToNumber(numericalAmt)).to.be.a('number');
    //expect(exerciseOneMethods.inputAmtToNumber(numericalAmt)  % 1).to.be.equal(0);
  });

});
