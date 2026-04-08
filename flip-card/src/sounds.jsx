const play = (freq, type = "sine", duration = 0.15) => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.type = type; o.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(0.3, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  o.start(); o.stop(ctx.currentTime + duration);
};

export const soundFlip  = () => play(440, "sine", 0.1);
export const soundMatch = () => { play(520, "sine", 0.15); setTimeout(() => play(660, "sine", 0.2), 100); };
export const soundWin   = () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => play(f, "sine", 0.3), i * 120));
export const soundLose  = () => { play(300, "sawtooth", 0.3); setTimeout(() => play(200, "sawtooth", 0.4), 200); };