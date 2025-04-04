import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight,
  Play,
  Gamepad2,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Types for move guide data
interface MoveInput {
  direction: string;
  description: string;
  icon: string; // This will be a unicode arrow or similar
}

export interface SpecialMove {
  id: number;
  name: string;
  character: string;
  description: string;
  videoUrl: string;
  inputs: MoveInput[];
  difficulty: 'easy' | 'medium' | 'hard';
  usageNotes: string[];
  commonErrors: string[];
  advancedTips: string[];
}

// Mock data for SF6 special moves
const specialMoves: SpecialMove[] = [
  {
    id: 1,
    character: "Ryu",
    name: "Hadoken",
    description: "A surge of spirit energy projected from the palms.",
    videoUrl: "https://www.youtube.com/embed/xGi_gZJSAgc",
    inputs: [
      { direction: "↓", description: "Press Down", icon: "↓" },
      { direction: "↘", description: "Roll to Down-Forward", icon: "↘" },
      { direction: "→", description: "Continue to Forward", icon: "→" },
      { direction: "P", description: "Press Punch", icon: "👊" }
    ],
    difficulty: "easy",
    usageNotes: [
      "Use to control space and force opponents to approach",
      "Stronger punch buttons create faster, stronger projectiles",
      "Can be used to end combos for chip damage"
    ],
    commonErrors: [
      "Rushing the motion - ensure you hit all directions smoothly",
      "Pressing punch before completing the forward motion",
      "Forgetting to return stick to neutral between consecutive Hadokens"
    ],
    advancedTips: [
      "EX version (performed with two punch buttons) has faster startup and does more damage",
      "In Drive Rush combos, can be canceled from certain normals",
      "Can be used as a meaty attack on opponent's wakeup"
    ]
  },
  {
    id: 2,
    character: "Ryu",
    name: "Tatsumaki Senpukyaku",
    description: "A spinning kick attack that propels Ryu forward through the air.",
    videoUrl: "https://www.youtube.com/embed/9H_ZEp8O4sc",
    inputs: [
      { direction: "↓", description: "Press Down", icon: "↓" },
      { direction: "↙", description: "Roll to Down-Back", icon: "↙" },
      { direction: "←", description: "Continue to Back", icon: "←" },
      { direction: "K", description: "Press Kick", icon: "👟" }
    ],
    difficulty: "easy",
    usageNotes: [
      "Great for closing distance quickly",
      "Heavy version travels further and does more damage",
      "On hit, causes a knockdown, giving time for setup"
    ],
    commonErrors: [
      "Not completing the quarter-circle motion fully",
      "Pressing kick too early in the motion",
      "Using at unsafe distances where it can be punished on block"
    ],
    advancedTips: [
      "EX version hits multiple times and can juggle in corner",
      "Aerial version can alter jump arc and evade some anti-airs",
      "Can hop over some low projectiles with proper timing"
    ]
  },
  {
    id: 3,
    character: "Ryu",
    name: "Shoryuken",
    description: "A powerful rising dragon punch that launches opponents.",
    videoUrl: "https://www.youtube.com/embed/T-rIqVYYR-g",
    inputs: [
      { direction: "→", description: "Press Forward", icon: "→" },
      { direction: "↓", description: "Press Down", icon: "↓" },
      { direction: "↘", description: "Roll to Down-Forward", icon: "↘" },
      { direction: "P", description: "Press Punch", icon: "👊" }
    ],
    difficulty: "medium",
    usageNotes: [
      "Primary anti-air tool - use to counter jump-ins",
      "Has invincible startup frames, making it a strong reversal option",
      "Heavy version does more damage but has more recovery frames"
    ],
    commonErrors: [
      "Missing the initial forward input",
      "Performing too slowly, resulting in a Hadoken instead",
      "Using as a poke (very punishable on block)"
    ],
    advancedTips: [
      "EX version has more invincibility and damage",
      "Can be used in juggle combos after certain moves",
      "Practice hit-confirming into Shoryuken for maximum safety"
    ]
  },
  {
    id: 4,
    character: "Guile",
    name: "Sonic Boom",
    description: "A projectile created by slicing through the air with incredible speed.",
    videoUrl: "https://www.youtube.com/embed/blx-TA3J-vE",
    inputs: [
      { direction: "←", description: "Hold Back (charge)", icon: "←" },
      { direction: "→+P", description: "Press Forward + Punch", icon: "→👊" }
    ],
    difficulty: "medium",
    usageNotes: [
      "Must be charged by holding back for about 2 seconds",
      "Excellent for zoning and controlling space",
      "Faster and flatter trajectory than Ryu's Hadoken"
    ],
    commonErrors: [
      "Not charging long enough before release",
      "Letting go of back before pressing forward + punch",
      "Forgetting to immediately start charging again after throwing one"
    ],
    advancedTips: [
      "Can be charged while performing other actions (jumping, blocking)",
      "Down-back also counts as charging",
      "EX version fires two booms at different speeds for mixup potential"
    ]
  },
  {
    id: 5,
    character: "Zangief",
    name: "Spinning Pile Driver",
    description: "A devastating command grab that spins opponents into the ground.",
    videoUrl: "https://www.youtube.com/embed/dQZiGa4rnJE",
    inputs: [
      { direction: "↓", description: "Start at Down", icon: "↓" },
      { direction: "↙", description: "Roll to Down-Back", icon: "↙" },
      { direction: "←", description: "Continue to Back", icon: "←" },
      { direction: "↖", description: "Roll to Up-Back", icon: "↖" },
      { direction: "↑", description: "Continue to Up", icon: "↑" },
      { direction: "↗", description: "Roll to Up-Forward", icon: "↗" },
      { direction: "→", description: "Complete at Forward", icon: "→" },
      { direction: "P", description: "Press Punch", icon: "👊" }
    ],
    difficulty: "hard",
    usageNotes: [
      "360° motion can be performed by rolling the stick/pad in a circular motion",
      "Must be in throw range to connect",
      "Cannot be blocked - must be jumped or avoided"
    ],
    commonErrors: [
      "Performing the motion too slowly",
      "Attempting from too far away",
      "Telegraphing the SPD with obvious movement"
    ],
    advancedTips: [
      "Can buffer the motion during jumps, dashes, or other animations",
      "Shortcut: can be performed with a half-circle back + forward + punch",
      "EX version has more range and damage"
    ]
  }
];

