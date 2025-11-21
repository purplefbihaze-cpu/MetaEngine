
import React, { useState, useEffect, useRef } from 'react';
import { Button, Badge, SectionHeading } from './ui/Components';
import { NeuralGrid } from './ui/Visuals';
import { TrendingUp, Zap, Eye, Activity, Github, Twitter, Youtube, Globe, Cpu, Code, Coins, Search, ArrowRight, Check, ShieldAlert, Lock, ArrowDown } from 'lucide-react';

// --- HELPER COMPONENTS ---

// Scroll to section handler
const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

// "Continue" Button Component
const ContinueButton: React.FC<{ targetId: string }> = ({ targetId }) => (
    <Button 
        variant="secondary" 
        className="ml-auto py-2 px-4 text-xs uppercase tracking-widest border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
        onClick={() => scrollToSection(targetId)}
    >
        Continue <ArrowDown size={12} className="ml-2" />
    </Button>
);

// Section Observer Wrapper for Animation
const AnimatedSection: React.FC<{ id: string, children: React.ReactNode, className?: string }> = ({ id, children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) setIsVisible(true);
            });
        }, { threshold: 0.2 });

        const currentElement = domRef.current;
        if (currentElement) observer.unobserve(currentElement);
        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, []);

    return (
        <section 
            id={id} 
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'} ${className}`}
        >
            {children}
        </section>
    );
};

