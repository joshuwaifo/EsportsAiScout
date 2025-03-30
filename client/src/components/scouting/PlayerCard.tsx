import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChartBarIcon, 
  PlusIcon, 
  TrophyIcon, 
  BarChart2Icon, 
  UserIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BrainIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface PlayerSkill {
  name: string;
  value: number;
}

interface Player {
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

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Function to generate AI commentary based on player stats
  const generateAICommentary = (player: Player) => {
    // Find highest and lowest skills
    const sortedSkills = [...player.skills].sort((a, b) => b.value - a.value);
    const highestSkill = sortedSkills[0];
    const lowestSkill = sortedSkills[sortedSkills.length - 1];
    
    // Generate commentary
    return {
      strengths: [
        `Exceptional ${highestSkill.name} (${highestSkill.value}%), making them a standout player in critical situations.`,
        `Strong ${player.position} presence with a ${player.stats.winRate}% win rate across ${player.stats.gamesPlayed} games.`,
        `Above average KDA ratio of ${player.stats.kda}, indicating good survivability and impact.`
      ],
      weaknesses: [
        `Could improve ${lowestSkill.name} (${lowestSkill.value}%), which is below their skill average.`,
        player.stats.kda < 3 ? 
          `KDA of ${player.stats.kda} suggests potential issues with positioning or target selection.` :
          `Relatively low tournament experience (${player.tournaments}) compared to other players of similar skill level.`
      ]
    };
  };
  
  const aiAnalysis = generateAICommentary(player);
  const recruitmentPriority = player.matchPercentage > 85 ? "High" : player.matchPercentage > 70 ? "Medium" : "Low";
  const priorityColor = recruitmentPriority === "High" ? "bg-green-600" : recruitmentPriority === "Medium" ? "bg-yellow-600" : "bg-gray-600";

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-surface bg-opacity-50 border-none hover:translate-y-[-5px] hover:shadow-2xl">
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-primary to-blue-600">
            <div className="absolute flex items-center justify-center w-16 h-16 overflow-hidden bg-darkBg rounded-full top-24 left-6 ring-4 ring-darkBg">
              {player.avatarUrl ? (
                <img 
                  src={player.avatarUrl} 
                  alt={`${player.name} avatar`} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white">
                  {player.name.substring(0, 2)}
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 px-3 py-1 m-3 text-xs font-bold text-white rounded-full bg-secondary">
            {player.matchPercentage}% MATCH
          </div>
        </div>
        <div className="px-6 pt-16 pb-6">
          <h4 className="text-lg font-bold text-white">{player.name}</h4>
          <p className="text-sm text-gray-400">{player.role}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            {player.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1 text-xs">
                  <span className="text-gray-400">{skill.name}</span>
                  <span className="font-semibold text-[#39FF14]">{skill.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-darkBg">
                  <div 
                    className="h-2 rounded-full bg-[#39FF14]" 
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-6">
            <span className="flex items-center text-sm text-gray-400">
              <svg 
                className="mr-1 w-4 h-4 text-blue-500" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
              </svg>
              {player.tournaments} Tournaments
            </span>
            <span className="flex items-center text-sm text-gray-400">
              <svg 
                className="mr-1 w-4 h-4 text-yellow-500" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {player.rating} Rating
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <Button 
              className="px-4 py-2 text-sm" 
              variant="default"
              onClick={() => setIsDialogOpen(true)}
            >
              Full Profile
            </Button>
            <Button className="px-3 py-2 text-sm" variant="outline" size="icon">
              <ChartBarIcon className="h-4 w-4" />
            </Button>
            <Button className="px-3 py-2 text-sm" variant="outline" size="icon">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Scouting Report Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-surface border-none text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              {player.name}
              <Badge className="ml-3 bg-secondary text-white">{player.matchPercentage}% Match</Badge>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {player.role} • {player.position}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Player Stats */}
            <div className="bg-darkBg rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-white">Player Statistics</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400 flex items-center">
                      <TrophyIcon className="h-4 w-4 mr-2 text-yellow-500" />
                      Rating
                    </span>
                    <span className="text-white font-medium">{player.rating} / 5.0</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-800">
                    <div 
                      className="h-2 rounded-full bg-yellow-500" 
                      style={{ width: `${player.rating / 5 * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-darkBg bg-opacity-50 p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <BarChart2Icon className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm text-gray-400">KDA Ratio</span>
                    </div>
                    <p className="text-xl font-bold text-white">{player.stats.kda}</p>
                  </div>
                  
                  <div className="bg-darkBg bg-opacity-50 p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <UserIcon className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm text-gray-400">Win Rate</span>
                    </div>
                    <p className="text-xl font-bold text-white">{player.stats.winRate}%</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Games Played</span>
                  <span className="text-white">{player.stats.gamesPlayed}</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Tournaments</span>
                  <span className="text-white">{player.tournaments}</span>
                </div>
              </div>
            </div>
            
            {/* Skills Breakdown */}
            <div className="bg-darkBg rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-white">Skills Assessment</h3>
              
              <div className="space-y-3">
                {player.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">{skill.name}</span>
                      <span className="text-sm font-medium text-white">{skill.value}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-800">
                      <div 
                        className={`h-2 rounded-full ${
                          skill.value > 85 ? "bg-green-500" : 
                          skill.value > 70 ? "bg-blue-500" : 
                          skill.value > 50 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${skill.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* AI Commentary */}
          <div className="mt-6 bg-darkBg rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
              <BrainIcon className="h-5 w-5 mr-2 text-primary" />
              AI Scouting Analysis
            </h3>
            
            <div className="mt-4 space-y-4">
              {/* Strengths */}
              <div>
                <h4 className="text-green-400 font-medium flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  Strengths
                </h4>
                <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-200">
                  {aiAnalysis.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              {/* Weaknesses */}
              <div>
                <h4 className="text-red-400 font-medium flex items-center">
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                  Areas for Improvement
                </h4>
                <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-200">
                  {aiAnalysis.weaknesses.map((weakness, i) => (
                    <li key={i}>{weakness}</li>
                  ))}
                </ul>
              </div>
              
              {/* Summary */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-300">
                  <span className="font-medium">{player.name}</span> is a {player.matchPercentage >= 85 ? "high-value" : player.matchPercentage >= 70 ? "solid" : "potential"} prospect 
                  for the {player.position} position. Their performance shows {player.stats.winRate >= 65 ? "excellent" : player.stats.winRate >= 55 ? "good" : "average"} win rates and 
                  statistical efficiency. {player.skills[0].value >= 80 ? `Particularly strong ${player.skills[0].name} would be an asset to the team.` : 
                  `With development, could become a valuable team member.`}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
              <span className="text-sm font-medium text-gray-300">Recruitment Priority:</span>
              <Badge className={priorityColor}>
                {recruitmentPriority}
              </Badge>
            </div>
          </div>
          
          <DialogFooter className="mt-4 flex justify-between items-center border-t border-gray-700 pt-4">
            <p className="text-xs text-gray-400">
              Analysis generated by AI. May not be 100% accurate.
            </p>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
