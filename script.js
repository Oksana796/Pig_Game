"use strict";
//select elements
let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");

let scoreEl0 = document.querySelector("#score--0");
let scoreEl1 = document.querySelector("#score--1");
let currentEl0 = document.querySelector("#current--0");
let currentEl1 = document.querySelector("#current--1");

let diceEl = document.querySelector(".dice");
let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");

let scores, currentNum, activePlayer, playing;
//initial conditions (string by default)
let initial = function () {
  scores = [0, 0];
  currentNum = 0;
  activePlayer = 0;
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
initial();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentNum = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//start rolling
btnRoll.addEventListener("click", function () {
  if (playing) {
    let randomDiceNumber = Math.floor(Math.random() * 6 + 1); //number

    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomDiceNumber}.png`;

    //check for num 1
    if (randomDiceNumber !== 1) {
      currentNum += randomDiceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentNum;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//hold score
btnHold.addEventListener("click", function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentNum;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if score is >=100
    if (scores[activePlayer] >= 20) {
      //finish
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//reset
btnNew.addEventListener("click", initial);
