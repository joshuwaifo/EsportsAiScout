import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  BarChart, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Dumbbell, 
  ExternalLink, 
  FileBarChart2,
  FlameIcon,
  Gamepad2, 
  Lightbulb, 
  LineChart, 
  ListChecks, 
  Maximize2, 
  MessageSquare, 
  Play, 
  Share2, 
  Sparkles, 
  TimerIcon,
  TrendingUp, 
  Trophy, 
  User 
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Types for the training plan
interface Drill {
  id: number;
  title: string;
  description: string;
  category: DrillCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  completionTime: number; // in minutes
  completed: boolean;
  type: DrillType;
  videoUrl?: string;
  inAppInstructions?: string[];
  sfTrainingModeSetup?: string[];
}

type DrillCategory = 
  | "reaction" 
  | "combo" 
  | "defense" 
  | "footsies" 
  | "punish" 
  | "mindgame";

type DrillType = 
  | "inApp" 
  | "video" 
  | "trainingMode";

interface CoachFeedback {
  message: string;
  metrics: {
    comboAccuracy: number;
    reactionTime: number;
    punishRate: number;
    adaptationScore: number;
  };
  strengths: string[];
  focusAreas: string[];
  encouragement: string;
}

interface SkillProgress {
  date: string;
  comboPct: number;
  reactionMs: number;
  punishRate: number;
  adaptScore: number;
}

interface Character {
  id: number;
  name: string;
  archetype: string;
  difficulty: number;
  strengthAreas: string[];
  weaknessAreas: string[];
  avatar: string;
}

// Mock data for demonstration
const currentCharacter: Character = {
  id: 1,
  name: "Ryu",
  archetype: "All-Rounder",
  difficulty: 2,
  strengthAreas: ["Fundamentals", "Anti-Air", "Zoning"],
  weaknessAreas: ["Pressure", "Mix-Ups", "Walk Speed"],
  avatar: "https://game8.co/images/resize/512x512/thumbnail/7467979?1718199952"
};

const characters: Character[] = [
  currentCharacter,
  {
    id: 2,
    name: "Ken",
    archetype: "Aggressive Rushdown",
    difficulty: 2,
    strengthAreas: ["Pressure", "Mix-Ups", "Combo Damage"],
    weaknessAreas: ["Defense", "Zoning", "Risk/Reward"],
    avatar: "https://game8.co/images/resize/512x512/thumbnail/7468033?1718199880"
  },
  {
    id: 3,
    name: "Cammy",
    archetype: "Rushdown",
    difficulty: 3,
    strengthAreas: ["Speed", "Mobility", "Mix-Ups"],
    weaknessAreas: ["Health", "Long-Range", "Defense"],
    avatar: "https://game8.co/images/resize/512x512/thumbnail/7467947?1718199769"
  },
  {
    id: 4,
    name: "Guile",
    archetype: "Zoner",
    difficulty: 3,
    strengthAreas: ["Zoning", "Defense", "Anti-Air"],
    weaknessAreas: ["Mobility", "Wake-Up Options", "Close Range"],
    avatar: "https://game8.co/images/resize/512x512/thumbnail/7467996?1718199834"
  },
  {
    id: 5,
    name: "Zangief",
    archetype: "Grappler",
    difficulty: 4,
    strengthAreas: ["Grappling", "Damage", "Health"],
    weaknessAreas: ["Mobility", "Range", "Projectiles"],
    avatar: "https://game8.co/images/resize/512x512/thumbnail/7468017?1718199983"
  }
];

