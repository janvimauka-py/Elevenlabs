import React, { useState } from 'react';
import { 
  Bot, 
  Radio, 
  Sparkles, 
  Headphones, 
  Newspaper, 
  BookOpen, 
  Gamepad2, 
  MessageSquareText, 
  Heart, 
  Zap, 
  CheckCircle2, 
  Sliders, 
  Volume2, 
  Cpu, 
  HelpCircle, 
  Play, 
  Smile, 
  Wand2, 
  Flame, 
  ShieldCheck,
  ChevronRight,
  MessageCircleQuestion,
  RefreshCw
} from 'lucide-react';

export const BOT_PERSONAS = [
  {
    id: 'bot_support',
    name: 'Customer Support Bot',
    badge: 'HelpDesk AI',
    icon: Headphones,
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    bgGradient: 'from-blue-600/15 to-sky-600/10',
    voiceId: 'free_hi_aarav',
    tone: 'Polite, empathetic, and clear support guide',
    script: 'Hello! Thank you for contacting customer support. I am your virtual assistant. How can I help resolve your query today?',
    settings: { stability: 0.70, similarity_boost: 0.80, style: 0.10 }
  },
  {
    id: 'bot_news',
    name: 'News Anchor Bot',
    badge: 'Broadcast AI',
    icon: Newspaper,
    iconColor: 'text-sky-300',
    borderColor: 'border-sky-500/40',
    bgGradient: 'from-sky-600/15 to-blue-600/10',
    voiceId: 'free_en_uk_oliver',
    tone: 'Authoritative, articulate, broadcast tempo',
    script: 'Good evening. Here are the top headlines for tonight: AI innovations surge as neural voice dubbing technology becomes accessible worldwide.',
    settings: { stability: 0.85, similarity_boost: 0.90, style: 0.05 }
  },
  {
    id: 'bot_story',
    name: 'Storyteller Bot',
    badge: 'Audiobook AI',
    icon: BookOpen,
    iconColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    bgGradient: 'from-indigo-600/15 to-blue-600/10',
    voiceId: 'free_char_girl',
    tone: 'Expressive, immersive, poetic cadence',
    script: 'Once upon a time, atop the mist-covered sapphire hills, a hidden library held ancient manuscripts written in whispers and starlight...',
    settings: { stability: 0.45, similarity_boost: 0.85, style: 0.35 }
  },
  {
    id: 'bot_gaming',
    name: 'Cyber NPC Gaming Bot',
    badge: 'Game NPC',
    icon: Gamepad2,
    iconColor: 'text-cyan-300',
    borderColor: 'border-cyan-500/40',
    bgGradient: 'from-cyan-600/15 to-blue-600/10',
    voiceId: 'free_char_robot',
    tone: 'Futuristic, cybernetic, energetic game NPC',
    script: 'Warning! Sector 7 firewall breached. Cyber-warrior, recharge your plasma cannon and follow my coordinates immediately!',
    settings: { stability: 0.90, similarity_boost: 0.70, style: 0.00 }
  },
  {
    id: 'bot_companion',
    name: 'Smart Conversational Bot',
    badge: 'Companion AI',
    icon: MessageSquareText,
    iconColor: 'text-blue-300',
    borderColor: 'border-blue-400/40',
    bgGradient: 'from-blue-500/15 to-indigo-500/10',
    voiceId: 'free_en_us_sophia',
    tone: 'Warm, natural, witty conversational friend',
    script: 'Hey there! How is your day going? I am ready to brainstorm creative ideas, review your code, or just chat whenever you need.',
    settings: { stability: 0.55, similarity_boost: 0.75, style: 0.20 }
  },
  {
    id: 'bot_cartoon',
    name: 'Pip Cartoon Bot',
    badge: 'Animation AI',
    icon: Smile,
    iconColor: 'text-amber-300',
    borderColor: 'border-amber-500/40',
    bgGradient: 'from-blue-600/15 to-amber-500/10',
    voiceId: 'free_char_cartoon',
    tone: 'Playful, bouncy, energetic cartoon mascot',
    script: 'Yippee! Woohoo! Get ready for an awesome adventure full of bounce, laughter, and high-energy excitement!',
    settings: { stability: 0.30, similarity_boost: 0.60, style: 0.50 }
  }
];

