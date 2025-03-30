import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2Icon, BrainIcon, CheckIcon, DownloadIcon, FileTextIcon } from 'lucide-react';
import { TeamAttribute } from '@/types';

// Function to generate a report name with date
export const generateReportName = () => {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  return `AILeague_Strategy_Report_${formattedDate}`;
};

// Function to generate a random analysis percentage
export const generateAnalysisPercentage = () => {
  return Math.floor(Math.random() * 21) + 80; // 80-100
};

// Strategy generation dialog component
export function StrategyGenerationDialog({ 
  isOpen, 
  onClose,
  teamName = "Team Zenith",
  onComplete
}: { 
  isOpen: boolean;
  onClose: () => void;
  teamName?: string;
  onComplete: (result: any) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const analysisSteps = [
    "Analyzing team data...",
    "Evaluating opponent patterns...",
    "Identifying key matchups...",
    "Determining strategic opportunities...",
    "Generating draft recommendations...",
    "Finalizing strategy report..."
  ];
  
  // Simulate the progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isOpen && !isComplete) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = Math.floor(Math.random() * 10) + 5;
          const newProgress = Math.min(prevProgress + increment, 100);
          
          // Update step based on progress
          const newStep = Math.min(Math.floor(newProgress / (100 / analysisSteps.length)), analysisSteps.length - 1);
          setCurrentStep(newStep);
          
          if (newProgress === 100) {
            clearInterval(timer);
            setTimeout(() => {
              setIsComplete(true);
              
              // Generate mock strategy data
              const mockStrategyData = {
                opponent: teamName,
                earlyGame: "Focus on aggressive top lane rotations. High priority on first herald.",
                midGame: "Contest second and third Dragon spawns. Control river vision.",
                lateGame: "Split push strategy recommended. Force objective trades.",
                winPercentage: generateAnalysisPercentage(),
                timestamp: new Date().toISOString(),
                draftSuggestions: [
                  "Prioritize early game champions",
                  "Select strong split pushers",
                  "Focus on team synergy over individual picks",
                  "Consider counter picks for mid lane"
                ]
              };
              
              onComplete(mockStrategyData);
            }, 500);
          }
          
          return newProgress;
        });
      }, 300);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, isComplete, analysisSteps.length, onComplete, teamName]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-surface border-none text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {isComplete ? (
              <>
                <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                Strategy Generated Successfully
              </>
            ) : (
              <>
                <BrainIcon className="mr-2 h-5 w-5 text-primary animate-pulse" />
                Generating Strategy
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isComplete 
              ? "Your strategy report is ready for review." 
              : `Analyzing data for match against ${teamName}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {!isComplete ? (
            <>
              <Progress value={progress} className="h-2 mb-4" />
              <div className="flex items-center text-sm">
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin text-primary" />
                <span>{analysisSteps[currentStep]}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                <CheckIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-medium">Win probability: {generateAnalysisPercentage()}%</p>
                <p className="text-sm text-gray-400 mt-1">Based on historical data and current team performance</p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {isComplete ? (
            <Button onClick={onClose} className="w-full">
              View Strategy
            </Button>
          ) : (
            <Button disabled className="w-full">
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Full report generation dialog component
export function FullReportGenerationDialog({ 
  isOpen, 
  onClose,
  teamAttributes,
  onComplete
}: { 
  isOpen: boolean;
  onClose: () => void;
  teamAttributes: TeamAttribute[];
  onComplete: (result: any) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const analysisSteps = [
    "Compiling team performance data...",
    "Analyzing player statistics...",
    "Processing in-game metrics...",
    "Identifying strategic patterns...",
    "Evaluating team strengths and weaknesses...",
    "Generating comprehensive report...",
  ];
  
  // Simulate the progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isOpen && !isComplete) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = Math.floor(Math.random() * 8) + 3;
          const newProgress = Math.min(prevProgress + increment, 100);
          
          // Update step based on progress
          const newStep = Math.min(Math.floor(newProgress / (100 / analysisSteps.length)), analysisSteps.length - 1);
          setCurrentStep(newStep);
          
          if (newProgress === 100) {
            clearInterval(timer);
            setTimeout(() => {
              setIsComplete(true);
              
              // Generate mock full report data
              const mockFullReport = {
                reportName: generateReportName(),
                generatedDate: new Date().toISOString(),
                teamAttributes: teamAttributes,
                teamAnalysis: {
                  overallRating: generateAnalysisPercentage(),
                  strengths: [
                    `Strong ${teamAttributes[0].name.toLowerCase()} capabilities`,
                    `Excellent ${teamAttributes[2].name.toLowerCase()} performance`,
                    "Superior communication and coordination"
                  ],
                  weaknesses: [
                    `Below average ${teamAttributes[4].name.toLowerCase()}`,
                    "Inconsistent early game performance",
                    "Room for improvement in objective control"
                  ],
                  recommendations: [
                    "Focus training on improving objective control",
                    "Develop more flexible drafting strategies",
                    "Enhance early game coordination",
                    "Practice split-push decision making"
                  ]
                },
                upcomingMatches: [
                  { opponent: "Team Zenith", winProbability: generateAnalysisPercentage() },
                  { opponent: "Team Omega", winProbability: generateAnalysisPercentage() - 5 },
                  { opponent: "Team Nexus", winProbability: generateAnalysisPercentage() - 10 }
                ]
              };
              
              onComplete(mockFullReport);
            }, 800);
          }
          
          return newProgress;
        });
      }, 350);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, isComplete, analysisSteps.length, onComplete, teamAttributes]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-surface border-none text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {isComplete ? (
              <>
                <FileTextIcon className="mr-2 h-5 w-5 text-green-500" />
                Full Report Generated
              </>
            ) : (
              <>
                <BrainIcon className="mr-2 h-5 w-5 text-primary animate-pulse" />
                Generating Comprehensive Analysis
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isComplete 
              ? "Your detailed strategy report is ready for download." 
              : "Analyzing team data and generating comprehensive insights..."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {!isComplete ? (
            <>
              <Progress value={progress} className="h-2 mb-4" />
              <div className="flex items-center text-sm">
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin text-primary" />
                <span>{analysisSteps[currentStep]}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                <FileTextIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-medium">{generateReportName()}</p>
                <p className="text-sm text-gray-400 mt-1">
                  PDF report (4.2 MB) • {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {isComplete ? (
            <div className="w-full flex space-x-2">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Close
              </Button>
              <Button onClick={() => {
                onClose();
                // Simulate download click
                setTimeout(() => {
                  alert("Report downloaded successfully!");
                }, 500);
              }} className="flex-1">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          ) : (
            <Button disabled className="w-full">
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Export data functionality
export const exportTeamData = (teamAttributes: TeamAttribute[]) => {
  // Create a JSON object
  const exportData = {
    exportDate: new Date().toISOString(),
    teamName: "Team Alpha",
    attributes: teamAttributes,
    exportType: "team_data",
    version: "1.0"
  };
  
  // Convert to JSON string
  const jsonString = JSON.stringify(exportData, null, 2);
  
  // Create a blob
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `team_data_export_${new Date().toISOString().split('T')[0]}.json`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export strategy plan functionality
export const exportStrategyPlan = () => {
  // Sample text content for the strategy plan
  const planContent = `# AI League Strategic Analysis Plan
Generated: ${new Date().toLocaleString()}

## Team Performance Overview
- Current Win Rate: 68%
- Tournament Standing: 3rd Place
- Average Match Duration: 32:17

## Strategic Priorities
1. Strengthen early game objective control
2. Develop counter-strategies for Team Zenith
3. Improve team synergy during mid-game transitions
4. Enhance draft flexibility with specific champion pools

## Upcoming Match Focus Areas
- Team Zenith: Focus on top lane pressure and early dragon control
- Team Omega: Prepare for aggressive early invades and mid lane roaming
- Team Nexus: Counter their late-game scaling composition

## Training Schedule Recommendations
- Monday: Split-push scenarios and 1-3-1 formations
- Wednesday: Baron/Dragon setup and vision control
- Friday: Team fight positioning and engage timing

## Key Performance Indicators to Track
- First blood rate
- Dragon control percentage
- Vision score delta
- Average gold difference at 15 minutes

This plan was generated by AI League Analysis Engine and should be reviewed by coaching staff.
`;

  // Create a blob
  const blob = new Blob([planContent], { type: 'text/plain' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `strategy_plan_${new Date().toISOString().split('T')[0]}.txt`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};