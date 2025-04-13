const leftPaddle = document.getElementById("left-paddle");
const rightPaddle = document.getElementById("right-paddle");
const ball = document.getElementById("ball");
const leftScore = document.getElementById("left-score");
const rightScore = document.getElementById("right-score");

let leftPaddleY = 150;
let rightPaddleY = 150;
let ballX = 290;
let ballY = 190;
let ballSpeedX = 4;
let ballSpeedY = 4;
let leftPoints = 0;
let rightPoints = 0;

const paddleHeight = 100;
const gameHeight = 400;
const gameWidth = 600;

// Controle da raquete esquerda (Player)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && leftPaddleY > 0) {
        leftPaddleY -= 10;
    } else if (event.key === "ArrowDown" && leftPaddleY < gameHeight - paddleHeight) {
        leftPaddleY += 10;
    }
});

// Função para mover o bot
function moveBot() {
    const botCenter = rightPaddleY + paddleHeight / 2;
    const ballCenter = ballY + 10;
    
    if (ballCenter > botCenter + 35) {
        rightPaddleY += 4;
    } else if (ballCenter < botCenter - 35) {
        rightPaddleY -= 4;
    }
}

// Atualiza a posição da bola
function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Verificar se a bola bateu nas paredes superiores e inferiores
    if (ballY <= 0 || ballY >= gameHeight - 20) {
        ballSpeedY = -ballSpeedY;
    }

    // Verificar se a bola passou por uma das raquetes
    if (ballX <= 30 && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX >= gameWidth - 40 && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Verificar se a bola saiu da tela
    if (ballX <= 0) {
        rightPoints++;
        resetBall();
    } else if (ballX >= gameWidth - 20) {
        leftPoints++;
        resetBall();
    }

    // Atualiza a posição da bola
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // Atualiza o placar
    leftScore.textContent = leftPoints;
    rightScore.textContent = rightPoints;
}

// Reseta a bola para o centro da tela
function resetBall() {
    ballX = 290;
    ballY = 190;
    ballSpeedX = -ballSpeedX;
}

// Função de atualização do jogo
function gameLoop() {
    updateBall();
    moveBot();

    // Atualiza a posição das raquetes
    leftPaddle.style.top = leftPaddleY + "px";
    rightPaddle.style.top = rightPaddleY + "px";

    requestAnimationFrame(gameLoop);
}

// Inicia o loop do jogo
gameLoop();
