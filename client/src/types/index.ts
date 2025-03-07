// Define the types used throughout the application

export interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: any; // LucideIcon type from lucide-react
  trend: 'up' | 'down';
}

export interface Insight {
  type: 'tip' | 'stat' | 'warning';
  title: string;
  description: string;
}

export interface PlayerSkill {
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

export interface TeamAttribute {
  name: string;
  value: number;
}

export interface DraftPick {
  name: string;
  imageUrl?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  position: string;
  stats: {
    kda: number;
    winRate: number;
    gamesPlayed?: number;
  };
  avatarUrl?: string;
}

export interface Match {
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

export interface PerformanceData {
  labels: string[];
  winRate: number[];
  kda: number[];
}

export interface StrategyRecommendation {
  opponent: string;
  earlyGame: string;
  midGame: string;
  lateGame: string;
  draftPicks: DraftPick[];
}

export interface AIAnalysis {
  strengths: string[];
  weaknesses: string[];
}
