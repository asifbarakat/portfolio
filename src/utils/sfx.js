import { useEffect, useState } from "react";
import { zzfx, ZZFX } from "zzfx";

/* Tactile zero-asset procedural microchip SFX via zzfx (enabled by default; unlocks cleanly on first gesture) */
let enabled = true;
const listeners = new Set();

const PRESETS = {
  unlock: [
    [0.55, 0.01, 523.25, 0.004, 0.025, 0.09, 1, 1.1, 0, 0, 261.63, 0.045, 0, 0, 0, 0, 0, 0.7],
  ],
  dock: [
    [0.42, 0.02, 660, 0.002, 0.012, 0.045, 1, 1.2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0.6],
  ],
  open: [
    [0.45, 0.01, 392, 0.003, 0.02, 0.07, 1, 1.1, 2.5, 0, 196, 0.03, 0, 0, 0, 0, 0, 0.7],
  ],
  close: [
    [0.4, 0.01, 440, 0.003, 0.015, 0.06, 1, 1.1, -3.5, 0, 0, 0, 0, 0, 0, 0, 0, 0.6],
  ],
  copy: [
    [0.48, 0.01, 587.33, 0.003, 0.02, 0.08, 0, 1.0, 0, 0, 293.66, 0.035, 0, 0, 0, 0, 0, 0.75],
  ],
  chip: [
    [0.32, 0.03, 740, 0.002, 0.008, 0.035, 0, 1.0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0.5],
  ],
  pluck: [
    [0.44, 0.04, 240, 0.002, 0.025, 0.14, 1, 0.85, -1.2, 0, 0, 0, 0, 0, 18, 0, 0, 0.65],
  ],
  shader: [
    [0.38, 0.02, 480, 0.002, 0.015, 0.06, 2, 1.4, -4, 0, 140, 0.02, 0, 0, 0, 0.15, 0, 0.5],
  ],
};

function ensureReady() {
  try {
    ZZFX.volume = 0.14;
    if (ZZFX.audioContext?.state === "suspended") {
      void ZZFX.audioContext.resume();
    }
  } catch {
    // WebAudio blocked or unsupported
  }
}

export function playSfx(name, force = false) {
  if (!enabled && !force) return;
  const spec = PRESETS[name];
  if (!spec) return;
  try {
    ensureReady();
    for (const params of spec) {
      zzfx(...params);
    }
  } catch {
    // Audio playback safely ignored if context unavailable
  }
}

export function toggleSfx() {
  enabled = !enabled;
  if (enabled) playSfx("unlock", true);
  listeners.forEach((cb) => cb(enabled));
  return enabled;
}

export function useSfx() {
  const [on, setOn] = useState(enabled);
  useEffect(() => {
    listeners.add(setOn);
    return () => {
      listeners.delete(setOn);
    };
  }, []);
  return [on, toggleSfx];
}
