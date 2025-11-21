
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_TRENDS, CATEGORY_CONFIG, SOURCES, MOCK_SOURCES } from '../constants';
import { Trend, Category, DeepAnalysisResult, BuilderAssetType, BuilderOutput, TimeFrame } from '../types';
import { Button, Badge } from './ui/Components';
import { 
  X, ArrowUpRight, Sparkles, Loader2, TrendingUp, Filter, Info, 
  Clock, BarChart2, Activity, RefreshCw, Globe, Layout, Video, 
  Cpu, CheckCircle, AlertCircle, Target, Zap, Layers, DollarSign,
  Radar, Crosshair, ShieldAlert, TrendingDown, Search, Network, BrainCircuit, Coins, Wallet, LineChart as IconLineChart, Grid, ArrowRight, Lock, Megaphone
} from 'lucide-react';
import { 
  LineChart, Line, ResponsiveContainer, XAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  AreaChart, Area, YAxis 
} from 'recharts';
import { analyzeTrendDeepDive, generateBuilderAsset, fetchLiveCryptoTrends } from '../services/geminiService';
import { DomainSniper } from './DomainSniper';
import { SaaSBuilder } from './SaaSBuilder';
import { AffiliateBuilder } from './AffiliateBuilder';
import { LogoIcon } from './Header';

// --- Types ---
type SortOption = 'velocity' | 'signals' | 'freshness';
type CryptoCapFilter = 'ALL' | 'HIGH_CAP' | 'LOW_CAP';
type ModuleView = 'SURVEILLANCE' | 'DOMAIN_SNIPER' | 'SAAS_BUILDER' | 'AFFILIATE_NEXUS';

// --- Mock Data for Detail Chart ---
const generateDetailChartData = () => {
  const data = [];
  let val = 50;
  for (let i = 0; i < 24; i++) {
    val = val + (Math.random() - 0.4) * 20;
    if (val < 10) val = 10;
    data.push({ 
      time: `${i}:00`, 
      value: Math.floor(val), 
      event: Math.random() > 0.8 ? 'Signal Spike' : null 
    });
  }
  return data;
};

// --- Components ---

