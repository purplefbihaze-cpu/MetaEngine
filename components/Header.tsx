
import React from 'react';
import { Zap } from 'lucide-react';

interface HeaderProps {
  onStartDemo: () => void;
  onNavigate: (page: 'HOME' | 'DISCOVER' | 'OPPORTUNITIES') => void;
}

export const LogoIcon = () => (
  <div className="w-9 h-9 relative flex items-center justify-center group">
    {/* Outer Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-cyan-500/30 to-blue-600/30 rounded-xl blur-[8px] opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
    
    {/* Main Container */}
    <div className="relative w-full h-full bg-nexus-950 border border-white/10 rounded-xl flex items-center justify-center shadow-2xl overflow-hidden ring-1 ring-white/5 group-hover:ring-emerald-500/50 transition-all">
        {/* Internal Gradient Background (Hover) */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hex Crystal Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform group-hover:scale-110 transition-all duration-500 ease-out">
           <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors"/>
           <path d="M2 17L12 22L22 17" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-cyan-200 transition-colors"/>
           <path d="M2 7V17" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"/>
           <path d="M22 7V17" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"/>
           <path d="M12 22V12" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
  </div>
);

export const Header: React.FC<HeaderProps> = ({ onStartDemo, onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-nexus-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-nexus-950/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div onClick={() => onNavigate('HOME')} className="flex items-center gap-3 cursor-pointer group select-none">
           <LogoIcon />
           <div className="flex flex-col justify-center h-full -space-y-0.5">
             <span className="font-sans font-bold text-white tracking-tight text-lg leading-none">
               Meta<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500">Engine</span>
             </span>
             <span className="text-[8px] font-mono text-gray-500 tracking-[0.2em] uppercase group-hover:text-emerald-400 transition-colors">Intelligence</span>
           </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-400 bg-white/5 p-1 rounded-full border border-white/5">
          <button 
            onClick={() => onNavigate('DISCOVER')} 
            className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Discover
          </button>
          <button 
            onClick={() => onNavigate('OPPORTUNITIES')} 
            className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Opportunities
          </button>
          <button className="px-4 py-1.5 rounded-full hover:text-gray-300 cursor-not-allowed opacity-50">
            Pricing
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="hidden md:block text-xs font-mono text-gray-500 hover:text-emerald-400 transition-colors uppercase tracking-wider">
            [ Login ]
          </button>
          <button 
            onClick={onStartDemo}
            className="group relative px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-gray-100 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
               Launch App <Zap size={14} className="fill-black group-hover:text-emerald-600" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
