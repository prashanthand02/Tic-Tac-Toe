//Getting all the HTMl tags
const winstatement = document.getElementById(`winText`);
const scoreCard = document.getElementById(`scoreCard`);
const invalidLocation = document.getElementById(`invalidLocation`);
const resetGameBtn = document.getElementById(`reset`);

// function to make the players 
player = (name, mark) => {
    return {
        name: name,
        mark: mark,
        score: 0
    }
};

// Obect that stores the game board as an array 
const gameBoard = {
    board: ["", "", "", "", "", "", "", "", ""]
};

// Object for the game flow 
const gameControl = {
    players: [
        player1 = player("Player1", "X"),
        player2 = player("Player2", "O")
    ],

    // function to switch player 
    activePlayerIndex: 0,

    switchPlayer() {
        if (this.activePlayerIndex === 0) {
            this.activePlayerIndex = 1; 
        } else {
            this.activePlayerIndex = 0;
        }
    },

    // getting  current player 
    getActivePlayer() {
        return this.players[this.activePlayerIndex]
    },
    
    // updating the cells of the board 
    playRound(location) {
        // making sure the player doesn't select the same cell more than once 
        if (gameBoard.board[location] === "") {
            let activePlayer = this.getActivePlayer();
            gameBoard.board[location] = activePlayer.mark;
            displayGame.gamecells();
            this.lastPlayer = activePlayer;
            this.switchPlayer();
            displayGame.updateCell();
            this.winText();
        } else {
            invalidLocation.textContent = `Location already selected! Choose a different location.`
            return;
        };
    },

    winConditions: [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], 
        [0, 4, 8],
        [2, 4, 6]
    ], 

    winText() {
        for (let i = 0; i < this.winConditions.length; i++) {
            let activePlayer = this.getActivePlayer();
            const conditions = this.winConditions[i];
            const cellA = gameBoard.board[conditions[0]];
            const cellB = gameBoard.board[conditions[1]];
            const cellC = gameBoard.board[conditions[2]];
            
            if (cellA === cellB && cellB === cellC && cellA != "") {
                winstatement.textContent = `🎉${this.lastPlayer.name} with "${this.lastPlayer.mark}" won🎉`;
                this.lastPlayer.score++;
                this.reset();
                displayGame.clearBoard();
                return true;
            };
        };
        if (!gameBoard.board.includes("")) {
            winstatement.textContent = `It's a draw`;
            this.reset();
            displayGame.clearBoard();
            return true;
        };
        return false;
    },

    // A reset function that resets the game board 
    reset() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i] = "";
        }
        this.activePlayerIndex = 0;
        this.showScore();
        displayGame.clearBoard();
    },

    // A function to console log the player's name with the score
    showScore () {
        scoreCard.textContent = `${this.players[0].name} score: ${this.players[0].score},
        ${this.players[1].name} score: ${this.players[1].score}`
    },

    gameReset () {
        this.players[0].score = 0;
        this.players[1].score = 0;
        this.reset();
        displayGame.clearBoard();
    }
    
};

const gameContainer = document.getElementById(`gameBoard`);

const displayGame = {
    //function that reders the game board and its content
    gamecells() {
        gameContainer.innerHTML = '';
        gameControl.showScore();
        for (let i = 0; i < gameBoard.board.length; i++) {
            cell = document.createElement(`div`);
            cell.classList.add(`gameCells`);
            cell.textContent = gameBoard.board[i];
            gameContainer.appendChild(cell);
        };
    },
    
    //function that clears the board 
    clearBoard() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameContainer.children[i].textContent = "";
        }
    },

    //function that updates the cells of the board when clicked
    updateCell () {
        winstatement.textContent = ``;
        invalidLocation.textContent = ``;
        const cells = document.querySelectorAll(`.gameCells`);
        cells.forEach((cell, idx) => {
            cell.addEventListener(`click`, () => {
                gameControl.playRound(idx);
            });
        });
    },
};

displayGame.gamecells();
displayGame.updateCell();

// Adding to event listener to reset btn 
resetGameBtn.addEventListener(`click`, () => {
    gameControl.gameReset();
    winstatement.textContent = ``;
     invalidLocation.textContent = ``;
});
