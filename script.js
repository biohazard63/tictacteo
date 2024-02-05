let board = Array(9).fill(null);
let currentPlayer = 'X';
let soloGame = false;

function cellClicked(cell) {
    let id = parseInt(cell.id.replace('cell', ''));
    if (board[id] === null) {
        board[id] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            setTimeout(() => {
                alert(currentPlayer + ' a gagné !');
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (!board.includes(null)) {
                setTimeout(() => {
                    alert('Égalité !');
                    resetGame();
                }, 100);
            } else if (soloGame && currentPlayer === 'O') {
                // Si le jeu est en mode solo et que c'est le tour de l'ordinateur, faire un mouvement
                makeComputerMove();
            }
        }
    }
}

function findWinningMove(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
        [0, 4, 8], [2, 4, 6]            // Diagonales
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] === player && board[b] === player && board[c] === null) return c;
        if (board[a] === player && board[c] === player && board[b] === null) return b;
        if (board[b] === player && board[c] === player && board[a] === null) return a;
    }
    return null;
}

function makeComputerMove() {
    // Logique avancée pour choisir le coup de l'ordinateur
    let move = findWinningMove(board, 'O');
    if (move !== null) {
        document.getElementById('cell' + move).click();
        return;
    }

    move = findWinningMove(board, 'X');
    if (move !== null) {
        document.getElementById('cell' + move).click();
        return;
    }

    if (board[4] === null) {
        document.getElementById('cell4').click();
        return;
    }

    const corners = [0, 2, 6, 8];
    let availableCorners = corners.filter(index => board[index] === null);
    if (availableCorners.length > 0) {
        let randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        document.getElementById('cell' + randomCorner).click();
        return;
    }

    let availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    if (availableCells.length > 0) {
        let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        document.getElementById('cell' + randomCell).click();
    }
}


function checkWin(player) {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return wins.some(win => win.every(id => board[id] === player));
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    document.querySelectorAll('td').forEach(cell => cell.textContent = '');
}

document.querySelectorAll('td').forEach(cell => {
    cell.addEventListener('click', function() {
        cellClicked(this);
    });
});

document.getElementById('resetButton').addEventListener('click', resetGame);

document.getElementById('startButton').addEventListener('click', function() {
    let gameMode = prompt("Voulez-vous jouer en solo ou à deux joueurs ? Tapez 'solo' pour jouer en solo, ou 'deux' pour jouer à deux joueurs.");
    if (gameMode === 'solo') {
        soloGame = true;
    } else if (gameMode === 'deux') {
        soloGame = false;
    } else {
        alert("Entrée non valide. Veuillez cliquer à nouveau sur 'Commencer la partie' et entrer 'solo' ou 'deux'.");
    }
});