import React, { useState } from 'react';
import { SectionHeading, Button } from './ui/Components';
import { MOCK_TRENDS, CATEGORY_CONFIG } from '../constants';
import { TrendingUp, ArrowRight, Zap, Activity, Radio } from 'lucide-react';
import { HoloTorus, ParticleField } from './ui/Visuals';

// Parallax Card Component
const ParallaxCard: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
    const [transform, setTransform] = useState('');
    const [shine, setShine] = useState('');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xCenter = rect.width / 2;
        const yCenter = rect.height / 2;
        
        const rotateX = ((y - yCenter) / yCenter) * -5; // Max 5 deg tilt
        const rotateY = ((x - xCenter) / xCenter) * 5;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
        setShine(`radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 60%)`);
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0) rotateY(0) scale(1)');
        setShine('');
    };

    return (
        <div 
            className="relative transition-transform duration-200 ease-out transform-style-3d"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ transform }}
        >
            <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 z-0 pointer-events-none" />
            <div 
                className="absolute inset-0 rounded-2xl z-10 pointer-events-none mix-blend-overlay"
                style={{ background: shine }} 
            />
            <div className="relative z-20 h-full">
                {children}
            </div>
        </div>
    );
};

export const DiscoverPage: React.FC<{ onOpenDashboard: () => void }> = ({ onOpenDashboard }) => {
  return (
    <div className="min-h-screen bg-nexus-950 pt-24 pb-12 px-6 relative overflow-hidden">
       {/* Active Signal Background - Clean, no blue lines */}
       <div className="absolute inset-0 z-0">
          <ParticleField />
       </div>
       <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-nexus-950 to-transparent z-10 pointer-events-none" />

       <div className="container mx-auto relative z-20">
          
          {/* CTA - Moved to Top */}
          <div className="mb-16 text-center bg-gradient-to-r from-transparent via-white/5 to-transparent p-8 rounded-3xl border border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6">
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Want to see the other 34,000+ data points?</h3>
                    <p className="text-gray-400 text-sm">Full database updates every 60 seconds with high-velocity signals.</p>
                 </div>
                 <Button onClick={onOpenDashboard} icon={<Zap size={16}/>} className="px-6 py-3 text-sm bg-white text-black hover:bg-gray-200 whitespace-nowrap">
                    Launch Full Dashboard
                 </Button>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 gap-8">
             <div className="flex-1">
                 <div className="flex items-center gap-2 mb-4 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs font-mono text-red-400 uppercase tracking-widest">Live Signal Feed</span>
                 </div>
                 <SectionHeading 
                   title="Discover Trends." 
                   subtitle="Deep dive into the signal noise. All categories, real-time metrics." 
                 />
             </div>
             <div className="hidden lg:block mb-8">
               <HoloTorus />
             </div>
          </div>

          <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                 {MOCK_TRENDS.slice(0, 9).map((trend, i) => {
                    const config = CATEGORY_CONFIG[trend.category];
                    return (
                       <ParallaxCard key={i} onClick={onOpenDashboard}>
                           <div className="group h-full bg-nexus-900/40 backdrop-blur-sm rounded-2xl p-6 hover:bg-nexus-900/60 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                              <div className="flex justify-between items-start mb-4">
                                 <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase ${config.bg} bg-opacity-20 ${config.color}`}>
                                    {config.label}
                                 </div>
                                 <div className="text-nexus-code flex items-center gap-1 text-xs font-mono bg-nexus-code/10 px-2 py-1 rounded">
                                    <TrendingUp size={12}/> {trend.velocity}%
                                 </div>
                              </div>
                              
                              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-nexus-code transition-colors">{trend.title}</h3>
                              <p className="text-sm text-gray-400 mb-6 line-clamp-2">{trend.description}</p>
                              
                              {/* Mini Chart Graphic */}
                              <div className="h-8 w-full flex items-end gap-1 mb-4 opacity-30 group-hover:opacity-80 transition-opacity">
                                  {Array.from({length: 20}).map((_, j) => (
                                      <div key={j} className={`flex-1 bg-current ${config.color}`} style={{ height: `${30 + Math.random() * 70}%` }} />
                                  ))}
                              </div>
                              
                              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                 <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                                    <Radio size={12} className={trend.isAnomaly ? "text-red-500 animate-pulse" : "text-gray-600"} />
                                    {trend.signalCount} Signals • {trend.source}
                                 </div>
                                 <button className="text-xs text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                    Analyze <ArrowRight size={12} />
                                 </button>
                              </div>
                           </div>
                       </ParallaxCard>
                    )
                 })}
              </div>
          </div>
       </div>
    </div>
  );
};