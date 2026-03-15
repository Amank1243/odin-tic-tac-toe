const gameBoard = (()=> {
    let gameBoard = new Array(9).fill(" ");

    const display = () => {
        console.log('|' +gameBoard[0] +'|' + gameBoard[1] + '|' + gameBoard[2] + '|' +'\n' +
                    '|' + gameBoard[3] + '|' + gameBoard[4] + '|' + gameBoard[5] + '|' +'\n' +
                    '|' + gameBoard[6] + '|' + gameBoard[7] + '|' + gameBoard[8] + '|' + '\n')
    }

    return {gameBoard, display};
})();

const players = (() => {

    const Player = (isTurn) => {
        const switchTurn = () => isTurn = !isTurn;
        const getIsTurn = () => isTurn;

        return {switchTurn, getIsTurn};
    }

    return {Player};

})();

const playGame = (() => {

    const checkForWin = () => {

    };

    let player1 = players.Player(true);
    let player2 = players.Player(false);

    let playRound = (index) => {

        if (player1.getIsTurn() == true) {
            console.log("It's player1's turn");

             if (parseInt(index) > 8) {
                throw new Error("Value is outside of the gameboard");
            }

            console.log("Throw should stop this message for player 1");

            if (gameBoard.gameBoard[index].includes("O") || gameBoard.gameBoard[index].includes("X")) {
                throw console.error("Space already has a marker on it");
            }

            gameBoard.gameBoard[parseInt(index)] = "X";

           

            player1.switchTurn();
            player2.switchTurn();

            gameBoard.display();
        } else if (player2.getIsTurn() == true) {
            console.log("It's player2's turn");
            
            if (parseInt(index) > 8) {
                throw console.error("Value is outside of the 0-8 length index");
            };

            if (gameBoard.gameBoard[index].includes("O") || gameBoard.gameBoard[index].includes("X")) {
                throw new Error("Space already has a marker on it");
            }

            gameBoard.gameBoard[parseInt(index)] = "O";

            player1.switchTurn();
            player2.switchTurn();

            gameBoard.display();
        }

        // Play Round function switches between player 1 and 2 based off the turn attribute

        
    }

    return {playRound};
})();