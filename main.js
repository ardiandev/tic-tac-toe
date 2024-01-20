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

  const restart = () => {
    const player1 = document.querySelector("#player");

    console.log("Restart");
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }

    render();
    winning.style.display = "none";
    playing.style.display = "block";
    gameOver = false;
    // player1.value = "";
  };

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
        document.querySelector(".start-btn").textContent = "Play again";
        return;
      }
    }

    // Check for tie condition
    if (
      choices.length > 4 &&
      keys.every(key => key.some(box => !choices.includes(box)))
    ) {
      gameOver = true;
      winning.textContent = `It is a tie`;
      winning.style.display = "block";
      playing.style.display = "none";
      document.querySelector(".start-btn").textContent = "Play again";
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
    singlePlayer,
    restart,
    playing,
    winning
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
  let playing = false;
  const player1 = document.querySelector("#player");

  const updatePlayer = currentPlayers => {
    document.querySelector(
      ".player1"
    ).textContent = `${currentPlayers[0].name} (${currentPlayers[0].mark})`;
    document.querySelector(
      ".player2"
    ).textContent = `${currentPlayers[1].name} (${currentPlayers[1].mark})`;
    // player1.value = "";
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
    start,
    playing
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#player").value = "";
});

document.querySelector(".start-btn").addEventListener("click", event => {
  let startInfo = event.target.textContent;
  const warningBtn = document.querySelector(".warning-btn");
  const player = document.querySelector("#player");
  // console.log(Game.players);

  if (player.value !== "") {
    Game.playing = true;
  }

  if (!Game.playing) {
    console.log("stop");
    warningBtn.textContent = "Please type your name!";
    return;
  }

  if (Game.playing && startInfo === "Start") {
    // console.log("start", event.target.textContent);
    Setup.playing.style.display = "block";
    Setup.winning.style.display = "none";
    event.target.textContent = "Restart";
    Game.start();
    warningBtn.textContent = "";
  } else {
    // console.log(startInfo);
    event.target.textContent = "Restart";
    Setup.restart();
  }
});
