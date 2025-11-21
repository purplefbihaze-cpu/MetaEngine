import React from 'react';

// 1. Floating Prism (Hero) - Silver/White/Cyan
export const FloatingPrism = () => (
  <div className="relative w-24 h-24 perspective-1000">
    <style>{`
      @keyframes float-spin {
        0% { transform: rotateX(0deg) rotateY(0deg) translateY(0px); }
        50% { transform: rotateX(180deg) rotateY(180deg) translateY(-20px); }
        100% { transform: rotateX(360deg) rotateY(360deg) translateY(0px); }
      }
      .prism-container {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        animation: float-spin 20s linear infinite;
      }
      .prism-face {
        position: absolute;
        width: 60px;
        height: 60px;
        opacity: 0.4;
        border: 1px solid rgba(255,255,255,0.3);
        background: linear-gradient(45deg, rgba(56, 189, 248, 0.05), transparent);
        box-shadow: 0 0 15px rgba(255,255,255,0.05);
      }
      .pf-front { transform: translateZ(30px); }
      .pf-back { transform: rotateY(180deg) translateZ(30px); }
      .pf-right { transform: rotateY(90deg) translateZ(30px); }
      .pf-left { transform: rotateY(-90deg) translateZ(30px); }
      .pf-top { transform: rotateX(90deg) translateZ(30px); }
      .pf-bottom { transform: rotateX(-90deg) translateZ(30px); }
    `}</style>
    <div className="prism-container">
      <div className="prism-face pf-front" />
      <div className="prism-face pf-back" />
      <div className="prism-face pf-right" />
      <div className="prism-face pf-left" />
      <div className="prism-face pf-top" />
      <div className="prism-face pf-bottom" />
    </div>
  </div>
);

// 2. Holo Cube (SaaS Builder) - Crisp Sky Blue
export const HoloCube = () => (
  <div className="relative w-24 h-24 perspective-1000">
     <style>{`
        @keyframes spin-3d {
           0% { transform: rotateX(0deg) rotateY(0deg); }
           100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .cube-container {
           width: 100%;
           height: 100%;
           transform-style: preserve-3d;
           animation: spin-3d 12s linear infinite;
        }
        .cube-face {
           position: absolute;
           width: 48px;
           height: 48px;
           border: 1px solid rgba(56, 189, 248, 0.4); /* Sky Blue */
           background: rgba(56, 189, 248, 0.05);
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 8px;
           font-weight: bold;
           color: #38bdf8;
           left: 24px;
           top: 24px;
           box-shadow: 0 0 15px rgba(56, 189, 248, 0.1);
        }
        .front  { transform: rotateY(0deg) translateZ(24px); }
        .back   { transform: rotateY(180deg) translateZ(24px); }
        .right  { transform: rotateY(90deg) translateZ(24px); }
        .left   { transform: rotateY(-90deg) translateZ(24px); }
        .top    { transform: rotateX(90deg) translateZ(24px); }
        .bottom { transform: rotateX(-90deg) translateZ(24px); }
     `}</style>
     <div className="cube-container">
        <div className="cube-face front">IDEA</div>
        <div className="cube-face back">SHIP</div>
        <div className="cube-face right">SAAS</div>
        <div className="cube-face left">DATA</div>
        <div className="cube-face top">MVP</div>
        <div className="cube-face bottom">$$$</div>
     </div>
  </div>
);

// 3. Radar Scope (Domain Sniper) - Emerald Green
export const RadarScope = () => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    <style>{`
      @keyframes scan-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse-ring {
        0% { width: 0%; height: 0%; opacity: 1; }
        100% { width: 100%; height: 100%; opacity: 0; }
      }
    `}</style>
    <div className="absolute inset-0 border border-emerald-400/30 rounded-full" />
    <div className="absolute inset-2 border border-emerald-400/10 rounded-full" />
    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent top-1/2 left-0 -translate-y-1/2 animate-[scan-spin_4s_linear_infinite]" />
    <div className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent left-1/2 top-0 -translate-x-1/2 animate-[scan-spin_4s_linear_infinite]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-emerald-300 rounded-full animate-[pulse-ring_2s_infinite]" />
    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#34d399]" />
  </div>
);

