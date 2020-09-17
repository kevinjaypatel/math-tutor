// selected radio buttons 
let checkedOperation = null;
let checkedDifficulty = null;

// variable for checking if input is provided
let isValid; 

// reference to where the problem is presented
const equation = document.querySelector('p'); 

// reference to user input for the answer
const answer = document.querySelector('#answer'); 

// answer for the problem
let result = 0; 

function GenerateProblem() { 
    GetOperation(); 
    GetDifficulty(); 
    if(isValid){
        GenerateEquation();  
    }
}

function GenerateEquation() {
    
    let max = Math.pow(10, checkedDifficulty); 
    let min = Math.pow(10, checkedDifficulty - 1);
    
    let randLeft = getRandomIntInclusive(min, max);
    let randRight = getRandomIntInclusive(min, max);  
    
    switch(checkedOperation){
        case 'A':
            result = randLeft + randRight; 
            DisplayEquation(randLeft, randRight, '+'); 
            break; 
        case 'S': 
            result = randLeft - randRight;
            DisplayEquation(randLeft, randRight, '-'); 
            break; 
        case 'M':
            result = randLeft * randRight;
            DisplayEquation(randLeft, randRight, '*'); 
            break;  
        case 'D': 
            result = randLeft > randRight ? (randLeft / randRight) : (randRight / randLeft); 
            DisplayEquation(randLeft, randRight, '/'); 
    }
}

function CheckAnswer() {
    if(isValid) {
        
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
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function DisplayEquation(leftNum, rightNum, arithmetic) {
    equation.textContent = leftNum + " " + arithmetic + " " + rightNum; 
}

function GetOperation() {
    const operations = document.querySelectorAll('input[name="operation"]'); 
    for(const operation of operations){
        if(operation.checked){
            checkedOperation = operation.value; 
            break; 
        }
    } 
    ValidateInput(checkedOperation); 
}

function GetDifficulty() {
    const difficulties = document.querySelectorAll('input[name="difficulty"]');
    for(const difficulty of difficulties){
        if(difficulty.checked){
            checkedDifficulty = difficulty.value; 
            break; 
        }
    } 
    ValidateInput(checkedDifficulty); 
}
 
function ValidateInput(selectedValue){
    if(selectedValue === null){
        alert('make sure an operation and difficulty level are selected'); 
        isValid = false; 
    } else { 
        isValid = true; 
    }
}
