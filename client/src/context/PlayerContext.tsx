import { createContext, useContext, useState, ReactNode } from 'react';

interface PlayerSkill {
  name: string;
  value: number;
}

export interface Player {
  id: number;
  name: string;
  role: string;
  position: string;
  matchPercentage: number;
  skills: PlayerSkill[];
  tournaments: number;
  rating: number;
  stats: {
    kda: number;
    winRate: number;
    gamesPlayed: number;
  };
  avatarUrl?: string;
}

interface PlayerContextType {
  players: Player[];
  teamPlayers: Player[];
  scoutingPlayers: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (id: number, player: Partial<Player>) => void;
  removePlayer: (id: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: 'ShadowStriker',
      role: 'Mid Lane',
      position: 'Carry',
      matchPercentage: 97,
      skills: [
        { name: 'Mechanical Skill', value: 92 },
        { name: 'Game Sense', value: 88 },
        { name: 'Team Play', value: 79 },
        { name: 'Versatility', value: 95 },
      ],
      tournaments: 43,
      rating: 4.8,
      stats: {
        kda: 5.2,
        winRate: 71,
        gamesPlayed: 156,
      },
    },
    {
      id: 2,
      name: 'VortexLord',
      role: 'Top Lane',
      position: 'Tank',
      matchPercentage: 93,
      skills: [
        { name: 'Mechanical Skill', value: 85 },
        { name: 'Game Sense', value: 96 },
        { name: 'Team Play', value: 94 },
        { name: 'Versatility', value: 81 },
      ],
      tournaments: 38,
      rating: 4.7,
      stats: {
        kda: 4.1,
        winRate: 68,
        gamesPlayed: 189,
      },
    },
    {
      id: 3,
      name: 'QuantumPulse',
      role: 'Support',
      position: 'Healer',
      matchPercentage: 88,
      skills: [
        { name: 'Mechanical Skill', value: 82 },
        { name: 'Game Sense', value: 94 },
        { name: 'Team Play', value: 97 },
        { name: 'Versatility', value: 79 },
      ],
      tournaments: 29,
      rating: 4.5,
      stats: {
        kda: 6.7,
        winRate: 66,
        gamesPlayed: 142,
      },
    },
    {
      id: 4,
      name: 'CyberNinja',
      role: 'Mid Lane',
      position: 'Assassin',
      matchPercentage: 85,
      skills: [
        { name: 'Mechanical Skill', value: 96 },
        { name: 'Game Sense', value: 83 },
        { name: 'Team Play', value: 75 },
        { name: 'Versatility', value: 88 },
      ],
      tournaments: 22,
      rating: 4.3,
      stats: {
        kda: 4.9,
        winRate: 63,
        gamesPlayed: 112,
      },
    },
    {
      id: 5,
      name: 'MindBender',
      role: 'Support',
      position: 'Utility',
      matchPercentage: 82,
      skills: [
        { name: 'Mechanical Skill', value: 78 },
        { name: 'Game Sense', value: 92 },
        { name: 'Team Play', value: 95 },
        { name: 'Versatility', value: 86 },
      ],
      tournaments: 31,
      rating: 4.4,
      stats: {
        kda: 5.6,
        winRate: 64,
        gamesPlayed: 178,
      },
    }
  ]);

  // Sample team players
  const teamPlayers = [
    {
      id: 101,
      name: 'FrostBite',
      role: 'Top',
      position: 'Tank',
      matchPercentage: 95,
      skills: [
        { name: 'Mechanical Skill', value: 89 },
        { name: 'Game Sense', value: 92 },
        { name: 'Team Play', value: 88 },
        { name: 'Versatility', value: 85 },
      ],
      tournaments: 48,
      rating: 4.7,
      stats: {
        kda: 3.8,
        winRate: 72,
        gamesPlayed: 203,
      },
    },
    {
      id: 102,
      name: 'JungleKing',
      role: 'Jungle',
      position: 'Initiator',
      matchPercentage: 92,
      skills: [
        { name: 'Mechanical Skill', value: 86 },
        { name: 'Game Sense', value: 95 },
        { name: 'Team Play', value: 91 },
        { name: 'Versatility', value: 82 },
      ],
      tournaments: 42,
      rating: 4.6,
      stats: {
        kda: 4.2,
        winRate: 69,
        gamesPlayed: 187,
      },
    },
    {
      id: 103,
      name: 'LightningBolt',
      role: 'Mid',
      position: 'Carry',
      matchPercentage: 98,
      skills: [
        { name: 'Mechanical Skill', value: 94 },
        { name: 'Game Sense', value: 89 },
        { name: 'Team Play', value: 83 },
        { name: 'Versatility', value: 91 },
      ],
      tournaments: 51,
      rating: 4.9,
      stats: {
        kda: 5.7,
        winRate: 74,
        gamesPlayed: 212,
      },
    },
    {
      id: 104,
      name: 'SharpShooter',
      role: 'ADC',
      position: 'Carry',
      matchPercentage: 94,
      skills: [
        { name: 'Mechanical Skill', value: 96 },
        { name: 'Game Sense', value: 87 },
        { name: 'Team Play', value: 84 },
        { name: 'Versatility', value: 78 },
      ],
      tournaments: 38,
      rating: 4.7,
      stats: {
        kda: 6.1,
        winRate: 71,
        gamesPlayed: 178,
      },
    },
    {
      id: 105,
      name: 'GuardianAngel',
      role: 'Support',
      position: 'Healer',
      matchPercentage: 96,
      skills: [
        { name: 'Mechanical Skill', value: 81 },
        { name: 'Game Sense', value: 94 },
        { name: 'Team Play', value: 97 },
        { name: 'Versatility', value: 86 },
      ],
      tournaments: 45,
      rating: 4.8,
      stats: {
        kda: 7.2,
        winRate: 73,
        gamesPlayed: 195,
      },
    }
  ];

  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player]);
  };

  const updatePlayer = (id: number, updatedData: Partial<Player>) => {
    setPlayers(prev => prev.map(player => {
      if (player.id === id) {
        return { ...player, ...updatedData };
      }
      return player;
    }));
  };

  const removePlayer = (id: number) => {
    setPlayers(prev => prev.filter(player => player.id !== id));
  };

  return (
    <PlayerContext.Provider value={{
      players,
      teamPlayers,
      scoutingPlayers: players,
      addPlayer,
      updatePlayer,
      removePlayer,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
