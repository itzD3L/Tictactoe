import styles from '../../../styles/styles.module.css'
import { socket } from '../../../services/socket'
import { useGameState } from '../../../hooks/useGameState';
import { usePlayerState } from '../../../hooks/usePlayerState';
import Cell from './Cell';
import { Patern6x6 } from '../../common/BoxPatern';
import Shape from '../../common/Shape';

const TableEnhanced = () => {
    const { gameId, currentTurn, board } = useGameState();
    const { currentPlayer } = usePlayerState();
    
    const paternNumber = Math.floor(Math.random() * 8)
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
        <div className={`${styles.game__boxes} ${styles.game__boxes_enhanced}`}>
            {
                board?.map((cell, index) => (
                    <Cell
                        key={index}
                        className={styles.game__boxes_cell}
                        delay={Patern6x6[paternNumber][index]} // add delay for animation
                        disabled={Boolean(cell)}
                        onSubmit={() => {
                            submitMove(index)
                        }}
                    >
                        {cell && <Shape shape={cell?.symbol} />}
                    </Cell>
                ))
            }
        </div>
    )
}

export default TableEnhanced;