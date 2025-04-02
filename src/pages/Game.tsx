import styles from '../styles/styles.module.css'
import { socket } from '../services/socket'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useGameState } from '../hooks/useGameState'
import { usePlayerState } from '../hooks/usePlayerState'
import TableClassic from '../components/layout/game/TableClassic'
import TableEnhanced from '../components/layout/game/TableEnhanced'
import Result from '../components/common/Result'
import TableEndless from '../components/layout/game/TableEndless'

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
        gameMode,
        setBoard,
        status,
        setStatus
    } = useGameState();
    
    const [gameCompleted, setGameCompleted] = useState(false)

    useEffect(() => {
        if(!gameId) {
            navigate('/tictactoe', { replace: true })
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

            if (gameId && !gameCompleted && process.env.NODE_ENV === 'production') {
                socket.emit('playerLeft')
            }
        }
    }, [])


    return (
        <div className={styles.gameContainer}>
            {gameCompleted && <Result opponentName={opponent.playerName} result={status}/>}
            <div className={styles.game__title}>
                <h1>Tic Tac Toe</h1>
                <h2>{gameMode}</h2>
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
            
            {gameMode === 'classic' ? < TableClassic/> : 
            gameMode === 'enhanced'? < TableEnhanced/> : 
            <TableEndless/>}
            
        </div>
    )
}

export default Game