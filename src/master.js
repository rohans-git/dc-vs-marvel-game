function showBanner() {
  var banner = document.getElementById("popup");
  banner.style.display = "flex";
  
  const closeButton = document.getElementById("close");
  closeButton.addEventListener("click", function () {
    const banner = document.getElementById("popup");
    banner.style.display = "none";
  });
  
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function () {
    const banner = document.getElementById("popup");
    banner.style.display = "none";
  });
}

function submitName() {
  var name = document.getElementById("name").value;
  alert("Hello, " + name + "!");
  var banner = document.getElementById("popup");
  banner.style.display = "none";
}

showBanner();



///index///

let player, canvas, ctx;
let backGroundMusic = new Sound(`/Users/rohaan.kumar/Desktop/DC-VS-Marvel/sound-effects/batman.mp3`);

const startButton = document.getElementById('start-button');
const playMusic = document.querySelector('#play-music');
const gameBoard = document.getElementById('game-board');
const instructions = document.querySelector('.instructions');
const mobile = window.matchMedia("(max-width: 700px)")


window.addEventListener('load', checkIfMobile())

startButton.addEventListener('click', function () {
    instructions.style.display = 'none';

    const h1 = document.querySelector('h1');
    h1.classList.toggle('shake');

    backGroundMusic.play();
    playMusic.innerHTML = `<img id='play-icon' src="./images/play-music.png" alt="play music icon">`;

    player = new Player();
    myGameArea.start();
    startTimer();
});

playMusic.addEventListener('click', function () {
    let musicIconSrc = document.querySelector('#play-icon').src;
    if (musicIconSrc.includes(`play-music`)) {
        backGroundMusic.stop();
        playMusic.innerHTML = `<img id='play-icon' src="./images/stop-music.png" alt="play music icon">`;
    } else if (musicIconSrc.includes(`stop-music`)) {
        backGroundMusic.play();
        playMusic.innerHTML = `<img id='play-icon' src="./images/play-music.png" alt="play music icon">`;
    }
});

document.addEventListener('keydown', function (e) {
    player.movePlayer(e.keyCode);
});

document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 39:
            return player.speedX = 0;
            break;
        case 37:
            return player.speedX = 0;
    }
});

document.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (powerCounter !== 0) {
        if (e.keyCode === 32) {
            newPowerUp();
            powerCounter--
        }
    } else {

        setTimeout(function () {
            powerCounter = 10
        }, 2000)
    }
});

const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        clearInterval(this.interval);
        this.canvas.width = 500;
        this.canvas.height = 500;
        ctx = this.canvas.getContext("2d");
        gameBoard.appendChild(this.canvas);
        this.interval = setInterval(updateGameScreen, 10);
        this.frameNo = 0;
        this.powerSound = new Sound('/Users/rohaan.kumar/Desktop/DC-VS-Marvel/sound-effects/batman-return-of-the-joker-sfx-15.mp3');
        this.cleanSound = new Sound(`../sound-effects/clean-effect.mp3`);
        this.fallSound = new Sound(`../sound-effects/fall-plop.mp3`);
        this.screamSound = new Sound(`/Users/rohaan.kumar/Desktop/DC-VS-Marvel/sound-effects/1.mp3`);
        this.warningSound = new Sound(`../sound-effects/tun-tun-tunn-effect.mp3`);
        this.gameOverSound = new Sound(`../sound-effects/dyingheartbeat.mp3`);
        this.levelUpSound = new Sound(`../sound-effects/level-up-effect.mp3`)
        this.winSound = new Sound(`../sound-effects/winSound.mp3`)
        this.coinCatch = new Sound(`/Users/rohaan.kumar/Desktop/DC-VS-Marvel/sound-effects/batman-return-of-the-joker-sfx-6.mp3`)
        this.coinBreak = new Sound(`/Users/rohaan.kumar/Desktop/DC-VS-Marvel/sound-effects/batman-return-of-the-joker-sfx-15.mp3`)
        this.moneyCatch = new Sound(`/Users/rohaan.kumar/Desktop/DC-VS-Marvel/sound-effects/batman-return-of-the-joker-sfx-6.mp3`)
        this.moneyBreak = new Sound(`/Users/rohaan.kumar/Desktop/DC-VS-Marvel/sound-effects/batman-return-of-the-joker-sfx-15.mp3`)
    },

    clear: function () {
        let img = new Image();
        img.src = '/Users/rohaan.kumar/Desktop/DC-VS-Marvel/images/background-option.jpeg';
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        console.log(myGameArea.start.this)
    }
}

