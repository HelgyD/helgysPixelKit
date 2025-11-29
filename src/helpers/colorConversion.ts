export function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number = 0,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function adjustShade(color: string, adjustment: number): string {
  const match = color.match(/\w\w/g)?.map((c) => parseInt(c, 16)) || [0, 0, 0];
  let [r = 0, g = 0, b = 0] = match;
  let [h, s, l] = rgbToHsl(r, g, b);
  l = Math.min(Math.max(l + adjustment, 0), 1); // Keep within [0, 1]
  s = Math.min(Math.max(s + adjustment, 0), 1);
  const [newR, newG, newB] = hslToRgb(h / 360, s, l);
  return `rgb(${newR}, ${newG}, ${newB})`;
}

export function adjustLuminance(color: string, adjustment: number): string {
  const match = color.match(/\w\w/g)?.map((c) => parseInt(c, 16)) || [0, 0, 0];
  let [r = 0, g = 0, b = 0] = match;
  let [h, s, l] = rgbToHsl(r, g, b);
  l = Math.min(Math.max(l + adjustment, 0), 1); // Keep within [0, 1]
  s = Math.min(Math.max(s, 0), 1);
  const [newR, newG, newB] = hslToRgb(h / 360, s, l);
  return `rgb(${newR}, ${newG}, ${newB})`;
}
