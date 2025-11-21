
import React, { useState, useEffect } from 'react';
import { SaaSBlueprint, SaaSConceptRequest } from '../types';
import { generateSaaSConcepts } from '../services/geminiService';
import { Button, Badge } from './ui/Components';
import { Cpu, Zap, Layers, Code, BarChart, Shield, ArrowRight, Check, Layout, Database, Loader2, User, Search, Mail, Share2, FileText } from 'lucide-react';
import { HoloCube } from './ui/Visuals';

// --- Typing Animation Hook ---
const useTypingEffect = (texts: string[], speed = 100, pause = 2000) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[index % texts.length];
    
    const handleTyping = () => {
      if (isDeleting) {
          setText(prev => currentFullText.substring(0, prev.length - 1));
      } else {
          setText(prev => currentFullText.substring(0, prev.length + 1));
      }

      if (!isDeleting && text === currentFullText) {
         setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && text === '') {
         setIsDeleting(false);
         setIndex(prev => prev + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, texts, speed, pause]);

  return text;
};

export const SaaSBuilder: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<SaaSConceptRequest>({
    niche: '',
    trendContext: '',
    audience: 'Solopreneurs',
    complexity: 'NO_CODE'
  });
  const [concepts, setConcepts] = useState<SaaSBlueprint[]>([]);
  const [selectedConcept, setSelectedConcept] = useState<SaaSBlueprint | null>(null);
  const [activeTab, setActiveTab] = useState<'PRODUCT' | 'TECH' | 'MARKET'>('PRODUCT');
  
  const placeholderNiche = useTypingEffect(['AI Copywriting for Realtors', 'Crypto Portfolio Tracker', 'TikTok Trend Scraper', 'Legal Document Automation'], 100, 2000);
  
  const placeholderContext = useTypingEffect(['High Season Q4', 'Competitors are too expensive', 'Viral on Reddit', 'New API released'], 100, 2500);

  const handleGenerate = async () => {
    if (!params.niche) return;
    setLoading(true);
    const blueprints = await generateSaaSConcepts(params);
    setConcepts(blueprints);
    setLoading(false);
    setStep(2);
  };

  return (
    <div className="flex h-full bg-nexus-950 overflow-hidden">
       {/* STEPPER SIDEBAR */}
       <div className="w-64 border-r border-white/5 bg-nexus-900/30 p-6 flex flex-col gap-8 hidden lg:flex">
          <div className="flex items-center gap-2">
             <Cpu className="text-cyan-400" />
             <h2 className="text-lg font-bold text-white leading-none">Micro-SaaS<br/><span className="text-xs font-normal text-gray-400">Factory</span></h2>
          </div>
          
          <div className="space-y-6 relative">
             <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10 z-0" />
             {[1, 2, 3].map((s) => (
                <div key={s} className={`relative z-10 flex items-center gap-3 ${step >= s ? 'opacity-100' : 'opacity-40'}`}>
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step === s ? 'bg-cyan-500 border-cyan-500 text-black' : step > s ? 'bg-cyan-500/20 border-cyan-500 text-cyan-500' : 'bg-black border-white/20 text-white'}`}>
                      {step > s ? <Check size={12}/> : s}
                   </div>
                   <span className="text-sm font-mono font-medium text-white">
                      {s === 1 ? 'Parameters' : s === 2 ? 'Idea Engine' : 'Blueprint'}
                   </span>
                </div>
             ))}
          </div>
       </div>

       {/* MAIN CONTENT AREA */}
       <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
          {/* STEP 1: INPUT */}
          {step === 1 && (
             <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center mb-8">
                   <div>
                       <h1 className="text-3xl font-bold text-white mb-2">Define Your Product</h1>
                       <p className="text-gray-400">Configure the AI architect parameters to generate viable Micro-SaaS concepts.</p>
                   </div>
                   <div className="hidden xl:block ml-4">
                      <HoloCube />
                   </div>
                </div>

                <div className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                   
                   <div>
                      <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase">Target Niche / Trend</label>
                      <div className="relative">
                          <input 
                            type="text" 
                            placeholder={placeholderNiche}
                            className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-cyan-500 outline-none transition-colors font-mono placeholder-gray-600"
                            value={params.niche}
                            onChange={(e) => setParams({...params, niche: e.target.value})}
                          />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase">Trend Context (Optional)</label>
                      <input 
                        type="text" 
                        placeholder={placeholderContext}
                        className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-cyan-500 outline-none transition-colors font-mono placeholder-gray-600"
                        value={params.trendContext}
                        onChange={(e) => setParams({...params, trendContext: e.target.value})}
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase">Target Audience</label>
                        <select 
                           className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-cyan-500 outline-none"
                           value={params.audience}
                           onChange={(e) => setParams({...params, audience: e.target.value})}
                        >
                           <option>Solopreneurs</option>
                           <option>Small Agencies</option>
                           <option>Enterprise (B2B)</option>
                           <option>Consumers (B2C)</option>
                           <option>Developers</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase">Tech Complexity</label>
                        <select 
                           className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-cyan-500 outline-none"
                           value={params.complexity}
                           onChange={(e) => setParams({...params, complexity: e.target.value as any})}
                        >
                           <option value="NO_CODE">No-Code (Bubble/Webflow)</option>
                           <option value="LOW_CODE">Low-Code (Next.js + BaaS)</option>
                           <option value="FULL_CODE">Full-Code (Custom Stack)</option>
                        </select>
                      </div>
                   </div>

                   <Button onClick={handleGenerate} className="w-full mt-4 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold" disabled={loading}>
                      {loading ? <div className="flex items-center gap-2"><Loader2 className="animate-spin"/> Architecting Solutions...</div> : <div className="flex items-center gap-2"><Zap size={16}/> Generate Concepts</div>}
                   </Button>
                </div>
             </div>
          )}

          {/* STEP 2: IDEA ENGINE */}
          {step === 2 && (
             <div className="animate-in fade-in slide-in-from-right-4">
                <div className="flex justify-between items-center mb-8">
                   <h2 className="text-2xl font-bold text-white">Generated Concepts</h2>
                   <Button variant="ghost" onClick={() => setStep(1)}>Back to Parameters</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                   {concepts.map((concept, idx) => (
                      <div key={idx} className="bg-nexus-900/50 border border-white/10 p-6 rounded-xl hover:border-cyan-500/50 hover:bg-cyan-900/5 transition-all flex flex-col h-full group">
                         <div className="flex justify-between items-start mb-4">
                             <Badge colorClass="bg-cyan-500/20 text-cyan-400 border-cyan-500/20">MVP READY</Badge>
                             <span className="text-xs text-gray-500 font-mono">{concept.timeToMarket}</span>
                         </div>
                         <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{concept.title}</h3>
                         <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-3">{concept.oneLiner}</p>
                         
                         <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 p-2 rounded">
                               <Zap size={14} className="text-yellow-400"/> 
                               <span className="truncate">{concept.monetization[0]}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 p-2 rounded">
                               <Code size={14} className="text-cyan-400"/> 
                               <span className="truncate">{concept.techStack.frontend} + {concept.techStack.backend}</span>
                            </div>
                         </div>

                         <Button onClick={() => { setSelectedConcept(concept); setStep(3); }} className="w-full mt-auto bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/10">
                            View Blueprint <ArrowRight size={14}/>
                         </Button>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* STEP 3: BLUEPRINT DETAIL */}
          {step === 3 && selectedConcept && (
             <div className="animate-in zoom-in-95 duration-300 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                   <div>
                      <Button variant="ghost" onClick={() => setStep(2)} className="mb-4 pl-0 hover:bg-transparent text-gray-500 hover:text-white">← Back to concepts</Button>
                      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{selectedConcept.title}</h1>
                      <p className="text-lg text-cyan-400 max-w-3xl">{selectedConcept.oneLiner}</p>
                   </div>
                   <div className="flex gap-3">
                      <Button variant="secondary" icon={<FileText size={16}/>}>Export PDF</Button>
                      <Button variant="primary" className="bg-cyan-600 hover:bg-cyan-500" icon={<Code size={16}/>}>Initialize Repo</Button>
                   </div>
                </div>

                {/* TABS */}
                <div className="flex items-center gap-6 border-b border-white/10 mb-8 overflow-x-auto">
                   <button onClick={() => setActiveTab('PRODUCT')} className={`pb-4 text-sm font-bold transition-colors ${activeTab === 'PRODUCT' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500 hover:text-white'}`}>PRODUCT ARCHITECTURE</button>
                   <button onClick={() => setActiveTab('TECH')} className={`pb-4 text-sm font-bold transition-colors ${activeTab === 'TECH' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-500 hover:text-white'}`}>TECH & DATA</button>
                   <button onClick={() => setActiveTab('MARKET')} className={`pb-4 text-sm font-bold transition-colors ${activeTab === 'MARKET' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-500 hover:text-white'}`}>GTM & GROWTH</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {/* LEFT COLUMN (2/3) */}
                   <div className="md:col-span-2 space-y-8">
                      {activeTab === 'PRODUCT' && (
                        <>
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Layout size={18} className="text-cyan-400"/> Core Product Logic</h3>
                             <div className="space-y-6">
                                <div>
                                   <span className="text-xs font-mono text-gray-500 uppercase">User Problem</span>
                                   <p className="text-gray-300 mt-1 bg-black/20 p-3 rounded border border-white/5">{selectedConcept.problem}</p>
                                </div>
                                <div>
                                   <span className="text-xs font-mono text-gray-500 uppercase">The Solution</span>
                                   <p className="text-gray-300 mt-1 bg-black/20 p-3 rounded border border-white/5">{selectedConcept.solution}</p>
                                </div>
                                <div>
                                   <span className="text-xs font-mono text-gray-500 uppercase">Wireframe Spec</span>
                                   <div className="mt-1 bg-black/40 p-4 rounded border border-cyan-500/20 text-sm font-mono text-cyan-100 whitespace-pre-wrap">
                                      {selectedConcept.wireframe}
                                   </div>
                                </div>
                             </div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><User size={18} className="text-pink-400"/> User Personas</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedConcept.personas?.map((persona, i) => (
                                   <div key={i} className="bg-black/20 p-4 rounded border border-white/5">
                                      <div className="font-bold text-white mb-1">{persona.role}</div>
                                      <div className="text-xs text-gray-400 mb-2">Goal: {persona.goal}</div>
                                      <div className="text-xs text-pink-400/80">Pain: "{persona.painPoint}"</div>
                                   </div>
                                ))}
                             </div>
                          </div>
                        </>
                      )}

                      {activeTab === 'TECH' && (
                         <>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Database size={18} className="text-purple-400"/> Data Model</h3>
                               <div className="grid gap-3">
                                  {selectedConcept.dataModel?.map((model, i) => (
                                     <div key={i} className="flex items-center gap-3 p-3 bg-black/40 rounded border border-white/5 font-mono text-sm text-purple-200">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"/>
                                        {model}
                                     </div>
                                  ))}
                               </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Shield size={18} className="text-red-400"/> Risk Analysis</h3>
                               <p className="text-gray-300 leading-relaxed">{selectedConcept.riskAnalysis}</p>
                            </div>
                         </>
                      )}

                      {activeTab === 'MARKET' && (
                         <>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BarChart size={18} className="text-emerald-400"/> Go-To-Market Plan</h3>
                               <ul className="space-y-3">
                                  {selectedConcept.marketingPlan.map((plan, i) => (
                                     <li key={i} className="flex items-start gap-3 text-gray-300 text-sm bg-black/20 p-3 rounded border border-white/5">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</div>
                                        {plan}
                                     </li>
                                  ))}
                               </ul>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Search size={14} className="text-blue-400"/> SEO Strategy</h3>
                                  <ul className="space-y-2">
                                     {selectedConcept.seoStrategy?.map((kw, i) => (
                                        <li key={i} className="text-xs text-blue-200 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 inline-block mr-2 mb-2">{kw}</li>
                                     ))}
                                  </ul>
                               </div>
                               <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Mail size={14} className="text-yellow-400"/> Email Sequence</h3>
                                  <ul className="space-y-2">
                                     {selectedConcept.emailSequence?.map((subj, i) => (
                                        <li key={i} className="text-xs text-gray-300 border-l-2 border-yellow-500/50 pl-2 py-1 italic">"{subj}"</li>
                                     ))}
                                  </ul>
                               </div>
                            </div>
                         </>
                      )}
                   </div>

                   {/* RIGHT COLUMN (1/3) - Always visible summary */}
                   <div className="md:col-span-1 space-y-6">
                      <div className="bg-black/40 rounded-xl p-6 border border-white/10 sticky top-6">
                         <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">Tech Stack</h3>
                         <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                               <span className="text-gray-500">Frontend</span>
                               <span className="text-white text-right">{selectedConcept.techStack.frontend}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="text-gray-500">Backend</span>
                               <span className="text-white text-right">{selectedConcept.techStack.backend}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="text-gray-500">Database</span>
                               <span className="text-white text-right">{selectedConcept.techStack.db}</span>
                            </div>
                            {selectedConcept.techStack.ai && (
                               <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">AI Model</span>
                                  <span className="text-cyan-400 text-right">{selectedConcept.techStack.ai}</span>
                               </div>
                            )}
                         </div>

                         <div className="border-t border-white/10 pt-4">
                           <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Monetization</h3>
                           <div className="flex flex-wrap gap-2">
                              {selectedConcept.monetization.map((m,i) => (
                                 <Badge key={i} colorClass="bg-emerald-500/10 text-emerald-300 border-emerald-500/20">{m}</Badge>
                              ))}
                           </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          )}
       </div>
    </div>
  );
};
