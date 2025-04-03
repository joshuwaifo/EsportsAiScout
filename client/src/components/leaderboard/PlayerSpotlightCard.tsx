import React from 'react';
import { PlayerSpotlight } from '@/types/leaderboard';
import { leaderboardPlayers } from '@/data/leaderboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SparklesIcon, TrendingUp } from 'lucide-react';

interface PlayerSpotlightCardProps {
  spotlight: PlayerSpotlight;
  onPlayerSelect: (playerId: number) => void;
}

export default function PlayerSpotlightCard({ spotlight, onPlayerSelect }: PlayerSpotlightCardProps) {
  const player = leaderboardPlayers.find(p => p.id === spotlight.playerId);
  
  if (!player) return null;
  
  const getStatIcon = (statType: string) => {
    switch (statType) {
      case 'combo':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'reaction':
        return <TrendingUp className="h-4 w-4 text-yellow-400" />;
      case 'adaptation':
        return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case 'rank':
        return <TrendingUp className="h-4 w-4 text-purple-400" />;
      default:
        return <TrendingUp className="h-4 w-4 text-accent" />;
    }
  };
  
  return (
    <Card className="bg-surface border-gray-700 hover:border-accent transition-colors cursor-pointer"
      onClick={() => onPlayerSelect(player.id)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-bold flex items-center">
          <SparklesIcon className="mr-2 h-5 w-5 text-yellow-400" />
          {spotlight.achievement}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={player.avatarUrl} alt={player.character} />
            <AvatarFallback>{player.character.substring(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center">
              <span className="mr-1">{player.countryFlag}</span>
              <span className="font-medium text-white">{player.username}</span>
            </div>
            <div className="text-sm text-gray-400 mt-0.5">{player.character} • {player.rankTier}</div>
          </div>
          
          <div className="ml-auto flex items-center bg-primary/10 px-2.5 py-1 rounded-md">
            {getStatIcon(spotlight.statType)}
            <span className="ml-1 font-medium text-green-400">+{spotlight.statChange}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}