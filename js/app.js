/*-------------------------------- Constants --------------------------------*/

const winningOptions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/*---------------------------- Variables (state) ----------------------------*/
let playerChoice;

let board = [
    '','','',
    '','','',
    '','',''
];
let turn = 'X';
let winner = false;
let tie = false;


/*------------------------ Cached Element References ------------------------*/

//Stores all the nine elements of the square
const squareEls = document.querySelectorAll('.sqr');
console.log(squareEls);
//Game status
const messageEl = document.querySelector('#message');


/*-------------------------------- Functions --------------------------------*/


const render = () => {
    messageEl.textContent = "----:)-----"
    init();
}


//To reset the game
const init = () => {
  squareEls.forEach (spot => {
    if (spot.textContent) {
        spot.textContent = '';
    }
  })
}

const setPlayerChoice = (event) => {
    let index = event.target.id;
    playerChoice = event.innerText = turn;
    if (board[index] !== '') {
        return; 
    }
    board[index] = playerChoice;

    board.forEach((element, index)=>{
        squareEls[index].innerHTML = element;
    })
    winningPlayer();
};
    
const winningPlayer = () => {
    let gameWon = false;

    for (let combo of winningOptions) {
        let count = 0;
        for (let index of combo) {
            if (board[index] === turn) {
                count++;
            }
        }
        if (count === 3) {
            messageEl.innerText = `Player ${turn} wins!`;
            winner = true;
            gameWon = true;
            break;
        }
    }

    if (!gameWon && !board.includes('')) {
        messageEl.innerText = "It's a tie!";
        tie = true;
    }

    if (!winner && !tie) {
        turn = turn === 'X' ? 'O' : 'X';
        messageEl.innerText = `Player ${turn}'s turn`;
    }
};

render();


/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach (selectedSpot => {
    selectedSpot.addEventListener('click', setPlayerChoice);
})