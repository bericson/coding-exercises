
// Write some code that will accept an amount and convert it to the appropriate string representation.
// Example:
// Convert 2523.04
// to "Two thousand five hundred twenty-three and 04/100 dollars"

(function() {

	var inputAmtToNumber = function(amt) {
		console.log("amtInputRaw:", amt);

		// Check the type on the input amount as provided
		var amtInputRawType = typeof amt;
		console.log("amtInputRawType:", amtInputRawType);

		// Coerce input amount type to be a number (decimal/floating point) regardless of whether 
		// the input amount was a number or a string representation of a number
		var amtAsNum = parseFloat(amt);
		console.log("amtAsNum:", amtAsNum);
		console.log("amtAsNumType:", typeof amtAsNum);

		return amtAsNum;
	}

	//function parseAmtDigits(inputAmtToNumber) {
	function parseInput(input) {
		console.log("raw input:", input);
		console.log("raw input typeof:", typeof input);
		
		// If number amount happens to have been entered as negative, change to positive 
		// (converting to number type in the process)
		input = Math.abs(input);
		console.log("non-negative input:", input);
		console.log("input typeof:", typeof input);

		var integer = Math.floor(input),
				rawDecimal = input - integer;
		console.log("integer:", integer);
		console.log("integer typeof:", typeof integer);
		console.log("rawDecimal:", rawDecimal);
		console.log("rawDecimal typeof:", typeof rawDecimal);
		

		//// Now that the integer and decimal components have been isolated, process 
		// them in a separate but parallel fashion

		// Process integer component
		// Split integer into array of strings
		var integerStringArr = integer.toString().split('');
		console.log("integerStringArr:", integerStringArr);

		// Convert the array of integers as strings into array of integers as numbers
		var integerNumArr = [];
		for (var i in integerStringArr) {
			integerNumArr[i] = parseInt(integerStringArr[i], 10);
		}
		console.log("integerNumArr:", integerNumArr);

		// Process decimal component		
		// Round the decimal to two places, remove the leading zero and the decimal point
		var filteredDecimal = rawDecimal.toFixed(2).slice(2, 4);

		// Split decimal into array of strings
		var filteredDecimalStringArr = filteredDecimal.split('');
		console.log("filteredDecimal:", filteredDecimal);
		console.log("filteredDecimal typeof:", typeof filteredDecimal);
		console.log("filteredDecimalStringArr:", filteredDecimalStringArr);
		console.log("filteredDecimalStringArr typeof:", typeof filteredDecimalStringArr);

		// Convert the array of decimals as strings into array of decimals as numbers
		var decimalNumArr = [];
		for (var i in filteredDecimalStringArr) {
			decimalNumArr[i] = parseInt(filteredDecimalStringArr[i], 10);
		}
		console.log("decimalNumArr:", decimalNumArr);
		
		convertIntegerToWords(integerNumArr);
		convertDecimalToFraction(decimalNumArr);

		//return integerNumArr.concat(decimalNumArr);
	}

	function convertIntegerToWords(integerInput) {

	}

	function convertDecimalToFraction(decimalInput) {

	}

	function mainProgram(userInputAmt) {
		//var userInputAmt = prompt("Please enter the number you'd like to see converted to a long-form textual format.");
		//inputAmtToNumber(userInputAmt);

		parseInput(userInputAmt);
		// var parsedInput = parseInput(userInputAmt);
		// console.log("parsedInput:", parsedInput);
	}

	mainProgram("-1234.54333");

	$(function() {
		//$("form button").on("click", function() {
			//mainProgram();
		//});
	});


	// const baseIntegerMap = new Map()
	// 	.set(1, 'one')
	// 	.set(2, 'two')
	// 	.set(3, 'three')
	// 	.set(4, 'four')
	// 	.set(5, 'five')
	// 	.set(6, 'six')
	// 	.set(7, 'seven')
	// 	.set(8, 'eight')
	// 	.set(9, 'nine')

	// const baseTenIntegerMap = new Map()
	// 	.set(10, 'ten')
	// 	.set(20, 'twenty')
	// 	.set(30, 'thirty')
	// 	.set(40, 'forty')
	// 	.set(50, 'fifty')
	// 	.set(60, 'sixty')
	// 	.set(70, 'seventy')
	// 	.set(80, 'eighty')
	// 	.set(90, 'ninety')

	// const baseHundredIntegerMap = new Map()
	// 	.set(1, 'hundred');

	// const baseThousandIntegerMap = new Map()
	// 	.set(1, 'thousand');

	// const baseMillionIntegerMap = new Map()
	// 	.set(1, 'million');

	// const baseBillionIntegerMap = new Map()
	// 	.set(1, 'billion');

	// const baseTrillionIntegerMap = new Map()
	// 	.set(1, 'trillion');
})();