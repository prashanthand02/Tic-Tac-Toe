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
            console.log(gameBoard.board);
        } else {
            console.log("Location already selected! Choose a different location.");
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
                console.log(`${this.lastPlayer.name} with "${this.lastPlayer.mark}" won`);
                this.lastPlayer.score++;
                this.reset();
                return true;
            } else if (!gameBoard.board.includes("")) {
                console.log(`It's a draw`);
                this.reset();
                return true;
            } else {
                return false;
            };
        };
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
        console.log(`${this.players[0].name} score: ${this.players[0].score}`);
        console.log(`${this.players[1].name} score: ${this.players[1].score}`);
    },

    gameReset () {
        this.activePlayerIndex = 0;
        this.players[0].score = 0;
        this.players[1].score = 0;
        this.reset();
        displayGame.clearBoard();
    }
    
};

const gameContainer = document.getElementById(`gameBoard`);

const displayGame = {
    
    gamecells() {
        gameContainer.innerHTML = '';
        for (let i = 0; i < gameBoard.board.length; i++) {
            cell = document.createElement(`div`);
            cell.classList.add(`gameCells`);
            cell.textContent = gameBoard.board[i];
            cell.style.border = `1px solid black`;
            cell.style.height = `40px`;
            cell.style.width = `40px`;
            gameContainer.appendChild(cell);
        };
    },

    clearBoard() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameContainer.children[i].textContent = "";
        }
    },

    updateCell () {
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

// gameControl.playRound(0);//c
// gameControl.playRound(3);//o
// gameControl.playRound(6);//c
// gameControl.playRound(4);//o
// gameControl.playRound(8);//c
// gameControl.playRound(5);//o