import { ReactNode } from "react";
import { PlayerProvider } from "./PlayerContext";
import { GameProvider } from "./GameContext";



const Providers = ({ children } : { children : ReactNode}) => {
    return (
        <PlayerProvider>
            <GameProvider>
                {children}
            </GameProvider>
        </PlayerProvider>
    )
}

export default Providers;