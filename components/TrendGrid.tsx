
import React from 'react';
import { CATEGORY_CONFIG } from '../constants';
import { SectionHeading } from './ui/Components';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';

// Define a specific order for visual balance on the landing page
const CATEGORY_ORDER = [
  Category.SOCIAL,
  Category.MARKET,
  Category.BUSINESS,
  Category.CRYPTO,
  Category.CODE
];

interface TrendGridProps {
  onViewData: (category: Category) => void;
}

export const TrendGrid: React.FC<TrendGridProps> = ({ onViewData }) => {
  return (
    <section className="py-24 relative bg-nexus-950" id="categories">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Total Surveillance." 
          subtitle="We monitor 30+ platforms to segment trends into five high-value sectors." 
          center 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORY_ORDER.map((catKey) => {
            const config = CATEGORY_CONFIG[catKey];
            return (
              <div 
                key={catKey} 
                onClick={() => onViewData(catKey)}
                className={`group relative holo-card p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col min-h-[280px] cursor-pointer`}
              >
                {/* Gradient Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-10 h-10 rounded-lg ${config.bg} bg-opacity-20 flex items-center justify-center ${config.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {config.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{config.label}</h3>
                  
                  <ul className="space-y-2 mb-6 flex-1">
                    <li className="text-xs text-gray-400 flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${config.bg}`}></span>
                      Rising Topics
                    </li>
                    <li className="text-xs text-gray-400 flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${config.bg}`}></span>
                      Sentiment Analysis
                    </li>
                    <li className="text-xs text-gray-400 flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${config.bg}`}></span>
                      Opportunity Score
                    </li>
                  </ul>

                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors mt-auto">
                    View Data <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
