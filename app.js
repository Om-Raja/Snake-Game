const board = document.querySelector(".board");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const timeElement = document.getElementById("time");
const startModal = document.querySelector(".start-modal");
const startBtn = document.querySelector(".btn-start");
const levelElement = document.getElementById("levelSetter");
const levelViewer = document.getElementById("level");


const noOfRows = Math.floor(board.clientHeight / 30);
const noOfCols = Math.floor(board.clientWidth / 30);

const listOfCells = [];
const snake = [{ row: 1, col: 2 }];

let direction = "right";
let food;
let score = 0;
let highScore = localStorage.getItem("highScoreOfSnakeGame") || 0;
highScoreElement.innerText = highScore;
let second = 0;
let minute = 0;
let hour = 0;
let timeInterval;
let intervalId;
let extraSnakeCell = {};
let timeInMs = 250; //250ms by default



startBtn.addEventListener("click", ()=>{
  startModal.style.display = "none";
  
  //set level
  switch(levelElement.value){
    case "easy":
      timeInMs = 350;
      levelViewer.innerText = "Easy";
      levelViewer.style.color = "green"
      break;
    case "medium":
      timeInMs = 250;
      levelViewer.innerText = "Medium";
      levelViewer.style.color = "yellow"
      break;
    case "hard":
      timeInMs = 150;
      levelViewer.innerText = "Hard";
      levelViewer.style.color = "red";
      break;
    default:
      timeInMs = 250;
      levelViewer.innerText = "Medium";
      levelViewer.style.color = "yellow";
  }
  startGame();
})

function startGame() {
  //time update
  updateTime();

  //Manually rendering first food
  renderFood();

  intervalId = setInterval(() => {
    buildSnake();
    checkFoodEaten();
  }, timeInMs);
}

function updateTime() {
  timeInterval = setInterval(() => {
    second += 1;
    if (second === 60) {
      second = 0;
      minute += 1;
      if (minute === 60) {
        hour += 1;
        minute = 0;
      }
    }
    timeElement.innerText = `${hour}:${minute}:${second}`;
  }, 1000);
}

//Choosing direction
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction === "left" || direction === "right") direction = "up";
      break;
    case "ArrowDown":
      if (direction === "left" || direction === "right") direction = "down";
      break;
    case "ArrowLeft":
      if (direction === "up" || direction === "down") direction = "left";
      break;
    case "ArrowRight":
      if (direction === "up" || direction === "down") direction = "right";
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
  //if food already exist, un-render it
  if (food) {
    listOfCells[`${food.row}-${food.col}`].classList.remove("food");
  }
  food = {
    row: Math.floor(Math.random() * noOfRows),
    col: Math.floor(Math.random() * noOfCols),
  };

  snake.forEach((bead) => {
    if (bead.row === food.row && bead.col === food.col) renderFood();
  });

  listOfCells[`${food.row}-${food.col}`].classList.add("food");
}

function buildSnake() {
  switch (direction) {
    case "right":
      Object.assign(extraSnakeCell, snake[snake.length - 1]);
      for (let i = snake.length - 1; i > 0; i--) {
        listOfCells[`${snake[i].row}-${snake[i].col}`].classList.remove(
          "snakeCell",
        );
        Object.assign(snake[i], snake[i - 1]);
      }
      listOfCells[`${snake[0].row}-${snake[0].col}`].classList.remove(
        "snakeCell",
      );

      //check if snake ate itself - game over
      for (let i = 1; i < snake.length; i++) {
        if (snake[0].col + 1 === snake[i].col) {
          if (snake[0].row === snake[i].row) {
            endGame("You ate yourself, Game Over!");
          }
        }
      }

      snake[0].col += 1;
      if (snake[0].col == noOfCols) endGame();
      renderSnake();
      break;
    case "left":
      Object.assign(extraSnakeCell, snake[snake.length - 1]);
      for (let i = snake.length - 1; i > 0; i--) {
        listOfCells[`${snake[i].row}-${snake[i].col}`].classList.remove(
          "snakeCell",
        );
        Object.assign(snake[i], snake[i - 1]);
      }
      listOfCells[`${snake[0].row}-${snake[0].col}`].classList.remove(
        "snakeCell",
      );

      //check if snake ate itself - game over
      for (let i = 1; i < snake.length; i++) {
        if (snake[0].col - 1 === snake[i].col) {
          if (snake[0].row === snake[i].row) {
            endGame("You ate yourself, Game Over!");
          }
        }
      }

      snake[0].col -= 1;
      if (snake[0].col == -1) endGame();
      renderSnake();
      break;
    case "up":
      Object.assign(extraSnakeCell, snake[snake.length - 1]);
      for (let i = snake.length - 1; i > 0; i--) {
        listOfCells[`${snake[i].row}-${snake[i].col}`].classList.remove(
          "snakeCell",
        );
        Object.assign(snake[i], snake[i - 1]);
      }
      listOfCells[`${snake[0].row}-${snake[0].col}`].classList.remove(
        "snakeCell",
      );

      //check if snake ate itself - game over
      for (let i = 1; i < snake.length; i++) {
        if (snake[0].row - 1 === snake[i].row) {
          if (snake[0].col === snake[i].col) {
            endGame("You ate yourself, Game Over!");
          }
        }
      }

      snake[0].row -= 1;
      if (snake[0].row == -1) endGame();
      renderSnake();
      break;
    case "down":
      Object.assign(extraSnakeCell, snake[snake.length - 1]);
      for (let i = snake.length - 1; i > 0; i--) {
        listOfCells[`${snake[i].row}-${snake[i].col}`].classList.remove(
          "snakeCell",
        );
        Object.assign(snake[i], snake[i - 1]);
      }
      listOfCells[`${snake[0].row}-${snake[0].col}`].classList.remove(
        "snakeCell",
      );

      //check if snake ate itself - game over
      for (let i = 1; i < snake.length; i++) {
        if (snake[0].row + 1 === snake[i].row) {
          if (snake[0].col === snake[i].col) {
            endGame("You ate yourself, Game Over!");
          }
        }
      }

      snake[0].row += 1;
      if (snake[0].row == noOfRows) endGame();
      renderSnake();
      break;
  }
}

function endGame(message = "Oh! You struck the wall ! 🤦") {
  clearInterval(intervalId);
  clearInterval(timeInterval);

  console.log(message);

  if (highScore > localStorage.getItem("highScoreOfSnakeGame"))
    localStorage.setItem("highScoreOfSnakeGame", highScore);
  return alert(message, "Game Over!");
}

function checkFoodEaten() {
  if (snake[0].row === food.row && snake[0].col === food.col) {
    snake.push({ ...extraSnakeCell });
    renderSnake();
    score += 10;
    if (score > highScore) {
      highScore = score;
      highScoreElement.innerText = highScore;
    }
    scoreElement.innerText = score;
    renderFood();
  }
}
