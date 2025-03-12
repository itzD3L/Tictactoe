import { createContext, ReactNode, useState, useMemo } from 'react';

export const GameContext = createContext({});

export const GameProvider = ({ children } : {children : ReactNode}) => {
    const [gameId, setGameId] = useState<string>('');
    const [currentTurn, setCurrentTurn] = useState<{
        playerName: string,
        playerId: string,
        symbol: string
    }>({playerName: '', playerId: '', symbol: ''});
    const [board, setBoard] = useState<any>([]);
    const [status, setStatus] = useState<string>('pending');

    const value = useMemo(() => ({
        gameId,
        setGameId,
        currentTurn,
        setCurrentTurn,
        board,
        setBoard,
        status,
        setStatus
    }), [gameId, currentTurn, board, status])

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

