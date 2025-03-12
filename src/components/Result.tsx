import styles from './styles.module.css'
import { motion } from'motion/react'
import { useNavigate } from 'react-router'

interface ResultProps {
    opponentName: string;
    result: 'win' | 'lose' | 'draw' | 'left' | 'pending';
}

const Result : React.FC<ResultProps> = ({ opponentName, result }) => {
    const navigate = useNavigate();
    const resultConfig = {
        win : {
            title: 'Congratulations!',
            description: `You won against ${opponentName}`,
        },
        lose : {
            title: 'Defeat!',
            description: `You lost against ${opponentName}`,
        },
        draw : {
            title: 'Draw!',
            description: `Your match against ${opponentName} is a draw`,
        },
        left : {
            title: `${opponentName} left the match`,
            description: 'Your opponent left, the game is not recorded.'
        },
        pending : {
            title: '',
            description: ``,
        }
    }

    const handleBackBTN = () => {
        navigate('/tictactoe', { replace: true })
    }


    return (
        <div className={styles.resultBG}>
            <motion.div 
                className={styles.resultContainer}
                initial={{
                    opacity: 0,
                    scale: 0
                }}
                animate={{
                    opacity: 1,
                    scale: [0, 1.1, 1]
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut"
                }}
            >
                <h1 className={styles.resultTitle}>{resultConfig[result].title}</h1>
                <p className={styles.resultDescription}>{resultConfig[result].description}</p>
                <button className={styles.resultBackBtn} onClick={handleBackBTN}> Back to Home</button>
            </motion.div>
        </div>
    )
}

export default Result
