// Random integer generator
export const ri = (a, b) => Math.floor(Math.random() * (b - a)) + a;

// Random IP generator
export const rip = () =>
  `${ri(1, 255)}.${ri(0, 255)}.${ri(0, 255)}.${ri(1, 254)}`;

// Current time string
export const ts = () => new Date().toTimeString().slice(0, 8);

// Format seconds to HH:MM:SS
export const fmt = (s) =>
  `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(
    Math.floor((s % 3600) / 60)
  ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// Password strength calculator
export const calcStrength = (p) => {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  if (p.length >= 14) s++;
  return s;
};
