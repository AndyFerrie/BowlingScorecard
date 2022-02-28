// Query selectors correlating to the different table cells where scores are displayed
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
// Keeps a cumulative score
let score = 0
// Empty array where we push and update the scores for each frame
const scoresArray = []

// Updates the cumulative score, pushes it to the array & displays it in the appropraite field
function pushScore(num) {
    score += num;
    scoresArray.push(num);
    frameScore[frame].textContent = score;
}

// Updates the cumulative score, updates the pre-existing array value & displays it in the appropraite field
function updateScore(num) {
    score += num;
    scoresArray[frame] += num;
    frameScore[frame].textContent = score;
}

// Updates the value of a previous frame (Called following a Strike or Spare)
function updatePrevFrame(num) {
    scoresArray[frame-1] += num;
    score += num;
    frameScore[frame].textContent = score;
    const currentFrame = scoresArray[frame];
    frameScore[frame-1].textContent = score - currentFrame;
}

// Checks if previous 2 frames were strikes and updates values accordingly
function ifStrike(num) {
    if ((frame >=1) && (pinsHitSecond[frame-1].textContent === "X")) {
        updatePrevFrame(num);
    }
    if ((frame >=2) && (pinsHitSecond[frame-1].textContent === "X") && (pinsHitSecond[frame-2].textContent === "X") && (ball === 1)) {
        scoresArray[frame-2] += num;
        score += num;
        frameScore[frame].textContent = score;
        const currentFrame = scoresArray[frame];
        const previousFrame = scoresArray[frame-1];
        frameScore[frame-1].textContent = score - currentFrame;
        frameScore[frame-2].textContent = score - (currentFrame+previousFrame);
    }
}

// In the final frame the scoring is such that we only need to check for 1 previous strike
function ifStrikeFinal(num) {
    if (pinsHitSecond[frame-1].textContent === "X") {
        updatePrevFrame(num);
    }
}

// Checks if previous frame was a spare and updates value accordingly
function ifSpare(num) {
    if ((frame >=1) && (pinsHitSecond[frame-1].textContent === "/")) {
        updatePrevFrame(num);
    }
}

// Begins next frame and resets ball and pins
function nextFrame() {
    frame++;
    ball = 1;
    pins = 10;
    showButtons();
}

// When all 10 pins are knocked down we add an X to the scorecard, push score, check for previous strikes or spare & then start the next frame
function strike(num) {
    pinsHitSecond[frame].textContent = "X";
    pushScore(num);
    ifStrike(num);
    ifSpare(num);
    nextFrame();
    console.log(scoresArray);
}

// If all remaining pins are knocked down with 2nd ball we add / to the scorecard, update the score, check for previous strike and start the next frame (we do not need to check for a previous spare as they are never sequential)
function spare(num) {
    pinsHitSecond[frame].textContent = "/";
    updateScore(num);
    ifStrike(num);
    nextFrame();
    console.log(scoresArray);
}

// Hides all buttons to indicate that the game is over
function gameOver() {
    console.log(scoresArray);
    console.log("Game Over");
    hideButtons(11);
}

// Called whenever we click a numbered button
function bowl(num) {

    // Checks if final frame as logic is slightly different (see below)
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

// Called when bowling in 10th frame
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