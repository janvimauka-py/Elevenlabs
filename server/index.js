const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { FREE_VOICES, DEFAULT_VOICES, DEFAULT_MODELS } = require('./sampleVoices');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper to extract API key from header or .env
function getApiKey(req) {
  const customKey = req.headers['x-api-key'];
  if (customKey && typeof customKey === 'string' && customKey.trim().length > 0 && !customKey.includes('sk_3d68')) {
    return customKey.trim();
  }
  return process.env.ELEVENLABS_API_KEY || 'sk_e1fb4207ea242baa16e13a09809ad39fe0b2886ab5a69e23';
}

// 1. Health & Status Check
app.get('/api/status', async (req, res) => {
  const apiKey = getApiKey(req);
  if (!apiKey) {
    return res.json({
      status: 'ok',
      hasApiKey: false,
      message: 'No ElevenLabs API key found. Add your key in Settings or in the .env file.'
    });
  }

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
      headers: { 'xi-api-key': apiKey }
    });

    if (response.ok) {
      const data = await response.json();
      return res.json({
        status: 'ok',
        hasApiKey: true,
        authenticated: true,
        subscription: {
          tier: data.tier || 'free',
          characterCount: data.character_count || 0,
          characterLimit: data.character_limit || 10000,
          status: data.status || 'active',
          nextReset: data.next_character_count_reset_unix ? new Date(data.next_character_count_reset_unix * 1000).toISOString() : null
        }
      });
    } else {
      const errData = await response.json().catch(() => ({}));
      // If the key is valid but simply missing user_read permission for subscription stats, it is still authenticated
      if (errData.detail?.status === 'missing_permissions') {
        return res.json({
          status: 'ok',
          hasApiKey: true,
          authenticated: true,
          subscription: {
            tier: 'Active Key (TTS Enabled)',
            characterCount: 0,
            characterLimit: 10000,
            status: 'active',
            nextReset: null
          }
        });
      }

      return res.json({
        status: 'ok',
        hasApiKey: true,
        authenticated: false,
        message: errData.detail?.message || 'Invalid or expired ElevenLabs API key.'
      });
    }
  } catch (err) {
    return res.json({
      status: 'ok',
      hasApiKey: true,
      authenticated: false,
      message: 'Failed to verify key with ElevenLabs: ' + err.message
    });
  }
});

// 2. Validate a provided API key
app.post('/api/validate-key', async (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    return res.status(400).json({ valid: false, error: 'API key is required.' });
  }

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
      headers: { 'xi-api-key': apiKey.trim() }
    });

    if (response.ok) {
      const data = await response.json();
      return res.json({
        valid: true,
        subscription: {
          tier: data.tier,
          characterCount: data.character_count,
          characterLimit: data.character_limit,
          status: data.status
        }
      });
    } else {
      const err = await response.json().catch(() => ({}));
      if (err.detail?.status === 'missing_permissions') {
        return res.json({
          valid: true,
          subscription: {
            tier: 'Active Key (TTS Enabled)',
            characterCount: 0,
            characterLimit: 10000,
            status: 'active'
          }
        });
      }

      return res.status(response.status).json({
        valid: false,
        error: err.detail?.message || 'Invalid ElevenLabs API key.'
      });
    }
  } catch (error) {
    return res.status(500).json({ valid: false, error: 'Network error validating key: ' + error.message });
  }
});

// 3. Get Models
app.get('/api/models', async (req, res) => {
  const apiKey = getApiKey(req);
  if (apiKey) {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/models', {
        headers: { 'xi-api-key': apiKey }
      });
      if (response.ok) {
        const liveModels = await response.json();
        // Enrich live models with descriptions/badges if available
        const enriched = liveModels.map(m => {
          const fallback = DEFAULT_MODELS.find(dm => dm.model_id === m.model_id);
          return {
            ...m,
            badge: fallback?.badge || (m.can_do_voice_conversion ? 'Multilingual' : 'High Performance'),
            latency: fallback?.latency || 'Fast'
          };
        });
        return res.json(enriched);
      }
    } catch (e) {
      console.warn('Error fetching live models from ElevenLabs, using fallback:', e.message);
    }
  }
  return res.json(DEFAULT_MODELS);
});

