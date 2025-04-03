import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import PageHeader from "@/components/layout/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import AIInsights from "@/components/dashboard/AIInsights";
import TeamRadarChart from "@/components/dashboard/TeamRadarChart";
import PlayerCard from "@/components/scouting/PlayerCard";
import StrategyRecommendation from "@/components/strategy/StrategyRecommendation";
import ReplayHighlightGenerator from "@/components/dashboard/ReplayHighlightGenerator";
import FighterTerminologyGlossary from "@/components/dashboard/FighterTerminologyGlossary";
import PersonalizedTrainingPlan from "@/components/training/PersonalizedTrainingPlan";
import { 
  StrategyGenerationDialog, 
  exportTeamData 
} from "@/components/strategy/StrategyUtils";
import { 
  statCards, 
  aiInsights as initialAiInsights, 
  playerProspects, 
  teamAttributes, 
  draftRecommendations 
} from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  DownloadIcon, 
  PlusIcon, 
  BoltIcon,
  BrainIcon,
  TrophyIcon,
  CrosshairIcon,
  ClockIcon,
  GamepadIcon
} from "lucide-react";
import { useGame } from "@/context/GameContext";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [aiInsights, setAiInsights] = useState(initialAiInsights);
  const { selectedGame } = useGame();
  
  // Prepare game-specific data based on selected game
  
  // 1. Street Fighter specific stat cards
  const statCardsData = selectedGame === "Street Fighter" ? [
    { title: "Win Rate", value: "75%", change: "+3.0%", icon: TrophyIcon, trend: "up" as const },
    { title: "Attack Accuracy", value: "60%", change: "+1.5%", icon: CrosshairIcon, trend: "up" as const },
    { title: "Avg Match Duration", value: "01:20", change: "-0:10", icon: ClockIcon, trend: "down" as const },
    { title: "Clutch Win Rate", value: "65%", change: "+5%", icon: BrainIcon, trend: "up" as const }
  ] : statCards;
  
  // 2. Street Fighter specific team attributes for radar chart
  const sfAttributes = [
    { name: "Offense", value: 0.9 },
    { name: "Defense", value: 0.8 },
    { name: "Execution", value: 0.85 },
    { name: "Adaptability", value: 0.7 },
    { name: "Mind Games", value: 0.75 },
    { name: "Clutch", value: 0.6 }
  ];
  
  const attributesData = selectedGame === "Street Fighter" ? sfAttributes : teamAttributes;
  
  // 3. Street Fighter specific AI insights
  const sfInsights = [
    {
      type: 'tip' as const,
      title: "Strong Anti-Air Defense",
      description: "This player successfully countered 75% of jump-in attacks, indicating excellent anti-air timing."
    },
    {
      type: 'warning' as const,
      title: "Low Throw Escape Rate",
      description: "Throw-tech success is only 30%. The player could be vulnerable to throws – focus on improving throw escape reactions."
    },
    {
      type: 'stat' as const,
      title: "Frame Advantage Usage",
      description: "Successfully capitalizes on frame advantage in 82% of opportunities, leading to effective pressure sequences."
    }
  ];
  
  const insightsData = selectedGame === "Street Fighter" ? sfInsights : aiInsights;
  
  // 4. Street Fighter specific player prospects
  const streetFighterPlayers = [
    {
      id: 101,
      name: "KenMaster",
      role: "Aggressive",
      position: "Shoto",
      matchPercentage: 92,
      skills: [
        { name: "Anti-Air", value: 95 },
        { name: "Footsies", value: 88 },
        { name: "Combo Execution", value: 90 },
        { name: "Adaptation", value: 85 },
        { name: "Throw Techs", value: 70 }
      ],
      tournaments: 12,
      rating: 9.2,
      stats: {
        kda: 3.8,
        winRate: 78,
        gamesPlayed: 350
      }
    },
    {
      id: 102,
      name: "GuileMain",
      role: "Defensive",
      position: "Charge",
      matchPercentage: 88,
      skills: [
        { name: "Anti-Air", value: 92 },
        { name: "Footsies", value: 95 },
        { name: "Combo Execution", value: 82 },
        { name: "Adaptation", value: 75 },
        { name: "Throw Techs", value: 85 }
      ],
      tournaments: 8,
      rating: 8.8,
      stats: {
        kda: 3.5,
        winRate: 72,
        gamesPlayed: 280
      }
    },
    {
      id: 103,
      name: "ZangStar",
      role: "Balanced",
      position: "Grappler",
      matchPercentage: 85,
      skills: [
        { name: "Anti-Air", value: 80 },
        { name: "Footsies", value: 75 },
        { name: "Command Grabs", value: 95 },
        { name: "Adaptation", value: 82 },
        { name: "Throw Techs", value: 65 }
      ],
      tournaments: 6,
      rating: 8.5,
      stats: {
        kda: 3.2,
        winRate: 70,
        gamesPlayed: 220
      }
    }
  ];
  
  const players = selectedGame === "Street Fighter" ? streetFighterPlayers : playerProspects;
  const topPlayer = players[0];
  
  // Function to generate more insights
  const generateMoreInsights = () => {
    // New insights to add
    const newInsights = selectedGame === "Street Fighter" ? [
      {
        type: 'tip' as const,
        title: 'Counter-hit Conversion',
        description: 'Your counter-hit conversion rate has improved by 15%. Continue practicing hit-confirms from blocked moves.'
      },
      {
        type: 'stat' as const,
        title: 'Critical Art Usage',
        description: 'Critical Art landed in 70% of attempts, showing good judgment in super meter usage.'
      }
    ] : [
      {
        type: 'tip' as const,
        title: 'Mid Game Strategy',
        description: 'Consider prioritizing objective control over aggressive ganking based on recent match data.'
      },
      {
        type: 'stat' as const,
        title: 'Team Fight Win Rate',
        description: 'Your team fight win rate has increased by 12% in the last 5 matches.'
      }
    ];
    
    // Add new insights to the existing ones
    setAiInsights(prevInsights => [...prevInsights, ...newInsights]);
  };
  
  // Handler for "New Analysis" button
  const handleNewAnalysis = () => {
    setIsGeneratingAnalysis(true);
  };

  // Handler for analysis completion
  const handleAnalysisComplete = (data: any) => {
    // We would normally update state with the new analysis data here
    console.log("Analysis complete:", data);
    
    // For demonstration, let's add a new insight based on the "analysis"
    const analysisInsight = {
      type: 'stat' as const,
      title: selectedGame === "Street Fighter" ? 'Match Analysis Results' : 'New Team Analysis',
      description: selectedGame === "Street Fighter" 
        ? `Player performance analysis: ${data.winPercentage}% win probability against current opponents.`
        : `Team synergy score: ${data.winPercentage}%. Focus on improving team communication.`
    };
    
    setAiInsights(prevInsights => [analysisInsight, ...prevInsights]);
  };

  // Handler for exporting data
  const handleExportData = () => {
    exportTeamData(attributesData);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-darkBg text-white">
      <Sidebar />
      
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top Navigation */}
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
                    className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-400 bg-white border border-surface rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-black" 
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
              <div className="relative ml-3 lg:hidden">
                <div>
                  <button type="button" className="flex items-center max-w-xs text-sm bg-darkBg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-xs font-medium">CS</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none pb-16 lg:pb-0">
          <div className="py-6">
            <PageHeader 
              title="Dashboard"
              subtitle={`for ${selectedGame}`}
              actions={
                <>
                  <div className="mr-3 bg-surface/80 text-white text-sm px-3 py-1.5 rounded-md flex items-center">
                    <GamepadIcon className="h-4 w-4 mr-1.5 text-accent" />
                    {selectedGame}
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mr-2"
                    onClick={handleNewAnalysis}
                  >
                    <BoltIcon className="mr-2 h-4 w-4" />
                    New Analysis
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleExportData}
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </>
              }
            />

            <div className="px-4 mx-auto mt-8 max-w-7xl sm:px-6 md:px-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCardsData.map((card, index) => (
                  <StatCard 
                    key={index}
                    title={card.title}
                    value={card.value}
                    change={card.change}
                    icon={card.icon}
                    trend={card.trend}
                  />
                ))}
              </div>

              {/* Main Analytics Sections */}
              <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-3">
                {/* Game Performance Chart */}
                <div className={`${selectedGame === "Street Fighter" ? "lg:col-span-3" : "lg:col-span-2"}`}>
                  <PerformanceChart timeRange={timeRange} onTimeRangeChange={setTimeRange} />
                </div>

                {/* AI Insights */}
                <div className={selectedGame === "Street Fighter" ? "lg:col-span-2" : ""}>
                  <AIInsights 
                    insights={insightsData} 
                    onGenerateMore={generateMoreInsights} 
                  />
                </div>
                
                {/* Street Fighter Specific Terminology Glossary */}
                {selectedGame === "Street Fighter" && (
                  <div className="lg:col-span-1">
                    <FighterTerminologyGlossary />
                  </div>
                )}
              </div>
              
              {/* Street Fighter Match Replay Highlights */}
              {selectedGame === "Street Fighter" && (
                <div className="mt-8">
                  <ReplayHighlightGenerator />
                </div>
              )}

              {/* Street Fighter Personalized Training Plan */}
              {selectedGame === "Street Fighter" && (
                <div className="mt-8">
                  <PersonalizedTrainingPlan />
                </div>
              )}

              {/* Player Scouting Section */}
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold text-white">
                  {selectedGame === "Street Fighter" ? "Top Fighter Prospects" : "Top Scouting Prospects"}
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {players.slice(0, 3).map((player, index) => (
                    <PlayerCard key={index} player={player} />
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button variant="secondary">
                    {selectedGame === "Street Fighter" ? "View All Fighters" : "View All Prospects"}
                  </Button>
                </div>
              </div>

              {/* Team Strategy */}
              <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
                {/* Team Performance Chart */}
                <div>
                  <TeamRadarChart attributes={attributesData} />
                </div>

                {/* AI Strategy Recommendations - Only show for League of Legends */}
                {selectedGame === "League of Legends" ? (
                  <div>
                    <StrategyRecommendation draftPicks={draftRecommendations} />
                  </div>
                ) : selectedGame === "Street Fighter" ? (
                  <div className="bg-surface p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <GamepadIcon className="mr-2 h-5 w-5 text-accent" />
                      Character Matchup Analysis
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-darkBg p-4 rounded-md border border-gray-700">
                        <h4 className="font-medium text-accent mb-2">Favorable Matchups</h4>
                        <p className="text-sm text-gray-300">Based on current fighting style, you have a 70%+ win rate against charge characters and grapplers.</p>
                      </div>
                      <div className="bg-darkBg p-4 rounded-md border border-gray-700">
                        <h4 className="font-medium text-accent mb-2">Challenging Matchups</h4>
                        <p className="text-sm text-gray-300">Struggle against zoners who maintain distance. Consider adding more approach options to your strategy.</p>
                      </div>
                      <div className="bg-darkBg p-4 rounded-md border border-gray-700">
                        <h4 className="font-medium text-accent mb-2">Recommended Training</h4>
                        <p className="text-sm text-gray-300">Focus on anti-zoner drills and practice against characters like Guile and Dhalsim.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Game-Specific Strategy
                    </h3>
                    <p className="text-gray-300">
                      Select League of Legends or Street Fighter for detailed strategy recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
      
      {/* Add the Strategy Generation Dialog */}
      {isGeneratingAnalysis && (
        <StrategyGenerationDialog
          onClose={() => setIsGeneratingAnalysis(false)}
          onComplete={(data) => {
            setIsGeneratingAnalysis(false);
            handleAnalysisComplete({ winPercentage: data?.winRate || 68 });
          }}
        />
      )}
    </div>
  );
}
