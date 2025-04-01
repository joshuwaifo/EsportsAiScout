import { Link, useLocation } from "wouter";
import { 
  LayoutDashboardIcon, 
  SearchIcon, 
  BrainIcon, 
  UsersIcon, 
  SettingsIcon,
  InfoIcon,
  MessageSquareIcon,
  GamepadIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGame } from "@/context/GameContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Sidebar() {
  const [location] = useLocation();
  const { selectedGame, setSelectedGame } = useGame();

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboardIcon },
    { name: 'Scouting', href: '/scouting', icon: SearchIcon },
    { name: 'Strategy', href: '/strategy', icon: BrainIcon },
    { name: 'My Team', href: '/team', icon: UsersIcon },
    { name: 'Coach Q&A', href: '/coach', icon: MessageSquareIcon },
    { name: 'About', href: '/about', icon: InfoIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const recentMatches = [
    { teams: "Team Alpha vs Team Omega", result: "WIN" },
    { teams: "Team Delta vs Team Alpha", result: "LOSS" },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-surface">
        <div className="flex flex-col items-center justify-center h-20 px-4 pt-2 bg-surface">
          <span className="text-2xl font-bold text-white mb-1">AI<span className="text-[#39FF14]">League</span></span>
          <div className="text-xs font-semibold tracking-wider text-center text-[#39FF14] uppercase mb-2">
            ESports 2026 Olympics
          </div>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto bg-darkBg">
          <div className="mb-3">
            <Select value={selectedGame} onValueChange={(value) => setSelectedGame(value as any)}>
              <SelectTrigger className="w-full text-sm bg-surface border-surface hover:border-primary">
                <div className="flex items-center">
                  <GamepadIcon className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select game" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-surface border-surface">
                <SelectItem value="Street Fighter" className="text-white">Street Fighter</SelectItem>
                <SelectItem value="League of Legends" className="text-white">League of Legends</SelectItem>
                <SelectItem value="PUBG Mobile" className="text-white">PUBG Mobile</SelectItem>
                <SelectItem value="Tekken" className="text-white">Tekken</SelectItem>
                <SelectItem value="King of Fighters" className="text-white">King of Fighters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location === item.href || 
                (item.href !== '/' && location.startsWith(item.href));
              
              return (
                <Link key={item.name} href={item.href} className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-gray-400 hover:bg-surface hover:text-white"
                )}>
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 mt-6 border-t border-surface">
            <div className="px-4 py-3">
              <h3 className="text-xs font-semibold tracking-wider text-[#39FF14] uppercase">
                Recent Matches
              </h3>
              <div className="mt-2 space-y-2">
                {recentMatches.map((match, index) => (
                  <div key={index} className="p-2 rounded-md bg-surface hover:bg-surfaceLight">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{match.teams}</span>
                      <span className={cn(
                        "px-1.5 py-0.5 text-xs rounded text-white",
                        match.result === "WIN" ? "bg-green-600" : "bg-red-600"
                      )}>
                        {match.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-surface">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs font-medium">CS</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Coach Smith</p>
              <p className="text-xs text-gray-400">Team Alpha</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
