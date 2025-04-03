import React from 'react';
import CommunityLeaderboard from '@/components/leaderboard/CommunityLeaderboard';
import { useGame } from '@/context/GameContext';

export default function LeaderboardPage() {
  const { selectedGame } = useGame();
  
  return (
    <div className="min-h-screen bg-darkBg text-white">
      <div className="container mx-auto py-6">
        {selectedGame === 'Street Fighter' ? (
          <CommunityLeaderboard />
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-bold mb-4">Leaderboard Coming Soon</h2>
            <p className="text-gray-400 text-center max-w-md">
              We're currently building the leaderboard for {selectedGame}. 
              Please check back later or try switching to Street Fighter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}