function restartButton() {
    let restartButton = document.querySelector(`.restart`);
    restartButton.innerHTML = `<button id="restart-button"></button>`;
    restartButton.addEventListener('click', function (event) {
        event.preventDefault()
        sheild = [];
        allPowers = [];
        allCoins = [];
        allMonies = [];
        powerCounter = 10;
        myGameArea.clear();
        player = new Player();
        myGameArea.start();
        resetTimer();
        startTimer();
        restartButton.innerHTML = ``;
    });
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


///sheild///

let sheild = [];

function updateSheild() {
    for (let i = 0; i < sheild.length; i++) {
        let oneSheilds = sheild[i];
        oneSheilds.y += 1;
        this.width = 60;
        this.height = 60;
        let img = new Image();
        img.src = `/Users/rohaan.kumar/Desktop/IH/Project_Game - DC VS Marvel/images/sheild.png`;
        ctx.drawImage(img, oneSheilds.x, oneSheilds.y, this.width, this.height);

        if (oneSheilds.y > 500) {
            sheild.splice(i, 1);
            i--;
        }
    }

    myGameArea.frameNo += 1;
    if (myGameArea.frameNo % levelFrames() === 0) {
        myGameArea.fallSound.play();
        let x = Math.floor(Math.random() * 440) + 30;
        let speed = Math.ceil(Math.random() * 5);

        sheild.push({
            x,
            y: -60,
            speed
        });

    }
}

function anyCollisions() {
    for (i = 0; i < sheild.length; i++) {
        if (player.crashWith(sheild[i])) {
            myGameArea.screamSound.play();
            player.decreaseImmunity();
            sheild.splice(i, 1);
            if (player.immunity === 1) {
                myGameArea.warningSound.play();
            }
            if (player.immunity === 0) {
                if (highScore < player.score) {
                    highScore = player.score
                }
                myGameArea.gameOverSound.play();
                setTimeout(function () {
                    myGameArea.stop(),
                        gameOver();
                }, 500);
            }
        }
    }
}

/// player ///

class Player {
    constructor() {
        this.x = 240;
        this.y = 425;
        this.width = 50
        this.height = 75;
        this.speedX = 0;
        this.score = 0;
        this.immunity = 3;
        this.level = 1
    }

    newPosition() {
        this.x += this.speedX;
    }

    update() {
        let img = new Image();
        img.src = `/Users/rohaan.kumar/Desktop/IH/Project_Game - DC VS Marvel/images/player.png`;
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    crashWith(object) {
        if (this.x + this.width >= object.x &&
            this.x <= object.x + 60 &&
            this.y + this.height >= object.y &&
            this.y <= object.y + 60) {
            return true
        }
        return false;
    }

    movePlayer(keyCode) {
        switch (keyCode) {
            case 39:
                this.speedX += 2;
                if (this.x >= 470) {
                    this.x = 470;
                }
                break;
            case 37:
                this.speedX -= 2;
                if (this.x <= 5) {
                    this.x = 5;
                }
        }
    }

    decreaseImmunity() {
        if (this.immunity > 0) {
            return this.immunity -= 1;
        }
    }

    increaseScore() {
        this.score += 5;
        if (this.score % 50 === 0) {
            if (player.level < 5) {
                myGameArea.levelUpSound.play()
                player.level++
            }
        }
        if (this.score > 500) {
            if (highScore < player.score) {
                highScore = player.score
            }
            myGameArea.stop()
            myGameArea.winSound.play()
            youWon()
        }
        return this.score
    }
    
}

/// Money ///

let allMonies = [];

function updateExtraRefills() {
    for (let i = 0; i < allMonies.length; i++) {
        let oneMoney = allMonies[i];
        oneMoney.y += 1;
        this.width = 30;
        this.height = 50;
        let img = new Image();
        img.src = `/Users/rohaan.kumar/Desktop/DC-VS-Marvel/images/Batcoin.png`;
        ctx.drawImage(img, oneMoney.x, oneMoney.y, this.width, this.height);

        if (oneMoney.y > 500) {
            allMonies.splice(i, 1);
            i--;
        }
    }

    if (myGameArea.frameNo % 350 === 0) {
        let x = Math.floor(Math.random() * 440) + 30;
        let speed = 5;

        allMonies.push({
            x,
            y: -50,
            speed
        });

    }
}

function catchMoney() {
    for (i = 0; i < allMonies.length; i++) {
        if (player.crashWith(allMonies[i])) {
            myGameArea.moneyCatch.play()
            powerCounter += 10;
            allMonies.splice(i, 1);
        }
    }
}

function shootMoney() {
    for (let i = 0; i < allPowers.length; i++) {
        for (let j = 0; j < allMonies.length; j++) {
            if (allPowers[i].crashWith(allMonies[j])) {
                myGameArea.moneyBreak.play()
                allMonies.splice(j, 1);
                allPowers.splice(i, 1);
            }
        }
    }
}

/// power // 

let allPowers = [];
let powerCounter = 10

class Power {
    constructor(x) {
        this.x = x;
        this.y = 500;
        this.width = 30;
        this.height = 30;
        this.speedY = 5;
    }

    newPosition() {
        this.y -= this.speedY;
    }

    update() {
        let img = new Image();
        img.src = `/Users/rohaan.kumar/Desktop/IH/Project_Game - DC VS Marvel/images/power.png`;
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    crashWith(object) {
        if (this.x + this.width >= object.x &&
            this.x <= object.x + 60 &&
            this.y + this.height >= object.y &&
            this.y <= object.y + 60) {
            return true
        }
        return false;
    }
}

function levelFrames() {
    switch (player.level) {
        case 1:
            return 140;
            break;
        case 2:
            return 120;
            break;
        case 3:
            return 100;
            break;
        case 4:
            return 80;
            break;
        case 5:
            return 60;
    }
}

function newPowerUp() {
    myGameArea.powerSound.play();
    let power = new Power(player.x);
    allPowers.push(power);
}

function updatePowers() {
    for (let i = 0; i < allPowers.length; i++) {
        allPowers[i].newPosition();
        allPowers[i].update();
        if (allPowers[i].y < -1) {
            allPowers.splice(i, 1);
            i--;
        }
    }
}

function checkIfPowered() {
    for (let i = 0; i < allPowers.length; i++) {
        for (let j = 0; j < sheild.length; j++) {
            if (allPowers[i].crashWith(sheild[j])) {
                myGameArea.cleanSound.play();
                sheild.splice(j, 1);
                allPowers.splice(i, 1);
                player.increaseScore();
            }
        }
    }
}

///Screen functions /// 

let highScore = 0;

function checkIfMobile() {
    if (mobile.matches) {
        instructions.innerHTML = `<p>Sorry, we are not available on small screens yet. Try the game on a computer!</p>`
    }
}

let gamePaused = false;

function togglePause() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        myGameArea.stop();
        stopTimer();
    } else {
        myGameArea.start();
        startTimer();
    }
}

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 80) { // 'P' key for pause
        togglePause();
    }
});

