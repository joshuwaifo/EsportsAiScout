import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendIcon, BrainIcon, UserIcon, SparklesIcon, AlertTriangleIcon, GamepadIcon } from "lucide-react";
import { useCoach } from "@/context/CoachContext";
import { usePlayer } from "@/context/PlayerContext";
import { useMatch } from "@/context/MatchContext";
import { useGame } from "@/context/GameContext";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

// Types for our chat
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

export default function CoachQA() {
  const coach = useCoach();
  const { players, teamPlayers } = usePlayer();
  const { currentMatch, upcomingMatches, recentMatches } = useMatch();
  const { selectedGame } = useGame();
  const { toast } = useToast();
  
  // Update welcome message when game changes
  const getWelcomeMessage = () => {
    return `Welcome to AI Coach Q&A for **${selectedGame}**. I'm powered by GPT-4o and have full information about your team members, scouting prospects, and strategy data. Ask me anything about ${selectedGame} mechanics, strategy, or your team's performance!`;
  };
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: getWelcomeMessage(),
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  // Update welcome message when game changes
  useEffect(() => {
    setMessages([{
      id: "welcome",
      text: getWelcomeMessage(),
      isUser: false,
      timestamp: new Date()
    }]);
  }, [selectedGame]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Create context string from team data for AI consumption
  const generateContextData = () => {
    // Team members context
    const teamContext = coach.teamMembers.map(member => 
      `Team Member: ${member.name} (${member.role}/${member.position}), KDA: ${member.stats.kda}, Win Rate: ${member.stats.winRate}%`
    ).join("\n");
    
    // Team attributes context
    const attributesContext = coach.teamAttributes.map(attr => 
      `Team Attribute: ${attr.name} - ${Math.round(attr.value * 100)}%`
    ).join("\n");
    
    // Player prospects context
    const prospectsContext = coach.playerProspects.map(player => {
      const skills = player.skills.map(skill => `${skill.name}: ${skill.value}%`).join(", ");
      return `Scouting Prospect: ${player.name} (${player.role}/${player.position}), Match: ${player.matchPercentage}%, KDA: ${player.stats.kda}, Win Rate: ${player.stats.winRate}%, Skills: [${skills}], Tournaments: ${player.tournaments}, Rating: ${player.rating}`;
    }).join("\n");
    
    // Strategy recommendations context
    const strategyContext = `Draft Recommendations: ${coach.draftRecommendations.map(d => d.name).join(", ")}
Team Strongest Attribute: ${coach.teamAttributes.sort((a, b) => b.value - a.value)[0].name} (${Math.round(coach.teamAttributes.sort((a, b) => b.value - a.value)[0].value * 100)}%)
Team Weakest Attribute: ${coach.teamAttributes.sort((a, b) => a.value - b.value)[0].name} (${Math.round(coach.teamAttributes.sort((a, b) => a.value - b.value)[0].value * 100)}%)`;

    // Match context
    const matchContext = upcomingMatches && upcomingMatches.length > 0 
      ? `Upcoming Match: vs ${upcomingMatches[0].teams.away} on ${new Date(upcomingMatches[0].date).toLocaleDateString()}`
      : "No upcoming matches scheduled";
    
    // Combine all context
    return `
TEAM ROSTER:
${teamContext}

TEAM ATTRIBUTES:
${attributesContext}

SCOUTING PROSPECTS:
${prospectsContext}

STRATEGY DATA:
${strategyContext}

MATCH INFORMATION:
${matchContext}
`;
  };
  
  // Call the OpenAI API for chat response
  const getAIResponse = async (message: string): Promise<string> => {
    try {
      const contextData = generateContextData();
      
      const response = await apiRequest<{ response: string, model: string }>('/api/coach-chat', {
        method: 'POST',
        body: JSON.stringify({
          message,
          context: contextData,
          gameTitle: selectedGame // Send the selected game for context
        })
      });
      
      return response.response;
    } catch (error) {
      console.error("Error getting AI response:", error);
      throw error;
    }
  };
  
  // Fallback response if API fails
  const generateFallbackResponse = (question: string): string => {
    // Convert question to lowercase for easier matching
    const q = question.toLowerCase();
    
    // Check for player-specific questions
    const playerNameMentioned = [...coach.teamMembers, ...coach.playerProspects]
      .map(p => p.name.toLowerCase())
      .find(name => q.includes(name.toLowerCase()));
      
    if (playerNameMentioned) {
      const playerName = [...coach.teamMembers, ...coach.playerProspects]
        .find(p => p.name.toLowerCase() === playerNameMentioned)?.name;
        
      if (playerName) {
        const player = coach.getPlayerByName(playerName);
        
        if (player) {
          // Game-specific player info response
          const gameSpecificIntro = selectedGame === "Street Fighter" 
            ? `As a Street Fighter coach, I can tell you that ${playerName} `
            : selectedGame === "League of Legends"
            ? `From a League of Legends coaching perspective, ${playerName} `
            : selectedGame === "PUBG Mobile"
            ? `In PUBG Mobile analysis, ${playerName} `
            : selectedGame === "Tekken"
            ? `From a Tekken competitive standpoint, ${playerName} `
            : selectedGame === "King of Fighters"
            ? `As a KOF analyst, I'd say ${playerName} `
            : `${playerName} `;
          
          if (q.includes("stats") || q.includes("performance")) {
            const stats = 'stats' in player ? player.stats : null;
            if (stats) {
              // Game-specific stats response
              if (selectedGame === "Street Fighter" || selectedGame === "Tekken" || selectedGame === "King of Fighters") {
                return `${gameSpecificIntro}has a win rate of ${stats.winRate}% in tournament play. ${
                  stats.winRate > 65 ? `This is impressive and puts them in the top tier of ${selectedGame} competitors.` :
                  stats.winRate > 55 ? `This is a solid win rate that shows good matchup knowledge and execution.` :
                  `This win rate shows room for improvement with more matchup practice and combo training.`
                }`;
              } else {
                // For team-based games like LoL or PUBG
                return `${gameSpecificIntro}has a KDA of ${stats.kda} and a win rate of ${stats.winRate}%. ${
                  stats.winRate > 65 ? `This is an impressive win rate in ${selectedGame} competitive play.` :
                  stats.winRate > 55 ? `This is a solid win rate that indicates good team coordination.` :
                  `This win rate shows room for improvement with better ${selectedGame === "League of Legends" ? "lane control and objective focus" : "positioning and map rotations"}.`
                }`;
              }
            }
          }
          
          if (q.includes("skill") || q.includes("strength") || q.includes("weakness")) {
            if ('skills' in player) {
              const sortedSkills = [...player.skills].sort((a, b) => b.value - a.value);
              const strongest = sortedSkills[0];
              const weakest = sortedSkills[sortedSkills.length - 1];
              
              // Game-specific skills response
              return `${gameSpecificIntro}excels at ${strongest.name} (${strongest.value}%), ${
                selectedGame === "Street Fighter" ? "which is crucial for winning neutral and creating pressure in matches" :
                selectedGame === "League of Legends" ? "which significantly impacts their team's success in fights and objectives" :
                selectedGame === "PUBG Mobile" ? "which gives them an edge in positioning and late-game scenarios" :
                selectedGame === "Tekken" ? "giving them an advantage in critical match situations" :
                selectedGame === "King of Fighters" ? "which is essential for high-level KOF play" :
                "which contributes greatly to their success"
              }. They could improve their ${weakest.name} (${weakest.value}%), ${
                selectedGame === "Street Fighter" ? "which would help with defense and anti-airs" :
                selectedGame === "League of Legends" ? "which would enhance their early game presence" :
                selectedGame === "PUBG Mobile" ? "which would help in early engagements" :
                selectedGame === "Tekken" ? "which would make their defense more consistent" :
                selectedGame === "King of Fighters" ? "which would help against aggressive opponents" :
                "which would round out their skill set"
              }.`;
            }
          }
          
          // General player info with game context
          return `${gameSpecificIntro}is a ${player.position} player in the ${player.role} role. ${
            'stats' in player ? `They have a ${
              selectedGame === "League of Legends" ? `KDA of ${player.stats.kda} and a ` : ""
            }win rate of ${player.stats.winRate}%.` : ''
          } ${
            'tournaments' in player ? `They have participated in ${player.tournaments} ${selectedGame} tournaments and have a rating of ${player.rating}.` : ''
          }`;
        }
      }
    }
    
    // Strategy and other topics - game-specific
    if (q.includes("strategy") || q.includes("tactics")) {
      const gameSpecificStrategy = selectedGame === "Street Fighter" 
        ? "For Street Fighter, focus on mastering anti-airs, frame traps, and matchup knowledge. Analyze your opponent's habits and adapt your spacing accordingly."
        : selectedGame === "League of Legends"
        ? "In League of Legends, prioritize vision control, objective timing, and team composition synergy. Early dragon control leads to higher win rates."
        : selectedGame === "PUBG Mobile"
        ? "For PUBG Mobile, emphasize positional awareness, circle rotation planning, and vehicle management. Always prioritize survival over early engagements."
        : selectedGame === "Tekken"
        ? "In Tekken, focus on movement mastery, punishment knowledge, and matchup-specific counters. Korean backdash consistency is key to high-level defense."
        : selectedGame === "King of Fighters"
        ? "For KOF, team order strategy and meter management across characters are crucial. Develop specific strategies for your point, middle, and anchor positions."
        : "Develop strong fundamentals and consistent practice routines. Analyze your performance data to identify improvement areas.";
        
      return gameSpecificStrategy + " " + coach.getTeamWeakness();
    }
    
    if (q.includes("team") || q.includes("roster")) {
      const gameSpecificTeamAdvice = selectedGame === "Street Fighter" 
        ? "A strong Street Fighter team needs a diverse range of character specialists to handle different matchups in tournament play."
        : selectedGame === "League of Legends"
        ? "An effective League of Legends roster balances lane strength, champion diversity, and clearly defined shotcalling roles."
        : selectedGame === "PUBG Mobile"
        ? "A well-rounded PUBG Mobile squad needs clearly defined roles for scouting, support, fragging, and in-game leadership."
        : selectedGame === "Tekken"
        ? "For Tekken team tournaments, having players who specialize in different character archetypes gives you strategic flexibility."
        : selectedGame === "King of Fighters"
        ? "In KOF competition, team construction with complementary character specialists is essential for tournament success."
        : "A balanced team with diverse strengths can adapt to multiple opponents and scenarios.";
        
      return gameSpecificTeamAdvice + " " + coach.getTeamStrength();
    }
    
    // Game-specific default fallback response
    return `I'm temporarily using local analysis for ${selectedGame}. ${
      selectedGame === "Street Fighter" 
      ? "For detailed frame data, matchup analysis, or character-specific strategies,"
      : selectedGame === "League of Legends"
      ? "For in-depth champion matchups, team composition advice, or objective priority strategies,"
      : selectedGame === "PUBG Mobile" 
      ? "For detailed drop strategies, rotation tactics, or weapon loadout optimization,"
      : selectedGame === "Tekken"
      ? "For frame data analysis, combo optimization, or matchup-specific strategies,"
      : selectedGame === "King of Fighters"
      ? "For team composition advice, character synergy recommendations, or MAX mode strategies,"
      : "For comprehensive game insights and specific strategic recommendations,"
    } please try again when the advanced AI service is available.`;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    try {
      // Call GPT-4o API for response
      const aiResponse = await getAIResponse(userMessage.text);
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Show toast notification
      toast({
        title: "AI service unavailable",
        description: "Using fallback analysis mode. Some advanced features may be limited.",
        variant: "destructive"
      });
      
      // Add fallback AI response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateFallbackResponse(userMessage.text),
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-darkBg text-white">
      <Sidebar />
      
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top Navigation */}
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-surface shadow">
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">
              <h1 className="text-xl font-semibold text-white lg:hidden">AI<span className="text-accent">League</span></h1>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <PageHeader 
              title={`Coach Q&A - ${selectedGame}`}
              subtitle="Chat with your AI assistant coach for strategic insights"
              actions={
                <div className="flex space-x-2">
                  <div className="mr-2 bg-surface/80 text-white text-sm px-3 py-1.5 rounded-md flex items-center">
                    <GamepadIcon className="h-4 w-4 mr-1.5 text-accent" />
                    {selectedGame}
                  </div>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => setMessages([{
                      id: "welcome",
                      text: getWelcomeMessage(),
                      isUser: false,
                      timestamp: new Date()
                    }])}
                  >
                    <BrainIcon className="mr-2 h-4 w-4" />
                    Reset Chat
                  </Button>
                </div>
              }
            />

            <div className="px-4 mx-auto max-w-4xl sm:px-6 md:px-8 mt-6">
              <Card className="border-none bg-surface shadow-lg overflow-hidden flex flex-col h-[calc(100vh-220px)]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`flex max-w-[80%] items-start ${
                          message.isUser ? 'bg-primary text-white' : 
                          message.isError ? 'bg-amber-900/80 text-white' : 'bg-darkBg text-white'
                        } rounded-lg px-4 py-2 ${message.isError ? 'border border-amber-500/60' : ''}`}
                      >
                        {!message.isUser && (
                          message.isError ? 
                          <AlertTriangleIcon className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-amber-400" /> :
                          <BrainIcon className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                        )}
                        <div className="w-full">
                          <div className="text-sm prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown>
                              {message.text}
                            </ReactMarkdown>
                          </div>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.isUser && (
                          <UserIcon className="h-5 w-5 ml-2 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-darkBg text-white rounded-lg px-4 py-2 flex items-center">
                        <BrainIcon className="h-5 w-5 mr-2" />
                        <span className="text-sm">AI is typing<span className="animate-pulse">...</span></span>
                      </div>
                    </div>
                  )}
                  
                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
                
                <CardContent className="border-t border-gray-700 p-4">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={`Ask about ${selectedGame} strategy, mechanics, or your team...`}
                      className="flex-1 bg-white border-gray-700 focus:border-primary text-black"
                    />
                    <Button type="submit" disabled={!inputValue.trim() || isTyping}>
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}