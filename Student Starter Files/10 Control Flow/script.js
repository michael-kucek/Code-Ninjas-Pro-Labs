// Function to load blocks at the top of the game
// Called at the start of each level
function loadBlocks() {
  /**********************************************
   * Use a for loop to iterate from zero
   * to the game object's rows property
   * Use x as your index variable
   **********************************************/

  for (;;) {
    /**********************************************
     * Use a for loop to iterate from zero
     * to game object's blocksPerRow property
     * Use y as your index variable
     **********************************************/

    for (;;) {
      game.addBlock(x, y);
    }
  }
}

// Moves the paddle left and right
document.addEventListener("keydown", ({ key }) => {
  /**********************************************
   * Create a switch statement that switches on
   * the value of key.
   * There should be three cases:
   * "ArrowRight"
   *    -- runs code when the right arrow key is pressed
   *    -- run the code `paddle.moveRight()`
   * "ArrowLeft"
   *    -- runs code when the left arrow key is pressed
   *    -- run the code `paddle.moveLeft()`
   * default
   *    -- the default code to run
   *    -- no additional code should be run
   **********************************************/
});

// stops moving the paddle when the key is released
document.addEventListener("keyup", ({ key }) => {
  /**********************************************
   * Create a switch statement that switches on
   * the value of key.
   * There should be three cases:
   * "ArrowRight"
   *    -- runs code when the right arrow key is released
   *    -- run the code `paddle.stop()`
   * "ArrowLeft"
   *    -- runs code when the left arrow key is released
   *    -- run the code `paddle.stop()`
   * default
   *    -- the default code to run
   *    -- no additional code should be run
   **********************************************/
});

// checks the bounds of the paddle
// note: the very left of the paddle is 0
// and the very right of the paddle is paddle.w
// note: the very left of the game world is 0
// and the very right of the game world is game.width
const paddleCheck = () => {
  /**********************************************
   * Write an if statement that checks to see if the
   * x value of the paddle is off the left side of the game world.
   * The code inside of the if statement should be
   *     paddle.x = 0
   * to reset the paddle's position to the exact left of the game world
   **********************************************/
  /**********************************************
   * Write an if statement that checks to see if the
   * x value of the paddle is off the right side of the game world.
   * The code inside of the if statement should be
   *     paddle.x = game.width - paddle.w;
   * to reset the paddle's position to the exact right of the game world.
   * Note that since the paddle's x value is the very left of the paddle,
   * we need to offset the value by the paddle's width to correctly place it
   * in the game world.
   **********************************************/
};

// Checks each block to see if the ball has collided
// with it
const ballBlockCheck = () => {
  /**
   * Write a for of loop that iterates through each
   * block of the game.blocks property.
   * Use `block` as your instance variable name
   */
  /**
   * Inside of the for loop, write an if statement
   * that uses the `isTouching(object)` method of the ball
   * to check if it is colliding with the current block
   * Inside of the if statement, place the following code
   *    ball.bounceWith(block);
   *    synth.playBlockSound();
   *    game.addPoints();
   *    game.remove(block);
   * These four lines of code will bounce the ball off the block,
   * play a sound, add points, and remove the block.
   */
};
const ballPaddleCheck = () => {
  /**
   * Write an if statement that uses the `isTouching(object)`
   * method of the ball to check if it is colliding with the
   * paddle.
   * Inside of the if statement, place the following code
   *    ball.bounceWith(paddle);
   *    synth.playPaddleSound();
   */
};
const ballBoundsCheck = () => {
  /**
   * Write an if statement that uses the `ballHitLeftWall()`
   * method of the ball to check if it is colliding with the
   * left wall of the game world.
   * Inside of the if statement, place the following code
   *    ball.x = 0;
   *    ball.vx = -ball.vx;
   *    synth.playWallSound();
   */
  /**
   * Write an if statement that uses the `ballHitRightWall()`
   * method of the ball to check if it is colliding with the
   * right wall of the game world.
   * Inside of the if statement, place the following code
   *    ball.x = defaults.width;
   *    ball.vx = -ball.vx;
   *    synth.playWallSound();
   */
  /**
   * Write an if statement that uses the `ballHitCeiling()`
   * method of the ball to check if it is colliding with the
   * ceiling of the game world.
   * Inside of the if statement, place the following code
   *    ball.y = 0;
   *    ball.vy = -ball.vy;
   *    synth.playCeilingSound();
   */
  /**
   * Write an if statement that uses the `ballHitFloor()`
   * method of the ball to check if it is colliding with the
   * floor of the game world.
   * Inside of the if statement, place the following code
   *    ball.y = 200;
   *    synth.playFloorSound();
   *    removeLife();
   */
};

/**
 * Removes one life and updates the hearts
 */
const removeLife = () => {
  game.lives -= 1;
  const p = document.querySelector("#lives");

  /**
   * Write a series of if statements that changes
   * the number of lives based on the value
   * of game.lives. Use the following lines of
   * code in your statements:
   *    p.innerHTML = "❤️❤️🖤";
   *    p.innerHTML = "❤️🖤🖤";
   *    p.innerHTML = "🖤🖤🖤";
   *    game.setState("game-over");
   *    synth.playGameOverSound();
   * Note that the player starts the game with 3
   * lives. You should have four total conditions:
   * when game.lives is equal to 2, 1, and 0, and when
   * game.lives is less than 0.
   */
};
function updateObjects() {
  // move the paddle and the ball
  paddle.update();
  ball.update();

  // check the bounds of the paddle and ball
  paddleCheck();
  ballBoundsCheck();

  // check if the ball hit the paddle
  ballPaddleCheck();

  // check if the ball hit a block
  ballBlockCheck();

  /**
   * Write a for of loop that goes through each
   * block in the game.blocks object and
   * call their  update methos with block.update()
   */
}

function gameLoop() {
  // asks the browser to run the gameLoop function
  // when it is ready
  window.requestAnimationFrame(gameLoop);

  // clears out the game area on each frame
  // `ctx` is the drawing context. Everything
  // in the game is drawn my this context.
  ctx.clearRect(0, 0, defaults.width, defaults.height);

  /**
   * Write a switch statement on the value of game.state
   * You should have four cases.
   * When the state is "playing", you should run
   *    updateObjects();
   * When the state is "level-up", you should run
   *    game.levelUp();
   * When the state is "game-over", you should run
   *    game.gameOver();
   * The final case is the default case in which you
   * should not run any code.
   */
}
