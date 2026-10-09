// Client-side Web Audio DSP for Cartoon, Girl, Boy, and Robot voices
// 100% Free, zero external libraries, runs entirely offline in hardware-accelerated Web Audio

export function audioBufferToWav(buffer) {
  const numOfChan = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numSamples = buffer.length;
  const byteRate = sampleRate * numOfChan * 2;
  const blockAlign = numOfChan * 2;
  const dataSize = numSamples * blockAlign;
  const bufferSize = 44 + dataSize;
  
  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);

  function writeString(offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF Chunk Descriptor
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');

  // "fmt " sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true);  // AudioFormat (1 for PCM)
  view.setUint16(22, numOfChan, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // BitsPerSample (16 bits)

  // "data" sub-chunk
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Write interleaved PCM audio samples
  let offset = 44;
  const channels = [];
  for (let c = 0; c < numOfChan; c++) {
    channels.push(buffer.getChannelData(c));
  }

  for (let i = 0; i < numSamples; i++) {
    for (let c = 0; c < numOfChan; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      const intSample = sample < 0 ? sample * 32768 : sample * 32767;
      view.setInt16(offset, intSample | 0, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: 'audio/wav' });
}

export async function applyCharacterEffect(blob, characterType) {
  if (!characterType || characterType === 'none') return blob;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return blob;

  const audioCtx = new AudioContextClass();
  let audioBuffer;

  try {
    const arrayBuffer = await blob.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.warn('[AudioEffects] Failed to decode audio for character effect:', err);
    await audioCtx.close();
    return blob;
  }

  // Effect Modulation Parameters
  let speedRate = 1.0;
  const isRobot = characterType === 'robot';

  if (characterType === 'cartoon') {
    speedRate = 1.34; // Squeaky, bouncy chipmunk/cartoon pitch
  } else if (characterType === 'girl') {
    speedRate = 1.20; // High-pitched, sweet and bubbly little girl voice
  } else if (characterType === 'boy') {
    speedRate = 1.10; // Playful, energetic young boy voice
  } else if (characterType === 'robot') {
    speedRate = 0.95; // Steady, robotic cadence
  }

  const outSampleRate = audioBuffer.sampleRate;
  const newLength = Math.max(1, Math.round(audioBuffer.length / speedRate));
  
  const offlineCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
    audioBuffer.numberOfChannels,
    newLength,
    outSampleRate
  );

  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.playbackRate.value = speedRate;

  if (isRobot) {
    // 1. Robot Ring Modulation: Carrier frequency at 54Hz for metallic android texture
    const carrier = offlineCtx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = 54;

    const ringModGain = offlineCtx.createGain();
    ringModGain.gain.value = 0.0;

    // Carrier oscillator drives gain between -1 and +1
    carrier.connect(ringModGain.gain);
    source.connect(ringModGain);

    // 2. Bandpass filter for metallic robotic resonance
    const bandpass = offlineCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1350;
    bandpass.Q.value = 2.8;

    // 3. High-peaking metallic presence
    const peak = offlineCtx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.value = 2600;
    peak.gain.value = 9;

    ringModGain.connect(bandpass);
    bandpass.connect(peak);
    peak.connect(offlineCtx.destination);

    carrier.start(0);
  } else if (characterType === 'cartoon') {
    // Bright high-shelf boost for cartoon brilliance
    const highShelf = offlineCtx.createBiquadFilter();
    highShelf.type = 'highshelf';
    highShelf.frequency.value = 2400;
    highShelf.gain.value = 6;

    source.connect(highShelf);
    highShelf.connect(offlineCtx.destination);
  } else if (characterType === 'girl') {
    // Sweet, melodic clarity filter
    const peak = offlineCtx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.value = 3200;
    peak.gain.value = 4.5;

    source.connect(peak);
    peak.connect(offlineCtx.destination);
  } else if (characterType === 'boy') {
    // Punchy midrange for adventurous boy hero
    const peak = offlineCtx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.value = 1750;
    peak.gain.value = 3.5;

    source.connect(peak);
    peak.connect(offlineCtx.destination);
  } else {
    source.connect(offlineCtx.destination);
  }

  source.start(0);

  try {
    const renderedBuffer = await offlineCtx.startRendering();
    await audioCtx.close();
    return audioBufferToWav(renderedBuffer);
  } catch (err) {
    console.warn('[AudioEffects] Failed offline rendering:', err);
    await audioCtx.close();
    return blob;
  }
}
