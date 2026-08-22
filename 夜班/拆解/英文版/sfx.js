const SFX = (() => {
  let ctx = null;
  let muted = false;
  let rainEl = null;
  let lastThunder = 0;

  // Mixkit preview loops, Mixkit License
  const RAIN_SRC = "assets/audio-01.mp3";
  const THUNDER_SRC = {
    far: "assets/audio-02.mp3",
    mid: "assets/audio-03.mp3",
    near: "assets/audio-04.mp3",
  };

  function ac() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function env(g, t, a = 0.01, h = 0.08, r = 0.2) {
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(1, t + a);
    g.gain.linearRampToValueAtTime(0.7, t + a + h);
    g.gain.exponentialRampToValueAtTime(0.001, t + a + h + r);
  }

  function beep(freq, dur = 0.12, type = "sine", gain = 0.05) {
    if (muted) return;
    const c = ac();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = 0;
    o.connect(g).connect(c.destination);
    const t = c.currentTime;
    env(g, t, 0.01, dur * 0.3, dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  function chime() {
    beep(784, 0.12, "triangle", 0.012);
    setTimeout(() => beep(1175, 0.16, "triangle", 0.01), 90);
  }

  function register() {
    beep(880, 0.04, "sine", 0.008);
    setTimeout(() => beep(660, 0.06, "sine", 0.006), 60);
  }

  function knock() {
    beep(90, 0.1, "sine", 0.02);
    setTimeout(() => beep(70, 0.12, "sine", 0.016), 140);
  }

  function sms() {
    beep(1200, 0.05, "sine", 0.008);
    setTimeout(() => beep(1400, 0.06, "sine", 0.007), 80);
  }

  function startAmbience() {
    if (muted) return;
    ac();
    if (!rainEl) {
      rainEl = new Audio(RAIN_SRC);
      rainEl.loop = true;
      rainEl.preload = "auto";
      Object.values(THUNDER_SRC).forEach((src) => { const a = new Audio(src); a.preload = "auto"; });
    }
    rainEl.volume = 0.38;
    const p = rainEl.play();
    if (p && p.catch) p.catch(() => {});
  }

  function stopAmbience() {
    if (rainEl) {
      rainEl.pause();
      rainEl.currentTime = 0;
    }
  }

  function thunder(kind) {
    if (muted) return;
    const now = Date.now();
    if (now - lastThunder < 1400) return;
    lastThunder = now;
    ac();
    const src = THUNDER_SRC.far;
    const el = new Audio(src);
    el.volume = kind === "far" ? 0.12 : kind === "near" ? 0.22 : 0.16;
    const p = el.play();
    if (p && p.catch) p.catch(() => {});
  }

  function setMuted(v) {
    muted = v;
    if (muted) stopAmbience();
    else startAmbience();
  }

  return { chime, register, knock, sms, thunder, startAmbience, stopAmbience, setMuted, get muted() { return muted; }, unlock: ac };
})();