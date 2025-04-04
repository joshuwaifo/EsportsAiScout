import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import { useGame } from '@/context/GameContext';
import TeamBattleScout from '@/components/scouting/TeamBattleScout';

export default function TeamScoutingPage() {
  const { selectedGame } = useGame();
  
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
                Team Scouting: {selectedGame} Battle Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Analyze team compositions, matchups, and strategies for team battles
              </p>
            </div>
            
            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              {selectedGame === 'Street Fighter' ? (
                <div className="w-full">
                  <TeamBattleScout />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <h2 className="text-2xl font-bold mb-4">Team Scouting Coming Soon</h2>
                  <p className="text-gray-400 text-center max-w-md">
                    We're currently building team scouting features for {selectedGame}. 
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