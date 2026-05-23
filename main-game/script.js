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
        player1 = player("bob", "C"),
        player2 = player("alex", "O")
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
            this.lastPlayer = activePlayer;
            console.log(gameBoard.board);
            this.switchPlayer();
            this.winText();
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
            } else if (!gameBoard.board.includes("")) {
                console.log(`It's a draw`);
                this.reset();
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
    },

    // A function to console log the player's name with the score
    showScore () {
        console.log(`${this.players[0].name} score: ${this.players[0].score}`);
        console.log(`${this.players[1].name} score: ${this.players[1].score}`);
    }

    // function to play 3 rounds then declare the winner 
    
};


// gameControl.playRound(0);//c
// gameControl.playRound(3);//o
// gameControl.playRound(6);//c
// gameControl.playRound(4);//o
// gameControl.playRound(8);//c
// gameControl.playRound(5);//o