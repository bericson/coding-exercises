(function() {

	//// NumberWordMap data object w/ two languages:
	// var NumberWordMapLib = {
	// 	"english" : {
	// 		"baseOne" : {
	// 			"1" : "one",
	// 			"2" : "two",
	// 			"3" : "three",
	// 			"4" : "four",
	// 			"5" : "five",
	// 			"6" : "six",
	// 			"7" : "seven",
	// 			"8" : "eight",
	// 			"9" : "nine"
	// 		},
	// 		"baseTeen" : {
	// 			"1" : "eleven",
	// 			"2" : "twelve",
	// 			"3" : "thirteen",
	// 			"4" : "fourteen",
	// 			"5" : "fifteen",
	// 			"6" : "sixteen",
	// 			"7" : "seventeen",
	// 			"8" : "eighteen",
	// 			"9" : "nineteen"
	// 		},
	// 		"baseTen" : {
	// 			"1" : "ten",
	// 			"2" : "twenty",
	// 			"3" : "thirty",
	// 			"4" : "forty",
	// 			"5" : "fifty",
	// 			"6" : "sixty",
	// 			"7" : "seventy",
	// 			"8" : "eighty",
	// 			"9" : "ninety"
	// 		},
	// 		"baseHundred" : {
	// 			"1" : "hundred"
	// 		},
	// 		"baseThousand" : {
	// 			"1" : "thousand"
	// 		},
	// 		"baseMillion" : {
	// 			"1" : "million"
	// 		},
	// 		"baseBillion" : {
	// 			"1" : "billion"
	// 		},
	// 		"baseTrillion" : {
	// 			"1" : "trillion"
	// 		},
	// 		"currencyNamePlural" : "dollars",
	// 		"currencyNameSingular" : "dollar",
	// 		"conjunctionAnd" : "and"
	// 	},
	// 	"spanish" : {
	// 		"baseOne" : {
	// 			"1" : "uno",
	// 			"2" : "dos",
	// 			"3" : "tres",
	// 			"4" : "cuatro",
	// 			"5" : "cinco",
	// 			"6" : "seis",
	// 			"7" : "siete",
	// 			"8" : "ocho",
	// 			"9" : "nueve"
	// 		},
	// 		"baseTeen" : {
	// 			"1" : "once",
	// 			"2" : "doce",
	// 			"3" : "trece",
	// 			"4" : "catorce",
	// 			"5" : "quince",
	// 			"6" : "dieciséis",
	// 			"7" : "diecisiete",
	// 			"8" : "diecisiete",
	// 			"9" : "diecinueve"
	// 		},
	// 		"baseTen" : {
	// 			"1" : "diez",
	// 			"2" : "veinte",
	// 			"3" : "treinta",
	// 			"4" : "cuarenta",
	// 			"5" : "cincuenta",
	// 			"6" : "sesenta",
	// 			"7" : "setenta",
	// 			"8" : "ochenta",
	// 			"9" : "noventa"
	// 		},
	// 		"baseHundred" : {
	// 			"1" : "cien"
	// 		},
	// 		"baseThousand" : {
	// 			"1" : "mil"
	// 		},
	// 		"baseMillion" : {
	// 			"1" : "millones"
	// 		},
	// 		"baseBillion" : {
	// 			"1" : "mil millones"
	// 		},
	// 		"baseTrillion" : {
	// 			"1" : "un billon"
	// 		},
	// 		"currencyNamePlural" : "dolares",
	// 		"currencyNameSingular" : "dolare",
	// 		"conjunctionAnd" : "y"
	// 	}
	// };

	//var initialInput = "1";
	//var initialInput = "1.45";
	//var initialInput = "29";
	//var initialInput = "329";
	//var initialInput = "7129";
	//var initialInput = "17129.05";
	//var initialInput = "617129";
	//var initialInput = "3617129";
	//var initialInput = "53617129";
	//var initialInput = "853617129";
	//var initialInput = "123234.04333";
	//mainProgram(initialInput, "english");

	var NumberWordMap = {};

	function mainProgram(inputAmt, language) {
		var pathAndFile = "../../data/number-word-map-" + language + ".json";
		console.log("pathAndFile: ", pathAndFile);

		function loadNumberWordMap() {
			return $.ajax({
		    type: "GET",
		    url: pathAndFile,
		  });
		}

		loadNumberWordMap().done(function(resp) {
			NumberWordMap = resp.NumberWordMapLib[0];
			//console.log("NumberWordMap:", NumberWordMap);
			//console.log("NumberWordMap typeof:", typeof NumberWordMap);

			var parsedProcessedInput = parseProcessInput(inputAmt);
			console.log("parsedAndProcessedInput:", parsedProcessedInput);

			renderOutput(inputAmt, parsedProcessedInput);

		}).fail(function() {
			console.log("Failed to load 'NumberWordMap' JSON library object ...")
		});
	};

	function parseProcessInput(inputAmt) {
		//// If number amount happens to have been entered as negative, change to positive
		//// (converting to number type in the process), then split on the decimal into
		//// integer & decimal components
		var input = Math.abs(inputAmt),
				integer = Math.floor(input),
				rawDecimal = input - integer;
		// console.log("integer:", integer);
		// console.log("rawDecimal:", rawDecimal);

		//////// Now that the integer and decimal components have been isolated, process
		//// them separately

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

		var convertedIntegerToWords = convertIntegerToWords(integerNumArr);
		//console.log("convertedIntegerToWords:", convertedIntegerToWords);


		////// Process decimal component
		//// Round the decimal to two places, remove the leading zero and the decimal point
		var filteredDecimal = rawDecimal.toFixed(2).slice(2, 4);

		var decimalResult = filteredDecimal != 00
					? ' ' + NumberWordMap.conjunctionAnd + ' ' + filteredDecimal + '/100'
					: '';

		////// Compose all converted/processed integer/decimal elements together
		var resultComposed;
		if (sumArr(integerNumArr) === 1 && !rawDecimal) {
			//console.log("resultComplete sumArr(integerNumArr):", sumArr(integerNumArr));
			resultComposed = convertedIntegerToWords + ' ' + NumberWordMap.currencyNameSingular;
		} else {
			resultComposed = convertedIntegerToWords + decimalResult + ' ' + NumberWordMap.currencyNamePlural;
		}

		return resultComposed;
	};

	function convertIntegerToWords(integerInputArr) {
		var arrLength = integerInputArr.length, convertedResult;
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
					getHundredRangeName(integerInputArr.slice(-3, 1)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-2, 3));
				break;
			case 4:
				// 7,129
				convertedResult = convertOnesRange(integerInputArr.slice(-4, 1)) + ' ' +
					getThousandRangeName(integerInputArr.slice(-4, 1)) + ' ' +
					convertOnesRange(integerInputArr.slice(-3, 2)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-3, 2)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-2, 4));
				break;
			case 5:
				// 17,129
				convertedResult = convertTensOrTeensRange(integerInputArr.slice(-5, 2)) + ' ' +
					getThousandRangeName(integerInputArr.slice(-5, 2)) + ' ' +
					convertOnesRange(integerInputArr.slice(-3, 3)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-3, 3)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-2, 5));
			 	break;
			case 6:
				// 617,129
				convertedResult = convertOnesRange(integerInputArr.slice(-6, 1)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-6, 1)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-5, 3)) + ' ' +
					getThousandRangeName(integerInputArr.slice(-6, 3)) + ' ' +
					convertOnesRange(integerInputArr.slice(-3, 4)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-3, 4)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-2, 6));
			 	break;
			case 7:
				// 3,617,129
				convertedResult = convertOnesRange(integerInputArr.slice(-7, 1)) + ' ' +
					getMillionRangeName(integerInputArr.slice(-7, 7)) + ' ' +
					convertOnesRange(integerInputArr.slice(-6, 2)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-6, 2)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-5, 4)) + ' ' +
					getThousandRangeName(integerInputArr.slice(-6, 4)) + ' ' +
					convertOnesRange(integerInputArr.slice(-3, 5)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-3, 5)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-2, 7));
			 	break;
			case 8:
				// 53,617,129
				convertedResult = convertTensOrTeensRange(integerInputArr.slice(-8, 2)) + ' ' +
					getMillionRangeName(integerInputArr.slice(-8, 8)) + ' ' +
					convertOnesRange(integerInputArr.slice(-6, 3)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-6, 3)) + ' ' +
					convertTensOrTeensRange(integerInputArr.slice(-5, 5)) + ' ' +
					getThousandRangeName(integerInputArr.slice(-6, 5)) + ' ' +
					convertOnesRange(integerInputArr.slice(-3, 6)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-3, 6)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-2, 8));
			 	break;
			case 9:
				// 853,617,129
				convertedResult = convertOnesRange(integerInputArr.slice(-9, 1)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-9, 9)) + ' ' +
					convertTensOrTeensRange(integerInputArr.slice(-8, 3)) + ' ' +
					getMillionRangeName(integerInputArr.slice(-9, 9)) + ' ' +
					convertOnesRange(integerInputArr.slice(-6, 4)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-6, 4)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-5, 6)) + ' ' +
					getThousandRangeName(integerInputArr.slice(-6, 6)) + ' ' +
					convertOnesRange(integerInputArr.slice(-3, 7)) + ' ' +
					getHundredRangeName(integerInputArr.slice(-3, 7)) + ' ' +
					convertTensTeensOrOnesRange(integerInputArr.slice(-2, 9));
			 	break;
			default:
				var outOfRangeMsg = "Amount not in range ...";
				//console.log(outOfRangeMsg);
				convertedResult = outOfRangeMsg;
				break;
		}

		return ucFirst(convertedResult);
	};

	function convertOnesRange(inputArr) {
		var arrLen = inputArr.length, onesRangeNumName;
		console.log("convertOnesRange inputArr:", inputArr);
		console.log("convertOnesRange arrLen:", arrLen);
		if (inputArr[0] === 0) {
			onesRangeNumName = '';
		}
		else {
			//console.log("inputArr[0]:", inputArr[0]);
			onesRangeNumName = NumberWordMap.baseOne[inputArr[0]];
			console.log("onesRangeNumName:", ucFirst(onesRangeNumName));
		}

		return onesRangeNumName;
	};

	function convertTensRange(inputArr) {
		var arrLen = inputArr.length;
		// console.log("convertTensRange inputArr:", inputArr);
		// console.log("convertTensRange arrLen:", arrLen);
		var tensRangeNumName = NumberWordMap.baseTen[inputArr[0]];
		console.log("tensRangeNumName:", ucFirst(tensRangeNumName));
		return tensRangeNumName;
	};

	function convertTeensRange(inputArr) {
		var arrLen = inputArr.length;
		// console.log("convertTeensRange inputArr:", inputArr);
		// console.log("convertTeensRange arrLen:", arrLen);
		// console.log("inputArr[0]:", inputArr[0]);
		var teensRangeNumName = NumberWordMap.baseTeen[inputArr[0]];
		console.log("teensRangeNumName:", ucFirst(teensRangeNumName));
		return teensRangeNumName;
	};

	function convertTensOrTeensRange(inputArr) {
		var result;
		//console.log("convertTensOrTeensRange inputArr:", inputArr);
		if (inputArr[0] === 0 && inputArr[1] === 0) { result = ''; }
		else if (inputArr[0] === 1 && inputArr[1] === 0) {
			result = convertTensRange(inputArr.slice(-2, 1));
		}
		else if (inputArr[0] === 1 && inputArr[1] !== 0) {
			result = convertTeensRange(inputArr.slice(-1, 2));
		}
		else {
			result = 	convertTensRange(inputArr.slice(-2, 1)) + ' ' +
				convertOnesRange(inputArr.slice(-1, 2));
		}

		return result;
	};

	function convertTensTeensOrOnesRange(inputArr) {
		var result;
		//console.log("convertTensTeensOrOnesRange inputArr:", inputArr);
		if (inputArr[0] === 0 && inputArr[1] === 0) { result = ''; }
		else if (inputArr[0] >= 1 && inputArr[1] === 0) {
			result = convertTensRange(inputArr.slice(-2, 1));
		}
		else if (inputArr[0] === 1 && inputArr[1] !== 0) {
			result = convertTeensRange(inputArr.slice(-1, 2));
		}
		else if (inputArr[0] >= 1) {
			result = convertTensRange(inputArr.slice(-2, 1)) + ' ' +
				convertOnesRange(inputArr.slice(-1, 2));
		}
		else {
			result = convertOnesRange(inputArr.slice(-1, 2));
		}

		return result;
	};

	function sumArr(array) {
		var summedArray = array.reduce(function(a, b) { return a + b; }, 0);
		//console.log("summedArray:", summedArray);
		return summedArray;
	};

	function getHundredRangeName(inputArr) {
		var result;
		//console.log("getHundredRangeName inputArr:", inputArr);
		if (sumArr(inputArr) === 0) { result = ''; }
		else {
			var hundredRangeName = NumberWordMap.baseHundred[1];
			console.log("hundredRangeName:", ucFirst(hundredRangeName));
			result = hundredRangeName;
		}

		return result;
	};

	function getThousandRangeName(inputArr) {
		var result;
		//console.log("getThousandRangeName inputArr:", inputArr);
		if (sumArr(inputArr) === 0) { result = ''; }
		else {
			var thousandRangeName = NumberWordMap.baseThousand[1];
			console.log("thousandRangeName:", ucFirst(thousandRangeName));
			result = thousandRangeName;
		}

		return result;
	};

	function getMillionRangeName(inputArr) {
		var result;
		//console.log("getMillionRangeName inputArr:", inputArr);
		if (sumArr(inputArr) === 0) { result = ''; }
		else {
			var millionRangeName = NumberWordMap.baseMillion[1];
			console.log("millionRangeName:", ucFirst(millionRangeName));
			result = millionRangeName;
		}

		return result;
	};

	function ucFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	function renderOutput(origInputAmt, processedOutput) {
		$("#ConvertedResult").css("display", "block");
		$("#ConvertedResult div:first-child span").text(origInputAmt);
		$("#ConvertedResult div:last-child span").text(processedOutput);
		$("#InputAmt").val("");
		$('#Language option').each(function () {
			if (this.defaultSelected) {
				this.selected = true;
				return false;
			}
		});
	};

	$(function() {
		$("form").on("submit", function(e) {
			e.preventDefault();
			var userInputAmt = $("#InputAmt").val(),
					userLanguageSelection = $("#Language option:selected").val();
			if (!userInputAmt) {
				alert("Please enter an amount to convert in the input field.");
				return;
			} else if (!userLanguageSelection) {
				alert("Please select the language in which you'd like the result displayed.");
				return;
			}
			console.log("userLanguageSelection:", userLanguageSelection);
			mainProgram(userInputAmt, userLanguageSelection);
		});

		//// Actively limit numbers/characters allowed in input field as they are entered
		//// source: http://codepen.io/wuori/pen/LNyYBM
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
