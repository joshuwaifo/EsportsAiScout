import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerSkill {
  name: string;
  value: number;
}

interface Player {
  name: string;
  role: string;
  matchPercentage: number;
  skills: PlayerSkill[];
  tournaments: number;
  rating: number;
  avatarUrl?: string;
}

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-surface bg-opacity-50 border-none hover:translate-y-[-5px] hover:shadow-2xl">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary to-blue-600">
          <div className="absolute flex items-center justify-center w-16 h-16 overflow-hidden bg-darkBg rounded-full top-24 left-6 ring-4 ring-darkBg">
            {player.avatarUrl ? (
              <img 
                src={player.avatarUrl} 
                alt={`${player.name} avatar`} 
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-xl font-bold text-white">
                {player.name.substring(0, 2)}
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-0 right-0 px-3 py-1 m-3 text-xs font-bold text-white rounded-full bg-secondary">
          {player.matchPercentage}% MATCH
        </div>
      </div>
      <div className="px-6 pt-16 pb-6">
        <h4 className="text-lg font-bold text-white">{player.name}</h4>
        <p className="text-sm text-gray-400">{player.role}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          {player.skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1 text-xs">
                <span className="text-gray-400">{skill.name}</span>
                <span className="font-semibold text-[#39FF14]">{skill.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-darkBg">
                <div 
                  className="h-2 rounded-full bg-[#39FF14]" 
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-6">
          <span className="flex items-center text-sm text-gray-400">
            <svg 
              className="mr-1 w-4 h-4 text-blue-500" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
            </svg>
            {player.tournaments} Tournaments
          </span>
          <span className="flex items-center text-sm text-gray-400">
            <svg 
              className="mr-1 w-4 h-4 text-yellow-500" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {player.rating} Rating
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <Button className="px-4 py-2 text-sm" variant="default">
            Full Profile
          </Button>
          <Button className="px-3 py-2 text-sm" variant="outline" size="icon">
            <ChartBarIcon className="h-4 w-4" />
          </Button>
          <Button className="px-3 py-2 text-sm" variant="outline" size="icon">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
