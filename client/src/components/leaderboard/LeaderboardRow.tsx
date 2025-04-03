import React from 'react';
import { LeaderboardPlayer } from '@/types/leaderboard';
import BadgeIcon from './BadgeIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Zap, LightbulbIcon, TrendingUp } from 'lucide-react';

interface LeaderboardRowProps {
  player: LeaderboardPlayer;
  rank: number;
  onSelect: (player: LeaderboardPlayer) => void;
}

export default function LeaderboardRow({ player, rank, onSelect }: LeaderboardRowProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Trophy className="h-5 w-5 text-slate-400" />;
      case 3:
        return <Trophy className="h-5 w-5 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <tr 
      className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors duration-150 cursor-pointer"
      onClick={() => onSelect(player)}
    >
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center">
          {getRankIcon(rank)}
          <span className={`font-medium ml-2 ${rank <= 3 ? 'text-accent' : ''}`}>{rank}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <span className="mr-2">{player.countryFlag}</span>
          <div className="flex flex-col">
            <div className="font-medium text-white">{player.username}</div>
            <div className="text-xs text-gray-400">{player.character}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={player.avatarUrl} alt={player.character} />
          <AvatarFallback>{player.character.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-1">
          <div className="bg-surface/50 rounded-full p-1.5">
            <Zap className="h-4 w-4 text-yellow-400" />
          </div>
          <span className="font-medium">{player.reactionTime.toFixed(2)}s</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-1">
          <div className="bg-surface/50 rounded-full p-1.5">
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <span className="font-medium">{player.comboAccuracy}%</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-1">
          <div className="bg-surface/50 rounded-full p-1.5">
            <LightbulbIcon className="h-4 w-4 text-blue-400" />
          </div>
          <span className="font-medium">{player.adaptationScore}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${
            player.rankTier === 'Master' ? 'bg-purple-900 text-purple-100' :
            player.rankTier === 'Diamond' ? 'bg-cyan-900 text-cyan-100' :
            player.rankTier === 'Platinum' ? 'bg-blue-900 text-blue-100' :
            player.rankTier === 'Gold' ? 'bg-yellow-900 text-yellow-100' :
            player.rankTier === 'Silver' ? 'bg-gray-700 text-gray-200' :
            player.rankTier === 'Bronze' ? 'bg-amber-900 text-amber-100' :
            'bg-green-900 text-green-100'
          }
        `}>
          {player.rankTier}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex -space-x-2">
          {player.badges.slice(0, 3).map((badge, idx) => (
            <BadgeIcon key={idx} badge={badge} size="sm" />
          ))}
          {player.badges.length > 3 && (
            <div className="flex items-center justify-center rounded-full bg-gray-700 text-white h-6 w-6 text-xs font-medium">
              +{player.badges.length - 3}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}