export function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

export function isInInterval(val, start, end) {
  return (val >= start && val <= end);
}

export function random(min=0, max=1, randomFunc = Math.random) {
  return (randomFunc() * (max - min + 1)) + min;
}

export function degToRad(deg) {
  return (Math.PI * deg) / 180; 
}

export function radToDeg(rad) {
  return (180 * deg) / Math.PI
}