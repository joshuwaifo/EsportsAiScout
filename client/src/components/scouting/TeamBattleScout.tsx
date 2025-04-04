import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  UsersIcon, 
  ShieldIcon, 
  SwordIcon, 
  BrainIcon, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  GaugeIcon,
  BoltIcon,
  ActivityIcon,
  SearchIcon,
  TrophyIcon,
  ArrowRightLeftIcon
} from "lucide-react";

// Types for team scouting
export interface TeamMemberProfile {
  id: number;
  name: string;
  character: string;
  rank: string;
  winRate: number;
  matchHistory?: string;
  preferredPosition?: 'starter' | 'middle' | 'anchor' | undefined;
  avatar?: string;
  characterAvatar?: string;
  strengthScore: number;
  notes?: string;
  style?: string;
  skills: {
    offense: number;
    defense: number;
    adaptation: number;
    execution: number;
    footsies: number;
  };
}

export interface TeamProfile {
  id: number;
  name: string;
  members: TeamMemberProfile[];
  strengths: string[];
  weaknesses: string[];
  overallSkill: number;
}

export interface MatchupAnalysis {
  player1: TeamMemberProfile;
  player2: TeamMemberProfile;
  advantagePercent: number; // Positive for player1 advantage, negative for player2
  notes: string[];
}

export interface TeamBattlePrediction {
  predictedWinner: TeamProfile;
  matchups: MatchupAnalysis[];
  recommendedOrder: TeamMemberProfile[];
  notes: string[];
}

// Constants
const SF6_CHARACTERS = [
  "Ryu", "Ken", "Chun-Li", "Guile", "Zangief", "Dhalsim", "E. Honda", 
  "Blanka", "Cammy", "Luke", "Kimberly", "Juri", "Jamie", "Manon", 
  "Marisa", "JP", "Dee Jay", "Lily", "A.K.I.", "Rashid", "Ed"
];

const SF6_RANKS = [
  "Rookie", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"
];

// Character avatar URLs for common SF6 characters
const characterAvatarUrls: Record<string, string> = {
  "Ryu": "https://www.streetfighter.com/6/assets/images/character/ryu/ver01/face.png",
  "Ken": "https://www.streetfighter.com/6/assets/images/character/ken/ver01/face.png",
  "Chun-Li": "https://www.streetfighter.com/6/assets/images/character/chunli/ver01/face.png",
  "Guile": "https://www.streetfighter.com/6/assets/images/character/guile/ver01/face.png",
  "Zangief": "https://www.streetfighter.com/6/assets/images/character/zangief/ver01/face.png",
  "Dhalsim": "https://www.streetfighter.com/6/assets/images/character/dhalsim/ver01/face.png",
  "E. Honda": "https://www.streetfighter.com/6/assets/images/character/honda/ver01/face.png",
  "Blanka": "https://www.streetfighter.com/6/assets/images/character/blanka/ver01/face.png",
  "Cammy": "https://www.streetfighter.com/6/assets/images/character/cammy/ver01/face.png",
  "Luke": "https://www.streetfighter.com/6/assets/images/character/luke/ver01/face.png",
  "Kimberly": "https://www.streetfighter.com/6/assets/images/character/kimberly/ver01/face.png",
  "Juri": "https://www.streetfighter.com/6/assets/images/character/juri/ver01/face.png",
  "Jamie": "https://www.streetfighter.com/6/assets/images/character/jamie/ver01/face.png",
  "Manon": "https://www.streetfighter.com/6/assets/images/character/manon/ver01/face.png",
  "Marisa": "https://www.streetfighter.com/6/assets/images/character/marisa/ver01/face.png",
  "JP": "https://www.streetfighter.com/6/assets/images/character/jp/ver01/face.png",
  "Dee Jay": "https://www.streetfighter.com/6/assets/images/character/deejay/ver01/face.png",
  "Lily": "https://www.streetfighter.com/6/assets/images/character/lily/ver01/face.png",
  "A.K.I.": "https://www.streetfighter.com/6/assets/images/character/aki/ver01/face.png",
  "Rashid": "https://www.streetfighter.com/6/assets/images/character/rashid/ver01/face.png",
  "Ed": "https://www.streetfighter.com/6/assets/images/character/ed/ver01/face.png"
};

// Sample team members for preloaded analysis
const sampleBlueTeamMembers: TeamMemberProfile[] = [
  {
    id: 101,
    name: "Alex Wang",
    character: "Ryu",
    rank: "Diamond",
    winRate: 68,
    preferredPosition: "starter",
    characterAvatar: characterAvatarUrls["Ryu"],
    strengthScore: 82,
    notes: "Team captain with exceptional fundamentals",
    style: "All-Rounder",
    skills: {
      offense: 75,
      defense: 85,
      adaptation: 80,
      execution: 78,
      footsies: 90
    }
  },
  {
    id: 102,
    name: "Jessica Lee",
    character: "Cammy",
    rank: "Platinum",
    winRate: 72,
    preferredPosition: "middle",
    characterAvatar: characterAvatarUrls["Cammy"],
    strengthScore: 79,
    notes: "Aggressive player with excellent pressure",
    style: "Rushdown",
    skills: {
      offense: 90,
      defense: 65,
      adaptation: 75,
      execution: 85,
      footsies: 75
    }
  },
  {
    id: 103,
    name: "Marcus Johnson",
    character: "Guile",
    rank: "Master",
    winRate: 65,
    preferredPosition: "anchor",
    characterAvatar: characterAvatarUrls["Guile"],
    strengthScore: 84,
    notes: "Defensive specialist, excellent at comebacks",
    style: "Zoner",
    skills: {
      offense: 70,
      defense: 95,
      adaptation: 85,
      execution: 80,
      footsies: 85
    }
  }
];

