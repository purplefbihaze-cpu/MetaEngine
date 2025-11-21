
import React, { useEffect, useState } from 'react';
import { TrendingUp, Globe, Cpu, Zap, ArrowRight, Search } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Button, Badge } from './ui/Components';
import { SOURCES } from '../constants';
import { FloatingPrism } from './ui/Visuals';

// Mock data for the background charts
const chartData = Array.from({ length: 20 }, (_, i) => ({
  value: 30 + Math.random() * 50 + (i * 2),
}));

// Duplicate sources for seamless loop
const MARQUEE_SOURCES = [...SOURCES, ...SOURCES];

interface HeroProps {
  onStartDemo: () => void;
  onStartLimitedDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartDemo, onStartLimitedDemo }) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 grid-bg z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow delay-700" />

      <div className="container mx-auto px-6 z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-6 text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono text-emerald-400 mb-4 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            System Status: ONLINE // Tracking 30,000+ Data Points
          </div>

          <div className="relative">
             <div className="absolute -top-12 right-20 opacity-60 hidden md:block">
               <FloatingPrism />
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-2">
               AI-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 animate-gradient-x">Discovery Engine</span>
               <br />
               <span className="text-3xl md:text-5xl text-gray-400 font-light tracking-tight">for High-Value Trends.</span>
             </h1>
          </div>

          <p className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Aggregate 30+ sources. Score trends in real-time with Gemini AI. Turn noise into business opportunities instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button onClick={onStartDemo} icon={<Zap size={16} />} className="bg-white text-black hover:bg-emerald-50">
              Get Early Access
            </Button>
            <Button variant="secondary" onClick={onStartLimitedDemo} icon={<TrendingUp size={16} />}>
              Try Demo Dashboard
            </Button>
          </div>

          {/* Source Ticker - Infinite Marquee */}
          <div className="pt-8 border-t border-white/5 flex flex-col gap-2 text-sm text-gray-500 font-mono overflow-hidden w-full">
            <div className="flex justify-center lg:justify-start mb-2">
               <span>Injecting Data Stream:</span>
            </div>
            
            <div className="relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
               <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                   {MARQUEE_SOURCES.map((s, i) => (
                     <div 
                       key={`${s.name}-${i}`}
                       className="flex items-center gap-2 mx-6 text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                     >
                       {s.icon} {s.name}
                     </div>
                   ))}
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: HUD Visualization */}
        <div className="lg:col-span-6 relative h-[500px] w-full hidden lg:block perspective-1000">
          {/* Floating Cards Stack */}
          <div className="absolute top-10 right-10 w-80 holo-card rounded-xl p-4 z-20 transform rotate-y-12 animate-float border-l-4 border-l-nexus-code">
            <div className="flex justify-between items-start mb-2">
              <Badge colorClass="text-nexus-code bg-nexus-code/10 border-nexus-code/20">RISING FAST</Badge>
              <span className="text-xs font-mono text-gray-400">2m ago</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Agentic Workflows</h3>
            <div className="h-20 w-full mt-2 opacity-50">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#38bdf8" fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center mt-3 text-sm font-mono">
              <span className="text-gray-400">Velocity</span>
              <span className="text-nexus-code">+420%</span>
            </div>
          </div>

          <div className="absolute top-40 right-32 w-72 holo-card rounded-xl p-4 z-10 transform rotate-y-12 scale-95 opacity-80 animate-float shadow-lg border-l-4 border-l-nexus-social" style={{ animationDelay: '1s' }}>
             <div className="flex justify-between items-start mb-2">
              <Badge colorClass="text-nexus-social bg-nexus-social/10 border-nexus-social/20">VIRAL</Badge>
            </div>
            <h3 className="text-md font-bold text-white">TikTok Shop Exploits</h3>
            <div className="flex justify-between items-center mt-4 text-xs font-mono">
              <span className="text-gray-400">Impact</span>
              <span className="text-nexus-social">High</span>
            </div>
          </div>

           <div 
            className="absolute top-64 right-12 w-64 holo-card rounded-xl p-4 z-0 transform rotate-y-12 scale-90 opacity-70 hover:scale-100 hover:opacity-100 hover:z-30 transition-all duration-300 cursor-pointer border-l-4 border-l-nexus-market animate-float" 
            style={{ animationDelay: '2s' }}
           >
             <div className="flex justify-between items-start mb-2">
              <Badge colorClass="text-nexus-market bg-nexus-market/10 border-nexus-market/20">OPPORTUNITY</Badge>
            </div>
            <h3 className="text-sm font-bold text-white">Niche: AI Jewelry</h3>
            <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-nexus-market w-3/4"></div>
            </div>
          </div>

          {/* Decorative Circles - Clean White */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-dashed border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        </div>
      </div>
    </section>
  );
};
