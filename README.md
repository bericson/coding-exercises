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

#### Process:

* Build a user interface with a single text/number input field and a button for a user to submit an amount for conversion (
as well as some notes about accepted formatting guidelines)

* In the code, build an object that has a mapping of numbers to their English word counterparts. One through nine (1-9), the teen numbers (11-19), and the tens (ten, twenty, thirty, etc.), and also the names for the hundred, thousand, and million placeholder words (arbitrarily chose to give the converter program an upper limit in the millions, i.e., 999,999,999.99.)

* In general, break out and build individual functions, each responsible for as limited a scope of concern as possible

* First, process the user-submitted input: if the input amount consists of a whole number/integer and a decimal, then split the amount into each of these two components

* Coerce the type of the numbers from strings (what the input field submits by default) to numbers, and split the member digits of the whole number/integer amount component into an array

* For processing the conversion of the whole number/integer into the appropriate English word equivalents, use a switch/case statement for primary flow control, taking the number of digits in the supplied input whole number (array) as the argument to conditionally call the individual functions that each process the number according to the index placeholder position it occupies, inserting appropriate words in the appropriate place (hundreds, thousands, millions, etc.), using intuitively-name functions, such as convertOnesRange(), convertTensTeensOrOnesRange(), getHundredRangeName(), getThousandRangeName(), getMillionRangeName(), etc.

* Process the decimal to round it to two decimal places (enforced in the UI by the HTML5 input field, but also reinforced in the program/processing code)

* Compose together the converted/processed output into a single string and insert it into the DOM for display to the user


##### Todos:
* Abstract-out the 'NumberWordMap' object to be an imported module
* Write unit tests (using Mocha and Chai, most likely)