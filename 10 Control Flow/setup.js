const defaults = {
  blockH: 20,
  blocksPerRow: 2,
  rows: 2,
  width: 400,
  height: 800,
  ball: {
    x: 200,
    y: 200,
    vx: 0,
    vy: 10
  },
  colors: {
    g0: "#0f380f",
    g1: "#306230",
    g2: "#8bac0f",
    g3: "#9bbc0f"
  }
};
class Synth {
  c = 261.36;
  d = 293.66;
  e = 329.63;
  f = 349.23;
  g = 392.0;
  a = 440.0;
  b = 493.8;
  tone = (freqs, i, step = 0.15) => {
    const beeper = new AudioContext();
    const o = beeper.createOscillator();
    const g = beeper.createGain();
    g.gain.value = 0.4;
    var real = new Float32Array(4);
    var imag = new Float32Array(4);
    real[0] = 0;
    real[1] = -1;
    real[2] = 0.5;
    real[3] = 0;
    imag[0] = 0;
    imag[1] = -0.5;
    imag[2] = 1;
    imag[3] = 0;
    var wave = beeper.createPeriodicWave(real, imag, {
      disableNormalization: true
    });
    o.setPeriodicWave(wave);
    o.connect(g);
    g.connect(beeper.destination);
    o.frequency.value = freqs[i];
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.0001, beeper.currentTime + step);
    setTimeout(() => {
      o.stop(0);
      if (freqs[i + 1]) {
        this.tone(freqs, i + 1, step);
      }
    }, step * 1000);
  };
  playPaddleSound = () => this.tone([this.f / 2], 0);
  playBlockSound = () => this.tone([this.f], 0);
  playWallSound = () => this.tone([this.a / 2], 0);
  playCeilingSound = () => this.tone([this.a], 0);
  playFloorSound = () => this.tone([this.b / 2, this.e / 2], 0);
  playLevelUpSound = () =>
    setTimeout(
      () =>
        this.tone(
          [
            this.c,
            this.a,
            this.f * 2,
            this.g,
            this.e,
            this.f,
            this.f * 2,
            this.f
          ],
          0
        ),
      150
    );
  playGameOverSound = () =>
    setTimeout(
      () =>
        this.tone(
          [
            this.a / 2,
            this.c,
            this.g / 2,
            this.f / 2,
            this.f,
            this.f / 2,
            this.d / 2,
            this.f,
            this.a,
            this.g / 2,
            this.g,
            this.f,
            this.e,
            this.f
          ],
          0
        ),
      300
    );
}
class Ball {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.vx = 0;
    this.vy = 10;
    this.r = 10;
  }
  update = () => {
    ctx.fillStyle = defaults.colors.g1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.y += this.vy;
    this.x += this.vx;
  };
  isTouching = block =>
    ball.y >= block.y &&
    ball.y <= block.y + block.h &&
    ball.x >= block.x &&
    ball.x <= block.x + block.w;
  bounceWith = block => {
    const percentHit = (this.x - block.x) / block.w;
    this.vx = 4 * (percentHit - 0.5);
    this.vy = -this.vy;
  };
}
class Block {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = Block.height;
  }
  update = () => {
    ctx.lineWidth = 2;
    ctx.fillStyle = defaults.colors.g2;
    ctx.strokeStyle = defaults.colors.g1;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  };
}
Block.height = 20;
class Paddle extends Block {
  constructor() {
    super();
    this.w = 80;
    this.h = Block.height;
    this.x = defaults.width / 2 - this.w / 2;
    this.y = 700;
    this.vx = 0;
  }
  moveRight = (speed = 4) => (this.vx = speed);
  moveLeft = (speed = 4) => (this.vx = -speed);
  stop = () => (this.vx = 0);
  update = () => {
    ctx.lineWidth = 2;
    ctx.fillStyle = defaults.colors.g1;
    ctx.strokeStyle = defaults.colors.g0;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    this.x += this.vx;
  };
}
class Game {
  constructor() {
    this.blocks = [];
    this.width = 400;
    this.rows = 2;
    this.blocksPerRow = 1;
    this.points = 0;
    this.lives = 3;
    this.level = 1;
    this.state = "title";
  }
  addPoints = (pts = 10) => {
    const p = document.querySelector("#points");
    p.innerHTML = this.points += pts;
  };
  setState = state => (this.state = state);
  addBlock = (x, y) => {
    const w = this.width / this.blocksPerRow;
    this.blocks.push(new Block(x * w, y * Block.height, w));
  };
  remove = block => {
    this.blocks = this.blocks.filter(
      b => `${b.x}${b.y}` !== `${block.x}${block.y}`
    );
    if (this.blocks.length === 0) {
      this.blocksPerRow = this.blocksPerRow + 1;
      this.rows = this.rows + 0.4;
      ball.x = defaults.ball.x;
      ball.y = defaults.ball.y;
      this.setState("level-up");
    }
  };
  levelUp = () => {
    this.level += 1;
    document.querySelector("#message").innerHTML = `Level ${this.level}`;
    this.setState("paused");
    synth.playLevelUpSound();
    setTimeout(() => {
      document.querySelector("#message").innerHTML = "";
      this.setState("playing");
      loadBlocks();
    }, 3000);
  };
  gameOver = () => {
    document.querySelector(
      "#message"
    ).innerHTML = `Game Over!<br/>Level ${this.level} - ${this.points} Points`;
  };
}
const ballHitPaddle = () => {
  return (
    ball.y >= paddle.y &&
    ball.y <= paddle.y + paddle.h &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.w
  );
};
const ballHitBlock = block => {
  return (
    ball.y >= block.y &&
    ball.y <= block.y + block.h &&
    ball.x >= block.x &&
    ball.x <= block.x + block.w
  );
};
const ballHitLeftWall = () => ball.x <= 0;
const ballHitRightWall = () => ball.x >= defaults.width;
const ballHitFloor = () => ball.y >= defaults.height;
const ballHitCeiling = () => ball.y <= 0;
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const ball = new Ball();
const paddle = new Paddle();
const game = new Game();
const synth = new Synth();
const start = () => {
  document.querySelector("#start").remove();
  game.setState("playing");
  loadBlocks();
};
