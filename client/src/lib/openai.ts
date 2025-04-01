import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate an AI response for the Coach Q&A feature based on user query and game context
 */
export async function generateCoachResponse(
  query: string,
  gameTitle: string,
  teamContext: any, // Team, player and strategy data context
  chatHistory: Array<{ isUser: boolean; text: string }> // Previous conversation for context
): Promise<string> {
  try {
    // Define message role type
    type MessageRole = "system" | "user" | "assistant";
    
    // System prompt with game-specific context
    const systemPrompt = `You are an expert AI esports coach for ${gameTitle}. 
Your goal is to provide strategic advice, answer questions about game mechanics, 
suggest training regimens, and analyze player/team performance data.

${getGameSpecificPrompt(gameTitle)}

When analyzing data, focus on actionable insights. Be specific and detailed in your responses.
Format your response using markdown for better readability when appropriate.`;

    // Prepare context about the team, players, and strategies
    const contextPrompt = `Here's the current context about the team and players:
${JSON.stringify(teamContext, null, 2)}`;

    // Format messages for the API
    const messages: Array<{role: MessageRole, content: string}> = [
      { role: "system", content: systemPrompt },
      { role: "user", content: contextPrompt }
    ];
    
    // Add chat history if available
    if (chatHistory && chatHistory.length > 0) {
      chatHistory.forEach(msg => {
        messages.push({
          role: msg.isUser ? "user" : "assistant" as MessageRole,
          content: msg.text
        });
      });
    }
    
    // Add current query
    messages.push({ role: "user", content: query });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1200,
    });

    return response.choices[0].message.content || "I don't have a response for that at the moment.";
  } catch (error) {
    console.error("Error generating coach response:", error);
    throw new Error("Failed to get response from AI coach. Please try again later.");
  }
}

/**
 * Generate strategy recommendations based on team attributes and selected game
 */
export async function generateStrategyRecommendations(
  teamAttributes: any[],
  gameTitle: string,
  opponentInfo?: any
): Promise<{ overview: string, recommendations: string[], oneKeyStrategy: string }> {
  try {
    const prompt = `As an expert coach for ${gameTitle}, analyze these team attributes and provide strategic recommendations:
    
${JSON.stringify(teamAttributes, null, 2)}

${opponentInfo ? `Opponent information: ${JSON.stringify(opponentInfo, null, 2)}` : ''}

${getGameSpecificPrompt(gameTitle)}

Please provide:
1. A brief overview of the team's strengths and weaknesses
2. Three specific strategic recommendations based on the attributes
3. One key strategy that would be most effective given the team's profile

Format your response as JSON with the following structure:
{
  "overview": "Team overview text...",
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
  "oneKeyStrategy": "The single most important strategic focus..."
}`;

    type MessageRole = "system" | "user" | "assistant";
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system" as MessageRole, content: "You are an expert esports strategy analyst." },
        { role: "user" as MessageRole, content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      overview: result.overview || "No overview generated",
      recommendations: result.recommendations || ["No recommendations available"],
      oneKeyStrategy: result.oneKeyStrategy || "No key strategy identified"
    };
  } catch (error) {
    console.error("Error generating strategy recommendations:", error);
    throw new Error("Failed to generate strategy recommendations. Please try again later.");
  }
}

/**
 * Generate AI insights for the dashboard based on team and player data
 */
export async function generateAIInsights(
  teamData: any,
  playerData: any[],
  gameTitle: string
): Promise<Array<{
  type: 'tip' | 'stat' | 'warning';
  title: string;
  description: string;
}>> {
  try {
    const prompt = `As an expert coach for ${gameTitle}, analyze this team and player data and provide 3-5 key insights:
    
Team data: ${JSON.stringify(teamData, null, 2)}
Player data: ${JSON.stringify(playerData, null, 2)}

${getGameSpecificPrompt(gameTitle)}

For each insight, indicate whether it's a tip (advice), stat (interesting statistic), or warning (area needing improvement).

Format your response as JSON with an array of insights following this structure:
[
  {
    "type": "tip|stat|warning",
    "title": "Short, attention-grabbing title",
    "description": "Detailed explanation with specific recommendations if applicable"
  }
]`;

    type MessageRole = "system" | "user" | "assistant";
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system" as MessageRole, content: "You are an expert esports analytics AI." },
        { role: "user" as MessageRole, content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error generating AI insights:", error);
    throw new Error("Failed to generate insights. Please try again later.");
  }
}

/**
 * Get game-specific prompt information to guide the AI
 */
function getGameSpecificPrompt(gameTitle: string): string {
  switch (gameTitle) {
    case "Street Fighter":
      return `For Street Fighter, focus on:
- Character matchups and counter-picks
- Frame data and advantage states
- Anti-air options and defensive strategies
- Combo optimization and execution
- Adapting to opponents mid-match
- Resource management (Drive Gauge, Super Meter)
- Spacing and footsies
- Risk/reward assessment for special moves`;
      
    case "League of Legends":
      return `For League of Legends, focus on:
- Team composition and synergies
- Lane matchups and priority
- Objective control (Dragon, Baron, Towers)
- Warding strategies and vision control
- Build paths and item adaptations
- Team fighting positioning and execution
- Macro decision making and rotation timing
- Champion pool expansion based on meta`;
      
    case "PUBG Mobile":
      return `For PUBG Mobile, focus on:
- Drop locations and looting efficiency
- Circle positioning and rotation strategies
- Vehicle usage and positioning
- Squad coordination and communication
- Engagement decision-making (when to fight vs. avoid)
- Final circle tactics and positioning
- Weapon selection and attachments
- Map-specific strategies`;
      
    case "Tekken":
      return `For Tekken, focus on:
- Character-specific move lists and frame data
- Launchers and combo optimization
- Punishment strategies for unsafe moves
- Movement techniques (Korean Backdash, Wavedash)
- Okizeme and wake-up options
- Wall carry and wall combo opportunities
- Match-up knowledge and counter strategies
- Defensive options and breaking throws`;
      
    case "King of Fighters":
      return `For King of Fighters, focus on:
- Team order strategy (point, mid, anchor positions)
- Character synergy in the 3v3 format
- MAX mode usage and combo extensions
- Defensive options (rolls, guard cancel)
- Meter management across multiple characters
- Short hop and hyper hop pressure techniques
- Hit confirmation into optimal combos
- Match-up specific adaptations`;
      
    default:
      return "Focus on general esports principles like strategic adaptability, mechanical skill development, and mental fortitude under pressure.";
  }
}