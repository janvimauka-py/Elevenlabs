import React, { useState } from 'react';
import { 
  Trash2, 
  ClipboardPaste, 
  Sparkles, 
  Copy, 
  Check, 
  Wand2, 
  Volume2, 
  Film, 
  Mic2, 
  HeartHandshake, 
  Radio, 
  Rocket, 
  Clock, 
  Type, 
  FileText, 
  Bot, 
  Zap, 
  Smile 
} from 'lucide-react';

const SAMPLE_SCRIPTS = [
  {
    id: 'bot_support',
    title: '🎧 Customer Support Bot',
    voice_id: 'free_hi_aarav',
    text: "Hello! Thank you for contacting support. I am your virtual bot assistant. How can I assist you with your account today?"
  },
  {
    id: 'bot_news',
    title: '🎙️ News Anchor Bot',
    voice_id: 'free_en_uk_oliver',
    text: "Good evening. Welcome to the prime news broadcast. Today's global briefing highlights breakneck advancements in neural voice synthesis."
  },
  {
    id: 'girl',
    title: '👧 Aanya (Girl Voice)',
    font_class: 'font-girl',
    voice_id: 'free_char_girl',
    text: "Hii, my name is Aanya, how are you?"
  },
  {
    id: 'boy',
    title: '👦 Udit (Boy Voice)',
    font_class: 'font-boy',
    voice_id: 'free_char_boy',
    text: "Hi, I am Udit, how are you?"
  },
  {
    id: 'robot',
    title: '🤖 Robo-X9 (Robot Voice)',
    font_class: 'font-robot',
    voice_id: 'free_char_robot',
    text: "System diagnostics online. I am Robo-X9. All vocal transmission circuits operational."
  },
  {
    id: 'cartoon',
    title: '🎭 Pip (Cartoon Voice)',
    font_class: 'font-cartoon',
    voice_id: 'free_char_cartoon',
    text: "Yay! Hey there, I am Pip the cartoon character! Let's have some awesome fun and adventure! Yahoo!"
  },
  {
    id: 'hindi',
    title: '🇮🇳 हिंदी (Hindi)',
    voice_id: 'free_hi_aarav',
    text: "नमस्ते! वोक्सएआई स्टूडियो में आपका स्वागत है। अब आप बिना किसी सब्सक्रिप्शन के हिंदी में उच्च गुणवत्ता वाली प्राकृतिक आवाज़ मुफ्त में बना सकते हैं।"
  },
  {
    id: 'gujarati',
    title: '🇮🇳 ગુજરાતી (Gujarati)',
    voice_id: 'free_gu_arjun',
    text: "નમસ્તે! વોક્સએઆઈમાં તમારું ખૂબ ખૂબ સ્વાગત છે. હવે તમે ગુજરાતીમાં કોઈપણ સબ્સ્ક્રિપ્શન વિના મફત અવાજ તૈયાર કરી શકો છો."
  },
  {
    id: 'marathi',
    title: '🇮🇳 मराठी (Marathi)',
    voice_id: 'free_mr_tanvi',
    text: "नमस्कार! आपले वोक्सएआय स्टुडिओमध्ये मनापासून स्वागत आहे. आता कोणत्याही वर्गणीशिवाय मराठीत सुंदर आवाज मोफत तयार करा."
  },
  {
    id: 'bengali',
    title: '🇮🇳 বাংলা (Bengali)',
    voice_id: 'free_bn_sourav',
    text: "নমস্কার! আমাদের ভয়েস স্টুডিওতে আপনাকে স্বাগতম। বাংলা ভয়েস জেনারেশন এখন সবার জন্য সম্পূর্ণ বিনামূল্যে উপলব্ধ।"
  },
  {
    id: 'us_english',
    title: '🇺🇸 US English',
    voice_id: 'free_en_us_sophia',
    text: "Hello there! Welcome to modern voice synthesis. Create lifelike commercials and narrations with zero subscription or cost."
  }
];

