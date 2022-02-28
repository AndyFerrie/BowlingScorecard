// These query selectors correlate to the different table cells where scores are displayed
const pinsHit = document.querySelector("#pinsHit")
const pinsHitFirst = pinsHit.querySelectorAll(".first")
const pinsHitSecond = pinsHit.querySelectorAll(".second")
const pinsHitThird = pinsHit.querySelector(".third")
const frameScore = document.querySelectorAll("#score > td")
const buttons = document.querySelectorAll(".buttons > button")

// Event listener which loops through the buttons numbered 0-10 representing the number of pins knocked down
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        bowl(i);
    })
}

// When pins are knocked down this function hides the buttons which are no longer needed
function hideButtons (num) {
    for (let i = (11 - num); i < buttons.length; i++) {
        buttons[i].classList.add('hide');
    }
}

// This function displays all buttons again when a new frame is played
function showButtons () {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('hide');
    }
}

// In a game of 10 pin balling there are 10 frames in total
let frame = 0
// Each frame has upto 2 balls and the final frame has upto 3
let ball = 1
// At the beginning of each frame we start with 10 pins
let pins = 10
// This variable keeps a cumulative score
let score = 0
// This is an empty array where we push and update the scores for each frame
const scoresArray = []

function pushScore(num) {
    score += num;
    scoresArray.push(num);
    frameScore[frame].textContent = score;
}

function updateScore(num) {
    score += num;
    scoresArray[frame] += num;
    frameScore[frame].textContent = score;
}

function updatePrevFrame(num) {
    scoresArray[frame-1] += num;
    score += num;
    frameScore[frame].textContent = score;
    let currentFrame = scoresArray[frame];
    frameScore[frame-1].textContent = score - currentFrame;
}

function ifStrike(num) {
    if ((frame >=1) && (pinsHitSecond[frame-1].textContent === "X")) {
        updatePrevFrame(num);
    }
    if ((frame >=2) && (pinsHitSecond[frame-1].textContent === "X") && (pinsHitSecond[frame-2].textContent === "X") && (ball === 1)) {
        scoresArray[frame-2] += num;
        score += num;
        frameScore[frame].textContent = score;
        let currentFrame = scoresArray[frame];
        let previousFrame = scoresArray[frame-1];
        frameScore[frame-1].textContent = score - currentFrame;
        frameScore[frame-2].textContent = score - (currentFrame+previousFrame);
    }
}

function ifStrikeFinal(num) {
    if (pinsHitSecond[frame-1].textContent === "X") {
        updatePrevFrame(num);
    }
}

function ifSpare(num) {
    if ((frame >=1) && (pinsHitSecond[frame-1].textContent === "/")) {
        updatePrevFrame(num);
    }
}

function nextFrame() {
    frame++;
    ball = 1;
    pins = 10;
    showButtons();
}

function strike(num) {
    pinsHitSecond[frame].textContent = "X";
    pushScore(num);
    ifStrike(num);
    ifSpare(num);
    nextFrame();
    console.log(scoresArray);
}

function spare(num) {
    pinsHitSecond[frame].textContent = "/";
    updateScore(num);
    ifStrike(num);
    nextFrame();
    console.log(scoresArray);
}

function gameOver() {
    console.log(scoresArray);
    console.log("Game Over");
    hideButtons(11);
}

function bowl(num) {

    if (frame === 9) {
        finalFrame(num);
        return;
    }

    if (ball === 1) {

        hideButtons(num);

        if (num === 10) {
            strike(num);
            return;
        }

        pinsHitFirst[frame].textContent = num;
        pushScore(num);
        pins -= num;
        ifStrike(num);
        ifSpare(num);   
        ball++; 
        } 
        
    else if (ball === 2) {

        pins -= num;

        if (pins === 0) {
            spare(num);
            return;
        }

        pinsHitSecond[frame].textContent = num;
        updateScore(num);
        ifStrike(num);
        nextFrame();
    }
    console.log(scoresArray)
}

function finalFrame(num) {

    if (ball === 1) {

        hideButtons(num);
        pins -= num;

        if (num === 10) {
            pinsHitFirst[frame].textContent = "X";
            pushScore(num);
            ifStrike(num);
            ifSpare(num);
            showButtons();
            ball++;
            return;
        }

        pinsHitFirst[frame].textContent = num;
        pushScore(num);
        ifStrike(num);
        ifSpare(num);   
        ball++; 
        } 
        
    else if (ball === 2) {

        hideButtons(num);
        pins -= num;

        if (num === 10) {
            pinsHitSecond[frame].textContent = "X";
            showButtons();
            updateScore(num);
            ifStrikeFinal(num);
            ball++;
            return;
        }
        
        if (pins === 0) {
            pinsHitSecond[frame].textContent = "/";
            showButtons();
            updateScore(num);
            ifStrikeFinal(num);
            ball++;
            return;
        }

        if ((pinsHitFirst[frame].textContent != "X") || (pinsHitFirst[frame].textContent != "/")) {
            pinsHitSecond[frame].textContent = num;
            updateScore(num);
            ifStrikeFinal(num);
            gameOver();
            return;
        }

        pinsHitSecond[frame].textContent = num;
        updateScore(num);
        ifStrikeFinal(num);
    }

    else if (ball === 3) {

        pinsHitThird.textContent = num;

        if (num === 10) {
            pinsHitThird.textContent = "X";
        }

        pins -= num;

        if (pins === 0) {
            pinsHitThird.textContent = "/";
        }

        updateScore(num);
        gameOver();
    }
    console.log(scoresArray)
}