const dailyDrills: Drill[] = [
  {
    id: 1,
    title: "Anti-Air Reaction Training",
    description: "Practice reacting to jump-ins with your character's best anti-air option",
    category: "reaction",
    difficulty: "intermediate",
    completionTime: 10,
    completed: false,
    type: "inApp",
    inAppInstructions: [
      "Click the button when you see a jump-in animation",
      "Aim for sub-300ms reaction time",
      "Practice 20 repetitions to build muscle memory"
    ]
  },
  {
    id: 2,
    title: "Corner Escape Techniques",
    description: "Learn defensive options when cornered against aggressive opponents",
    category: "defense",
    difficulty: "intermediate",
    completionTime: 15,
    completed: true,
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "BnB Combo Consistency",
    description: "Master your character's bread-and-butter combos for maximum damage",
    category: "combo",
    difficulty: "beginner",
    completionTime: 20,
    completed: false,
    type: "trainingMode",
    sfTrainingModeSetup: [
      "Set dummy to 'Block After First Hit' for hit-confirm practice",
      "Practice the combos: cr.MP > cr.MP > Hadoken (Fireball)",
      "And: cr.MP > cr.MK > Hadoken (Fireball)",
      "Aim for 10 successful completions in a row"
    ]
  },
  {
    id: 4,
    title: "Whiff Punish Training",
    description: "Improve your ability to punish whiffed moves",
    category: "punish",
    difficulty: "advanced",
    completionTime: 15,
    completed: false,
    type: "trainingMode",
    sfTrainingModeSetup: [
      "Set recording to: dummy performs HP at random intervals",
      "Stay at optimal range and punish the whiffed HP with your fastest move",
      "Practice 20 successful punishes"
    ]
  },
  {
    id: 5,
    title: "Drive Impact Counters",
    description: "Learn to react and counter Drive Impact with your own Drive Impact",
    category: "reaction",
    difficulty: "intermediate",
    completionTime: 10,
    completed: false,
    type: "trainingMode",
    sfTrainingModeSetup: [
      "Set recording to: dummy performs Drive Impact at random intervals",
      "Practice throwing out your own Drive Impact as soon as you see it",
      "Aim for 10 successful counters in a row"
    ]
  }
];

const weeklyDrills: Drill[] = [
  {
    id: 6,
    title: "Matchup Knowledge: Zangief",
    description: "Learn key strategies against Zangief's grappling style",
    category: "mindgame",
    difficulty: "advanced",
    completionTime: 30,
    completed: false,
    type: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 7,
    title: "Footsies Mastery Drill",
    description: "Improve your neutral game with spacing and poke practice",
    category: "footsies",
    difficulty: "advanced",
    completionTime: 25,
    completed: false,
    type: "trainingMode",
    sfTrainingModeSetup: [
      "Set dummy to walk back and forth and occasionally throw out s.MK",
      "Practice staying at the tip of your longest poke range",
      "Aim to whiff punish the dummy's pokes 15 times"
    ]
  },
  {
    id: 8,
    title: "Drive Rush Cancel Practice",
    description: "Master Drive Rush cancels for extended combos and pressure",
    category: "combo",
    difficulty: "advanced",
    completionTime: 20,
    completed: true,
    type: "trainingMode",
    sfTrainingModeSetup: [
      "Practice canceling normals into Drive Rush",
      "Confirm into combos after successful Drive Rush",
      "Complete the sequence: cr.MK (Drive Rush cancel) > s.MP > special move"
    ]
  }
];

const coachFeedback: CoachFeedback = {
  message: "Your anti-air reactions have improved significantly this week! I'm seeing much better combo consistency too, but there's still room for growth on your punish game. Keep focusing on recognizing punishable moves.",
  metrics: {
    comboAccuracy: 75,
    reactionTime: 320,
    punishRate: 60,
    adaptationScore: 65
  },
  strengths: [
    "Excellent anti-air reactions - you're catching jump-ins consistently",
    "Good combo execution under pressure",
    "Improved defense in corner situations"
  ],
  focusAreas: [
    "Work on identifying punishable moves - you're missing opportunities",
    "Practice more matchup-specific counters",
    "Drive gauge management needs improvement"
  ],
  encouragement: "Remember, even Daigo started with the basics. Your consistent practice is building a strong foundation. I can see real improvement in your fundamental skills!"
};

