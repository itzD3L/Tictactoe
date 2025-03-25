import styles from './styles.module.css'
import { socket } from '../socket'
import { Outlet } from 'react-router'
import { useEffect, useState } from 'react';
import { motion } from 'motion/react'
import tictactoepng from '../assets/tictactoe.png'

const SocketConnectionManager : React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    

    useEffect(() => {
        socket.connect();

        function onConnect () {
            setIsConnected(true);
        }
        function onDisconnect () {
            setIsConnected(false);
        }
        
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        }
    }, [])


    const content = (
        <>
            {!isConnected ? 
                <motion.div
                    className={styles.logo}
                    initial={{ y: -3  }}
                    animate={{ y: -3 }}
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
            : <Outlet />}
        </>
        
    )

    return content
}

export default SocketConnectionManager;