import { ReactNode, createContext, useContext, useState } from "react";
import { teamMembers, teamAttributes, playerProspects, aiInsights, draftRecommendations } from "@/data/mockData";
import { Player, TeamMember, TeamAttribute, DraftPick, Insight } from "@/types";

interface CoachContextType {
  teamMembers: TeamMember[];
  teamAttributes: TeamAttribute[];
  playerProspects: Player[];
  aiInsights: Insight[];
  draftRecommendations: DraftPick[];
  getPlayerByName: (name: string) => Player | TeamMember | null;
  getAttributeByName: (name: string) => TeamAttribute | null;
  getStrategyForAttribute: (attribute: string) => string;
  getPlayerComparison: (player1Name: string, player2Name: string) => string;
  getTeamWeakness: () => string;
  getTeamStrength: () => string;
}

const CoachContext = createContext<CoachContextType | undefined>(undefined);

export function CoachProvider({ children }: { children: ReactNode }) {
  // Helper function to get player by name
  const getPlayerByName = (name: string): Player | TeamMember | null => {
    // Check team members first
    const teamMember = teamMembers.find(
      (member) => member.name.toLowerCase() === name.toLowerCase()
    );
    if (teamMember) return teamMember;

    // Check prospects
    const prospect = playerProspects.find(
      (player) => player.name.toLowerCase() === name.toLowerCase()
    );
    if (prospect) return prospect;

    return null;
  };

  // Helper function to get attribute by name
  const getAttributeByName = (name: string): TeamAttribute | null => {
    return teamAttributes.find(
      (attr) => attr.name.toLowerCase() === name.toLowerCase()
    ) || null;
  };

  // Generate strategy recommendation for a specific attribute
  const getStrategyForAttribute = (attribute: string): string => {
    const attr = getAttributeByName(attribute);
    if (!attr) return "No specific strategy found for this attribute.";

    const percentage = Math.round(attr.value * 100);
    
    switch(attr.name) {
      case "Offense":
        return `For Offense (${percentage}%), focus on aggressive timing and coordination. Consider drafting champions like ${draftRecommendations[0].name} and ${draftRecommendations[1].name} who excel in burst damage and early pressure.`;
      case "Defense":
        return `To improve Defense (${percentage}%), strengthen positioning and improve peel coordination for carries. Prioritize vision control around key objectives and practice defensive rotations.`;
      case "TeamFight":
        return `For TeamFight (${percentage}%), practice specific scenarios focusing on target prioritization and ability sequencing. Develop clear communication protocols for engage/disengage calls.`;
      case "Objectives":
        return `To enhance Objective control (${percentage}%), establish clear timing windows for contestable objectives and improve vision setup 1 minute prior to spawn. Cross-train players on objective-focused champions.`;
      case "Vision":
        return `To boost Vision score (${percentage}%), implement a structured warding system with assigned zones for each role. Practice sweeping patterns and develop tracking of enemy vision control.`;
      case "Adaptability":
        return `For Adaptability (${percentage}%), run scenario-based training where unexpected strategies are introduced mid-practice. Develop a champion pool matrix to ensure flexibility in draft phase.`;
      default:
        return `To improve in ${attr.name} (${percentage}%), focus on structured practice sessions targeting this specific area with measurable goals and regular performance reviews.`;
    }
  };

  // Compare two players
  const getPlayerComparison = (player1Name: string, player2Name: string): string => {
    const player1 = getPlayerByName(player1Name);
    const player2 = getPlayerByName(player2Name);

    if (!player1 && !player2) {
      return `Neither ${player1Name} nor ${player2Name} were found in our database.`;
    } else if (!player1) {
      return `${player1Name} was not found in our database.`;
    } else if (!player2) {
      return `${player2Name} was not found in our database.`;
    }

    // Convert TeamMember to common format for comparison
    const formatPlayer = (player: Player | TeamMember) => {
      const winRate = 'stats' in player ? player.stats.winRate : 0;
      const kda = 'stats' in player ? player.stats.kda : 0;
      const role = player.role || '';
      const position = player.position || '';
      return { winRate, kda, role, position };
    };

    const p1 = formatPlayer(player1);
    const p2 = formatPlayer(player2);

    return `Comparing ${player1Name} (${p1.role}/${p1.position}) with ${player2Name} (${p2.role}/${p2.position}):
- Win Rate: ${p1.winRate}% vs ${p2.winRate}% (${p1.winRate > p2.winRate ? player1Name : player2Name} has a better win rate)
- KDA: ${p1.kda} vs ${p2.kda} (${p1.kda > p2.kda ? player1Name : player2Name} has a better KDA)
- ${p1.role === p2.role ? "Both players share the same role, allowing for direct comparison." : "Players have different roles, making direct comparison less straightforward."}
${('skills' in player1 && 'skills' in player2) ? `- ${player1Name}'s strongest skill is ${player1.skills.sort((a, b) => b.value - a.value)[0].name} while ${player2Name}'s is ${player2.skills.sort((a, b) => b.value - a.value)[0].name}.` : ''}`;
  };

  // Get team weakness (lowest attribute)
  const getTeamWeakness = (): string => {
    const weakestAttribute = [...teamAttributes].sort((a, b) => a.value - b.value)[0];
    const percentage = Math.round(weakestAttribute.value * 100);
    return `The team's biggest weakness is ${weakestAttribute.name} at ${percentage}%. ${getStrategyForAttribute(weakestAttribute.name)}`;
  };

  // Get team strength (highest attribute)
  const getTeamStrength = (): string => {
    const strongestAttribute = [...teamAttributes].sort((a, b) => b.value - a.value)[0];
    const percentage = Math.round(strongestAttribute.value * 100);
    return `The team's greatest strength is ${strongestAttribute.name} at ${percentage}%. This gives the team an advantage in ${strongestAttribute.name.toLowerCase()}-focused gameplay.`;
  };

  return (
    <CoachContext.Provider
      value={{
        teamMembers,
        teamAttributes,
        playerProspects,
        aiInsights,
        draftRecommendations,
        getPlayerByName,
        getAttributeByName,
        getStrategyForAttribute,
        getPlayerComparison,
        getTeamWeakness,
        getTeamStrength
      }}
    >
      {children}
    </CoachContext.Provider>
  );
}

export function useCoach(): CoachContextType {
  const context = useContext(CoachContext);
  if (context === undefined) {
    throw new Error("useCoach must be used within a CoachProvider");
  }
  return context;
}