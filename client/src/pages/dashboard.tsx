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
import { 
  statCards, 
  aiInsights, 
  playerProspects, 
  teamAttributes, 
  draftRecommendations 
} from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  DownloadIcon, 
  PlusIcon, 
  BoltIcon 
} from "lucide-react";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

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
                    className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-400 bg-darkBg border border-surface rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-white" 
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
              subtitle="Current Match: Team Alpha vs Team Zenith"
              actions={
                <>
                  <Button variant="secondary" size="sm" className="mr-2">
                    <BoltIcon className="mr-2 h-4 w-4" />
                    New Analysis
                  </Button>
                  <Button size="sm">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </>
              }
            />

            <div className="px-4 mx-auto mt-8 max-w-7xl sm:px-6 md:px-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card, index) => (
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
                <div className="lg:col-span-2">
                  <PerformanceChart timeRange={timeRange} onTimeRangeChange={setTimeRange} />
                </div>

                {/* AI Insights */}
                <div>
                  <AIInsights insights={aiInsights} />
                </div>
              </div>

              {/* Player Scouting Section */}
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold text-white">Top Scouting Prospects</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {playerProspects.slice(0, 3).map((player, index) => (
                    <PlayerCard key={index} player={player} />
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button variant="secondary">
                    View All Prospects
                  </Button>
                </div>
              </div>

              {/* Team Strategy */}
              <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
                {/* Team Performance Chart */}
                <div>
                  <TeamRadarChart attributes={teamAttributes} />
                </div>

                {/* AI Strategy Recommendations */}
                <div>
                  <StrategyRecommendation draftPicks={draftRecommendations} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