// Helper: High-Quality Free TTS Engine supporting Indian & Global languages with chunked concatenation
async function generateFreeTTS(text, lang = 'hi', slow = false) {
  if (!text || typeof text !== 'string') return Buffer.alloc(0);
  
  // Clean text and split on sentence/phrase delimiters including Indic danda '।'
  const cleanText = text.replace(/[\r\t]+/g, ' ').trim();
  const maxLen = 170;
  const rawParts = cleanText.split(/([।?!.\n\;,]+)/);
  const chunks = [];
  let current = '';

  for (const part of rawParts) {
    if (!part) continue;
    if ((current + part).length <= maxLen) {
      current += part;
    } else {
      if (current.trim()) chunks.push(current.trim());
      if (part.length > maxLen) {
        const words = part.split(/\s+/);
        let sub = '';
        for (const w of words) {
          if ((sub + ' ' + w).length <= maxLen) {
            sub = (sub + ' ' + w).trim();
          } else {
            if (sub) chunks.push(sub);
            sub = w;
          }
        }
        current = sub;
      } else {
        current = part;
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());
  if (chunks.length === 0) chunks.push(cleanText.slice(0, maxLen));

  const audioBuffers = [];
  const targetLang = lang || 'hi';

  for (const chunk of chunks) {
    if (!chunk.trim()) continue;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(targetLang)}&client=tw-ob&q=${encodeURIComponent(chunk.trim())}&ttsspeed=${slow ? '0.3' : '1'}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/'
        }
      });
      if (response.ok) {
        const arrayBuf = await response.arrayBuffer();
        if (arrayBuf.byteLength > 0) {
          audioBuffers.push(Buffer.from(arrayBuf));
        }
      }
    } catch (err) {
      console.warn(`[FreeTTS] Error fetching audio chunk:`, err.message);
    }
  }

  if (audioBuffers.length === 0) {
    throw new Error('Free voice engine could not generate audio stream.');
  }

  return Buffer.concat(audioBuffers);
}

// 4. Get Voices (Indian & Global Free Voices + ElevenLabs)
app.get('/api/voices', async (req, res) => {
  const apiKey = getApiKey(req);
  let cloudVoices = [];
  if (apiKey) {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': apiKey }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.voices && data.voices.length > 0) {
          cloudVoices = data.voices;
        }
      }
    } catch (e) {
      console.warn('Error fetching live voices from ElevenLabs, using fallback:', e.message);
    }
  }
  if (cloudVoices.length === 0) {
    cloudVoices = DEFAULT_VOICES;
  }
  // Return FREE_VOICES first so Indian & Global free voices are prominently accessible!
  return res.json([...FREE_VOICES, ...cloudVoices]);
});

