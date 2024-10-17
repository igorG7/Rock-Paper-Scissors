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

    console.log(elementPlayerChosenMove);
    console.log(playerChosenMove);

    getRandom();
  });
});

function getRandom() {
  let random = parseInt(Math.random() * 5) + 1;
  let cpuChosenMove = possibleMoves[random - 1];
  let elemetCpuChosen = gameOptionsElements.querySelector("." + cpuChosenMove);

  console.log(cpuChosenMove);
  console.log(elemetCpuChosen);
}

//getRandom();
console.log(gameOptionsElements);
