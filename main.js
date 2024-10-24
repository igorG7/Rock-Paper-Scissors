const score = document.querySelector("#points");

let scoreUser = localStorage.getItem("score") ?? 0;
score.innerHTML = scoreUser;

const options = Array.from(document.querySelectorAll(".option"));
const possibleMoves = ["scissors", "paper", "rock", "lizard", "spock"];
const gameOptionsElements = document.querySelector("#game-options");
let elementPlayerChosenMove;
let elemetCpuChosen;

const result = document.querySelector("#result");
const resultMessage = document.querySelector("#result-message");
const movesPicked = document.querySelector("#result-game");
const playAgainButton = document.querySelector("#play-again-button");

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
  gameOptionsElements.classList.remove("active");

  setTimeout(() => {
    showResultGameElement();
  }, 1000);

  setTimeout(() => {
    expandAnimation();
  }, 3000);

  setTimeout(() => {
    showResultMessage("YOU DRAW");
  }, 4000);
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
    ? gameResolveAndScoreUpdate("YOU LOSE")
    : gameResolveAndScoreUpdate("YOU WIN");
  console.log(activeRule);
}

function gameResolveAndScoreUpdate(message) {
  console.log(message);
  gameOptionsElements.classList.remove("active");

  setTimeout(() => {
    showResultGameElement();
  }, 1000);

  setTimeout(() => {
    expandAnimation();
  }, 3000);

  setTimeout(() => {
    showResultMessage(message);
    winnerEffect(message);
    scoreCount(message);
  }, 4000);
}

function scoreCount(resultMessage) {
  resultMessage === "YOU WIN" ? scoreUser++ : scoreUser--;
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

  setTimeout(() => {
    cpuPickElement.innerHTML = cpu.outerHTML;
  }, 2000);
}

function showResultGameElement() {
  movesPicked.classList.add("active");
}

function showResultMessage(resolutionMessage) {
  result.classList.add("active");
  resultMessage.innerHTML = resolutionMessage;
}

function expandAnimation() {
  movesPicked.classList.add("expand");
}

const layersPlayer = document.querySelector("#layers-player");
const layersCpu = document.querySelector("#layers-cpu");

function winnerEffect(resultMessage) {
  if (resultMessage === "YOU WIN") {
    const layers = layersPlayer.querySelectorAll(".layer");

    layers.forEach((item) => {
      item.classList.add("active");
    });
  } else {
    const layers = layersCpu.querySelectorAll(".layer");

    layers.forEach((item) => {
      item.classList.add("active");
    });
  }
}

playAgainButton.addEventListener("click", () => {
  result.classList.remove("active");
  movesPicked.classList.remove("expand");
  movesPicked.classList.remove("active");
  gameOptionsElements.classList.add("active");

  const layers = document.querySelectorAll(".layer");
  layers.forEach((item) => {
    item.classList.remove("active");
  });
});

const rulesButton = document.querySelector("#rules-button");
const modal = document.querySelector("#modal");
const closeButton = document.querySelector("#close");

rulesButton.addEventListener("click", openOrCloseModalRules);
modal.addEventListener("click", openOrCloseModalRules);
closeButton.addEventListener("click", openOrCloseModalRules);

function openOrCloseModalRules(event) {
  const verifyState = modal.classList.contains("active");
  let clickTarget = event.target;

  if (verifyState === false) {
    modal.classList.add("active");
  }

  if (
    clickTarget.classList.contains("x-button") ||
    clickTarget.classList.contains("modal-rules")
  ) {
    modal.classList.remove("active");
  }
}
