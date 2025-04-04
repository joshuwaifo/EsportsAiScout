import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import ProspectScouting from "@/pages/scouting";
import Strategy from "@/pages/strategy";
import Team from "@/pages/team";
import About from "@/pages/about";
import CoachQA from "@/pages/coach";
import LeaderboardPage from "@/pages/leaderboard";
import GuidesPage from "@/pages/guides";
import TeamScoutingPage from "@/pages/team-scouting";
import { CoachProvider } from "@/context/CoachContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { MatchProvider } from "@/context/MatchContext";
import { GameProvider } from "@/context/GameContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/scouting" component={ProspectScouting} />
      <Route path="/team-scouting" component={TeamScoutingPage} />
      <Route path="/strategy" component={Strategy} />
      <Route path="/team" component={Team} />
      <Route path="/coach" component={CoachQA} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/guides" component={GuidesPage} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <PlayerProvider>
          <MatchProvider>
            <CoachProvider>
              <Router />
              <Toaster />
            </CoachProvider>
          </MatchProvider>
        </PlayerProvider>
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
