
// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('../static/music/food.mp3');
const gameOverSound = new Audio('../static/music/gameover.mp3');
const moveSound = new Audio('../static/music/move.mp3');
const musicSound = new Audio('../static/music/music.mp3');

let speed = 3;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };
//-------------------------------------------------------------------------------------
// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {

            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}




function gameEngine() {

    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        snakeArr = [{ x: 13, y: 15 }];
        food = { x: 6, y: 7 };
        // musicSound.play();
        openPopup();
        speed = 3;
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    //f you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        speed += .5;
        score += 1;

        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Highest Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        scoreBoxPop.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here



//  musicSound.play();
musicSound.volume = .1;
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highest Score: " + hiscore;
}

window.requestAnimationFrame(main);

function start() {

    musicSound.play();

    window.addEventListener("keydown", e => {

        inputDir = { x: 0, y: 1 } // Start the game
        moveSound.play();
        switch (e.key) {
            case "ArrowUp":
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "ArrowLeft":
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "ArrowRight":
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default:
                break;
        }

    });
}

function Quit() {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 15 }];
    food = { x: 6, y: 7 };
    openPopup();

    speed = 3;
    score = 0;
    scoreBox.innerHTML = "Score: " + score;

}

{
    function Up() {
        moveSound.play();
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
    }

    function Down() {
        moveSound.play();
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
    }

    function Left() {
        moveSound.play();
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
    }
    function Right() {
        moveSound.play();
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
    }

}

// sound on / off
function pause() {
    musicSound.pause();
    //  foodsound.paused()
    //  gameOverSound.pause();
    //  moveSound.pause();

}
function play() {
    musicSound.play();
    // foodsound.play()
    // gameOverSound.play()
    // moveSound.play()

}

//popup
function openPopup() {
    let popup = document.getElementById('Popup');
    popup.classList.add('Openpopup');
}

function closePopup() {
    let popup = document.getElementById('Popup');
    popup.classList.remove('Openpopup');

    start();
}
function closePopupQuit() {
    let popup = document.getElementById('Popup');
    popup.classList.remove('Openpopup');
    location.reload();
}

