import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import TraitBadge from "./TraitBadge";
import PlayerSkillRadar from "./PlayerSkillRadar";
import { ChartBarIcon, GamepadIcon, CrosshairIcon, ZapIcon, BrainIcon } from "lucide-react";

interface FighterAnalysisCardProps {
  playerId: number;
  playerName: string;
  character: string;
  execution: number;
  adaptation: number;
  matchupAwareness: number;
  microScore: number;
  macroScore: number;
  traits: string[];
  stats: {
    combosAttempted: number;
    combosCompleted: number;
    antiAirSuccess: string;
    throwTechRate: string;
    driveImpactSuccess: string;
    parrySuccess: string;
    poke2HitRate: string;
  };
  skills: Array<{ name: string; value: number }>;
}

export default function FighterAnalysisCard({ 
  playerId, 
  playerName, 
  character, 
  execution, 
  adaptation, 
  matchupAwareness, 
  microScore, 
  macroScore, 
  traits, 
  stats, 
  skills 
}: FighterAnalysisCardProps) {
  
  // Calculate overall rating
  const overallRating = Math.round((execution + adaptation + matchupAwareness) / 3);

  return (
    <Card className="shadow-lg bg-surface bg-opacity-50 border-none">
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-900/70 to-blue-900/70">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-white flex items-center">
            <GamepadIcon className="h-5 w-5 mr-2 text-primary" />
            {playerName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-white">
              {overallRating}/100
            </Badge>
            <Badge variant="outline">
              {character}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
            <TabsTrigger value="radar">Skill Radar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              {/* Core Scores */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300 flex items-center">
                      <CrosshairIcon className="h-3 w-3 mr-1 text-yellow-400" />
                      Execution
                    </span>
                    <span className="text-sm text-gray-300">{execution}/100</span>
                  </div>
                  <Progress value={execution} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300 flex items-center">
                      <BrainIcon className="h-3 w-3 mr-1 text-blue-400" />
                      Adaptation
                    </span>
                    <span className="text-sm text-gray-300">{adaptation}/100</span>
                  </div>
                  <Progress value={adaptation} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300 flex items-center">
                      <ZapIcon className="h-3 w-3 mr-1 text-green-400" />
                      Matchup Awareness
                    </span>
                    <span className="text-sm text-gray-300">{matchupAwareness}/100</span>
                  </div>
                  <Progress value={matchupAwareness} className="h-2" />
                </div>
              </div>
              
              {/* Micro vs Macro */}
              <div className="space-y-2 pt-2 border-t border-gray-700">
                <h4 className="text-sm font-medium text-white flex items-center">
                  <ChartBarIcon className="h-4 w-4 mr-1 text-primary" />
                  Performance Profile
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-darkBg rounded-md p-3">
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-400">{microScore}</div>
                      <div className="text-xs text-gray-400">Micro Score</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Moment-to-moment mechanics and execution
                    </div>
                  </div>
                  
                  <div className="bg-darkBg rounded-md p-3">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400">{macroScore}</div>
                      <div className="text-xs text-gray-400">Macro Score</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Strategic decision-making and adaptation
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Player Traits */}
              <div className="pt-2 border-t border-gray-700">
                <h4 className="text-sm font-medium text-white mb-2">Player Traits</h4>
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait, index) => (
                    <TraitBadge key={index} trait={trait} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="space-y-4">
              {/* Execution Stats */}
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-2">Execution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span className="text-sm text-gray-300">Combo Completion</span>
                    <span className="text-sm text-white">
                      {stats.combosCompleted}/{stats.combosAttempted} 
                      ({Math.round((stats.combosCompleted / stats.combosAttempted) * 100)}%)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span className="text-sm text-gray-300">Anti-Air Success</span>
                    <span className="text-sm text-white">{stats.antiAirSuccess}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span className="text-sm text-gray-300">Poke Hit Rate</span>
                    <span className="text-sm text-white">{stats.poke2HitRate}</span>
                  </div>
                </div>
              </div>
              
              {/* SF6 Specific Mechanics */}
              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-2">SF6 Mechanics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span className="text-sm text-gray-300">Drive Impact Success</span>
                    <span className="text-sm text-white">{stats.driveImpactSuccess}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span className="text-sm text-gray-300">Parry Success</span>
                    <span className="text-sm text-white">{stats.parrySuccess}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span className="text-sm text-gray-300">Throw Tech Rate</span>
                    <span className="text-sm text-white">{stats.throwTechRate}</span>
                  </div>
                </div>
              </div>
              
              {/* Situational Habits */}
              <div className="p-3 bg-darkBg rounded-md">
                <h4 className="text-sm font-medium text-white mb-2">Coach Notes</h4>
                <p className="text-xs text-gray-300">
                  {playerName} shows strong {character} fundamentals with 
                  {execution > 80 ? ' excellent execution' : execution > 60 ? ' good execution' : ' average execution'}.
                  {adaptation > 80 ? ' Highly adaptive to opponent strategies.' : 
                   adaptation > 60 ? ' Shows good adaptation over sets.' : ' Could improve adaptation to opponent patterns.'}
                  {matchupAwareness > 80 ? ' Demonstrates deep matchup knowledge.' : 
                   matchupAwareness > 60 ? ' Solid matchup awareness.' : ' Should study matchups more extensively.'}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="radar">
            <PlayerSkillRadar skills={skills} title="Skill Distribution" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}