import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GamepadIcon, BarChart3Icon, FileBarChart2Icon, ActivityIcon, 
         ThumbsUpIcon, ThumbsDownIcon, ClockIcon, AlertTriangleIcon,
         ChevronRightIcon, TargetIcon, PlusCircleIcon, RotateCwIcon } from "lucide-react";
import PlayerSkillRadar from "@/components/scouting/PlayerSkillRadar";

// Types for strategy builder
interface OpponentData {
  id: number;
  name: string;
  character: string;
  playstyle: string;
  gameplan: string;
  habits: string[];
  weaknesses: string[];
  strengths: string[];
  matchHistory: {
    wins: number;
    losses: number;
    lastMatches: Array<{
      opponent: string;
      result: "win" | "loss";
      score: string;
    }>;
  };
  tendencies: {
    aggression: number;
    defense: number;
    execution: number;
    adaptability: number;
    spacing: number;
  };
  moveTendencies: {
    wakeupDP: number;
    throwFrequency: number;
    jumpInRate: number;
    antiAirSuccess: number;
    whiffPunish: number;
    reversal: number;
    blockStrings: number;
    driveMeter: number;
  };
}

interface MoveZone {
  action: string;
  leftCorner: number;
  closeRange: number;
  midRange: number;
  farRange: number;
  rightCorner: number;
}

interface StrategyRecommendation {
  characterPick: string;
  characterAdvantage: "strong" | "even" | "weak";
  overallStrategy: string;
  openingOptions: string[];
  keyPunishes: Array<{
    enemyMove: string;
    punishOption: string;
    damage: number;
    difficulty: "easy" | "medium" | "hard";
  }>;
  defensiveOptions: string[];
  offensiveOptions: string[];
}

// Mock data for demonstration
const mockOpponents: OpponentData[] = [
  {
    id: 1,
    name: "DragonFist",
    character: "Ryu",
    playstyle: "Balanced",
    gameplan: "Fundamental footsies with occasional fireball zoning",
    habits: [
      "Frequently wake-up DP (>40% of knockdowns)",
      "Throws fireball at round start 60% of the time",
      "Relies on safe blockstrings instead of mixups",
      "Backs up when low on health or drive gauge"
    ],
    weaknesses: [
      "Predictable fireball patterns",
      "Overuse of wake-up DP is punishable",
      "Low throw-tech rate (~30%)",
      "Rarely varies attack timings"
    ],
    strengths: [
      "Strong neutral game with good spacing",
      "Excellent anti-air reactions",
      "Consistent combo execution",
      "Good life lead management"
    ],
    matchHistory: {
      wins: 17,
      losses: 8,
      lastMatches: [
        { opponent: "ComboKid", result: "win", score: "3-1" },
        { opponent: "TurtleMaster", result: "loss", score: "2-3" },
        { opponent: "FGCLegend", result: "win", score: "3-0" }
      ]
    },
    tendencies: {
      aggression: 65,
      defense: 75,
      execution: 80,
      adaptability: 60,
      spacing: 85
    },
    moveTendencies: {
      wakeupDP: 42,
      throwFrequency: 25,
      jumpInRate: 15,
      antiAirSuccess: 78,
      whiffPunish: 65,
      reversal: 38,
      blockStrings: 80,
      driveMeter: 70
    }
  },
  {
    id: 2,
    name: "FlashKicker",
    character: "Cammy",
    playstyle: "Rush Down",
    gameplan: "Aggressive pressure with quick mixups and mobility",
    habits: [
      "Dash-in throw after blocked special moves",
      "Relies heavily on overhead mixups",
      "Often uses Drive Rush for pressure",
      "Multiple jump-ins during pressure sequences"
    ],
    weaknesses: [
      "Predictable approach patterns",
      "Often burns Drive Gauge completely",
      "Impatient when opponent has life lead",
      "Defensive gaps during pressure"
    ],
    strengths: [
      "Very strong close-range pressure",
      "Quick reactions to whiffed moves",
      "High damage conversions",
      "Effective tick throw setups"
    ],
    matchHistory: {
      wins: 22,
      losses: 12,
      lastMatches: [
        { opponent: "SonicHurricane", result: "win", score: "3-2" },
        { opponent: "GrappleMaster", result: "win", score: "3-1" },
        { opponent: "ZoneMaster", result: "loss", score: "1-3" }
      ]
    },
    tendencies: {
      aggression: 90,
      defense: 50,
      execution: 85,
      adaptability: 65,
      spacing: 75
    },
    moveTendencies: {
      wakeupDP: 25,
      throwFrequency: 65,
      jumpInRate: 40,
      antiAirSuccess: 55,
      whiffPunish: 80,
      reversal: 30,
      blockStrings: 85,
      driveMeter: 40
    }
  },
  {
    id: 3,
    name: "TurtleMaster",
    character: "Guile",
    playstyle: "Defensive",
    gameplan: "Patient zoning with sonic booms and strong anti-airs",
    habits: [
      "Throws sonic boom at consistent intervals",
      "Flash kick on wake-up ~20% of the time",
      "Walks back to maintain optimal spacing",
      "Conservative Drive Gauge management"
    ],
    weaknesses: [
      "Struggles against persistent pressure",
      "Limited offense when cornered",
      "Predictable defensive patterns",
      "Rarely uses throw tech in corner"
    ],
    strengths: [
      "Exceptional projectile game",
      "Very strong defensive reactions",
      "Patient life lead management",
      "Consistent anti-air success"
    ],
    matchHistory: {
      wins: 19,
      losses: 7,
      lastMatches: [
        { opponent: "DragonFist", result: "win", score: "3-2" },
        { opponent: "FlashKicker", result: "loss", score: "2-3" },
        { opponent: "GrappleMaster", result: "win", score: "3-1" }
      ]
    },
    tendencies: {
      aggression: 35,
      defense: 90,
      execution: 75,
      adaptability: 70,
      spacing: 95
    },
    moveTendencies: {
      wakeupDP: 22,
      throwFrequency: 15,
      jumpInRate: 10,
      antiAirSuccess: 90,
      whiffPunish: 75,
      reversal: 25,
      blockStrings: 60,
      driveMeter: 85
    }
  }
];

