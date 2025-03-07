import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LightbulbIcon, ChartLineIcon, AlertTriangleIcon, PlusIcon } from "lucide-react";

interface Insight {
  type: 'tip' | 'stat' | 'warning';
  title: string;
  description: string;
}

interface AIInsightsProps {
  insights: Insight[];
}

export default function AIInsights({ insights }: AIInsightsProps) {
  // Function to get icon based on insight type
  const getIcon = (type: string) => {
    switch(type) {
      case 'tip':
        return <LightbulbIcon className="h-4 w-4" />;
      case 'stat':
        return <ChartLineIcon className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangleIcon className="h-4 w-4" />;
      default:
        return <LightbulbIcon className="h-4 w-4" />;
    }
  };

  // Function to get background color based on insight type
  const getBgColor = (type: string) => {
    switch(type) {
      case 'tip':
        return 'bg-secondary';
      case 'stat':
        return 'bg-[#39FF14]';
      case 'warning':
        return 'bg-orange-500';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg bg-surface bg-opacity-50 border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white">AI Insights</h3>
        <div className="flex items-center mt-2 text-xs text-gray-400">
          <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" fill="currentColor"/>
          </svg>
          <span>Last updated: 3 minutes ago</span>
        </div>
        
        <div className="mt-4 space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-3 rounded-md bg-darkBg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className={`p-1 text-xs text-white rounded ${getBgColor(insight.type)}`}>
                    {getIcon(insight.type)}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {insight.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <Button className="w-full mt-2" size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            Generate More Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
