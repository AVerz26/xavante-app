// soundEngine.js - 100% Offline Audio & Voice Engine
// Suporta reprodução de arquivos MP3 reais, Síntese de Voz Humana (Web Speech API)
// e Efeitos Sonoros gamificados (Web Audio API)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('xavante_sound_muted') === 'true';
    this.cachedVoices = [];
    this.initVoices();
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initVoices() {
    if ('speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('xavante_sound_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // --- REPRODUÇÃO DE VOZ HUMANA / PRONÚNCIA ---
  // Tenta reproduzir arquivo de áudio real (.mp3); caso não exista, usa síntese de voz (TTS) adaptada
  async playWord(wordId, wordText, ttsHint = '', slow = false) {
    if (this.muted) return;

    // 1. Tenta carregar arquivo de áudio real em public/audio/{wordId}.mp3
    try {
      const audioUrl = `/audio/${wordId}.mp3`;
      const testAudio = new Audio(audioUrl);
      testAudio.playbackRate = slow ? 0.75 : 1.0;
      
      const playPromise = testAudio.play();
      if (playPromise !== undefined) {
        await playPromise;
        return; // Reproduziu áudio gravado com sucesso!
      }
    } catch (e) {
      // Se não houver arquivo MP3, prossegue para síntese de voz humana
    }

    // 2. Síntese de Voz Humana Nativa (Web Speech API) - Funciona 100% Offline
    this.speakWord(wordText, ttsHint, slow);
  }

  speakWord(wordText, ttsHint = '', slow = false) {
    if (this.muted) return;
    if (!('speechSynthesis' in window)) {
      this.playPhoneticVoice(2, 320); // Fallback sintetizador
      return;
    }

    // Cancela falas anteriores para resposta imediata
    window.speechSynthesis.cancel();

    // Se houver texto adaptado para fonética Xavante, usa ele; senão adapta o texto original
    let textToSpeak = ttsHint || wordText;
    
    // Tratamento fonético para motores de fala em Português:
    // - O apóstrofo (saltillo / parada glotal) vira pausa curta
    textToSpeak = textToSpeak.replace(/(\w+)'(\w+)/g, '$1, $2');
    // - O 'ö' central fecha em som de 'õ' ou 'e'
    textToSpeak = textToSpeak.replace(/ö/gi, 'õ');
    // - Limpa pontuações de pergunta no meio
    textToSpeak = textToSpeak.replace(/\?/g, '');

    const utterance = new SpeechSynthesisUtterance(textToSpeak.trim());
    utterance.lang = 'pt-BR';
    utterance.rate = slow ? 0.65 : 0.85; // Velocidade ideal para aprendizagem
    utterance.pitch = 1.05;

    // Seleciona a melhor voz disponível em português
    if (this.cachedVoices.length === 0 && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }

    const ptVoice = this.cachedVoices.find(v => 
      (v.lang === 'pt-BR' || v.lang.startsWith('pt')) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Luciana') || v.name.includes('Maria'))
    ) || this.cachedVoices.find(v => v.lang === 'pt-BR' || v.lang.startsWith('pt'));

    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  // --- EFEITOS SONOROS GAMIFICADOS (WEB AUDIO API) ---
  playTap() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  playTilePop(pitch = 520) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.25, now + 0.07);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + idx * 0.07;
      const duration = 0.22;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.01, start);
      gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.02);
    });
  }

  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [220, 185];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + idx * 0.12;
      const duration = 0.18;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, start);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, start);

      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.02);
    });
  }

  playPairMatch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(698.46, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chord = [
      { f: 523.25, t: 0.0, d: 0.15 },
      { f: 659.25, t: 0.12, d: 0.15 },
      { f: 783.99, t: 0.24, d: 0.18 },
      { f: 1046.5, t: 0.40, d: 0.60 },
      { f: 1318.51, t: 0.40, d: 0.60 }
    ];

    chord.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + item.t;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, start);

      gain.gain.setValueAtTime(0.01, start);
      gain.gain.linearRampToValueAtTime(0.28, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, start + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + item.d + 0.05);
    });
  }

  playPhoneticVoice(syllableCount = 2, pitchBase = 280) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < syllableCount; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const start = now + i * 0.22;
      const duration = 0.18;
      const pitch = pitchBase + (i % 2 === 0 ? 30 : -20);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, start);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(850, start);
      filter.Q.setValueAtTime(4.0, start);

      gain.gain.setValueAtTime(0.01, start);
      gain.gain.linearRampToValueAtTime(0.35, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.01, start + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + duration + 0.02);
    }
  }
}

export const sounds = new SoundEngine();
