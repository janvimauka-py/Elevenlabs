import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LanguageSelectorSide from './components/LanguageSelectorSide';
import TextInputArea from './components/TextInputArea';
import ModelSelector from './components/ModelSelector';
import VoiceSelector from './components/VoiceSelector';
import VoiceSettings from './components/VoiceSettings';
import AudioPlayer from './components/AudioPlayer';
import NarrationHistory from './components/NarrationHistory';
import ApiKeyModal from './components/ApiKeyModal';
import BotRadioSelector, { BOT_PERSONAS } from './components/BotRadioSelector';
import Toast from './components/Toast';
import { applyCharacterEffect } from './utils/audioEffects';

import { 
  Wand2, 
  Sparkles, 
  Volume2, 
  History, 
  Settings2, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Sliders, 
  Layers, 
  Play, 
  Zap, 
  Radio, 
  Mic2, 
  ArrowRight, 
  Flame, 
  Globe2,
  Bot,
  Cpu,
  Headphones,
  Check
} from 'lucide-react';

const DEFAULT_SETTINGS = {
  stability: 0.50,
  similarity_boost: 0.75,
  style: 0.00,
  use_speaker_boost: true
};

export default function App() {
  // Application State
  const [text, setText] = useState(
    "नमस्ते! वोक्सएआई स्टूडियो में आपका स्वागत है। अब आप हिंदी, गुजराती, मराठी, बंगाली, कन्नड़, असमिया, राजस्थानी और अंग्रेजी में बिना किसी सब्सक्रिप्शन के मुफ्त में आवाज़ बना सकते हैं।"
  );

  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState('free_indic_neural');

  const [voices, setVoices] = useState([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState('free_hi_aarav');

  const [voiceSettings, setVoiceSettings] = useState(DEFAULT_SETTINGS);

  // Radio Bot Features
  const [selectedBotId, setSelectedBotId] = useState('bot_support');
  const [botMode, setBotMode] = useState('mode_tts');
  const [botTone, setBotTone] = useState('tone_natural');

  // Audio & Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [currentAudioMetadata, setCurrentAudioMetadata] = useState(null);
  const [playingPreviewId, setPlayingPreviewId] = useState(null);

  const langAudioRef = useRef(new Audio());
  const botSectionRef = useRef(null);

  // Narration History (persisted in localStorage)
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('voxai_narration_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // API Key & Backend Status
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('voxai_custom_api_key') || '';
  });
  const [apiStatus, setApiStatus] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Floating Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast((prev) => (prev?.title === title ? null : prev));
    }, 4500);
  };

  // Preview Audio Listener
  useEffect(() => {
    const audio = langAudioRef.current;
    const onEnd = () => setPlayingPreviewId(null);
    const onErr = () => setPlayingPreviewId(null);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onErr);
    return () => {
      audio.pause();
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onErr);
    };
  }, []);

  // 1. Fetch Backend API Status
  const fetchStatus = async () => {
    try {
      const headers = {};
      if (apiKey) headers['x-api-key'] = apiKey;

      const res = await fetch('/api/status', { headers });
      if (res.ok) {
        const data = await res.json();
        setApiStatus(data);
      }
    } catch (err) {
      console.warn('Failed to fetch status:', err);
    }
  };

  // 2. Fetch Models
  const fetchModels = async () => {
    try {
      const headers = {};
      if (apiKey) headers['x-api-key'] = apiKey;
      const res = await fetch('/api/models', { headers });
      if (res.ok) {
        const data = await res.json();
        setModels(data);
        if (data.length > 0 && !selectedModelId) {
          setSelectedModelId(data[0].model_id);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch models:', err);
    }
  };

  // 3. Fetch Voices
  const fetchVoices = async () => {
    try {
      const headers = {};
      if (apiKey) headers['x-api-key'] = apiKey;
      const res = await fetch('/api/voices', { headers });
      if (res.ok) {
        const data = await res.json();
        setVoices(data);
        if (data.length > 0 && !selectedVoiceId) {
          setSelectedVoiceId(data[0].voice_id);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch voices:', err);
    }
  };

  // Initial Data Load
  useEffect(() => {
    fetchStatus();
    fetchModels();
    fetchVoices();
  }, [apiKey]);

  // Persist history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('voxai_narration_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history to storage:', e);
    }
  }, [history]);

  // Active Voice & Model objects
  const activeVoice = voices.find(v => v.voice_id === selectedVoiceId) || voices[0] || { name: 'Aarav' };
  const activeModel = models.find(m => m.model_id === selectedModelId) || models[0] || { name: 'Free Neural Multi-Dialect v2' };

  // Language side panel preview trigger
  const handlePlayLanguagePreview = async (langItem) => {
    const audio = langAudioRef.current;
    if (playingPreviewId === langItem.voice_id) {
      audio.pause();
      setPlayingPreviewId(null);
    } else {
      try {
        audio.src = `/api/demo-audio?voice_id=${langItem.voice_id}`;
        audio.currentTime = 0;
        await audio.play();
        setPlayingPreviewId(langItem.voice_id);
      } catch (e) {
        console.warn('Language preview audio failed:', e);
        setPlayingPreviewId(null);
      }
    }
  };

  // Language side panel selection trigger
  const handleSelectLanguage = (langItem) => {
    setSelectedVoiceId(langItem.voice_id);
    setText(langItem.sample);
    showToast('info', `${langItem.name} Selected`, `Loaded ${langItem.nativeName} voice & sample script.`);
  };

  // Handle Radio Bot Persona change
  const handleSelectBot = (bot) => {
    setSelectedBotId(bot.id);
    if (bot.voiceId) {
      setSelectedVoiceId(bot.voiceId);
    }
    if (bot.settings) {
      setVoiceSettings(prev => ({
        ...prev,
        ...bot.settings
      }));
    }
    showToast('info', `${bot.name} Activated`, `Configured voice acoustics for ${bot.name}.`);
  };

  // Handle Script Load from Bot Card
  const handleLoadScript = (scriptText, voiceId, settings) => {
    setText(scriptText);
    if (voiceId) setSelectedVoiceId(voiceId);
    if (settings) {
      setVoiceSettings(prev => ({
        ...prev,
        ...settings
      }));
    }
    showToast('success', 'Bot Script Loaded', 'Script and optimal acoustics loaded into editor.');
  };

  // 4. Handle Narration / Dubbing Generation
  const handleGenerate = async () => {
    if (!text.trim()) {
      showToast('warning', 'Empty Text', 'Please enter some text or pick a radio bot prompt to dub.');
      return;
    }

    if (isGenerating) return;

    setIsGenerating(true);
    showToast(
      'info', 
      'Dubbing in Progress', 
      `Synthesizing studio speech with ${activeVoice.name}...`
    );

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (apiKey) headers['x-api-key'] = apiKey;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          text: text.trim(),
          voice_id: selectedVoiceId,
          model_id: selectedModelId,
          voice_settings: voiceSettings
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          showToast('error', 'API Key Required', errJson.error || 'Please provide your ElevenLabs API key in Settings, or select any Free Voice.');
          setIsSettingsOpen(true);
          return;
        }

        if (response.status === 429) {
          showToast('error', 'Quota Exceeded', 'Your ElevenLabs character quota or rate limit has been reached.');
          return;
        }

        showToast('error', 'Dubbing Error', errJson.error || 'Failed to generate narration speech.');
        return;
      }

      // Convert audio response stream into playable Blob URL
      let blob = await response.blob();
      
      // Determine if a character or cyber-bot effect should be applied
      const charType = activeVoice.labels?.character_type || (botMode === 'mode_cyber' ? 'robot' : null);
      if (charType) {
        try {
          blob = await applyCharacterEffect(blob, charType);
        } catch (effErr) {
          console.warn('Character effect failed, using base audio:', effErr);
        }
      }
      const audioUrl = URL.createObjectURL(blob);

      setCurrentAudioUrl(audioUrl);
      setCurrentAudioMetadata({
        voiceName: activeVoice.name,
        modelName: activeModel.name,
        textSnippet: text.trim().slice(0, 120) + (text.length > 120 ? '...' : '')
      });

      // Add to Narration History
      const newHistoryItem = {
        id: 'vox_' + Date.now(),
        text: text.trim(),
        voiceId: selectedVoiceId,
        voiceName: activeVoice.name,
        fontClass: activeVoice.font_class,
        modelId: selectedModelId,
        modelName: activeModel.name,
        audioUrl: audioUrl,
        timestamp: new Date().toISOString()
      };

      setHistory(prev => [newHistoryItem, ...prev.slice(0, 19)]);
      showToast('success', 'Voice Dubbed Successfully!', `High-fidelity audio created with ${activeVoice.name}.`);

    } catch (error) {
      console.error('Audio Generation Error:', error);
      showToast('error', 'Generation Error', 'Network error generating speech: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('voxai_custom_api_key', newKey);
    showToast('success', 'API Key Saved', 'ElevenLabs API Key has been updated.');
    fetchStatus();
    fetchVoices();
    fetchModels();
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('voxai_custom_api_key');
    setApiStatus(null);
    showToast('info', 'API Key Cleared', 'Switched to 100% Free Voice Synthesis Engine.');
    fetchVoices();
  };

  const handlePlayHistoryItem = (item) => {
    setCurrentAudioUrl(item.audioUrl);
    setCurrentAudioMetadata({
      voiceName: item.voiceName,
      modelName: item.modelName,
      textSnippet: item.text.slice(0, 120) + (item.text.length > 120 ? '...' : '')
    });
    showToast('info', 'Loaded Recording', `Playing recording from ${item.voiceName}.`);
  };

  const handleLoadHistoryText = (historyText) => {
    setText(historyText);
    showToast('info', 'Script Loaded', 'Loaded text into editor.');
  };

  const handleDeleteHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all narration history?')) {
      setHistory([]);
      showToast('info', 'History Cleared', 'All previous recordings removed.');
    }
  };

  const scrollToBots = () => {
    botSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07152d] bg-blue-white-mesh text-slate-100 flex flex-col font-sans selection:bg-sky-400 selection:text-blue-950">
      
      {/* Top Header in Radiant Blue & Crisp White */}
      <Header
        apiStatus={apiStatus}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onScrollToBots={scrollToBots}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-6">
        
        {/* Hero Section */}
        <Hero />

        {/* ======================================================== */}
        {/* NEW: AI RADIO BUTTON BOT COMMAND CENTER                   */}
        {/* ======================================================== */}
        <div ref={botSectionRef}>
          <BotRadioSelector
            selectedBotId={selectedBotId}
            onSelectBot={handleSelectBot}
            botMode={botMode}
            onChangeBotMode={setBotMode}
            botTone={botTone}
            onChangeBotTone={setBotTone}
            onLoadScript={handleLoadScript}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Character Voice Showcase Bar */}
        <div className="rounded-3xl p-4 glass-panel border border-blue-400/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-sky-400/30 flex items-center justify-center shrink-0 text-xl text-sky-300">
              <Sparkles className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <Bot className="w-3.5 h-3.5 text-sky-400" />
                  <span>Expressive Character Personalities</span>
                </h4>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30">
                  Custom Fonts
                </span>
              </div>
              <p className="text-xs text-blue-200/70 mt-0.5">
                Instant personalities with synced live typography and character acoustics:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => {
                setSelectedVoiceId('free_char_girl');
                setText("Hii, my name is Aanya, how are you?");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border transition-all flex items-center space-x-1.5 font-girl ${
                selectedVoiceId === 'free_char_girl'
                  ? 'bg-white text-blue-950 border-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-blue-900/40 hover:bg-blue-800 text-sky-100 border-blue-400/25'
              }`}
            >
              <span>👧 Aanya (Girl)</span>
            </button>

            <button
              onClick={() => {
                setSelectedVoiceId('free_char_boy');
                setText("Hi, I am Udit, how are you?");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border transition-all flex items-center space-x-1.5 font-boy ${
                selectedVoiceId === 'free_char_boy'
                  ? 'bg-white text-blue-950 border-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-blue-900/40 hover:bg-blue-800 text-sky-100 border-blue-400/25'
              }`}
            >
              <span>👦 Udit (Boy)</span>
            </button>

            <button
              onClick={() => {
                setSelectedVoiceId('free_char_robot');
                setText("System diagnostics online. I am Robo-X9. All vocal transmission circuits operational.");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 font-robot ${
                selectedVoiceId === 'free_char_robot'
                  ? 'bg-white text-blue-950 border-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-blue-900/40 hover:bg-blue-800 text-sky-100 border-blue-400/25'
              }`}
            >
              <span>🤖 Robo-X9</span>
            </button>

            <button
              onClick={() => {
                setSelectedVoiceId('free_char_cartoon');
                setText("Yay! Hey there, I am Pip the cartoon character! Let's have some awesome fun!");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 font-cartoon ${
                selectedVoiceId === 'free_char_cartoon'
                  ? 'bg-white text-blue-950 border-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-blue-900/40 hover:bg-blue-800 text-sky-100 border-blue-400/25'
              }`}
            >
              <span>🎭 Pip (Cartoon)</span>
            </button>
          </div>
        </div>

        {/* 2-Side Studio Layout: All Languages on Left, Voices Dubbing & Studio on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDE: ALL LANGUAGES DOCK (5 cols on lg)             */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <LanguageSelectorSide
              selectedVoiceId={selectedVoiceId}
              onSelectLanguage={handleSelectLanguage}
              onPlayPreview={handlePlayLanguagePreview}
              playingPreviewId={playingPreviewId}
            />

            {/* Quick Engine Settings */}
            <div className="glass-panel-blue rounded-3xl p-5 border border-blue-400/25 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-blue-400/20">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <span>Voice & Model Engine</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30">
                  Selectable
                </span>
              </div>

              {/* Voice Selector Dropdown */}
              <VoiceSelector
                voices={voices}
                selectedVoiceId={selectedVoiceId}
                onSelectVoice={setSelectedVoiceId}
                loading={voices.length === 0}
              />

              {/* Model Selector Dropdown */}
              <ModelSelector
                models={models}
                selectedModelId={selectedModelId}
                onSelectModel={setSelectedModelId}
                loading={models.length === 0}
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE: VOICES DUBBING & SPEECH STUDIO (7 cols on lg) */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Text Input Component */}
            <TextInputArea
              text={text}
              setText={setText}
              activeVoice={activeVoice}
              onClear={() => setText('')}
              onSelectVoice={setSelectedVoiceId}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
            />

            {/* PRIMARY VOICES DUBBING ACTION COMMAND CENTER */}
            <div className="glass-panel-glow rounded-3xl p-5 border border-blue-300/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
              
              {/* Luminous blue accent glow */}
              <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-blue-500/15 blur-2xl pointer-events-none rounded-full" />

              <div>
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center space-x-1.5">
                    <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                    <span>Studio Target:</span>
                  </span>
                  <span className={`text-xs text-blue-950 font-black px-2.5 py-0.5 rounded-lg bg-white border border-white shadow-sm ${activeVoice.font_class || ''}`}>
                    {activeVoice.name}
                  </span>
                  <span className="text-blue-400/50">•</span>
                  <span className="text-xs text-sky-200 font-mono">
                    {activeModel.name}
                  </span>
                </div>
                <p className="text-xs text-blue-200/80 mt-1">
                  Ready to dub script into high-fidelity neural audio.
                </p>
              </div>

              {/* EYE-CATCHING BLUE & WHITE DUBBING BUTTON */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !text.trim()}
                  className="w-full sm:w-auto btn-dubbing-glow px-8 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center space-x-2.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-wide"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-950" />
                      <span>Dubbing Audio...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-blue-900 text-blue-900" />
                      <span>DUB & GENERATE VOICE</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Advanced Audio Player */}
            <AudioPlayer
              audioUrl={currentAudioUrl}
              voiceName={currentAudioMetadata?.voiceName || activeVoice.name}
              fontClass={activeVoice?.font_class}
              modelName={currentAudioMetadata?.modelName || activeModel.name}
              textSnippet={currentAudioMetadata?.textSnippet}
              onRegenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {/* Voice Tuning Parameters */}
            <VoiceSettings
              settings={voiceSettings}
              onChange={setVoiceSettings}
              selectedModelId={selectedModelId}
            />

            {/* Dubbing & Narration History Panel */}
            <NarrationHistory
              history={history}
              onPlayItem={handlePlayHistoryItem}
              onLoadText={handleLoadHistoryText}
              onDeleteItem={handleDeleteHistoryItem}
              onClearHistory={handleClearAllHistory}
              currentPlayingId={null}
              isPlayingCurrent={false}
            />

          </div>

        </div>

      </main>

      {/* Footer in Blue & White Aesthetic */}
      <footer className="border-t border-blue-400/20 py-6 mt-12 bg-[#061226]/90 text-center text-xs text-blue-200/70">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-white">VOXAI DUBBING STUDIO</span>
            <span>•</span>
            <span className="text-sky-300">Blue & White Edition</span>
            <span>•</span>
            <span>Radio Bot Mode Active</span>
          </div>
          <div className="flex items-center space-x-4 text-blue-200/70">
            <span>Lossless WAV & MP3</span>
            <span>•</span>
            <span>Zero Subscription</span>
            <span>•</span>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="text-white hover:underline transition-colors font-semibold"
            >
              API Key Config
            </button>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentApiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        onClearApiKey={handleClearApiKey}
        apiStatus={apiStatus}
        onRefreshStatus={fetchStatus}
      />

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
