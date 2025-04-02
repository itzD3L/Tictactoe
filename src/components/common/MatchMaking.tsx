import styles from '../../styles/styles.module.css'
import { socket } from '../../services/socket';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGameState } from '../../hooks/useGameState'
import { usePlayerState } from '../../hooks/usePlayerState';

interface MatchMakingProps {
    playerName: string;
    gameMode: 'classic' | 'enhanced' | 'endless'
    cancelMatchMaking: () => void;
}

const MatchMaking: React.FC<MatchMakingProps> = ({playerName, gameMode, cancelMatchMaking}) => {
    const navigate = useNavigate();
    const [matchFound, setMatchFound] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(5); // better move this to the backend
    const {
        currentPlayer,
        setCurrentPlayer,
        opponent,
        setOpponent
    } = usePlayerState();

    const {
        setGameId, 
        setCurrentTurn,
        setGameMode,
        setBoard,
        setStatus
    } = useGameState();

    useEffect(() => {
        socket.timeout(1000).emit('findGame', {
            playerName,
            gameMode 
        })

        socket.on('waitingForOpponent', () => {
            setMatchFound(false)
        })

        socket.on('gameStart', (gameData) => {
            const { gameId, currentTurn, gameMode, board, players } = gameData;
            setGameId(gameId)
            setCurrentPlayer(players[socket.id as keyof typeof players])
            const opponentId = Object.keys(players).find(id => id !== socket.id)
            setOpponent(players[opponentId as keyof typeof players])
            setCurrentTurn(currentTurn)
            setGameMode(gameMode)
            setBoard(board)

            setMatchFound(true)
        })

        socket.on('cancelMatchMaking', () => {
            cancelMatchMaking();
        })

        socket.on('gameCountDown', ({ countDown }) => {
            setCountdown(countDown)
        })

        socket.on('playerLeft', ({ status }) => {
            if(status === 'left') {
                setStatus(status)
            }
        })

        return () => {
            socket.off('waitingForOpponent')
            socket.off('gameStart')
            socket.off('cancelMatchMaking')
            socket.off('gameCountDown')
            socket.off('playerLeft')
        }
    }, [])

    // useEffect(() => {
    //     let timer: NodeJS.Timeout;
    //     if(matchFound) {
    //         timer = setInterval(() => {
    //             setCountdown(prev => prev - 1);
    //             }, 1000)
    //     }
    //     return () => clearInterval(timer);
    // }, [matchFound])

    useEffect(() => {
        if(countdown === 0) {
            navigate(`game`)
        }
    }, [countdown, navigate])

    const cancelFindingMatch = () => {
        socket.emit('cancelMatchMaking')
        
    }

    const content = (
        <div className={styles.matchMakingBG}>
            <div className={styles.matchMakingContainer}>
                <p className={styles.matchMakingGameMode}>{gameMode}</p>
                {!matchFound ? 
                    <div className={styles.matchMakingContent}>
                        <p className={styles.matchMakingTitle}>Waiting for player</p>
                        <span className={styles.contentLoader} />
                        <button className={styles.cancelBTN} onClick={cancelFindingMatch}>Cancel</button>
                    </div>
                :
                    <div className={styles.matchMakingContent}>
                        <p className={styles.matchMakingTitle}>Match found</p>
                        <div className={styles.matchFoundInfo}>
                            <p>{currentPlayer.playerName}</p>
                            <p>vs</p>
                            <p>{opponent.playerName}</p>
                        </div>
                        <div className={styles.matchFoundCountDown}>
                            <p>{countdown}</p>
                            <span className={styles.matchFound__contentLoader} />
                        </div>
                    </div>
                } 
            </div>
            
        </div>
    );

    return content
}

export default MatchMaking;