import { 
  users, type User, type InsertUser,
  players, type Player, type InsertPlayer,
  teams, type Team, type InsertTeam,
  matches, type Match, type InsertMatch,
  strategies, type Strategy, type InsertStrategy
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Player methods
  getAllPlayers(): Promise<Player[]>;
  getPlayer(id: number): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  
  // Team methods
  getAllTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  
  // Match methods
  getAllMatches(): Promise<Match[]>;
  getMatch(id: number): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  
  // Strategy methods
  getAllStrategies(): Promise<Strategy[]>;
  getStrategy(id: number): Promise<Strategy | undefined>;
  createStrategy(strategy: InsertStrategy): Promise<Strategy>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private players: Map<number, Player>;
  private teams: Map<number, Team>;
  private matches: Map<number, Match>;
  private strategies: Map<number, Strategy>;
  
  private userCurrentId: number;
  private playerCurrentId: number;
  private teamCurrentId: number;
  private matchCurrentId: number;
  private strategyCurrentId: number;

  constructor() {
    this.users = new Map();
    this.players = new Map();
    this.teams = new Map();
    this.matches = new Map();
    this.strategies = new Map();
    
    this.userCurrentId = 1;
    this.playerCurrentId = 1;
    this.teamCurrentId = 1;
    this.matchCurrentId = 1;
    this.strategyCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  // Player methods
  async getAllPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
  }
  
  async getPlayer(id: number): Promise<Player | undefined> {
    return this.players.get(id);
  }
  
  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.playerCurrentId++;
    const createdAt = new Date();
    const player: Player = { ...insertPlayer, id, createdAt };
    this.players.set(id, player);
    return player;
  }
  
  // Team methods
  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }
  
  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }
  
  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = this.teamCurrentId++;
    const createdAt = new Date();
    const team: Team = { ...insertTeam, id, createdAt };
    this.teams.set(id, team);
    return team;
  }
  
  // Match methods
  async getAllMatches(): Promise<Match[]> {
    return Array.from(this.matches.values());
  }
  
  async getMatch(id: number): Promise<Match | undefined> {
    return this.matches.get(id);
  }
  
  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = this.matchCurrentId++;
    const createdAt = new Date();
    const match: Match = { ...insertMatch, id, createdAt };
    this.matches.set(id, match);
    return match;
  }
  
  // Strategy methods
  async getAllStrategies(): Promise<Strategy[]> {
    return Array.from(this.strategies.values());
  }
  
  async getStrategy(id: number): Promise<Strategy | undefined> {
    return this.strategies.get(id);
  }
  
  async createStrategy(insertStrategy: InsertStrategy): Promise<Strategy> {
    const id = this.strategyCurrentId++;
    const createdAt = new Date();
    const strategy: Strategy = { ...insertStrategy, id, createdAt };
    this.strategies.set(id, strategy);
    return strategy;
  }
}

export const storage = new MemStorage();
