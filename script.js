const pinsHit = document.querySelector("#pinsHit")
const pinsHitFirst = pinsHit.querySelectorAll(".first")
const pinsHitSecond = pinsHit.querySelectorAll(".second")
const pinsHitThird = pinsHit.querySelector(".third")

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
let strike = false
let spare = false

let frameNum = `frame${frame}`;

function frameNo () {
    if (ball === 1) {
        ball++;
    } else if (ball === 2) {
        frame++;
        ball--;
    }
    console.log(`ball is ${ball}`)
    console.log(`frame is ${frame}`)
}

zero = document.getElementById("zero");

zero.addEventListener("click", function zero() {
    pinsHitFirst[frame-1].textContent = 0;
    frameNo()
})