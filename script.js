"use strict";

//create a randome number from 1 to 100
//Math.random() gives you 0 to 0.999..
let randomNumber = Math.floor(Math.random() * 100) + 1;

//get all the imporant parts of the document in variables for you to use
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + " "; // the space it put spaces btn all guesses

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    lowOrHi.textContent = "";
    setGameOver();
  } else {
    //you still have a change to play and have not yet got it right
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low! Try again.";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high! Try again.";
    }
  }

  guessCount++;
  guessField.value = ""; // we prepare the input field for you to play again
  guessField.focus(); // we send back the focus cursor to the input
}
guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  guessField.disabled = true; //disables the field to prevent input
  guessSubmit.disabled = true; //disabled the submit button
  resetButton = document.createElement("button"); // we make the button for restarting the game
  resetButton.textContent = "Start new game";
  document.body.append(resetButton); // show the button on the document
  resetButton.addEventListener("click", resetGame); // we restart the game
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p"); // we grab the paragrahs in the div with the class .resultParas
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton); // we remove the button for resetting the game

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus(); // we put the cursor back in the submit field

  lastResult.style.backgroundColor = "white"; //we remove the color on the last paragraph

  //we set a new random number

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
