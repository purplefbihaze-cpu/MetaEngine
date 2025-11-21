import { GoogleGenAI, Type } from "@google/genai";
import { Trend, DeepAnalysisResult, BuilderAssetType, BuilderOutput, Category, DomainAsset, SaaSBlueprint, SaaSConceptRequest } from "../types";
import { generateSparkline } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- DOMAIN SNIPER ---
export const snipeDomains = async (keyword: string, category: string): Promise<DomainAsset[]> => {
  if (!process.env.API_KEY) return [];

  const model = "gemini-2.5-flash";
  const prompt = `
    Act as a High-Frequency Domain Sniper.
    Target Niche: ${keyword}
    Category: ${category}

    Generate 20 high-value, available (or expired/auction) domain names relevant to this niche.
    Prioritize short, brandable, or keyword-rich .com, .io, .ai, .app domains.
    
    For each domain estimate:
    - Status (AVAILABLE, AUCTION, EXPIRED)
    - Market Value (Est. Resale Price)
    - Registration Cost
    - SEO Value (Search Volume + Keyword Difficulty proxy)
    - Brandability Score (Memorability, Phonetics)
    - Legal Risk (Trademark collision probability)
    - Whois details (mock registrar)

    RETURN JSON ONLY.
    Structure:
    {
      "domains": [
        {
          "name": "string",
          "tld": "string",
          "status": "AVAILABLE" | "AUCTION" | "EXPIRED",
          "price": "string",
          "estValue": "string",
          "brandability": number,
          "seoValue": number,
          "backlinks": number,
          "age": "string",
          "legalRisk": "LOW" | "MEDIUM" | "HIGH",
          "socialHandles": { "twitter": boolean, "instagram": boolean, "tiktok": boolean },
          "whois": { "registrar": "string", "created": "string", "expiry": "string" }
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const data = JSON.parse(response.text || "{}");
    if (!data.domains) return [];

    return data.domains.map((d: any, i: number) => ({
      ...d,
      id: `dom-${Date.now()}-${i}`,
      aiConfidence: Math.floor(Math.random() * 20) + 80,
      relatedTrend: keyword,
      priceHistory: Array.from({ length: 10 }, (_, j) => ({ date: `-${10-j}d`, value: parseInt(d.estValue.replace(/\D/g,'')) * (0.8 + Math.random()*0.4) }))
    }));
  } catch (e) {
    console.error("Domain Snipe Error", e);
    return [];
  }
};

// --- SAAS BUILDER (UPDATED TO GEMINI 3.0) ---
export const generateSaaSConcepts = async (req: SaaSConceptRequest): Promise<SaaSBlueprint[]> => {
  if (!process.env.API_KEY) return [];

  // Using Gemini 3.0 Pro Preview for complex reasoning and architectural planning
  const model = "gemini-3-pro-preview";
  const prompt = `
    Act as a Product Architect & Venture Builder.
    Create 3 distinct Micro-SaaS Blueprints based on:
    - Niche: ${req.niche} (${req.trendContext})
    - Audience: ${req.audience}
    - Complexity: ${req.complexity}

    For each concept, provide a DEEP tactical plan:
    1. Pitch & Problem/Solution
    2. Monetization & Tech Stack
    3. Wireframe Description
    4. Go-To-Market Plan
    5. Data Model (Key tables/schemas)
    6. SEO Strategy (3-5 key terms/topics)
    7. Email Sequence (3 subject lines for onboarding)
    8. User Personas (2-3 key profiles)

    RETURN JSON ONLY.
    Structure:
    {
      "blueprints": [
        {
          "title": "string",
          "oneLiner": "string",
          "problem": "string",
          "solution": "string",
          "targetAudience": "string",
          "monetization": ["string"],
          "techStack": { "frontend": "string", "backend": "string", "db": "string", "ai": "string" },
          "coreFeatures": ["string"],
          "wireframe": "string",
          "marketingPlan": ["string"],
          "timeToMarket": "string",
          "riskAnalysis": "string",
          "dataModel": ["string"],
          "seoStrategy": ["string"],
          "emailSequence": ["string"],
          "socialContent": ["string"],
          "personas": [{ "role": "string", "painPoint": "string", "goal": "string" }]
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const data = JSON.parse(response.text || "{}");
    return data.blueprints || [];
  } catch (e) {
    console.error("SaaS Gen Error", e);
    return [];
  }
};

// --- AFFILIATE & LANDING PAGE GENERATOR (NEW - Gemini 3.0) ---
export interface AffiliateStrategy {
    angle: string;
    headline: string;
    subheadline: string;
    cta: string;
    emailSubject: string;
    imagePrompts: string[];
    adCopy: string;
    targetAudience: string;
    landingPageCopy: string;
}

export const generateAffiliateStrategies = async (niche: string, productType: string): Promise<AffiliateStrategy[]> => {
    if (!process.env.API_KEY) return [];

    const model = "gemini-3-pro-preview";
    const prompt = `
      Act as a world-class Direct Response Copywriter and Affiliate Marketer.
      
      Context: The user wants to promote an affiliate offer or create a landing page for the following trend/niche.
      Niche/Trend: ${niche}
      Product Type: ${productType} (e.g. Course, Software, Physical Product, Service)

      Generate 3 distinct marketing angles (e.g. Fear of Missing Out, Gain/Greed, Curiosity/Novelty).

      For EACH angle, provide:
      1. A high-converting Headline & Subheadline.
      2. A Call to Action (CTA).
      3. An Email Subject Line for cold outreach.
      4. 3 Detailed AI Image Prompts (for Midjourney/DALL-E) to create ad creatives.
      5. Short Ad Copy (Facebook/TikTok style).
      6. Complete Landing Page Copy (Hero, Benefits, Social Proof placeholder, Closing).

      RETURN JSON ONLY.
      Structure:
      {
        "strategies": [
           {
             "angle": "string",
             "headline": "string",
             "subheadline": "string",
             "cta": "string",
             "emailSubject": "string",
             "imagePrompts": ["string"],
             "adCopy": "string",
             "targetAudience": "string",
             "landingPageCopy": "string (markdown supported)"
           }
        ]
      }
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        const data = JSON.parse(response.text || "{}");
        return data.strategies || [];

    } catch (e) {
        console.error("Affiliate Gen Error", e);
        return [];
    }
}


export const fetchLiveCryptoTrends = async (): Promise<Trend[]> => {
    if (!process.env.API_KEY) return [];
    
    const model = "gemini-2.5-flash";
    const prompt = `
        Use Google Search to find the current top trending meme coins and crypto tokens on DexScreener, CoinGecko, and GeckoTerminal RIGHT NOW.
        
        Strictly identify two groups:
        1. High Cap Memes (Market Cap >= $100 Million)
        2. Low Cap Memes (Market Cap $200k - $100 Million)
        
        For each coin, extract or estimate:
        - Market Cap (approximate)
        - 24h Volume
        - Liquidity
        - A brief reason why it is trending
        - "Smart Money" sentiment (Accumulation vs Dumping)

        RETURN ONLY A RAW JSON OBJECT. Do not use markdown formatting.
        Structure:
        {
          "tokens": [
            {
              "name": "string",
              "symbol": "string",
              "marketCap": "string (e.g. $150M)",
              "marketCapValue": number (raw USD value),
              "volume24h": "string",
              "liquidity": "string",
              "trendingReason": "string",
              "smartMoneySignal": "ACCUMULATION" | "DUMPING" | "NEUTRAL",
              "smartMoneyInflow": "string",
              "contractAge": "string",
              "platform": "string"
            }
          ]
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            }
        });

        let jsonString = response.text || "{}";
        const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonString = jsonMatch[0];
        }

        const data = JSON.parse(jsonString);
        if (!data.tokens) return [];

        return data.tokens.map((t: any, i: number) => ({
            id: `cryp-${i}-${Date.now()}`,
            title: `$${t.symbol} (${t.name})`,
            description: t.trendingReason,
            category: Category.CRYPTO,
            velocity: Math.floor(Math.random() * 40) + 60,
            volume: t.volume24h,
            source: 'DexScreener',
            change: Math.floor(Math.random() * 500) + 20,
            tags: [t.platform, 'Meme', 'DeFi'],
            novelty: 80,
            signalCount: Math.floor(Math.random() * 2000) + 500,
            timestamp: 'Live',
            timestampValue: Date.now(),
            sparklineData: generateSparkline(),
            cluster: t.marketCapValue >= 100000000 ? 'High Cap Memes' : 'Low Cap Gems',
            isAnomaly: t.smartMoneySignal === 'ACCUMULATION',
            metrics: {
                anomalyConfidence: 85,
                clusterCentrality: 90,
                contextVelocity: 4.2,
                volatility: 95
            },
            cryptoMetrics: {
                marketCap: t.marketCap,
                liquidity: t.liquidity,
                volume24h: t.volume24h,
                smartMoney: {
                    inflow: t.smartMoneyInflow || "+$50k",
                    whaleCount: Math.floor(Math.random() * 15) + 2,
                    signal: t.smartMoneySignal || "NEUTRAL"
                },
                isHighCap: t.marketCapValue >= 100000000,
                contractAge: t.contractAge || "Unknown"
            }
        }));

    } catch (e) {
        console.error("Crypto Fetch Error", e);
        return [];
    }
};

