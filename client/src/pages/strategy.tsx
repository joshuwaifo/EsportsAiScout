import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { 
  BrainIcon, 
  ZapIcon, 
  DownloadIcon, 
  FileIcon, 
  DatabaseIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamRadarChart from "@/components/dashboard/TeamRadarChart";
import StrategyRecommendation from "@/components/strategy/StrategyRecommendation";
import OneKeyStrategy from "@/components/strategy/OneKeyStrategy";
import { 
  StrategyGenerationDialog, 
  exportStrategyPlan, 
  exportTeamData
} from "@/components/strategy/StrategyUtils";
import { teamAttributes, draftRecommendations } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

export default function Strategy() {
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [isGeneratingTeamStrategy, setIsGeneratingTeamStrategy] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [currentTeam, setCurrentTeam] = useState("Team Zenith");
  const [strategyData, setStrategyData] = useState<any>(null);
  
  // Opponent stats for comparison
  const opponentTeams = [
    { name: "Team Zenith", matchDate: "Today", similarity: 96 },
    { name: "Team Omega", matchDate: "Next Week", similarity: 81 },
    { name: "Team Nexus", matchDate: "In 2 Weeks", similarity: 64 },
  ];

  // Handle generate main strategy
  const handleGenerateStrategy = () => {
    setIsGeneratingStrategy(true);
    setCurrentTeam("Team Zenith"); // Default to first team
  };

  // Handle generate team-specific strategy
  const handleGenerateTeamStrategy = (teamName: string) => {
    setIsGeneratingTeamStrategy(true);
    setCurrentTeam(teamName);
  };

  // Handle generate insights/analysis
  const handleGenerateAnalysis = () => {
    setIsGeneratingInsights(true);
  };

  // Handle export data
  const handleExportData = () => {
    exportTeamData(teamAttributes);
  };

  // Handle export plan
  const handleExportPlan = () => {
    exportStrategyPlan();
  };

  // Handle strategy completion
  const handleStrategyComplete = (data: any) => {
    setStrategyData(data);
    // Could update UI based on strategy data
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
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none pb-16 lg:pb-0">
          <div className="py-6">
            <PageHeader 
              title="Strategy Center"
              subtitle="AI-powered game planning and opponent analysis"
              actions={
                <>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mr-2"
                    onClick={handleGenerateStrategy}
                  >
                    <ZapIcon className="mr-2 h-4 w-4" />
                    Generate Strategy
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleExportPlan}
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export Plan
                  </Button>
                </>
              }
            />

            <div className="px-4 mx-auto mt-8 max-w-7xl sm:px-6 md:px-8">
              {/* One Key Strategy */}
              <OneKeyStrategy teamAttributes={teamAttributes} />
              
              {/* Strategy Tabs */}
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-6 bg-surface">
                  <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
                  <TabsTrigger value="analysis">Team Analysis</TabsTrigger>
                  <TabsTrigger value="history">Historical Data</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  {/* Opponent Analysis */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                    {opponentTeams.map((team, index) => (
                      <Card key={index} className="bg-surface border-none hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex justify-between items-center">
                            <span>{team.name}</span>
                            <span className="text-sm px-2 py-1 bg-primary bg-opacity-20 rounded-full text-primary">
                              {team.matchDate}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Strategy Match</span>
                              <span className="font-semibold text-[#39FF14]">{team.similarity}%</span>
                            </div>
                            <Progress value={team.similarity} className="h-2" />
                          </div>
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleGenerateTeamStrategy(team.name)}
                          >
                            <BrainIcon className="mr-2 h-4 w-4" />
                            Generate Strategy
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Current Strategy */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="bg-surface border-none">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Team Zenith Analysis</CardTitle>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleExportData}
                        >
                          <DatabaseIcon className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <TeamRadarChart attributes={teamAttributes} />
                      </CardContent>
                    </Card>

                    <Card className="bg-surface border-none">
                      <CardHeader>
                        <CardTitle>Recommended Strategy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <StrategyRecommendation draftPicks={draftRecommendations} />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="analysis">
                  <div className="text-center py-12">
                    <BrainIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Team Analysis</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Detailed analysis of your team's performance, strengths, and areas for improvement.
                    </p>
                    <Button 
                      className="mt-4"
                      onClick={handleGenerateAnalysis}
                    >
                      Generate Analysis
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="text-center py-12">
                    <ZapIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Historical Match Data</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      View past matches, strategies, and performance metrics over time.
                    </p>
                    <Button className="mt-4">View History</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Strategy Generation Dialog */}
      <StrategyGenerationDialog 
        isOpen={isGeneratingStrategy || isGeneratingTeamStrategy || isGeneratingInsights}
        onClose={() => {
          setIsGeneratingStrategy(false);
          setIsGeneratingTeamStrategy(false);
          setIsGeneratingInsights(false);
        }}
        teamName={currentTeam}
        onComplete={handleStrategyComplete}
      />

      <MobileNav />
    </div>
  );
}
