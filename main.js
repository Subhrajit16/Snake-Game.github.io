let gameBord = document.querySelector(".game-board")
let gameOver = false
let count=0;
let intervalId;

let foodSound = new Audio("food.mp3");
let gameOverSound = new Audio("gameover.mp3")
let moveSound = new Audio("move.mp3")

//storing and display high Score++++++++++
let highScore = localStorage.getItem("high-score") || 0;
document.querySelector(".high-score").innerText = `High Score: ${highScore}`


//Food Function++++++++
let foodX;
let foodY;
let foodPosition = () => {
    foodX = Math.floor(Math.random() * 25 + 1)
    foodY = Math.floor(Math.random() * 25 + 1)
}


//snake position++++++++++++
let snakeX = 1;
let snakeY = 1;

//Snake Body+++++++++++++++
let snakeBody = [];

//Gameover Function+++++++++++++++++++
const gameOverFunction = () => {
    clearInterval(intervalId)
    gameOverSound.play();
    alert("Oops Game is Over!! Press OK to Restart")
    location.reload();
}


//Direction Function++++++++++
let positionX = 0;
let positionY = 0;

let changeDirection = (e) => {
    // console.log(e)
    if (e.key == "ArrowDown" && positionY != -1) {
        positionX = 0;
        positionY = 1;
        moveSound.play();
    }
    if (e.key == "ArrowUp" && positionY != 1) {
        positionX = 0;
        positionY = -1;
         moveSound.play();
    }
    if (e.key == "ArrowLeft" && positionX != 1) {
        positionX = -1;
        positionY = 0;
         moveSound.play();
    }
    if (e.key == "ArrowRight" && positionX != -1) {
        positionX = 1;
        positionY = 0;
         moveSound.play();
    }
    playGame();
}

//Game function++++++++
let playGame = () => {

    //updating snake position using arraow key

    if (gameOver) return gameOverFunction();


    let foodandHead = `<div class="food" style="grid-area: ${foodY}/${foodX}"> </div>`


    //checking if the snake eat food+++++++
    if (snakeY == foodY && snakeX == foodX) {
        snakeBody.push([foodX, foodY])          //  [ [2,3], [5,9], [2,8] ]
        // console.log(snakeBody)
        foodSound.play();
        count++;
        document.getElementById("score").innerHTML = count;

        highScore = count >= highScore ? count : highScore;

        localStorage.setItem("high-score", highScore )
       
        document.querySelector(".high-score").innerText = `High Score: ${highScore}`

        foodPosition();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {       //???????????????????
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY] // setting snake body as its head for its initial position    [ [ 1, 1] ]


    snakeX += positionX;
    snakeY += positionY;

    //game Over Condition++++++++++
    if (snakeX <= 0 || snakeX > 25 || snakeY <= 0 || snakeY > 25) {
        gameOver = true;
    }


    //Displaying a new div for each snake body after eatting+++++++
    for (let i = 0; i < snakeBody.length; i++) {

        foodandHead += `<div class="snakeHead" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"> </div>`

        if(i!==0 && snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
            gameOver = true;
        }
    }


    gameBord.innerHTML = foodandHead;

    // window.requestAnimationFrame(playGame);

}


foodPosition()

intervalId = setInterval(playGame, 200);

// window.requestAnimationFrame(playGame)
window.addEventListener('keydown', changeDirection);