import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

interface DraftPick {
  name: string;
  imageUrl?: string;
}

interface StrategyRecommendationProps {
  draftPicks: DraftPick[];
}

export default function StrategyRecommendation({ draftPicks }: StrategyRecommendationProps) {
  return (
    <Card className="overflow-hidden shadow-lg bg-surface bg-opacity-50 border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-white">AI Strategy Recommendations</h3>
        <div className="flex items-center mt-2 text-xs text-gray-400">
          <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Powered by Google Gemini 2.0</span>
        </div>
        
        <div className="p-4 mt-4 rounded-md bg-darkBg">
          <h4 className="font-medium text-white">Recommended Strategy vs Team Zenith</h4>
          <div className="mt-3 space-y-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                  <span className="text-xs font-medium text-white">1</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-white">
                  <span className="font-medium">Early Game:</span> 
                  Focus on aggressive top lane rotations. Team Zenith's top lane has shown weakness in early ganks (76% vulnerability rate).
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                  <span className="text-xs font-medium text-white">2</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-white">
                  <span className="font-medium">Mid Game:</span> 
                  Contest second and third Dragon spawns. Their mid-laner has poor vision control (38% below average).
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                  <span className="text-xs font-medium text-white">3</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-white">
                  <span className="font-medium">Late Game:</span> 
                  Split push strategy recommended. Their coordination breaks down in multi-lane pressure scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 mt-4 rounded-md bg-darkBg">
          <h4 className="font-medium text-white">Draft Recommendations</h4>
          <div className="grid grid-cols-5 gap-2 mt-3">
            {draftPicks.map((pick, index) => (
              <div key={index} className="text-center">
                <div className="overflow-hidden rounded-full w-14 h-14 mx-auto bg-[#121212]">
                  {pick.imageUrl ? (
                    <img 
                      src={pick.imageUrl} 
                      alt={pick.name} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-primary bg-opacity-30">
                      <span className="font-medium text-white">{pick.name.substring(0, 1)}</span>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs font-medium text-white">{pick.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <Button className="flex items-center justify-center w-full px-4 py-3 mt-4">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Generate Full Strategy Report
        </Button>
      </CardContent>
    </Card>
  );
}
