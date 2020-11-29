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
            result = randLeft > randRight ? (randLeft / randRight) : (randRight / randLeft); 
            DisplayEquation(randLeft, randRight, '/'); 
    }
}

function CheckAnswer() {

    if(answerCanBeChecked) {
        
        if(parseInt(answer.value) === result || parseFloat(answer.value) === result) {
            alert('Correct! Generating another problem'); 
            GenerateProblem(); 
        } else {
            alert('result = ' + answer.value); 
            alert('Incorrect, try again!'); 
        }
        ResetUserAnswer(); 

    } else {
        alert('make sure an operation and difficulty level are selected'); 
        console.log(answer.value); 
    }
}

function ResetUserAnswer() {
    answer.value = ""; 
}

function getRandomIntInclusive(min, max) {
    
    // the max and min are inclusive 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}


function DisplayEquation(leftNum, rightNum, arithmetic) {
    equation.textContent = leftNum + " " + arithmetic + " " + rightNum; 
}

function GetOperation() {
    const operations = document.querySelectorAll('input[name="operation"]'); 
    for(const operation of operations){
        if(operation.checked){
            typeOfOperation = operation.value; 
            break; 
        }
    } 
    ValidateInput(typeOfOperation); 
}

function GetDifficulty() {
    const difficulties = document.querySelectorAll('input[name="level"]');
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
