# VoxAI — AI Text-to-Speech Studio

> State-of-the-art AI narration web application powered by **ElevenLabs Text-to-Speech API**. Convert any script, article, or story into studio-grade human narration with natural emotion, dynamic cadence, and realistic voice profiles.

---

## ✨ Features

- **Large Script & Text Input**
  - Live character counter (with visual 5,000-character gauge) and word counter.
  - Estimated spoken duration counter (`~150 WPM`).
  - Pre-loaded one-click sample scripts: *Movie Trailer*, *Tech Podcast*, *Guided Meditation*, *SaaS Pitch*, *Fantasy Audiobook*, and *Breaking News*.
  - Paste from clipboard, clear script, and keyboard shortcut (`Ctrl + Enter` / `Cmd + Enter`) to synthesize immediately.

- **Dynamic ElevenLabs Model Selection**
  - Connects dynamically to the ElevenLabs Models API.
  - Supports **Eleven Multilingual v2** (29+ languages, highest emotional range), **Eleven Flash v2.5** (ultra-low latency ~75ms), **Eleven Turbo v2.5** (balanced speed & quality), and **Eleven English v1**.
  - Displays latency indicators, capability badges, and supported languages.

- **Curated Voice Selection with Live Previews**
  - Browse ElevenLabs voice library (Rachel, Adam, Antoni, Bella, Arnold, Domi, Elli, Josh, Sam, George, Charlotte, Alice, etc.).
  - Search by voice name, accent, or style.
  - Category filters: *All*, *Female*, *Male*, *Narration*, *Conversational*, and *News*.
  - Inline voice audio preview player to listen to each voice's sample before generating.

- **Studio Voice Parameters**
  - **Stability**: Fine-tune expressive emotion vs. consistent delivery.
  - **Clarity + Similarity Boost**: Adjust fidelity to the original voice profile.
  - **Style Exaggeration**: Amplify dramatic acting (available on v2 models).
  - **Speaker Boost**: Enhance speaker clarity and presence.
  - One-click *Reset to Defaults* button.

- **Advanced Audio Player & Visualizer**
  - Real-time animated **Waveform Visualizer** driven by HTML5 Canvas and frequency data.
  - Interactive scrub bar with hover seeking and elapsed/total duration formatting (`MM:SS`).
  - Transport controls: Play, Pause, Resume, Stop, Rewind 5s (`-5s`), and Fast-Forward 5s (`+5s`).
  - Multi-speed playback pills (`0.75x`, `1x`, `1.25x`, `1.5x`, `2x`).
  - Volume slider and one-click mute toggle.

- **MP3 Download & Session Narration History**
  - Instant high-quality MP3 download with clean, descriptive filenames (`voxai-[voice]-[timestamp].mp3`).
  - Session history panel saved to `localStorage`.
  - Replay past narrations, reload scripts back into the editor with one click, and manage history.

- **Secure Backend Proxy & API Management**
  - Built-in Node.js + Express backend proxies all ElevenLabs API requests.
  - Your `ELEVENLABS_API_KEY` is kept safe on the server and is never exposed to the client bundle.
  - Built-in in-app **API Settings Modal** to input, verify, test, or update your API key in real-time.
  - Inspects user subscription tier, characters used, and total monthly limits.
  - Safe demo preview mode for testing player features and UI before entering an API key.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **pnpm** / **yarn**

### 2. Installation

Clone or open the project folder in your terminal:

```bash
cd "elevenlab project"
npm install
```

### 3. Configure ElevenLabs API Key

Create a `.env` file in the project root (or copy `.env.example`):

```bash
cp .env.example .env
```

Add your ElevenLabs API Key:

```env
ELEVENLABS_API_KEY=your_actual_elevenlabs_api_key_here
PORT=5000
```

> **Note**: You can also enter or update your API key directly inside the running web app by clicking the **API Settings** button in the top right corner.

### 4. Run the Application

Start both the backend server and frontend development server with a single command:

```bash
npm run dev
```

The application will be live at:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🛠️ Project Structure

```
├── server/
│   ├── index.js          # Express API server (proxies TTS, models, voices, key validation)
│   └── sampleVoices.js   # ElevenLabs models and curated voice fallbacks
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Top navigation bar with branding & API status
│   │   ├── Hero.jsx             # Hero section ("Give Your Words a Voice")
│   │   ├── TextInputArea.jsx    # Text editor, counters, presets, shortcuts
│   │   ├── ModelSelector.jsx    # Dynamic ElevenLabs model dropdown
│   │   ├── VoiceSelector.jsx    # Voice picker with category chips and preview
│   │   ├── VoiceSettings.jsx    # Voice sliders (Stability, Similarity, Style, Boost)
│   │   ├── AudioPlayer.jsx      # Canvas waveform visualizer, scrubber, speed controls
│   │   ├── NarrationHistory.jsx # Session narration history with instant replay & download
│   │   ├── ApiKeyModal.jsx      # Secure API key verification & quota modal
│   │   └── Toast.jsx            # Floating status notification alerts
│   ├── App.jsx           # Main Studio page assembling all components
│   ├── index.css         # Glassmorphism, neon glow tokens, and animations
│   └── main.jsx          # React 19 entry point
├── index.html            # HTML shell with Google Fonts
├── vite.config.mjs       # Vite configuration with proxy to backend
├── tailwind.config.js    # Custom dark palette, brand colors, and animations
└── package.json          # Scripts and project dependencies
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | Checks ElevenLabs connection status and retrieves subscription info |
| `POST` | `/api/validate-key` | Validates a candidate ElevenLabs API key |
| `GET` | `/api/models` | Fetches available ElevenLabs TTS models |
| `GET` | `/api/voices` | Fetches voices with metadata and preview samples |
| `POST` | `/api/generate` | Generates streaming speech audio for the provided text, voice, and settings |
| `GET` | `/api/demo-audio` | Delivers instant preview audio for voice testing |

---

## 🛡️ Security Best Practices

1. **Server-Side API Calls**: All calls to `api.elevenlabs.io` are dispatched exclusively from the Express backend (`server/index.js`).
2. **Key Masking**: API keys are masked with password inputs and never printed in client console logs.
3. **Local Storage / Env Separation**: Users can either supply their key in the `.env` file or in the in-app modal (stored only in their local browser session).

---

## 📜 License

MIT License. Designed with modern web standards and ElevenLabs AI.
# Elevenlabs
