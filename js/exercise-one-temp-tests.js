exports = typeof window === 'undefined' ? global : window;

exports.exerciseOneMethods = {

  firstTestMethod: function(string) {
    return string;
  },

  inputAmtToString: function(amt) {
    var amount = toString(amt);
    return amount;
  },

  inputAmtToNumber(amt) {

    console.log("amtInputRaw:", amt);

    // Check the type on the number amount as provided
    var amtInputRawType = typeof amt;
    console.log("amtInputRawType:", amtInputRawType);

    // Coerce input amount type to be a number (decimal/floating point) no matter whether 
    // the input amount was a number or a string representation of a number
    var amtAsNum = parseFloat(amt);
    console.log("amtAsNum:", amtAsNum);
    console.log("amtAsNumType:", typeof amtAsNum);

    return amtAsNum;
  }
};