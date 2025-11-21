import React from 'react';
import { SectionHeading, Button } from './ui/Components';
import { Rocket, DollarSign, Globe } from 'lucide-react';

const OpportunityCard: React.FC<{ title: string, description: string, icon: React.ReactNode, metrics: string }> = ({ title, description, icon, metrics }) => (
  <div className="holo-card p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
    <div className="bg-nexus-900/90 rounded-xl p-6 h-full backdrop-blur-xl flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-full bg-white/5 text-white border border-white/10">
          {icon}
        </div>
        <span className="font-mono text-nexus-code text-xs">{metrics}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
        {description}
      </p>
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-gray-500">Status</span>
        <span className="text-xs text-green-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Active
        </span>
      </div>
    </div>
  </div>
);

export const OpportunitySection: React.FC = () => {
  return (
    <section className="py-24 bg-nexus-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
         <SectionHeading 
          title="Turn Trends Into Income." 
          subtitle="Don't just watch. Build. The suite generates ready-to-launch assets." 
          center 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <OpportunityCard 
            title="Micro-Startup Builder" 
            description="Generate MVP concepts, feature lists, and tech stacks instantly from any rising GitHub repository."
            icon={<Rocket size={24} />}
            metrics="~5m Build Time"
          />
          <OpportunityCard 
            title="Domain Sniper" 
            description="AI checks 1000+ variations of trending keywords to find available .com domains with high resale value."
            icon={<Globe size={24} />}
            metrics="98% Availability"
          />
          <OpportunityCard 
            title="Course Curriculum" 
            description="Identify skill gaps in new tech stacks and auto-generate course outlines to sell on Udemy/Teachable."
            icon={<DollarSign size={24} />}
            metrics="$200+ CPM"
          />
        </div>

        <div className="mt-16 text-center">
           <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-nexus-code via-purple-500 to-nexus-social">
              <div className="bg-nexus-950 rounded-full px-8 py-4">
                <p className="text-white font-medium text-lg">
                  "I found a niche, bought the domain, and launched a landing page in 20 minutes."
                </p>
                <p className="text-gray-500 text-sm mt-2 font-mono"> - Early Beta User, shipped $2k MRR</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};