// 1. Hero Bubble
const TrendBubble: React.FC<{ x: number, y: number, size: number, color: string, label: string, velocity: number, delay: number }> = ({ x, y, size, color, label, velocity, delay }) => {
    const [hovered, setHovered] = useState(false);
    
    return (
        <div 
            className={`absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-125 hover:z-50`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: hovered ? color : `${color}40`,
                border: `1px solid ${color}`,
                boxShadow: hovered ? `0 0 30px ${color}` : `0 0 10px ${color}20`,
                animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${delay}s`
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
             {hovered ? (
                 <div className="absolute -top-12 bg-black/80 border border-white/10 p-2 rounded w-32 backdrop-blur-md text-center animate-in fade-in slide-in-from-bottom-2">
                     <div className="text-xs font-bold text-white">{label}</div>
                     <div className="text-[10px] font-mono text-cyan-400">Vel: +{velocity}%</div>
                 </div>
             ) : (
                 <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
             )}
        </div>
    );
};

// 2. Opportunity Reactor
const OpportunityReactor = () => {
    const [input, setInput] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleScan = () => {
        if (!input) return;
        setAnalyzing(true);
        setResult(null);
        
        // Simulate AI Processing
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                score: 94,
                audience: "Tech-Savvy SMB Owners",
                product: "Automated " + input + " Dashboard",
                domain: "Get" + input.replace(/\s/g, '') + ".ai",
                risk: "High Competition from Big Tech",
                forecast: "12-Month Uptrend"
            });
        }, 2500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-nexus-900/50 border border-white/10 rounded-2xl p-8 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            
            {!result && !analyzing && (
                <div className="w-full max-w-md relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-6">The Opportunity Reactor</h3>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter a trend (e.g. 'AI Law')"
                            className="w-full bg-black/60 border border-white/20 rounded-xl py-4 pl-6 pr-14 text-lg text-white focus:border-cyan-500 outline-none transition-colors font-mono"
                        />
                        <button 
                            onClick={handleScan}
                            className="absolute right-2 top-2 bottom-2 aspect-square bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-black rounded-lg flex items-center justify-center transition-all"
                        >
                            <Zap size={20} />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 font-mono">AI WILL ANALYZE VIABILITY, RISKS & ASSETS</p>
                </div>
            )}

            {analyzing && (
                <div className="flex flex-col items-center justify-center z-10">
                    <div className="w-24 h-24 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-xs text-cyan-400 animate-pulse">SCAN</span>
                        </div>
                    </div>
                    <div className="font-mono text-cyan-400 text-sm">
                        Processing Vector: {input}...
                    </div>
                    <div className="w-64 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-cyan-500 animate-[shimmer_2s_infinite] w-full origin-left" />
                    </div>
                </div>
            )}

            {result && (
                 <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
                     <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                         <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="text-xs text-gray-400 font-mono uppercase">Input Trend</div>
                                <h2 className="text-2xl font-bold text-white">{input}</h2>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-400 font-mono uppercase">Opp. Score</div>
                                <div className="text-4xl font-bold text-cyan-400">{result.score}/100</div>
                            </div>
                         </div>
                         
                         <div className="space-y-4">
                             <div>
                                 <div className="text-xs text-gray-500 font-mono mb-1">SUGGESTED PRODUCT</div>
                                 <div className="text-white font-medium flex items-center gap-2"><Cpu size={16} className="text-purple-400"/> {result.product}</div>
                             </div>
                             <div>
                                 <div className="text-xs text-gray-500 font-mono mb-1">AVAILABLE DOMAIN</div>
                                 <div className="text-white font-medium flex items-center gap-2"><Globe size={16} className="text-emerald-400"/> {result.domain}</div>
                             </div>
                         </div>
                     </div>

                     <div className="space-y-4">
                         <div className="bg-black/40 border border-white/10 p-4 rounded-xl">
                             <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Audience</div>
                             <div className="text-white">{result.audience}</div>
                         </div>
                         <div className="bg-black/40 border border-white/10 p-4 rounded-xl">
                             <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Forecast</div>
                             <div className="text-emerald-400 font-bold flex items-center gap-2"><TrendingUp size={16}/> {result.forecast}</div>
                         </div>
                         <div className="bg-black/40 border border-red-500/20 p-4 rounded-xl">
                             <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Primary Risk</div>
                             <div className="text-red-400 flex items-center gap-2"><ShieldAlert size={16}/> {result.risk}</div>
                         </div>
                         <Button variant="ghost" onClick={() => setResult(null)} className="w-full text-xs">Scan Another Trend</Button>
                     </div>
                 </div>
            )}
        </div>
    );
};

// 3. Before / After Slider - Auto Animating
const ProofSlider: React.FC<{ title: string, before: string, after: string, metric: string }> = ({ title, before, after, metric }) => {
    const [slider, setSlider] = useState(30);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
        let animationFrame: number;
        let direction = 1;
        let speed = 0.2;
        
        const animate = () => {
            if (!isHovered) {
                setSlider(prev => {
                    if (prev >= 70) direction = -1;
                    if (prev <= 30) direction = 1;
                    return prev + (speed * direction);
                });
            }
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isHovered]);
    
    return (
        <div 
            className="bg-nexus-900 border border-white/10 rounded-xl overflow-hidden relative h-48 group cursor-ew-resize"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white border border-white/10">{title}</div>
            
            {/* AFTER IMAGE (Right side revealed) */}
            <div className="absolute inset-0 bg-emerald-900/20 flex items-center justify-center">
                 <div className="text-center">
                     <div className="text-emerald-400 font-bold text-2xl mb-1">{metric}</div>
                     <div className="text-gray-300 text-sm px-8">{after}</div>
                 </div>
            </div>

            {/* BEFORE IMAGE (Left side masked) */}
            <div 
                className="absolute inset-0 bg-nexus-800 flex items-center justify-center border-r-2 border-white overflow-hidden"
                style={{ width: `${slider}%` }}
            >
                 <div className="w-full text-center px-8" style={{ width: '100vw' }}> {/* Hack to keep text centered relative to container */}
                     <div className="text-gray-500 font-mono text-xs mb-2">PRE-TREND SIGNAL</div>
                     <div className="text-gray-300 text-sm">{before}</div>
                 </div>
            </div>

            {/* Slider Handle */}
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={slider} 
                onChange={(e) => { setIsHovered(true); setSlider(Number(e.target.value)); }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
            <div 
                className="absolute top-0 bottom-0 w-8 bg-white/10 flex items-center justify-center pointer-events-none z-20 backdrop-blur-sm"
                style={{ left: `calc(${slider}% - 16px)` }}
            >
                <div className="w-1 h-8 bg-white/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
        </div>
    );
}

const MiniTile: React.FC<{ title: string, icon: React.ReactNode, value: string, trend: 'up' | 'down' | 'flat', color: string }> = ({ title, icon, value, trend, color }) => (
    <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col justify-between hover:bg-white/5 transition-colors group">
        <div className="flex justify-between items-start mb-2">
            <div className={`p-1.5 rounded bg-white/5 ${color}`}>{icon}</div>
            <div className={`text-[10px] font-mono ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {trend === 'up' ? '▲' : '▼'}
            </div>
        </div>
        <div>
            <div className="text-lg font-bold text-white group-hover:scale-105 transition-transform origin-left">{value}</div>
            <div className="text-[10px] text-gray-500 uppercase font-mono">{title}</div>
        </div>
    </div>
);

export const DemoDashboardPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-nexus-950 text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION: The Live Prophecy Screen */}
      <section id="section-hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
        <NeuralGrid />
        
        {/* Floating Bubbles */}
        <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
            <TrendBubble x={20} y={30} size={80} color="#06b6d4" label="AI Agents" velocity={450} delay={0} />
            <TrendBubble x={70} y={20} size={60} color="#d946ef" label="TikTok Shop" velocity={210} delay={1} />
            <TrendBubble x={50} y={60} size={100} color="#8b5cf6" label="MemeFi" velocity={890} delay={2} />
            <TrendBubble x={80} y={70} size={50} color="#10b981" label="Biohack" velocity={120} delay={3} />
            <TrendBubble x={15} y={75} size={70} color="#f59e0b" label="Nootropics" velocity={300} delay={0.5} />
        </div>

        <div className="relative z-10 text-center px-6 animate-in fade-in zoom-in duration-1000">
            <Badge colorClass="bg-white/10 text-white border-white/20 backdrop-blur-xl mb-6 shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse">
               ● LIVE SYSTEM PREVIEW
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
                THE <span className="text-cyan-400">STREAM</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
                Visualizing the world's hidden high-velocity data points in real-time.
            </p>
            <div className="flex items-center justify-center gap-4">
                <Button onClick={() => scrollToSection('section-engine')} className="group relative overflow-hidden px-8 py-4 text-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                    <span className="relative flex items-center gap-2">Enter the Stream <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></span>
                </Button>
            </div>
        </div>
      </section>

      {/* 2. INTERACTIVE TREND ENGINE SHOWCASE */}
      <AnimatedSection id="section-engine" className="py-24 border-b border-white/5">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                  <div className="flex-1">
                      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">Interactive Trend Engine</h2>
                      <p className="text-gray-400 text-lg font-light max-w-2xl leading-relaxed">Real-time signal processing across 30+ high-traffic sources.</p>
                      {/* Animated Loading Bar */}
                      <div className="relative h-1 w-32 bg-gray-800 rounded-full mt-6 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-nexus-code to-nexus-social animate-[shimmer_2s_linear_infinite] w-full" />
                      </div>
                  </div>
                  <div className="flex-shrink-0">
                     <ContinueButton targetId="section-universe" />
                  </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 rounded-2xl overflow-hidden bg-nexus-900/30 h-[600px] shadow-2xl shadow-cyan-900/10">
                  {/* Left: Ticker (Infinite Scroll) */}
                  <div className="lg:col-span-4 border-r border-white/10 relative overflow-hidden bg-black/20">
                      <div className="absolute top-0 left-0 w-full p-4 bg-nexus-950/80 border-b border-white/10 z-10 backdrop-blur">
                          <div className="text-xs font-mono text-gray-500 flex justify-between">
                              <span>INCOMING SIGNALS</span>
                              <span className="text-green-500 animate-pulse">● LIVE</span>
                          </div>
                      </div>
                      
                      <div className="py-12 space-y-4 animate-[float_20s_linear_infinite]">
                          {[1,2,3,4,5,6,7,8].map((i) => (
                              <div key={i} className="mx-4 p-4 bg-white/5 border-l-2 border-cyan-500 rounded-r hover:bg-white/10 transition-colors cursor-pointer">
                                  <div className="flex justify-between items-start mb-1">
                                      <span className="text-sm font-bold text-white">DeepSeek V3 Params</span>
                                      <span className="text-[10px] text-gray-500">2m ago</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-400">
                                      <Github size={12} /> Repo Activity Spike
                                  </div>
                              </div>
                          ))}
                          {[1,2,3,4,5].map((i) => (
                              <div key={`s-${i}`} className="mx-4 p-4 bg-white/5 border-l-2 border-fuchsia-500 rounded-r hover:bg-white/10 transition-colors cursor-pointer">
                                  <div className="flex justify-between items-start mb-1">
                                      <span className="text-sm font-bold text-white">"Monk Mode" Challenge</span>
                                      <span className="text-[10px] text-gray-500">5m ago</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-400">
                                      <Activity size={12} /> Viral Velocity > 800
                                  </div>
                              </div>
                          ))}
                      </div>
                      {/* Fade Overlay */}
                      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-nexus-900 to-transparent pointer-events-none"/>
                  </div>

                  {/* Right: AI Analysis */}
                  <div className="lg:col-span-8 p-8 relative flex flex-col justify-center bg-gradient-to-br from-nexus-900/50 to-black/50">
                      <div className="absolute top-8 right-8">
                         <Badge colorClass="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 animate-pulse">AI ANALYSIS MODE</Badge>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-2">DeepSeek V3 Leak</h3>
                      <p className="text-gray-400 mb-6 max-w-xl">Detected unusual repo forks and discussion velocity on HuggingFace and Reddit simultaneously.</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                              <div className="text-xs text-gray-500 uppercase mb-1">Growth Curve</div>
                              <div className="text-xl font-bold text-emerald-400">+4,200%</div>
                          </div>
                          <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                              <div className="text-xs text-gray-500 uppercase mb-1">Sentiment</div>
                              <div className="text-xl font-bold text-white">Hyped</div>
                          </div>
                          <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                              <div className="text-xs text-gray-500 uppercase mb-1">Opp. Score</div>
                              <div className="text-xl font-bold text-cyan-400">98/100</div>
                          </div>
                      </div>

                      <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-4 text-cyan-400 text-sm font-bold uppercase tracking-wide">
                              <Zap size={16} /> Generated Micro-Startup Opportunity
                          </div>
                          <div className="flex gap-4">
                              <div className="flex-1">
                                  <div className="text-xs text-gray-500 mb-1">Concept</div>
                                  <div className="text-white font-medium">"LocalSeek" - One-click local LLM runner for M2 Macs.</div>
                              </div>
                              <div className="flex-1">
                                  <div className="text-xs text-gray-500 mb-1">Monetization</div>
                                  <div className="text-white font-medium">Paid Pro Version ($19)</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </AnimatedSection>

      {/* 3. DATA UNIVERSE EXPLORER */}
      <AnimatedSection id="section-universe" className="py-24 bg-black/30">
          <div className="container mx-auto px-6">
               <div className="flex justify-between items-end mb-12">
                   <div className="flex flex-col">
                       <h2 className="text-3xl font-bold text-white">Data Universe <span className="text-gray-600">Explorer</span></h2>
                       <div className="text-xs font-mono text-gray-500 mt-2">LIVE METRICS</div>
                   </div>
                   <ContinueButton targetId="section-reactor" />
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <MiniTile title="Social Waves" icon={<Activity size={16}/>} value="8.4M" trend="up" color="text-fuchsia-400" />
                    <MiniTile title="Code Releases" icon={<Github size={16}/>} value="124k" trend="up" color="text-white" />
                    <MiniTile title="Meme Vol" icon={<Coins size={16}/>} value="$420M" trend="down" color="text-purple-400" />
                    <MiniTile title="Keyword Spikes" icon={<Search size={16}/>} value="+18%" trend="up" color="text-blue-400" />
                    <MiniTile title="AI Tools" icon={<Cpu size={16}/>} value="45/day" trend="up" color="text-cyan-400" />
               </div>
          </div>
      </AnimatedSection>

      {/* 4. THE OPPORTUNITY REACTOR */}
      <AnimatedSection id="section-reactor" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col items-center mb-8">
                  <SectionHeading center title="The Opportunity Reactor" subtitle="Test any trend. Get instant validation." />
                  <div className="mt-4">
                     <ContinueButton targetId="section-proof" />
                  </div>
              </div>
              <OpportunityReactor />
          </div>
      </AnimatedSection>

      {/* 5. PROOF OF INTELLIGENCE - No Continue Button */}
      <AnimatedSection id="section-proof" className="py-24 border-t border-white/5 bg-nexus-900/30">
          <div className="container mx-auto px-6">
              <div className="flex justify-between items-end mb-12">
                 <SectionHeading title="Proof of Intelligence" subtitle="See what MetaEngine detected before the mainstream." />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                  <ProofSlider 
                    title="DeepSeek R1" 
                    before="Minor signal on Chinese dev forums. Volume < 100." 
                    after="Global #1 Trending Topic. 5000% Growth."
                    metric="2 Weeks Early"
                  />
                  <ProofSlider 
                    title="Domain: 'AgentUX.com'" 
                    before="Available for registration ($12)." 
                    after="Sold for $2,500 on Sedo."
                    metric="20,000% ROI"
                  />
                  <ProofSlider 
                    title="TikTok: 'Raw Milk'" 
                    before="Isolated health niche clusters forming." 
                    after="Viral mainstream debate. 500M Views."
                    metric="6 Days Early"
                  />
              </div>
          </div>
      </AnimatedSection>

      {/* 6. CLOSE OUT */}
      <AnimatedSection id="section-close" className="py-32 bg-black relative flex flex-col items-center justify-center text-center border-t border-white/10">
          <div className="absolute inset-0 grid-bg opacity-20" />
          
          <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">See the Future Before It Happens.</h2>
              
              <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-mono text-gray-400">
                  <span className="flex items-center gap-2"><Check className="text-cyan-500"/> SPEED</span>
                  <span className="flex items-center gap-2"><Check className="text-cyan-500"/> PRECISION</span>
                  <span className="flex items-center gap-2"><Check className="text-cyan-500"/> MONETIZABLE INSIGHTS</span>
              </div>

              <Button onClick={onClose} className="px-12 py-5 text-xl bg-white text-black hover:bg-gray-200 font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Access Beta Dashboard
              </Button>
              
              <p className="mt-6 text-xs text-gray-600 font-mono">
                  LIMITED SPOTS AVAILABLE FOR Q1 2025
              </p>
          </div>
      </AnimatedSection>

    </div>
  );
};
