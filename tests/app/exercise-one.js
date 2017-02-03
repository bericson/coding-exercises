if ( typeof window === 'undefined' ) {
  require('../../app/arrays');
  var expect = require('chai').expect;
}

describe('Exercise One', function() {

  it('A "Hello World!" message should be displayed', function() {
    var string = "Hello World!";
    expect(exOneMethods.firstTestMethod(string)).to.eql(string);
  });

});
