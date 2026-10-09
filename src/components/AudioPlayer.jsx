import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Download, 
  Volume2, 
  VolumeX, 
  FastForward, 
  Rewind, 
  Sparkles,
  RefreshCw,
  Share2,
  Check,
  Headphones,
  Radio,
  Sliders,
  Music,
  Activity
} from 'lucide-react';

export default function AudioPlayer({ 
  audioUrl, 
  voiceName, 
  fontClass,
  modelName, 
  textSnippet, 
  onRegenerate,
  isGenerating
}) {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setupWebAudio();
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSkip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + seconds), duration);
    setCurrentTime(audio.currentTime);
  };

  const handleSpeedChange = (rate) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVol = parseFloat(e.target.value);
    audio.volume = newVol;
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    audio.muted = newMuteState;
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement('a');
    link.href = audioUrl;
    const cleanVoice = (voiceName || 'voice').toLowerCase().replace(/\s+/g, '-');
    link.download = `voxai-${cleanVoice}-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const setupWebAudio = () => {
    if (audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;

      const audio = audioRef.current;
      if (audio) {
        try {
          const source = audioCtx.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioCtx.destination);
          sourceRef.current = source;
        } catch (e) {
          // Fallback if already connected
        }
      }

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderWaveform = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const numBars = 50;
      const barWidth = Math.floor(width / numBars) - 2;
      let barHeights = [];

      if (isPlaying && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        for (let i = 0; i < numBars; i++) {
          const index = Math.floor((i / numBars) * bufferLength);
          const val = dataArray[index] || 0;
          barHeights.push((val / 255) * (height - 8) + 4);
        }
      } else {
        const progress = duration > 0 ? currentTime / duration : 0;
        const time = Date.now() * 0.003;

        for (let i = 0; i < numBars; i++) {
          if (isPlaying) {
            const wave = Math.sin(time + i * 0.3) * 0.35 + 0.65;
            barHeights.push(wave * (height - 12) + 6);
          } else {
            const wave = Math.sin(i * 0.25) * 0.2 + 0.35;
            barHeights.push(wave * (height - 18) + 6);
          }
        }
      }

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + 2);
        const barH = Math.max(4, barHeights[i] || 4);
        const y = (height - barH) / 2;

        const progress = duration > 0 ? currentTime / duration : 0;
        const isPassed = i / numBars <= progress;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barH);
        if (isPassed) {
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.5, '#38bdf8');
          gradient.addColorStop(1, '#2563eb');
        } else {
          gradient.addColorStop(0, 'rgba(147, 197, 253, 0.35)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, [3, 3, 3, 3]);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentTime, duration]);

  if (!audioUrl) {
    return (
      <div className="glass-panel-blue rounded-3xl p-7 text-center border border-blue-400/25 relative overflow-hidden shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-sky-400/30 flex items-center justify-center mx-auto mb-3 text-sky-400">
          <Headphones className="w-6 h-6 text-sky-300" />
        </div>
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center justify-center space-x-1.5">
          <span>Studio Audio Player Standby</span>
        </h3>
        <p className="text-xs text-blue-200/70 max-w-sm mx-auto mt-1">
          Select a language or radio bot persona above, then click Dub & Generate Voice to stream studio audio.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel-glow rounded-3xl p-5 sm:p-6 relative border border-blue-300/30 overflow-hidden shadow-2xl">
      
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        crossOrigin="anonymous"
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-blue-400/20">
        <div>
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center space-x-1">
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>Synthesized Stream</span>
            </span>
            <span className="text-xs text-blue-300/40">•</span>
            <span className={`text-xs font-bold text-sky-200 ${fontClass || ''}`}>
              Voice: {voiceName}
            </span>
            {modelName && (
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-200 border border-blue-400/30">
                {modelName}
              </span>
            )}
          </div>
          {textSnippet && (
            <p className="text-xs text-blue-200/80 italic mt-1 line-clamp-1">
              "{textSnippet}"
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-900/60 hover:bg-blue-800 text-sky-200 hover:text-white border border-blue-400/30 transition-all disabled:opacity-50"
            title="Regenerate speech"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-sky-300 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-extrabold bg-white hover:bg-sky-50 text-blue-950 shadow-md shadow-white/20 transition-all active:scale-95"
            title="Download high-quality MP3 audio"
          >
            <Download className="w-3.5 h-3.5 text-blue-700" />
            <span>Download MP3</span>
          </button>
        </div>
      </div>

      {/* Real-time Animated Waveform Visualizer */}
      <div className="relative w-full h-20 bg-[#08152c] rounded-2xl border border-blue-400/25 p-2 flex items-center justify-center overflow-hidden mb-4 shadow-inner">
        <canvas
          ref={canvasRef}
          width={650}
          height={80}
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.04] via-sky-400/[0.06] to-blue-500/[0.04] pointer-events-none" />
      </div>

      {/* Scrub Bar & Timestamps */}
      <div className="space-y-1 mb-4">
        <div className="relative">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.01"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>
        <div className="flex justify-between text-xs font-mono text-blue-200/80">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls Bar: Playback, Speed, Volume */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        
        {/* Transport Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSkip(-5)}
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-900/50 hover:bg-blue-800 text-sky-200 border border-blue-400/25 transition-all"
            title="Rewind 5s"
          >
            <Rewind className="w-4 h-4" />
          </button>

          {/* Primary Play/Pause Button in Crisp White & Blue */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white hover:bg-sky-50 text-blue-900 shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all active:scale-95 border border-white"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-blue-900 text-blue-900" />
            ) : (
              <Play className="w-5 h-5 fill-blue-900 text-blue-900 ml-0.5" />
            )}
          </button>

          <button
            onClick={() => handleSkip(5)}
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-900/50 hover:bg-blue-800 text-sky-200 border border-blue-400/25 transition-all"
            title="Forward 5s"
          >
            <FastForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleStop}
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-900/50 hover:bg-blue-800 text-sky-200 border border-blue-400/25 transition-all"
            title="Stop playback"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Switcher */}
        <div className="flex items-center space-x-1 bg-blue-950/70 p-1 rounded-xl border border-blue-400/20 text-xs font-mono">
          {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
            <button
              key={rate}
              onClick={() => handleSpeedChange(rate)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                playbackRate === rate
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-blue-200/70 hover:text-white'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="text-sky-300 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-sky-400 h-1.5"
          />
        </div>

      </div>

    </div>
  );
}