const Sidebar: React.FC<{ activeView: ModuleView; onViewChange: (v: ModuleView) => void }> = ({ activeView, onViewChange }) => {
  return (
    <div className="w-64 bg-nexus-950/50 backdrop-blur-xl border-r border-white/5 flex flex-col h-full hidden xl:flex">
      <div className="p-6">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Grid size={12} /> Modules
        </div>
        <div className="space-y-1 mb-8">
          <button 
            onClick={() => onViewChange('SURVEILLANCE')}
            className={`w-full flex items-center gap-3 p-2 rounded transition-colors ${activeView === 'SURVEILLANCE' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
             <Radar size={16} className={activeView === 'SURVEILLANCE' ? 'text-nexus-code' : ''} />
             <span className="text-sm">Surveillance Grid</span>
          </button>
          <button 
            onClick={() => onViewChange('DOMAIN_SNIPER')}
            className={`w-full flex items-center gap-3 p-2 rounded transition-colors ${activeView === 'DOMAIN_SNIPER' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
             <Globe size={16} className={activeView === 'DOMAIN_SNIPER' ? 'text-emerald-500' : ''} />
             <span className="text-sm">Domain Sniper</span>
          </button>
          <button 
            onClick={() => onViewChange('SAAS_BUILDER')}
            className={`w-full flex items-center gap-3 p-2 rounded transition-colors ${activeView === 'SAAS_BUILDER' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
             <Cpu size={16} className={activeView === 'SAAS_BUILDER' ? 'text-cyan-500' : ''} />
             <span className="text-sm">Micro-SaaS Builder</span>
          </button>
          <button 
            onClick={() => onViewChange('AFFILIATE_NEXUS')}
            className={`w-full flex items-center gap-3 p-2 rounded transition-colors ${activeView === 'AFFILIATE_NEXUS' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
             <Megaphone size={16} className={activeView === 'AFFILIATE_NEXUS' ? 'text-pink-500' : ''} />
             <span className="text-sm">Affiliate Engine</span>
          </button>
        </div>

        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Activity size={12} /> Data Sources
        </div>
        <div className="space-y-1">
          {MOCK_SOURCES.map(source => (
            <div key={source.id} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`relative w-2 h-2 rounded-full ${
                  source.status === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 
                  source.status === 'delay' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{source.name}</span>
                  {/* Visualizing Reputation Weight */}
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className={`w-1 h-0.5 rounded-full ${
                        (i / 5) < source.reputation ? 'bg-nexus-code/50' : 'bg-gray-800'
                      }`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-6 border-t border-white/5">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
           <div className="flex justify-between items-center mb-2">
             <span className="text-xs text-gray-400">System Load</span>
             <span className="text-xs text-nexus-code font-mono">94%</span>
           </div>
           <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-nexus-code w-[94%] animate-pulse" />
           </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void; 
  active?: boolean 
}> = ({ icon, label, onClick, active }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
      active 
      ? 'bg-nexus-code/10 border-nexus-code text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
    }`}
  >
    {icon}
    <span className="text-xs font-mono font-bold uppercase tracking-wider">{label}</span>
  </button>
);

const BuilderResultCard: React.FC<{ result: BuilderOutput }> = ({ result }) => {
  if (!result.content) return null;

  switch (result.type) {
    case 'DOMAINS':
      return (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
          <h4 className="text-sm font-mono text-gray-400 mb-3">AVAILABLE ASSETS</h4>
          {result.content.domains?.map((d: any, i: number) => (
            <div key={i} className="flex justify-between items-center p-3 bg-black/40 border border-white/10 rounded-lg hover:border-nexus-code/50 transition-colors">
              <div className="flex items-center gap-3">
                <Globe size={14} className="text-nexus-code" />
                <span className="font-mono text-white">{d.name}</span>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{d.status}</span>
                 <span className="text-xs font-mono text-gray-400">{d.value}</span>
              </div>
            </div>
          ))}
        </div>
      );
    case 'SAAS':
      return (
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-2">
           {result.content.concepts?.map((c: any, i: number) => (
             <div key={i} className="p-4 bg-black/40 border border-white/10 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white text-lg">{c.name}</h4>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-1 rounded text-gray-400">{c.stack}</span>
                </div>
                <p className="text-sm text-gray-400">{c.pitch}</p>
             </div>
           ))}
        </div>
      );
    case 'COURSE':
       return (
         <div className="p-5 bg-black/40 border border-white/10 rounded-lg animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xl font-bold text-white mb-1">{result.content.title}</h3>
            <p className="text-xs text-nexus-social mb-4">Target: {result.content.audience}</p>
            <div className="space-y-2">
              {result.content.modules?.map((m: string, i: number) => (
                 <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono">{i+1}</div>
                    {m}
                 </div>
              ))}
            </div>
         </div>
       );
    case 'LANDING_PAGE':
        return (
          <div className="p-6 bg-white text-black rounded-lg font-sans animate-in fade-in slide-in-from-bottom-2">
             <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 tracking-tight">{result.content.headline}</h1>
                <p className="text-lg text-gray-600">{result.content.subheadline}</p>
             </div>
             <div className="grid grid-cols-3 gap-4 mb-8">
                {result.content.benefits?.map((b: string, i: number) => (
                  <div key={i} className="text-center text-sm font-medium text-gray-800 bg-gray-100 p-3 rounded">
                    {b}
                  </div>
                ))}
             </div>
             <div className="text-center">
               <button className="px-6 py-3 bg-black text-white font-bold rounded hover:bg-gray-800">{result.content.cta}</button>
             </div>
          </div>
        );
    default:
      return null;
  }
};

const GridCell: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col h-full hover:border-white/20 transition-colors">
    <div className="flex items-center gap-2 mb-3 text-xs font-mono text-gray-400 uppercase tracking-wider">
      {icon} {title}
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

const AlgorithmicScore: React.FC<{ trend: Trend }> = ({ trend }) => {
    const sourceWeight = MOCK_SOURCES.find(s => s.name === trend.source)?.reputation || 0.5;
    
    return (
        <div className="mb-8 p-5 rounded-xl bg-nexus-950/50 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-nexus-code mb-4">
                <BrainCircuit size={14} />
                ALGORITHMIC LOGIC
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-gray-400">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase opacity-50">Raw Signals</span>
                    <span className="text-white font-bold text-lg">{trend.signalCount}</span>
                </div>
                <span className="text-gray-600">×</span>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase opacity-50">Source Weight</span>
                    <span className="text-white font-bold text-lg">{sourceWeight.toFixed(2)}</span>
                </div>
                <span className="text-gray-600">+</span>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase opacity-50">Velocity</span>
                    <span className="text-white font-bold text-lg">{trend.metrics.contextVelocity}x</span>
                </div>
                <span className="text-gray-600">=</span>
                <div className="ml-auto flex flex-col items-end">
                     <span className="text-[10px] uppercase opacity-50">Total Score</span>
                    <span className="text-2xl text-nexus-code font-bold">{trend.velocity}</span>
                </div>
            </div>
        </div>
    )
}

const TrendDetailPanel: React.FC<{ trend: Trend; onClose: () => void }> = ({ trend, onClose }) => {
  const [analysis, setAnalysis] = useState<DeepAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [builderOutput, setBuilderOutput] = useState<BuilderOutput | null>(null);
  const [buildingType, setBuildingType] = useState<BuilderAssetType | null>(null);
  
  const chartData = useMemo(() => generateDetailChartData(), []);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const result = await analyzeTrendDeepDive(trend);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const handleBuild = async (type: BuilderAssetType) => {
    setBuildingType(type);
    const result = await generateBuilderAsset(trend, type);
    setBuilderOutput(result);
    setBuildingType(null);
  };

  const config = CATEGORY_CONFIG[trend.category];

  return (
    <div className="absolute inset-y-0 right-0 w-full lg:w-[900px] bg-nexus-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col z-50 transform transition-transform duration-300">
      
      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-nexus-950/50">
        <div className="flex items-center gap-4">
           <div className={`p-2 rounded-lg ${config.bg} bg-opacity-20 ${config.color}`}>
             {config.icon}
           </div>
           <div>
             <h2 className="text-white font-bold text-lg leading-none mb-1">{trend.title}</h2>
             <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 uppercase">
                <span>{trend.category}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>{trend.source}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span className="text-nexus-code">{trend.cluster}</span>
                {trend.category === Category.CRYPTO && trend.metrics && (
                  <>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span className={trend.cryptoMetrics?.isHighCap ? "text-nexus-code" : "text-amber-500"}>
                      {trend.cryptoMetrics?.isHighCap ? "HIGH CAP" : "LOW CAP"}
                    </span>
                  </>
                )}
             </div>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="ghost" onClick={onClose} className="!p-2"><X size={18}/></Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 space-y-8">
          
          {/* Main Chart Section */}
          <div className="relative h-64 w-full bg-black/20 rounded-xl border border-white/5 p-4 overflow-hidden">
             <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold text-white font-mono">
                    {trend.velocity}<span className="text-base text-gray-500 font-normal ml-1">Score</span>
                    </div>
                    {trend.isAnomaly && (
                         <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">ANOMALY DETECTED ({trend.metrics.anomalyConfidence}%)</span>
                    )}
                </div>
                <div className="px-2 py-1 bg-nexus-code/10 text-nexus-code text-xs font-bold rounded border border-nexus-code/20 self-start">
                  +{trend.change}% Velocity ({trend.metrics.contextVelocity}x avg)
                </div>
             </div>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={config.color.includes('code') ? '#06b6d4' : config.color.includes('crypto') ? '#8b5cf6' : '#d946ef'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={config.color.includes('code') ? '#06b6d4' : config.color.includes('crypto') ? '#8b5cf6' : '#d946ef'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0a0c10', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={config.color.includes('code') ? '#06b6d4' : config.color.includes('crypto') ? '#8b5cf6' : '#d946ef'} 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorGradient)" 
                  />
                </AreaChart>
             </ResponsiveContainer>
          </div>
          
          {/* Crypto Specific Metrics */}
          {trend.category === Category.CRYPTO && trend.cryptoMetrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Market Cap</div>
                  <div className="text-lg font-mono text-white font-bold">{trend.cryptoMetrics.marketCap}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Liquidity</div>
                  <div className="text-lg font-mono text-white font-bold">{trend.cryptoMetrics.liquidity}</div>
                </div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-500 mb-1">24h Volume</div>
                  <div className="text-lg font-mono text-white font-bold">{trend.cryptoMetrics.volume24h}</div>
                </div>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className={`absolute inset-0 opacity-10 ${trend.cryptoMetrics.smartMoney?.signal === 'ACCUMULATION' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className="text-xs text-gray-500 mb-1">Smart Money</div>
                  <div className={`text-lg font-mono font-bold ${trend.cryptoMetrics.smartMoney?.signal === 'ACCUMULATION' ? 'text-green-400' : 'text-red-400'}`}>
                    {trend.cryptoMetrics.smartMoney?.signal}
                  </div>
                  <div className="text-[10px] text-gray-400">Whales: {trend.cryptoMetrics.smartMoney?.whaleCount}</div>
                </div>
            </div>
          )}

          <AlgorithmicScore trend={trend} />

          {/* Forensic Surveillance Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Radar size={18} className="text-nexus-code" /> Tactical Surveillance Grid
               </h3>
               {!analysis && (
                 <Button onClick={handleAnalyze} disabled={analyzing} icon={analyzing ? <Loader2 className="animate-spin"/> : <Crosshair size={14}/>}>
                   {analyzing ? 'Running Forensics...' : 'Initialize Analysis'}
                 </Button>
               )}
            </div>

            {analysis ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
                 {/* Cell 1: Origin & Trigger */}
                 <GridCell title="Trigger Event" icon={<Zap size={14} className="text-amber-500"/>}>
                    <p className="text-lg font-medium text-white leading-tight mb-2">"{analysis.surveillance.trigger}"</p>
                    <p className="text-sm text-gray-400">{analysis.surveillance.drivers}</p>
                 </GridCell>

                 {/* Cell 2: Cluster Analysis (Context) */}
                 <GridCell title="Cluster Context" icon={<Network size={14} className="text-nexus-social"/>}>
                    <div className="flex flex-col gap-2 h-full">
                        <p className="text-sm text-white leading-relaxed">{analysis.surveillance.clusterAnalysis}</p>
                        <div className="mt-auto flex items-center gap-2 pt-2">
                             <div className="text-xs text-gray-500">Cluster:</div>
                             <Badge colorClass="text-white bg-white/10">{trend.cluster}</Badge>
                             <Badge colorClass={trend.metrics.clusterCentrality > 70 ? "text-green-400 bg-green-400/10" : "text-amber-400 bg-amber-400/10"}>
                                {trend.metrics.clusterCentrality > 70 ? "CORE TOPIC" : "FRINGE"}
                             </Badge>
                        </div>
                    </div>
                 </GridCell>

                 {/* Cell 3: Forecast & Sustainability */}
                 <GridCell title="Forecast" icon={<TrendingUp size={14} className="text-nexus-code"/>}>
                    <div className="mb-3">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Sustainability Rating</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                             analysis.surveillance.sustainability === 'LONG' ? 'bg-emerald-500/20 text-emerald-400' :
                             analysis.surveillance.sustainability === 'MEDIUM' ? 'bg-blue-500/20 text-blue-400' :
                             'bg-red-500/20 text-red-400'
                          }`}>{analysis.surveillance.sustainability}</span>
                       </div>
                       <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                          <div className={`h-full ${
                             analysis.surveillance.sustainability === 'LONG' ? 'w-3/4 bg-emerald-500' : 
                             analysis.surveillance.sustainability === 'MEDIUM' ? 'w-1/2 bg-blue-500' : 'w-1/4 bg-red-500'
                          }`} />
                       </div>
                    </div>
                    <p className="text-sm text-gray-300 border-l-2 border-white/20 pl-3 italic">
                       "{analysis.surveillance.forecast}"
                    </p>
                 </GridCell>

                 {/* Cell 4: Risks */}
                 <GridCell title="Risk Factors" icon={<ShieldAlert size={14} className="text-red-500"/>}>
                    <ul className="space-y-2">
                       {analysis.surveillance.risks.map((r, i) => (
                          <li key={i} className="text-sm text-red-200/80 flex items-start gap-2">
                             <span className="text-red-500 mt-1">×</span> {r}
                          </li>
                       ))}
                    </ul>
                 </GridCell>
              </div>
            ) : (
              <div className="h-64 border border-white/5 border-dashed rounded-xl flex items-center justify-center flex-col gap-4 bg-white/[0.02]">
                 <div className="w-16 h-16 rounded-full bg-nexus-code/10 flex items-center justify-center animate-pulse">
                    <Search size={24} className="text-nexus-code opacity-50" />
                 </div>
                 <p className="text-gray-500 font-mono text-sm">Waiting for forensic analysis...</p>
              </div>
            )}
          </div>

          {/* Opportunity Builder Actions */}
          {analysis && (
            <div className="pt-8 border-t border-white/5">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <Layers size={18} className="text-nexus-social" /> Opportunity Builder
                 </h3>
                 <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">AI GENERATED ASSETS</span>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 <ActionButton 
                    icon={<Globe size={20}/>} 
                    label="Generate Domains" 
                    onClick={() => handleBuild('DOMAINS')} 
                    active={builderOutput?.type === 'DOMAINS'}
                  />
                 <ActionButton 
                    icon={<Cpu size={20}/>} 
                    label="SaaS Concepts" 
                    onClick={() => handleBuild('SAAS')}
                    active={builderOutput?.type === 'SAAS'}
                 />
                 <ActionButton 
                    icon={<Video size={20}/>} 
                    label="Course Outline" 
                    onClick={() => handleBuild('COURSE')}
                    active={builderOutput?.type === 'COURSE'}
                 />
                 <ActionButton 
                    icon={<Layout size={20}/>} 
                    label="Landing Page" 
                    onClick={() => handleBuild('LANDING_PAGE')}
                    active={builderOutput?.type === 'LANDING_PAGE'}
                 />
               </div>

               {/* Builder Output Area */}
               {(buildingType || builderOutput) && (
                 <div className="bg-nexus-950 border border-white/10 rounded-xl p-6 shadow-inner min-h-[200px] relative">
                    {buildingType ? (
                       <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                          <Loader2 className="animate-spin text-nexus-code" size={32} />
                          <span className="text-xs font-mono text-gray-500 animate-pulse">Accessing AI Neural Core...</span>
                       </div>
                    ) : builderOutput ? (
                       <BuilderResultCard result={builderOutput} />
                    ) : null}
                 </div>
               )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

export const Dashboard: React.FC<{ onClose: () => void; initialCategory?: Category; isDemo?: boolean }> = ({ onClose, initialCategory, isDemo = false }) => {
  const [activeView, setActiveView] = useState<ModuleView>('SURVEILLANCE');
  const [timeRange, setTimeRange] = useState<TimeFrame>('24H');
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory || Category.SOCIAL);
  const [cryptoFilter, setCryptoFilter] = useState<CryptoCapFilter>('ALL');
  const [minVelocity, setMinVelocity] = useState(50);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [cryptoTrends, setCryptoTrends] = useState<Trend[]>([]);
  const [isLoadingCrypto, setIsLoadingCrypto] = useState(false);
  const [hasLoadedCrypto, setHasLoadedCrypto] = useState(false);

  // Effect to fetch real crypto trends when tab is selected
  useEffect(() => {
    if (selectedCategory === Category.CRYPTO && !hasLoadedCrypto && !isDemo) {
        const loadCrypto = async () => {
            setIsLoadingCrypto(true);
            try {
                const trends = await fetchLiveCryptoTrends();
                setCryptoTrends(trends);
                setHasLoadedCrypto(true);
            } catch (e) {
                console.error("Failed to load crypto signals", e);
            } finally {
                setIsLoadingCrypto(false);
            }
        };
        loadCrypto();
    }
  }, [selectedCategory, hasLoadedCrypto, isDemo]);

  const filteredTrends = useMemo(() => {
    const now = Date.now();
    const timeLimits: Record<TimeFrame, number> = {
      '1H': 60 * 60 * 1000,
      '6H': 6 * 60 * 60 * 1000,
      '24H': 24 * 60 * 60 * 1000,
      '7D': 7 * 24 * 60 * 60 * 1000,
      '1M': 30 * 24 * 60 * 60 * 1000,
    };
    
    const maxAge = timeLimits[timeRange];
    
    let allTrends = [...MOCK_TRENDS, ...cryptoTrends];
    
    return allTrends.filter(t => {
      // Category Filter (Mandatory)
      if (t.category !== selectedCategory) return false;
      
      // Special Crypto High/Low Cap Filter
      if (selectedCategory === Category.CRYPTO && cryptoFilter !== 'ALL') {
         if (cryptoFilter === 'HIGH_CAP' && !t.cryptoMetrics?.isHighCap) return false;
         if (cryptoFilter === 'LOW_CAP' && t.cryptoMetrics?.isHighCap) return false;
      }

      // Velocity Filter
      if (t.change < minVelocity) return false;
      
      // Time Filter
      const age = now - t.timestampValue;
      if (age > maxAge) return false;

      return true;
    }).sort((a, b) => b.change - a.change);
  }, [selectedCategory, minVelocity, timeRange, cryptoTrends, cryptoFilter, isDemo]);

  // Demo: Split into visible vs blurred
  const visibleTrends = isDemo ? filteredTrends.slice(0, 2) : filteredTrends;
  const blurredTrendCount = isDemo ? 12 : 0;

  const renderContent = () => {
    switch (activeView) {
      case 'DOMAIN_SNIPER':
        return <DomainSniper />;
      case 'SAAS_BUILDER':
        return <SaaSBuilder />;
      case 'AFFILIATE_NEXUS':
        return <AffiliateBuilder />;
      case 'SURVEILLANCE':
      default:
        return (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Demo Banner */}
            {isDemo && (
               <div className="bg-nexus-code/10 border-b border-nexus-code/20 p-2 text-center text-xs font-mono text-nexus-code flex items-center justify-center gap-2">
                  <Lock size={12} /> DEMO MODE: Limited Data Stream Active.
               </div>
            )}

            {/* Filters */}
            <div className="border-b border-white/5 bg-nexus-900/30 backdrop-blur-sm px-6 py-4 z-10">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-6">
                     {/* Time Toggle */}
                     <div className="flex p-1 bg-white/5 rounded-lg border border-white/5">
                      {(['1H', '6H', '24H', '7D', '1M'] as TimeFrame[]).map(range => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-4 py-1.5 rounded text-xs font-mono font-medium transition-all ${timeRange === range ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                    {/* Category Toggle - Pulsing Tabs with Specific Colors */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                      {Object.values(Category).map(cat => {
                        const config = CATEGORY_CONFIG[cat];
                        const isActive = selectedCategory === cat;
                        
                        // Specific Neon/Pulsing Colors
                        let activeClass = '';
                        if (isActive) {
                            if (cat === Category.CODE) activeClass = 'bg-nexus-code/20 text-nexus-code border-nexus-code/50 shadow-[0_0_15px_rgba(56,189,248,0.3)] animate-[pulse_3s_infinite]';
                            if (cat === Category.SOCIAL) activeClass = 'bg-nexus-social/20 text-nexus-social border-nexus-social/50 shadow-[0_0_15px_rgba(244,114,182,0.3)] animate-[pulse_3s_infinite]';
                            if (cat === Category.MARKET) activeClass = 'bg-nexus-market/20 text-nexus-market border-nexus-market/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-[pulse_3s_infinite]';
                            if (cat === Category.BUSINESS) activeClass = 'bg-nexus-biz/20 text-nexus-biz border-nexus-biz/50 shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-[pulse_3s_infinite]';
                            if (cat === Category.CRYPTO) activeClass = 'bg-nexus-crypto/20 text-nexus-crypto border-nexus-crypto/50 shadow-[0_0_15px_rgba(167,139,250,0.3)] animate-[pulse_3s_infinite]';
                        }

                        return (
                          <button 
                             key={cat} 
                             onClick={() => setSelectedCategory(cat)} 
                             className={`
                                relative px-4 py-2 rounded-full border text-xs flex items-center gap-2 transition-all duration-300
                                ${isActive 
                                  ? `${activeClass} font-bold` 
                                  : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-white/5'}
                             `}
                          >
                            {config.icon} 
                            <span className="tracking-wide">{config.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Sub-Filter for Crypto */}
                  {selectedCategory === Category.CRYPTO && (
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">Sector Depth:</span>
                         <button onClick={() => setCryptoFilter('ALL')} className={`px-3 py-1 rounded border text-[10px] font-mono ${cryptoFilter === 'ALL' ? 'bg-nexus-crypto/20 border-nexus-crypto text-nexus-crypto' : 'border-white/10 text-gray-500'}`}>ALL</button>
                         <button onClick={() => setCryptoFilter('HIGH_CAP')} className={`px-3 py-1 rounded border text-[10px] font-mono ${cryptoFilter === 'HIGH_CAP' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'border-white/10 text-gray-500'}`}>HIGH CAP (>100M)</button>
                         <button onClick={() => setCryptoFilter('LOW_CAP')} className={`px-3 py-1 rounded border text-[10px] font-mono ${cryptoFilter === 'LOW_CAP' ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'border-white/10 text-gray-500'}`}>LOW CAP (GEMS)</button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                   <span>Velocity {minVelocity}%+</span>
                   <input type="range" min="0" max="500" step="10" value={minVelocity} onChange={(e) => setMinVelocity(Number(e.target.value))} className="w-32 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-nexus-code" />
                </div>
              </div>
            </div>

            {/* Feed Grid */}
            <div className="flex-1 overflow-y-auto p-6 bg-grid-pattern relative custom-scrollbar">
               {isLoadingCrypto && selectedCategory === Category.CRYPTO ? (
                   <div className="flex flex-col items-center justify-center h-64 gap-4">
                       <Loader2 size={32} className="text-nexus-crypto animate-spin" />
                       <p className="font-mono text-sm text-gray-500 animate-pulse">Injecting Real-Time DexScreener/Gecko Data Stream...</p>
                   </div>
               ) : visibleTrends.length > 0 ? (
                 <>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-6">
                     {visibleTrends.map(trend => (
                       <TrendCard key={trend.id} trend={trend} activeTimeFrame={timeRange} onClick={() => setSelectedTrend(trend)} />
                     ))}
                   </div>
                   
                   {/* Demo Blur Effect */}
                   {isDemo && (
                      <div className="relative">
                         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                            <div className="p-8 bg-nexus-900/90 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl text-center max-w-md">
                               <Lock size={48} className="mx-auto text-nexus-code mb-4" />
                               <h3 className="text-xl font-bold text-white mb-2">Unlock Full Trend Intelligence</h3>
                               <p className="text-gray-400 text-sm mb-6">Access 50+ real-time signals, deep forensics, and unrestricted generative tools.</p>
                               <Button className="w-full">Upgrade to Pro</Button>
                            </div>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 filter blur-md select-none opacity-50 pointer-events-none">
                            {Array.from({length: blurredTrendCount}).map((_, i) => (
                               <div key={i} className="bg-white/5 h-64 rounded-xl border border-white/5 p-5">
                                  <div className="w-1/3 h-4 bg-white/10 rounded mb-4"/>
                                  <div className="w-2/3 h-6 bg-white/10 rounded mb-4"/>
                                  <div className="w-full h-32 bg-white/5 rounded"/>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                 </>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <Filter size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-mono">No signals detected in this timeframe.</p>
                    <button onClick={() => setTimeRange('7D')} className="mt-4 text-nexus-code hover:underline text-sm">Widen scan range</button>
                 </div>
               )}
            </div>

            {/* Detail Slide-Over */}
            {selectedTrend && (
              <div className="absolute inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedTrend(null)} />
                <TrendDetailPanel trend={selectedTrend} onClose={() => setSelectedTrend(null)} />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-nexus-950 flex flex-col">
      {/* Dashboard Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-nexus-950/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <div className="flex items-center gap-3 cursor-pointer" onClick={onClose}>
             <LogoIcon />
             <div className="flex flex-col justify-center h-full -space-y-0.5">
               <span className="font-sans font-bold text-white tracking-tight text-lg leading-none">
                 Meta<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500">Engine</span>
               </span>
             </div>
          </div>
          <span className="hidden md:inline text-gray-700 mx-2">|</span>
          <span className="hidden md:inline font-mono text-sm text-gray-400">SURVEILLANCE_FEED</span>
          
          {activeView !== 'SURVEILLANCE' && (
             <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded text-gray-400 flex items-center gap-2">
               <ArrowRight size={10}/> {activeView.replace('_', ' ')}
             </span>
          )}
          {isDemo && (
              <Badge colorClass="bg-nexus-code/20 text-nexus-code border-nexus-code/20">DEMO MODE</Badge>
          )}
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
          <X size={20} className="text-gray-400 group-hover:text-white" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeView={activeView} onViewChange={setActiveView} />

        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
};

const TrendCard: React.FC<{ trend: Trend; activeTimeFrame: TimeFrame; onClick: () => void }> = ({ trend, activeTimeFrame, onClick }) => {
  const config = CATEGORY_CONFIG[trend.category];
  
  // Use data specific to the active timeframe
  const chartData = trend.sparklineData[activeTimeFrame] || trend.sparklineData['24H'];

  return (
    <div onClick={onClick} className={`group relative bg-nexus-900/40 backdrop-blur-md border border-white/5 hover:border-${config.color.replace('text-', '')}/50 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] overflow-hidden ${trend.isAnomaly ? 'ring-1 ring-red-500/30' : ''}`}>
      <div className={`absolute top-0 left-0 w-full h-[2px] ${config.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {trend.isAnomaly && (
        <div className="absolute top-2 right-2 animate-pulse z-10">
          <AlertCircle size={14} className="text-red-500" />
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded bg-white/5 ${config.color}`}>{config.icon}</div>
          <span className={`text-[10px] font-mono font-bold tracking-wider opacity-70 ${config.color}`}>{config.label.split(' ')[0].toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-1 text-nexus-code font-mono text-xs font-bold bg-nexus-code/10 px-2 py-1 rounded">
           <TrendingUp size={12} /> {trend.velocity}%
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1 leading-snug group-hover:text-gray-200 transition-colors truncate">{trend.title}</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-gray-500 font-mono">{trend.cluster}</span>
        {trend.category === Category.CRYPTO && trend.cryptoMetrics && (
           <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${trend.cryptoMetrics.isHighCap ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-amber-500/30 bg-amber-500/10 text-amber-400'}`}>
             {trend.cryptoMetrics.isHighCap ? 'HIGH CAP' : 'LOW CAP'}
           </span>
        )}
      </div>

      {/* Crypto Specific Mini-Dashboard on Card */}
      {trend.category === Category.CRYPTO && trend.cryptoMetrics ? (
        <div className="grid grid-cols-2 gap-2 mb-4 text-[10px] font-mono">
            <div className="bg-white/5 p-2 rounded border border-white/5">
                <span className="text-gray-500 block">MCap</span>
                <span className="text-white font-bold">{trend.cryptoMetrics.marketCap}</span>
            </div>
             <div className="bg-white/5 p-2 rounded border border-white/5">
                <span className="text-gray-500 block">Vol</span>
                <span className="text-white font-bold">{trend.cryptoMetrics.volume24h}</span>
            </div>
        </div>
      ) : (
        <div className="h-12 -mx-2 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                <Line 
                    type="basis" 
                    dataKey="value" 
                    stroke={config.color === 'text-nexus-code' ? '#38bdf8' : config.color === 'text-nexus-social' ? '#f472b6' : config.color === 'text-nexus-market' ? '#fbbf24' : config.color === 'text-nexus-crypto' ? '#a78bfa' : '#34d399'} 
                    strokeWidth={2} 
                    dot={false} 
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] font-mono text-gray-500">
         <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Activity size={10} /> {trend.signalCount}</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {trend.timestamp}</span>
         </div>
         <div className="flex gap-2">{SOURCES.slice(0, 3).map((s) => <span key={s.name} className="text-gray-600 group-hover:text-gray-400">{s.icon}</span>)}</div>
      </div>
    </div>
  );
};
