import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Search, 
  Play, 
  Pause, 
  Check, 
  ChevronDown, 
  Sliders, 
  Sparkles, 
  Volume2, 
  User, 
  X,
  VolumeX,
  Bot
} from 'lucide-react';
import { applyCharacterEffect } from '../utils/audioEffects';

export default function VoiceSelector({ 
  voices, 
  selectedVoiceId, 
  onSelectVoice, 
  loading 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playingPreviewId, setPlayingPreviewId] = useState(null);

  const previewAudioRef = useRef(new Audio());

  const activeVoice = voices.find(v => v.voice_id === selectedVoiceId) || voices[0] || {
    voice_id: 'free_char_cartoon',
    name: 'Pip (कार्टून / Cartoon)',
    labels: { accent: 'Playful', description: 'Cartoon', gender: 'cartoon', use_case: 'animation' },
    preview_url: null
  };

  useEffect(() => {
    const audio = previewAudioRef.current;
    
    const handleEnded = () => setPlayingPreviewId(null);
    const handleError = () => setPlayingPreviewId(null);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePreview = async (voice, e) => {
    e.stopPropagation();
    const audio = previewAudioRef.current;

    if (playingPreviewId === voice.voice_id) {
      audio.pause();
      setPlayingPreviewId(null);
    } else {
      try {
        const previewUrl = voice.preview_url || `/api/demo-audio?voice_id=${voice.voice_id}`;
        const charType = voice.labels?.character_type;

        if (charType) {
          const res = await fetch(previewUrl);
          if (res.ok) {
            const rawBlob = await res.blob();
            const effBlob = await applyCharacterEffect(rawBlob, charType);
            audio.src = URL.createObjectURL(effBlob);
            audio.currentTime = 0;
            audio.play().then(() => setPlayingPreviewId(voice.voice_id)).catch(() => setPlayingPreviewId(null));
            return;
          }
        }

        audio.src = previewUrl;
        audio.currentTime = 0;
        audio.play().then(() => {
          setPlayingPreviewId(voice.voice_id);
        }).catch(err => {
          console.warn('Voice preview audio play failed:', err);
          audio.src = `/api/demo-audio?voice_id=${voice.voice_id}`;
          audio.play().then(() => setPlayingPreviewId(voice.voice_id)).catch(() => setPlayingPreviewId(null));
        });
      } catch (err) {
        console.warn('Preview error:', err);
        setPlayingPreviewId(null);
      }
    }
  };

  const filteredVoices = voices.filter(voice => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = voice.name.toLowerCase().includes(q) ||
      (voice.language_name && voice.language_name.toLowerCase().includes(q)) ||
      (voice.lang && voice.lang.toLowerCase().includes(q)) ||
      (voice.labels?.accent && voice.labels.accent.toLowerCase().includes(q)) ||
      (voice.labels?.description && voice.labels.description.toLowerCase().includes(q)) ||
      (voice.labels?.use_case && voice.labels.use_case.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'character') return voice.sub_category === 'character' || !!voice.labels?.character_type;
    if (selectedCategory === 'free_indian') return voice.sub_category === 'free_indian' || (voice.category === 'free' && voice.flag === '🇮🇳');
    if (selectedCategory === 'free_global') return voice.sub_category === 'free_global';
    if (selectedCategory === 'elevenlabs') return voice.category !== 'free';
    if (selectedCategory === 'female') return voice.labels?.gender === 'female';
    if (selectedCategory === 'male') return voice.labels?.gender === 'male';

    return true;
  });

  const isFreeVoice = activeVoice.category === 'free' || activeVoice.labels?.isFree;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
          <Mic className="w-4 h-4 text-sky-400" />
          <span>Narration Voice Target</span>
        </label>
        <span className="text-[11px] text-blue-300/70">
          {voices.length} Available • {voices.filter(v => v.category === 'free').length} Free
        </span>
      </div>

      {/* Trigger Card */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/25 hover:border-sky-400/50 cursor-pointer transition-all group focus:outline-none focus:ring-2 focus:ring-sky-400/30 shadow-md"
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl border border-blue-400/30 bg-blue-900/60 flex items-center justify-center shrink-0 text-base shadow-sm">
            {activeVoice.flag ? (
              <span>{activeVoice.flag}</span>
            ) : (
              <User className="w-4 h-4 text-sky-300" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className={`font-bold text-white text-sm truncate ${activeVoice.font_class || ''}`}>
                {activeVoice.name}
              </span>
              {activeVoice.font_class && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30 ${activeVoice.font_class}`}>
                  {activeVoice.labels?.character_type === 'girl' ? '👧 Aanya Font' : 
                   activeVoice.labels?.character_type === 'boy' ? '👦 Udit Font' : 
                   activeVoice.labels?.character_type === 'robot' ? '🤖 Sci-Fi Font' : '🎭 Cartoon Font'}
                </span>
              )}
              {isFreeVoice && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30 font-mono">
                  FREE
                </span>
              )}
            </div>
            <p className="text-xs text-blue-200/70 truncate capitalize mt-0.5">
              {[activeVoice.language_name || activeVoice.labels?.accent, activeVoice.labels?.description, activeVoice.labels?.use_case].filter(Boolean).join(' • ') || 'Neural AI Voice'}
            </p>
          </div>
        </div>

        {/* Preview Button & Chevron */}
        <div className="flex items-center space-x-2 ml-2">
          <button
            type="button"
            onClick={(e) => togglePreview(activeVoice, e)}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              playingPreviewId === activeVoice.voice_id
                ? 'bg-sky-400 border-sky-400 text-blue-950 animate-pulse'
                : 'bg-blue-900/60 border-blue-400/25 text-sky-200 hover:bg-sky-400 hover:text-blue-950'
            }`}
            title="Preview voice sample"
          >
            {playingPreviewId === activeVoice.voice_id ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>
          <ChevronDown className={`w-4 h-4 text-blue-300 group-hover:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown / Modal List */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-30 left-0 right-0 mt-2 p-3.5 rounded-2xl bg-[#091834] border border-blue-400/40 shadow-2xl shadow-black/80 backdrop-blur-2xl max-h-[460px] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            {/* Search Input */}
            <div className="relative mb-2.5">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sky-400/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Hindi, Gujarati, English, German..."
                className="w-full bg-[#061226] border border-blue-400/30 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-blue-300/40 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1 scrollbar-thin">
              {[
                { id: 'all', label: 'All Voices' },
                { id: 'character', label: '🎭 Characters' },
                { id: 'free_indian', label: '🇮🇳 Indian Free' },
                { id: 'free_global', label: '🌍 Global Free' },
                { id: 'elevenlabs', label: '💎 ElevenLabs' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'bg-blue-950/60 text-blue-200/70 hover:bg-blue-900/60 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Voice List Items */}
            <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
              {filteredVoices.length === 0 ? (
                <div className="text-center py-8 text-xs text-blue-300/60">
                  No voices match your search criteria.
                </div>
              ) : (
                filteredVoices.map((voice) => {
                  const isSelected = voice.voice_id === activeVoice.voice_id;
                  const isPlaying = playingPreviewId === voice.voice_id;
                  const isVoiceFree = voice.category === 'free' || voice.labels?.isFree;

                  return (
                    <div
                      key={voice.voice_id}
                      onClick={() => {
                        onSelectVoice(voice.voice_id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-gradient-to-r from-white via-sky-50 to-white text-blue-950 border-white shadow-md'
                          : 'bg-blue-950/40 border-transparent hover:bg-blue-900/50 hover:border-blue-400/30 text-blue-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-sm ${
                          isSelected
                            ? 'bg-blue-100 border-blue-200 text-blue-900'
                            : 'bg-blue-900/60 border-blue-400/25 text-white'
                        }`}>
                          {voice.flag ? (
                            <span>{voice.flag}</span>
                          ) : (
                            <User className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                            <span className={`font-bold text-xs truncate ${isSelected ? 'text-blue-950 font-extrabold' : 'text-white'} ${voice.font_class || ''}`}>
                              {voice.name}
                            </span>
                            {isVoiceFree && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border font-mono ${
                                isSelected ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-blue-500/20 text-sky-200 border-blue-400/30'
                              }`}>
                                FREE
                              </span>
                            )}
                          </div>
                          {voice.sample_text && voice.font_class ? (
                            <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-blue-800' : 'text-blue-200/80'} ${voice.font_class}`}>
                              "{voice.sample_text}"
                            </p>
                          ) : (
                            <p className={`text-[11px] truncate capitalize ${isSelected ? 'text-blue-700' : 'text-blue-300/60'}`}>
                              {[voice.language_name || voice.labels?.accent, voice.labels?.description, voice.labels?.use_case].filter(Boolean).join(' • ') || 'AI voice'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Preview Button & Checkmark */}
                      <div className="flex items-center space-x-1.5 ml-2">
                        <button
                          type="button"
                          onClick={(e) => togglePreview(voice, e)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                            isPlaying
                              ? isSelected ? 'bg-blue-950 text-white border-blue-950 animate-pulse' : 'bg-sky-400 text-blue-950 border-sky-400 animate-pulse'
                              : isSelected
                                ? 'bg-blue-100 hover:bg-blue-200 text-blue-900 border-blue-200'
                                : 'bg-blue-900/60 border-blue-400/25 text-sky-200 hover:bg-sky-400 hover:text-blue-950'
                          }`}
                          title="Preview voice"
                        >
                          {isPlaying ? (
                            <Pause className="w-3 h-3" />
                          ) : (
                            <Play className="w-3 h-3 ml-0.5" />
                          )}
                        </button>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-700 shrink-0 ml-1" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
