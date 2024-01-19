// SETUP
const Setup = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const boardContaner = document.querySelector(".board");
  const playerName = document.querySelector(".player");
  const playerBoard = document.querySelector(".player-info");
  let gameOver = false;
  const playerDisplay = document.querySelector(".player-display");
  const winning = document.querySelector(".winning");
  const playing = document.querySelector(".playing");

  const checkWinner = (name, mark) => {
    const keys = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];

    let choices = [];

    for (let i = 0; i < board.length; i++) {
      if (board[i] === mark) {
        choices.push(i);
      }
    }

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];

      if (key.every(box => choices.includes(box))) {
        gameOver = true;
        winning.textContent = `The winner is ${name}`;
        winning.style.display = "block";
        playing.style.display = "none";
        // playerDisplay.textContent = `The winner is ${name}`;
      }
    }
  };

  const comChoice = () => {
    let compArray = [];

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        compArray.push(i);
      }
    }

    let idx = Math.floor(Math.random() * compArray.length);
    let chosenIdx = compArray[idx];

    board[chosenIdx] = "O";
    render();
  };

  const singlePlayer = player => {
    boardContaner.addEventListener("click", event => {
      let clickBtn = parseInt(event.target.className.split("-")[1]);

      if (!gameOver && board[clickBtn] === "") {
        board[clickBtn] = "X";
        render();
        checkWinner(player[0].name, player[0].mark);
        if (!gameOver) {
          comChoice();
          checkWinner(player[1].name, player[1].mark);
        }
      }
    });
  };

  const updatePlayer = obj => {
    playerName.textContent = obj.name;
  };
  const render = () => {
    boardContaner.innerHTML = "";

    board.forEach((board, index) => {
      const div = document.createElement("div");
      div.textContent = board;
      div.classList.add(`mark-${index}`);
      boardContaner.appendChild(div);
    });
  };

  return {
    render,
    updatePlayer,
    singlePlayer
  };
})();

//CREATE PLAYERS
const createPlayer = (name, mark) => {
  return {
    name,
    mark
  };
};

// GAME
const Game = (() => {
  const player1 = document.querySelector("#player");

  const updatePlayer = currentPlayers => {
    document.querySelector(
      ".player1"
    ).textContent = `${currentPlayers[0].name} (${currentPlayers[0].mark})`;
    document.querySelector(
      ".player2"
    ).textContent = `${currentPlayers[1].name} (${currentPlayers[1].mark})`;
    player1.value = "";
  };

  const start = () => {
    const players = [
      createPlayer(player1.value === "" ? "Player 1" : player1.value, "X"),
      createPlayer("Computer", "O")
    ];
    updatePlayer(players);

    Setup.render();
    Setup.singlePlayer(players);
  };

  return {
    start
  };
})();

document.querySelector(".start-btn").addEventListener("click", event => {
  Game.start();
});
