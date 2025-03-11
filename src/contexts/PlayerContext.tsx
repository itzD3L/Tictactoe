import { createContext, ReactNode, useState, useMemo } from 'react';

export const PlayerContext = createContext({});

interface player {
    playerName: string,
    playerId: string,
    symbol: string
}

export const PlayerProvider = ({ children } : { children : ReactNode}) => {
    const [currentPlayer, setCurrentPlayer] = useState<player>({playerName: '', playerId: '', symbol: ''});
    const [opponent, setOpponent] = useState<player>({playerName: '', playerId: '', symbol: ''});

    const value = useMemo(() => ({
        currentPlayer,
        setCurrentPlayer,
        opponent,
        setOpponent
    }), [currentPlayer, opponent])

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}