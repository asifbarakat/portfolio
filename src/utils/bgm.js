import { useEffect, useState } from "react";
import * as TinyMusic from "tinymusic";
import { ZZFX } from "zzfx";

/* Open-source MIT procedural futuristic synth engine (TinyMusic + swept LPF + stereo delay DSP) */
const BPM = 94;

// D minor / Dorian cyber-nocturne (all 4 layers share exact 16-beat cycle length)
const BASS_NOTES = [
  "D2 h", "D2 e", "F2 e", "A2 q",
  "Bb1 h", "Bb1 e", "D2 e", "F2 q",
  "G1 h", "G1 e", "Bb1 e", "D2 q",
  "A1 h", "A1 e", "C2 e", "E2 q",
];

const PAD_NOTES = [
  "A3 h", "F3 h",
  "F3 h", "D3 h",
  "D3 h", "G3 h",
  "E3 h", "A3 h",
];

const ARP_NOTES = [
  "D4 e", "A4 e", "E5 e", "F5 e", "A4 e", "E5 e", "D5 e", "A4 e",
  "Bb3 e", "F4 e", "A4 e", "D5 e", "F4 e", "A4 e", "C5 e", "F4 e",
  "G3 e", "D4 e", "A4 e", "Bb4 e", "D4 e", "F4 e", "D5 e", "A4 e",
  "A3 e", "E4 e", "G4 e", "C5 e", "E4 e", "G4 e", "B4 e", "- e",
];

const BELL_NOTES = [
  "- w",
  "- h", "A5 q", "F5 q",
  "D5 w",
  "- h", "E5 q", "- q",
];

let playing = true; // default ON; starts immediately or upon first browser interaction gesture
let engine = null;
let armed = false;
const listeners = new Set();

function resolveSeqCtor() {
  return TinyMusic.Sequence || TinyMusic.default?.Sequence;
}

function createSynthEngine() {
  const ac = ZZFX.audioContext || new AudioContext();
  if (ac.state === "suspended") {
    void ac.resume();
  }

  const Sequence = resolveSeqCtor();
  if (!Sequence) {
    throw new Error("TinyMusic.Sequence unavailable");
  }

  // Master bus + analyzer for live UI spectrum bars
  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, ac.currentTime);
  master.gain.exponentialRampToValueAtTime(0.32, ac.currentTime + 0.6);

  const analyser = ac.createAnalyser();
  analyser.fftSize = 32;
  analyser.smoothingTimeConstant = 0.78;
  master.connect(analyser);
  master.connect(ac.destination);

  // Analog-style swept low-pass filter
  const lpf = ac.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = 820;
  lpf.Q.value = 2.2;
  lpf.connect(master);

  const lfo = ac.createOscillator();
  const lfoDepth = ac.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 0.065;
  lfoDepth.gain.value = 420;
  lfo.connect(lfoDepth);
  lfoDepth.connect(lpf.frequency);
  lfo.start();

  // Ambient damped stereo delay bus
  const delay = ac.createDelay(1.0);
  delay.delayTime.value = (60 / BPM) * 0.75;

  const damp = ac.createBiquadFilter();
  damp.type = "lowpass";
  damp.frequency.value = 1750;

  const feedback = ac.createGain();
  feedback.gain.value = 0.36;

  const wet = ac.createGain();
  wet.gain.value = 0.38;

  delay.connect(damp);
  damp.connect(feedback);
  feedback.connect(delay);
  damp.connect(wet);
  wet.connect(master);

  // Build synchronized sequences
  const bass = new Sequence(ac, BPM, BASS_NOTES);
  bass.createCustomWave([0, 1, 0.28, 0.1, 0.04]);
  bass.smoothing = 0.16;
  bass.staccato = 0.06;
  bass.gain.gain.value = 0.19;
  bass.treble.disconnect();
  bass.treble.connect(lpf);

  const pad = new Sequence(ac, BPM, PAD_NOTES);
  pad.createCustomWave([0, 0.85, 0.14, 0.42, 0.05, 0.16]);
  pad.smoothing = 0.48;
  pad.staccato = 0.02;
  pad.gain.gain.value = 0.11;
  pad.treble.disconnect();
  pad.treble.connect(lpf);
  pad.treble.connect(delay);

  const arp = new Sequence(ac, BPM, ARP_NOTES);
  arp.waveType = "triangle";
  arp.staccato = 0.42;
  arp.gain.gain.value = 0.075;
  arp.treble.disconnect();
  arp.treble.connect(lpf);
  arp.treble.connect(delay);

  const bell = new Sequence(ac, BPM, BELL_NOTES);
  bell.waveType = "sine";
  bell.staccato = 0.55;
  bell.gain.gain.value = 0.07;
  bell.treble.disconnect();
  bell.treble.connect(delay);
  bell.treble.connect(master);

  const startAt = ac.currentTime + 0.06;
  bass.play(startAt);
  pad.play(startAt);
  arp.play(startAt);
  bell.play(startAt);

  return { ac, master, analyser, lfo, lpf, delay, damp, sequences: [bass, pad, arp, bell] };
}

function stopEngine() {
  if (!engine) return;
  const cur = engine;
  engine = null;
  try {
    const now = cur.ac.currentTime;
    cur.master.gain.cancelScheduledValues(now);
    cur.master.gain.setValueAtTime(Math.max(0.0001, cur.master.gain.value), now);
    cur.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    setTimeout(() => {
      cur.sequences.forEach((s) => s.stop());
      try {
        cur.lfo.stop();
        cur.lfo.disconnect();
        cur.lpf.disconnect();
        cur.delay.disconnect();
        cur.damp.disconnect();
      } catch {
        // already stopped
      }
      cur.master.disconnect();
    }, 240);
  } catch {
    cur.sequences.forEach((s) => s.stop());
  }
}

function disarmUnlock() {
  if (!armed || typeof window === "undefined") return;
  armed = false;
  window.removeEventListener("pointerdown", onFirstGesture, true);
  window.removeEventListener("keydown", onFirstGesture, true);
}

function onFirstGesture(e) {
  // If user directly clicked the BGM mute button, toggleBgm stops playback instead of auto-starting
  if (e?.target?.closest?.('[data-bgm-toggle="true"]')) {
    disarmUnlock();
    return;
  }
  disarmUnlock();
  if (playing && !engine) {
    try {
      engine = createSynthEngine();
    } catch {
      playing = false;
      listeners.forEach((cb) => cb(playing));
    }
  }
}

export function armDefaultBgm() {
  if (!playing || engine || typeof window === "undefined") return;
  const ac = ZZFX.audioContext;
  if (ac && ac.state === "running") {
    try {
      engine = createSynthEngine();
      return;
    } catch {
      // fall through to gesture arm
    }
  }
  if (armed) return;
  armed = true;
  window.addEventListener("pointerdown", onFirstGesture, true);
  window.addEventListener("keydown", onFirstGesture, true);
}

export function getBgmAnalyser() {
  return engine?.analyser || null;
}

export function toggleBgm() {
  disarmUnlock();
  if (playing) {
    playing = false;
    stopEngine();
  } else {
    try {
      engine = createSynthEngine();
      playing = true;
    } catch {
      playing = false;
    }
  }
  listeners.forEach((cb) => cb(playing));
  return playing;
}

export function useBgm() {
  const [on, setOn] = useState(playing);
  useEffect(() => {
    listeners.add(setOn);
    armDefaultBgm();
    return () => {
      listeners.delete(setOn);
    };
  }, []);
  return [on, toggleBgm];
}