export const analyzeTrendDeepDive = async (trend: Trend): Promise<DeepAnalysisResult | null> => {
  if (!process.env.API_KEY) return null;

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Act as a Senior Forensic Trend Analyst. 
      Analyze: "${trend.title}".
      Context: ${trend.description}
      Source: ${trend.source}

      Generate a structured Surveillance Grid response.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            surveillance: {
               type: Type.OBJECT,
               properties: {
                  trigger: { type: Type.STRING },
                  drivers: { type: Type.STRING },
                  platformVector: { type: Type.STRING },
                  audience: { type: Type.STRING },
                  sustainability: { type: Type.STRING, enum: ['FLASH', 'SHORT', 'MEDIUM', 'LONG'] },
                  forecast: { type: Type.STRING },
                  risks: { type: Type.ARRAY, items: { type: Type.STRING } },
                  clusterAnalysis: { type: Type.STRING }
               }
            },
            marketUses: { type: Type.ARRAY, items: { type: Type.STRING } },
            businessModels: { type: Type.ARRAY, items: { type: Type.STRING } },
            competitiveLandscape: { type: Type.STRING },
          },
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    return JSON.parse(jsonText) as DeepAnalysisResult;

  } catch (error) {
    console.error("Gemini Deep Analysis Failed", error);
    return null;
  }
};

