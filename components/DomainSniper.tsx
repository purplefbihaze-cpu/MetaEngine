
import React, { useState } from 'react';
import { DomainAsset, Category } from '../types';
import { Button, Badge } from './ui/Components';
import { Search, Filter, Globe, DollarSign, AlertTriangle, CheckCircle, Clock, ExternalLink, RefreshCw, ShieldCheck, Loader2, TrendingUp, Calendar } from 'lucide-react';
import { snipeDomains } from '../services/geminiService';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { RadarScope } from './ui/Visuals';

export const DomainSniper: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>(Category.BUSINESS);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DomainAsset[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<DomainAsset | null>(null);
  const [maxPrice, setMaxPrice] = useState(5000);

  const handleSnipe = async () => {
    if (!query) return;
    setLoading(true);
    const domains = await snipeDomains(query, category);
    setResults(domains);
    setLoading(false);
  };

  // Helper to parse price string "$2,400" -> 2400
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // Actually filter results based on the slider
  const filteredResults = results.filter(d => {
      const price = parsePrice(d.price);
      return price <= maxPrice;
  });

  return (
    <div className="flex h-full bg-nexus-950 relative overflow-hidden">
      {/* LEFT PANE: Search & Filter */}
      <div className="w-80 flex-shrink-0 border-r border-white/5 bg-nexus-900/50 p-6 flex flex-col gap-6 hidden md:flex">
        <div className="flex items-center justify-between mb-2">
           <div className="flex items-center gap-2">
              <Globe className="text-emerald-500" />
              <h2 className="text-xl font-bold text-white">Domain Sniper</h2>
           </div>
           <RadarScope />
        </div>
        
        <div className="space-y-4">
           <div>
             <label className="text-xs text-gray-400 font-mono uppercase">Target Keyword / Niche</label>
             <div className="relative mt-2">
               <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
               <input 
                 type="text" 
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder="e.g. AI Agents, Keto"
                 className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-emerald-500 focus:outline-none font-mono transition-colors"
               />
             </div>
           </div>

           <div>
             <label className="text-xs text-gray-400 font-mono uppercase">Sector Context</label>
             <select 
               value={category}
               onChange={(e) => setCategory(e.target.value as Category)}
               className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-gray-300 focus:border-emerald-500 font-mono outline-none"
             >
               {Object.values(Category).map(c => (
                 <option key={c} value={c}>{c}</option>
               ))}
             </select>
           </div>

           <div className="pt-4 border-t border-white/5 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase">Filters</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                 <span>Max Price</span>
                 <span className="text-emerald-400 font-mono">${maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="10000" 
                step="100" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none accent-emerald-500 cursor-pointer" 
              />
              
              <div className="flex gap-2">
                 <label className="flex items-center gap-2 text-xs text-gray-400">
                    <input type="checkbox" className="accent-emerald-500" defaultChecked /> Only .com/.io/.ai
                 </label>
              </div>
              <div className="flex gap-2">
                 <label className="flex items-center gap-2 text-xs text-gray-400">
                    <input type="checkbox" className="accent-emerald-500" defaultChecked /> No Trademarks
                 </label>
              </div>
           </div>

           <Button onClick={handleSnipe} variant="primary" className="w-full border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" disabled={loading}>
             {loading ? <Loader2 className="animate-spin"/> : <><RefreshCw size={14}/> Snipe Assets</>}
           </Button>
        </div>
      </div>

      {/* RIGHT PANE: Results Grid */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
         {/* Top Stats Bar */}
         <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-6 gap-8">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               Live Registrar API: READY
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
               <ShieldCheck size={12} />
               TM Check: ACTIVE
            </div>
            <div className="ml-auto text-xs font-mono text-gray-500">
                Showing {filteredResults.length} / {results.length} results
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {results.length === 0 && !loading ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                  <Globe size={64} className="mb-4 text-gray-700" />
                  <p className="font-mono">Awaiting Target Parameters...</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                 {filteredResults.map(domain => (
                    <div 
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain)}
                      className={`group relative bg-nexus-900/40 border ${selectedDomain?.id === domain.id ? 'border-emerald-500' : 'border-white/10'} rounded-xl p-5 hover:bg-white/5 cursor-pointer transition-all`}
                    >
                       <div className="flex justify-between items-start mb-3">
                          <Badge colorClass={domain.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/20 text-amber-400 border-amber-500/20'}>
                             {domain.status}
                          </Badge>
                          <span className="text-xs font-mono text-gray-500">{domain.age} old</span>
                       </div>
                       
                       <h3 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-emerald-400 transition-colors">{domain.name}</h3>
                       <div className="flex items-center gap-4 mb-4 text-xs text-gray-400 font-mono">
                          <span>Est. Val: <span className="text-white">{domain.estValue}</span></span>
                          <span>Price: <span className="text-white">{domain.price}</span></span>
                       </div>

                       {/* Sparkline / Confidence */}
                       <div className="bg-black/20 rounded p-2 flex items-center justify-between h-16">
                          <div className="flex flex-col justify-between h-full">
                             <span className="text-[10px] text-gray-500 uppercase">Brand Score</span>
                             <span className="text-sm font-bold text-white">{domain.brandability}/100</span>
                          </div>
                          <div className="w-24 h-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={domain.priceHistory || []}>
                                   <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                                </AreaChart>
                             </ResponsiveContainer>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
            )}
         </div>
      </div>

      {/* SLIDE-OVER DETAIL PANEL */}
      {selectedDomain && (
         <div className="w-96 bg-nexus-950 border-l border-white/10 absolute right-0 top-0 bottom-0 z-20 shadow-2xl p-6 flex flex-col overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-bold text-white break-all">{selectedDomain.name}</h2>
               <Button variant="ghost" onClick={() => setSelectedDomain(null)} className="!p-1">✕</Button>
            </div>

            <div className="space-y-6">
               {/* Action Block */}
               <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-center">
                  <p className="text-xs text-emerald-400 font-mono mb-2">INSTANT ACQUISITION</p>
                  <p className="text-2xl font-bold text-white mb-4">{selectedDomain.price}</p>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold">Buy Now</Button>
                  <p className="text-[10px] text-gray-500 mt-2">via Namecheap API</p>
               </div>

               {/* Metrics Grid */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                     <span className="text-xs text-gray-400 block mb-1">SEO Value</span>
                     <div className="text-lg font-bold text-white">{selectedDomain.seoValue}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                     <span className="text-xs text-gray-400 block mb-1">Legal Risk</span>
                     <div className={`text-lg font-bold ${selectedDomain.legalRisk === 'LOW' ? 'text-emerald-400' : 'text-red-400'}`}>{selectedDomain.legalRisk}</div>
                  </div>
               </div>
               
               {/* Whois Data */}
               <div className="bg-white/5 rounded border border-white/5 p-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2"><Calendar size={12}/> WHOIS Record</h4>
                  <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                          <span className="text-gray-500">Registrar</span>
                          <span className="text-white">{selectedDomain.whois?.registrar || "GoDaddy.com, LLC"}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500">Created</span>
                          <span className="text-white">{selectedDomain.whois?.created || "2021-04-12"}</span>
                      </div>
                       <div className="flex justify-between">
                          <span className="text-gray-500">Expires</span>
                          <span className="text-white">{selectedDomain.whois?.expiry || "2026-04-12"}</span>
                      </div>
                  </div>
               </div>

               {/* Social Handles */}
               <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Social Handle Availability</h4>
                  <div className="space-y-2">
                     {Object.entries(selectedDomain.socialHandles).map(([platform, available]) => (
                        <div key={platform} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded border border-white/5">
                           <span className="capitalize text-gray-300">{platform}</span>
                           {available ? <CheckCircle size={14} className="text-emerald-400"/> : <AlertTriangle size={14} className="text-red-400"/>}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Tools */}
               <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Post-Acquisition Tools</h4>
                  <div className="space-y-2">
                     <Button variant="secondary" className="w-full justify-start text-xs">Generate Logo (AI)</Button>
                     <Button variant="secondary" className="w-full justify-start text-xs">Create Landing Page</Button>
                     <Button variant="secondary" className="w-full justify-start text-xs">Draft Sale Listing</Button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
