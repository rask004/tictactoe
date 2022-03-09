let board
let currentPlayer
let playGame = false
let result = ""

const newGame = function() {
    board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]]
    resetCurrentPlayer("X")
    resultMessage("")
    renderGame()
    playGame = true
}

const renderGame = function() {
    for (let y in board) {
        for (let x in board[y]) {
            const space = document.querySelector(`#space-${x}-${y}`)
            space.innerHTML = board[y][x]
        }
    }

    const resultElement = document.querySelector(`#result`)
    resultElement.innerHTML = result
}

const spaceClick = function(y, x) {
    if (playGame) {
        // get space coords
        const space = board[y][x]

        // if content empty, change space content to current Player Token then change to next player
        if (space === " ") {
            board[y][x] = currentPlayer
            const win = checkWin()
            if (win !== undefined ) {
                resultMessage(`${win} has Won!`)
            } else {
                nextPlayer()
            }
            renderGame()
        }
    }
}

const checkWin = function() {
    let win = undefined
    // check all rows
    for (let y in board) {
        const row = `${board[y][0]}${board[y][1]}${board[y][2]}`
        switch (row) {
            case row.includes("O") && !(row.includes("X") || row.includes(" ")):
                win = "O";
                break;
            case row.includes("X") && !(row.includes("O") || row.includes(" ")):
                win = "X";
                break;
            default:
                break;
        }
        if (win !== undefined) {
            break;
        }
    }
    // check all cols if win not already found
    if (win === undefined) {
        for (let x in board) {
            const col = `${board[0][x]}${board[1][x]}${board[2][x]}`
            switch (col) {
                case col.includes("O") && !(col.includes("X") || col.includes(" ")):
                    win = "O";
                    break;
                case col.includes("X") && !(col.includes("O") || col.includes(" ")):
                    win = "X";
                    break;
                default:
                    break;
            }
            if (win !== undefined) {
                break;
            }
        }
    }
    // check the 2 diagonals if win not already found
    if (win === undefined) {
        const col = `${board[0][0]}${board[1][1]}${board[2][2]}`
        switch (col) {
            case col.includes("O") && !(col.includes("X") || col.includes(" ")):
                win = "O";
                break;
            case col.includes("X") && !(col.includes("O") || col.includes(" ")):
                win = "X";
                break;
            default:
                break;
        }
    }
    if (win === undefined) {
        const col = `${board[0][2]}${board[1][1]}${board[2][0]}`
        switch (col) {
            case col.includes("O") && !(col.includes("X") || col.includes(" ")):
                win = "O";
                break;
            case col.includes("X") && !(col.includes("O") || col.includes(" ")):
                win = "X";
                break;
            default:
                break;
        }
    }

    // set playGame to false if a win is set
    if (win !== undefined) {
        playGame = false;
    }

    return win;
}

const resultMessage = function(message) {
    result = message
}

const nextPlayer = function() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
}

const resetCurrentPlayer = function(player) {
    currentPlayer = player
}

window.onload = function() {
    newGame()
}