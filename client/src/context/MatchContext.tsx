import { createContext, useContext, useState, ReactNode } from 'react';

interface Match {
  id: number;
  teams: {
    home: string;
    away: string;
  };
  date: string;
  isLive: boolean;
  status: 'upcoming' | 'live' | 'completed';
  result?: {
    homeScore: number;
    awayScore: number;
    winner: string;
  };
}

interface MatchContextType {
  currentMatch: Match | null;
  upcomingMatches: Match[];
  recentMatches: Match[];
  setCurrentMatch: (match: Match | null) => void;
  addMatch: (match: Match) => void;
  updateMatchResult: (id: number, result: { homeScore: number; awayScore: number; winner: string }) => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: ReactNode }) {
  const [currentMatch, setCurrentMatch] = useState<Match | null>({
    id: 1,
    teams: {
      home: 'Team Alpha',
      away: 'Team Zenith',
    },
    date: new Date().toISOString(),
    isLive: true,
    status: 'live',
  });

  const [matches, setMatches] = useState<Match[]>([
    {
      id: 2,
      teams: {
        home: 'Team Alpha',
        away: 'Team Omega',
      },
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      isLive: false,
      status: 'upcoming',
    },
    {
      id: 3,
      teams: {
        home: 'Team Delta',
        away: 'Team Alpha',
      },
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      isLive: false,
      status: 'completed',
      result: {
        homeScore: 2,
        awayScore: 1,
        winner: 'Team Delta',
      },
    },
  ]);

  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  const recentMatches = matches.filter(match => match.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const addMatch = (match: Match) => {
    setMatches(prev => [...prev, match]);
  };

  const updateMatchResult = (id: number, result: { homeScore: number; awayScore: number; winner: string }) => {
    setMatches(prev => prev.map(match => {
      if (match.id === id) {
        return {
          ...match,
          status: 'completed',
          isLive: false,
          result,
        };
      }
      return match;
    }));

    // If the current match is the one being updated, update it too
    if (currentMatch && currentMatch.id === id) {
      setCurrentMatch({
        ...currentMatch,
        status: 'completed',
        isLive: false,
        result,
      });
    }
  };

  return (
    <MatchContext.Provider value={{
      currentMatch,
      upcomingMatches,
      recentMatches,
      setCurrentMatch,
      addMatch,
      updateMatchResult,
    }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
}
