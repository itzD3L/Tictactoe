import { createContext, ReactNode, useState, useMemo } from 'react';

export const GameContext = createContext({});

export const GameProvider = ({ children } : {children : ReactNode}) => {
    const [gameId, setGameId] = useState<string>('');
    const [currentTurn, setCurrentTurn] = useState<{
        playerName: string,
        playerId: string,
        symbol: string
    }>({playerName: '', playerId: '', symbol: ''});
    const [gameMode, setGameMode] = useState<'3x3' | '6x6' | 'endless'>('3x3')
    const [board, setBoard] = useState<any>([]);
    const [status, setStatus] = useState<string>('pending');

    const value = useMemo(() => ({
        gameId,
        setGameId,
        currentTurn,
        setCurrentTurn,
        gameMode,
        setGameMode,
        board,
        setBoard,
        status,
        setStatus
    }), [gameId, currentTurn, gameMode, board, status])

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

