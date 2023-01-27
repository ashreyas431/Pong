import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

let lastTime;

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (ball.rect().left<=0||ball.rect().right>=window.innerWidth) {
      handleLose(ball.rect());
    }
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth ;
}

function handleLose(rect) {
  // alert("handleLose call");

  ball.reset();
  computerPaddle.reset();
  console.log(document.getElementById("player-score"));
  if (rect.right >= window.innerWidth)
  
    playerScoreElement.textContent =
      parseInt(playerScoreElement.textContent) + 1;
      // document.getElementById("player-score").textContent="1";
  else
    computerScoreElement.textContent =
      parseInt(computerScoreElement.textContent) + 1;
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);