const MoveInputGuide: React.FC = () => {
  const [selectedMove, setSelectedMove] = useState<SpecialMove>(specialMoves[0]);
  const [activeTab, setActiveTab] = useState("inputs");
  
  const renderInputIcon = (icon: string) => {
    switch(icon) {
      case "👊": return <span className="text-2xl">👊</span>;
      case "👟": return <span className="text-2xl">👟</span>;
      default: return <span className="text-2xl">{icon}</span>;
    }
  };
  
  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Special Move Input Guide
          </h2>
          <p className="text-gray-400 text-sm">
            Learn fighting game special move inputs and execution techniques
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Move Selection Panel */}
        <Card className="bg-surface border-none">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-primary" />
              Select Move
            </CardTitle>
            <CardDescription>
              Choose a special move to learn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {specialMoves.map((move) => (
              <div 
                key={move.id}
                className={`p-3 rounded-md cursor-pointer transition-all ${
                  selectedMove.id === move.id 
                    ? 'bg-primary/20 border border-primary/50' 
                    : 'bg-background/50 hover:bg-background/80'
                }`}
                onClick={() => setSelectedMove(move)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{move.name}</h3>
                    <p className="text-sm text-gray-400">{move.character}</p>
                  </div>
                  <Badge className={`${getDifficultyColor(move.difficulty)}`}>
                    {move.difficulty}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Move Detail Panel */}
        <Card className="bg-surface border-none lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                {selectedMove.name}
                <span className="text-gray-400 text-sm ml-2">
                  {selectedMove.character}
                </span>
              </CardTitle>
              <Badge className={`${getDifficultyColor(selectedMove.difficulty)}`}>
                {selectedMove.difficulty}
              </Badge>
            </div>
            <CardDescription>
              {selectedMove.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Video Demo */}
            <div className="mb-6 rounded-md overflow-hidden">
              <iframe
                width="100%"
                height="300"
                src={selectedMove.videoUrl}
                title={`${selectedMove.name} Demo`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Tabbed Content */}
            <Tabs defaultValue="inputs" className="w-full" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="inputs" className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  <span>Inputs</span>
                </TabsTrigger>
                <TabsTrigger value="usage" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Usage</span>
                </TabsTrigger>
                <TabsTrigger value="tips" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Advanced Tips</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="inputs" className="space-y-4">
                <div className="bg-background/30 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-4">Step-by-Step Input Guide</h3>
                  
                  <div className="space-y-6">
                    {/* Input Visualization */}
                    <div className="flex items-center justify-center gap-2 py-3">
                      {selectedMove.inputs.map((input, index) => (
                        <React.Fragment key={index}>
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary/20 border border-primary/50 rounded-md flex items-center justify-center text-2xl">
                              {renderInputIcon(input.icon)}
                            </div>
                            <span className="text-xs mt-1 text-gray-400">{input.direction}</span>
                          </div>
                          {index < selectedMove.inputs.length - 1 && (
                            <ChevronRight className="h-6 w-6 text-gray-500" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    
                    {/* Step-by-Step Instructions */}
                    <div className="space-y-3">
                      {selectedMove.inputs.map((input, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <div className="w-7 h-7 bg-primary/20 border border-primary/50 rounded-full flex items-center justify-center">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{input.direction}</p>
                            <p className="text-sm text-gray-400">{input.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Common Errors */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium mb-2">Common Mistakes to Avoid</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedMove.commonErrors.map((error, index) => (
                        <li key={index} className="text-sm text-gray-300">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="usage" className="space-y-4">
                <div className="bg-background/30 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-4">When & How to Use</h3>
                  
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      {selectedMove.usageNotes.map((note, index) => (
                        <li key={index} className="text-gray-300">
                          {note}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center mt-6">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Play className="h-4 w-4" />
                        Watch Usage Examples
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tips" className="space-y-4">
                <div className="bg-background/30 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-4">Advanced Techniques</h3>
                  
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      {selectedMove.advancedTips.map((tip, index) => (
                        <li key={index} className="text-gray-300">
                          {tip}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="p-3 bg-primary/10 border border-primary/30 rounded-md mt-4">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Pro Tip
                      </h4>
                      <p className="text-sm mt-1 text-gray-300">
                        Practice this move in training mode with input display on to ensure your execution is clean. Aim for consistent inputs even under pressure.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoveInputGuide;