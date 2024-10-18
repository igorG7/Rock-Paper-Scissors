const score = document.querySelector("#points");

let scoreUser = localStorage.getItem("score") ?? 0;
score.innerHTML = scoreUser;

const options = Array.from(document.querySelectorAll(".option"));
const possibleMoves = ["scissors", "paper", "rock", "lizard", "spock"];
const gameOptionsElements = document.querySelector("#game-options");
let elementPlayerChosenMove;
let elemetCpuChosen;

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

    showMoves(elementPlayerChosenMove, elemetCpuChosen);
  });
});

function getRandom() {
  let random = parseInt(Math.random() * 5) + 1;
  let cpuChosenMove = possibleMoves[random - 1];
  elemetCpuChosen = gameOptionsElements.querySelector("." + cpuChosenMove);

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
  activeRule.includes(cpuChose)
    ? gameResolveAndScoreUpdate("perdeu")
    : gameResolveAndScoreUpdate("ganhou");
  console.log(activeRule);
}

function gameResolveAndScoreUpdate(message) {
  console.log(message);
  message === "ganhou" ? scoreUser++ : scoreUser--;
  if (scoreUser < 0) scoreUser = 0;
  localStorage.setItem("score", scoreUser);
  score.innerHTML = scoreUser;
  console.log(scoreUser);
}

const playerPickElement = document.querySelector("#player-pick");
const cpuPickElement = document.querySelector("#cpu-pick");

function showMoves(player, cpu) {
  console.log(player);
  playerPickElement.innerHTML = player.outerHTML;
  cpuPickElement.innerHTML = cpu.outerHTML;
}
