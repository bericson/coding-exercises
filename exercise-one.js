exports = typeof window === 'undefined' ? global : window;

exports.exerciseOneMethods = {

  firstTestMethod: function(string) {
    return string;
  },

  // Write some code that will accept an amount and convert it to the appropriate string representation.
  // Example:
  // Convert 2523.04
  // to "Two thousand five hundred twenty-three and 04/100 dollars"

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