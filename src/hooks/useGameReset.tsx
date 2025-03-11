import { useGameState } from "./useGameState";
import { usePlayerState } from "./usePlayerState";

export const useGameReset = () => {
    const { setGameId, setCurrentTurn, setBoard, setStatus } = useGameState();
    const { setCurrentPlayer, setOpponent } = usePlayerState();
    const resetGame = () => {
        setGameId('');
        setCurrentPlayer({ playerName: '', playerId: '', symbol: '' });
        setOpponent({ playerName: '', playerId: '', symbol: '' });
        setCurrentTurn({ playerName: '', playerId: '', symbol: '' });
        setBoard([]);
        setStatus({ status: '', player: {playerName: '', playerId: '', symbol: ''} });
    };

    return resetGame;
}