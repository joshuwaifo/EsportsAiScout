import { createContext, useContext, useState, ReactNode } from 'react';

// Define the game titles as a union type
export type GameTitle = "Street Fighter" | "League of Legends" | "PUBG Mobile" | "Tekken" | "King of Fighters";

// Define the context type
interface GameContextType {
  selectedGame: GameTitle;
  setSelectedGame: (game: GameTitle) => void;
}

// Create the context with default values
const GameContext = createContext<GameContextType>({
  selectedGame: "Street Fighter",
  setSelectedGame: () => {}, // Empty function as placeholder
});

// Create the provider component
export function GameProvider({ children }: { children: ReactNode }) {
  const [selectedGame, setSelectedGame] = useState<GameTitle>("Street Fighter");

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  );
}

// Create a custom hook for using this context
export function useGame() {
  return useContext(GameContext);
}