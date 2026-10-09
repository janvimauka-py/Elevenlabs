import React from 'react';
import { 
  Sparkles, 
  Radio, 
  Layers, 
  Globe2, 
  Mic2, 
  Zap, 
  Bot, 
  Sliders, 
  Headphones, 
  ShieldCheck 
} from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-3 pb-2 sm:pb-3 text-center max-w-4xl mx-auto px-4">
      {/* Background blue & white glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[240px] bg-blue-500/15 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[150px] bg-sky-300/20 blur-[90px] -z-10 rounded-full pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-400/30 text-sky-200 text-xs font-semibold mb-3 shadow-lg backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        <span className="text-white font-bold">AI Voice Dubbing & Radio Bot Studio</span>
        <span className="w-1 h-1 rounded-full bg-blue-400" />
        <span className="text-sky-300 font-mono">100% Free • Multi-Dialect</span>
      </div>

      {/* Hero Title with Gradient Blue & White */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2">
        Give Your Words a{' '}
        <span className="bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent text-glow-white">
          Living Voice
        </span>
      </h1>

      {/* Feature Badges with Lots of High-Value Icons */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs text-blue-100">
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-400/20 hover:border-blue-400/40 transition-colors shadow-sm">
          <Bot className="w-3.5 h-3.5 text-sky-400" />
          <span>Interactive Radio Bot</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-400/20 hover:border-blue-400/40 transition-colors shadow-sm">
          <Globe2 className="w-3.5 h-3.5 text-blue-400" />
          <span>8+ Indian & Global Languages</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-400/20 hover:border-blue-400/40 transition-colors shadow-sm">
          <Zap className="w-3.5 h-3.5 text-sky-300" />
          <span>Instant Neural Dubbing</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-400/20 hover:border-blue-400/40 transition-colors shadow-sm">
          <Headphones className="w-3.5 h-3.5 text-indigo-300" />
          <span>Lossless Audio & Visualizer</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-400/20 hover:border-blue-400/40 transition-colors shadow-sm">
          <Sliders className="w-3.5 h-3.5 text-cyan-300" />
          <span>Vocal Modulation</span>
        </div>
      </div>
    </div>
  );
}
