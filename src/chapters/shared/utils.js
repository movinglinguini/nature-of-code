function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

function isInInterval(val, start, end) {
  return (val >= start && val <= end);
}

function random(min=0, max=1, randomFunc = Math.random) {
  return (randomFunc() * (max - min + 1)) + min;
}