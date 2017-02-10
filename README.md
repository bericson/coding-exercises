Coding Exercise
===============

Explorations in code, solving a prescribed challenge
----------------------------------------------------

### Exercise 1

#### Challenge: 
Write some code that will accept an amount and convert it to the appropriate string representation.
 
#### Example:
Convert 2523.04 to "Two thousand five hundred twenty three and 04/100 dollars"

#### Chosen tools for addressing challenge:
* JavaScript for the main program
* HTML/LESS/CSS for markup & styling of the demo page UI (Bootstrap for grid and basic styling)
* jQuery for DOM manipulation

#### Demo page URL: 
[https://bericson.github.io/coding-exercises/](https://bericson.github.io/coding-exercises/)

To save anyone whom may be interested in looking at the main program source code the trouble of having to poke around, the file to examine lives here: /coding-exercises/app/js/exercise-one.js

#### Process:

* Absolutely no research of other existing solutions/approaches to this challenge was done prior to devising my own (this) solution to the challenge; other solutions were examined only after this solution was 100% complete, just for educational/curiosity purposes

* First, build a user interface with a single text/number input field and a button for a user to submit an amount for conversion (as well as some notes about accepted formatting guidelines)

* In the code, build an object that has a mapping of numbers to their English word counterparts. One through nine (1-9), the teen numbers (11-19), and the tens (ten, twenty, thirty, etc.), and also the names for the hundred, thousand, and million placeholder words (arbitrarily chose to give the converter program an upper limit in the millions, i.e., 999,999,999.99.)

* In general, break out and build individual functions, each responsible for as limited a scope of concern as possible

* Next, process the user-submitted input: if the input amount consists of a whole number/integer and a decimal, then split the amount into each of these two components

* Coerce the type of the numbers from strings (what the input field submits by default) to numbers, and split the member digits of the whole number/integer amount component into an array

* For processing the conversion of the whole number/integer into the appropriate English word equivalents, use a switch/case statement in the main number-to-words conversion function for primary program control flow, taking the number of digits in the supplied input whole number (array) as the argument to conditionally call the individual functions that each process the number according to the index placeholder position it occupies, inserting appropriate words in the appropriate places (hundred, thousand, million, etc.), using intuitively-named functions, such as convertOnesRange(), convertTensTeensOrOnesRange(), getHundredRangeName(), getThousandRangeName(), getMillionRangeName(), etc.

* Process the decimal to round it to two decimal places (enforced in the UI by the HTML5 input field, but also reinforced in the program/processing code)

* Compose together the converted/processed output into a single string and insert it into the DOM for display to the user

* The 'NumberWordMap' object:
** Changed from being defined using Map() to being defined in JSON format
** Added a Spanish language version and abstracted-out this version and the English version into two separate JSON files, and then had them load conditionally via AJAX depending upon user input

* In retrospect, after reviewing other solutions to this challenge, mine seems a bit verbose and perhaps unneccesarily complicated, likely with ample opportunity for refactoring, but, it does seem very clear and readable, thus making it fairly easily maintainabile by others reading/modifying the code in the future

##### Todos:
* Find way(s) to further refactor program code, making it more compact, and relying more on looping/iteration
* Write unit tests (using Mocha and Chai, most likely)
