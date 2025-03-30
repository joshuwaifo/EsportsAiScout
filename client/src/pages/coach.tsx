import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendIcon, BrainIcon, UserIcon } from "lucide-react";

// Types for our chat
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// AI response generator (mock for now)
const generateAIResponse = (question: string): string => {
  // Convert question to lowercase for easier matching
  const q = question.toLowerCase();
  
  // Simple rules-based responses
  if (q.includes("strategy") || q.includes("tactics")) {
    return "Based on our team's strengths in objective control, I recommend focusing on early dragon control while maintaining strong vision in the river. Consider drafting champions with good mobility to contest these objectives.";
  }
  
  if (q.includes("draft") || q.includes("pick") || q.includes("ban")) {
    return "For your upcoming match against Team Zenith, I recommend banning their mid-laner's signature champion (Nova). They have a 75% win rate on this pick and it enables their roaming playstyle that has been effective against defensive teams.";
  }
  
  if (q.includes("player") || q.includes("roster") || q.includes("team")) {
    return "Looking at your current roster, ShadowStriker is performing exceptionally well with a 4.2 KDA ratio in recent matches. However, I noticed that BlitzMaster has been struggling in the top lane with a 48% win rate. Consider giving them more practice time on tanks rather than carry champions.";
  }
  
  if (q.includes("weakness") || q.includes("improve")) {
    return "The team's primary weakness appears to be vision control, especially in the mid-game. Your average vision score is 30% below similar ranked teams. Try implementing a rotation pattern where supports and junglers coordinate their ward placements around upcoming objectives.";
  }
  
  if (q.includes("strength") || q.includes("advantage")) {
    return "Your team excels in late-game teamfights with a 68% win rate in games that go beyond 35 minutes. This is significantly above average and suggests you should consider compositions that can safely scale into the late game.";
  }
  
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! I'm your AI coaching assistant. How can I help with your team's strategy or player analysis today?";
  }
  
  // Default response for queries that don't match specific patterns
  return "I've analyzed your question and would need more specific details about your team or players to provide targeted advice. Could you clarify if you're asking about strategy, player performance, or draft recommendations?";
};

export default function CoachQA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to AI Coach Q&A. Ask me anything about strategies, player performance, or upcoming matches!",
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
                    text: "Welcome to AI Coach Q&A. Ask me anything about strategies, player performance, or upcoming matches!",
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