export const generateBuilderAsset = async (trend: Trend, assetType: BuilderAssetType): Promise<BuilderOutput | null> => {
  if (!process.env.API_KEY) return null;

  try {
    const model = "gemini-2.5-flash";
    let prompt = "";
    let schema: any = {};

    switch (assetType) {
      case 'DOMAINS':
        prompt = `Generate 5 available domains for "${trend.title}".`;
        schema = {
          type: Type.OBJECT,
          properties: {
            domains: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  status: { type: Type.STRING },
                  value: { type: Type.STRING }
                }
              }
            }
          }
        };
        break;
      case 'SAAS':
        prompt = `Create 3 Micro-SaaS concepts for "${trend.title}".`;
        schema = {
          type: Type.OBJECT,
          properties: {
            concepts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  pitch: { type: Type.STRING },
                  stack: { type: Type.STRING }
                }
              }
            }
          }
        };
        break;
      case 'COURSE':
        prompt = `Outline an AI Course for "${trend.title}".`;
        schema = {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                audience: { type: Type.STRING },
                modules: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        };
        break;
      case 'LANDING_PAGE':
        prompt = `Write landing page copy for "${trend.title}".`;
        schema = {
            type: Type.OBJECT,
            properties: {
                headline: { type: Type.STRING },
                subheadline: { type: Type.STRING },
                benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
                cta: { type: Type.STRING }
            }
        };
        break;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    return {
      type: assetType,
      content: JSON.parse(response.text || "{}")
    };

  } catch (error) {
    return null;
  }
};