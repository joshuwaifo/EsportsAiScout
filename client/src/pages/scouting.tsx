import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import PageHeader from "@/components/layout/PageHeader";
import PlayerCard from "@/components/scouting/PlayerCard";
import FighterAnalysisCard from "@/components/scouting/FighterAnalysisCard";
import { playerProspects } from "@/data/mockData";
import { sfPlayerData } from "@/data/sfPlayerData";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { GamepadIcon } from "lucide-react";
import { 
  FilterIcon, 
  RefreshCwIcon, 
  UploadIcon, 
  SearchIcon, 
  BrainIcon,
  AlertTriangleIcon,
  Loader2Icon,
  InfoIcon
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";

export default function ProspectScouting() {
  const { selectedGame } = useGame();
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("all");
  const [game, setGame] = useState("all");
  const [sfMetric, setSfMetric] = useState("all");
  const [playerName, setPlayerName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    playerName: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    compatibilityScore: number;
    recruitmentPriority: string;
  } | null>(null);
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [fileUploaded, setFileUploaded] = useState("");
  
  // Street Fighter specific player data
  const streetFighterPlayers = [
    {
      id: 1,
      name: "DragonPuncher",
      role: "Main: Ryu",       // Using role to denote main character
      position: "Aggressive",  // Using position to denote playstyle
      matchPercentage: 95,
      skills: [
        { name: "Offense", value: 90 },
        { name: "Defense", value: 80 },
        { name: "Execution", value: 85 },
        { name: "Adaptability", value: 75 }
      ],
      tournaments: 12,
      rating: 4.7,
      stats: {
        kda: 3.8,
        winRate: 78,
        gamesPlayed: 350
      }
    },
    {
      id: 2,
      name: "TurtleMaster",
      role: "Main: Guile",
      position: "Defensive",   // Playstyle is defensive
      matchPercentage: 88,
      skills: [
        { name: "Offense", value: 70 },
        { name: "Defense", value: 92 },
        { name: "Execution", value: 80 },
        { name: "Adaptability", value: 78 }
      ],
      tournaments: 8,
      rating: 4.5,
      stats: {
        kda: 3.5,
        winRate: 72,
        gamesPlayed: 280
      }
    },
    {
      id: 3,
      name: "ComboQueen",
      role: "Main: Chun-Li",
      position: "Technical",   // Playstyle focuses on technical execution
      matchPercentage: 90,
      skills: [
        { name: "Offense", value: 85 },
        { name: "Defense", value: 75 },
        { name: "Execution", value: 93 },
        { name: "Adaptability", value: 80 }
      ],
      tournaments: 15,
      rating: 4.8,
      stats: {
        kda: 4.1,
        winRate: 82,
        gamesPlayed: 420
      }
    },
    {
      id: 4,
      name: "GrappleMaster",
      role: "Main: Zangief",
      position: "Grappler",   
      matchPercentage: 85,
      skills: [
        { name: "Offense", value: 88 },
        { name: "Defense", value: 70 },
        { name: "Execution", value: 75 },
        { name: "Adaptability", value: 82 }
      ],
      tournaments: 10,
      rating: 4.4,
      stats: {
        kda: 3.2,
        winRate: 68,
        gamesPlayed: 320
      }
    },
    {
      id: 5,
      name: "FlashKicker",
      role: "Main: Cammy",
      position: "Aggressive",   
      matchPercentage: 92,
      skills: [
        { name: "Offense", value: 95 },
        { name: "Defense", value: 65 },
        { name: "Execution", value: 88 },
        { name: "Adaptability", value: 72 }
      ],
      tournaments: 14,
      rating: 4.6,
      stats: {
        kda: 3.9,
        winRate: 76,
        gamesPlayed: 380
      }
    }
  ];
  
  // Choose player list based on selected game
  const players = selectedGame === "Street Fighter" ? streetFighterPlayers : playerProspects;
  
  // Get detailed SF player data (for advanced scouting)
  const sfPlayers = sfPlayerData;
  
  // Filter the appropriate player list based on search and role
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = role === "all" || player.role.toLowerCase().includes(role.toLowerCase());
    return matchesSearch && matchesRole;
  });

  // Mock analysis data - in a real app, this would come from API
  const mockAnalysisResult = {
    playerName: "ZeroCool",
    strengths: [
      "Exceptional map awareness and vision control",
      "High KDA ratio of 4.2 in tournament play", 
      "Excellent team fight positioning",
      "Flexible champion pool, mastering 12+ champions"
    ],
    weaknesses: [
      "Occasionally overaggressive in early game", 
      "Communication gaps during high-pressure scenarios",
      "Limited experience in offline tournaments"
    ],
    recommendations: [
      "Would pair well with a defensive-minded support",
      "Team should leverage their early-game prowess",
      "Consider for carry positions requiring mechanical expertise"
    ],
    compatibilityScore: 87,
    recruitmentPriority: "High"
  };

  const handlePlayerAnalyze = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!playerName) {
      return; // Prevent empty submission
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would be:
      // const result = await apiRequest('/api/strategy', { 
      //   method: 'POST', 
      //   body: JSON.stringify({ playerName, role: game }) 
      // });
      
      setAnalysisResult(mockAnalysisResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHasUploadedFile(true);
      setFileUploaded(file.name);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-darkBg text-white">
      <Sidebar />
      
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top Navigation (Same as in Dashboard) */}
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-surface shadow">
          <button type="button" className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">
              <h1 className="text-xl font-semibold text-white lg:hidden">AI<span className="text-accent">League</span></h1>
              <div className="hidden w-full max-w-xs ml-6 lg:block">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    id="search" 
                    name="search" 
                    className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-400 bg-darkBg border border-surface rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                    placeholder="Search..." 
                    type="search" 
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center ml-4 md:ml-6">
              <button className="p-1 text-gray-400 rounded-full hover:text-white focus:outline-none">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="p-1 ml-3 text-gray-400 rounded-full hover:text-white focus:outline-none">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none pb-16 lg:pb-0">
          <div className="py-6">
            <PageHeader 
              title="Prospect Scouting"
              subtitle={`${selectedGame} Player Prospects`}
              actions={
                <>
                  <div className="mr-3 bg-surface/80 text-white text-sm px-3 py-1.5 rounded-md flex items-center">
                    <GamepadIcon className="h-4 w-4 mr-1.5 text-accent" />
                    {selectedGame}
                  </div>
                  <Button variant="secondary" size="sm" className="mr-2">
                    <RefreshCwIcon className="mr-2 h-4 w-4" />
                    Refresh Data
                  </Button>
                  <Button size="sm">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Advanced Filters
                  </Button>
                </>
              }
            />

            <div className="px-4 mx-auto mt-8 max-w-7xl sm:px-6 md:px-8">
              
              {/* AI Analysis Form */}
              <Card className="bg-surface border-none mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BrainIcon className="w-5 h-5 mr-2 text-primary" />
                    AI Player Analysis
                  </CardTitle>
                  <CardDescription>
                    Get detailed performance insights using our advanced AI scouting system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePlayerAnalyze} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="playerName">Player Name/ID</Label>
                        <Input 
                          id="playerName"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          placeholder="Enter player name or ID" 
                          className="mt-1 bg-white border-surface text-black"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="gameType">Game Type</Label>
                        <Select value={game} onValueChange={setGame}>
                          <SelectTrigger id="gameType" className="mt-1 bg-darkBg border-surface">
                            <SelectValue placeholder="Select game" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Games</SelectItem>
                            <SelectItem value="league">League of Legends</SelectItem>
                            <SelectItem value="dota">DOTA 2</SelectItem>
                            <SelectItem value="csgo">CS:GO</SelectItem>
                            <SelectItem value="valorant">Valorant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="fileUpload" className="block mb-1">
                        Upload Gameplay Stats (Optional)
                      </Label>
                      <div className="flex items-center">
                        <label
                          htmlFor="fileUpload"
                          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-darkBg border border-surface rounded-md cursor-pointer hover:bg-gray-800"
                        >
                          <UploadIcon className="w-4 h-4 mr-2" />
                          {hasUploadedFile ? "Change File" : "Choose File"}
                          <input
                            id="fileUpload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".csv,.json,.xlsx"
                          />
                        </label>
                        {hasUploadedFile && (
                          <span className="ml-2 text-sm text-gray-400">
                            {fileUploaded}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        Supported formats: CSV, JSON, Excel
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto" 
                      disabled={isAnalyzing || !playerName}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing Player...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="w-4 h-4 mr-2" />
                          Analyze Player
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Analysis Results */}
              {analysisResult && (
                <Card className="mb-8 bg-surface border-none">
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">
                        AI Scouting Report: {analysisResult.playerName}
                      </CardTitle>
                      <Badge className="bg-primary text-white">
                        {analysisResult.compatibilityScore}% Match
                      </Badge>
                    </div>
                    <CardDescription>
                      <span className="flex items-center text-xs">
                        <InfoIcon className="w-3 h-3 mr-1" />
                        Analysis generated by AI League's neural network
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Strengths */}
                      <div>
                        <h4 className="text-md font-medium text-primary mb-2">Player Strengths</h4>
                        <ul className="space-y-1 pl-5 list-disc text-sm">
                          {analysisResult.strengths.map((strength, i) => (
                            <li key={i}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Weaknesses */}
                      <div>
                        <h4 className="text-md font-medium text-orange-500 mb-2">Areas for Development</h4>
                        <ul className="space-y-1 pl-5 list-disc text-sm">
                          {analysisResult.weaknesses.map((weakness, i) => (
                            <li key={i}>{weakness}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Recommendations */}
                      <div>
                        <h4 className="text-md font-medium text-blue-400 mb-2">Team Fit Recommendations</h4>
                        <ul className="space-y-1 pl-5 list-disc text-sm">
                          {analysisResult.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* File Analysis Note */}
                      {hasUploadedFile && (
                        <div className="p-3 bg-darkBg rounded-md">
                          <p className="text-sm flex items-center">
                            <InfoIcon className="w-4 h-4 mr-2 text-blue-400" />
                            <span><strong>Note:</strong> Image analysis coming soon with multimodal AI.</span>
                          </p>
                        </div>
                      )}
                      
                      {/* Recruitment Priority */}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-medium">Recruitment Priority:</span>
                        <Badge 
                          className={`${
                            analysisResult.recruitmentPriority === "High" 
                              ? "bg-green-600" 
                              : analysisResult.recruitmentPriority === "Medium"
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                          }`}
                        >
                          {analysisResult.recruitmentPriority}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-darkBg mt-4 flex justify-between items-center text-xs text-gray-400 px-6 py-3">
                    <div className="flex items-center">
                      <AlertTriangleIcon className="w-3 h-3 mr-1" />
                      <span>AI-generated insights are suggestions and may not be 100% accurate. Use along with human scouting.</span>
                    </div>
                    <a href="/about" className="text-primary hover:underline">Ethics Policy</a>
                  </CardFooter>
                </Card>
              )}
              
              {/* Divider with text */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 text-sm text-gray-400 bg-darkBg">
                    Browse Available Players
                  </span>
                </div>
              </div>
              
              {/* Scouting Filters */}
              <Card className="bg-surface border-none mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Search & Filter Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input 
                        placeholder="Search by player name" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white border-surface text-black"
                      />
                    </div>
                    <div className="w-full md:w-48 mr-2">
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger className="bg-darkBg border-surface">
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          {selectedGame === "Street Fighter" ? (
                            <>
                              <SelectItem value="ryu">Ryu</SelectItem>
                              <SelectItem value="guile">Guile</SelectItem>
                              <SelectItem value="chun-li">Chun-Li</SelectItem>
                              <SelectItem value="zangief">Zangief</SelectItem>
                              <SelectItem value="cammy">Cammy</SelectItem>
                              <SelectItem value="aggressive">Aggressive</SelectItem>
                              <SelectItem value="defensive">Defensive</SelectItem>
                              <SelectItem value="technical">Technical</SelectItem>
                              <SelectItem value="grappler">Grappler</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="mid">Mid Lane</SelectItem>
                              <SelectItem value="top">Top Lane</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                              <SelectItem value="carry">Carry</SelectItem>
                              <SelectItem value="jungle">Jungle</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Street Fighter specific metrics filter */}
                    {selectedGame === "Street Fighter" && (
                      <div className="w-full md:w-48">
                        <Select value={sfMetric} onValueChange={setSfMetric}>
                          <SelectTrigger className="bg-darkBg border-surface">
                            <SelectValue placeholder="Filter by metric" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Metrics</SelectItem>
                            <SelectItem value="execution">High Execution</SelectItem>
                            <SelectItem value="adaptation">High Adaptation</SelectItem>
                            <SelectItem value="matchup">Matchup Awareness</SelectItem>
                            <SelectItem value="micro">Micro Skill</SelectItem>
                            <SelectItem value="macro">Macro Strategy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Player Grid - Show regular cards for non-SF games */}
              {selectedGame !== "Street Fighter" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPlayers.map((player, index) => (
                    <PlayerCard key={index} player={player} />
                  ))}
                </div>
              ) : (
                /* Street Fighter Advanced Scouting Analysis */
                <div className="space-y-6">
                  <div className="bg-surface/30 p-4 rounded-md mb-6">
                    <div className="flex items-center mb-3">
                      <GamepadIcon className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="text-lg font-medium">Street Fighter 6 Pro Scouting Engine</h3>
                    </div>
                    <p className="text-sm text-gray-300">
                      This advanced scouting engine analyzes player performance data from matches to provide detailed insights on execution, 
                      adaptation, and matchup awareness. Hover over trait badges to see detailed explanations.
                    </p>
                  </div>
                
                  {sfPlayers
                    .filter(player => {
                      const nameMatch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
                      const roleMatch = role === "all" || 
                                       player.character.toLowerCase() === role.toLowerCase() || 
                                       player.traits.some(t => t.toLowerCase() === role.toLowerCase());
                      
                      // Apply SF-specific metric filtering
                      let metricMatch = true;
                      if (sfMetric !== "all") {
                        switch(sfMetric) {
                          case "execution":
                            metricMatch = player.execution >= 85;
                            break;
                          case "adaptation":
                            metricMatch = player.adaptation >= 85;
                            break;
                          case "matchup":
                            metricMatch = player.matchupAwareness >= 85;
                            break;
                          case "micro":
                            metricMatch = player.microScore >= 85;
                            break;
                          case "macro":
                            metricMatch = player.macroScore >= 85;
                            break;
                        }
                      }
                      
                      return nameMatch && roleMatch && metricMatch;
                    })
                    .map((player, index) => (
                      <FighterAnalysisCard 
                        key={index} 
                        playerId={player.id}
                        playerName={player.name}
                        character={player.character}
                        execution={player.execution}
                        adaptation={player.adaptation}
                        matchupAwareness={player.matchupAwareness}
                        microScore={player.microScore}
                        macroScore={player.macroScore}
                        traits={player.traits}
                        stats={player.stats}
                        skills={player.skills}
                      />
                    ))}
                </div>
              )}

              {/* No players found message for non-SF games */}
              {filteredPlayers.length === 0 && selectedGame !== "Street Fighter" && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No players found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              )}
              
              {/* No SF players found */}
              {selectedGame === "Street Fighter" && sfPlayers.filter(player => {
                const nameMatch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
                const roleMatch = role === "all" || 
                                 player.character.toLowerCase() === role.toLowerCase() || 
                                 player.traits.some(t => t.toLowerCase() === role.toLowerCase());
                
                // Apply SF-specific metric filtering
                let metricMatch = true;
                if (sfMetric !== "all") {
                  switch(sfMetric) {
                    case "execution":
                      metricMatch = player.execution >= 85;
                      break;
                    case "adaptation":
                      metricMatch = player.adaptation >= 85;
                      break;
                    case "matchup":
                      metricMatch = player.matchupAwareness >= 85;
                      break;
                    case "micro":
                      metricMatch = player.microScore >= 85;
                      break;
                    case "macro":
                      metricMatch = player.macroScore >= 85;
                      break;
                  }
                }
                
                return nameMatch && roleMatch && metricMatch;
              }).length === 0 && (
                <div className="text-center py-12 bg-surface/20 rounded-md">
                  <GamepadIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No fighters match your criteria</h3>
                  <p className="text-gray-400">Try adjusting your character selection or metric filters</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
