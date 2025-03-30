import { BoltIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TeamAttribute } from "@/types";

interface OneKeyStrategyProps {
  teamAttributes: TeamAttribute[];
}

export default function OneKeyStrategy({ teamAttributes }: OneKeyStrategyProps) {
  // Find the weakest attribute (lowest value)
  const weakestAttribute = [...teamAttributes].sort((a, b) => a.value - b.value)[0];
  
  // Generate a key strategy message based on the weakest attribute
  const getKeyStrategyMessage = (attribute: TeamAttribute) => {
    const percentage = Math.round(attribute.value * 100);
    
    switch(attribute.name) {
      case "Offense":
        return `Boost offensive capabilities by focusing on aggressive timing and coordination (current team offense score is ${percentage}%).`;
      case "Defense":
        return `Strengthen defensive positioning and improve peel coordination for carries (current team defense score is ${percentage}%).`;
      case "TeamFight":
        return `Practice team fight scenarios to improve coordination and target prioritization (current team fight score is ${percentage}%).`;
      case "Objectives":
        return `Improve objective control with better timing and vision setup around key map areas (current objective control score is ${percentage}%).`;
      case "Vision":
        return `Enhance vision control through strategic warding and map awareness (current team vision score is ${percentage}%).`;
      case "Adaptability":
        return `Work on team flexibility to respond to unexpected opponent strategies (current adaptability score is ${percentage}%).`;
      default:
        return `Focus on improving ${attribute.name.toLowerCase()} which is currently at ${percentage}%.`;
    }
  };

  return (
    <Card className="bg-primary bg-opacity-10 border-primary border-2 mb-6 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary bg-opacity-20 mr-4">
            <BoltIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center">
              One Key Strategy
              <span className="ml-2 text-xs py-1 px-2 rounded-full bg-primary bg-opacity-20 text-primary">
                High Priority
              </span>
            </h3>
            <p className="text-white mt-2">
              <span className="font-semibold text-primary">{weakestAttribute.name} ({Math.round(weakestAttribute.value * 100)}%):</span> {getKeyStrategyMessage(weakestAttribute)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}