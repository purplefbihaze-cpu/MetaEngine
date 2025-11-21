
export enum Category {
  CODE = 'CODE',
  SOCIAL = 'SOCIAL',
  MARKET = 'MARKET',
  BUSINESS = 'BUSINESS',
  CRYPTO = 'CRYPTO',
}

export type TimeFrame = '1H' | '6H' | '24H' | '7D' | '1M';

export interface TrendMetrics {
  anomalyConfidence: number; // 0-100
  clusterCentrality: number; // 0-100
  contextVelocity: number; // Velocity relative to category average
  volatility: number; // Signal variance
}

export interface CryptoMetrics {
  marketCap: string;
  liquidity: string;
  volume24h: string;
  smartMoney?: {
    inflow: string;
    whaleCount: number;
    signal: 'ACCUMULATION' | 'DUMPING' | 'NEUTRAL';
  };
  isHighCap: boolean;
  contractAge?: string;
}

export interface Trend {
  id: string;
  title: string;
  description: string;
  category: Category;
  velocity: number;
  volume: string;
  source: string;
  change: number;
  tags: string[];
  novelty: number;
  signalCount: number;
  timestamp: string;
  timestampValue: number;
  sparklineData: Record<TimeFrame, { value: number }[]>;
  cluster: string;
  isAnomaly: boolean;
  metrics: TrendMetrics;
  cryptoMetrics?: CryptoMetrics;
}

export interface Source {
  id: string;
  name: string;
  category: string;
  status: 'online' | 'delay' | 'offline';
  signalsToday: number;
  intensity: number;
  reputation: number;
}

export interface SurveillanceData {
  trigger: string;
  drivers: string;
  platformVector: string;
  audience: string;
  sustainability: 'FLASH' | 'SHORT' | 'MEDIUM' | 'LONG';
  forecast: string;
  risks: string[];
  clusterAnalysis: string;
}

export interface DeepAnalysisResult {
  summary: string;
  surveillance: SurveillanceData;
  marketUses: string[];
  businessModels: string[];
  competitiveLandscape: string;
}

export type BuilderAssetType = 'DOMAINS' | 'SAAS' | 'COURSE' | 'LANDING_PAGE' | 'SOCIAL';

export interface BuilderOutput {
  type: BuilderAssetType;
  content: any;
}

export interface NavItem {
  label: string;
  value: string;
}

// --- DOMAIN SNIPER TYPES ---
export interface DomainAsset {
  id: string;
  name: string;
  tld: string;
  status: 'AVAILABLE' | 'AUCTION' | 'EXPIRED' | 'PREMIUM';
  price: string;
  estValue: string;
  brandability: number;
  seoValue: number;
  backlinks: number;
  age: string;
  socialHandles: { twitter: boolean; instagram: boolean; tiktok: boolean };
  relatedTrend?: string;
  aiConfidence: number;
  legalRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  priceHistory?: { date: string; value: number }[]; // For sparkline
  whois?: { registrar: string; created: string; expiry: string };
}

// --- MICRO SAAS BUILDER TYPES ---
export interface SaaSPersona {
  role: string;
  painPoint: string;
  goal: string;
}

export interface SaaSBlueprint {
  title: string;
  oneLiner: string;
  problem: string;
  solution: string;
  targetAudience: string;
  monetization: string[];
  techStack: {
    frontend: string;
    backend: string;
    db: string;
    ai?: string;
  };
  coreFeatures: string[];
  wireframe: string;
  marketingPlan: string[];
  timeToMarket: string;
  riskAnalysis: string;
  // Deep Dive Fields
  dataModel: string[]; // e.g. "Users: [id, email]", "Projects: [id, name]"
  seoStrategy: string[]; // Keywords/Plan
  emailSequence: string[]; // Subject lines
  socialContent: string[]; // Post ideas
  personas: SaaSPersona[];
}

export interface SaaSConceptRequest {
  niche: string;
  trendContext: string;
  audience: string;
  complexity: 'NO_CODE' | 'LOW_CODE' | 'FULL_CODE';
}