const skillProgressData: SkillProgress[] = [
  { date: "2025-04-01", comboPct: 60, reactionMs: 350, punishRate: 40, adaptScore: 30 },
  { date: "2025-04-08", comboPct: 65, reactionMs: 340, punishRate: 45, adaptScore: 40 },
  { date: "2025-04-15", comboPct: 72, reactionMs: 330, punishRate: 50, adaptScore: 45 },
  { date: "2025-04-22", comboPct: 70, reactionMs: 310, punishRate: 55, adaptScore: 50 },
  { date: "2025-04-29", comboPct: 75, reactionMs: 300, punishRate: 60, adaptScore: 60 },
  { date: "2025-05-06", comboPct: 80, reactionMs: 280, punishRate: 65, adaptScore: 65 }
];

// Get the category icon based on the drill category
const getCategoryIcon = (category: DrillCategory) => {
  switch (category) {
    case "reaction":
      return <TimerIcon className="h-5 w-5 text-yellow-500" />;
    case "combo":
      return <Share2 className="h-5 w-5 text-blue-500" />;
    case "defense":
      return <Maximize2 className="h-5 w-5 text-green-500" />;
    case "footsies":
      return <Dumbbell className="h-5 w-5 text-purple-500" />;
    case "punish":
      return <FlameIcon className="h-5 w-5 text-red-500" />;
    case "mindgame":
      return <Lightbulb className="h-5 w-5 text-amber-500" />;
    default:
      return <ListChecks className="h-5 w-5 text-gray-500" />;
  }
};

// Get a description for a category
const getCategoryDescription = (category: DrillCategory) => {
  switch (category) {
    case "reaction":
      return "Builds faster reaction times to opponent actions";
    case "combo":
      return "Improves execution and consistency of combo sequences";
    case "defense":
      return "Strengthens defensive options and escape techniques";
    case "footsies":
      return "Enhances neutral game spacing and poke timing";
    case "punish":
      return "Develops ability to capitalize on opponent mistakes";
    case "mindgame":
      return "Improves psychological aspects of fighting games";
    default:
      return "General training drill";
  }
};

// Get class for difficulty badge
const getDifficultyClass = (difficulty: "beginner" | "intermediate" | "advanced") => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-600";
    case "intermediate":
      return "bg-yellow-600";
    case "advanced":
      return "bg-red-600";
    default:
      return "bg-gray-600";
  }
};

// Format reaction time for display (lower is better, so we invert for graph)
const formatReactionTime = (ms: number) => {
  return `${ms}ms`;
};

