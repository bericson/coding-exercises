
// Write some code that will accept an amount and convert it to the appropriate string representation.
// Example:
// Convert 2523.04
// to "Two thousand five hundred twenty-three and 04/100 dollars"

(function() {

	var NumberWordMap = {
		baseOne: new Map()
			.set(0, 'zero')
			.set(1, 'one')
			.set(2, 'two')
			.set(3, 'three')
			.set(4, 'four')
			.set(5, 'five')
			.set(6, 'six')
			.set(7, 'seven')
			.set(8, 'eight')
			.set(9, 'nine'),

		baseTeen: new Map()
			.set(1, 'eleven')
			.set(2, 'twelve')
			.set(3, 'thirteen')
			.set(4, 'fourteen')
			.set(5, 'fifteen')
			.set(6, 'sixteen')
			.set(7, 'seventeen')
			.set(8, 'eighteen')
			.set(9, 'nineteen'),

		baseTen: new Map()
			.set(1, 'ten')
			.set(2, 'twenty')
			.set(3, 'thirty')
			.set(4, 'forty')
			.set(5, 'fifty')
			.set(6, 'sixty')
			.set(7, 'seventy')
			.set(8, 'eighty')
			.set(9, 'ninety'),

		baseHundred: new Map()
			.set(1, 'hundred'),

		baseThousand: new Map()
			.set(1, 'thousand'),

		baseMillion: new Map()
			.set(1, 'million'),

		baseBillion: new Map()
			.set(1, 'billion'),

		baseTrillion: new Map()
			.set(1, 'trillion')
	}

	function parseInput(input) {
		// console.log("raw input:", input);
		// console.log("raw input typeof:", typeof input);
		
		//// If number amount happens to have been entered as negative, change to positive 
		//// (converting to number type in the process)
		input = Math.abs(input);
		// console.log("non-negative input:", input);
		// console.log("input typeof:", typeof input);

		var integer = Math.floor(input),
				rawDecimal = input - integer;
		// console.log("integer:", integer);
		// console.log("integer typeof:", typeof integer);
		// console.log("rawDecimal:", rawDecimal);
		// console.log("rawDecimal typeof:", typeof rawDecimal);
		

		//////// Now that the integer and decimal components have been isolated, process 
		//// them in a separate but parallel fashion

		////// Process integer component
		//// Split integer into array of strings
		var integerStringArr = integer.toString().split('');
		//console.log("integerStringArr:", integerStringArr);

		//// Convert the array of integers as strings into array of integers as numbers
		var integerNumArr = [];
		for (var i in integerStringArr) {
			integerNumArr[i] = parseInt(integerStringArr[i], 10);
		}
		//console.log("integerNumArr:", integerNumArr);

		////// Process decimal component		
		//// Round the decimal to two places, remove the leading zero and the decimal point
		var filteredDecimal = rawDecimal.toFixed(2).slice(2, 4);

		//// Split decimal into array of strings
		var filteredDecimalStringArr = filteredDecimal.split('');
		// console.log("filteredDecimal:", filteredDecimal);
		// console.log("filteredDecimal typeof:", typeof filteredDecimal);
		// console.log("filteredDecimalStringArr:", filteredDecimalStringArr);
		// console.log("filteredDecimalStringArr typeof:", typeof filteredDecimalStringArr);

		//// Convert the array of decimals as strings into array of decimals as numbers
		var decimalNumArr = [];
		for (var i in filteredDecimalStringArr) {
			decimalNumArr[i] = parseInt(filteredDecimalStringArr[i], 10);
		}
		//console.log("decimalNumArr:", decimalNumArr);
		
		convertIntegerToWords(integerNumArr);
		// convertDecimalToFraction(decimalNumArr);

		//return integerNumArr.concat(decimalNumArr);
	}

	//function convertDecimalToFraction(decimalInput) {}

	mainProgram("617129");
	//mainProgram("123.54333");
	//mainProgram("123456789101112.54333");
	// one, ten, hundred, thousand, million, billion, trillion

	function convertIntegerToWords(integerInputArr) {
		// integerInput == 123456789101112
		// integerInput == 123,456,789,101,112
		// integerNumArr: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 1, 1, 1, 2 ] 
		// integerNumArr.length == 15
		// 15, 14, 13 // 12, 11, 10 // 9, 8 , 7 // 6, 5, 4 // 3, 2, 1
		// trillion, billion, million, thousand, hundred, ten, one
		var i = 0,
				arrLength = integerInputArr.length;
				//placeHolderArr = [ "trillion", "billion", "million", "thousand", "hundred", "ten", "one" ];

		console.log("convertIntegerToWords arrLength:", arrLength);

		switch(arrLength) {
			case 1:
				convertOnesRange(integerInputArr.slice(-1, 1));
				break;
			case 2:
				convertTensOrTeensRange(integerInputArr);
				break;
			case 3:
				convertOnesRange(integerInputArr.slice(-3, 1));
				getHundredRangeName();
				convertTensTeensOrOnesRange(integerInputArr.slice(-2, 3));
				break;
			case 4:
				convertOnesRange(integerInputArr.slice(-4, 1));
				getThousandRangeName();
				convertOnesRange(integerInputArr.slice(-3, 2));
				getHundredRangeName();
				convertTensTeensOrOnesRange(integerInputArr.slice(-2, 4));
				break;
			case 5:
				convertTensOrTeensRange(integerInputArr.slice(-5, 2));
				getThousandRangeName();
				convertOnesRange(integerInputArr.slice(-3, 3));
				getHundredRangeName();
				convertTensTeensOrOnesRange(integerInputArr.slice(-2, 5));
			 	break;
			case 6:
				convertOnesRange(integerInputArr.slice(-6, 1));
				getHundredRangeName();
				convertTensTeensOrOnesRange(integerInputArr.slice(-5, 3));
				getThousandRangeName();
				convertOnesRange(integerInputArr.slice(-3, 4));
				getHundredRangeName();
				convertTensTeensOrOnesRange(integerInputArr.slice(-2, 6));
				//console.log("integerInputArr.slice(-2, 6)", integerInputArr.slice(-2, 6));
			 	break;

			// case 7:
			// case 8:
			// case 9:
			// case 10:
			// case 11:
			// case 12:
			// case 13:
			// case 14:
			// case 15:
			// 	break;

			default:
				console.log("Number(s) not in range ...");
				break;
		}

		function convertTensOrTeensRange(inputArr) {
			console.log("convertTensOrTeensRange inputArr:", inputArr);
			
			var i = 0, 
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length;

			if (localizedInputArr[0] === 1 && localizedInputArr[1] !== 0) {
				convertTeensRange(localizedInputArr.slice(-1, 2));
			} else if (localizedInputArr[0] === 1 && localizedInputArr[1] === 0) {
				convertTensRange(localizedInputArr.slice(-2, 1));
			} else {
				convertTensRange(localizedInputArr.slice(-2, 1));
				convertOnesRange(localizedInputArr.slice(-1));
			}	
		}

		function convertTensTeensOrOnesRange(inputArr) {
			console.log("convertTensTeensOrOnesRange inputArr:", inputArr);
			
			var i = 0, 
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length;

			if (localizedInputArr[0] === 1 && localizedInputArr[1] !== 0) {
				convertTeensRange(localizedInputArr.slice(-1, 2));
			} else if (localizedInputArr[0] === 1 && localizedInputArr[1] === 0) {
				convertTensRange(localizedInputArr.slice(-2, 1));
			} else {
				convertTensRange(localizedInputArr.slice(-2, 1));
				convertOnesRange(localizedInputArr.slice(-1, 3));
				console.log("convertTensTeensOrOnesRange > convertOnesRange > localizedInputArr.slice(-1, 1)", localizedInputArr.slice(-1, 1));
			}	
		}

		function convertOnesRange(inputArr) {
			console.log("convertOnesRange inputArr:", inputArr);
			
			var i = 0, 
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length;

			console.log("convertOnesRange localizedInputArr:", localizedInputArr);
			console.log("convertOnesRange localArrLen:", localArrLen);

			for (i; i < localArrLen; i++) {
				var onesRangeNumName = 	NumberWordMap.baseOne.get(localizedInputArr[i]);
				console.log("onesRangeNumName:", ucFirst(onesRangeNumName));
			}
		}

		function convertTensRange(inputArr) {		
			console.log("convertTensRange inputArr:", inputArr);
			
			var i = 0, 
					//localizedInputArr = inputArr.slice(-2),
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length;

			console.log("convertTensRange localizedInputArr:", localizedInputArr);
			console.log("convertTensRange localArrLen:", localArrLen);

			for (i; i < localArrLen; i++) {
				var tensRangeNumName = 	NumberWordMap.baseTen.get(localizedInputArr[i]);
				console.log("tensRangeNumName:", ucFirst(tensRangeNumName));
			}
		}

		function convertTeensRange(inputArr) {			
			console.log("convertTeensRange inputArr:", inputArr);
			
			var i = 0, 
					//localizedInputArr = inputArr.slice(1, 2),
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length;

			console.log("convertTeensRange localizedInputArr:", localizedInputArr);
			console.log("convertTeensRange localArrLen:", localArrLen);

			for (i; i < localArrLen; i++) {
				var teensPlaceNumName = 	NumberWordMap.baseTeen.get(localizedInputArr[i]);
				console.log("teensPlaceNumName:", ucFirst(teensPlaceNumName));
			}
		}

		function getHundredRangeName() {
			var hundredsRangeName = NumberWordMap.baseHundred.get(1);
			console.log("hundredsRangeName:", ucFirst(hundredsRangeName));		
		}

		function getThousandRangeName() {
			var thousandsRangeName = NumberWordMap.baseThousand.get(1);
			console.log("thousandsRangeName:", ucFirst(thousandsRangeName));
		}

		function getMillionRangeName() {
			var millionsRangeName = NumberWordMap.baseMillion.get(1);
			console.log("millionsRangeName:", ucFirst(millionsRangeName));
		}

		function getBillionRangeName() {
			var billionsRangeName = NumberWordMap.baseBillion.get(1);
			console.log("billionsRangeName:", ucFirst(billionsRangeName));
		}

		function getTrllionRangeName() {
			var trillionsRangeName = NumberWordMap.baseTrillion.get(1);
			console.log("trillionsRangeName:", ucFirst(trillionsRangeName));
		}

		// function convertMillionsRange(inputArr) {
		// 	switch(arrLength) {
		// 		case 7:
		// 			var millionsPlaceNumName = NumberWordMap.baseOne.get(inputArr[i]) + " " +
		// 																	NumberWordMap.baseMillion.get(1);
		// 			console.log("millionsPlaceNumName:", ucFirst(MillionsPlaceNumName));
		// 			break;
		// 		case 8:
		// 			var millionsPlaceNumName = NumberWordMap.baseOne.get(inputArr[i]) + " " +
		// 																	NumberWordMap.baseMillion.get(1);
		// 			console.log("millionsPlaceNumName:", ucFirst(MillionsPlaceNumName));
		// 			convertTensPlace(inputArr);
		// 			break;
		// 		case 9:	
		// 			convertHundredsPlace(inputArr);
		// 			convertTensPlace(inputArr);
		// 			var millionsPlaceNumName = NumberWordMap.baseOne.get(inputArr[i]) + " " +
		// 																	NumberWordMap.baseMillion.get(1);
		// 			console.log("millionsPlaceNumName:", ucFirst(MillionsPlaceNumName));
		// 			break;
		// 	}
		// }

		// function convertBillionsRange(inputArr) {
		// 	switch(arrLength) {
		// 		case 10:
		// 			var billionsPlaceNumName = NumberWordMap.baseOne.get(inputArr[i]) + " " +
		// 																	NumberWordMap.baseBillion.get(1);
		// 			console.log("billionsPlaceNumName:", ucFirst(billionsPlaceNumName));
		// 			break;
		// 		case 11:
		// 			var billionsPlaceNumName = NumberWordMap.baseOne.get(inputArr[i]) + " " +
		// 																	NumberWordMap.baseBillion.get(1);
		// 			console.log("billionsPlaceNumName:", ucFirst(billionsPlaceNumName));
		// 			convertTensPlace(inputArr);
		// 			break;
		// 		case 12:
		// 			convertHundredsPlace(inputArr);
		// 			convertTensPlace(inputArr);
		// 			var billionsPlaceNumName = NumberWordMap.baseOne.get(inputArr[i]) + " " +
		// 																	NumberWordMap.baseBillion.get(1);
		// 			console.log("billionsPlaceNumName:", ucFirst(billionsPlaceNumName));
		// 			break;
		// 	}
		// }

		// function convertTrillionsRange(inputArr) {
		// 	console.log("convertTrillionsRange inputArr:", inputArr);
			
		// 	var i = 0, 
		// 			localizedInputArr = inputArr.slice(0, 3), 
		// 			localArrLen = localizedInputArr.length;

		// 	console.log("convertTrillionsRange localizedInputArr:", localizedInputArr);
		// 	console.log("convertTrillionsRange localArrLen:", localArrLen);

		// 	switch(localArrLen) {
		// 			case 1:
		// 			  //convertOnesRange(localizedInputArr);
		// 			case 2:
		// 			  // convertOnesRange(localizedInputArr);
		// 			  // convertTensRange(localizedInputArr);
		// 			case 3:
		// 			  convertOnesRange(localizedInputArr);
		// 			  convertTensRange(localizedInputArr);
		// 				convertHundredsRange(localizedInputArr);
		// 			default:
		// 				var trillionsRangeNumName = NumberWordMap.baseTrillion.get(1);
		// 				console.log("trillionsRangeNumName:", ucFirst(trillionsRangeNumName));
		// 	}
		// }

		// console.log("NumberWordMap.baseOne[1]:", NumberWordMap.baseOne.get(1));
		// for (const [key, value] of NumberWordMap.baseOne) {
		//     console.log(key, value);
		// }

		// for (const [key, value] of NumberWordMap.baseTen) {
		//     console.log(key, value);
		// }

	}

	function ucFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function mainProgram(inputAmt) {
		//var userInputAmt = prompt("Please enter the number you'd like to see converted to a long-form textual format.");
		//inputAmtToNumber(userInputAmt);

		parseInput(inputAmt);
		// var parsedInput = parseInput(inputAmt);
		// console.log("parsedInput:", parsedInput);
		// $("#ConvertedResult > h5 > span").text(parsedInput);
	}

	$(function() {
		$("form button").on("click", function(e) {
			e.preventDefault();
			var userInputAmt = $("#InputAmt").val();
			mainProgram(userInputAmt);
		});

		// Crossbrowser workaround for limiting numbers/characters allowed in input field
		// Source: http://codepen.io/wuori/pen/LNyYBM
		$('input[type="number"]').each(function(){
			$(this).on('keyup',function(){
				if ($(this).val() > Number($(this).attr("max"))) {
          val=$(this).val().slice(0, $(this).attr("max").length);
          $(this).val(val);
        }
			});
		});
	});

})();