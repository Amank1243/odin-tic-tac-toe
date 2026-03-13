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
        this.isTurn = isTurn;
        const switchTurn = () => this.isTurn = !isTurn;
        const getIsTurn = () => isTurn;

        return {switchTurn, getIsTurn};
    }

    return {Player};

})();

const playGame = (() => {

    let player1 = players.Player(true);
    let player2 = players.Player(false);

    let playRound = (index) => {

        if (player1.getIsTurn() == true) {
            console.log("It's player1's turn");

            gameBoard.gameBoard[parseInt(index)] = "X";

            if (index > 8) {
                throw console.error("Value is outside of the 0-8 length index");
            }

            player1.switchTurn();
            player2.switchTurn();

            gameBoard.display();
        }

        // Play Round function switches between player 1 and 2 based off the turn attribute

        if (player2.getIsTurn() == true) {
            console.log("It's player2's turn");
            
            gameBoard.gameBoard[parseInt(index)] = "O";

            if (index > 8) {
                throw console.error("Value is outside of the 0-8 length index");
            }

            player1.switchTurn();
            player2.switchTurn();

            gameBoard.display();
        }
    }

    return {playRound};
})();