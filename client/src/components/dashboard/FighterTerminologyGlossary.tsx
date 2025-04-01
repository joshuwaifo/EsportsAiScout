import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookIcon, 
  SearchIcon, 
  TagIcon
} from "lucide-react";

interface TermDefinition {
  term: string;
  definition: string;
  category: 'fundamentals' | 'mechanics' | 'offense' | 'defense' | 'strategy';
}

interface FighterTerminologyGlossaryProps {
  initialExpanded?: boolean;
}

export default function FighterTerminologyGlossary({ initialExpanded = false }: FighterTerminologyGlossaryProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Street Fighter terminology glossary
  const glossary: TermDefinition[] = [
    {
      term: "Anti-Air",
      definition: "Attacks used to counter an opponent's jump-in attempt. Typically uppercut-style moves like Shoryuken.",
      category: "defense"
    },
    {
      term: "Frame Trap",
      definition: "A sequence where there is a small gap between attacks that can bait an opponent into attempting a counter, allowing you to punish them.",
      category: "offense"
    },
    {
      term: "Footsies",
      definition: "The ground-based neutral game where players position themselves to control space and bait opponents into making mistakes.",
      category: "fundamentals"
    },
    {
      term: "Punish Counter",
      definition: "In SF6, a counter-hit that occurs when hitting an opponent during the recovery of their move, causing increased damage and hitstun.",
      category: "mechanics"
    },
    {
      term: "Drive Impact",
      definition: "In SF6, an armored attack that can absorb hits and cause a wall splat when it connects, leading to a combo opportunity.",
      category: "mechanics"
    },
    {
      term: "Perfect Parry",
      definition: "In SF6, a precisely timed defensive action that, when successful, puts the opponent in a highly vulnerable state.",
      category: "defense"
    },
    {
      term: "Drive Rush",
      definition: "In SF6, a mechanic that consumes Drive Gauge to perform a quick dash that can cancel into attacks.",
      category: "mechanics"
    },
    {
      term: "Oki",
      definition: "The pressure and mix-up situation that occurs when your opponent is getting up from a knockdown.",
      category: "offense"
    },
    {
      term: "Shimmy",
      definition: "A fighting game technique where you walk back slightly to bait out a throw attempt, then punish the whiffed throw.",
      category: "strategy"
    },
    {
      term: "Meaty",
      definition: "Timing an attack to hit an opponent as they're waking up, making the attack active on the first frame they become vulnerable.",
      category: "offense"
    },
  ];
  
  // Filter terms based on search input
  const filteredTerms = searchTerm.trim() === '' 
    ? glossary 
    : glossary.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Get category label and color
  const getCategoryDisplay = (category: string) => {
    switch (category) {
      case 'fundamentals':
        return { label: 'Fundamentals', color: 'bg-blue-600 text-white' };
      case 'mechanics':
        return { label: 'Mechanics', color: 'bg-purple-600 text-white' };
      case 'offense':
        return { label: 'Offense', color: 'bg-red-600 text-white' };
      case 'defense':
        return { label: 'Defense', color: 'bg-green-600 text-white' };
      case 'strategy':
        return { label: 'Strategy', color: 'bg-yellow-600 text-black' };
      default:
        return { label: 'Other', color: 'bg-gray-600 text-white' };
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg bg-surface bg-opacity-50 border-none">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-900/70 to-indigo-900/70 pb-2">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <BookIcon className="h-5 w-5 mr-2 text-blue-400" />
          Fighter Terminology
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-transparent border-white/20 hover:bg-white/10 text-white"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="p-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-darkBg text-white border-gray-700"
            />
          </div>
          
          <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {filteredTerms.map((item, index) => (
              <div key={index} className="p-3 rounded-md bg-darkBg border border-gray-800">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <TagIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-white mr-2">{item.term}</p>
                      <span>
                        <Badge 
                          className={`text-[0.6rem] ${getCategoryDisplay(item.category).color}`}
                        >
                          {getCategoryDisplay(item.category).label}
                        </Badge>
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">{item.definition}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredTerms.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                <p>No matching terms found.</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
      
      {!isExpanded && (
        <CardContent className="p-4">
          <p className="text-sm text-gray-400">
            Expand to view a glossary of important Street Fighter terminology and concepts to help you understand match analysis.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Footsies', 'Frame Trap', 'Anti-Air', 'Drive Impact', 'Punish Counter'].map((term, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {term}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">+{glossary.length - 5} more</Badge>
          </div>
        </CardContent>
      )}
    </Card>
  );
}