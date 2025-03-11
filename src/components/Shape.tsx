import styles from './styles.module.css'
import { motion } from 'motion/react';

const Shape: React.FC<{ shape: string }> = ({ shape }) => {

    let symbolChoosen;

    if(shape === 'X') {
        symbolChoosen = (
            <div className={styles['x-symbol']}>
                <svg viewBox="0 0 100 100">
                    <motion.path
                        d="M20 20 L80 80"
                        stroke="#000"
                        strokeWidth="10"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.path
                        d="M80 20 L20 80"
                        stroke="#000"
                        strokeWidth="10"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 0.3,
                            delay: 0.2,
                            ease: "easeInOut"
                        }}
                    />
                </svg>
            </div>  
        )
    } else {
        symbolChoosen = (
            <div className={styles['o-circle']}>
                <svg viewBox="0 0 100 100">
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        initial={{
                            strokeDasharray: 251,
                            strokeDashoffset: 251
                        }}
                        animate={{
                            strokeDashoffset: 0
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeInOut"
                        }}
                    />
                </svg>
            </div>
        )
    }


    return (
        <div className={styles.symbolContainer}>
            {symbolChoosen}
        </div>
    )
}

export default Shape