// Move zone heatmap data
const moveZoneData: MoveZone[] = [
  {
    action: "Fireballs",
    leftCorner: 10,
    closeRange: 25,
    midRange: 80,
    farRange: 90,
    rightCorner: 5
  },
  {
    action: "Anti-Airs",
    leftCorner: 70,
    closeRange: 20,
    midRange: 85,
    farRange: 40,
    rightCorner: 60
  },
  {
    action: "Whiffed Normals",
    leftCorner: 20,
    closeRange: 60,
    midRange: 75,
    farRange: 30,
    rightCorner: 15
  },
  {
    action: "Drive Impact",
    leftCorner: 80,
    closeRange: 60,
    midRange: 30,
    farRange: 10,
    rightCorner: 85
  },
  {
    action: "Jumps",
    leftCorner: 65,
    closeRange: 25,
    midRange: 70,
    farRange: 40,
    rightCorner: 50
  },
  {
    action: "Throws",
    leftCorner: 80,
    closeRange: 90,
    midRange: 30,
    farRange: 5,
    rightCorner: 75
  }
];

// Strategy recommendations
const strategyRecommendations: Record<string, StrategyRecommendation> = {
  "Ryu": {
    characterPick: "Guile",
    characterAdvantage: "strong",
    overallStrategy: "Control the match with superior zoning. Your sonic booms will outprioritize his fireballs, and your defensive options are stronger. Keep him at mid-range where he's less effective.",
    openingOptions: [
      "Start with sonic boom to establish control",
      "Walk forward and block to bait a fireball, then punish",
      "Use back heavy kick to establish your space"
    ],
    keyPunishes: [
      {
        enemyMove: "Blocked Dragon Punch",
        punishOption: "crMK into Flash Kick",
        damage: 35,
        difficulty: "easy"
      },
      {
        enemyMove: "Blocked Tatsu",
        punishOption: "Standing HP into Sonic Hurricane",
        damage: 45,
        difficulty: "medium"
      },
      {
        enemyMove: "Blocked Drive Impact",
        punishOption: "Drive Impact counter",
        damage: 30,
        difficulty: "easy"
      }
    ],
    defensiveOptions: [
      "Flash Kick on wake-up if they're pressuring aggressively",
      "Drive Parry his block strings to gain drive gauge advantage",
      "Neutral jump to avoid throw attempts"
    ],
    offensiveOptions: [
      "Use Sonic Boom to control space and force approach",
      "If they jump, anti-air with cr.HP or Flash Kick",
      "Corner pressure with Boom cancels into Drive Rush"
    ]
  },
  "Cammy": {
    characterPick: "Zangief",
    characterAdvantage: "even",
    overallStrategy: "Patience is key against Cammy's rush down. Use your superior health and damage to trade favorably. Command grabs will keep her honest when she tries to play defensive.",
    openingOptions: [
      "Stand your ground at round start, ready to counter her approach",
      "Forward HK to establish space and potentially crush her pokes",
      "Light SPD if she dashes in immediately"
    ],
    keyPunishes: [
      {
        enemyMove: "Blocked Spiral Arrow",
        punishOption: "Lariat into SPD",
        damage: 40,
        difficulty: "medium"
      },
      {
        enemyMove: "Blocked Cannon Spike",
        punishOption: "Heavy SPD",
        damage: 50,
        difficulty: "easy"
      },
      {
        enemyMove: "Whiffed throw",
        punishOption: "cr.HP into EX Lariat",
        damage: 35,
        difficulty: "medium"
      }
    ],
    defensiveOptions: [
      "Use V-Shift to escape her blockstrings",
      "Green Hand to escape corner pressure",
      "Block low by default, react to her overhead"
    ],
    offensiveOptions: [
      "Command grab when she's respecting your space",
      "Use Lariat to beat her pokes at mid-range",
      "Corner carry with running bear grab sequence"
    ]
  },
  "Guile": {
    characterPick: "Rashid",
    characterAdvantage: "strong",
    overallStrategy: "Use your mobility to get past his sonic booms. Whirlwind pressure can break through his defensive wall. Your goal is to corner him where his zoning is less effective.",
    openingOptions: [
      "Eagle Spike to approach through sonic booms",
      "Rolling Assault to build pressure quickly",
      "Walk and block to gain space strategically"
    ],
    keyPunishes: [
      {
        enemyMove: "Blocked Flash Kick",
        punishOption: "crHP into Eagle Spike",
        damage: 40,
        difficulty: "medium"
      },
      {
        enemyMove: "Whiffed Sonic Boom (close)",
        punishOption: "Wing Dash into mixer",
        damage: 35,
        difficulty: "hard"
      },
      {
        enemyMove: "Standing HK",
        punishOption: "EX Rolling Assault",
        damage: 28,
        difficulty: "easy"
      }
    ],
    defensiveOptions: [
      "V-Reversal when pressured in corner",
      "V-Shift through boom traps",
      "Block sonic booms and be patient"
    ],
    offensiveOptions: [
      "Use tornado mixups to break defensive patterns",
      "Whirlwind Shot to counter sonic booms",
      "Corner pressure with Eagle Spike left/right mixups"
    ]
  }
};

