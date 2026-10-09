import React, { useState } from 'react';
import { 
  Globe2, 
  Search, 
  Volume2, 
  Check, 
  Play, 
  Pause, 
  Sparkles, 
  Radio, 
  Languages, 
  ChevronRight, 
  Flame,
  Zap
} from 'lucide-react';

const REGIONAL_LANGUAGES = [
  {
    id: 'hi',
    voice_id: 'free_hi_aarav',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: '🇮🇳',
    region: 'North & Central India',
    accent: 'Warm & Natural',
    sample: 'नमस्ते! वोक्सएआई में आपका स्वागत है। किसी भी भाषा में मुफ्त डबिंग और आवाज़ बनाएं।'
  },
  {
    id: 'gu',
    voice_id: 'free_gu_arjun',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    region: 'Gujarat, India',
    accent: 'Clear & Expressive',
    sample: 'નમસ્તે! વોક્સએઆઈમાં તમારું ખૂબ સ્વાગત છે. તમારી વાર્તાઓને જીવંત બનાવો.'
  },
  {
    id: 'mr',
    voice_id: 'free_mr_tanvi',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    region: 'Maharashtra, India',
    accent: 'Fluent & Dynamic',
    sample: 'नमस्कार! आपले वोक्सएआय स्टुडिओमध्ये स्वागत आहे. उत्कृष्ट दर्जाचा आवाज तयार करा.'
  },
  {
    id: 'bn',
    voice_id: 'free_bn_sourav',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    region: 'West Bengal & East India',
    accent: 'Sweet & Melodious',
    sample: 'নমস্কার! আমাদের ভয়েস ডাবিং স্টুডিওতে আপনাকে আন্তরিক স্বাগতম।'
  },
  {
    id: 'as',
    voice_id: 'free_as_pari',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    flag: '🇮🇳',
    region: 'Assam, Northeast India',
    accent: 'Gentle & Clear',
    sample: 'নমস্কাৰ! আপোনালোকক অসমীয়াত আন্তৰিক স্বাগতম জনাইছো।'
  },
  {
    id: 'kn',
    voice_id: 'free_kn_praveen',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    region: 'Karnataka, South India',
    accent: 'Resonant & Crisp',
    sample: 'ನಮಸ್ಕಾರ! ಕನ್ನಡ ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆಗೆ ಎಲ್ಲರಿಗೂ ಪ್ರೀತಿಯ ಸುಸ್ವಾಗತ.'
  },
  {
    id: 'raj',
    voice_id: 'free_raj_keshav',
    name: 'Rajasthani',
    nativeName: 'राजस्थानी',
    flag: '🇮🇳',
    region: 'Rajasthan, India',
    accent: 'Royal Heritage Accent',
    sample: 'खम्मा घणी सा! आपरो राजस्थानी वोक्सएआई स्टूडियो में घणो घणो स्वागत है।'
  },
  {
    id: 'en_uk',
    voice_id: 'free_en_uk_oliver',
    name: 'English (UK)',
    nativeName: 'British English',
    flag: '🇬🇧',
    region: 'United Kingdom',
    accent: 'Received Pronunciation',
    sample: 'Good day! Welcome to crystal-clear British English voice dubbing.'
  },
  {
    id: 'en_us',
    voice_id: 'free_en_us_sophia',
    name: 'English (US)',
    nativeName: 'American English',
    flag: '🇺🇸',
    region: 'North America',
    accent: 'Commercial & Modern',
    sample: 'Hello there! Turn your text into studio-grade voice narration instantly.'
  },
  {
    id: 'de',
    voice_id: 'free_de_maximilian',
    name: 'Deutsch',
    nativeName: 'German',
    flag: '🇩🇪',
    region: 'Germany & Central Europe',
    accent: 'Precise & Professional',
    sample: 'Guten Tag! Herzlich willkommen im Studio für Sprachgenerierung.'
  },
  {
    id: 'fr',
    voice_id: 'free_fr_camille',
    name: 'Français',
    nativeName: 'French',
    flag: '🇫🇷',
    region: 'France & Francophonie',
    accent: 'Smooth & Elegant',
    sample: 'Bonjour et bienvenue dans notre studio vocal de doublage en français.'
  }
];

