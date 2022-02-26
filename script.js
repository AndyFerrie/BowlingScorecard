const pinsHit = document.querySelector("#pinsHit")
const pinsHitFirst = pinsHit.querySelectorAll(".first")
const pinsHitSecond = pinsHit.querySelectorAll(".second")
const pinsHitThird = pinsHit.querySelector(".third")
const frameScore = document.querySelectorAll("#score > td")
const buttons = document.querySelectorAll(".buttons > button")

let frame = 0
let ball = 1
let pins = 10
let score = 0
const scoresArray = []

function bowl(num) {
    if (frame === 9) {
        finalFrame(num);
        return;
    }

    if (ball === 1) {

        hideButtons(num);
        if (num === 10) {
            strike();
            return;
        }
        pinsHitFirst[frame].textContent = num;
        scoresArray.push(num);
        score += num;
        frameScore[frame].textContent = score;
        pins -= num;
        ifStrike(num);
        ifSpare(num);   
        ball++; 
        } 
        
    else if (ball === 2) {

        pinsHitSecond[frame].textContent = num;
        scoresArray[frame] += num;
        pins -= num;
        if (pins === 0) {
            spare(num);
            return;
        }
        score += num;
        frameScore[frame].textContent = score;
        ifStrike(num);
        nextFrame();
        showButtons();
    }
    console.log(ball)
    console.log(scoresArray)
}

function finalFrame(num) {
    if (ball === 1) {

        hideButtons(num);
        if (num === 10) {
            pinsHitFirst[frame].textContent = "X";
            score += 10;
            scoresArray.push(10);
            ifStrike(10);
            ifSpare(10);
            showButtons();
            frameScore[frame].textContent = score;
            ball++
            return;
        }
        pinsHitFirst[frame].textContent = num;
        scoresArray.push(num);
        score += num;
        frameScore[frame].textContent = score;
        pins -= num;
        ifStrike(num);
        ifSpare(num);   
        ball++; 
        } 
        
    else if (ball === 2) {
        if (num === 10) {
            pinsHitSecond[frame].textContent = "X";
            score += 10;
            scoresArray[frame] += 10;
            frameScore[frame].textContent = score;
            ifStrikeFinal(num);
            showButtons();
            ball++
            return;
        }
        pins -= num;

        if (pins === 0) {
            pinsHitSecond[frame].textContent = "/";
            score += num;
            scoresArray[frame] += num;
            frameScore[frame].textContent = score;
            ifStrikeFinal(num);
            showButtons();
            ball++
            return;
        }

        pinsHitSecond[frame].textContent = num;
        score += num;
        scoresArray[frame] += num;
        frameScore[frame].textContent = score;
        ifStrikeFinal(num);
        gameOver();
        return;
    }

    else if (ball === 3) {
        if (num === 10) {
            pinsHitThird.textContent = "X";
            score += 10;
            scoresArray[frame] += 10;
            frameScore[frame].textContent = score;
            gameOver();
            return;
        }

        pinsHitThird.textContent = num;
        score += num;
        scoresArray[frame] += num;
        frameScore[frame].textContent = score;
        gameOver();
        return;
    }
    console.log(scoresArray)
}


function strike() {
    pinsHitSecond[frame].textContent = "X";
    score += 10;
    scoresArray.push(10);
    ifStrike(10);
    ifSpare(10);
    frameScore[frame].textContent = score;
    nextFrame();
    showButtons();
    console.log(ball)
}

function spare(num) {
    pinsHitSecond[frame].textContent = "/";
    score += num;
    frameScore[frame].textContent = score;
    ifStrike(num);
    nextFrame();
    showButtons();
}

function ifStrike(num) {
    if ((frame >=1) && (pinsHitSecond[frame-1].textContent === "X")) {
        scoresArray[frame-1] += num;
        score += num;
        frameScore[frame].textContent = score;
        let currentFrame = scoresArray[frame];
        frameScore[frame-1].textContent = score - currentFrame;
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
        scoresArray[frame-1] += num;
        score += num;
        frameScore[frame].textContent = score;
        let currentFrame = scoresArray[frame];
        frameScore[frame-1].textContent = score - currentFrame;
    }
}

function ifSpare(num) {
    if ((frame >=1) && (pinsHitSecond[frame-1].textContent === "/")) {
        scoresArray[frame-1] += num;
        score += num;
        frameScore[frame].textContent = score;
        let currentFrame = scoresArray[frame];
        frameScore[frame-1].textContent = score - currentFrame;
    }
}

function nextFrame() {
    frame++;
    ball = 1;
    pins = 10;
}

function gameOver() {
    console.log(scoresArray);
    console.log("Game Over");
    hideButtons(11);
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        bowl(i);
    })
}

function hideButtons (num) {
    for (let i = (11 - num); i < buttons.length; i++) {
        buttons[i].classList.add('hide');
    }
}

function showButtons () {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('hide');
    }
}
