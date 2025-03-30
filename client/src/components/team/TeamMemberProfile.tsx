import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { 
  Button
} from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  ChartBarIcon, 
  TrophyIcon, 
  BarChart2Icon, 
  UserIcon,
  BrainIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Clock8Icon,
  ShieldIcon,
  TargetIcon,
  Activity
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  position: string;
  stats: {
    kda: number;
    winRate: number;
    gamesPlayed?: number;
  };
  avatarUrl?: string;
}

interface TeamMemberProfileProps {
  member: TeamMember;
}

export default function TeamMemberProfile({ member }: TeamMemberProfileProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Generate performance metrics based on KDA and win rate
  const generatePerformanceMetrics = (member: TeamMember) => {
    // Default games played if not provided
    const gamesPlayed = member.stats.gamesPlayed || 50;
    
    // Calculate derived metrics
    const consistency = Math.min(85, Math.round(member.stats.winRate * 0.9 + member.stats.kda * 2));
    const teamImpact = Math.min(95, Math.round(member.stats.kda * 8 + (member.stats.winRate * 0.5)));
    const clutchFactor = Math.min(90, Math.round(member.stats.winRate * 0.7 + member.stats.kda * 5));
    
    return {
      consistency,
      teamImpact,
      clutchFactor,
      estimatedHours: gamesPlayed * 0.5,
      strengths: [
        member.stats.kda > 4.5 ? 
          `Exceptional KDA ratio of ${member.stats.kda}, indicating elite survivability and impact.` : 
          `Solid KDA ratio of ${member.stats.kda}, showing good combat efficiency.`,
        member.stats.winRate > 65 ? 
          `Impressive ${member.stats.winRate}% win rate across matches played.` : 
          `Reliable ${member.stats.winRate}% win rate in competitive play.`,
        consistency > 75 ? 
          `High consistency in performance with few underperforming matches.` : 
          `Steady improvement in consistency metrics over recent matches.`
      ],
      improvements: [
        member.stats.kda < 5 ? 
          `Could further improve KDA ratio with better positioning and survivability.` : 
          `Focus on expanding champion/hero pool while maintaining high KDA.`,
        member.stats.winRate < 70 ? 
          `Room to increase overall win contribution in key matchups.` : 
          `Work on translating individual performance to team success in challenging scenarios.`,
        clutchFactor < 80 ? 
          `Develop better decision-making in high-pressure situations.` : 
          `Continue refining shotcalling to maximize team coordination.`
      ]
    };
  };

  const performance = generatePerformanceMetrics(member);
  const performanceLevel = 
    member.stats.kda > 5 && member.stats.winRate > 70 ? "Elite" : 
    member.stats.kda > 4 && member.stats.winRate > 60 ? "Outstanding" : 
    member.stats.kda > 3 && member.stats.winRate > 50 ? "Solid" : "Developing";
  
  const performanceColor = 
    performanceLevel === "Elite" ? "bg-green-600" : 
    performanceLevel === "Outstanding" ? "bg-blue-600" : 
    performanceLevel === "Solid" ? "bg-yellow-600" : "bg-gray-600";

  return (
    <>
      <Button 
        variant="default" 
        size="sm" 
        className="w-full"
        onClick={() => setIsDialogOpen(true)}
      >
        View Profile
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-surface border-none text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              {member.name}
              <Badge className="ml-3 bg-secondary text-white">Team Member</Badge>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {member.role} • {member.position}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {/* Left Section - Player Image & Identity */}
            <div className="flex flex-col items-center bg-darkBg rounded-lg p-5 md:w-1/3">
              <Avatar className="h-32 w-32 mb-4">
                {member.avatarUrl ? (
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                ) : (
                  <AvatarFallback className="bg-primary text-3xl">
                    {member.name.substring(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{member.role}</p>
              
              <Badge className={`${performanceColor} mb-4`}>
                {performanceLevel} Player
              </Badge>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Clock8Icon className="h-4 w-4 mr-2 text-blue-400" />
                    Est. Training Hours
                  </span>
                  <span className="text-white">{performance.estimatedHours}h</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center">
                    <ShieldIcon className="h-4 w-4 mr-2 text-green-400" />
                    Team Synergy
                  </span>
                  <span className="text-white">High</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center">
                    <TargetIcon className="h-4 w-4 mr-2 text-purple-400" />
                    Role Expertise
                  </span>
                  <span className="text-white">{member.position}</span>
                </div>
              </div>
            </div>
            
            {/* Right Section - Statistics & Performance */}
            <div className="space-y-4 md:w-2/3">
              {/* Performance Stats */}
              <div className="bg-darkBg rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-4 text-white">Performance Statistics</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-darkBg bg-opacity-50 p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <BarChart2Icon className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm text-gray-400">KDA Ratio</span>
                    </div>
                    <p className="text-xl font-bold text-white">{member.stats.kda}</p>
                  </div>
                  
                  <div className="bg-darkBg bg-opacity-50 p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <TrophyIcon className="h-4 w-4 mr-2 text-yellow-500" />
                      <span className="text-sm text-gray-400">Win Rate</span>
                    </div>
                    <p className="text-xl font-bold text-white">{member.stats.winRate}%</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400 flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-green-500" />
                        Consistency
                      </span>
                      <span className="text-sm font-medium text-white">{performance.consistency}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-800">
                      <div 
                        className="h-2 rounded-full bg-green-500" 
                        style={{ width: `${performance.consistency}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400 flex items-center">
                        <UserIcon className="h-4 w-4 mr-2 text-blue-500" />
                        Team Impact
                      </span>
                      <span className="text-sm font-medium text-white">{performance.teamImpact}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-800">
                      <div 
                        className="h-2 rounded-full bg-blue-500" 
                        style={{ width: `${performance.teamImpact}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-purple-500" />
                        Clutch Factor
                      </span>
                      <span className="text-sm font-medium text-white">{performance.clutchFactor}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-800">
                      <div 
                        className="h-2 rounded-full bg-purple-500" 
                        style={{ width: `${performance.clutchFactor}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance Analysis */}
              <div className="bg-darkBg rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
                  <BrainIcon className="h-5 w-5 mr-2 text-primary" />
                  Performance Analysis
                </h3>
                
                <div className="mt-4 space-y-4">
                  {/* Strengths */}
                  <div>
                    <h4 className="text-green-400 font-medium flex items-center">
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                      Strengths
                    </h4>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-200">
                      {performance.strengths.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Areas for Improvement */}
                  <div>
                    <h4 className="text-yellow-400 font-medium flex items-center">
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                      Areas for Improvement
                    </h4>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-200">
                      {performance.improvements.map((improvement, i) => (
                        <li key={i}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Coach Notes */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h4 className="text-primary font-medium mb-2">Coach's Notes</h4>
                    <p className="text-sm text-gray-300">
                      {member.name} is a {performanceLevel.toLowerCase()} player who {
                        performanceLevel === "Elite" ? 
                          "consistently performs at the highest levels in competitive play. Their decision-making and mechanical skill are exceptional, setting the standard for the team." : 
                        performanceLevel === "Outstanding" ? 
                          "shows remarkable talent and execution. With continued focus on team coordination, they can reach elite status in the competitive scene." : 
                        performanceLevel === "Solid" ? 
                          "provides reliable performance in their role. With dedicated practice on specific mechanics and game knowledge, they can elevate their play to the next level." : 
                          "shows promising potential. Focused training on core mechanics and game fundamentals will accelerate their development."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4 flex justify-between items-center border-t border-gray-700 pt-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Training Plan</Button>
              <Button variant="outline" size="sm">Match History</Button>
            </div>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}