export const BOT_MODES = [
  {
    id: 'mode_tts',
    name: 'Direct Script Bot',
    desc: 'Converts any script directly into high-fidelity neural bot speech',
    icon: Volume2
  },
  {
    id: 'mode_interactive',
    name: 'Interactive Q&A Bot',
    desc: 'Simulate bot questions & instant smart replies with 1 click',
    icon: MessageCircleQuestion
  },
  {
    id: 'mode_cyber',
    name: 'Robo-Synth Bot Effect',
    desc: 'Applies robotic cybernetic frequency filter to the voice output',
    icon: Cpu
  }
];

export const BOT_TONES = [
  { id: 'tone_natural', label: 'Balanced Tone', icon: Sparkles },
  { id: 'tone_excited', label: 'High Energy', icon: Flame },
  { id: 'tone_calm', label: 'Calm & Steady', icon: Heart },
  { id: 'tone_pro', label: 'Executive Formal', icon: ShieldCheck }
];

export default function BotRadioSelector({
  selectedBotId,
  onSelectBot,
  botMode,
  onChangeBotMode,
  botTone,
  onChangeBotTone,
  onLoadScript,
  onGenerate
}) {
  const [activeTab, setActiveTab] = useState('personas'); // 'personas' | 'mode' | 'tones'
  const activeBot = BOT_PERSONAS.find(b => b.id === selectedBotId) || BOT_PERSONAS[0];

  const handleBotRadioChange = (bot) => {
    onSelectBot(bot);
  };

  const handleApplyScript = (bot) => {
    onLoadScript(bot.script, bot.voiceId, bot.settings);
  };

  return (
    <div className="glass-panel-blue rounded-3xl p-5 sm:p-6 border border-blue-400/25 shadow-2xl relative overflow-hidden transition-all">
      {/* Decorative Blue & White Background Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and Mode Switcher */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-blue-400/20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 p-0.5 shadow-lg shadow-blue-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#0a192f] rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-sky-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-white tracking-wide flex items-center gap-1.5">
                <span>AI Voice Bot Command Center</span>
              </h3>
              <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30">
                <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>Radio Bot Mode</span>
              </span>
            </div>
            <p className="text-xs text-blue-200/80 mt-0.5">
              Select an intelligent bot persona using interactive radio buttons with auto-configured vocal acoustics.
            </p>
          </div>
        </div>

        {/* Tab Filter Navigation with Rich Icons */}
        <div className="flex items-center bg-blue-950/60 p-1 rounded-xl border border-blue-400/20 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('personas')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'personas'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-blue-200/70 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Bot Personas</span>
          </button>

          <button
            onClick={() => setActiveTab('mode')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'mode'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-blue-200/70 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Bot Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('tones')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'tones'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-blue-200/70 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tone Presets</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Bot Personas with Radio Buttons */}
      {activeTab === 'personas' && (
        <div className="relative z-10 mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200/70 flex items-center space-x-1.5">
              <Radio className="w-3.5 h-3.5 text-sky-400" />
              <span>Select Active Bot Persona (Click Radio Button):</span>
            </span>
            <span className="text-xs text-sky-300 font-mono">
              6 Neural Personas Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BOT_PERSONAS.map((bot) => {
              const isSelected = selectedBotId === bot.id;
              const IconComp = bot.icon;

              return (
                <label
                  key={bot.id}
                  onClick={() => handleBotRadioChange(bot)}
                  className={`group relative flex flex-col justify-between p-4 rounded-2xl cursor-pointer border transition-all duration-200 select-none ${
                    isSelected
                      ? `bg-gradient-to-b ${bot.bgGradient} border-sky-400 shadow-lg shadow-blue-500/20 ring-1 ring-sky-400/50`
                      : 'bg-blue-950/30 hover:bg-blue-900/40 border-blue-400/20 hover:border-blue-400/40'
                  }`}
                >
                  {/* Top Bar with Custom Radio Button & Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      {/* Stylized Functional Radio Button */}
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="ai_bot_persona"
                          value={bot.id}
                          checked={isSelected}
                          onChange={() => handleBotRadioChange(bot)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                            isSelected
                              ? 'border-sky-400 bg-blue-600 shadow-sm shadow-sky-400/50'
                              : 'border-blue-300/40 bg-blue-950/60 group-hover:border-blue-300/70'
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          )}
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-blue-900/60 border border-blue-400/30 flex items-center justify-center shrink-0">
                        <IconComp className={`w-4 h-4 ${bot.iconColor}`} />
                      </div>

                      <span className="text-xs font-bold text-white group-hover:text-sky-200 transition-colors">
                        {bot.name}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-200 border border-blue-400/20 whitespace-nowrap">
                      {bot.badge}
                    </span>
                  </div>

                  {/* Bot Tone Description */}
                  <p className="text-[11px] text-blue-200/70 mt-2.5 line-clamp-2 leading-relaxed">
                    {bot.tone}
                  </p>

                  {/* Actions: Quick Load Script */}
                  <div className="mt-3 pt-2.5 border-t border-blue-400/15 flex items-center justify-between text-[11px]">
                    <span className="text-blue-300/80 font-mono text-[10px]">
                      Stab: {(bot.settings.stability * 100).toFixed(0)}%
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyScript(bot);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-sky-200 hover:text-white border border-blue-400/30 transition-all font-semibold flex items-center space-x-1"
                      title="Load this Bot's sample script into the prompt editor"
                    >
                      <Sparkles className="w-3 h-3 text-sky-300" />
                      <span>Load Script</span>
                    </button>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Active Bot Preview & Fast Launch Bar */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-900/50 via-sky-950/40 to-blue-900/50 border border-blue-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-xl bg-blue-600/40 border border-sky-400/40 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-extrabold text-white">
                    Active Radio Bot: {activeBot.name}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <p className="text-[11px] text-blue-200/80 truncate max-w-md">
                  "{activeBot.script}"
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => handleApplyScript(activeBot)}
                className="px-3 py-1.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-sky-200 hover:text-white border border-blue-400/30 text-xs font-semibold transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Fill Prompt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bot Execution Mode Radio Group */}
      {activeTab === 'mode' && (
        <div className="relative z-10 mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200/70 flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>Bot Operation Mode (Radio Select):</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BOT_MODES.map((mode) => {
              const isSelected = botMode === mode.id;
              const IconComp = mode.icon;

              return (
                <label
                  key={mode.id}
                  onClick={() => onChangeBotMode(mode.id)}
                  className={`flex flex-col justify-between p-4 rounded-2xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600/25 border-sky-400 shadow-md shadow-blue-500/20'
                      : 'bg-blue-950/30 hover:bg-blue-900/40 border-blue-400/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-sky-400 bg-blue-600">
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs font-bold text-white">{mode.name}</span>
                    </div>
                    <IconComp className="w-4 h-4 text-sky-300" />
                  </div>
                  <p className="text-[11px] text-blue-200/70">
                    {mode.desc}
                  </p>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Bot Tone Presets Radio Group */}
      {activeTab === 'tones' && (
        <div className="relative z-10 mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200/70 flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              <span>Bot Tone & Energy Modulation (Radio Select):</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BOT_TONES.map((tone) => {
              const isSelected = botTone === tone.id;
              const IconComp = tone.icon;

              return (
                <label
                  key={tone.id}
                  onClick={() => onChangeBotTone(tone.id)}
                  className={`flex items-center space-x-2.5 p-3 rounded-xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600/30 border-sky-400 shadow-sm text-white'
                      : 'bg-blue-950/30 hover:bg-blue-900/40 border-blue-400/20 text-blue-200/80'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-sky-400 bg-blue-600">
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <IconComp className="w-3.5 h-3.5 text-sky-300" />
                  <span className="text-xs font-semibold">{tone.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
