import { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

interface GameState {
    gameId: string;
    setGameId: (id: string) => void;
    currentTurn: {playerName: string; playerId: string; symbol: string};
    setCurrentTurn: (turn : {playerName: string; playerId: string; symbol: string}) => void;
    board: any[];
    setBoard: (board: any[]) => void;
    status: { status: 'win' | 'lose' | 'draw' | 'left' | 'pending', player: { playerName: string; playerId: string; symbol: string }}
    setStatus: (status: { status: string, player: { playerName: string; playerId: string; symbol: string }}) => void;
}

export const useGameState = () : GameState => {
    const context = useContext(GameContext) as GameState;
    if(context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context
}

