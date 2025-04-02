import styles from '../styles/styles.module.css'
import { socket } from './socket'
import { Outlet } from 'react-router'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'motion/react'
import tictactoepng from '../assets/tictactoe.png'

const SocketConnectionManager : React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [pleaseWaitInfo, setPleaseWaitInfo] = useState<number>(5);
    const location = useLocation();
    
    useEffect(() => {
        function onConnect () {
            setIsConnected(true);
        }
        function onDisconnect () {
            setIsConnected(false);
        }

        if(!socket.connected) {
            socket.connect();
        } else {
            onConnect();
        }
        
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        const countDown = setInterval(() => {
            setPleaseWaitInfo((prev) => {
                if(prev <= 1) {
                    clearInterval(countDown);
                }
                return prev - 1;
            })
        }, 1000)

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            clearInterval(countDown);
        }
    }, [location.pathname])


    const content = (
        <>
            {!isConnected ? 
                <>
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
                    {pleaseWaitInfo === 0 ? 
                        <p>Please wait...</p> : null
                    }
                </>
                
                
            : <Outlet />}
        </>
        
    )

    return content
}

export default SocketConnectionManager;