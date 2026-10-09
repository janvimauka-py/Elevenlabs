import React, { useState } from 'react';
import { Sliders, RotateCcw, Info, Volume2, Sparkles, HelpCircle, Shield, Activity, Zap } from 'lucide-react';

const DEFAULT_SETTINGS = {
  stability: 0.50,
  similarity_boost: 0.75,
  style: 0.00,
  use_speaker_boost: true
};

export default function VoiceSettings({ settings, onChange, selectedModelId }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const isV2Model = selectedModelId?.includes('v2') || selectedModelId?.includes('flash') || selectedModelId?.includes('turbo');

  const handleReset = () => {
    onChange(DEFAULT_SETTINGS);
  };

  const updateSetting = (key, value) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 border border-blue-400/25 relative shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-400/20">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-sky-400/30 flex items-center justify-center">
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Dubbing & Acoustic Parameters
            </h3>
            <span className="text-[10px] text-blue-200/70">
              Fine-tune neural stability and timbre
            </span>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center space-x-1 text-xs text-sky-300 hover:text-white transition-colors px-2.5 py-1 rounded-lg bg-blue-900/40 hover:bg-blue-800 border border-blue-400/20"
          title="Reset to defaults"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* 1. Stability Slider */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-blue-100 flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>Stability / Pace</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('stability')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="text-blue-300/70 hover:text-white"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </span>
            <span className="font-mono font-bold text-sky-300 text-xs">
              {Math.round(settings.stability * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.stability}
            onChange={(e) => updateSetting('stability', parseFloat(e.target.value))}
            className="w-full accent-sky-400"
          />

          <div className="flex justify-between text-[10px] text-blue-300/60 mt-1 font-mono">
            <span>Theatrical & Expressive</span>
            <span>Smooth & Consistent</span>
          </div>

          {activeTooltip === 'stability' && (
            <div className="mt-1 text-[11px] p-2 rounded-xl bg-blue-900/80 border border-sky-400/30 text-sky-100">
              Lower values create dramatic dynamics. Higher values ensure reliable, steady narration.
            </div>
          )}
        </div>

        {/* 2. Clarity + Similarity Boost Slider */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-blue-100 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Timbre Clarity</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('similarity')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="text-blue-300/70 hover:text-white"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </span>
            <span className="font-mono font-bold text-sky-300 text-xs">
              {Math.round(settings.similarity_boost * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.similarity_boost}
            onChange={(e) => updateSetting('similarity_boost', parseFloat(e.target.value))}
            className="w-full accent-sky-400"
          />

          <div className="flex justify-between text-[10px] text-blue-300/60 mt-1 font-mono">
            <span>Natural Blend</span>
            <span>Studio Master Clarity</span>
          </div>

          {activeTooltip === 'similarity' && (
            <div className="mt-1 text-[11px] p-2 rounded-xl bg-blue-900/80 border border-sky-400/30 text-sky-100">
              Controls vocal likeness and high-frequency studio polish.
            </div>
          )}
        </div>

        {/* 3. Style Exaggeration Slider */}
        <div className={!isV2Model ? 'opacity-40 pointer-events-none' : ''}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-blue-100 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Dramatics & Style</span>
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip('style')}
                onMouseLeave={() => setActiveTooltip(null)}
                className="text-blue-300/70 hover:text-white"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </span>
            <span className="font-mono font-bold text-sky-300 text-xs">
              {Math.round(settings.style * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            disabled={!isV2Model}
            value={settings.style}
            onChange={(e) => updateSetting('style', parseFloat(e.target.value))}
            className="w-full accent-sky-400"
          />

          <div className="flex justify-between text-[10px] text-blue-300/60 mt-1 font-mono">
            <span>Subtle Delivery</span>
            <span>Intense Acting</span>
          </div>
        </div>

        {/* 4. Speaker Boost Toggle */}
        <div className="pt-2 border-t border-blue-400/20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-sky-400" />
            <div>
              <div className="text-xs font-bold text-white">
                Studio Speaker Boost
              </div>
              <p className="text-[11px] text-blue-200/70">
                Enhance vocal presence and frequency punch
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => updateSetting('use_speaker_boost', !settings.use_speaker_boost)}
            className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none border ${
              settings.use_speaker_boost ? 'bg-sky-400 border-sky-300' : 'bg-blue-950 border-blue-400/30'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full transition-transform absolute top-0.5 left-0.5 ${
                settings.use_speaker_boost ? 'translate-x-5 bg-blue-950' : 'translate-x-0 bg-blue-300/70'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
