const results = document.getElementById("results");
const inputContainer = document.getElementById("input");
const calculateButton = document.getElementById("calculate");
const resultsContainer = document.getElementById("results-container");

class Prediction{

    
    constructor(name, prediction, correctGuesses){
        this.name = name;
        this.prediction = prediction;
        this.correctGuesses = correctGuesses;
    }

    get gname(){
        return this.name;
    }

    set gname(name){
        this.name = name;
    }

    get gprediction(){
        return this.prediction;
    }

    set gprediction(prediction){
        this.prediction = prediction;
    }

    get gcorrectGuesses(){
        return this.correctGuesses;
    }

    set gcorrectGuesses(correctGuesses){
        this.correctGuesses = correctGuesses;
    }
}

function separateName(s){
    return s.substring(0,3);
}

function separatePrediction(s){
    return s.substring(4);
}

// Prepare input
function prepareInput(){
    let temp = inputContainer.value.split("\n");
    let arr = [];
    for(let i = 0; i<temp.length; i++){
        let name = separateName(temp[i]);
        let prediction = separatePrediction(temp[i]);
        arr[i] = new Prediction(name, prediction, 0);
    }
    return arr;
}

// Compare against results
function compare(arr){
    const resultsArray = results.value.split("");
    for(let i = 0; i<arr.length; i++){
        let temp = arr[i].prediction.split("");
        for(let j = 0; j<6; j++){
            if(resultsArray[j] === temp[j]){
                arr[i].correctGuesses++;
            }
        }
    }
}

// Print results
function printResults(arr){
    let guess = "guesses";
    for(let i = 0; i<arr.length; i++){
        if(arr[i].correctGuesses === 1){
            guess = "guess";
        }
        resultsContainer.textContent += arr[i].name + " - " + arr[i].correctGuesses + " correct " + guess + "\n";
        guess = "guesses";
    }
}

// Event listeners
calculateButton.addEventListener("click", () => {
    resultsContainer.textContent = "";
    let arr = prepareInput();
    compare(arr);
    arr.sort((a, b) => b.correctGuesses - a.correctGuesses);
    printResults(arr);
});
