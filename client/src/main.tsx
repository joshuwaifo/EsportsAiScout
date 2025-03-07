import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { MatchProvider } from "./context/MatchContext";
import { PlayerProvider } from "./context/PlayerContext";

createRoot(document.getElementById("root")!).render(
  <MatchProvider>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </MatchProvider>
);
