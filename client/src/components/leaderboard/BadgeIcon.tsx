import React from 'react';
import { Badge } from '@/types/leaderboard';
import { badgeIcons, badgeColors, badgeDescriptions } from '@/data/leaderboardData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BadgeIconProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export default function BadgeIcon({ badge, size = 'md' }: BadgeIconProps) {
  const IconComponent = badgeIcons[badge.type] || badgeIcons.default;
  const bgColor = badgeColors[badge.tier] || 'bg-gray-700';
  const sizeClasses = 
    size === 'sm' ? 'h-6 w-6 text-xs' :
    size === 'lg' ? 'h-12 w-12 text-sm' :
    'h-8 w-8 text-xs';
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`${bgColor} text-white rounded-full flex items-center justify-center shadow-md ${sizeClasses}`}
          >
            <IconComponent className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm font-medium">{badge.name}</div>
          <div className="text-xs opacity-70 max-w-48">
            {badgeDescriptions[badge.type] || 'Special achievement in Street Fighter competitions'}
          </div>
          <div className="text-xs mt-1 font-medium">
            {badge.tier} Tier
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}