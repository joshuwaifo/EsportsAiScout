import { pgTable, text, serial, integer, boolean, timestamp, json, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Player table schema
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  position: text("position").notNull(),
  matchPercentage: integer("match_percentage").notNull(),
  skills: jsonb("skills").notNull(), // Array of skill objects { name, value }
  tournaments: integer("tournaments").notNull(),
  rating: integer("rating").notNull(),
  stats: jsonb("stats").notNull(), // { kda, winRate, gamesPlayed }
  avatarUrl: text("avatar_url"),
  teamId: integer("team_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Team table schema
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  tag: text("tag").notNull(),
  rank: integer("rank"),
  winRate: integer("win_rate"),
  tournamentWins: integer("tournament_wins"),
  founded: integer("founded"),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Match table schema
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  homeTeamId: integer("home_team_id").notNull(),
  awayTeamId: integer("away_team_id").notNull(),
  date: timestamp("date").notNull(),
  isLive: boolean("is_live").default(false),
  status: text("status").notNull(), // 'upcoming', 'live', 'completed'
  result: jsonb("result"), // { homeScore, awayScore, winner }
  createdAt: timestamp("created_at").defaultNow(),
});

// Strategy table schema
export const strategies = pgTable("strategies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teamId: integer("team_id").notNull(),
  opponentId: integer("opponent_id").notNull(),
  earlyGame: text("early_game").notNull(),
  midGame: text("mid_game").notNull(),
  lateGame: text("late_game").notNull(),
  draftPicks: jsonb("draft_picks").notNull(), // Array of draft pick objects
  analysis: jsonb("analysis"), // AI analysis results
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
  createdAt: true,
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  createdAt: true,
});

export const insertStrategySchema = createInsertSchema(strategies).omit({
  id: true,
  createdAt: true,
});

// Define types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;

export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;

export type Match = typeof matches.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;

export type Strategy = typeof strategies.$inferSelect;
export type InsertStrategy = z.infer<typeof insertStrategySchema>;

// Custom types for frontend use
export type PlayerSkill = {
  name: string;
  value: number;
};

export type PlayerStats = {
  kda: number;
  winRate: number;
  gamesPlayed: number;
};

export type MatchResult = {
  homeScore: number;
  awayScore: number;
  winner: string;
};

export type DraftPick = {
  name: string;
  imageUrl?: string;
};
