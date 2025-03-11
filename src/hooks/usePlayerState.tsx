import { useContext } from "react"
import { PlayerContext } from "../contexts/PlayerContext"

interface PlayerState {
    currentPlayer: { playerName: string, playerId: string, symbol: string };
    setCurrentPlayer: (player: { playerName: string, playerId: string, symbol: string }) => void;
    opponent: { playerName: string, playerId: string, symbol: string };
    setOpponent: (player: { playerName: string, playerId: string, symbol: string }) => void;
}

export const usePlayerState = () : PlayerState => {
    const context = useContext(PlayerContext) as PlayerState;
    if(context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context
}