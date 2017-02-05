
// Write some code that will accept an amount and convert it to the appropriate string representation.
// Example:
// Convert 2523.04
// to "Two thousand five hundred twenty-three and 04/100 dollars"

//// Todos:
// Abstract-out the 'NumberWordMap' object to be an imported module

(function() {

	var NumberWordMap = {
		baseOne: new Map()
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
		
		var convertedIntegerToWords = convertIntegerToWords(integerNumArr);
		console.log("convertedIntegerToWords:", convertedIntegerToWords);
		return convertedIntegerToWords;

		//return integerNumArr;
		// convertDecimalToFraction(decimalNumArr);

		//return integerNumArr.concat(decimalNumArr);
	}

	//function convertDecimalToFraction(decimalInput) {}

	//var initialInput = "9";
	//var initialInput = "29";
	//var initialInput = "100";
	var initialInput = "7000000000";
	//var initialInput = "17129";
	//var initialInput = "617129";
	//var initialInput = "3617129";
	//var initialInput = "53617129";
	//var initialInput = "853617100";
	//var initialInput = "123.54333";
	//var initialInput = "123456789101112.54333";
	mainProgram(initialInput);

	function convertIntegerToWords(integerInputArr) {
		// integerInput == 123456789101112
		// integerInput == 123,456,789,101,112
		// integerNumArr: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 1, 1, 1, 2 ] 
		// integerNumArr.length == 15
		// 15, 14, 13 // 12, 11, 10 // 9, 8 , 7 // 6, 5, 4 // 3, 2, 1
		// trillion, billion, million, thousand, hundred, ten, one
		//placeHolderArr = [ "trillion", "billion", "million", "thousand", "hundred", "ten", "one" ];

		var i = 0,
				arrLength = integerInputArr.length,
				convertedResult,
				sliceRangeHundred;

		console.log("initialInput:", integerInputArr);
		console.log("convertIntegerToWords arrLength:", arrLength);

		switch(arrLength) {
			case 1:
				// 9
				convertedResult = convertOnesRange(integerInputArr.slice(-1, 1));
				break;
			case 2:
				// 29
				convertedResult = convertTensOrTeensRange(integerInputArr);
				break;
			case 3:
				// 129
				convertedResult = convertOnesRange(integerInputArr.slice(-3, 1)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-3, 3)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-2, 3));
				break;
			case 4:
				// 7,129
				convertedResult = convertOnesRange(integerInputArr.slice(-4, 1)) + ' ' + 
													getThousandRangeName(integerInputArr.slice(-4, 4)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-3, 2)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-3, 4)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-2, 4));
				break;
			case 5:			
				// 17,129
				convertedResult = convertTensOrTeensRange(integerInputArr.slice(-5, 2)) + ' ' + 
													getThousandRangeName(integerInputArr.slice(-5, 5)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-3, 3)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-3, 5)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-2, 5));
			 	break;
			case 6:
				// 617,129
				convertedResult = convertOnesRange(integerInputArr.slice(-6, 1)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-6, 6)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-5, 3)) + ' ' + 
													getThousandRangeName(integerInputArr.slice(-6, 6)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-3, 4)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-3, 6)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-2, 6));
			 	break;
			case 7:
				// 3,617,129
				convertedResult = convertOnesRange(integerInputArr.slice(-7, 1)) + ' ' + 
													getMillionRangeName(integerInputArr.slice(-7, 7)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-6, 2)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-6, 6)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-5, 4)) + ' ' + 
													getThousandRangeName(integerInputArr.slice(-4, 4)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-3, 5)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-3, 7)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-2, 7));
			 	break;
			case 8:
				// 53,617,129
				convertedResult = convertTensOrTeensRange(integerInputArr.slice(-8, 2)) + ' ' + 
													getMillionRangeName(integerInputArr.slice(-8, 8)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-6, 3)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-6, 6)) + ' ' + 
													convertTensOrTeensRange(integerInputArr.slice(-5, 5)) + ' ' + 
													getThousandRangeName(integerInputArr.slice(-4, 4)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-3, 6)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-3, 8)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-2, 8));
			 	break;
			case 9:
				// 853,617,129
				convertedResult = convertOnesRange(integerInputArr.slice(-9, 1)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-9, 9)) + ' ' + 
													convertTensOrTeensRange(integerInputArr.slice(-8, 3)) + ' ' + 
													getMillionRangeName(integerInputArr.slice(-9, 9)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-6, 4)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-6, 6)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-5, 6)) + ' ' + 
													getThousandRangeName(integerInputArr.slice(-4, 4)) + ' ' + 
													convertOnesRange(integerInputArr.slice(-3, 7)) + ' ' + 
													getHundredRangeName(integerInputArr.slice(-3, 9)) + ' ' + 
													convertTensTeensOrOnesRange(integerInputArr.slice(-2, 9));
			 	break;			 	
			// case 10:
			// case 11:
			// case 12:
			// case 13:
			// case 14:
			// case 15:
			// 	break;
			default:
				var outOfRangeMsg = "Amount not in range ...";
				console.log(outOfRangeMsg);
				convertedResult = outOfRangeMsg;
				break;			
		}

		function convertOnesRange(inputArr) {
			console.log("convertOnesRange inputArr:", inputArr);
			
			var i = 0, 
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length;

			console.log("convertOnesRange localizedInputArr:", localizedInputArr);
			console.log("convertOnesRange localArrLen:", localArrLen);

			var onesRangeNumName;

			if (localizedInputArr[0] === 0) {
				onesRangeNumName = '';
			}
			else {				
				for (i; i < localArrLen; i++) {
					onesRangeNumName = 	NumberWordMap.baseOne.get(localizedInputArr[i]);
					console.log("onesRangeNumName:", ucFirst(onesRangeNumName));
				}
			}

			return onesRangeNumName;
		}

		function convertTensRange(inputArr) {
			console.log("convertTensRange inputArr:", inputArr);
			
			var i = 0, 
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length;

			console.log("convertTensRange localizedInputArr:", localizedInputArr);
			console.log("convertTensRange localArrLen:", localArrLen);

			for (i; i < localArrLen; i++) {
				var tensRangeNumName = 	NumberWordMap.baseTen.get(localizedInputArr[i]);
				console.log("tensRangeNumName:", ucFirst(tensRangeNumName));
			}

			return tensRangeNumName;
		}

		function convertTeensRange(inputArr) {
			console.log("convertTeensRange inputArr:", inputArr);
			
			var i = 0, 
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length;

			console.log("convertTeensRange localizedInputArr:", localizedInputArr);
			console.log("convertTeensRange localArrLen:", localArrLen);

			for (i; i < localArrLen; i++) {
				var teensRangeNumName = 	NumberWordMap.baseTeen.get(localizedInputArr[i]);
				console.log("teensRangeNumName:", ucFirst(teensRangeNumName));
			}

			return teensRangeNumName;
		}

		function convertTensOrTeensRange(inputArr) {
			console.log("convertTensOrTeensRange inputArr:", inputArr);
			
			var i = 0, 
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length,
					result;

			if (localizedInputArr[0] === 0 && localizedInputArr[1] === 0) { result = ''; }
			else if (localizedInputArr[0] === 1 && localizedInputArr[1] === 0) {
				result = convertTensRange(localizedInputArr.slice(-2, 1));
			}  
			else if (localizedInputArr[0] === 1 && localizedInputArr[1] !== 0) {
				result = convertTeensRange(localizedInputArr.slice(-1, 2));
			}
			else {
				result = convertTensRange(localizedInputArr.slice(-2, 1)) + ' ' +
									convertOnesRange(localizedInputArr.slice(-1, 2));
			}

			return result;
		}

		function convertTensTeensOrOnesRange(inputArr) {
			console.log("convertTensTeensOrOnesRange inputArr:", inputArr);
			
			var i = 0, 
					localizedInputArr = inputArr, 
					localArrLen = localizedInputArr.length,
					result;			

			if (localizedInputArr[0] === 0 && localizedInputArr[1] === 0) { result = ''; } 
			else if (localizedInputArr[0] >= 1 && localizedInputArr[1] === 0) {
				result = convertTensRange(localizedInputArr.slice(-2, 1));;
			} 
			else if (localizedInputArr[0] === 1 && localizedInputArr[1] !== 0) {
				result = convertTeensRange(localizedInputArr.slice(-1, 2));
			} 
			else if (localizedInputArr[0] >= 1) {
				result = convertTensRange(localizedInputArr.slice(-2, 1)) + ' ' +
									convertOnesRange(localizedInputArr.slice(-1, 2));
			}
			else {
				result = convertOnesRange(localizedInputArr.slice(-1, 2));
			}

			return result;
		}

		function sumArr(array) {
			var summedArray = array.reduce(function(a, b) { return a + b; }, 0);
			console.log("summedArray:", summedArray);
			return summedArray;
		}

		function getHundredRangeName(inputArr) {
			var result;
			if (sumArr(inputArr) === 0) { result = ''; }
			else {			
				var hundredRangeName = NumberWordMap.baseHundred.get(1);
				console.log("hundredRangeName:", ucFirst(hundredRangeName));
				result = hundredRangeName;	
			}

			return result;
		}

		function getThousandRangeName(inputArr) {
			var result;
			if (sumArr(inputArr) === 0) { result = ''; }
			else {			
				var thousandRangeName = NumberWordMap.baseThousand.get(1);
				console.log("thousandRangeName:", ucFirst(thousandRangeName));
				result = thousandRangeName;	
			}

			return result;
		}

		function getMillionRangeName(inputArr) {
			var result;
			if (sumArr(inputArr) === 0) { result = ''; }
			else {			
				var millionRangeName = NumberWordMap.baseMillion.get(1);
				console.log("millionRangeName:", ucFirst(millionRangeName));
				result = millionRangeName;	
			}

			return result;
		}

		function getBillionRangeName(inputArr) {
			var result;
			if (sumArr(inputArr) === 0) { result = ''; }
			else {			
				var billionRangeName = NumberWordMap.baseBillion.get(1);
				console.log("billionsRangeName:", ucFirst(billionRangeName));
				result = billionRangeName;	
			}

			return result;
		}

		function getTrllionRangeName(inputArr) {
			var result;
			if (sumArr(inputArr) === 0) { result = ''; }
			else {
				var trillionRangeName = NumberWordMap.baseTrillion.get(1);
				console.log("trillionsRangeName:", ucFirst(trillionRangeName));
				result = trillionRangeName;				
			}

			return result;
		}

		return ucFirst(convertedResult);
	};

	function ucFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function mainProgram(inputAmt) {
		//parseInput(inputAmt);
		var parsedInput = parseInput(inputAmt);
		console.log("parsedInput:", parsedInput);		

		$("#ConvertedResult div:first-child span").text(inputAmt);
		$("#ConvertedResult div:last-child span").text(parsedInput);		
		$("#ConvertedResult").css("display", "block");
		$("#InputAmt").val('');
	}

	$(function() {
		$("form").on("submit", function(e) {
			e.preventDefault();
			var userInputAmt = $("#InputAmt").val();
			if (!userInputAmt) {
				alert("Please enter an amount to convert in the input field.");
				return;
			}
			//console.log(userInputAmt);
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