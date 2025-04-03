import { ReactNode } from 'react';

export interface Badge {
  type: string;
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
}

export interface LeaderboardPlayer {
  id: number;
  username: string;
  character: string;
  country: string;
  countryFlag: string;
  rankTier: string;
  rankPoints: number;
  reactionTime: number;   // in seconds
  comboAccuracy: number;  // percentage
  adaptationScore: number; // 0-100
  avatarUrl?: string;
  badges: Badge[];
  matchHistory: {
    wins: number;
    losses: number;
    draws: number;
  };
  trainingStreak: number;
  improvementScore: number; // percentage
}

export interface LeaderboardFilters {
  country: string;
  character: string;
  rankTier: string;
}

export interface MonthlyChallenge {
  id: number;
  title: string;
  description: string;
  endDate: string;
  progress: number;
  participants: number;
  reward: Badge;
}

export interface PlayerSpotlight {
  id: number;
  playerId: number;
  achievement: string;
  statType: 'combo' | 'reaction' | 'adaptation' | 'rank' | string;
  statChange: number;
}

export interface BadgeIconMap {
  [key: string]: React.ComponentType<any>;
}

export interface BadgeColorMap {
  [key: string]: string;
}

export interface BadgeDescriptionMap {
  [key: string]: string;
}