export default function LanguageSelectorSide({ 
  selectedVoiceId, 
  onSelectLanguage,
  onPlayPreview,
  playingPreviewId
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredLanguages = REGIONAL_LANGUAGES.filter(lang => {
    const matchesSearch = 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.region.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'indic') return lang.flag === '🇮🇳';
    if (activeTab === 'global') return lang.flag !== '🇮🇳';
    return true;
  });

  return (
    <div className="glass-panel-blue rounded-3xl p-4 sm:p-5 border border-blue-400/25 flex flex-col h-full shadow-2xl relative overflow-hidden">
      
      {/* Decorative ambient light */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-blue-400/20 mb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-sky-400/30 flex items-center justify-center text-sky-300">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-1.5">
              <span>All Languages Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            </h3>
            <p className="text-[11px] text-blue-200/70">
              One-click instant dialect selection
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-200">
          {REGIONAL_LANGUAGES.length} Voices
        </span>
      </div>

      {/* Search Input with Icon */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-sky-400/60" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Hindi, Gujarati, German..."
          className="w-full bg-[#081733] border border-blue-400/25 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-blue-300/40 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 mb-3 bg-blue-950/60 p-1 rounded-xl border border-blue-400/20">
        {[
          { id: 'all', label: 'All Dialects' },
          { id: 'indic', label: '🇮🇳 Indian (7)' },
          { id: 'global', label: '🌍 Global (4)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-[11px] py-1 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-blue-200/70 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Language List Cards */}
      <div className="overflow-y-auto space-y-2 flex-1 pr-1 max-h-[580px] scrollbar-thin">
        {filteredLanguages.map(item => {
          const isSelected = selectedVoiceId === item.voice_id;
          const isPlaying = playingPreviewId === item.voice_id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectLanguage(item)}
              className={`group p-3 rounded-2xl cursor-pointer border transition-all relative ${
                isSelected
                  ? 'bg-gradient-to-r from-white via-sky-50 to-white text-blue-950 border-white shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                  : 'bg-blue-950/40 hover:bg-blue-900/50 border-blue-400/20 hover:border-blue-400/40 text-blue-100'
              }`}
            >
              <div className="flex items-center justify-between">
                
                {/* Left info */}
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 text-base transition-transform group-hover:scale-105 ${
                    isSelected 
                      ? 'bg-blue-100 border-blue-200 text-blue-900' 
                      : 'bg-blue-900/60 border-blue-400/30 text-white'
                  }`}>
                    <span>{item.flag}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold tracking-tight truncate ${isSelected ? 'text-blue-950 font-extrabold' : 'text-white'}`}>
                        {item.nativeName}
                      </span>
                      <span className={`text-xs font-medium truncate ${isSelected ? 'text-blue-800' : 'text-blue-300/80'}`}>
                        ({item.name})
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <span className={`text-[10px] truncate ${isSelected ? 'text-blue-700' : 'text-blue-300/60'}`}>
                        {item.region}
                      </span>
                      <span className={isSelected ? 'text-blue-400' : 'text-blue-500'}>•</span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-900 font-bold' : 'text-sky-300'}`}>
                        {item.accent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center space-x-1.5 ml-2 shrink-0">
                  {/* Preview audio button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayPreview(item);
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      isPlaying
                        ? isSelected 
                          ? 'bg-blue-900 text-white border-blue-900 animate-pulse'
                          : 'bg-sky-400 text-blue-950 border-sky-400 animate-pulse'
                        : isSelected
                          ? 'bg-blue-100 hover:bg-blue-200 text-blue-950 border-blue-200'
                          : 'bg-blue-900/60 hover:bg-blue-800 text-sky-200 hover:text-white border-blue-400/30'
                    }`}
                    title="Listen to language preview"
                  >
                    {isPlaying ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3 ml-0.5" />
                    )}
                  </button>

                  {/* Active Indicator */}
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-900/40 group-hover:bg-blue-800 text-blue-300 group-hover:text-white flex items-center justify-center transition-colors">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

              </div>

              {/* Sample excerpt */}
              <div className={`mt-2 pt-2 border-t text-[11px] truncate italic ${
                isSelected ? 'border-blue-200/60 text-blue-800' : 'border-blue-400/10 text-blue-300/70'
              }`}>
                "{item.sample}"
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Note */}
      <div className="mt-3.5 pt-3 border-t border-blue-400/20 flex items-center justify-between text-[11px] text-blue-200/80">
        <div className="flex items-center space-x-1.5">
          <Zap className="w-3.5 h-3.5 text-sky-400" />
          <span>Multi-Dialect Neural Engine</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30">
          Zero Fee
        </span>
      </div>

    </div>
  );
}
