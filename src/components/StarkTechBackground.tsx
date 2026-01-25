import React from 'react';
import { motion } from 'framer-motion';

const StarkTechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950 pointer-events-none z-0">
      
      {/* --- LAYER 1: The Hexagon Grid (The "Armor" Texture) --- */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%2306b6d4' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      {/* --- LAYER 2: The Arc Reactor (Bottom Right) --- */}
      {/* This sits behind your chatbot but adds that "Powered" feel */}
      <div className="absolute -bottom-24 -right-24 md:bottom-[-10%] md:right-[-5%] w-[500px] h-[500px] opacity-20">
        
        {/* Core Glow */}
        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
        
        {/* Outer Ring (Static) */}
        <div className="absolute inset-10 border-4 border-cyan-900/30 rounded-full"></div>
        
        {/* Spinning Ring 1 (Slow) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full"
        ></motion.div>

        {/* Spinning Ring 2 (Fast Reverse) */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 border border-cyan-400/20 rounded-full border-t-transparent border-l-transparent"
        ></motion.div>
      </div>

      {/* --- LAYER 3: HUD Elements (Top Left) --- */}
      <div className="absolute top-20 left-10 opacity-10 hidden md:block">
        <div className="flex flex-col gap-2">
            <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <div className="w-32 h-2 bg-cyan-900/50 rounded-r-full"></div>
            </div>
            <div className="flex gap-1 ml-4">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <div className="w-20 h-2 bg-cyan-900/50 rounded-r-full"></div>
            </div>
            <div className="mt-2 font-mono text-[10px] text-cyan-500 tracking-[0.2em]">
                SYSTEM: ONLINE<br/>
                TARGET: PORTFOLIO
            </div>
        </div>
      </div>

      {/* --- LAYER 4: The "Gold Titanium" Accent --- */}
      {/* A subtle warm glow to represent the Iron Man Hot Rod Red/Gold palette */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen"></div>

    </div>
  );
};

export default StarkTechBackground;
