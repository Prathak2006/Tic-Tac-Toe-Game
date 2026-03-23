let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let setupBox = document.querySelector("#setup-box");

let playerO = document.querySelector("#playerO");
let playerX = document.querySelector("#playerX");

let startBtn = document.querySelector("#start-btn");
let matchInput = document.querySelector("#match-count");

let currentMatchDisplay = document.querySelector("#currentMatch");
let totalMatchDisplay = document.querySelector("#totalMatch");

let turnO = true;
let scoreO = 0;
let scoreX = 0;
let totalMatches = 0;
let currentMatch = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

alert("Please Enter no of Games and Click on Start game to play the game ");
// enable buttons 
const enableBtns = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

//disable buttons 
const disableBtns = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

disableBtns();
// reset board only
const resetGame = () => {
    turnO = true;
    enableBtns();
    msgContainer.classList.add("hide");
    updateTurnUI();
};
// start game
startBtn.addEventListener("click", () => {
    totalMatches = parseInt(matchInput.value);
    currentMatch = 0;


    if (!totalMatches) {
        alert("Enter valid match number");
        return;
    }

    totalMatchDisplay.innerText = totalMatches;
    currentMatchDisplay.innerText = 1;

    setupBox.classList.add("hide");

    enableBtns();
    resetGame();
});


// highlight turn
const updateTurnUI = () => {
    if (turnO) {
        playerO.classList.add("active");
        playerX.classList.remove("active");
    } else {
        playerX.classList.add("active");
        playerO.classList.remove("active");
    }
};

//new game (reset completely)
const newGame = () => {
    scoreO = 0;
    scoreX = 0;
    currentMatch = 0;

    setupBox.classList.remove("hide");
    document.querySelector("#scoreO").innerText = scoreO;
    document.querySelector("#scoreX").innerText = scoreX;
    currentMatchDisplay.innerText = 0;
    totalMatchDisplay.innerText = 0;
    resetGame();
};

// winner
const showWinner = (winner) => {

    if (winner === "O") {
        scoreO++;
        document.querySelector("#scoreO").innerText = scoreO;
    } else {
        scoreX++;
        document.querySelector("#scoreX").innerText = scoreX;
    }

    currentMatch++;


    if (currentMatch < totalMatches) {
        currentMatchDisplay.innerText = currentMatch + 1;
    }

    // last match
    if (currentMatch === totalMatches) {

        let finalWinner;

        if (scoreO > scoreX) {
            finalWinner = "Player O";
        }
        else if (scoreX > scoreO) {
            finalWinner = "Player X";
        }
        else {
            finalWinner = "Match Draw";
        }

        msg.innerText = ` Winner is : ${finalWinner}`;
        msgContainer.classList.remove("hide");
        disableBtns();
    }
    else {
        setTimeout(resetGame, 1000);
    }
};
//click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        updateTurnUI();

        checkWinner();
    });
});


// check for winner 
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", newGame);