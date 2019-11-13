const loadBlocks = () => {
  for (let y = 0; y < game.rows; y++) {
    for (let x = 0; x < game.blocksPerRow; x++) {
      game.addBlock(x, y);
    }
  }
};
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowRight":
      paddle.moveRight();
      break;
    case "ArrowLeft":
      paddle.moveLeft();
      break;
    default:
      break;
  }
});
document.addEventListener("keyup", event => {
  switch (event.key) {
    case "ArrowRight":
      paddle.stop();
      break;
    case "ArrowLeft":
      paddle.stop();
      break;
    default:
      break;
  }
});
const paddleCheck = () => {
  if (paddle.x <= 0) {
    paddle.x = 0;
  }
  if (paddle.x >= defaults.width - paddle.w) {
    paddle.x = defaults.width - paddle.w;
  }
};
const ballBlockCheck = () => {
  for (const block of game.blocks) {
    if (ball.isTouching(block)) {
      ball.bounceWith(block);
      synth.playBlockSound();
      game.addPoints();
      game.remove(block);
    }
  }
};
const ballPaddleCheck = () => {
  if (ball.isTouching(paddle)) {
    ball.bounceWith(paddle);
    synth.playPaddleSound();
  }
};
const ballBoundsCheck = () => {
  if (ballHitLeftWall()) {
    ball.x = 0;
    ball.vx = -ball.vx;
    synth.playWallSound();
  }
  if (ballHitRightWall()) {
    ball.x = game.width;
    ball.vx = -ball.vx;
    synth.playWallSound();
  }
  if (ballHitCeiling()) {
    ball.y = 0;
    ball.vy = -ball.vy;
    synth.playCeilingSound();
  }
  if (ballHitFloor()) {
    ball.y = 200;
    synth.playFloorSound();
    removeLife();
  }
};
const removeLife = () => {
  game.lives -= 1;
  const p = document.querySelector("#lives");
  if (game.lives == 2) {
    p.innerHTML = "❤️❤️🖤";
  }
  if (game.lives == 1) {
    p.innerHTML = "❤️🖤🖤";
  }
  if (game.lives == 0) {
    p.innerHTML = "🖤🖤🖤";
  }
  if (game.lives < 0) {
    game.setState("game-over");
    synth.playGameOverSound();
  }
};
function updateObjects() {
  paddle.update();
  ball.update();
  paddleCheck();
  ballBoundsCheck();
  ballPaddleCheck();
  ballBlockCheck();
  for (const block of game.blocks) {
    block.update();
  }
}
const gameLoop = () => {
  window.requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, defaults.width, defaults.height);
  switch (game.state) {
    case "playing":
      updateObjects();
      break;
    case "level-up":
      game.levelUp();
      break;
    case "game-over":
      game.gameOver();
      break;
    case "paused":
      break;
    default:
      break;
  }
};
