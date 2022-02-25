const pinsHit = document.querySelector("#pinsHit")
const pinsHitFirst = pinsHit.querySelectorAll(".first")
const pinsHitSecond = pinsHit.querySelectorAll(".second")
const pinsHitThird = pinsHit.querySelector(".third")
const frameScore = document.querySelectorAll("#score > td")
const buttons = document.querySelectorAll(".buttons > button")

let frame = 1
let ball = 1
let pins = 10
let score = 0
let frame1 = 0
let frame2 = 0
let frame3 = 0
let frame4 = 0
let frame5 = 0
let frame6 = 0
let frame7 = 0
let frame8 = 0
let frame9 = 0
let frame10 = 0

function bowl (num) {
    if (ball === 1) {
        hideButtons(num);
        if (num === 10) {
            strike();
            return;
        }
        pinsHitFirst[frame-1].textContent = num;
        score += num;
        frameScore[frame-1].textContent = score;
        ball++;
    } else if (ball === 2) {
        pinsHitSecond[frame-1].textContent = num;
        score += num;
        frameScore[frame-1].textContent = score;
        nextFrame();
        showButtons();
    }
    console.log(`frame is ${frame}`)
    console.log(`ball is ${ball}`)
}

function strike() {
    pinsHitSecond[frame-1].textContent = "X";
    score += 10;
    frameScore[frame-1].textContent = score;
    nextFrame();
    showButtons();
}

function nextFrame() {
    frame++;
    ball = 1;
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