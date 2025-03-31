import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendIcon, BrainIcon, UserIcon, SparklesIcon } from "lucide-react";
import { useCoach } from "@/context/CoachContext";
import { usePlayer } from "@/context/PlayerContext";
import { useMatch } from "@/context/MatchContext";

// Types for our chat
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function CoachQA() {
  const coach = useCoach();
  const { players, teamPlayers } = usePlayer();
  const { currentMatch, upcomingMatches, recentMatches } = useMatch();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to AI Coach Q&A. I have full information about your team members, scouting prospects, and strategy data. Ask me anything!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Enhanced AI response generator with full context
  const generateAIResponse = (question: string): string => {
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
          if (q.includes("stats") || q.includes("performance")) {
            const stats = 'stats' in player ? player.stats : null;
            if (stats) {
              return `${playerName}'s current statistics show a KDA of ${stats.kda} and a win rate of ${stats.winRate}%. ${
                stats.winRate > 65 ? `This is an impressive win rate that puts them in the top tier of players in their role.` :
                stats.winRate > 55 ? `This is a solid win rate that indicates good consistency.` :
                `This win rate shows room for improvement with focused practice.`
              }`;
            }
          }
          
          if (q.includes("skill") || q.includes("strength") || q.includes("weakness")) {
            if ('skills' in player) {
              const sortedSkills = [...player.skills].sort((a, b) => b.value - a.value);
              const strongest = sortedSkills[0];
              const weakest = sortedSkills[sortedSkills.length - 1];
              
              return `${playerName}'s analysis shows their greatest strength is ${strongest.name} at ${strongest.value}%, while their area for improvement is ${weakest.name} at ${weakest.value}%. ${
                strongest.value > 90 ? `Their ${strongest.name} is exceptional and should be leveraged in team strategy.` :
                `Focused training on ${weakest.name} could significantly improve their overall performance.`
              }`;
            }
          }
          
          // General player info
          return `${playerName} is a ${player.position} player in the ${player.role} role. ${
            'stats' in player ? `They have a KDA of ${player.stats.kda} and a win rate of ${player.stats.winRate}%.` : ''
          } ${
            'tournaments' in player ? `They have participated in ${player.tournaments} tournaments and have a rating of ${player.rating}.` : ''
          }`;
        }
      }
    }
    
    // Check for player comparison
    if (q.includes(" vs ") || q.includes(" versus ") || q.includes("compare")) {
      const allPlayers = [...coach.teamMembers, ...coach.playerProspects].map(p => p.name.toLowerCase());
      const mentionedPlayers = allPlayers.filter(name => q.includes(name));
      
      if (mentionedPlayers.length >= 2) {
        const player1 = [...coach.teamMembers, ...coach.playerProspects]
          .find(p => p.name.toLowerCase() === mentionedPlayers[0])?.name;
        const player2 = [...coach.teamMembers, ...coach.playerProspects]
          .find(p => p.name.toLowerCase() === mentionedPlayers[1])?.name;
          
        if (player1 && player2) {
          return coach.getPlayerComparison(player1, player2);
        }
      }
    }
    
    // Strategy questions
    if (q.includes("strategy") || q.includes("tactics") || q.includes("game plan")) {
      // Check for specific attribute strategy
      const attributeMentioned = coach.teamAttributes
        .map(attr => attr.name.toLowerCase())
        .find(name => q.includes(name.toLowerCase()));
        
      if (attributeMentioned) {
        const attrName = coach.teamAttributes
          .find(attr => attr.name.toLowerCase() === attributeMentioned)?.name;
          
        if (attrName) {
          return coach.getStrategyForAttribute(attrName);
        }
      }
      
      // General strategy based on team composition
      return `Based on your team's attributes, I recommend focusing on ${
        coach.teamAttributes.sort((a, b) => b.value - a.value)[0].name
      } which is your strongest area at ${
        Math.round(coach.teamAttributes.sort((a, b) => b.value - a.value)[0].value * 100)
      }%. For your next match against ${
        upcomingMatches && upcomingMatches.length > 0 ? upcomingMatches[0].teams.away : "upcoming opponents"
      }, consider drafting champions that excel in this area like ${
        coach.draftRecommendations.slice(0, 2).map(d => d.name).join(" and ")
      }.`;
    }
    
    // Draft and picks
    if (q.includes("draft") || q.includes("pick") || q.includes("ban")) {
      return `Based on analysis of your team's strengths and upcoming opponents, I recommend the following draft picks: ${
        coach.draftRecommendations.map(d => d.name).join(", ")
      }. These picks complement your team's strength in ${
        coach.teamAttributes.sort((a, b) => b.value - a.value)[0].name
      } and address your weaker ${
        coach.teamAttributes.sort((a, b) => a.value - b.value)[0].name
      } attribute.`;
    }
    
    // Team composition
    if (q.includes("roster") || q.includes("team composition")) {
      const teamRoles = coach.teamMembers.map(member => 
        `${member.name} (${member.role}/${member.position}, KDA: ${member.stats.kda}, Win Rate: ${member.stats.winRate}%)`
      ).join("\n- ");
      
      return `Your current team roster consists of:\n- ${teamRoles}\n\nOverall team strengths include ${
        coach.teamAttributes.sort((a, b) => b.value - a.value).slice(0, 2).map(attr => attr.name).join(" and ")
      }, while areas for improvement include ${
        coach.teamAttributes.sort((a, b) => a.value - b.value).slice(0, 2).map(attr => attr.name).join(" and ")
      }.`;
    }
    
    // Team weaknesses
    if (q.includes("weakness") || q.includes("improve")) {
      return coach.getTeamWeakness();
    }
    
    // Team strengths
    if (q.includes("strength") || q.includes("advantage")) {
      return coach.getTeamStrength();
    }
    
    // Greetings
    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return "Hello! I'm your AI coaching assistant with full access to your team's data, player profiles, and strategy information. How can I help you today?";
    }
    
    // Default response with context
    return `I have information about your team's performance metrics, player profiles, and strategy data. I can analyze specific players like ${
      coach.teamMembers[0].name
    } or ${
      coach.teamMembers[1].name
    }, compare players, suggest strategies to improve your ${
      coach.teamAttributes.sort((a, b) => a.value - b.value)[0].name
    } (your weakest attribute), or recommend draft picks for upcoming matches. What specific aspect would you like insights on?`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Simulate AI thinking delay (0.5 - 1.5 seconds)
    setTimeout(() => {
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(userMessage.text),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500);
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
              title="Coach Q&A"
              subtitle="Chat with your AI assistant coach for strategic insights"
              actions={
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => setMessages([{
                    id: "welcome",
                    text: "Welcome to AI Coach Q&A. I have full information about your team members, scouting prospects, and strategy data. Ask me anything!",
                    isUser: false,
                    timestamp: new Date()
                  }])}
                >
                  <BrainIcon className="mr-2 h-4 w-4" />
                  Reset Chat
                </Button>
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
                          message.isUser ? 'bg-primary text-white' : 'bg-darkBg text-white'
                        } rounded-lg px-4 py-2`}
                      >
                        {!message.isUser && (
                          <BrainIcon className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-sm">{message.text}</p>
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
                      placeholder="Ask a question about your team or strategy..."
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