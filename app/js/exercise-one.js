(function() {

	function mainProgram(inputAmt, language) {
		var path = "../data/",
				fileName = "number-word-map-" + language + ".json",
				pathAndFileName = path + fileName;
		//console.log("pathAndFileName: ", pathAndFileName);

		$.ajax({
	    type: "GET",
	    url: pathAndFileName,
	  }).done(function(resp) {
			NumberWordMap = resp.NumberWordMapLib[0];
			//console.log("NumberWordMap:", NumberWordMap);
			//console.log("NumberWordMap typeof:", typeof NumberWordMap);

			var parsedProcessedInput = parseProcessInput(inputAmt);
			console.log("parsedAndProcessedInput:", parsedProcessedInput);

			renderOutput(inputAmt, parsedProcessedInput);
		}).fail(function() {
			console.log("Failed to load 'NumberWordMap' JSON ...");
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

		////// Compose all converted/processed integer/decimal elements together
		var resultComposed,
				decimalOnly = sumArr(integerNumArr) !== 0
					? ' ' + NumberWordMap.conjunctionAnd + ' '
					: '',
				decimalResult = filteredDecimal != 00
					? ' ' + decimalOnly + filteredDecimal + '/100'
		 			: '';
		if (integer === 1 && !rawDecimal) {
			resultComposed = convertedIntegerToWords + ' ' + NumberWordMap.currencyNameSingular;
		}
		else if (sumArr(integerNumArr) === 0 && rawDecimal) {
			resultComposed =  decimalResult + ' ' + NumberWordMap.currencyNameSingular;
		}
		else {
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
			//console.log("userLanguageSelection:", userLanguageSelection);
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
