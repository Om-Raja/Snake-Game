const board = document.querySelector(".board");
const noOfRows = Math.floor(board.clientHeight / 30);
const noOfCols = Math.floor(board.clientWidth / 30);

const listOfCells = [];
const snake = [
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 1, col: 4 },
];
let direction = "right";
let food;

//Choosing direction
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction === "left" || direction === "right") direction = "up";
      break;
    case "ArrowDown":
      if(direction === "left" || direction === "right") direction = "down";
      break;
    case "ArrowLeft":
      if(direction === "up" || direction === "down") direction = "left";
      break;
    case "ArrowRight":
      if(direction === "up" || direction === "down") direction = "right";
      break;
  }
});

for (let i = 0; i < noOfRows; i++) {
  for (let j = 0; j < noOfCols; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.append(cell);
    listOfCells[`${i}-${j}`] = cell;
  }
}

function renderSnake() {
  for (let i = 0; i < snake.length; i++) {
    listOfCells[`${snake[i].row}-${snake[i].col}`].classList.add("snakeCell");
  }
}

function renderFood() {
    //todo: if food coordinate is in snake coordinates then render food again by calling this same function
  food = {
    row: Math.floor(Math.random() * noOfRows),
    col: Math.floor(Math.random() * noOfCols),
  };

  listOfCells[`${food.row}-${food.col}`].classList.add("food");
}

function buildSnake() {
  switch (direction) {
    case "right":
      for (let i = snake.length - 1; i > 0; i--) {
        listOfCells[`${snake[i].row}-${snake[i].col}`].classList.remove(
          "snakeCell",
        );
        Object.assign(snake[i], snake[i - 1]);
      }
      listOfCells[`${snake[0].row}-${snake[0].col}`].classList.remove(
        "snakeCell",
      );
      snake[0].col += 1;
      if (snake[0].col == noOfCols) endGame();
      renderSnake();
      break;
    case "left":
      for (let i = snake.length - 1; i > 0; i--) {
        listOfCells[`${snake[i].row}-${snake[i].col}`].classList.remove(
          "snakeCell",
        );
        Object.assign(snake[i], snake[i - 1]);
      }
      listOfCells[`${snake[0].row}-${snake[0].col}`].classList.remove(
        "snakeCell",
      );
      snake[0].col -= 1;
      if (snake[0].col == -1) endGame();
      renderSnake();
      break;
    case "up":
      for (let i = snake.length - 1; i > 0; i--) {
        listOfCells[`${snake[i].row}-${snake[i].col}`].classList.remove(
          "snakeCell",
        );
        Object.assign(snake[i], snake[i - 1]);
      }
      listOfCells[`${snake[0].row}-${snake[0].col}`].classList.remove(
        "snakeCell",
      );
      snake[0].row -= 1;
      if (snake[0].row == -1) endGame();
      renderSnake();
      break;
    case "down":
      for (let i = snake.length - 1; i > 0; i--) {
        listOfCells[`${snake[i].row}-${snake[i].col}`].classList.remove(
          "snakeCell",
        );
        Object.assign(snake[i], snake[i - 1]);
      }
      listOfCells[`${snake[0].row}-${snake[0].col}`].classList.remove(
        "snakeCell",
      );
      snake[0].row += 1;
      if (snake[0].row == noOfRows) endGame();
      renderSnake();
      break;
  }
}

//Manually rendering first food
renderFood();

const intervalId = setInterval(() => {
  buildSnake();
  checkFoodEaten();
}, 450);

function endGame() {
  clearInterval(intervalId);
  return alert("Game Over!");
}

function checkFoodEaten(){
    if(snake[0].row === food.row && snake[0].col === food.col){
        console.log("food eaten");
        renderFood();
    }
}