const Setup = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const boardContaner = document.querySelector(".board");
  const playerName = document.querySelector(".player");
  const playerBoard = document.querySelector(".player-info");
  let status = false;

  const singlePlayer = player => {
    boardContaner.addEventListener("click", event => {
      console.log(player);
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
      createPlayer(
        player1.value,

        "X"
      ),
      createPlayer("Computer", "O")
    ];
    updatePlayer(players);

    Setup.render();
    Setup.singlePlayer();
  };

  return {
    start
  };
})();

document.querySelector(".start-btn").addEventListener("click", event => {
  Game.start();
});
