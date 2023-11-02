// variáveis que ​​armazenam o estado do jogo
let game = ["", "", "", "", "", "", "", "", ""];
let current = "X";
let gameover = false;

// referências aos elementos HTML do jogo
let boxs = document.querySelectorAll(".box");
let message = document.querySelector(".message");
let restart = document.querySelector(".restart");

restart.style.display = "none";

boxs.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameover && box.textContent === "") {
      box.textContent = current;
      //atribuir ao jogador atual a posição da opção selecionada;
      game[box.id.split("-")[1]] = current;
      console.log(game[box.id.split("-")[1]]);
      checkMoves();
      switchPlayer();
    }
  });
});

restart.addEventListener("click", () => {
  game = ["", "", "", "", "", "", "", "", ""];
  current = "X";
  gameover = false;
  boxs.forEach((box) => {
    box.textContent = "";
  });
  message.textContent = "";
  restart.style.display = "none";
});

function switchPlayer() {
  current = current === "X" ? "O" : "X";
}

function checkMoves() {
  let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  for (let index = 0; index < combinations.length; index++) {
    let [a, b, c] = combinations[index];
    if (game[a] !== "" && game[a] === game[b] && game[b] === game[c]) {
      message.textContent = `O jogador ${current} Ganhou`;
      gameover = true;
      restart.style.display = "block";
      break;
    }
  }

  if (!game.includes("") && !gameover) {
    message.textContent = "Empate";
    gameover = true;
  }
}
