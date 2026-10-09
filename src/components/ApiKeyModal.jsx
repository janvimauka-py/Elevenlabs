import React, { useState } from 'react';
import { 
  Key, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Loader2, 
  Trash2,
  Lock,
  Zap,
  Bot
} from 'lucide-react';

export default function ApiKeyModal({ 
  isOpen, 
  onClose, 
  currentApiKey, 
  onSaveApiKey, 
  onClearApiKey, 
  apiStatus, 
  onRefreshStatus 
}) {
  const [apiKeyInput, setApiKeyInput] = useState(currentApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  if (!isOpen) return null;

  const handleValidateAndSave = async (e) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setValidationResult({ valid: false, message: 'Please enter a valid ElevenLabs API key.' });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const res = await fetch('/api/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKeyInput.trim() })
      });

      const data = await res.json();
      if (res.ok && data.valid) {
        setValidationResult({
          valid: true,
          message: 'Key successfully validated!',
          subscription: data.subscription
        });
        onSaveApiKey(apiKeyInput.trim());
        setTimeout(() => {
          onRefreshStatus?.();
        }, 500);
      } else {
        setValidationResult({
          valid: false,
          message: data.error || 'Failed to validate API key with ElevenLabs.'
        });
      }
    } catch (err) {
      setValidationResult({
        valid: false,
        message: 'Network error validating key: ' + err.message
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setApiKeyInput('');
    setValidationResult(null);
    onClearApiKey();
  };

  const subscription = apiStatus?.subscription;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-3xl glass-panel-glow border border-blue-400/40 p-6 shadow-2xl shadow-blue-950/80 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-400/20 mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Studio Settings & API Key
              </h3>
              <p className="text-xs text-blue-200/70">
                Configure ElevenLabs credentials or use 100% Free Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-300 hover:text-white p-1.5 rounded-xl hover:bg-blue-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Connection Status Box */}
        <div className={`p-4 rounded-2xl border mb-5 ${
          apiStatus?.authenticated
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
            : 'bg-blue-900/30 border-blue-400/30 text-sky-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {apiStatus?.authenticated ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Zap className="w-4 h-4 text-sky-400 shrink-0" />
              )}
              <span className="text-xs font-bold text-white">
                {apiStatus?.authenticated 
                  ? 'Connected to ElevenLabs API' 
                  : 'Free Neural Engine Mode Active'}
              </span>
            </div>
            {subscription?.tier && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-mono">
                {subscription.tier} Tier
              </span>
            )}
          </div>

          {subscription && (
            <div className="mt-3 pt-2.5 border-t border-emerald-500/20 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Characters Used</span>
                <span className="font-mono font-semibold text-slate-100">
                  {subscription.characterCount?.toLocaleString() || 0}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Total Monthly Limit</span>
                <span className="font-mono font-semibold text-slate-100">
                  {subscription.characterLimit?.toLocaleString() || 'Unlimited'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* API Key Form */}
        <form onSubmit={handleValidateAndSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-blue-200 mb-1.5">
              ElevenLabs API Key (`xi-api-key`)
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk_..."
                className="w-full bg-[#081733] border border-blue-400/30 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-blue-300/40 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {apiKeyInput && !apiKeyInput.startsWith('sk_') && apiKeyInput.length > 40 && (
              <div className="mt-2 p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-[11px] leading-relaxed flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-amber-100">Secret key format note</span>
                  ElevenLabs API keys start with <strong>`sk_`</strong>.
                </div>
              </div>
            )}
            <p className="text-[11px] text-blue-300/70 mt-1.5 flex items-center justify-between">
              <span>Keys are saved in local storage or backend .env</span>
              <a
                href="https://elevenlabs.io/app/settings/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 hover:text-white inline-flex items-center space-x-1 font-semibold"
              >
                <span>Get API Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {validationResult && (
            <div className={`p-3 rounded-xl text-xs border ${
              validationResult.valid
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                : 'bg-red-500/15 border-red-500/40 text-red-200'
            }`}>
              {validationResult.message}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {currentApiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center space-x-1.5 text-xs text-red-300 hover:text-red-200 px-3 py-2 rounded-xl hover:bg-red-950/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Key</span>
              </button>
            ) : <div />}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-blue-200 hover:text-white hover:bg-blue-900/40 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isValidating || !apiKeyInput.trim()}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-sky-50 text-blue-950 shadow-md shadow-white/20 transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-95"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Save & Connect</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
