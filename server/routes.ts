import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertPlayerSchema, insertMatchSchema, insertTeamSchema, insertStrategySchema } from "@shared/schema";
import OpenAI from "openai";
import multer from "multer";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

// Set up OpenAI client with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Generate unique filename with original extension
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept only specific file types
    const allowedTypes = ['.csv', '.json', '.xlsx', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only CSV, JSON, Excel, JPG, JPEG and PNG are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for players
  app.get("/api/players", async (req, res) => {
    try {
      const players = await storage.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ message: "Failed to fetch players" });
    }
  });

  app.get("/api/players/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid player ID" });
      }
      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json(player);
    } catch (error) {
      console.error("Error fetching player:", error);
      res.status(500).json({ message: "Failed to fetch player" });
    }
  });

  app.post("/api/players", async (req, res) => {
    try {
      const validatedData = insertPlayerSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid player data", 
          errors: validatedData.error.errors 
        });
      }
      const player = await storage.createPlayer(validatedData.data);
      res.status(201).json(player);
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ message: "Failed to create player" });
    }
  });

  // API routes for teams
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  });

  app.get("/api/teams/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid team ID" });
      }
      const team = await storage.getTeam(id);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      res.json(team);
    } catch (error) {
      console.error("Error fetching team:", error);
      res.status(500).json({ message: "Failed to fetch team" });
    }
  });

  app.post("/api/teams", async (req, res) => {
    try {
      const validatedData = insertTeamSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid team data", 
          errors: validatedData.error.errors 
        });
      }
      const team = await storage.createTeam(validatedData.data);
      res.status(201).json(team);
    } catch (error) {
      console.error("Error creating team:", error);
      res.status(500).json({ message: "Failed to create team" });
    }
  });

  // API routes for matches
  app.get("/api/matches", async (req, res) => {
    try {
      const matches = await storage.getAllMatches();
      res.json(matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  app.get("/api/matches/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid match ID" });
      }
      const match = await storage.getMatch(id);
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }
      res.json(match);
    } catch (error) {
      console.error("Error fetching match:", error);
      res.status(500).json({ message: "Failed to fetch match" });
    }
  });

  app.post("/api/matches", async (req, res) => {
    try {
      const validatedData = insertMatchSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid match data", 
          errors: validatedData.error.errors 
        });
      }
      const match = await storage.createMatch(validatedData.data);
      res.status(201).json(match);
    } catch (error) {
      console.error("Error creating match:", error);
      res.status(500).json({ message: "Failed to create match" });
    }
  });

  // API routes for strategies
  app.get("/api/strategies", async (req, res) => {
    try {
      const strategies = await storage.getAllStrategies();
      res.json(strategies);
    } catch (error) {
      console.error("Error fetching strategies:", error);
      res.status(500).json({ message: "Failed to fetch strategies" });
    }
  });

  app.get("/api/strategies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid strategy ID" });
      }
      const strategy = await storage.getStrategy(id);
      if (!strategy) {
        return res.status(404).json({ message: "Strategy not found" });
      }
      res.json(strategy);
    } catch (error) {
      console.error("Error fetching strategy:", error);
      res.status(500).json({ message: "Failed to fetch strategy" });
    }
  });

  app.post("/api/strategies", async (req, res) => {
    try {
      const validatedData = insertStrategySchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid strategy data", 
          errors: validatedData.error.errors 
        });
      }
      const strategy = await storage.createStrategy(validatedData.data);
      res.status(201).json(strategy);
    } catch (error) {
      console.error("Error creating strategy:", error);
      res.status(500).json({ message: "Failed to create strategy" });
    }
  });

  // AI Analysis endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { type, data } = req.body;
      
      if (!type || !data) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      // In a real application, this would connect to an AI service
      // For now, we'll return mock data based on the type
      let analysis;
      
      switch (type) {
        case 'player':
          analysis = {
            strengths: ["Strong mechanical skills", "Excellent map awareness", "High KDA ratio"],
            weaknesses: ["Limited champion pool", "Inconsistent team play"],
            recommendedRole: "Mid Lane",
            matchPercentage: 87
          };
          break;
        case 'team':
          analysis = {
            strengths: ["Superior objective control", "Coordinated team fights", "Strong late game"],
            weaknesses: ["Vulnerable early game", "Limited vision control"],
            recommendedStrategy: "Focus on scaling to late game with defensive early positioning"
          };
          break;
        case 'match':
          analysis = {
            winProbability: 68,
            keyFactors: ["Mid lane dominance", "Dragon control", "Vision score"],
            recommendedPicks: ["Zed", "Nova", "Orion", "Trinity", "Vortex"]
          };
          break;
        default:
          return res.status(400).json({ message: "Invalid analysis type" });
      }
      
      res.json({ analysis });
    } catch (error) {
      console.error("Error performing analysis:", error);
      res.status(500).json({ message: "Failed to perform analysis" });
    }
  });

  // Coach Q&A AI chat endpoint with game-specific context
  app.post("/api/coach-chat", async (req, res) => {
    try {
      const { message, context, gameTitle, chatHistory } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }
      
      console.log("Processing coach chat message:", message.substring(0, 100) + "...");
      console.log(`Game context: ${gameTitle || 'Not specified'}`);
      
      try {
        // Prepare game-specific guidance for the AI
        let gameContext = "";
        if (gameTitle) {
          switch (gameTitle) {
            case "Street Fighter":
              gameContext = `Focus on Street Fighter mechanics including:
                - Frame data analysis and advantage states
                - Matchup knowledge and character-specific strategies
                - Anti-air techniques and defensive options
                - Combo optimization and execution tips
                - Meter/resource management (Drive Gauge, Super Meter)
                - Footsies and neutral game concepts
                - Adaptation strategies mid-match`;
              break;
            case "League of Legends":
              gameContext = `Focus on League of Legends concepts including:
                - Team composition and champion synergies
                - Lane matchups and wave management
                - Objective control (Dragon, Baron, Herald)
                - Warding strategies and vision control
                - Item builds and power spikes
                - Teamfight positioning and engagement timing
                - Macro decision making and rotations`;
              break;
            case "PUBG Mobile":
              gameContext = `Focus on PUBG Mobile strategies including:
                - Drop locations and loot prioritization
                - Circle positioning and rotation tactics
                - Vehicle usage and positioning
                - Squad coordination and communication
                - Engagement decision-making
                - Final circle tactics and positioning
                - Weapon selection and attachments`;
              break;
            case "Tekken":
              gameContext = `Focus on Tekken mechanics including:
                - Move list knowledge and frame data
                - Combo optimization and wall carry techniques
                - Punishment strategies and matchup knowledge
                - Movement techniques (Korean Backdash, Wavedash)
                - Okizeme and wake-up options
                - Throw breaking and defensive options
                - Character-specific strategies`;
              break;
            case "King of Fighters":
              gameContext = `Focus on King of Fighters concepts including:
                - Team order strategy (point, mid, anchor positions)
                - Character synergy in the 3v3 format
                - MAX mode usage and combo extensions
                - Defensive options (rolls, guard cancel)
                - Meter management across multiple characters
                - Short hop and hyper hop techniques
                - Match-up specific adaptations`;
              break;
            default:
              gameContext = "Focus on general esports concepts including mechanical skill, strategic thinking, and mental fortitude.";
          }
        }
        
        // Define message role type for proper typing
        type MessageRole = "system" | "user" | "assistant";
        
        // Prepare system message
        const systemContent = `You are an AI esports coach assistant specializing in ${gameTitle || "various esports games"}.
        
        ${gameContext}
        
        CONTEXT INFORMATION:
        ${context || "No specific context provided."}
        
        PLATFORM FEATURES AVAILABLE:
        - Dashboard: Displays team performance metrics, recent matches, and AI insights
        - Prospect Scouting: Tool for evaluating potential team additions with compatibility scoring
        - Team Battle Scouting: Analyze 5v5 team compositions and matchups with character-specific data
        - Strategy Builder: Create and adapt game-specific strategies based on team strengths
        - Training Plans: Track key performance indicators and provide targeted improvement drills
        - Community Leaderboard: View top players, their achievements, and performance statistics
        - Guides: Access tutorial content for game mechanics, including special move inputs
        
        When answering user questions, reference these platform features when relevant to provide comprehensive support.
        
        Use this context to provide detailed, personalized responses about players, team strategy, game tactics, and performance metrics.
        Always consider the context information when answering questions.
        Be helpful, detailed, and focused on esports coaching and strategy.
        Format your response using markdown for better readability when appropriate.
        Your responses should be conversational but highly informative.`;
        
        // Format chat history if provided
        const formattedHistory = Array.isArray(chatHistory) ? 
          chatHistory.map(msg => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.text
          })) : [];
        
        // Prepare messages array with proper typing
        const messages: Array<{role: MessageRole, content: string}> = [
          { role: "system", content: systemContent }
        ];
        
        // Add chat history if available
        if (formattedHistory && formattedHistory.length > 0) {
          formattedHistory.forEach(msg => {
            messages.push({
              role: (msg.role === "user" ? "user" : "assistant") as MessageRole,
              content: msg.content
            });
          });
        }
        
        // Add current user message
        messages.push({ role: "user", content: message });
        
        // Call OpenAI API with enhanced context
        const aiResponse = await openai.chat.completions.create({
          model: "gpt-4o", // Use GPT-4o for enhanced capabilities
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
        });
        
        console.log("Received response from OpenAI GPT-4o");
        
        // Return the AI response
        res.json({ 
          response: aiResponse.choices[0].message.content,
          model: aiResponse.model
        });
        
      } catch (aiError) {
        console.error("OpenAI API Error:", aiError);
        res.status(500).json({ 
          message: "Error processing your request with AI service", 
          error: aiError instanceof Error ? aiError.message : "Unknown AI error" 
        });
      }
    } catch (error) {
      console.error("Error in coach chat:", error);
      res.status(500).json({ 
        message: "Failed to process chat message", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Strategy AI endpoint for player scouting and analysis
  app.post("/api/strategy", upload.single('file'), async (req, res) => {
    try {
      // Validate request body
      const { playerName, gameType } = req.body;
      
      if (!playerName) {
        return res.status(400).json({ message: "Player name is required" });
      }
      
      console.log(`Analyzing player ${playerName} for game type: ${gameType || 'Not specified'}`);
      
      // Check if a file was uploaded
      let fileAnalysisNote = null;
      if (req.file) {
        console.log(`File uploaded: ${req.file.originalname}, type: ${req.file.mimetype}`);
        const isImageFile = /^image\/(jpeg|png|jpg)$/i.test(req.file.mimetype);
        
        if (isImageFile) {
          // Log that we would process this with vision models
          // In a full implementation, we would use OpenAI's vision capabilities or Gemini Pro Vision
          fileAnalysisNote = "Image analysis would be processed with multimodal AI vision models";
          console.log(`Image file detected: ${req.file.path}`);
          
          // We could potentially encode the image and send it to OpenAI's vision model:
          // const base64Image = fs.readFileSync(req.file.path, { encoding: 'base64' });
          // Include this in the GPT-4 Vision request
        } else {
          // For data files (CSV, JSON, etc.), we would parse and extract relevant data
          fileAnalysisNote = "Data file analysis would be processed to extract gameplay statistics";
          console.log(`Data file detected: ${req.file.path}`);
        }
      }
      
      // Construct the prompt for OpenAI based on available information
      let prompt = `Analyze the esports player "${playerName}"`;
      if (gameType && gameType !== 'all') {
        prompt += ` for the game ${gameType}`;
      }
      
      prompt += `.\n\nProvide a detailed scouting report that includes:
      1. The player's key strengths (4-5 items)
      2. Areas where the player needs development (3-4 items)
      3. Team fit recommendations (2-3 items)
      4. A numerical compatibility score (0-100) representing how valuable this player would be to recruit
      5. A recruitment priority (High, Medium, or Low) based on the analysis\n\n`;
      
      prompt += `Format the response as a JSON object with the following structure:
      {
        "playerName": "${playerName}",
        "strengths": ["strength1", "strength2", ...],
        "weaknesses": ["weakness1", "weakness2", ...],
        "recommendations": ["recommendation1", "recommendation2", ...],
        "compatibilityScore": number,
        "recruitmentPriority": "High|Medium|Low"
      }`;
      
      if (fileAnalysisNote) {
        prompt += `\n\nNote: ${fileAnalysisNote}`;
      }
      
      console.log("Sending request to OpenAI API...");
      
      try {
        // Define message role type for proper typing
        type MessageRole = "system" | "user" | "assistant";
        
        // Call OpenAI API
        const aiResponse = await openai.chat.completions.create({
          model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
          messages: [
            { role: "system" as MessageRole, content: "You are an expert esports talent scout and analyst. Your job is to evaluate players based on their stats, gameplay style, and fit for competitive teams." },
            { role: "user" as MessageRole, content: prompt }
          ],
          temperature: 0.7, // Slightly creative but mostly factual
          max_tokens: 800, // Limit response size
          response_format: { type: "json_object" } // Ensure JSON response
        });
        
        console.log("Received response from OpenAI API");
        
        // Parse the AI response
        const content = aiResponse.choices[0].message.content;
        if (!content) {
          throw new Error("Empty response from AI model");
        }
        
        // Parse the JSON response
        const analysisResult = JSON.parse(content);
        
        // Add file analysis note if applicable
        if (fileAnalysisNote) {
          analysisResult.fileAnalysisNote = fileAnalysisNote;
        }
        
        // Return the analysis to the client
        res.json(analysisResult);
        
      } catch (aiError) {
        console.error("OpenAI API Error:", aiError);
        
        // Fallback to a generic analysis in case of API failure
        // This would only execute if the OpenAI API call fails
        console.log("Using fallback analysis due to API error");
        
        const fallbackAnalysis = {
          playerName,
          strengths: [
            "Demonstrates solid mechanical skills based on available data",
            "Shows good decision-making in competitive scenarios",
            "Adaptable to multiple team compositions",
            "Strong communication skills in team environments"
          ],
          weaknesses: [
            "Limited tournament experience at top tier level",
            "Could improve champion/hero pool diversity",
            "Performance consistency varies under pressure"
          ],
          recommendations: [
            "Would benefit from pairing with an experienced team captain",
            "Consider for roles requiring mechanical precision",
            "Good candidate for teams with strong coaching infrastructure"
          ],
          compatibilityScore: 78,
          recruitmentPriority: "Medium",
          note: "This is a fallback analysis. OpenAI API request failed.",
          fileAnalysisNote: ""
        };
        
        if (fileAnalysisNote) {
          fallbackAnalysis.fileAnalysisNote = fileAnalysisNote;
        }
        
        res.json(fallbackAnalysis);
      }
      
    } catch (error) {
      console.error("Error in strategy analysis:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ 
        message: "Failed to analyze player strategy", 
        error: errorMessage 
      });
    } finally {
      // Clean up uploaded file if it exists
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
          console.log(`Deleted uploaded file: ${req.file.path}`);
        } catch (cleanupError) {
          console.error("Error cleaning up file:", cleanupError);
        }
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
