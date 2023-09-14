// variables for storing users preference 
// for operation and level of difficulty  
let typeOfOperation = null;
let typeOfDifficulty = null;

// variable for checking if input is provided
let inputChecked = false; 

// reference to where the problem is presented
const equation = document.querySelector('p'); 

// reference to user input for the answer
const answer = document.querySelector('#answer'); 

// variable for storing answer to the problem 
let result = 0; 

// variable for checking if an equation exists 
let equationExists = equation.innerText === 'Equation Goes Here' ? false : true;  
 
function GenerateProblem() { 
    GetOperation(); 
    GetDifficulty(); 
    if(inputChecked){
        GenerateEquation();  
    }
}

function GenerateEquation() {
    
    // get max and min values depending on level of difficulty 
    let max = Math.pow(10, typeOfDifficulty); 
    let min = Math.pow(10, typeOfDifficulty - 1);
     
    // generate a random value for the left and right side 
    // of an operation 
    let randLeft = getRandomIntInclusive(min, max);
    let randRight = getRandomIntInclusive(min, max);  

    switch(typeOfOperation){
        case 'add':
            result = randLeft + randRight; 
            DisplayEquation(randLeft, randRight, '+'); 
            break; 
        case 'subtract': 
            result = randLeft - randRight;
            DisplayEquation(randLeft, randRight, '-'); 
            break; 
        case 'multiply':
            result = randLeft * randRight;
            DisplayEquation(randLeft, randRight, '*'); 
            break;  
        case 'divide': 
            // floor the result so the user can provide the quotient
            result = Math.floor(randLeft / randRight); 
            DisplayEquation(randLeft, randRight, '/'); 
    }

    console.log('result: ' + result); 
}

function CheckAnswer() {

    if(inputChecked) {
        
        if(parseInt(answer.value) === result) {
            alert('Correct! Generating another problem'); 
            GenerateProblem(); 
        } else if(answer.value === "") {
            alert('Please provide an answer'); 
        } 
        else {
            alert('Incorrect, try again!'); 
        }
        ResetUserAnswer(); 

    } else if(!equationExists) {
        alert('make sure to generate a problem'); 
    } else {
        alert('make sure an operation and difficulty level are selected'); 
    }
}

function ResetUserAnswer() {
    answer.value = ""; 
    // allow cursor to remain activated 
    answer.focus(); 
}

function getRandomIntInclusive(min, max) {
    // the max and min are inclusive 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}


function DisplayEquation(leftNumber, rightNumber, arithmeticSymbol) {
    equation.textContent = leftNumber + " " + arithmeticSymbol + " " + rightNumber; 
}

function GetOperation() {
    // use the document to reference all input for arithmetic operations
    const operations = document.querySelectorAll('input[name="operation"]'); 
    // loop through each of the operations and assign the one that was selected 
    for(const operation of operations){
        if(operation.checked){
            typeOfOperation = operation.value; 
            break; 
        }
    } 
    ValidateInput(typeOfOperation); 
}

function GetDifficulty() {
    // use the document to reference all input for difficulty level
    const difficulties = document.querySelectorAll('input[name="level"]');
    // loop through each of the difficulty levels and assign the one that was selected 
    for(const difficulty of difficulties){
        if(difficulty.checked){
            typeOfDifficulty = difficulty.value; 
            break; 
        }
    } 
    ValidateInput(typeOfDifficulty); 
}
 
function ValidateInput(selectedValue) {
    if(selectedValue === null){
        alert('make sure an operation and difficulty level are selected'); 
        inputChecked = false; 
    } else { 
        inputChecked = true; 
    }
}

const mediaQueryList = window.matchMedia("(orientation: portrait)");

