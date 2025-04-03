import React, { useState, useMemo } from 'react';
import { LeaderboardPlayer, LeaderboardFilters } from '@/types/leaderboard';
import { 
  leaderboardPlayers, 
  countries, 
  characters, 
  rankTiers, 
  monthlyChallenge,
  playerSpotlights 
} from '@/data/leaderboardData';
import MonthlyChallengeCard from './MonthlyChallengeCard';
import LeaderboardRow from './LeaderboardRow';
import PlayerDetailModal from './PlayerDetailModal';
import PlayerSpotlightCard from './PlayerSpotlightCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Trophy, Users, Search, Filter } from 'lucide-react';

export default function CommunityLeaderboard() {
  const [filters, setFilters] = useState<LeaderboardFilters>({
    country: 'All',
    character: 'All',
    rankTier: 'All'
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<LeaderboardPlayer | null>(null);
  
  // Filter and sort the players based on current filters and search
  const filteredPlayers = useMemo(() => {
    let result = [...leaderboardPlayers];
    
    // Apply filters
    if (filters.country !== 'All') {
      result = result.filter(player => player.country === filters.country);
    }
    
    if (filters.character !== 'All') {
      result = result.filter(player => player.character === filters.character);
    }
    
    if (filters.rankTier !== 'All') {
      result = result.filter(player => player.rankTier === filters.rankTier);
    }
    
    // Apply search
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(player => 
        player.username.toLowerCase().includes(query) || 
        player.character.toLowerCase().includes(query) ||
        player.country.toLowerCase().includes(query)
      );
    }
    
    // Sort players by a combined score (you can adjust the weights for different metrics)
    return result.sort((a, b) => {
      const scoreA = (a.comboAccuracy * 0.3) + ((1 - a.reactionTime) * 100 * 0.3) + (a.adaptationScore * 0.4);
      const scoreB = (b.comboAccuracy * 0.3) + ((1 - b.reactionTime) * 100 * 0.3) + (b.adaptationScore * 0.4);
      return scoreB - scoreA; // Descending order
    });
  }, [filters, searchQuery, leaderboardPlayers]);
  
  const handleFilterChange = (field: keyof LeaderboardFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handlePlayerSelect = (player: LeaderboardPlayer) => {
    setSelectedPlayer(player);
  };
  
  const handlePlayerSpotlightSelect = (playerId: number) => {
    const player = leaderboardPlayers.find(p => p.id === playerId);
    if (player) {
      setSelectedPlayer(player);
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center text-white mb-4 md:mb-0">
          <Trophy className="mr-3 h-7 w-7 text-accent" />
          Community Leaderboard
        </h1>
        
        <div className="flex items-center space-x-2">
          <div className="bg-surface/80 text-white text-sm px-3 py-1.5 rounded-md flex items-center">
            <Users className="h-4 w-4 mr-1.5 text-accent" />
            {leaderboardPlayers.length} Fighters
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 lg:col-span-2">
          <MonthlyChallengeCard challenge={monthlyChallenge} />
        </div>
        
        <div className="col-span-1">
          <Card className="bg-surface border-gray-700 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Player Spotlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {playerSpotlights.map(spotlight => (
                <PlayerSpotlightCard 
                  key={spotlight.id} 
                  spotlight={spotlight} 
                  onPlayerSelect={handlePlayerSpotlightSelect}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-surface rounded-lg border border-gray-700 overflow-hidden mb-10">
        <div className="p-4 border-b border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search players..."
                className="pl-10 bg-darkBg border-gray-700"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex items-center">
              <div className="w-5 mr-2">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <Select
                value={filters.country}
                onValueChange={(value) => handleFilterChange('country', value)}
              >
                <SelectTrigger className="bg-darkBg border-gray-700">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={filters.character}
                onValueChange={(value) => handleFilterChange('character', value)}
              >
                <SelectTrigger className="bg-darkBg border-gray-700">
                  <SelectValue placeholder="Character" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Characters</SelectItem>
                  {characters.map((character) => (
                    <SelectItem key={character} value={character}>{character}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={filters.rankTier}
                onValueChange={(value) => handleFilterChange('rankTier', value)}
              >
                <SelectTrigger className="bg-darkBg border-gray-700">
                  <SelectValue placeholder="Rank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Ranks</SelectItem>
                  {rankTiers.map((rank) => (
                    <SelectItem key={rank} value={rank}>{rank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-400">Rank</th>
                <th className="px-4 py-3 font-medium text-gray-400">Player</th>
                <th className="px-4 py-3 font-medium text-gray-400">Character</th>
                <th className="px-4 py-3 font-medium text-gray-400">Reaction</th>
                <th className="px-4 py-3 font-medium text-gray-400">Combo</th>
                <th className="px-4 py-3 font-medium text-gray-400">Adaptation</th>
                <th className="px-4 py-3 font-medium text-gray-400">Rank</th>
                <th className="px-4 py-3 font-medium text-gray-400">Badges</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => (
                <LeaderboardRow 
                  key={player.id} 
                  player={player} 
                  rank={index + 1} 
                  onSelect={handlePlayerSelect} 
                />
              ))}
              {filteredPlayers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                    No players found matching your filters. Try adjusting your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <PlayerDetailModal 
        player={selectedPlayer} 
        isOpen={!!selectedPlayer} 
        onClose={() => setSelectedPlayer(null)} 
      />
    </div>
  );
}