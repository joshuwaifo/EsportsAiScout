
# AI League - Esports Analytics Platform

## Overview
AI League is a comprehensive esports analytics platform designed for the 2026 Asian Games, with a primary focus on fighting games like Street Fighter 6. The platform provides advanced scouting, strategy analysis, and performance tracking capabilities powered by AI. The current deployed version of this can be found at: https://esports-ai-scout-ojuwaifo.replit.app


## Key Features

### 1. Dashboard
- Real-time performance metrics and statistics
- AI-powered game insights and analysis
- Fighter terminology glossary
- Replay highlight generation
- Personalized training plans

### 2. Scouting System
- Detailed player analysis with metrics like:
  - Execution rate
  - Adaptation score
  - Matchup awareness
  - Micro/macro gameplay ratings
- Advanced fighter analysis cards
- Team composition analysis
- Historical performance tracking

### 3. Strategy Center
- Game-specific strategy builder
- Matchup analysis
- Counter-pick recommendations
- One-key strategy generation
- Team radar charts for performance visualization

### 4. Community Features
- Global leaderboards
- Monthly challenges
- Player spotlights
- Achievement badges
- Skill rating system

## Technical Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Shadcn/ui component library
- Lucide icons
- Context-based state management

### Backend
- Express.js server
- REST API architecture
- Real-time data processing

## Project Structure
```
client/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/         # React context providers
│   ├── data/           # Mock data and constants
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and services
│   ├── pages/          # Main application pages
│   └── types/          # TypeScript type definitions
```

## Game Support
Currently optimized for:
- Street Fighter 6 (primary focus)
- League of Legends (partial support)
- Future expansion planned for other Asian Games titles

## Key Features in Detail

### Street Fighter Analytics
- Anti-air success rate tracking
- Combo efficiency analysis
- Frame data integration
- Match replay analysis
- Character matchup statistics

### AI-Powered Insights
- Real-time strategy recommendations
- Performance pattern recognition
- Adaptation tracking
- Player tendency analysis
- Training focus suggestions

## Getting Started

1. Installation:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Development Guidelines

### Component Structure
- Use TypeScript for type safety
- Follow React best practices
- Implement responsive design
- Maintain consistent styling with Tailwind

### State Management
- Use React Context for global state
- Implement proper data flow
- Handle loading and error states

## Future Roadmap

1. Enhanced Features
- Advanced match analysis
- ML-powered prediction models
- Tournament integration
- Team management tools

2. Game Expansion
- Support for additional fighting games
- Cross-game analytics
- Unified player profiles

## Contributing
This project is part of the Asian Games 2026 esports initiative. Contributions should focus on:
- Performance optimization
- Game-specific analytics
- UI/UX improvements
- Documentation updates

## License
All rights reserved. This project is proprietary software.