export default function TextInputArea({ 
  text, 
  setText, 
  activeVoice,
  onPaste, 
  onClear, 
  onSelectSample, 
  onSelectVoice,
  isGenerating, 
  onGenerate 
}) {
  const [copied, setCopied] = useState(false);
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readingTimeSeconds = Math.ceil((wordCount / 150) * 60);
  const formattedReadingTime = readingTimeSeconds < 60 
    ? `~${readingTimeSeconds}s` 
    : `~${Math.floor(readingTimeSeconds / 60)}m ${readingTimeSeconds % 60}s`;

  const maxChars = 5000;

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isGenerating && text.trim()) {
        onGenerate();
      }
    }
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const handleClipboardPaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText((prev) => (prev ? prev + ' ' + clipboardText : clipboardText));
      }
    } catch (err) {
      onPaste?.();
    }
  };

  const handleAIEnhance = () => {
    if (!text.trim()) return;
    // Format text: normalize extra whitespace and ensure appropriate terminal punctuation
    let trimmed = text.trim().replace(/\s+/g, ' ');
    if (!/[.!?।]$/.test(trimmed)) {
      trimmed += '.';
    }
    setText(trimmed);
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 relative border border-blue-400/25 shadow-2xl transition-all">
      
      {/* Top Bar: Title and Functional Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-sky-400/30 flex items-center justify-center text-sky-300">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold tracking-wide uppercase text-white flex items-center space-x-1.5">
              <span>Script & Dubbing Input</span>
            </h2>
            <span className="text-[11px] text-blue-200/70">
              Type, paste, or select bot prompts below
            </span>
          </div>
        </div>

        {/* Rich Quick Action Buttons with Icons */}
        <div className="flex items-center space-x-1.5 flex-wrap gap-y-1 self-start sm:self-auto">
          {/* AI Enhance / Format */}
          <button
            type="button"
            onClick={handleAIEnhance}
            disabled={!text}
            className="flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-sky-200 hover:text-white border border-blue-400/25 transition-all disabled:opacity-40 active:scale-95"
            title="Auto-format punctuation and whitespace"
          >
            <Wand2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Format</span>
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-sky-200 hover:text-white border border-blue-400/25 transition-all disabled:opacity-40 active:scale-95"
            title="Copy script to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Paste Button */}
          <button
            type="button"
            onClick={handleClipboardPaste}
            className="flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-sky-200 hover:text-white border border-blue-400/25 transition-all active:scale-95"
            title="Paste text from clipboard"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            <span>Paste</span>
          </button>

          {/* Clear Button */}
          <button
            type="button"
            onClick={onClear}
            disabled={!text}
            className="flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-200 hover:text-red-100 border border-red-500/25 transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-95"
            title="Clear all text"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Preset Script Selector Chips with Icons */}
      <div className="mb-3.5 flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
        <span className="text-[11px] font-bold text-sky-200 flex items-center space-x-1 shrink-0 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Presets:</span>
        </span>
        {SAMPLE_SCRIPTS.map((script) => (
          <button
            key={script.id}
            onClick={() => {
              setText(script.text);
              if (script.voice_id) {
                onSelectVoice?.(script.voice_id);
              }
              onSelectSample?.(script);
            }}
            className={`shrink-0 text-xs px-3 py-1 rounded-full border transition-all active:scale-95 flex items-center space-x-1.5 ${
              script.font_class 
                ? `${script.font_class} bg-blue-600/30 hover:bg-blue-600/50 text-white border-sky-400/50 shadow-sm` 
                : 'bg-blue-950/50 hover:bg-blue-900/60 text-blue-200 hover:text-white border-blue-400/20'
            }`}
          >
            <span>{script.title}</span>
          </button>
        ))}
      </div>

      {/* Active Character Font indicator */}
      {activeVoice?.font_class && (
        <div className="mb-2.5 flex items-center justify-between text-xs px-3.5 py-2 rounded-xl bg-blue-900/40 border border-blue-400/25 text-blue-100">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-blue-200/80">Active Typography:</span>
            <span className={`font-bold text-sm text-white ${activeVoice.font_class}`}>
              {activeVoice.name}
            </span>
          </div>
          <span className="text-[11px] text-sky-300 font-mono">
            Live Font Binding
          </span>
        </div>
      )}

      {/* Text Area in Blue & White Aesthetic */}
      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={7}
          placeholder="Type or paste your script here for the AI voice or radio bot..."
          className={`w-full bg-[#0a1b38] text-white placeholder-blue-300/40 rounded-2xl p-4 leading-relaxed border border-blue-400/30 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 focus:outline-none resize-y min-h-[160px] selection:bg-blue-500 selection:text-white transition-all shadow-inner ${
            activeVoice?.font_class 
              ? `${activeVoice.font_class} text-base sm:text-lg` 
              : 'font-sans text-sm sm:text-base'
          }`}
        />

        {charCount > 4000 && (
          <div className="absolute bottom-3 right-3 text-[11px] px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/30">
            {maxChars - charCount} chars remaining
          </div>
        )}
      </div>

      {/* Bottom Toolbar: Live Stats & Shortcuts */}
      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-blue-200/80">
        <div className="flex items-center space-x-3 sm:space-x-4 flex-wrap">
          {/* Character Counter */}
          <div className="flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium">Chars:</span>
            <span className={`font-mono font-bold ${
              charCount > maxChars ? 'text-red-400' : charCount > 4000 ? 'text-amber-400' : 'text-white'
            }`}>
              {charCount.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
          </div>

          <span className="text-blue-400/40">•</span>

          {/* Word Counter */}
          <div className="flex items-center space-x-1.5">
            <span className="font-medium">Words:</span>
            <span className="font-mono font-bold text-white">
              {wordCount.toLocaleString()}
            </span>
          </div>

          <span className="text-blue-400/40 hidden sm:inline">•</span>

          {/* Estimated Audio Duration */}
          <div className="hidden sm:flex items-center space-x-1.5 text-blue-200">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Est. Duration:</span>
            <span className="font-mono font-bold text-sky-300">
              {wordCount > 0 ? formattedReadingTime : '0s'}
            </span>
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="flex items-center space-x-1.5 text-[11px] text-blue-300/70 self-end sm:self-auto">
          <Zap className="w-3 h-3 text-sky-400" />
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-blue-900/60 text-sky-200 border border-blue-400/30 font-mono text-[10px]">
            Ctrl + Enter
          </kbd>
          <span>to generate</span>
        </div>
      </div>

    </div>
  );
}
