import { 
  TrophyIcon,
  CrosshairIcon,
  ClockIcon,
  BrainIcon,
  UserIcon,
  HeartIcon,
  FlameIcon
} from "lucide-react";
import type { 
  StatCard, 
  Insight, 
  Player, 
  TeamAttribute, 
  DraftPick, 
  TeamMember
} from "@/types";

// Stat cards for dashboard
export const statCards: StatCard[] = [
  {
    title: "Win Rate",
    value: "68%",
    change: "4.2%",
    icon: TrophyIcon,
    trend: "up"
  },
  {
    title: "Accuracy",
    value: "72.5%",
    change: "1.8%",
    icon: CrosshairIcon,
    trend: "up"
  },
  {
    title: "Avg Match Time",
    value: "34:22",
    change: "2:15",
    icon: ClockIcon,
    trend: "down"
  },
  {
    title: "AI Strategy Score",
    value: "87/100",
    change: "5pts",
    icon: BrainIcon,
    trend: "up"
  }
];

// AI Insights for dashboard
export const aiInsights: Insight[] = [
  {
    type: "tip",
    title: "Team's defensive formation shows vulnerabilities during counter-attacks",
    description: "Based on the last 5 matches, your team loses defensive structure when transitioning from attack to defense. Consider adjusting player positioning."
  },
  {
    type: "stat",
    title: "Player \"NightStalker\" shows exceptional map awareness",
    description: "Their positioning has resulted in 35% more objective control compared to the average player in their role."
  },
  {
    type: "warning",
    title: "Team composition lacks crowd control abilities",
    description: "Your current roster has 43% less CC than top-performing teams. Consider drafting players with stronger CC capabilities."
  }
];

// Player prospects for scouting
export const playerProspects: Player[] = [
  {
    id: 1,
    name: "ShadowStriker",
    role: "Mid Lane / Carry",
    position: "Carry",
    matchPercentage: 97,
    skills: [
      { name: "Mechanical Skill", value: 92 },
      { name: "Game Sense", value: 88 },
      { name: "Team Play", value: 79 },
      { name: "Versatility", value: 95 }
    ],
    tournaments: 43,
    rating: 4.8,
    stats: {
      kda: 5.2,
      winRate: 71,
      gamesPlayed: 156
    }
  },
  {
    id: 2,
    name: "VortexLord",
    role: "Top Lane / Tank",
    position: "Tank",
    matchPercentage: 93,
    skills: [
      { name: "Mechanical Skill", value: 85 },
      { name: "Game Sense", value: 96 },
      { name: "Team Play", value: 94 },
      { name: "Versatility", value: 81 }
    ],
    tournaments: 38,
    rating: 4.7,
    stats: {
      kda: 4.1,
      winRate: 68,
      gamesPlayed: 189
    }
  },
  {
    id: 3,
    name: "QuantumPulse",
    role: "Support / Healer",
    position: "Healer",
    matchPercentage: 88,
    skills: [
      { name: "Mechanical Skill", value: 82 },
      { name: "Game Sense", value: 94 },
      { name: "Team Play", value: 97 },
      { name: "Versatility", value: 79 }
    ],
    tournaments: 29,
    rating: 4.5,
    stats: {
      kda: 6.7,
      winRate: 66,
      gamesPlayed: 142
    }
  },
  {
    id: 4,
    name: "CyberNinja",
    role: "Mid Lane / Assassin",
    position: "Assassin",
    matchPercentage: 85,
    skills: [
      { name: "Mechanical Skill", value: 96 },
      { name: "Game Sense", value: 83 },
      { name: "Team Play", value: 75 },
      { name: "Versatility", value: 88 }
    ],
    tournaments: 22,
    rating: 4.3,
    stats: {
      kda: 4.9,
      winRate: 63,
      gamesPlayed: 112
    }
  },
  {
    id: 5,
    name: "MindBender",
    role: "Support / Utility",
    position: "Utility",
    matchPercentage: 82,
    skills: [
      { name: "Mechanical Skill", value: 78 },
      { name: "Game Sense", value: 92 },
      { name: "Team Play", value: 95 },
      { name: "Versatility", value: 86 }
    ],
    tournaments: 31,
    rating: 4.4,
    stats: {
      kda: 5.6,
      winRate: 64,
      gamesPlayed: 178
    }
  }
];

// Team attributes for radar chart
export const teamAttributes: TeamAttribute[] = [
  { name: "Offense", value: 0.8 },
  { name: "Defense", value: 0.7 },
  { name: "TeamFight", value: 0.9 },
  { name: "Objectives", value: 0.85 },
  { name: "Vision", value: 0.6 },
  { name: "Adaptability", value: 0.75 }
];

// Draft picks for strategy recommendation
export const draftRecommendations: DraftPick[] = [
  { name: "Zed" },
  { name: "Nova" },
  { name: "Orion" },
  { name: "Trinity" },
  { name: "Vortex" }
];

// Team members for team management
export const teamMembers: TeamMember[] = [
  {
    id: 101,
    name: "FrostBite",
    role: "Top",
    position: "Tank",
    stats: {
      kda: 3.8,
      winRate: 72
    }
  },
  {
    id: 102,
    name: "JungleKing",
    role: "Jungle",
    position: "Initiator",
    stats: {
      kda: 4.2,
      winRate: 69
    }
  },
  {
    id: 103,
    name: "LightningBolt",
    role: "Mid",
    position: "Carry",
    stats: {
      kda: 5.7,
      winRate: 74
    }
  },
  {
    id: 104,
    name: "SharpShooter",
    role: "ADC",
    position: "Carry",
    stats: {
      kda: 6.1,
      winRate: 71
    }
  },
  {
    id: 105,
    name: "GuardianAngel",
    role: "Support",
    position: "Healer",
    stats: {
      kda: 7.2,
      winRate: 73
    }
  }
];
