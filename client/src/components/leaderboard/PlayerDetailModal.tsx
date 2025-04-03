import React from 'react';
import { LeaderboardPlayer } from '@/types/leaderboard';
import BadgeIcon from './BadgeIcon';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  UserRoundIcon, 
  Flag, 
  Zap, 
  Trophy, 
  TrendingUp, 
  BrainIcon, 
  CalendarDaysIcon,
  Star
} from 'lucide-react';

interface PlayerDetailModalProps {
  player: LeaderboardPlayer | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayerDetailModal({ player, isOpen, onClose }: PlayerDetailModalProps) {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-darkBg border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <span className="mr-2">{player.countryFlag}</span>
            {player.username}'s Profile
          </DialogTitle>
          <DialogDescription>
            Fighter details and training statistics
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="col-span-1">
            <Card className="bg-surface border-gray-700">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 border-2 border-primary mt-2">
                    <AvatarImage src={player.avatarUrl} alt={player.character} />
                    <AvatarFallback className="text-xl">{player.character.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold mt-4">{player.character}</h3>
                  
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <UserRoundIcon className="h-4 w-4 mr-1" />
                    <span>{player.username}</span>
                  </div>
                  
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <Flag className="h-4 w-4 mr-1" />
                    <span>{player.country}</span>
                  </div>
                  
                  <div className="mt-4 w-full">
                    <div className={`
                      w-full text-center py-1.5 rounded-md text-sm font-medium
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
                      {player.rankTier} Rank
                    </div>
                  </div>
                  
                  <div className="mt-6 w-full">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">Training Streak</span>
                      <span className="font-medium">{player.trainingStreak} days</span>
                    </div>
                    <Progress value={Math.min(player.trainingStreak, 30) * 3.33} className="h-2" />
                  </div>
                  
                  <div className="mt-4 mb-2 w-full">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">Recent Improvement</span>
                      <span className="font-medium text-green-400">+{player.improvementScore}%</span>
                    </div>
                    <Progress value={player.improvementScore * 5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex space-x-2">
              <Button className="w-full" variant="secondary">
                <Star className="mr-2 h-4 w-4" />
                Follow
              </Button>
              <Button className="w-full">
                <Trophy className="mr-2 h-4 w-4" />
                Challenge
              </Button>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <Card className="bg-surface border-gray-700 h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                      <h4 className="font-medium">Reaction Time</h4>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-2xl font-bold">{player.reactionTime.toFixed(2)}s</div>
                      <div className="text-sm text-gray-400">
                        {player.reactionTime < 0.28 ? 'Elite' : player.reactionTime < 0.33 ? 'Great' : 'Average'}
                      </div>
                    </div>
                    <Progress value={(0.4 - player.reactionTime) * 333} className="h-1.5 mt-2" />
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                      <h4 className="font-medium">Combo Accuracy</h4>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-2xl font-bold">{player.comboAccuracy}%</div>
                      <div className="text-sm text-gray-400">
                        {player.comboAccuracy > 90 ? 'Elite' : player.comboAccuracy > 85 ? 'Great' : 'Average'}
                      </div>
                    </div>
                    <Progress value={player.comboAccuracy} className="h-1.5 mt-2" />
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <BrainIcon className="h-5 w-5 text-blue-400 mr-2" />
                      <h4 className="font-medium">Adaptation Score</h4>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-2xl font-bold">{player.adaptationScore}</div>
                      <div className="text-sm text-gray-400">
                        {player.adaptationScore > 90 ? 'Elite' : player.adaptationScore > 80 ? 'Great' : 'Average'}
                      </div>
                    </div>
                    <Progress value={player.adaptationScore} className="h-1.5 mt-2" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mt-6 mb-4">Earned Badges</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {player.badges.map((badge, idx) => (
                    <div key={idx} className="bg-gray-800/50 rounded-lg p-3 flex items-center">
                      <BadgeIcon badge={badge} size="md" />
                      <div className="ml-3">
                        <div className="font-medium">{badge.name}</div>
                        <div className="text-xs text-gray-400">{badge.tier} Tier</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}