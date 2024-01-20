# Tic Tac Toe Game

This is a simple implementation of the classic Tic Tac Toe game using HTML, CSS, and JavaScript. The game allows you to play against a computer opponent. This is tic tac toe project. This project is one of the odin js project.

## Demo

Check the demo [here](https://ardiandev.github.io/tic-tac-toe/)

## Setup

The game board is represented by a 3x3 grid, and each cell of the grid is initially empty. The game keeps track of the player's moves and the computer's moves in an array named `board`. The game interface is structured using HTML and styled using CSS. The JavaScript code handles the game logic and user interactions.

### Game Board

- The game board is represented by an array named `board`, where each element corresponds to a cell in the grid. An empty cell is denoted by an empty string.
- The game board is displayed in the HTML using a container with the class `.board`. Each cell is given a class `mark-index` to uniquely identify it.

### Player Information

- The player's name and current mark (X or O) are displayed in the HTML using elements with classes `.player` and `.player-info`.
- The current player's information is updated dynamically during the game.

### Game Status

- The game status, including the winner and a tie, is displayed in the HTML using elements with classes `.winning` and `.playing`.
- When the game ends, the winning message is shown, and the "Play again" button becomes available.

## Game Logic

The JavaScript code handles the game logic, including player moves, computer moves, checking for a winner, and handling ties.

### Checking for a Winner

- The game checks for a winner after each player move or computer move.
- Winning combinations are defined in the `keys` array, representing rows, columns, and diagonals on the game board.
- If a winning combination is found, the game ends, and the winner is declared.

### Checking for a Tie

- The game checks for a tie condition when all cells on the board are filled, and no winner is declared.
- If a tie is detected, the game ends, and a tie message is displayed.

### Computer Opponent

- The computer opponent makes random moves by selecting an empty cell on the board.
- The computer's moves are triggered after the player makes a move.

## Getting Started

1. Open the `index.html` file in your web browser.
2. Enter your name in the player input field.
3. Click the "Start" button to begin the game.
4. Make your moves by clicking on the empty cells.
5. The game will display the winner or a tie message when the game ends.
6. Click the "Restart" button to play again.

Enjoy the game!
