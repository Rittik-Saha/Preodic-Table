document.addEventListener('DOMContentLoaded', () => {
    let board = null;
    const game = new Chess();
    const moveHistory = document.getElementById('move-history');
    let moveCount = 1;
    let userColor = 'w';

    const moveSound = new Audio('move-self.mp3');
    const checkmateSound = new Audio('chess_titans_check.mp3');

    function playSound(audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Audio Error:", e));
    }

    // এই ফাংশনটি প্রতিটি চালের পর সাউন্ড কন্ট্রোল করবে
    const playCorrectSound = (moveResult) => {
        if (game.in_checkmate()) {
            // যদি গেম শেষ এবং চেকমেট হয়
            playSound(checkmateSound);
            console.log("Status: Checkmate");
        } else if (game.in_check() || (moveResult && moveResult.san.includes('+'))) {
            // যদি শুধু চেক (কিস্তি) দেওয়া হয়, তবেও আপনি চাইলে এই সাউন্ড বাজাতে পারেন
            // বর্তমানে চেকমেট সাউন্ডই দিচ্ছি আপনার অনুরোধ অনুযায়ী
            playSound(checkmateSound);
            console.log("Status: Check");
        } else {
            // সাধারণ চাল
            playSound(moveSound);
        }
    };

    const makeRandomMove = () => {
        if (game.game_over()) return;

        const possibleMoves = game.moves();
        if (possibleMoves.length === 0) return;

        const randomIdx = Math.floor(Math.random() * possibleMoves.length);
        const moveStr = possibleMoves[randomIdx];
        
        const move = game.move(moveStr);
        board.position(game.fen());
        recordMove(move.san, moveCount);
        moveCount++;

        playCorrectSound(move);

        if (game.in_checkmate()) {
            setTimeout(() => alert("Checkmate! Computer Wins."), 500);
        }
    };

    const onDrop = (source, target) => {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (move === null) return 'snapback';

        recordMove(move.san, moveCount);
        moveCount++;

        // ইউজার চাল দেওয়ার সাথে সাথে সাউন্ড বাজবে
        playCorrectSound(move);

        if (game.in_checkmate()) {
            setTimeout(() => alert("Checkmate! You Win!"), 500);
        } else {
            window.setTimeout(makeRandomMove, 600);
        }
    };

    const recordMove = (move, count) => {
        const formattedMove = count % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`;
        moveHistory.textContent += formattedMove + ' ';
        moveHistory.scrollTop = moveHistory.scrollHeight;
    };

    const boardConfig = {
        draggable: true,
        position: 'start',
        onDragStart: (s, p) => !game.game_over() && p.search(userColor) === 0,
        onDrop: onDrop,
        onSnapEnd: () => board.position(game.fen()),
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
    };

    board = Chessboard('board', boardConfig);

    // Buttons
    document.querySelector('.play-again').addEventListener('click', () => {
        game.reset(); board.start(); moveHistory.textContent = ''; moveCount = 1;
    });

    document.querySelector('.set-pos').addEventListener('click', () => {
        const fen = prompt("Enter FEN:");
        if (fen && game.load(fen)) { board.position(game.fen()); userColor = game.turn(); }
    });

    document.querySelector('.flip-board').addEventListener('click', () => {
        board.flip(); userColor = userColor === 'w' ? 'b' : 'w';
        if (game.turn() !== userColor) window.setTimeout(makeRandomMove, 600);
    });
});