const sampleRedTeamMembers: TeamMemberProfile[] = [
  {
    id: 201,
    name: "Kai Rodriguez",
    character: "Ken",
    rank: "Master",
    winRate: 70,
    preferredPosition: "starter",
    characterAvatar: characterAvatarUrls["Ken"],
    strengthScore: 86,
    notes: "Aggressive player known for quick combos",
    style: "All-Rounder",
    skills: {
      offense: 92,
      defense: 70,
      adaptation: 82,
      execution: 88,
      footsies: 80
    }
  },
  {
    id: 202,
    name: "Naomi Chen",
    character: "Dhalsim",
    rank: "Diamond",
    winRate: 64,
    preferredPosition: "middle",
    characterAvatar: characterAvatarUrls["Dhalsim"],
    strengthScore: 78,
    notes: "Zoning specialist with precise spacing",
    style: "Zoner",
    skills: {
      offense: 65,
      defense: 75,
      adaptation: 85,
      execution: 80,
      footsies: 92
    }
  },
  {
    id: 203,
    name: "Tyrone Jackson",
    character: "Zangief",
    rank: "Platinum",
    winRate: 62,
    preferredPosition: "anchor",
    characterAvatar: characterAvatarUrls["Zangief"],
    strengthScore: 80,
    notes: "Grappler with clutch comeback potential",
    style: "Grappler",
    skills: {
      offense: 85,
      defense: 75,
      adaptation: 70,
      execution: 75,
      footsies: 65
    }
  }
];

// Initial data for the teams
const initialBlueTeam: TeamProfile = {
  id: 1,
  name: "Dynasty FGC",
  members: sampleBlueTeamMembers,
  strengths: ["Balanced Team Composition", "Strong Fundamentals", "Adaptable Play Styles"],
  weaknesses: ["Inconsistent Performance Against Grapplers"],
  overallSkill: 82
};

const initialRedTeam: TeamProfile = {
  id: 2,
  name: "Cobra Kai FGC",
  members: sampleRedTeamMembers,
  strengths: ["Aggressive Offense", "Diverse Character Selection", "Strong Tournament Results"],
  weaknesses: ["Occasional Defensive Lapses", "Risk-Taking Under Pressure"],
  overallSkill: 81
};

// Helper functions for character archetypes and traits
const getCharacterArchetype = (character: string): string => {
  switch(character) {
    case "Ryu":
    case "Ken":
    case "Luke":
      return "All-Rounder";
    case "Chun-Li":
    case "Cammy":
    case "Kimberly":
    case "Juri":
      return "Rushdown";
    case "Guile":
    case "Dhalsim":
    case "JP":
      return "Zoner";
    case "Zangief":
    case "E. Honda":
    case "Marisa":
      return "Grappler";
    case "Blanka":
    case "Rashid":
    case "Jamie":
      return "Mixed/Tricky";
    case "Manon":
    case "Lily":
    case "A.K.I.":
    case "Dee Jay":
    case "Ed":
      return "Balanced";
    default:
      return "Unknown";
  }
};

const getCharacterStrengths = (character: string): string[] => {
  switch(character) {
    case "Ryu": 
      return ["Solid Fundamentals", "Good Anti-Airs", "Simple Execution"];
    case "Ken": 
      return ["High Damage Output", "Aggressive Rushdown", "Good Mix-Ups"];
    case "Chun-Li": 
      return ["Fast Normals", "Strong Pokes", "Good Pressure"];
    case "Guile": 
      return ["Strong Defensive Play", "Powerful Projectiles", "Space Control"];
    case "Zangief": 
      return ["Command Grabs", "High Damage", "Great Up Close"];
    case "Dhalsim": 
      return ["Long Range", "Space Control", "Teleport Mix-Ups"];
    case "Cammy": 
      return ["Fast Movement", "Good Pressure", "Dive Kick Mix-Ups"];
    case "Luke": 
      return ["Projectiles", "Forward Moving Specials", "Good Frame Data"];
    default: 
      return ["Unknown Character Strengths"];
  }
};

const getCharacterWeaknesses = (character: string): string[] => {
  switch(character) {
    case "Ryu": 
      return ["Limited Mix-Up", "Average Movement", "Predictable Approach"];
    case "Ken": 
      return ["Risky Offense", "Punishable Specials", "Requires Good Execution"];
    case "Chun-Li": 
      return ["Complex Execution", "Requires Good Reactions", "Technical Combos"];
    case "Guile": 
      return ["Charge Character", "Weak to Pressure", "Limited Anti-Air Options"];
    case "Zangief": 
      return ["Slow Movement", "Weak at Range", "Susceptible to Zoning"];
    case "Dhalsim": 
      return ["Low Health", "Weak Up Close", "Technical Gameplay"];
    case "Cammy": 
      return ["Low Health", "Limited Range", "Requires Good Execution"];
    case "Luke": 
      return ["Charge-based Moves", "Limited Defensive Options", "Predictable Attack Patterns"];
    default: 
      return ["Unknown Character Weaknesses"];
  }
};

