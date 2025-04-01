import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PlayCircleIcon, 
  StarIcon, 
  ZapIcon, 
  TrophyIcon,
  ClockIcon,
  FlameIcon
} from "lucide-react";

interface ReplayHighlight {
  timestamp: number;
  event: string;
  player: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

interface ReplayHighlightGeneratorProps {
  matchId?: string;
}

export default function ReplayHighlightGenerator({ matchId }: ReplayHighlightGeneratorProps) {
  // In a real app, these would come from API based on matchId
  const [highlights, setHighlights] = useState<ReplayHighlight[]>([
    {
      timestamp: 55,
      event: "Big Combo",
      player: "Player1",
      description: "10-hit combo for 45% damage",
      impact: "High"
    },
    {
      timestamp: 78,
      event: "Comeback",
      player: "Player2",
      description: "Comeback victory at 5% health",
      impact: "High"
    },
    {
      timestamp: 40,
      event: "Drive Impact Stun",
      player: "Player1",
      description: "Drive Impact wall-splat turning the round momentum",
      impact: "Medium"
    }
  ]);

  const [selectedHighlight, setSelectedHighlight] = useState<ReplayHighlight | null>(null);

  // Get icon for event type
  const getEventIcon = (event: string) => {
    switch (event) {
      case 'Big Combo':
        return <ZapIcon className="h-4 w-4" />;
      case 'Comeback':
        return <TrophyIcon className="h-4 w-4" />;
      case 'Drive Impact Stun':
        return <StarIcon className="h-4 w-4" />;
      case 'Perfect Parry':
        return <StarIcon className="h-4 w-4" />;
      default:
        return <PlayCircleIcon className="h-4 w-4" />;
    }
  };

  // Get color for impact level
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Format timestamp as mm:ss
  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate new random highlights (in a real app, this would fetch from an API)
  const generateHighlights = () => {
    const newHighlights: ReplayHighlight[] = [
      {
        timestamp: Math.floor(Math.random() * 120) + 1,
        event: "Perfect Parry",
        player: "Player1",
        description: "Perfect parry into critical art finish",
        impact: "High"
      },
      {
        timestamp: Math.floor(Math.random() * 120) + 1,
        event: "Drive Rush Cancel",
        player: "Player2",
        description: "Drive rush cancel into combo for 30% damage",
        impact: "Medium"
      }
    ];
    setHighlights([...highlights, ...newHighlights]);
  };

  return (
    <Card className="overflow-hidden shadow-lg bg-surface bg-opacity-50 border-none">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-900/70 to-blue-900/70 pb-2">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <FlameIcon className="h-5 w-5 mr-2 text-orange-400" />
          Match Highlights
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={generateHighlights}
          className="bg-transparent border-white/20 hover:bg-white/10 text-white"
        >
          <PlayCircleIcon className="h-4 w-4 mr-1" />
          Generate
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Timeline visualization */}
        <div className="relative mt-2 mb-6">
          <div className="absolute left-0 right-0 h-2 bg-darkBg rounded-full"></div>
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="absolute -top-1 w-4 h-4 rounded-full cursor-pointer transform hover:scale-125 transition-transform duration-100"
              style={{ 
                left: `${(highlight.timestamp / 120) * 100}%`, 
                background: highlight.impact === 'High' ? 'rgb(248, 113, 113)' : highlight.impact === 'Medium' ? 'rgb(250, 204, 21)' : 'rgb(59, 130, 246)'
              }}
              onClick={() => setSelectedHighlight(highlight)}
              title={highlight.description}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-darkBg rounded px-1 hidden group-hover:block">
                {formatTimestamp(highlight.timestamp)}
              </div>
            </div>
          ))}
          
          {/* Timeline markers */}
          <div className="w-full flex justify-between mt-4 text-xs text-gray-400">
            <span>0:00</span>
            <span>0:30</span>
            <span>1:00</span>
            <span>1:30</span>
            <span>2:00</span>
          </div>
        </div>
        
        {/* Highlights list */}
        <div className="space-y-3 mt-6">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-md bg-darkBg border border-gray-800 cursor-pointer transition-colors duration-200 ${selectedHighlight === highlight ? 'bg-darkBg/80 border-primary' : 'hover:bg-darkBg/60'}`}
              onClick={() => setSelectedHighlight(highlight)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`p-1 text-xs text-white rounded ${getImpactColor(highlight.impact)}`}>
                    {getEventIcon(highlight.event)}
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-white mr-2">
                        {highlight.event}
                      </p>
                      <Badge className="text-[0.65rem] h-4" variant="outline">
                        {highlight.player}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {formatTimestamp(highlight.timestamp)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {highlights.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <PlayCircleIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No highlights available. Generate some!</p>
            </div>
          )}
        </div>
        
        {/* Selected highlight details */}
        {selectedHighlight && (
          <div className="mt-4 p-4 bg-darkBg/50 rounded-md border border-gray-700">
            <h4 className="text-sm font-medium text-white mb-2">
              Highlight Details
            </h4>
            <p className="text-xs text-gray-300 mb-2">
              <span className="font-medium">Event:</span> {selectedHighlight.event} by {selectedHighlight.player}
            </p>
            <p className="text-xs text-gray-300 mb-2">
              <span className="font-medium">Description:</span> {selectedHighlight.description}
            </p>
            <p className="text-xs text-gray-300">
              <span className="font-medium">Timestamp:</span> {formatTimestamp(selectedHighlight.timestamp)}
            </p>
            <div className="mt-3 flex justify-end">
              <Button size="sm" variant="default" className="text-xs">
                <PlayCircleIcon className="h-3 w-3 mr-1" />
                Play Highlight
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}