function updateGameScreen() {
    if (!gamePaused) {
        myGameArea.clear();
        player.newPosition();
        player.update();
        updateScoreScreen(player);
        updateImmunityScreen(player);
        updatePowers();
        updateSheild();
        checkIfPowered();
        anyCollisions();
        icWarning();
        showHighScore()
        powersLeftinMoney()
        showLevel()
        if (player.level > 1) {
            updateCoins()
            catchCoin()
            shootCoin()
        }
        if (player.level > 3) {
            updateExtraRefills()
            catchMoney()
            shootMoney()
        }
    }
}

function updateScoreScreen(player) {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${player.score}`, 400, 20);
}

function updateImmunityScreen(player) {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    ctx.fillText(`Immunity: ${player.immunity}`, 370, 50);
}

function showHighScore() {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    ctx.fillText(`Highscore: ${highScore}`, 5, 50);
}

function showLevel() {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    ctx.fillText(`Level: ${player.level}`, 5, 80);
}

function powersLeftinMoney() {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    if (powerCounter > 0) {
        ctx.fillText(`Power left before refill: ${powerCounter}`, 5, 20);
    } else {
        ctx.fillText(`Refuelling power, please wait...`, 5, 20);
    }
}

function icWarning() {
    if (player.immunity === 1) {
        ctx.font = "30px nordic light";
        ctx.fillStyle = "#D03232";
        ctx.fillText(`LOW ENERGY`, 170, 150);
    }
}

function gameOver() {
    ctx.font = "40px nordic light";
    ctx.fillStyle = "Black";
    ctx.fillText(`YOU LOST`, 170, 150);
    restartButton();
    stopTimer()
}

function youWon() {
    ctx.font = "40px nordic light";
    ctx.fillStyle = "Black";
    ctx.fillText(`✨✨✨✨✨✨`, 130, 150);
    ctx.fillText(`YOU WON !!`, 50, 200);
    ctx.fillText(`✨✨✨✨✨✨`, 130, 305);
    restartButton();
}


//// coin /// 


let allCoins = [];

function updateCoins() {
    for (let i = 0; i < allCoins.length; i++) {
        let oneCoin = allCoins[i];
        oneCoin.y += 1;
        this.width = 50;
        this.height = 50;
        let img = new Image();
        img.src = `/Users/rohaan.kumar/Desktop/IH/Project_Game - DC VS Marvel/images/coins.png`;
        ctx.drawImage(img, oneCoin.x, oneCoin.y, this.width, this.height);

        if (oneCoin.y > 500) {
            allCoins.splice(i, 1);
            i--;
        }
    }

    if (myGameArea.frameNo % 400 === 0) {
        let x = Math.floor(Math.random() * 440) + 30;
        let speed = 5;

        allCoins.push({
            x,
            y: -50,
            speed
        });

    }
}

function catchCoin() {
    for (i = 0; i < allCoins.length; i++) {
        if (player.crashWith(allCoins[i])) {
            myGameArea.coinCatch.play()
            player.immunity++;
            allCoins.splice(i, 1);
        }
    }
}

function shootCoin() {
    for (let i = 0; i < allPowers.length; i++) {
        for (let j = 0; j < allCoins.length; j++) {
            if (allPowers[i].crashWith(allCoins[j])) {
                myGameArea.coinBreak.play()
                allCoins.splice(j, 1);
                allPowers.splice(i, 1);
            }
        }
    }
}


/// explosion /// 

let explosionSpriteSheet;
function preload() {
    explosionSpriteSheet = loadImage('/Users/rohaan.kumar/Desktop/DC-VS-Marvel/images/kisspng-sprite-video-games-pixel-art-explosion-collection-of-free-explosions-transparent-white-ba-5cb55249492941.1959240415553869532997.png');
}


class Explosion {
    constructor(x, y) {
        this.sprite = createSprite(x, y);
        this.sprite.addAnimation('explode', explosionSpriteSheet, 64, 64, 16, 0.05, false);
        this.sprite.animation.looping = false;
    }

    isFinished() {
        return this.sprite.animation.playing === false;
    }

    remove() {
        this.sprite.remove();
    }
}

let explosions = [];

function createExplosion(x, y) {
    const explosion = new Explosion(x, y);
    explosions.push(explosion);
}

// Image rotation ///
const images = [
  "/Users/rohaan.kumar/Desktop/DC-VS-Marvel/images/dc vs marvel.jpeg",
  "/Users/rohaan.kumar/Desktop/DC-VS-Marvel/images/marvel-vs-dc-4k-iu-1600x900.jpeg",
  "/Users/rohaan.kumar/Desktop/DC-VS-Marvel/images/6.dc-vs-marvel-heroes-5k-13.jpg",
  "/Users/rohaan.kumar/Desktop/DC-VS-Marvel/images/18.wp9781775.jpg"
];

let index = 0;

function changeBackground() {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${images[index]})`;
  index = (index + 1) % images.length;
}