const PersonalizedTrainingPlan: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(currentCharacter);
  const [activeDrill, setActiveDrill] = useState<Drill | null>(null);
  const [activeTab, setActiveTab] = useState("daily");
  const [showCoachFeedback, setShowCoachFeedback] = useState(false);
  
  // Mark a drill as completed
  const completeDrill = (id: number) => {
    // In a real app, this would update the state and persist to backend
    console.log(`Drill ${id} completed`);
  };
  
  // Handle starting a drill
  const startDrill = (drill: Drill) => {
    setActiveDrill(drill);
  };
  
  // Close drill dialog
  const closeDrillDialog = () => {
    setActiveDrill(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Personalized Training Plan
          </h2>
          <p className="text-gray-400 text-sm">
            AI-driven drills and progress tracking for Street Fighter 6
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <Button variant="default" size="sm" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Track Progress
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Quick Drill
          </Button>
        </div>
      </div>
      
      {/* Character Selection and Training Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character Card */}
        <Card className="bg-surface border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 mr-2 text-accent" />
              Selected Character
            </CardTitle>
            <CardDescription>
              Fighter-specific training
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={selectedCharacter.avatar} alt={selectedCharacter.name} />
                <AvatarFallback>{selectedCharacter.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{selectedCharacter.name}</h3>
                <div className="flex items-center mt-1">
                  <Badge variant="secondary" className="text-xs mr-2">
                    {selectedCharacter.archetype}
                  </Badge>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-1">Difficulty:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 w-1.5 rounded-full mx-0.5 ${
                            i < selectedCharacter.difficulty ? "bg-primary" : "bg-gray-600"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1.5 flex items-center">
                  <Trophy className="h-4 w-4 mr-1.5 text-green-500" />
                  Character Strengths
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCharacter.strengthAreas.map((strength, idx) => (
                    <Badge key={idx} variant="outline" className="bg-green-900/30 border-green-700/50 text-green-400 text-xs">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1.5 flex items-center">
                  <FileBarChart2 className="h-4 w-4 mr-1.5 text-red-500" />
                  Areas to Improve
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCharacter.weaknessAreas.map((weakness, idx) => (
                    <Badge key={idx} variant="outline" className="bg-red-900/30 border-red-700/50 text-red-400 text-xs">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Select Character:</h4>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {characters.map((char) => (
                  <Avatar 
                    key={char.id}
                    className={`h-12 w-12 cursor-pointer transition-all ${
                      selectedCharacter.id === char.id 
                        ? "border-2 border-primary ring-2 ring-primary/20" 
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedCharacter(char)}
                  >
                    <AvatarImage src={char.avatar} alt={char.name} />
                    <AvatarFallback>{char.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Training Progress & Coach Feedback */}
        <Card className="bg-surface border-none lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                Training Progress
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setShowCoachFeedback(true)}
              >
                <MessageSquare className="h-4 w-4" />
                Coach Feedback
              </Button>
            </div>
            <CardDescription>
              Performance metrics and skill development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-background/30 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-medium text-gray-400">Combo Accuracy</h4>
                  <span className="text-sm font-semibold text-green-400">
                    {coachFeedback.metrics.comboAccuracy}%
                  </span>
                </div>
                <Progress value={coachFeedback.metrics.comboAccuracy} className="h-1.5" />
                <p className="text-xs mt-1.5 text-gray-500">+5% from last week</p>
              </div>
              
              <div className="bg-background/30 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-medium text-gray-400">Reaction Time</h4>
                  <span className="text-sm font-semibold text-blue-400">
                    {formatReactionTime(coachFeedback.metrics.reactionTime)}
                  </span>
                </div>
                <Progress 
                  // Invert because lower is better for reaction time
                  value={100 - ((coachFeedback.metrics.reactionTime / 500) * 100)} 
                  className="h-1.5" 
                />
                <p className="text-xs mt-1.5 text-gray-500">-20ms from last week</p>
              </div>
              
              <div className="bg-background/30 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-medium text-gray-400">Punish Rate</h4>
                  <span className="text-sm font-semibold text-yellow-400">
                    {coachFeedback.metrics.punishRate}%
                  </span>
                </div>
                <Progress value={coachFeedback.metrics.punishRate} className="h-1.5" />
                <p className="text-xs mt-1.5 text-gray-500">+5% from last week</p>
              </div>
              
              <div className="bg-background/30 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-medium text-gray-400">Adaptation</h4>
                  <span className="text-sm font-semibold text-purple-400">
                    {coachFeedback.metrics.adaptationScore}%
                  </span>
                </div>
                <Progress value={coachFeedback.metrics.adaptationScore} className="h-1.5" />
                <p className="text-xs mt-1.5 text-gray-500">+5% from last week</p>
              </div>
            </div>
            
            {/* Skill Progress Chart */}
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={skillProgressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: '#aaa' }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#aaa' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1c1c1c', borderColor: '#333', borderRadius: '6px' }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value, name) => {
                      if (name === 'reactionMs') {
                        return [`${value} ms`, 'Reaction Time'];
                      }
                      return [`${value}%`, name === 'comboPct' ? 'Combo %' : 
                                         name === 'punishRate' ? 'Punish Rate' : 
                                         'Adaptation'];
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="comboPct" 
                    name="Combo %" 
                    stroke="#2563eb" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reactionMs" 
                    name="Reaction Time" 
                    stroke="#ef4444" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="punishRate" 
                    name="Punish Rate" 
                    stroke="#eab308" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adaptScore" 
                    name="Adaptation" 
                    stroke="#a855f7" 
                    activeDot={{ r: 8 }} 
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Training Drills */}
      <Card className="bg-surface border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Gamepad2 className="h-5 w-5 mr-2 text-accent" />
            Training Drills
          </CardTitle>
          <CardDescription>
            Targeted exercises to improve your skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="mb-4 bg-background">
              <TabsTrigger value="daily" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Daily Drills
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Weekly Program
              </TabsTrigger>
            </TabsList>
            
            {/* Daily Drills Tab */}
            <TabsContent value="daily">
              <div className="space-y-4">
                {dailyDrills.map((drill) => (
                  <div 
                    key={drill.id}
                    className={`rounded-md border p-4 ${
                      drill.completed 
                        ? "bg-green-900/20 border-green-800/40" 
                        : "bg-background/60 border-gray-800"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getCategoryIcon(drill.category)}
                        </div>
                        <div>
                          <h3 className="text-base font-medium mb-1 flex items-center">
                            {drill.title}
                            {drill.completed && (
                              <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2">{drill.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {drill.category.charAt(0).toUpperCase() + drill.category.slice(1)}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyClass(drill.difficulty)}`}>
                              {drill.difficulty.charAt(0).toUpperCase() + drill.difficulty.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-xs flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {drill.completionTime} min
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-0 mt-4 sm:mt-0 sm:ml-4 flex">
                        <Button 
                          size="sm" 
                          variant={drill.completed ? "outline" : "default"}
                          className="flex items-center"
                          onClick={() => startDrill(drill)}
                        >
                          {drill.completed ? (
                            <>
                              <LineChart className="mr-1.5 h-4 w-4" />
                              Results
                            </>
                          ) : (
                            <>
                              <Play className="mr-1.5 h-4 w-4" />
                              Start Drill
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Weekly Program Tab */}
            <TabsContent value="weekly">
              <div className="space-y-4">
                {weeklyDrills.map((drill) => (
                  <div 
                    key={drill.id}
                    className={`rounded-md border p-4 ${
                      drill.completed 
                        ? "bg-green-900/20 border-green-800/40" 
                        : "bg-background/60 border-gray-800"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getCategoryIcon(drill.category)}
                        </div>
                        <div>
                          <h3 className="text-base font-medium mb-1 flex items-center">
                            {drill.title}
                            {drill.completed && (
                              <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2">{drill.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {drill.category.charAt(0).toUpperCase() + drill.category.slice(1)}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyClass(drill.difficulty)}`}>
                              {drill.difficulty.charAt(0).toUpperCase() + drill.difficulty.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-xs flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {drill.completionTime} min
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-0 mt-4 sm:mt-0 sm:ml-4 flex">
                        <Button 
                          size="sm" 
                          variant={drill.completed ? "outline" : "default"}
                          className="flex items-center"
                          onClick={() => startDrill(drill)}
                        >
                          {drill.completed ? (
                            <>
                              <LineChart className="mr-1.5 h-4 w-4" />
                              Results
                            </>
                          ) : (
                            <>
                              <Play className="mr-1.5 h-4 w-4" />
                              Start Drill
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Drill Detail Dialog */}
      {activeDrill && (
        <Dialog open={!!activeDrill} onOpenChange={closeDrillDialog}>
          <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-surface">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {getCategoryIcon(activeDrill.category)}
                <span className="ml-2">{activeDrill.title}</span>
              </DialogTitle>
              <DialogDescription>
                {getCategoryDescription(activeDrill.category)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-2">
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Description:</h4>
                <p className="text-sm text-gray-300">{activeDrill.description}</p>
              </div>
              
              {activeDrill.type === "inApp" && activeDrill.inAppInstructions && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Exercise Instructions:</h4>
                  <ul className="space-y-1.5">
                    {activeDrill.inAppInstructions.map((instruction, idx) => (
                      <li key={idx} className="text-sm flex items-start text-gray-300">
                        <ChevronRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="ml-1.5">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-6 bg-background rounded-md text-center">
                    <h3 className="font-medium mb-4">Reaction Training Mini-Game</h3>
                    <p className="text-sm text-gray-400 mb-4">Click when you see the jump animation!</p>
                    <Button size="lg">
                      Start Mini-Game
                    </Button>
                  </div>
                </div>
              )}
              
              {activeDrill.type === "video" && activeDrill.videoUrl && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Training Video:</h4>
                  <div className="aspect-video bg-black/40 rounded-md flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={() => window.open(activeDrill.videoUrl, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Training Video
                    </Button>
                  </div>
                </div>
              )}
              
              {activeDrill.type === "trainingMode" && activeDrill.sfTrainingModeSetup && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Training Mode Setup:</h4>
                  <div className="p-4 bg-background/50 rounded-md">
                    <ol className="space-y-2">
                      {activeDrill.sfTrainingModeSetup.map((step, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-accent text-xs font-medium shrink-0 mt-0.5 mr-2">
                            {idx + 1}
                          </span>
                          <span className="text-gray-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center text-sm text-gray-400">
                  <Dumbbell className="h-4 w-4 mr-1.5" />
                  Estimated completion: {activeDrill.completionTime} minutes
                </div>
                
                <Button 
                  onClick={() => {
                    completeDrill(activeDrill.id);
                    closeDrillDialog();
                  }}
                >
                  Mark as Completed
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Coach Feedback Dialog */}
      <Dialog open={showCoachFeedback} onOpenChange={setShowCoachFeedback}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-surface">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-accent" />
              Coach Feedback
            </DialogTitle>
            <DialogDescription>
              Analysis of your recent training performance
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-2">
            {/* Coach Message */}
            <div className="flex items-start mb-6">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src="https://i.imgur.com/8Km9tLL.jpg" alt="Coach" />
                <AvatarFallback>SF</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm text-gray-300 mb-2">
                  {coachFeedback.message}
                </p>
                <p className="text-sm text-gray-300">
                  {coachFeedback.encouragement}
                </p>
              </div>
            </div>
            
            {/* Performance Metrics */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Performance Metrics:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background/30 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-medium text-gray-400">Combo Accuracy</h4>
                    <span className="text-sm font-semibold text-green-400">
                      {coachFeedback.metrics.comboAccuracy}%
                    </span>
                  </div>
                  <Progress value={coachFeedback.metrics.comboAccuracy} className="h-1.5" />
                </div>
                
                <div className="bg-background/30 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-medium text-gray-400">Reaction Time</h4>
                    <span className="text-sm font-semibold text-blue-400">
                      {formatReactionTime(coachFeedback.metrics.reactionTime)}
                    </span>
                  </div>
                  <Progress 
                    value={100 - ((coachFeedback.metrics.reactionTime / 500) * 100)} 
                    className="h-1.5" 
                  />
                </div>
                
                <div className="bg-background/30 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-medium text-gray-400">Punish Rate</h4>
                    <span className="text-sm font-semibold text-yellow-400">
                      {coachFeedback.metrics.punishRate}%
                    </span>
                  </div>
                  <Progress value={coachFeedback.metrics.punishRate} className="h-1.5" />
                </div>
                
                <div className="bg-background/30 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-medium text-gray-400">Adaptation</h4>
                    <span className="text-sm font-semibold text-purple-400">
                      {coachFeedback.metrics.adaptationScore}%
                    </span>
                  </div>
                  <Progress value={coachFeedback.metrics.adaptationScore} className="h-1.5" />
                </div>
              </div>
            </div>
            
            {/* Strengths & Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Trophy className="h-4 w-4 mr-1.5 text-green-500" />
                  Your Strengths
                </h3>
                <ul className="space-y-1.5">
                  {coachFeedback.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="ml-1.5">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <BarChart className="h-4 w-4 mr-1.5 text-yellow-500" />
                  Focus Areas
                </h3>
                <ul className="space-y-1.5">
                  {coachFeedback.focusAreas.map((area, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <ChevronRight className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                      <span className="ml-1.5">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-md">
              <h3 className="text-sm font-medium mb-2">Recommended Focus:</h3>
              <p className="text-sm text-gray-300">
                Based on your performance, I recommend focusing on the "Whiff Punish Training" drill
                to improve your ability to capitalize on opponent mistakes. This will directly address
                your current weakest area.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalizedTrainingPlan;