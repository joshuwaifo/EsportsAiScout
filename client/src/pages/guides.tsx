import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import { useGame } from '@/context/GameContext';
import MoveInputGuide from '@/components/guides/MoveInputGuide';
import TeamBattleScout from '@/components/scouting/TeamBattleScout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Users } from 'lucide-react';

export default function GuidesPage() {
  const { selectedGame } = useGame();
  const [activeTab, setActiveTab] = React.useState("moveGuide");
  
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
            </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-white">
                {selectedGame} Advanced Guides
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Learn special move inputs and team battle strategies
              </p>
            </div>
            
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              {selectedGame === 'Street Fighter' ? (
                <div className="space-y-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="moveGuide" className="flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4" />
                        <span>Special Move Inputs</span>
                      </TabsTrigger>
                      <TabsTrigger value="teamBattle" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Team Battle Scout</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="moveGuide">
                      <MoveInputGuide />
                    </TabsContent>
                    
                    <TabsContent value="teamBattle">
                      <TeamBattleScout />
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <h2 className="text-2xl font-bold mb-4">Guides Coming Soon</h2>
                  <p className="text-gray-400 text-center max-w-md">
                    We're currently building specialized guides for {selectedGame}. 
                    Please check back later or try switching to Street Fighter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <MobileNav />
      </div>
    </div>
  );
}