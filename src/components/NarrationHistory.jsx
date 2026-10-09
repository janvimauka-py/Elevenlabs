import React, { useState } from 'react';
import { 
  History, 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  Clock, 
  FileText, 
  ArrowUpRight, 
  Check, 
  Sparkles,
  Volume2,
  Headphones,
  Bot
} from 'lucide-react';

export default function NarrationHistory({ 
  history, 
  onPlayItem, 
  onLoadText, 
  onDeleteItem, 
  onClearHistory,
  currentPlayingId,
  isPlayingCurrent
}) {
  const formatTimestamp = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Recently';
    }
  };

  const handleDownload = (item, e) => {
    e.stopPropagation();
    if (!item.audioUrl) return;
    const link = document.createElement('a');
    link.href = item.audioUrl;
    link.download = `voxai-${(item.voiceName || 'voice').toLowerCase()}-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel-blue rounded-3xl p-5 border border-blue-400/25 relative shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-400/20">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-sky-400/30 flex items-center justify-center">
            <History className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Dubbing & Narration History
          </h3>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30 font-mono">
            {history.length}
          </span>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center space-x-1 text-[11px] text-blue-300 hover:text-white transition-colors px-2.5 py-1 rounded-lg bg-blue-900/40 hover:bg-blue-800 border border-blue-400/20"
            title="Clear all generation history"
          >
            <Trash2 className="w-3 h-3 text-red-300" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* List */}
      {history.length === 0 ? (
        <div className="text-center py-8 px-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-sky-400/30 flex items-center justify-center mx-auto mb-2 text-sky-400">
            <Headphones className="w-5 h-5 text-sky-300" />
          </div>
          <p className="text-xs text-white font-bold">No voice recordings yet</p>
          <p className="text-[11px] text-blue-200/70 mt-0.5">
            Your generated voice and radio bot recordings will appear here with instant replay and download.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
          {history.map((item) => {
            const isPlaying = currentPlayingId === item.id && isPlayingCurrent;

            return (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-400/20 hover:border-sky-400/40 transition-all group relative"
              >
                {/* Meta details row */}
                <div className="flex items-center justify-between mb-1.5 text-[11px]">
                  <div className="flex items-center space-x-1.5">
                    <span className={`font-bold text-white ${
                      item.fontClass || 
                      (item.voiceName?.includes('Aanya') ? 'font-girl' : 
                       item.voiceName?.includes('Udit') ? 'font-boy' : 
                       item.voiceName?.includes('Robo') ? 'font-robot' : 
                       item.voiceName?.includes('Pip') ? 'font-cartoon' : '')
                    }`}>
                      {item.voiceName}
                    </span>
                    <span className="text-blue-400/50">•</span>
                    <span className="text-blue-300/80 truncate max-w-[100px] font-mono text-[10px]">
                      {item.modelName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sky-300/70 font-mono text-[10px]">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{formatTimestamp(item.timestamp)}</span>
                  </div>
                </div>

                {/* Text excerpt preview */}
                <p 
                  onClick={() => onLoadText(item.text)}
                  className="text-xs text-blue-100 line-clamp-2 leading-relaxed cursor-pointer hover:text-white transition-colors"
                  title="Click to load text back into editor"
                >
                  "{item.text}"
                </p>

                {/* Bottom Action Row */}
                <div className="mt-2.5 pt-2 border-t border-blue-400/15 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => onPlayItem(item)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                        isPlaying
                          ? 'bg-sky-400 border-sky-400 text-blue-950 animate-pulse'
                          : 'bg-white hover:bg-sky-50 text-blue-950 border-white shadow-sm'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 ml-0.5 fill-blue-950" />
                          <span>Play</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onLoadText(item.text)}
                      className="flex items-center space-x-1 text-[11px] text-sky-300 hover:text-white px-2 py-1 rounded-lg hover:bg-blue-900/40 transition-colors"
                      title="Load script into editor"
                    >
                      <ArrowUpRight className="w-3 h-3" />
                      <span>Use Text</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => handleDownload(item, e)}
                      className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/60 transition-colors"
                      title="Download MP3"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 rounded-lg text-blue-300/60 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