// The main TeamBattleScout component
const TeamBattleScout: React.FC = () => {
  const [blueTeam, setBlueTeam] = useState<TeamProfile>(initialBlueTeam);
  const [redTeam, setRedTeam] = useState<TeamProfile>(initialRedTeam);
  const [activeTab, setActiveTab] = useState("teamBuilder");
  const [currentEditingTeam, setCurrentEditingTeam] = useState<'blue' | 'red'>('blue');
  const [newMember, setNewMember] = useState<Partial<TeamMemberProfile>>({
    name: "",
    character: "",
    rank: "",
    winRate: 50,
    preferredPosition: undefined,
    skills: {
      offense: 50,
      defense: 50,
      adaptation: 50,
      execution: 50,
      footsies: 50
    }
  });
  const [teamPrediction, setTeamPrediction] = useState<TeamBattlePrediction | null>(null);
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  
  // Add a new member to a team
  const addTeamMember = (teamId: number) => {
    if (!newMember.name || !newMember.character || !newMember.rank) {
      // Basic validation
      alert("Please fill in all required fields");
      return;
    }
    
    const characterAvatar = characterAvatarUrls[newMember.character || ""] || "";
    
    const strengthScore = calculateStrengthScore(newMember.skills!);
    
    const memberToAdd: TeamMemberProfile = {
      id: Date.now(),
      name: newMember.name || "",
      character: newMember.character || "",
      rank: newMember.rank || "",
      winRate: newMember.winRate || 50,
      preferredPosition: newMember.preferredPosition,
      characterAvatar,
      strengthScore,
      notes: newMember.notes || "",
      style: getCharacterArchetype(newMember.character || ""),
      skills: newMember.skills as TeamMemberProfile["skills"]
    };
    
    if (teamId === blueTeam.id) {
      setBlueTeam({
        ...blueTeam,
        members: [...blueTeam.members, memberToAdd]
      });
    } else {
      setRedTeam({
        ...redTeam,
        members: [...redTeam.members, memberToAdd]
      });
    }
    
    // Reset form
    setNewMember({
      name: "",
      character: "",
      rank: "",
      winRate: 50,
      preferredPosition: undefined,
      skills: {
        offense: 50,
        defense: 50,
        adaptation: 50,
        execution: 50,
        footsies: 50
      }
    });
    
    setShowAddMemberForm(false);
  };
  
  // Remove a member from a team
  const removeTeamMember = (teamId: number, memberId: number) => {
    if (teamId === blueTeam.id) {
      setBlueTeam({
        ...blueTeam,
        members: blueTeam.members.filter(member => member.id !== memberId)
      });
    } else {
      setRedTeam({
        ...redTeam,
        members: redTeam.members.filter(member => member.id !== memberId)
      });
    }
  };
  
  // Update team analysis
  const analyzeTeams = () => {
    if (blueTeam.members.length === 0 || redTeam.members.length === 0) {
      alert("Please add members to both teams");
      return;
    }
    
    setAnalysisInProgress(true);
    
    // In a real app, this would make API calls and run complex analysis
    // For the demo, we'll simulate a brief delay and generate mock data
    setTimeout(() => {
      // Run analysis functions
      const blueTeamWithAnalysis = analyzeTeam(blueTeam);
      const redTeamWithAnalysis = analyzeTeam(redTeam);
      
      setBlueTeam(blueTeamWithAnalysis);
      setRedTeam(redTeamWithAnalysis);
      
      // Generate matchup predictions
      const prediction = predictTeamBattle(blueTeamWithAnalysis, redTeamWithAnalysis);
      setTeamPrediction(prediction);
      
      setAnalysisInProgress(false);
      setActiveTab("matchupAnalysis");
    }, 1500);
  };
  
  // Calculate a member's strength score based on skills
  const calculateStrengthScore = (skills: TeamMemberProfile["skills"]): number => {
    const { offense, defense, adaptation, execution, footsies } = skills;
    // Weighted average
    return Math.round((offense * 0.25 + defense * 0.2 + adaptation * 0.2 + execution * 0.15 + footsies * 0.2));
  };
  
  // Analyze a team's overall strengths and weaknesses
  const analyzeTeam = (team: TeamProfile): TeamProfile => {
    // Calculate team's overall skill level
    const overallSkill = team.members.reduce((acc, member) => acc + member.strengthScore, 0) / 
                          (team.members.length || 1);
    
    // Determine team composition type
    const archetypes = team.members.map(member => getCharacterArchetype(member.character));
    
    // Count archetype frequency
    const archetypeCounts: Record<string, number> = {};
    archetypes.forEach(archetype => {
      archetypeCounts[archetype] = (archetypeCounts[archetype] || 0) + 1;
    });
    
    // Identify team strengths
    const strengths: string[] = [];
    
    // High overall skill is a strength
    if (overallSkill > 70) {
      strengths.push("High Overall Skill Level");
    }
    
    // High win rates
    const avgWinRate = team.members.reduce((acc, member) => acc + member.winRate, 0) / 
                        (team.members.length || 1);
    if (avgWinRate > 65) {
      strengths.push("Strong Win Record");
    }
    
    // Balanced team composition
    const uniqueArchetypes = new Set(archetypes).size;
    if (uniqueArchetypes >= 3 && team.members.length >= 3) {
      strengths.push("Diverse Character Selection");
    }
    
    // Specialized team composition
    Object.entries(archetypeCounts).forEach(([archetype, count]) => {
      if (count >= 3 && team.members.length >= 4) {
        strengths.push(`${archetype} Specialist Team`);
      }
    });
    
    // Average skill analysis
    const avgOffense = team.members.reduce((acc, member) => acc + member.skills.offense, 0) / 
                        (team.members.length || 1);
    const avgDefense = team.members.reduce((acc, member) => acc + member.skills.defense, 0) / 
                        (team.members.length || 1);
    
    if (avgOffense > 70) {
      strengths.push("Strong Offensive Capability");
    }
    if (avgDefense > 70) {
      strengths.push("Solid Defensive Skills");
    }
    
    // Identify team weaknesses
    const weaknesses: string[] = [];
    
    // Low overall skill is a weakness
    if (overallSkill < 40) {
      weaknesses.push("Low Overall Skill Level");
    }
    
    // Low win rates
    if (avgWinRate < 40) {
      weaknesses.push("Poor Win Record");
    }
    
    // Limited team composition
    if (uniqueArchetypes <= 1 && team.members.length >= 3) {
      weaknesses.push("Limited Character Diversity");
    }
    
    // Skill gaps
    if (avgOffense < 40) {
      weaknesses.push("Weak Offensive Capability");
    }
    if (avgDefense < 40) {
      weaknesses.push("Poor Defensive Skills");
    }
    
    // Return updated team
    return {
      ...team,
      strengths: strengths.length > 0 ? strengths : ["No specific strengths identified"],
      weaknesses: weaknesses.length > 0 ? weaknesses : ["No specific weaknesses identified"],
      overallSkill: Math.round(overallSkill)
    };
  };
  
  // Generate matchup predictions between teams
  const predictTeamBattle = (team1: TeamProfile, team2: TeamProfile): TeamBattlePrediction => {
    // Store matchup analysis
    const matchups: MatchupAnalysis[] = [];
    
    // We'll analyze each potential matchup
    team1.members.forEach(member1 => {
      team2.members.forEach(member2 => {
        // Calculate matchup advantage based on skills and character matchups
        const skillAdvantage = member1.strengthScore - member2.strengthScore;
        
        // Simple character matchup factors (in a real app would use a proper matchup chart)
        let characterFactor = 0;
        
        // Grapplers vs Zoners: disadvantage for grapplers
        if (getCharacterArchetype(member1.character) === "Grappler" && 
            getCharacterArchetype(member2.character) === "Zoner") {
          characterFactor = -10;
        }
        
        // Rushdown vs Grapplers: advantage for rushdown
        if (getCharacterArchetype(member1.character) === "Rushdown" && 
            getCharacterArchetype(member2.character) === "Grappler") {
          characterFactor = 10;
        }
        
        // Calculate total advantage as percentage
        const totalAdvantage = Math.max(Math.min((skillAdvantage + characterFactor) / 2, 30), -30);
        
        // Generate notes about the matchup
        const notes: string[] = [];
        
        if (Math.abs(totalAdvantage) < 5) {
          notes.push("Even matchup - could go either way");
        } else if (totalAdvantage > 0) {
          notes.push(`${member1.name} has advantage due to ${totalAdvantage > 15 ? 'significantly' : 'slightly'} better overall skill`);
          
          if (member1.skills.offense > member2.skills.defense + 20) {
            notes.push(`${member1.name}'s offensive pressure likely to overwhelm ${member2.name}'s defense`);
          }
          
          if (characterFactor !== 0) {
            notes.push(`${member1.character} has favorable matchup against ${member2.character}`);
          }
        } else {
          notes.push(`${member2.name} has advantage due to ${Math.abs(totalAdvantage) > 15 ? 'significantly' : 'slightly'} better overall skill`);
          
          if (member2.skills.offense > member1.skills.defense + 20) {
            notes.push(`${member2.name}'s offensive pressure likely to overwhelm ${member1.name}'s defense`);
          }
          
          if (characterFactor !== 0) {
            notes.push(`${member2.character} has favorable matchup against ${member1.character}`);
          }
        }
        
        // Add to matchups array
        matchups.push({
          player1: member1,
          player2: member2,
          advantagePercent: totalAdvantage,
          notes
        });
      });
    });
    
    // Determine optimal order for team 1 based on matchups
    const recommendedOrder = [...team1.members].sort((a, b) => {
      // Prefer members with preferred starting position
      if (a.preferredPosition === 'starter' && b.preferredPosition !== 'starter') return -1;
      if (b.preferredPosition === 'starter' && a.preferredPosition !== 'starter') return 1;
      
      // Prefer members with highest average advantage
      const aAvgAdvantage = matchups
        .filter(m => m.player1.id === a.id)
        .reduce((sum, m) => sum + m.advantagePercent, 0) / 
        matchups.filter(m => m.player1.id === a.id).length;
        
      const bAvgAdvantage = matchups
        .filter(m => m.player1.id === b.id)
        .reduce((sum, m) => sum + m.advantagePercent, 0) / 
        matchups.filter(m => m.player1.id === b.id).length;
        
      return bAvgAdvantage - aAvgAdvantage;
    });
    
    // Determine which team has overall advantage
    const team1AvgAdvantage = matchups.reduce((sum, m) => sum + m.advantagePercent, 0) / matchups.length;
    const predictedWinner = team1AvgAdvantage > 0 ? team1 : team2;
    
    // Generate overall prediction notes
    const notes: string[] = [];
    
    if (Math.abs(team1AvgAdvantage) < 5) {
      notes.push("Teams are evenly matched - outcome depends on specific player matchups");
    } else if (team1AvgAdvantage > 0) {
      notes.push(`${team1.name} has a ${Math.round(Math.abs(team1AvgAdvantage))}% overall advantage`);
    } else {
      notes.push(`${team2.name} has a ${Math.round(Math.abs(team1AvgAdvantage))}% overall advantage`);
    }
    
    // Add notes about team strengths/weaknesses
    if (team1.strengths.length > 0 && team1.strengths[0] !== "No specific strengths identified") {
      notes.push(`${team1.name} key strength: ${team1.strengths[0]}`);
    }
    
    if (team2.strengths.length > 0 && team2.strengths[0] !== "No specific strengths identified") {
      notes.push(`${team2.name} key strength: ${team2.strengths[0]}`);
    }
    
    return {
      predictedWinner,
      matchups,
      recommendedOrder,
      notes
    };
  };
  
  // Get a color based on a numerical value (0-100)
  const getValueColor = (value: number): string => {
    if (value >= 70) return "text-green-400";
    if (value >= 50) return "text-blue-400";
    if (value >= 30) return "text-yellow-400";
    return "text-red-400";
  };
  
  // Get advantage indicator color
  const getAdvantageColor = (advantage: number): string => {
    if (advantage > 15) return "text-green-400";
    if (advantage > 5) return "text-green-300";
    if (advantage > -5) return "text-gray-400";
    if (advantage > -15) return "text-red-300";
    return "text-red-400";
  };
  
  // Get advantage indicator text
  const getAdvantageText = (advantage: number): string => {
    if (advantage > 15) return "Strong Advantage";
    if (advantage > 5) return "Slight Advantage";
    if (advantage > -5) return "Even Matchup";
    if (advantage > -15) return "Slight Disadvantage";
    return "Strong Disadvantage";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Team Battle Scout
          </h2>
          <p className="text-gray-400 text-sm">
            Analyze 5v5 team compositions, matchups, and optimal strategy
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="teamBuilder">
            <UsersIcon className="h-4 w-4 mr-2" />
            Team Builder
          </TabsTrigger>
          <TabsTrigger value="teamAnalysis">
            <GaugeIcon className="h-4 w-4 mr-2" />
            Team Analysis
          </TabsTrigger>
          <TabsTrigger value="matchupAnalysis">
            <ArrowRightLeftIcon className="h-4 w-4 mr-2" />
            Matchup Analysis
          </TabsTrigger>
        </TabsList>
        
        {/* Team Builder Tab */}
        <TabsContent value="teamBuilder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Blue Team */}
            <Card className="border-blue-600/30 bg-surface/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-blue-400">
                  <UsersIcon className="h-5 w-5" />
                  Blue Team
                </CardTitle>
                <CardDescription>
                  {blueTeam.members.length}/5 team members added
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {blueTeam.members.length > 0 ? (
                  blueTeam.members.map(member => (
                    <div 
                      key={member.id}
                      className="p-3 rounded-md bg-blue-950/30 border border-blue-900/50"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-blue-500/50">
                            <AvatarImage src={member.characterAvatar} alt={member.character} />
                            <AvatarFallback>{member.character.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <div className="flex items-center">
                              <Badge className="bg-blue-900/50 text-xs mr-2">
                                {member.character}
                              </Badge>
                              <span className="text-xs text-gray-400">{member.rank}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeTeamMember(blueTeam.id, member.id)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="mt-2 grid grid-cols-5 gap-1">
                        <div className="text-center">
                          <p className="text-xs text-gray-400">OFF</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.offense)}`}>
                            {member.skills.offense}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">DEF</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.defense)}`}>
                            {member.skills.defense}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">ADP</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.adaptation)}`}>
                            {member.skills.adaptation}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">EXE</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.execution)}`}>
                            {member.skills.execution}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">FTS</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.footsies)}`}>
                            {member.skills.footsies}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 border border-dashed border-gray-700 rounded-md">
                    <p className="text-gray-500">No team members added yet</p>
                  </div>
                )}
                
                {blueTeam.members.length < 5 && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      setCurrentEditingTeam('blue');
                      setShowAddMemberForm(true);
                    }}
                  >
                    Add Team Member
                  </Button>
                )}
              </CardContent>
            </Card>
            
            {/* Red Team */}
            <Card className="border-red-600/30 bg-surface/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-400">
                  <UsersIcon className="h-5 w-5" />
                  Red Team
                </CardTitle>
                <CardDescription>
                  {redTeam.members.length}/5 team members added
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {redTeam.members.length > 0 ? (
                  redTeam.members.map(member => (
                    <div 
                      key={member.id}
                      className="p-3 rounded-md bg-red-950/30 border border-red-900/50"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-red-500/50">
                            <AvatarImage src={member.characterAvatar} alt={member.character} />
                            <AvatarFallback>{member.character.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <div className="flex items-center">
                              <Badge className="bg-red-900/50 text-xs mr-2">
                                {member.character}
                              </Badge>
                              <span className="text-xs text-gray-400">{member.rank}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeTeamMember(redTeam.id, member.id)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="mt-2 grid grid-cols-5 gap-1">
                        <div className="text-center">
                          <p className="text-xs text-gray-400">OFF</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.offense)}`}>
                            {member.skills.offense}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">DEF</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.defense)}`}>
                            {member.skills.defense}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">ADP</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.adaptation)}`}>
                            {member.skills.adaptation}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">EXE</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.execution)}`}>
                            {member.skills.execution}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">FTS</p>
                          <p className={`text-sm font-medium ${getValueColor(member.skills.footsies)}`}>
                            {member.skills.footsies}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 border border-dashed border-gray-700 rounded-md">
                    <p className="text-gray-500">No team members added yet</p>
                  </div>
                )}
                
                {redTeam.members.length < 5 && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      setCurrentEditingTeam('red');
                      setShowAddMemberForm(true);
                    }}
                  >
                    Add Team Member
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Add Member Form Modal */}
          {showAddMemberForm && (
            <Card className={`border-${currentEditingTeam === 'blue' ? 'blue' : 'red'}-600/30 bg-surface/80`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UsersIcon className="h-5 w-5" />
                  Add New Team Member
                </CardTitle>
                <CardDescription>
                  Fill in the details below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Player Name</label>
                      <Input 
                        value={newMember.name}
                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                        placeholder="Enter player name"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Character</label>
                      <Select 
                        value={newMember.character}
                        onValueChange={(value) => setNewMember({...newMember, character: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a character" />
                        </SelectTrigger>
                        <SelectContent>
                          {SF6_CHARACTERS.map(character => (
                            <SelectItem key={character} value={character}>
                              {character}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Rank</label>
                      <Select 
                        value={newMember.rank}
                        onValueChange={(value) => setNewMember({...newMember, rank: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select player rank" />
                        </SelectTrigger>
                        <SelectContent>
                          {SF6_RANKS.map(rank => (
                            <SelectItem key={rank} value={rank}>
                              {rank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Win Rate</label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          value={[newMember.winRate || 50]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setNewMember({...newMember, winRate: value[0]})}
                          className="flex-1"
                        />
                        <span className="text-sm">{newMember.winRate || 50}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Preferred Position</label>
                      <Select 
                        value={newMember.preferredPosition}
                        onValueChange={(value: any) => setNewMember({...newMember, preferredPosition: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="starter">Starter</SelectItem>
                          <SelectItem value="middle">Middle</SelectItem>
                          <SelectItem value="anchor">Anchor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Skill Ratings</h4>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Offense</span>
                        <span className={getValueColor(newMember.skills?.offense || 50)}>
                          {newMember.skills?.offense || 50}
                        </span>
                      </div>
                      <Slider 
                        value={[newMember.skills?.offense || 50]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setNewMember({
                          ...newMember, 
                          skills: {
                            offense: value[0],
                            defense: newMember.skills?.defense || 50,
                            adaptation: newMember.skills?.adaptation || 50,
                            execution: newMember.skills?.execution || 50,
                            footsies: newMember.skills?.footsies || 50
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Defense</span>
                        <span className={getValueColor(newMember.skills?.defense || 50)}>
                          {newMember.skills?.defense || 50}
                        </span>
                      </div>
                      <Slider 
                        value={[newMember.skills?.defense || 50]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setNewMember({
                          ...newMember, 
                          skills: {
                            offense: newMember.skills?.offense || 50,
                            defense: value[0],
                            adaptation: newMember.skills?.adaptation || 50,
                            execution: newMember.skills?.execution || 50,
                            footsies: newMember.skills?.footsies || 50
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Adaptation</span>
                        <span className={getValueColor(newMember.skills?.adaptation || 50)}>
                          {newMember.skills?.adaptation || 50}
                        </span>
                      </div>
                      <Slider 
                        value={[newMember.skills?.adaptation || 50]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setNewMember({
                          ...newMember, 
                          skills: {
                            offense: newMember.skills?.offense || 50,
                            defense: newMember.skills?.defense || 50,
                            adaptation: value[0],
                            execution: newMember.skills?.execution || 50,
                            footsies: newMember.skills?.footsies || 50
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Execution</span>
                        <span className={getValueColor(newMember.skills?.execution || 50)}>
                          {newMember.skills?.execution || 50}
                        </span>
                      </div>
                      <Slider 
                        value={[newMember.skills?.execution || 50]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setNewMember({
                          ...newMember, 
                          skills: {
                            offense: newMember.skills?.offense || 50,
                            defense: newMember.skills?.defense || 50,
                            adaptation: newMember.skills?.adaptation || 50,
                            execution: value[0],
                            footsies: newMember.skills?.footsies || 50
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Footsies</span>
                        <span className={getValueColor(newMember.skills?.footsies || 50)}>
                          {newMember.skills?.footsies || 50}
                        </span>
                      </div>
                      <Slider 
                        value={[newMember.skills?.footsies || 50]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setNewMember({
                          ...newMember, 
                          skills: {
                            offense: newMember.skills?.offense || 50,
                            defense: newMember.skills?.defense || 50,
                            adaptation: newMember.skills?.adaptation || 50,
                            execution: newMember.skills?.execution || 50,
                            footsies: value[0]
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setShowAddMemberForm(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => addTeamMember(currentEditingTeam === 'blue' ? blueTeam.id : redTeam.id)}
                >
                  Add to Team
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Analysis Button */}
          <div className="flex justify-center mt-4">
            <Button 
              size="lg" 
              className="px-10"
              disabled={analysisInProgress || blueTeam.members.length === 0 || redTeam.members.length === 0}
              onClick={analyzeTeams}
            >
              {analysisInProgress ? (
                <>Analyzing Teams...</>
              ) : (
                <>
                  <SearchIcon className="h-5 w-5 mr-2" />
                  Analyze Teams
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        {/* Team Analysis Tab */}
        <TabsContent value="teamAnalysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Blue Team Analysis */}
            <Card className="border-blue-600/30 bg-surface/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-blue-400">
                  <GaugeIcon className="h-5 w-5" />
                  Blue Team Analysis
                </CardTitle>
                <CardDescription>
                  {blueTeam.members.length} members | Overall Skill: {blueTeam.overallSkill}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {blueTeam.members.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <SwordIcon className="h-4 w-4 text-green-500" />
                        Team Strengths
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {blueTeam.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-gray-300">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <ShieldIcon className="h-4 w-4 text-red-500" />
                        Team Weaknesses
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {blueTeam.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-gray-300">
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <ActivityIcon className="h-4 w-4 text-blue-500" />
                        Team Composition
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {blueTeam.members.map(member => (
                          <div 
                            key={member.id}
                            className="p-2 rounded-md bg-blue-950/30 border border-blue-900/50"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 border border-blue-500/50">
                                <AvatarImage src={member.characterAvatar} alt={member.character} />
                                <AvatarFallback>{member.character.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{member.name}</p>
                                <div className="flex items-center">
                                  <Badge className="bg-blue-900/50 text-xs mr-1">
                                    {member.style}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 border border-dashed border-gray-700 rounded-md">
                    <p className="text-gray-500">Add team members and analyze to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Red Team Analysis */}
            <Card className="border-red-600/30 bg-surface/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-400">
                  <GaugeIcon className="h-5 w-5" />
                  Red Team Analysis
                </CardTitle>
                <CardDescription>
                  {redTeam.members.length} members | Overall Skill: {redTeam.overallSkill}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {redTeam.members.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <SwordIcon className="h-4 w-4 text-green-500" />
                        Team Strengths
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {redTeam.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-gray-300">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <ShieldIcon className="h-4 w-4 text-red-500" />
                        Team Weaknesses
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {redTeam.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-gray-300">
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <ActivityIcon className="h-4 w-4 text-red-500" />
                        Team Composition
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {redTeam.members.map(member => (
                          <div 
                            key={member.id}
                            className="p-2 rounded-md bg-red-950/30 border border-red-900/50"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 border border-red-500/50">
                                <AvatarImage src={member.characterAvatar} alt={member.character} />
                                <AvatarFallback>{member.character.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{member.name}</p>
                                <div className="flex items-center">
                                  <Badge className="bg-red-900/50 text-xs mr-1">
                                    {member.style}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 border border-dashed border-gray-700 rounded-md">
                    <p className="text-gray-500">Add team members and analyze to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Team Comparison */}
          <Card className="bg-surface/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainIcon className="h-5 w-5 text-primary" />
                Team Comparison
              </CardTitle>
              <CardDescription>
                Side-by-side analysis of both teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              {blueTeam.members.length > 0 && redTeam.members.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="text-md font-medium">Team Skill Comparison</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Overall Skill</span>
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400">{blueTeam.overallSkill}</span>
                          <span className="text-gray-600">vs</span>
                          <span className="text-red-400">{redTeam.overallSkill}</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-red-500"
                          style={{ 
                            backgroundSize: '200% 100%',
                            backgroundPosition: `${(blueTeam.overallSkill / (blueTeam.overallSkill + redTeam.overallSkill)) * 100}% 0`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Team Size</span>
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400">{blueTeam.members.length}</span>
                          <span className="text-gray-600">vs</span>
                          <span className="text-red-400">{redTeam.members.length}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Avg Win Rate</span>
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400">
                            {Math.round(blueTeam.members.reduce((acc, m) => acc + m.winRate, 0) / blueTeam.members.length)}%
                          </span>
                          <span className="text-gray-600">vs</span>
                          <span className="text-red-400">
                            {Math.round(redTeam.members.reduce((acc, m) => acc + m.winRate, 0) / redTeam.members.length)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <h4 className="text-md font-medium">Character Composition</h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm font-medium text-blue-400 mb-2">Blue Team</h5>
                        <div className="space-y-1">
                          {Object.entries(
                            blueTeam.members.reduce((acc: Record<string, number>, member) => {
                              const archetype = getCharacterArchetype(member.character);
                              acc[archetype] = (acc[archetype] || 0) + 1;
                              return acc;
                            }, {})
                          ).map(([archetype, count]) => (
                            <div key={archetype} className="flex justify-between items-center">
                              <span className="text-sm">{archetype}</span>
                              <span className="text-sm text-gray-400">{count}x</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-red-400 mb-2">Red Team</h5>
                        <div className="space-y-1">
                          {Object.entries(
                            redTeam.members.reduce((acc: Record<string, number>, member) => {
                              const archetype = getCharacterArchetype(member.character);
                              acc[archetype] = (acc[archetype] || 0) + 1;
                              return acc;
                            }, {})
                          ).map(([archetype, count]) => (
                            <div key={archetype} className="flex justify-between items-center">
                              <span className="text-sm">{archetype}</span>
                              <span className="text-sm text-gray-400">{count}x</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed border-gray-700 rounded-md">
                  <p className="text-gray-500">Add team members to both teams and analyze to see comparison</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Matchup Analysis Tab */}
        <TabsContent value="matchupAnalysis" className="space-y-6">
          {teamPrediction ? (
            <>
              {/* Overall Prediction */}
              <Card className="bg-gradient-to-r from-blue-950/50 to-red-950/50 border-none">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrophyIcon className="h-5 w-5 text-yellow-400" />
                    Battle Prediction
                  </CardTitle>
                  <CardDescription>
                    Overall team matchup analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-black/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-blue-400 font-medium">
                        Blue Team
                      </div>
                      <div className="text-lg font-bold">
                        VS
                      </div>
                      <div className="text-red-400 font-medium">
                        Red Team
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-center mb-2">Predicted Outcome</h4>
                      <div className="text-center">
                        <Badge className={`text-md px-4 py-1 ${
                          teamPrediction.predictedWinner.id === blueTeam.id ? 
                            'bg-blue-600' : 'bg-red-600'
                        }`}>
                          {teamPrediction.predictedWinner.id === blueTeam.id ? 'Blue Team Advantage' : 'Red Team Advantage'}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <h5 className="text-sm font-medium">Analysis Notes</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {teamPrediction.notes.map((note, idx) => (
                            <li key={idx} className="text-sm text-gray-300">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recommended Play Order */}
              <Card className="bg-surface/60 border-blue-600/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-400">
                    <BoltIcon className="h-5 w-5" />
                    Recommended Blue Team Order
                  </CardTitle>
                  <CardDescription>
                    Optimal player order to maximize advantage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamPrediction.recommendedOrder.map((member, idx) => (
                      <div 
                        key={member.id}
                        className="p-3 rounded-md bg-blue-950/30 border border-blue-900/50 flex items-center"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-900/50 rounded-full mr-3">
                          {idx + 1}
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-blue-500/50">
                            <AvatarImage src={member.characterAvatar} alt={member.character} />
                            <AvatarFallback>{member.character.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <div className="flex items-center">
                              <Badge className="bg-blue-900/50 text-xs mr-2">
                                {member.character}
                              </Badge>
                              <span className="text-xs text-gray-400">{member.rank}</span>
                            </div>
                          </div>
                        </div>
                        {member.preferredPosition && (
                          <Badge 
                            className="ml-auto"
                            variant="outline"
                          >
                            {member.preferredPosition}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Individual Matchups */}
              <Card className="bg-surface/60">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowRightLeftIcon className="h-5 w-5 text-primary" />
                    Individual Matchup Analysis
                  </CardTitle>
                  <CardDescription>
                    Player vs player potential matchups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamPrediction.matchups
                        .sort((a, b) => Math.abs(b.advantagePercent) - Math.abs(a.advantagePercent))
                        .slice(0, 6)
                        .map((matchup, idx) => (
                          <div 
                            key={idx}
                            className="p-3 rounded-md bg-background/30 border border-gray-800"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 border border-blue-500/50">
                                  <AvatarImage src={matchup.player1.characterAvatar} alt={matchup.player1.character} />
                                  <AvatarFallback>{matchup.player1.character.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-2">
                                  <p className="text-sm font-medium">{matchup.player1.name}</p>
                                  <p className="text-xs text-gray-400">{matchup.player1.character}</p>
                                </div>
                              </div>
                              
                              <div className="mx-2 text-gray-500">vs</div>
                              
                              <div className="flex items-center">
                                <div className="mr-2 text-right">
                                  <p className="text-sm font-medium">{matchup.player2.name}</p>
                                  <p className="text-xs text-gray-400">{matchup.player2.character}</p>
                                </div>
                                <Avatar className="h-8 w-8 border border-red-500/50">
                                  <AvatarImage src={matchup.player2.characterAvatar} alt={matchup.player2.character} />
                                  <AvatarFallback>{matchup.player2.character.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2 mb-1">
                              <div className={`text-xs font-medium ${
                                matchup.advantagePercent > 0 ? "text-blue-400" : 
                                matchup.advantagePercent < 0 ? "text-red-400" : "text-gray-400"
                              }`}>
                                {getAdvantageText(matchup.advantagePercent)}
                              </div>
                              <div className="text-xs text-gray-400">
                                {Math.abs(Math.round(matchup.advantagePercent))}% {matchup.advantagePercent > 0 ? "Blue" : "Red"} Advantage
                              </div>
                            </div>
                            
                            <Progress 
                              value={50 + matchup.advantagePercent/2} 
                              className="h-1.5 bg-gray-800"
                            />
                            
                            <div className="mt-3">
                              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                                {matchup.notes.slice(0, 2).map((note, i) => (
                                  <li key={i}>{note}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center p-10 border border-dashed border-gray-700 rounded-md">
              <p className="text-gray-500 mb-4">Add team members to both teams and analyze to see matchup predictions</p>
              <Button onClick={() => setActiveTab("teamBuilder")}>
                Go to Team Builder
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamBattleScout;