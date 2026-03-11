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
        const switchTurn = (isTurn) => !isTurn;
        const getIsTurn = () => isTurn;

        return {switchTurn, getIsTurn};
    }

    return {Player};

})();

const playGame = (() => {

    let player1 = players.Player(true);
    let player2 = players.Player(false);

    gameBoard.display();

    if (player1.getIsTurn() == true) {
        console.log("It's player1's turn");
        let input = prompt("Player1, Choose where you want to place your x!");
        gameBoard.gameBoard[parseInt(input)] = "X";

        player1.switchTurn();
        player2.switchTurn();

        gameBoard.display();
    }

    if (player2.getIsTurn() == true) {
        console.log("It's player2's turn");
        input = prompt("Player2, choose where you want to place your O!");
    }
})();