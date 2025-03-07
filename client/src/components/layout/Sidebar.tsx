import { Link, useLocation } from "wouter";
import { 
  LayoutDashboardIcon, 
  SearchIcon, 
  BrainIcon, 
  UsersIcon, 
  SettingsIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [location] = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboardIcon },
    { name: 'Scouting', href: '/scouting', icon: SearchIcon },
    { name: 'Strategy', href: '/strategy', icon: BrainIcon },
    { name: 'My Team', href: '/team', icon: UsersIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const recentMatches = [
    { teams: "Team Alpha vs Team Omega", result: "WIN" },
    { teams: "Team Delta vs Team Alpha", result: "LOSS" },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-surface">
        <div className="flex items-center justify-center h-16 px-4 bg-surface">
          <span className="text-2xl font-bold text-white">AI<span className="text-[#39FF14]">League</span></span>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto bg-darkBg">
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
