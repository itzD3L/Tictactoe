import styles from '../../../styles/styles.module.css'
import { socket } from '../../../services/socket'
import { useEffect, useState } from 'react';
import { useGameState } from '../../../hooks/useGameState';
import { usePlayerState } from '../../../hooks/usePlayerState';
import Cell from './Cell';
import { Patern3x3 } from '../../common/BoxPatern';
import Shape from '../../common/Shape';

const TableEndless = () => {
    const { gameId, currentTurn, board } = useGameState();
    const { currentPlayer } = usePlayerState();
    const paternNumber = Math.floor(Math.random() * 8)
    const [cellForOpacity, setCellForOpacity] = useState<number | null>(null)

    useEffect(() => {
        socket.on('cellForOpacity', ({moveNumber}) => {
            setCellForOpacity(moveNumber)
        })

        return () => {
            socket.off('cellForOpacity')
        }
    },[])
    const submitMove = (boxNum : number) => {
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


    
    return (
        <div className={`${styles.game__boxes} ${styles.game__boxes_endless}`}>
            {
                board?.map((cell, index) => (
                    <Cell
                        key={index}
                        className={styles.game__boxes_cell}
                        delay={Patern3x3[paternNumber][index]} // add delay for animation
                        disabled={Boolean(cell)}
                        onSubmit={() => {
                            submitMove(index)
                        }}
                    >
                        {cell && <Shape shape={cell?.symbol} opacity={index === cellForOpacity ? 0.5: 1}/>}
                    </Cell>
                ))
            }
        </div>
    )

}

export default TableEndless;