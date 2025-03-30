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
import jsPDF from 'jspdf';

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
              <Button 
                onClick={() => {
                  // Generate and download PDF report
                  generatePdfReport(teamAttributes);
                  onClose();
                }} 
                className="flex-1"
              >
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

// Export data functionality as CSV (Excel-compatible)
export const exportTeamData = (teamAttributes: TeamAttribute[]) => {
  // Create CSV header row
  let csvContent = "Attribute,Value,Description\n";
  
  // Add date row
  csvContent += `Export Date,${new Date().toLocaleString()},"Generated by AILeague Analytics"\n`;
  csvContent += `Team Name,Team Alpha,"Official Team Profile"\n`;
  csvContent += '\n';
  
  // Add attributes data
  csvContent += "TEAM ATTRIBUTES\n";
  teamAttributes.forEach(attr => {
    // Escape any commas in the name
    const escapedName = attr.name.includes(',') ? `"${attr.name}"` : attr.name;
    csvContent += `${escapedName},${attr.value},"Team metric on scale of 0-100"\n`;
  });
  
  // Add stats section
  csvContent += '\n';
  csvContent += "TEAM STATISTICS\n";
  csvContent += "Win Rate,68%,\"Current season performance\"\n";
  csvContent += "Tournament Standing,3,\"Current league position\"\n";
  csvContent += "Average Match Duration,32:17,\"Time in minutes:seconds\"\n";
  csvContent += "Total Matches,143,\"All competitive matches\"\n";
  
  // Create a blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `team_data_export_${new Date().toISOString().split('T')[0]}.csv`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// PDF Generation Function
export const generatePdfReport = (teamAttributes: TeamAttribute[]) => {
  try {
    // Create new PDF document
    const doc = new jsPDF();
    const reportName = generateReportName();
    const date = new Date().toLocaleString();
    
    // Add header
    doc.setFontSize(22);
    doc.setTextColor(0, 71, 187);  // Blue color
    doc.text("AI League Strategy Report", 105, 20, { align: 'center' });
    
    // Add report info
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);  // Gray color
    doc.text(`Generated: ${date}`, 105, 30, { align: 'center' });
    doc.text("Team Alpha Profile", 105, 38, { align: 'center' });
    
    // Add separator line
    doc.setDrawColor(0, 71, 187);  // Blue color
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    // Executive Summary
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);  // Black color
    doc.text("Executive Summary", 20, 55);
    
    doc.setFontSize(11);
    doc.text("This comprehensive report provides a detailed analysis of Team Alpha's performance,", 20, 65);
    doc.text("strengths, weaknesses, and strategic recommendations for upcoming matches.", 20, 72);
    
    // Team Attributes Section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Team Attributes", 20, 90);
    
    // Set up attributes table
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    teamAttributes.forEach((attr, index) => {
      const yPos = 100 + (index * 7);
      
      // Draw progress bar background
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(220, 220, 220);
      doc.roundedRect(90, yPos - 1, 80, 5, 1, 1, 'F');
      
      // Draw progress bar filled portion
      doc.setDrawColor(0, 71, 187);
      doc.setFillColor(0, 71, 187);
      const width = Math.min(attr.value * 0.8, 80); // Scale to max width of 80
      doc.roundedRect(90, yPos - 1, width, 5, 1, 1, 'F');
      
      // Add attribute name and value
      doc.setTextColor(0, 0, 0);
      doc.text(attr.name, 20, yPos + 2);
      doc.text(`${attr.value}%`, 180, yPos + 2, { align: 'right' });
    });
    
    // Team Performance Section
    const perfY = 150;
    doc.setFontSize(16);
    doc.text("Current Performance", 20, perfY);
    
    doc.setFontSize(10);
    doc.text("Win Rate: 68%", 20, perfY + 10);
    doc.text("Tournament Standing: 3rd Place", 20, perfY + 20);
    doc.text("Average Match Duration: 32:17", 20, perfY + 30);
    doc.text("Total Matches: 143", 20, perfY + 40);
    
    // Strategic Recommendations
    const stratY = 200;
    doc.setFontSize(16);
    doc.text("Strategic Recommendations", 20, stratY);
    
    doc.setFontSize(10);
    const recommendations = [
      "Focus training on improving objective control",
      "Develop more flexible drafting strategies",
      "Enhance early game coordination",
      "Practice split-push decision making"
    ];
    
    recommendations.forEach((rec, index) => {
      const yPos = stratY + 10 + (index * 7);
      doc.text(`${index + 1}. ${rec}`, 20, yPos);
    });
    
    // Upcoming Matches
    const matchY = 240;
    doc.setFontSize(16);
    doc.text("Upcoming Matches", 20, matchY);
    
    doc.setFontSize(10);
    const matches = [
      { opponent: "Team Zenith", winProbability: 76 },
      { opponent: "Team Omega", winProbability: 68 },
      { opponent: "Team Nexus", winProbability: 62 }
    ];
    
    matches.forEach((match, index) => {
      const yPos = matchY + 10 + (index * 7);
      doc.text(match.opponent, 20, yPos);
      doc.text(`Win Probability: ${match.winProbability}%`, 120, yPos);
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by AI League Analytics Engine. Confidential.", 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save(`${reportName}.pdf`);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
    return false;
  }
};

// React component wrapper for strategy functions
export function StrategyFunctions() {
  return null; // This is just to make the exports consistent for React's HMR
}

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