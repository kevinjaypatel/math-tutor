// selected radio buttons 
let typeOfOperation = null;
let typeOfDifficulty = null;

// variable for checking if input is provided
let answerCanBeChecked = false; 

// reference to where the problem is presented
const equation = document.querySelector('p'); 

// reference to user input for the answer
const answer = document.querySelector('#answer'); 

// answer for the problem, set to 0 by defualt
let result = 0; 

function GenerateProblem() { 
    GetOperation(); 
    GetDifficulty(); 
    if(answerCanBeChecked){
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
            // terary operator syntax: variable name = <condition> ? <variable value if true> : <variable value if false>
            result = Math.floor(randLeft > randRight ? randLeft / randRight : randRight / randLeft); 
            console.log('division result: ' + result); 
            DisplayEquation(randLeft, randRight, '/'); 
    }
}

function CheckAnswer() {

    if(answerCanBeChecked) {
        
        if(parseInt(answer.value) === result) {
            alert('Correct! Generating another problem'); 
            GenerateProblem(); 
        } else {
            alert('Incorrect, try again!'); 
        }
        ResetUserAnswer(); 

    } else {
        alert('make sure an operation and difficulty level are selected'); 
    }
}

function ResetUserAnswer() {
    answer.value = ""; 
}

function getRandomIntInclusive(min, max) {
    // the max and min are inclusive 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}


function DisplayEquation(leftNumber, rightNumber, arithmeticSymbol) {
    // display the greater number on the left hand side for division 
    if(leftNumber < rightNumber) {
        equation.textContent = rightNumber + " " + arithmeticSymbol + " " + leftNumber; 
    } else {
        equation.textContent = leftNumber + " " + arithmeticSymbol + " " + rightNumber; 
    }
    
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
        answerCanBeChecked = false; 
    } else { 
        answerCanBeChecked = true; 
    }
}
