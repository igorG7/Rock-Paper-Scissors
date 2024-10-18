const score = document.querySelector("#points");

let scoreUser = localStorage.getItem("score") ?? 0;
score.innerHTML = scoreUser;

const options = Array.from(document.querySelectorAll(".option"));
const possibleMoves = ["scissors", "paper", "rock", "lizard", "spock"];
const gameOptionsElements = document.querySelector("#game-options");
let elementPlayerChosenMove;

options.forEach((item) => {
  item.addEventListener("click", (event) => {
    elementPlayerChosenMove = event.currentTarget;
    let playerChosenMove = event.currentTarget.getAttribute("data-option");
    let indexMove = parseInt(
      elementPlayerChosenMove.getAttribute("data-index")
    );

    console.log(elementPlayerChosenMove);
    console.log(playerChosenMove);

    let cpuChosenMove = getRandom();
    console.log(cpuChosenMove);

    playerChosenMove === cpuChosenMove
      ? draw()
      : winOrLose(cpuChosenMove, indexMove);
  });
});

function getRandom() {
  let random = parseInt(Math.random() * 5) + 1;
  let cpuChosenMove = possibleMoves[random - 1];
  let elemetCpuChosen = gameOptionsElements.querySelector("." + cpuChosenMove);

  return cpuChosenMove;
}

//getRandom();
console.log(gameOptionsElements);

function draw() {
  console.log("Empatou");
}

const scissors = ["spock", "rock"];
const paper = ["scissors", "lizard"];
const rock = ["paper", "spock"];
const lizard = ["rock", "scissors"];
const spock = ["lizard", "paper"];

const rules = [scissors, paper, rock, lizard, spock];

function winOrLose(cpuChose, indexRule) {
  let activeRule = rules[indexRule];
  activeRule.includes(cpuChose) ? console.log("Perdeu") : console.log("Ganhou");
  console.log(activeRule);
}
