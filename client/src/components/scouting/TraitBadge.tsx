import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  ZapIcon, 
  ShieldIcon, 
  CrosshairIcon, 
  BrainIcon, 
  ClockIcon, 
  FlameIcon, 
  ShieldCheckIcon, 
  TargetIcon, 
  HandIcon
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TraitBadgeProps {
  trait: string;
}

export default function TraitBadge({ trait }: TraitBadgeProps) {
  const getTraitInfo = (trait: string) => {
    switch (trait.toLowerCase()) {
      // Playstyle traits
      case 'aggressive starter':
        return {
          icon: <FlameIcon className="h-3 w-3 mr-1" />,
          color: 'bg-red-600',
          description: 'Begins rounds with offensive pressure',
        };
      case 'defensive':
        return {
          icon: <ShieldIcon className="h-3 w-3 mr-1" />,
          color: 'bg-blue-600',
          description: 'Excels at turtling and counter-attacking',
        };
      case 'zoner':
        return {
          icon: <TargetIcon className="h-3 w-3 mr-1" />,
          color: 'bg-purple-600',
          description: 'Specializes in controlling space with projectiles',
        };
        
      // Execution traits
      case 'combo master':
        return {
          icon: <ZapIcon className="h-3 w-3 mr-1" />,
          color: 'bg-yellow-600',
          description: 'High combo completion rate with optimal damage',
        };
      case 'frame perfect':
        return {
          icon: <ClockIcon className="h-3 w-3 mr-1" />,
          color: 'bg-emerald-600',
          description: 'Executes frame-perfect inputs consistently',
        };
      
      // Defense traits
      case 'no-fly zone':
      case 'anti-air specialist':
        return {
          icon: <CrosshairIcon className="h-3 w-3 mr-1" />,
          color: 'bg-cyan-600',
          description: 'Excellent at defending against jumping attacks',
        };
      case 'tech wizard':
        return {
          icon: <HandIcon className="h-3 w-3 mr-1" />,
          color: 'bg-indigo-600',
          description: 'High success rate at escaping throws',
        };
      case 'parry specialist':
        return {
          icon: <ShieldCheckIcon className="h-3 w-3 mr-1" />,
          color: 'bg-teal-600',
          description: 'Frequently and successfully uses parry mechanics',
        };
        
      // Strategic traits
      case 'meter efficient':
        return {
          icon: <BrainIcon className="h-3 w-3 mr-1" />,
          color: 'bg-amber-600',
          description: 'Uses super meter and drive gauge resources optimally',
        };
      case 'download complete':
        return {
          icon: <BrainIcon className="h-3 w-3 mr-1" />,
          color: 'bg-violet-600',
          description: 'Excellent adaptation to opponent patterns over time',
        };
        
      // Default case
      default:
        return {
          icon: <FlameIcon className="h-3 w-3 mr-1" />,
          color: 'bg-gray-600',
          description: trait,
        };
    }
  };

  const { icon, color, description } = getTraitInfo(trait);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${color} text-white text-xs rounded-md px-2 py-1 flex items-center hover:opacity-90 cursor-help`}>
            {icon}
            {trait}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}