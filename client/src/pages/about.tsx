import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  InfoIcon, 
  ShieldIcon,
  DatabaseIcon,
  BrainIcon
} from "lucide-react";

export default function About() {
  return (
    <div className="flex h-screen overflow-hidden bg-darkBg text-white">
      <Sidebar />
      
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top Navigation */}
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-surface shadow">
          <button type="button" className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">
              <h1 className="text-xl font-semibold text-white lg:hidden">AI<span className="text-accent">League</span></h1>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none pb-16 lg:pb-0">
          <div className="py-6">
            <PageHeader 
              title="About AI League"
              subtitle="Information about our platform and ethical AI usage"
            />

            <div className="px-4 mx-auto mt-8 max-w-7xl sm:px-6 md:px-8">
              <div className="grid grid-cols-1 gap-6">
                {/* About Section */}
                <Card className="bg-surface border-none">
                  <CardHeader>
                    <div className="flex items-center">
                      <InfoIcon className="mr-2 h-6 w-6 text-primary" />
                      <CardTitle>About the Platform</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      AI League is an advanced esports analytics platform that leverages artificial intelligence 
                      to provide strategic insights, talent scouting, and performance analysis for esports teams 
                      and organizations.
                    </p>
                    <p className="mb-4">
                      Our platform combines real-time data analytics with multimodal AI analysis to help teams make 
                      better decisions, identify promising talent, and develop winning strategies.
                    </p>
                    <p>
                      Version: 1.0.0 | © 2023-2025 AI League | All Rights Reserved
                    </p>
                  </CardContent>
                </Card>

                {/* Ethical AI Usage */}
                <Card className="bg-surface border-none">
                  <CardHeader>
                    <div className="flex items-center">
                      <ShieldIcon className="mr-2 h-6 w-6 text-green-500" />
                      <CardTitle>Ethical AI Usage</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-medium mb-2">Our Commitments:</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>
                        <strong>Transparency:</strong> All AI-generated recommendations include confidence scores 
                        and explanations for how conclusions were reached.
                      </li>
                      <li>
                        <strong>Human oversight:</strong> AI recommendations are designed to augment human decision 
                        making, not replace it. Coaches and analysts maintain final authority.
                      </li>
                      <li>
                        <strong>Data privacy:</strong> Player data is handled with strict privacy controls. Personal 
                        information is protected according to global privacy standards.
                      </li>
                      <li>
                        <strong>Bias mitigation:</strong> Our AI systems are continually evaluated and improved to 
                        reduce potential biases in talent evaluation and strategy recommendations.
                      </li>
                      <li>
                        <strong>Fair competition:</strong> We design our tools to promote fair play and enhance the 
                        competitive esports ecosystem, not to create unfair advantages.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Data Sources */}
                <Card className="bg-surface border-none">
                  <CardHeader>
                    <div className="flex items-center">
                      <DatabaseIcon className="mr-2 h-6 w-6 text-blue-500" />
                      <CardTitle>Data Sources</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Our platform collects and analyzes data from multiple sources:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>Official tournament APIs and match data</li>
                      <li>Public player statistics and performance metrics</li>
                      <li>Historical match results and team compositions</li>
                      <li>Advanced in-game telemetry (with appropriate permissions)</li>
                      <li>Video analysis for style and technique evaluation</li>
                    </ul>
                    <p>
                      All data collection complies with appropriate terms of service and privacy regulations.
                    </p>
                  </CardContent>
                </Card>

                {/* AI Technology */}
                <Card className="bg-surface border-none">
                  <CardHeader>
                    <div className="flex items-center">
                      <BrainIcon className="mr-2 h-6 w-6 text-purple-500" />
                      <CardTitle>AI Technology</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Our platform utilizes state-of-the-art multimodal AI models to analyze both structured data 
                      (statistics, match results) and unstructured content (game footage, player behavior):
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>Advanced natural language processing for strategy development</li>
                      <li>Computer vision for gameplay analysis and pattern recognition</li>
                      <li>Predictive analytics for match outcome and player performance forecasting</li>
                      <li>Recommendation systems for talent scouting and team composition</li>
                    </ul>
                    <p>
                      Our AI models are continuously trained on the latest esports data to ensure accuracy and relevance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}