import styles from './styles.module.css'
import { motion } from 'motion/react'
import { socket } from '../socket'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useGameState } from '../hooks/useGameState'
import { usePlayerState } from '../hooks/usePlayerState'
import Shape from './Shape'
import Result from './Result'

const Game : React.FC = () => {
    const navigate = useNavigate()
    const {
        currentPlayer,
        opponent,
    } = usePlayerState();

    const {
        gameId,
        currentTurn,
        setCurrentTurn,
        board,
        setBoard,
        status,
        setStatus
    } = useGameState();
    
    const [gameCompleted, setGameCompleted] = useState(false)

    useEffect(() => {
        if(!gameId) {
            navigate('/', { replace: true })
        }
        if(status === 'left') {
            setGameCompleted(true)
        }

        socket.on('boardUpdated', ({ board, currentTurn }) => {
            setBoard(board)
            setCurrentTurn(currentTurn)
        })

        socket.on('gameOver', ({ status, player }) => {
            const storedRecord = JSON.parse(sessionStorage.getItem('record') || '{}')

            if(status === 'draw') {
                storedRecord.draw = (storedRecord.draw || null) + 1;
                sessionStorage.setItem('record', JSON.stringify(storedRecord))
                setStatus(status)
            } else {
                if(player.playerId === currentPlayer.playerId) {
                    storedRecord.win = (storedRecord.win || null) + 1;
                    sessionStorage.setItem('record', JSON.stringify(storedRecord))
                    setStatus('win')
                } else {
                    storedRecord.lose = (storedRecord.lose || null) + 1;
                    sessionStorage.setItem('record', JSON.stringify(storedRecord))
                    setStatus('lose')
                }
            }
            setGameCompleted(true)
        })

        socket.on('playerLeft', ({ status }) => {
            if(status === 'left') {
                setStatus(status)
                setGameCompleted(true)
            }
        })

        return () => {
            socket.off('boardUpdate');
            socket.off('gameOver');
            socket.off('playerLeft');
        }
    }, [])

    const submitMove = (boxNum : number) => {
        console.table(currentPlayer)
        if(!Boolean(board[boxNum])) {
            if(socket.id === currentTurn.playerId) {
                socket.emit('makeMove', {
                    gameId,
                    boxNum,
                    currentPlayer
                })
            }
        }
    }

    //////////////////BOX ANIMATION/////////////////////////
    const variants = {
        hidden: {
            scale: 0,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
        }
    }
    const paternNumber = Math.floor(Math.random() * 8) // Random number between 0-7
    const durationTime = 0.5
    const delayPatern = [
        [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8], // Sequential
        [0.2, 0.4, 0.8, 0.6, 1, 1.4, 1.2, 1.6, 1.8], // Random
        [0.2, 0.4, 0.6, 0.4, 0.6, 0.8, 0.6, 0.8, 1], // Your pattern
        [0.2, 0.2, 0.2, 0.6, 0.6, 0.6, 1, 1, 1],     // Row by row
        [0.2, 0.6, 1, 0.2, 0.6, 1, 0.2, 0.6, 1],     // Column by column
        [0.2, 0.2, 0.4, 0.4, 0.6, 0.8, 0.8, 1, 1],   // Diamond shape
        [1, 0.8, 0.6, 0.8, 0.6, 0.4, 0.6, 0.4, 0.2], // Spiral inward
        [0.2, 0.4, 0.2, 0.4, 0.6, 0.4, 0.2, 0.4, 0.2] // X pattern
    ]
    ///////////////////////////////////////////////////////////

    let content = (
        <div className={styles.gameContainer}>
            {gameCompleted && <Result opponentName={opponent.playerName} result={status}/>}
            <div className={styles.game__title}>
                <h1>Tic Tac Toe</h1>
            </div>
            <div className={styles.game__player}>
                <p>You : {currentPlayer.playerName}</p>
                <p>Opponent : {opponent.playerName}</p>
            </div>
            <div className={styles.game__you}>
                <p>You're playing as {currentPlayer.symbol}</p>
            </div>
            <div className={styles.game__turn}>
                <p>{currentTurn.playerName} {currentTurn.symbol}'s turn</p>
            </div>
            <div className={styles.game__boxes}>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][0]
                    }}
                    disabled={Boolean(board[0])}
                    onClick={() => submitMove(0)}
                >{board[0] && <Shape shape={board[0]?.symbol}/>}</motion.button>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][1]
                    }}
                    disabled={Boolean(board[1])}
                    onClick={() => submitMove(1)}
                >{board[1] && <Shape shape={board[1].symbol}/>}</motion.button>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][2]
                    }}
                    disabled={Boolean(board[2])}
                    onClick={() => submitMove(2)}
                >{board[2] && <Shape shape={board[2].symbol}/>}</motion.button>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][3]
                    }}
                    disabled={Boolean(board[3])}
                    onClick={() => submitMove(3)}
                >{board[3] && <Shape shape={board[3].symbol}/>}</motion.button>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][4]
                    }}
                    disabled={Boolean(board[4])}
                    onClick={() => submitMove(4)}
                >{board[4] && <Shape shape={board[4].symbol}/>}</motion.button>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][5]
                    }}
                    disabled={Boolean(board[5])}
                    onClick={() => submitMove(5)}
                >{board[5] && <Shape shape={board[5].symbol}/>}</motion.button>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][6]
                    }}
                    disabled={Boolean(board[6])}
                    onClick={() => submitMove(6)}
                >{board[6] && <Shape shape={board[6].symbol}/>}</motion.button>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][7]
                    }}
                    disabled={Boolean(board[7])}
                    onClick={() => submitMove(7)}
                >{board[7] && <Shape shape={board[7].symbol}/>}</motion.button>
                <motion.button
                    className={styles.game__boxes_cell}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: durationTime,
                        delay: delayPatern[paternNumber][8]
                    }}
                    disabled={Boolean(board[8])}
                    onClick={() => submitMove(8)}
                >{board[8] && <Shape shape={board[8].symbol}/>}</motion.button>
            </div>
        </div>
    )

    return content
}

export default Game