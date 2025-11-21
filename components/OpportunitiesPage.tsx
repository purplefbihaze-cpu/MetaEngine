
import React, { useState, useEffect } from 'react';
import { SectionHeading, Button } from './ui/Components';
import { Rocket, DollarSign, Globe, Cpu, Zap, ArrowRight, Briefcase, Target, TrendingUp, BarChart, CheckCircle, ArrowDown } from 'lucide-react';
import { HoloBlueprint } from './ui/Visuals';

const AnimatedMetric: React.FC<{ text: string }> = ({ text }) => {
    const [display, setDisplay] = useState("");
    
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplay(text.substring(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className="font-mono text-nexus-code text-xs bg-nexus-code/10 px-2 py-1 rounded border border-nexus-code/20 animate-pulse">
            {display}<span className="animate-blink">_</span>
        </span>
    );
};

const OpportunityCard: React.FC<{ title: string, description: string, icon: React.ReactNode, metrics: string, onAction: () => void }> = ({ title, description, icon, metrics, onAction }) => (
  <div className="holo-card p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent h-full flex-1">
    <div className="bg-nexus-900/90 rounded-xl p-8 h-full backdrop-blur-xl flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 rounded-full bg-white/5 text-white border border-white/10">
          {icon}
        </div>
        <AnimatedMetric text={metrics} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-8 flex-1">
        {description}
      </p>
      <Button onClick={onAction} className="w-full justify-between group">
        Launch Tool <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
      </Button>
    </div>
  </div>
);

const ExampleCase: React.FC<{ toolName: string, scenario: string, outcome: string, delay: number, icon: React.ReactNode }> = ({ toolName, scenario, outcome, delay, icon }) => (
   <div 
      className="group relative p-6 rounded-xl bg-nexus-900/40 border border-white/10 hover:border-nexus-code/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:-translate-y-1 overflow-hidden animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
   >
      {/* Ambient Background Glow */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-nexus-code/5 rounded-full blur-3xl group-hover:bg-nexus-code/10 transition-colors duration-700" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-nexus-code/30 group-hover:bg-nexus-code/10 transition-all duration-300">
                  <div className="text-gray-400 group-hover:text-nexus-code transition-colors">
                    {icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest group-hover:text-white">{toolName}</span>
              </div>
              {/* Status Indicator */}
              <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 rounded-full bg-nexus-code/40 group-hover:bg-nexus-code animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-nexus-code/40 group-hover:bg-nexus-code animate-pulse delay-75" />
                  <div className="w-1 h-1 rounded-full bg-nexus-code/40 group-hover:bg-nexus-code animate-pulse delay-150" />
              </div>
          </div>

          {/* Scenario / Problem */}
          <div className="mb-6 flex-1 relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-700 to-transparent group-hover:from-nexus-code group-hover:to-nexus-code/20 transition-all duration-500" />
              <div className="pl-4">
                  <span className="text-[10px] text-gray-500 font-mono uppercase mb-1 block">Signal Detected</span>
                  <p className="text-gray-300 text-sm leading-relaxed italic group-hover:text-white transition-colors">
                      "{scenario}"
                  </p>
              </div>
          </div>

          {/* Outcome / Result */}
          <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors relative">
              <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-500 font-mono uppercase group-hover:text-nexus-code/70 transition-colors">Execution Result</span>
                  <CheckCircle size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300" />
              </div>
              <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 mt-1 filter drop-shadow-lg">
                  {outcome}
              </div>
          </div>
      </div>
   </div>
);

export const OpportunitiesPage: React.FC<{ onOpenTool: (tool: 'SNIPER' | 'BUILDER') => void }> = ({ onOpenTool }) => {
  return (
    <div className="min-h-screen bg-nexus-950 pt-24 pb-12 px-6 relative overflow-hidden">
       {/* Background Ambient */}
       <div className="absolute top-1/3 right-0 w-96 h-96 bg-nexus-market/10 blur-[100px] rounded-full pointer-events-none" />

       <div className="container mx-auto relative z-10">
          <div className="flex justify-between items-end mb-12">
             <SectionHeading 
               title="Monetization Suite." 
               subtitle="Turn raw trend data into income-generating assets with AI-powered tools." 
             />
             <div className="hidden lg:block mr-12">
               <HoloBlueprint />
             </div>
          </div>

          {/* Combined Columns: Execution -> Tool */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Startup Builder */}
            <div className="flex flex-col h-full">
                 <div className="mb-0 relative z-20">
                    <ExampleCase 
                       delay={100}
                       icon={<Rocket size={14} />}
                       toolName="Micro-Startup Builder"
                       scenario="Trend: 'Agentic Workflows' is spiking. You need an idea."
                       outcome="Generated 'AgentFlow UI' kit. $2k MRR."
                    />
                 </div>
                 
                 {/* Connector */}
                 <div className="h-16 flex items-center justify-center relative -my-2 z-10">
                    <div className="h-full w-[1px] bg-gradient-to-b from-nexus-code/50 to-white/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-nexus-950 p-2 rounded-full border border-white/10 shadow-xl">
                        <ArrowDown size={16} className="text-nexus-code animate-bounce" />
                    </div>
                 </div>

                 <div className="flex-1 relative z-0">
                    <OpportunityCard 
                      title="Micro-Startup Builder" 
                      description="Generate MVP concepts, feature lists, and tech stacks instantly from any rising GitHub repository or trend."
                      icon={<Rocket size={32} />}
                      metrics="~5m Build Time"
                      onAction={() => onOpenTool('BUILDER')}
                    />
                 </div>
            </div>

            {/* Column 2: Domain Sniper */}
            <div className="flex flex-col h-full">
                 <div className="mb-0 relative z-20">
                    <ExampleCase 
                       delay={300}
                       icon={<Target size={14} />}
                       toolName="Domain Sniper"
                       scenario="Trend: 'Silent Walking' viral on TikTok. Own the niche."
                       outcome="Sniped 'SilentWalkGuide.com' for $12. Sold for $450."
                    />
                 </div>

                 {/* Connector */}
                 <div className="h-16 flex items-center justify-center relative -my-2 z-10">
                    <div className="h-full w-[1px] bg-gradient-to-b from-emerald-400/50 to-white/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-nexus-950 p-2 rounded-full border border-white/10 shadow-xl">
                        <ArrowDown size={16} className="text-emerald-400 animate-bounce" style={{ animationDelay: '100ms' }} />
                    </div>
                 </div>

                 <div className="flex-1 relative z-0">
                    <OpportunityCard 
                      title="Domain Sniper" 
                      description="AI checks 1000+ variations of trending keywords to find available .com domains with high resale value."
                      icon={<Globe size={32} />}
                      metrics="98% Availability"
                      onAction={() => onOpenTool('SNIPER')}
                    />
                 </div>
            </div>

            {/* Column 3: Course Curriculum */}
            <div className="flex flex-col h-full">
                 <div className="mb-0 relative z-20">
                    <ExampleCase 
                       delay={500}
                       icon={<BarChart size={14} />}
                       toolName="Course Curriculum"
                       scenario="Trend: 'Mojo Language' gaining dev interest."
                       outcome="Generated 8-module course. Pre-sold 50 copies."
                    />
                 </div>

                 {/* Connector */}
                 <div className="h-16 flex items-center justify-center relative -my-2 z-10">
                    <div className="h-full w-[1px] bg-gradient-to-b from-purple-400/50 to-white/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-nexus-950 p-2 rounded-full border border-white/10 shadow-xl">
                        <ArrowDown size={16} className="text-purple-400 animate-bounce" style={{ animationDelay: '200ms' }} />
                    </div>
                 </div>

                 <div className="flex-1 relative z-0">
                    <OpportunityCard 
                      title="Course Curriculum" 
                      description="Identify skill gaps in new tech stacks and auto-generate course outlines to sell on Udemy/Teachable."
                      icon={<DollarSign size={32} />}
                      metrics="$200+ CPM"
                      onAction={() => onOpenTool('BUILDER')} 
                    />
                 </div>
            </div>
          </div>

          {/* Social Proof Footer */}
          <div className="mt-20 bg-white/5 rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-white/10 transition-colors">
             <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-nexus-950 relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-tr from-gray-600 to-gray-500" /></div>)}
                </div>
                <div>
                   <p className="text-white font-bold text-lg">Join 2,000+ builders</p>
                   <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Shipping products daily</p>
                </div>
             </div>
             <p className="text-sm text-gray-400 italic max-w-md text-right border-l-2 border-nexus-social/50 pl-4">
                "I found a niche in 'AI Jewelry', bought the domain, and launched a landing page in 20 minutes using the suite."
             </p>
          </div>
       </div>
    </div>
  );
};