// 4. Holo Torus (Discover) - Cyan/White Clean
export const HoloTorus = () => (
  <div className="relative w-40 h-40 perspective-1000 flex items-center justify-center scale-75 lg:scale-100">
    <style>{`
       @keyframes torus-spin {
         0% { transform: rotateX(70deg) rotateZ(0deg); }
         100% { transform: rotateX(70deg) rotateZ(360deg); }
       }
       @keyframes torus-spin-slow {
         0% { transform: rotateX(70deg) rotateZ(360deg); }
         100% { transform: rotateX(70deg) rotateZ(0deg); }
       }
    `}</style>
    {/* Main Ring */}
    <div className="absolute w-full h-full border-2 border-nexus-code/30 rounded-full animate-[torus-spin_12s_linear_infinite] shadow-[0_0_20px_rgba(56,189,248,0.1)]" />
    {/* Secondary Ring */}
    <div className="absolute w-32 h-32 border border-dotted border-white/40 rounded-full animate-[torus-spin-slow_20s_linear_infinite]" />
    {/* Dashed Detail */}
    <div className="absolute w-28 h-28 border border-dashed border-white/30 rounded-full animate-[torus-spin_8s_linear_infinite]" />
    {/* Inner Glow */}
    <div className="absolute w-8 h-8 bg-white rounded-full blur-xl animate-pulse opacity-40" />
  </div>
);

// 5. Holo Blueprint (Opportunities) - Wireframe Construction - NEW
export const HoloBlueprint = () => (
  <div className="relative w-40 h-40 perspective-1000 flex items-center justify-center">
     <style>{`
        @keyframes blueprint-spin {
           0% { transform: rotateX(60deg) rotateZ(0deg); }
           100% { transform: rotateX(60deg) rotateZ(360deg); }
        }
        @keyframes float-b {
           0%, 100% { transform: translateY(0px); }
           50% { transform: translateY(-10px); }
        }
     `}</style>
     
     <div className="absolute inset-0 flex items-center justify-center animate-[float-b_4s_ease-in-out_infinite]">
        {/* Base Grid */}
        <div className="absolute w-48 h-48 border border-nexus-social/30 rounded-full animate-[blueprint-spin_20s_linear_infinite] opacity-60" style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)' }} />
        
        {/* Rotating Wireframe Layers */}
        <div className="absolute w-32 h-32 border-2 border-nexus-social/50 rounded-lg animate-[blueprint-spin_10s_linear_infinite_reverse]" />
        <div className="absolute w-24 h-24 border border-white/30 rounded-lg rotate-45 animate-[blueprint-spin_15s_linear_infinite]" />
        
        {/* Central Tech Core */}
        <div className="absolute w-12 h-12 bg-nexus-social/20 border border-white/60 backdrop-blur-sm shadow-[0_0_30px_rgba(244,114,182,0.5)] flex items-center justify-center">
           <div className="w-2 h-2 bg-white rounded-full animate-ping" />
        </div>
     </div>
  </div>
);

// 6. Neural Grid (Demo Dashboard Hero)
export const NeuralGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg width="100%" height="100%" className="opacity-[0.05]">
      <pattern id="neural-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#ffffff" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#neural-pattern)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-nexus-950 via-transparent to-nexus-950" />
  </div>
);

// 7. Particle Field (Refined - Clean Ambient White)
export const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes float-particle {
        0% { transform: translateY(100px) translateX(0); opacity: 0; }
        20% { opacity: 0.2; }
        80% { opacity: 0.2; }
        100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
      }
    `}</style>
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 120}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animation: `float-particle ${25 + Math.random() * 25}s linear infinite`,
          animationDelay: `-${Math.random() * 20}s`,
          opacity: 0.15
        }}
      />
    ))}
  </div>
);