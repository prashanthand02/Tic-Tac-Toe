// function to make the players 
player = (name, mark) => {
    return {
        name: name,
        mark: mark
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
        let activePlayer = this.getActivePlayer();
        gameBoard.board[location] = activePlayer.mark;
        this.switchPlayer();
        console.log(gameBoard.board);
    },
};

gameControl.playRound(3);