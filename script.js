// 
// GAMEBOARD 
// 

const gameBoard = (()=> {
    let gameBoard = new Array(9).fill(" ");

    const grid = document.querySelector(".gameboard");
    const changeNameButton = document.querySelector("button.changePlayerName");
    const modal = document.querySelector("dialog");
    const player1Input = document.querySelector("#Player1");
    const player2Input = document.querySelector("#Player2");
    const submitButton = document.querySelector("button.submit");
    const resetButton = document.querySelector("button.resetButton");

    let gridSquares = [];

    const renderGrid = (()=> {
        for (const item of gameBoard) {
            const square = document.createElement("div");
            square.className = "square";
            square.textContent = item;

            gridSquares.push(square);
            grid.appendChild(square);
        };
    })();

    const display = () => {
        console.log('|' +gameBoard[0] +'|' + gameBoard[1] + '|' + gameBoard[2] + '|' +'\n' +
                    '|' + gameBoard[3] + '|' + gameBoard[4] + '|' + gameBoard[5] + '|' +'\n' +
                    '|' + gameBoard[6] + '|' + gameBoard[7] + '|' + gameBoard[8] + '|' + '\n')
    };

    changeNameButton.addEventListener("click", ()=>{
        modal.showModal();
    });

    let changePlayerName = (player1, player2)=> {
        
        submitButton.addEventListener("click", (event)=>{
            event.preventDefault();

            if (player1Input.value != "") {
                 player1.changeName(player1Input.value)
            } else {
                player1.getName();
            }

           if (player2Input.value != "") {
                 player2.changeName(player2Input.value)
            } else {
                player1.getName();
            }

            modal.close();
        })
    };
    let resetGame = (player1, player2, over, gameText) => {
        resetButton.addEventListener("click", ()=>{
            gameBoard.fill(" ");

            for (const square of gridSquares) {
                square.textContent = gameBoard[gridSquares.indexOf(square)];
            };

            player1.changeName("Player 1");
            player2.changeName("Player 2");

            over = false;

            player1.setTurn(true);
            player2.setTurn(false);

            gameText.textContent = "Player 1's Turn";
        });
    }
    return {gameBoard, display, gridSquares, changePlayerName, resetGame};
})();

// 
// PLAYERS
// 

const players = (() => {

    const Player = (isTurn, playerName) => {
        const switchTurn = () => isTurn = !isTurn;
        const getIsTurn = () => isTurn;
        const setTurn = (boolean) => isTurn = boolean;

        const getName = () => playerName;
        const changeName = (newPlayerName) => playerName = newPlayerName;

        return {switchTurn, getIsTurn, getName, changeName, setTurn};
    }

    return {Player};

})();

// 
// PLAYGAME
// 

const playGame = (() => {

    let player1 = players.Player(true, "Player 1");
    let player2 = players.Player(false, "Player 2");

    const gameText = document.querySelector("p.gameText")

    let gameOver = false;

    gameBoard.resetGame(player1, player2, gameOver, gameText);

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

    gameBoard.changePlayerName(player1, player2);

     const checkForGameEnd = (board) => {
        for (const [indexA, indexB, indexC] of winningCombos) {
            
            if (board[indexA] == "O" && board[indexB] == "O" && board[indexC] == "O") {
                gameText.textContent = "Winner!";
                gameOver = true;
                break;
            } else if (board[indexA] == "X" && board[indexB] == "X" && board[indexC] == "X") {
                gameText.textContent = "Winner!";
                gameOver = true;
                break;
            } else if (!board.includes(" ")) {
                gameText.textContent = "The Game was a Tie!";
                gameOver = true;
                break;
            }
        }
    };

    const playRound = (index) => {
       
        if (player1.getIsTurn() == true) {

        //     if (gameOver == true) {
        //         return;
        //    };

             gameText.textContent = player2.getName() + "'s Turn";

             if (parseInt(index) > 8) {
                 gameText.textContent = "Value is outside of the gameboard";
                throw new Error("Value is outside of the gameboard");
            };

            if (gameBoard.gameBoard[index].includes("O") || gameBoard.gameBoard[index].includes("X")) {
                 gameText.textContent = "Space already has a marker on it";
                throw new Error("Space already has a marker on it");
            };

            gameBoard.gameBoard[parseInt(index)] = "X";
            gameBoard.display();
           
            checkForGameEnd(gameBoard.gameBoard);

            player1.switchTurn();
            player2.switchTurn();

            
        } else if (player2.getIsTurn() == true) {
            //  if (gameOver == true) {
            //     return;
            // };

            gameText.textContent = player1.getName() + "'s Turn";
            
            if (parseInt(index) > 8) {
                gameText.textContent = "Value is outside of the 0-8 length index";
                throw new Error("Value is outside of the 0-8 length index");
            };

            if (gameBoard.gameBoard[index].includes("O") || gameBoard.gameBoard[index].includes("X")) {
                gameText.textContent = "Space already has a marker on it"
                throw new Error("Space already has a marker on it");
            };

            gameBoard.gameBoard[parseInt(index)] = "O";
            gameBoard.display();

            checkForGameEnd(gameBoard.gameBoard);

            player1.switchTurn();
            player2.switchTurn();
        };
    };

    // Calls the playRound function when square is clicked

    for (const square of gameBoard.gridSquares) {
        square.addEventListener("click", ()=>{
            if (gameOver == true) {
                return;
            }


            let index = gameBoard.gridSquares.indexOf(square);
            playRound(index);
            square.textContent = gameBoard.gameBoard[index];
        });
    };

    return {gameOver};

})();