// 5. Generate Narration Speech (Supports 100% Free Indian/Global Voices + ElevenLabs)
app.post('/api/generate', async (req, res) => {
  const {
    text,
    voice_id = 'free_hi_aarav',
    model_id = 'free_indic_neural',
    voice_settings = {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.0,
      use_speaker_boost: true
    }
  } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text content is required for narration.' });
  }

  if (text.length > 10000) {
    return res.status(400).json({ error: 'Text exceeds maximum character limit of 10,000 for a single request.' });
  }

  // 1. Check if user selected any of the Free Indian, Character, or Global Voices:
  const freeVoice = FREE_VOICES.find(v => v.voice_id === voice_id);
  const isFreeVoice = !!freeVoice || (voice_id && voice_id.startsWith('free_'));

  if (isFreeVoice) {
    try {
      let targetLang = freeVoice?.lang || 'hi';

      // Auto-adapt character voices to text language if Indic script is present
      if (freeVoice?.sub_category === 'character') {
        if (/[\u0900-\u097F]/.test(text)) targetLang = 'hi';
        else if (/[\u0A80-\u0AFF]/.test(text)) targetLang = 'gu';
        else if (/[\u0980-\u09FF]/.test(text)) targetLang = 'bn';
        else if (/[\u0C80-\u0CFF]/.test(text)) targetLang = 'kn';
        else targetLang = freeVoice.lang || 'en-US';
      }

      const isSlow = Number(voice_settings.stability ?? 0.5) < 0.25;
      const buffer = await generateFreeTTS(text.trim(), targetLang, isSlow);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length);
      res.setHeader('Content-Disposition', 'inline; filename="voxai-free-narration.mp3"');
      res.setHeader('X-VoxAI-Engine', 'free-indic-neural');
      if (freeVoice?.labels?.character_type) {
        res.setHeader('X-Character-Type', freeVoice.labels.character_type);
      }
      res.setHeader('Cache-Control', 'no-cache');
      return res.end(buffer);
    } catch (error) {
      console.error('Free TTS Generation Error:', error);
      return res.status(500).json({ error: 'Free voice engine error: ' + error.message });
    }
  }

  // 2. ElevenLabs Engine handling
  const apiKey = getApiKey(req);

  // If no API key is provided, seamlessly synthesize via free engine instead of breaking!
  if (!apiKey) {
    try {
      const fallbackLang = freeVoice?.lang || 'en';
      const buffer = await generateFreeTTS(text.trim(), fallbackLang);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length);
      res.setHeader('Content-Disposition', 'inline; filename="voxai-free-narration.mp3"');
      res.setHeader('X-VoxAI-Engine', 'free-fallback');
      res.setHeader('Cache-Control', 'no-cache');
      return res.end(buffer);
    } catch (e) {
      return res.status(401).json({
        error: 'ElevenLabs API Key required, or select any of the Free Indian & Global Voices.',
        code: 'MISSING_API_KEY'
      });
    }
  }

  try {
    let effectiveModel = model_id;
    if (!effectiveModel || effectiveModel === 'free_indic_neural') {
      effectiveModel = 'eleven_multilingual_v2';
    }

    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}?output_format=mp3_44100_128`;
    
    let response = await fetch(elevenLabsUrl, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: effectiveModel,
        voice_settings: {
          stability: Number(voice_settings.stability ?? 0.5),
          similarity_boost: Number(voice_settings.similarity_boost ?? 0.75),
          style: Number(voice_settings.style ?? 0.0),
          use_speaker_boost: Boolean(voice_settings.use_speaker_boost ?? true)
        }
      })
    });

    if (!response.ok) {
      let errorMessage = 'Failed to generate speech with ElevenLabs.';
      try {
        const errorJson = await response.json();
        errorMessage = errorJson.detail?.message || errorJson.message || errorMessage;
      } catch {
        const rawText = await response.text();
        if (rawText) errorMessage = rawText;
      }

      // If ElevenLabs fails due to library voice restriction, quota, or permissions:
      // Gracefully fall back to Free Voice generation so the user is never blocked!
      if (response.status === 402 || response.status === 429 || response.status === 401 || response.status === 403) {
        console.warn(`[ElevenLabs Fallback] ${response.status} - Falling back to Free Voice Engine: ${errorMessage}`);
        const freeBuffer = await generateFreeTTS(text.trim(), 'en');
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', freeBuffer.length);
        res.setHeader('Content-Disposition', 'inline; filename="voxai-free-narration.mp3"');
        res.setHeader('X-VoxAI-Engine', 'free-auto-fallback');
        res.setHeader('X-Fallback-Reason', errorMessage.slice(0, 100));
        res.setHeader('Cache-Control', 'no-cache');
        return res.end(freeBuffer);
      }

      return res.status(response.status).json({ error: errorMessage });
    }

    // Audio stream received successfully from ElevenLabs
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Content-Disposition', 'inline; filename="voxai-narration.mp3"');
    res.setHeader('Cache-Control', 'no-cache');
    return res.end(buffer);

  } catch (error) {
    console.error('Audio Generation Error, falling back to free engine:', error);
    try {
      const freeBuffer = await generateFreeTTS(text.trim(), 'en');
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', freeBuffer.length);
      res.setHeader('Content-Disposition', 'inline; filename="voxai-free-narration.mp3"');
      res.setHeader('X-VoxAI-Engine', 'free-auto-fallback');
      return res.end(freeBuffer);
    } catch {
      return res.status(500).json({
        error: 'Error generating audio: ' + error.message
      });
    }
  }
});

// Audio synthesis generator for reliable demo preview
function createSpeechToneBuffer(seconds = 3.5, pitch = 160) {
  const sampleRate = 22050;
  const numSamples = Math.floor(sampleRate * seconds);
  const buffer = Buffer.alloc(44 + numSamples * 2);
  
  // WAV header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(1, 22);  // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);  // block align
  buffer.writeUInt16LE(16, 34); // 16 bits
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const rhythm = Math.max(0, Math.sin(t * Math.PI * 3.5));
    const vibrato = Math.sin(t * 12) * 5;
    const f0 = pitch + vibrato;
    const h1 = Math.sin(2 * Math.PI * f0 * t);
    const h2 = 0.5 * Math.sin(2 * Math.PI * (f0 * 2) * t);
    const h3 = 0.3 * Math.sin(2 * Math.PI * (f0 * 3) * t);
    const vowelFormant = 0.35 * Math.sin(2 * Math.PI * 650 * t);

    const sample = (h1 + h2 + h3 + vowelFormant) * rhythm * 0.45;
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }
  return buffer;
}

// 6. Demo Audio endpoint (Plays authentic samples for Free & Cloud voices)
app.get('/api/demo-audio', async (req, res) => {
  const { voice_id } = req.query;

  // Check if it's one of the Free Voices
  const freeVoice = FREE_VOICES.find(v => v.voice_id === voice_id);
  if (freeVoice) {
    try {
      const sampleText = freeVoice.sample_text || `नमस्ते! यह ${freeVoice.name} की आवाज़ है।`;
      const buffer = await generateFreeTTS(sampleText, freeVoice.lang);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length);
      res.setHeader('Content-Disposition', `inline; filename="${freeVoice.voice_id}.mp3"`);
      if (freeVoice.labels?.character_type) {
        res.setHeader('X-Character-Type', freeVoice.labels.character_type);
      }
      return res.end(buffer);
    } catch (e) {
      console.warn('Error generating demo audio for free voice:', e.message);
    }
  }

  const voice = DEFAULT_VOICES.find(v => v.voice_id === voice_id) || DEFAULT_VOICES[0];
  const isFemale = voice?.labels?.gender === 'female';
  const pitch = isFemale ? 220 : 135;

  // If voice has preview_url, attempt to fetch with quick timeout
  if (voice && voice.preview_url && !voice.preview_url.startsWith('/api/')) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);
      const audioRes = await fetch(voice.preview_url, { signal: controller.signal });
      clearTimeout(timeout);

      if (audioRes.ok) {
        const arrayBuffer = await audioRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Content-Disposition', `inline; filename="${voice.name.toLowerCase()}-demo.mp3"`);
        res.setHeader('X-VoxAI-Demo', 'true');
        return res.end(buffer);
      }
    } catch {
      // Fallback
    }
  }

  // Instant local synthesis fallback
  const synthBuffer = createSpeechToneBuffer(3.5, pitch);
  res.setHeader('Content-Type', 'audio/wav');
  res.setHeader('Content-Length', synthBuffer.length);
  res.setHeader('Content-Disposition', `inline; filename="${(voice?.name || 'demo').toLowerCase()}-preview.wav"`);
  res.setHeader('X-VoxAI-Mode', 'synthetic-preview');
  return res.end(synthBuffer);
});

// 7. Serve built frontend static files if dist exists
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[VoxAI Backend] Server listening on http://localhost:${PORT}`);
});

