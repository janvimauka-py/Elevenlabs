import React from 'react';
import { 
  Volume2, 
  Sparkles, 
  Key, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  Sliders, 
  Bot, 
  Radio, 
  Headphones, 
  Globe2 
} from 'lucide-react';

export default function Header({ apiStatus, onOpenSettings, onScrollToBots }) {
  const isConnected = apiStatus?.hasApiKey && apiStatus?.authenticated;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-blue-400/20 bg-[#07152d]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo and Brand in Electric Blue & Crisp White */}
        <div className="flex items-center space-x-3.5">
          <div className="relative group cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-400 to-white p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.35)]">
            <div className="w-full h-full bg-[#0a192f] rounded-[10px] flex items-center justify-center transition-all group-hover:bg-[#0c2242]">
              <div className="flex items-end space-x-0.5 h-4">
                <span className="w-1 bg-white rounded-full h-2 wave-bar-1" />
                <span className="w-1 bg-sky-400 rounded-full h-3.5 wave-bar-2" />
                <span className="w-1 bg-blue-500 rounded-full h-4 wave-bar-3" />
                <span className="w-1 bg-white rounded-full h-2.5 wave-bar-4" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl tracking-tight text-white flex items-center">
                VOX<span className="text-sky-400 font-bold">AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30 flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5 text-sky-300" />
                <span>STUDIO</span>
              </span>
            </div>
            <p className="text-[11px] text-blue-200/70 hidden sm:flex items-center space-x-1">
              <span>Neural Voice Dubbing & AI Voice Bot</span>
            </p>
          </div>
        </div>

        {/* Status & Actions with Rich Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Quick Bot Mode Indicator */}
          {onScrollToBots && (
            <button
              onClick={onScrollToBots}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-900/60 hover:bg-blue-800 text-sky-200 hover:text-white border border-blue-400/30 transition-all"
            >
              <Bot className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>Radio Bot Mode</span>
            </button>
          )}

          {/* Status Badge */}
          <div 
            onClick={onOpenSettings}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border bg-blue-950/60 border-blue-400/25 hover:border-blue-300/50 text-blue-100 shadow-sm"
            title="Click to view API Settings & Subscription"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-sky-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span className="font-semibold text-white">
              {isConnected ? 'ElevenLabs Active' : 'Free Neural Engine'}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-200 border border-sky-400/30">
              100% FREE
            </span>
          </div>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-blue-950 hover:bg-sky-50 hover:text-blue-900 border border-white shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>

      </div>
    </header>
  );
}
