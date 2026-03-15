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

    let player1 = players.Player(true);
    let player2 = players.Player(false);

    let gameOver = false;

    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ];

     const checkForWin = (board) => {
        for (const [indexA, indexB, indexC] of winningCombos) {
            
            if (board[indexA] == "O" && board[indexB] == "O" && board[indexC] == "O") {
                console.log("Winner!");
                gameOver = true;
                break;
            } else if (board[indexA] == "X" && board[indexB] == "X" && board[indexC] == "X") {
                console.log("Winner!");
                gameOver = true;
                break;
            }
        }
    };

    let playRound = (index) => {

        if (player1.getIsTurn() == true) {

            if (gameOver == true) {
                console.log("The game has ended");
                return;
           };

            console.log("It's player1's turn");

             if (parseInt(index) > 8) {
                throw new Error("Value is outside of the gameboard");
            };

            if (gameBoard.gameBoard[index].includes("O") || gameBoard.gameBoard[index].includes("X")) {
                throw new Error("Space already has a marker on it");
            };

            gameBoard.gameBoard[parseInt(index)] = "X";
            gameBoard.display();
           
            checkForWin(gameBoard.gameBoard);

            player1.switchTurn();
            player2.switchTurn();

            
        } else if (player2.getIsTurn() == true) {

             if (gameOver == true) {
                console.log("The game has ended");
                return;
            };

            console.log("It's player2's turn");
            
            if (parseInt(index) > 8) {
                throw new Error("Value is outside of the 0-8 length index");
            };

            if (gameBoard.gameBoard[index].includes("O") || gameBoard.gameBoard[index].includes("X")) {
                throw new Error("Space already has a marker on it");
            };

            gameBoard.gameBoard[parseInt(index)] = "O";
            gameBoard.display();

            checkForWin(gameBoard.gameBoard);

            player1.switchTurn();
            player2.switchTurn();
        };
    };
    return {playRound};
})();