setInterval(changeBackground, 2000);


// timer 

// Add this code block to your JavaScript file
let timer;
let timeInSeconds = 0;

function startTimer() {
    timeInSeconds = 0;
    // Load the previous time from localStorage if it exists
    timeInSeconds = localStorage.getItem("timeInSeconds") ? parseInt(localStorage.getItem("timeInSeconds")) : 0;
    
    timer = setInterval(function () {
        timeInSeconds++;
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;

        document.getElementById("timer").textContent = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }, 1000);
}

/// final time ///

function showPopup(finalTime) {
  document.getElementById("final-time").textContent = finalTime;
  let popup = document.getElementById("popup");
  popup.classList.remove("hidden");

  let closeBtn = document.querySelector(".close");
  closeBtn.onclick = function () {
    popup.classList.add("hidden");
  };

  window.onclick = function (event) {
    if (event.target === popup) {
      popup.classList.add("hidden");
    }
  };
}

function stopTimer() {
  clearInterval(timer);
  
  // Save the current time in localStorage
  // localStorage.setItem("timeInSeconds", timeInSeconds);

  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  let finalTime = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

  showPopup(finalTime);
}

function resetTimer() {
  clearInterval(timer);
  timeInSeconds = 0;
  document.getElementById("timer").textContent = "00:00";
  startTimer(); // Add this line to start the timer again after resetting
}


/// Home Page Music ///

window.addEventListener('load', () => {
  const audio = new Audio('/Users/rohaan.kumar/Desktop/DC-VS-Marvel/sound-effects/superhero-intro-111393.mp3');
  audio.volume = 1;
  audio.loop = true;
  audio.play();
});


/* Confetti
Effect */


