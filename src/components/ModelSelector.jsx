import React, { useState } from 'react';
import { Cpu, Zap, ChevronDown, Check, Globe, Sparkles, Layers, Activity } from 'lucide-react';

export default function ModelSelector({ models, selectedModelId, onSelectModel, loading }) {
  const [isOpen, setIsOpen] = useState(false);

  const activeModel = models.find(m => m.model_id === selectedModelId) || models[0] || {
    model_id: 'free_indic_neural',
    name: 'Free Neural Multi-Dialect v2',
    description: 'High performance neural synthesis for Indian and Global languages.',
    badge: '100% Free',
    latency: 'Real-time (<100ms)'
  };

  const handleSelect = (modelId) => {
    onSelectModel(modelId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
          <Cpu className="w-4 h-4 text-sky-400" />
          <span>Synthesis Model Engine</span>
        </label>
        {activeModel?.badge && (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30">
            {activeModel.badge}
          </span>
        )}
      </div>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/25 hover:border-sky-400/50 text-left transition-all group focus:outline-none focus:ring-2 focus:ring-sky-400/30 shadow-md"
      >
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm truncate">
              {activeModel.name}
            </span>
            {activeModel.latency && (
              <span className="text-[10px] text-sky-300 font-mono hidden sm:inline">
                {activeModel.latency}
              </span>
            )}
          </div>
          <p className="text-xs text-blue-200/70 truncate mt-0.5">
            {activeModel.description || 'AI model engine'}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-blue-300 group-hover:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-30 left-0 right-0 mt-2 p-2 rounded-2xl bg-[#091834] border border-blue-400/40 shadow-2xl shadow-black/80 backdrop-blur-2xl max-h-80 overflow-y-auto space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
            {models.map((model) => {
              const isSelected = model.model_id === activeModel.model_id;
              return (
                <div
                  key={model.model_id}
                  onClick={() => handleSelect(model.model_id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-white via-sky-50 to-white text-blue-950 border-white shadow-md'
                      : 'bg-blue-950/40 border-transparent hover:bg-blue-900/50 hover:border-blue-400/25 text-blue-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-sm ${isSelected ? 'text-blue-950 font-extrabold' : 'text-white'}`}>
                        {model.name}
                      </span>
                      {model.badge && (
                        <span className={`text-[10px] font-mono px-2 py-0.2 rounded border ${
                          isSelected ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-blue-500/20 text-sky-200 border-blue-400/30'
                        }`}>
                          {model.badge}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-700 shrink-0" />}
                  </div>

                  <p className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-blue-800' : 'text-blue-200/70'}`}>
                    {model.description}
                  </p>

                  <div className={`mt-2 flex items-center justify-between text-[11px] border-t pt-1.5 ${
                    isSelected ? 'border-blue-200/60 text-blue-800' : 'border-blue-400/10 text-blue-300/70'
                  }`}>
                    <span className="flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-sky-400" />
                      <span>{model.latency || 'Optimized speed'}</span>
                    </span>
                    {model.languages && (
                      <span className="flex items-center space-x-1">
                        <Globe className="w-3 h-3 text-sky-400" />
                        <span>{model.languages.length} Languages</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