// Color scale for heatmap
const getHeatmapColor = (value: number) => {
  if (value >= 80) return "bg-red-600 text-white";
  if (value >= 60) return "bg-orange-500 text-white";
  if (value >= 40) return "bg-yellow-400 text-black";
  if (value >= 20) return "bg-green-400 text-black";
  return "bg-blue-300 text-black";
};

const StreetFighterStrategyBuilder: React.FC = () => {
  const [selectedOpponent, setSelectedOpponent] = useState<OpponentData | null>(mockOpponents[0]);
  const [selectedTab, setSelectedTab] = useState("scout");
  const [yourCharacter, setYourCharacter] = useState("Guile");

  // Determine recommendation based on selected character
  const getRecommendation = () => {
    if (!selectedOpponent) return null;
    return strategyRecommendations[selectedOpponent.character] || null;
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Street Fighter 6 Strategy Builder</h2>
          <p className="text-gray-400 text-sm">
            Generate data-driven strategies and counters for upcoming matches
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Select value={selectedOpponent?.name} onValueChange={(name) => {
            const opponent = mockOpponents.find(o => o.name === name) || null;
            setSelectedOpponent(opponent);
          }}>
            <SelectTrigger className="w-full sm:w-[240px] bg-surface border-none">
              <SelectValue placeholder="Select opponent" />
            </SelectTrigger>
            <SelectContent>
              {mockOpponents.map((opponent) => (
                <SelectItem key={opponent.id} value={opponent.name}>
                  {opponent.name} ({opponent.character})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="secondary" size="icon">
            <PlusCircleIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedOpponent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Opponent Summary Card */}
          <Card className="bg-surface border-none lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <GamepadIcon className="mr-2 h-5 w-5 text-accent" />
                Opponent Profile
              </CardTitle>
              <CardDescription>
                Match history and tendencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 rounded-md bg-background/40">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{selectedOpponent.name}</h3>
                  <Badge className="bg-primary text-sm py-1">
                    {selectedOpponent.character}
                  </Badge>
                </div>
                <div className="flex items-center text-sm mb-3">
                  <Badge variant="outline" className="mr-1.5 bg-background/50">
                    {selectedOpponent.playstyle}
                  </Badge>
                  <span className="text-gray-400">
                    ({selectedOpponent.matchHistory.wins}W - {selectedOpponent.matchHistory.losses}L)
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  {selectedOpponent.gameplan}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div className="flex items-center">
                    <ThumbsUpIcon className="h-3.5 w-3.5 mr-1.5 text-green-400" />
                    <span className="text-gray-300">Win rate: </span>
                    <span className="ml-1 font-semibold text-white">
                      {Math.round((selectedOpponent.matchHistory.wins / (selectedOpponent.matchHistory.wins + selectedOpponent.matchHistory.losses)) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ActivityIcon className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
                    <span className="text-gray-300">Playstyle: </span>
                    <span className="ml-1 font-semibold text-white">
                      {selectedOpponent.playstyle}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold flex items-center mb-2">
                  <BarChart3Icon className="h-4 w-4 mr-1.5 text-accent" />
                  Player Tendencies
                </h4>
                <div className="space-y-2">
                  {Object.entries(selectedOpponent.tendencies).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <span className="w-28 text-xs text-gray-400 capitalize">{key}:</span>
                      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs font-medium">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold flex items-center mb-2">
                  <FileBarChart2Icon className="h-4 w-4 mr-1.5 text-accent" />
                  Recent Matches
                </h4>
                <div className="space-y-2">
                  {selectedOpponent.matchHistory.lastMatches.map((match, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-1.5 rounded bg-background/30">
                      <span>{match.opponent}</span>
                      <div className="flex items-center">
                        <Badge className={match.result === "win" ? "bg-green-600" : "bg-red-600"}>
                          {match.score}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Strategy Area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-surface border-b border-gray-800">
                <TabsTrigger value="scout" className="data-[state=active]:bg-background">
                  Scouting Report
                </TabsTrigger>
                <TabsTrigger value="counter" className="data-[state=active]:bg-background">
                  Counter Strategy
                </TabsTrigger>
                <TabsTrigger value="heatmap" className="data-[state=active]:bg-background">
                  Move Heatmap
                </TabsTrigger>
              </TabsList>
              
              {/* Scouting Report Tab */}
              <TabsContent value="scout" className="mt-6">
                <Card className="bg-surface border-none">
                  <CardHeader className="pb-2 flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        AI Scouting Analysis
                      </CardTitle>
                      <CardDescription>
                        Detailed breakdown of player tendencies
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <RotateCwIcon className="h-3.5 w-3.5 mr-1.5" /> 
                      Refresh
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {/* Habits Section */}
                      <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <ClockIcon className="h-5 w-5 mr-2 text-yellow-500" />
                          Key Habits
                        </h3>
                        <ul className="space-y-2">
                          {selectedOpponent.habits.map((habit, idx) => (
                            <li key={idx} className="flex items-start p-2 bg-background/40 rounded-md">
                              <ChevronRightIcon className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                              <p className="text-sm ml-2">{habit}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Strengths & Weaknesses */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <h3 className="text-md font-medium mb-2 flex items-center">
                            <ThumbsUpIcon className="h-4 w-4 mr-2 text-green-500" />
                            Strengths
                          </h3>
                          <ul className="space-y-1.5">
                            {selectedOpponent.strengths.map((strength, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <ChevronRightIcon className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                                <span className="ml-1.5">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-md font-medium mb-2 flex items-center">
                            <ThumbsDownIcon className="h-4 w-4 mr-2 text-red-500" />
                            Weaknesses
                          </h3>
                          <ul className="space-y-1.5">
                            {selectedOpponent.weaknesses.map((weakness, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <ChevronRightIcon className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                                <span className="ml-1.5">{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Move Tendencies */}
                      <div className="mt-4">
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <ActivityIcon className="h-5 w-5 mr-2 text-blue-500" />
                          Move Tendencies
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(selectedOpponent.moveTendencies).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                              <div className="w-full">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs text-gray-400 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                  </span>
                                  <span className="text-xs font-medium">{value}%</span>
                                </div>
                                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      value > 70 ? "bg-red-500" : 
                                      value > 50 ? "bg-yellow-500" : 
                                      value > 30 ? "bg-green-500" : "bg-blue-500"
                                    }`}
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Exploitable Pattern Alert */}
                      <div className="p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-md mt-4">
                        <div className="flex items-center">
                          <AlertTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                          <h3 className="text-sm font-medium text-yellow-400">Exploitable Pattern Detected</h3>
                        </div>
                        <p className="mt-1.5 text-sm text-gray-300">
                          This opponent has a <span className="text-yellow-400 font-medium">42% tendency</span> to use wake-up DP when knocked down.
                          This creates a significant opportunity for baiting and punishing with high-damage combos.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Counter Strategy Tab */}
              <TabsContent value="counter" className="mt-6">
                <Card className="bg-surface border-none">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">
                          Counter Strategy
                        </CardTitle>
                        <CardDescription>
                          Optimal counterpicks and tactics
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">Your Character:</span>
                        <Select value={yourCharacter} onValueChange={setYourCharacter}>
                          <SelectTrigger className="w-[130px] bg-background/50 h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ryu">Ryu</SelectItem>
                            <SelectItem value="Guile">Guile</SelectItem>
                            <SelectItem value="Cammy">Cammy</SelectItem>
                            <SelectItem value="Rashid">Rashid</SelectItem>
                            <SelectItem value="Zangief">Zangief</SelectItem>
                            <SelectItem value="Juri">Juri</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recommendation ? (
                      <div className="space-y-5">
                        {/* Character Recommendation */}
                        <div className="p-3 rounded-md bg-background/40">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium flex items-center">
                              <TargetIcon className="h-5 w-5 mr-2 text-accent" />
                              Character Matchup
                            </h3>
                            <Badge
                              className={
                                recommendation.characterAdvantage === "strong" ? "bg-green-600" :
                                recommendation.characterAdvantage === "even" ? "bg-yellow-600" : "bg-red-600"
                              }
                            >
                              {recommendation.characterAdvantage === "strong" ? "Advantageous" :
                               recommendation.characterAdvantage === "even" ? "Even" : "Disadvantageous"} 
                              Matchup
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">
                            {recommendation.overallStrategy}
                          </p>
                          {recommendation.characterPick !== yourCharacter && (
                            <div className="mt-2 text-xs p-2 bg-primary/20 rounded border border-primary/30 flex items-start">
                              <AlertTriangleIcon className="h-4 w-4 text-primary shrink-0 mr-1.5 mt-0.5" />
                              <span>
                                Recommendation: Consider using <span className="font-semibold text-primary">{recommendation.characterPick}</span> for this matchup.
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Opening Strategy */}
                        <div>
                          <h3 className="text-md font-medium mb-2 flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2 text-blue-500" />
                            Round Start Options
                          </h3>
                          <ul className="space-y-1.5">
                            {recommendation.openingOptions.map((option, idx) => (
                              <li key={idx} className="text-sm flex items-start p-2 bg-background/30 rounded-md">
                                <ChevronRightIcon className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                                <span className="ml-1.5">{option}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Key Punishes */}
                        <div>
                          <h3 className="text-md font-medium mb-2 flex items-center">
                            <AlertTriangleIcon className="h-4 w-4 mr-2 text-red-500" />
                            Key Punishes
                          </h3>
                          <div className="space-y-2">
                            {recommendation.keyPunishes.map((punish, idx) => (
                              <div key={idx} className="p-2 bg-background/30 rounded-md">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium text-red-400">
                                    {punish.enemyMove}
                                  </span>
                                  <Badge className={
                                    punish.difficulty === "easy" ? "bg-green-600" :
                                    punish.difficulty === "medium" ? "bg-yellow-600" : "bg-red-600"
                                  }>
                                    {punish.difficulty}
                                  </Badge>
                                </div>
                                <div className="flex justify-between text-xs text-gray-300">
                                  <span>➜ {punish.punishOption}</span>
                                  <span className="text-yellow-400">{punish.damage}% damage</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Offensive & Defensive Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div>
                            <h3 className="text-md font-medium mb-2 flex items-center">
                              <ThumbsUpIcon className="h-4 w-4 mr-2 text-green-500" />
                              Offensive Options
                            </h3>
                            <ul className="space-y-1.5">
                              {recommendation.offensiveOptions.map((option, idx) => (
                                <li key={idx} className="text-sm flex items-start">
                                  <ChevronRightIcon className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                                  <span className="ml-1.5">{option}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-md font-medium mb-2 flex items-center">
                              <ThumbsDownIcon className="h-4 w-4 mr-2 text-blue-500" />
                              Defensive Options
                            </h3>
                            <ul className="space-y-1.5">
                              {recommendation.defensiveOptions.map((option, idx) => (
                                <li key={idx} className="text-sm flex items-start">
                                  <ChevronRightIcon className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                                  <span className="ml-1.5">{option}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-400">No counter strategy available for this opponent.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Heatmap Tab */}
              <TabsContent value="heatmap" className="mt-6">
                <Card className="bg-surface border-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Position & Move Heatmap
                    </CardTitle>
                    <CardDescription>
                      Visual analysis of opponent's tendencies by screen position
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-gray-300">
                        This heatmap visualizes the opponent's move frequency based on their position on screen.
                        Red cells indicate high frequency, blue cells indicate low frequency.
                      </p>
                    </div>
                    
                    {/* Heatmap Grid */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse mt-4">
                        <thead>
                          <tr>
                            <th className="text-left p-2 text-xs text-gray-400 font-normal">Action / Position</th>
                            <th className="p-2 text-xs text-gray-400 font-normal">Left Corner</th>
                            <th className="p-2 text-xs text-gray-400 font-normal">Close Range</th>
                            <th className="p-2 text-xs text-gray-400 font-normal">Mid Range</th>
                            <th className="p-2 text-xs text-gray-400 font-normal">Far Range</th>
                            <th className="p-2 text-xs text-gray-400 font-normal">Right Corner</th>
                          </tr>
                        </thead>
                        <tbody>
                          {moveZoneData.map((zone, idx) => (
                            <tr key={idx} className="border-t border-gray-700">
                              <td className="p-2 text-sm font-medium">{zone.action}</td>
                              <td className={`p-2 text-center text-xs ${getHeatmapColor(zone.leftCorner)}`}>
                                {zone.leftCorner}%
                              </td>
                              <td className={`p-2 text-center text-xs ${getHeatmapColor(zone.closeRange)}`}>
                                {zone.closeRange}%
                              </td>
                              <td className={`p-2 text-center text-xs ${getHeatmapColor(zone.midRange)}`}>
                                {zone.midRange}%
                              </td>
                              <td className={`p-2 text-center text-xs ${getHeatmapColor(zone.farRange)}`}>
                                {zone.farRange}%
                              </td>
                              <td className={`p-2 text-center text-xs ${getHeatmapColor(zone.rightCorner)}`}>
                                {zone.rightCorner}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Heatmap Analysis */}
                    <div className="mt-6 p-3 bg-background/40 rounded-md">
                      <h3 className="text-md font-medium mb-2">AI Analysis</h3>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-red-400">Danger Zones:</span> This opponent is most dangerous in the corner (high throw and Drive Impact frequency) and at mid-range with fireballs.
                      </p>
                      <p className="text-sm text-gray-300 mt-2">
                        <span className="font-medium text-green-400">Safe Zones:</span> You'll have the advantage at far range where most of their options are limited (blue cells). They rarely use fireballs in the corner, creating an opportunity.
                      </p>
                      <p className="text-sm text-gray-300 mt-2">
                        <span className="font-medium text-yellow-400">Jump Patterns:</span> Notice the high frequency of jumps at mid-range (70%) - this indicates they likely jump over fireballs instead of other options like parrying. Be ready with anti-airs when at this distance.
                      </p>
                    </div>
                    
                    {/* Skills Radar Chart */}
                    <div className="mt-6">
                      <h3 className="text-md font-medium mb-4 flex items-center">
                        <ActivityIcon className="h-4 w-4 mr-2 text-accent" />
                        Performance Radar
                      </h3>
                      <div className="h-[300px]">
                        <PlayerSkillRadar
                          skills={[
                            { name: "Aggression", value: selectedOpponent.tendencies.aggression },
                            { name: "Defense", value: selectedOpponent.tendencies.defense },
                            { name: "Execution", value: selectedOpponent.tendencies.execution },
                            { name: "Adaptation", value: selectedOpponent.tendencies.adaptability },
                            { name: "Spacing", value: selectedOpponent.tendencies.spacing }
                          ]}
                          color="#39FF14"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreetFighterStrategyBuilder;