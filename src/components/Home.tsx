import styles from './styles.module.css'
import tictactoepng from '../assets/tictactoe.png'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { socket } from '../socket'
import MatchMaking from './MatchMaking'
import { useGameReset } from '../hooks/useGameReset'

const Home: React.FC = () => {
    const resetGame = useGameReset();

    const [name, setName] = useState<string>('')
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [openInfo, setOpenInfo] = useState<boolean>(false)
    const [playerCount, setPlayerCount] = useState<number>(0)
    const [showMatchMaking, setShowMatchMaking] = useState<boolean>(false);
    const [record, setRecord] = useState<{win: number, lose: number, draw: number}>({win: 0, lose: 0, draw: 0})

    useEffect(() => {
        if(sessionStorage.getItem('username')) {
            setIsLoad(true)
            setName(sessionStorage.getItem('username')!)
        }
        if(sessionStorage.getItem('record')) {
            const storedRecord = JSON.parse(sessionStorage.getItem('record')!)
            setRecord(storedRecord)
        }

        socket.emit('playerCount')
        socket.on('playerCount', (count : number) => {
            setPlayerCount(count)
        })

        // useless?
        socket.on('waitingForOpponent', () => {
            setShowMatchMaking(true);
        })

        return () => {
            socket.off('playerCount')
            socket.off('waitingForOpponent')
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        resetGame()
        setOpenInfo(false)
        if(!sessionStorage.getItem('username')) {
            sessionStorage.setItem('username', name)
            setIsLoad(true)
        } else {
            setIsLoad(true)
        }
        setShowMatchMaking(true);
    }

    const cancelMatchMaking = () => {
        setShowMatchMaking(false);
    }
    
    let content = (
        <div className={styles.homeContainer}>
            {showMatchMaking ? 
                <MatchMaking playerName={name} cancelMatchMaking={cancelMatchMaking}/>
            : null}
            <motion.div
                className={styles.logo}
                initial={{ y: 100  }}
                animate={{ y: 0  }}
                transition={{ 
                    duration: 0.8, 
                    delay: 1.5 
                }}
            >
                <motion.img src={tictactoepng}  
                    alt="Tic Tac Toe"
                    className={styles.icon}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 1080 }}
                    transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 10
                    }}
                />
            </motion.div>
            <motion.div
                className={styles.formContainer}
                initial={{ 
                    scale: 0,
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    scale: [0, 1.1, 1]
                }}
                transition={{
                    duration: 0.8,
                    delay: 2.4,
                    ease: "easeOut"
                }}
            >
                <h1>Tic Tac Toe</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="inputName">Name</label>
                        <input type="text" name="Username" id="inputName" maxLength={8} disabled={isLoad} value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <motion.button 
                        disabled={!name.trim()}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                    >Play</motion.button>
                </form>
            </motion.div>
            <motion.div
                className={styles.infoBtnContainer}
                initial={{
                    opacity: 0,
                    scale: 0
                }}
                animate={{
                    opacity: 1,
                    scale: [0, 1.1, 1]
                }}
                transition={{
                    duration: 0.8,
                    delay: 2.4,
                    ease: "easeOut"
                }}
            >   
                {openInfo ? <motion.div
                    className={styles.infoPopup}
                    initial={{
                        height : "0px",
                        opacity: 0
                    }}
                    animate={{
                        height: "120px",
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut"
                    }
                }
                >
                    <p className={styles.recordTitle}>Record</p>
                    <div className={styles.recordCount}>
                        <p>Win : {record.win || 0}</p>
                        <p>Lose : {record.lose || 0}</p>
                        <p>Draw : {record.draw || 0}</p>
                    </div>
                </motion.div> : null}
                <motion.button 
                    className={styles.infoBtn} 
                    title='info'
                    whileHover={{ scale: 1.2 }}    
                    onClick={() => setOpenInfo(!openInfo)}
                >
                    <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-info-square"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9h.01" /><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M11 12h1v4h1" /></svg>
                </motion.button>
            </motion.div>
            <motion.div
                className={styles.playerOnlineCounter}
                initial={{
                    opacity: 0,
                    scale: 0
                }}
                animate={{
                    opacity: 1,
                    scale: [0, 1.1, 1]
                }}
                transition={{
                    duration: 0.8,
                    delay: 2.4,
                    ease: "easeOut"
                }}
            >
                <p>{`Player Online : ${playerCount}`}</p>
            </motion.div>
        </div>
    )

    return content
}

export default Home