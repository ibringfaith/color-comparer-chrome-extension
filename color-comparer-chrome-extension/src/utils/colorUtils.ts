// Convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
    return null;
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (rgbVal: number) => {
      const hex = rgbVal.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Parse RGB string to RGB object
export function parseRgb(rgb: string): { r: number; g: number; b: number } | null {
  const match = rgb.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (!match) return null;

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10)
  };
}

// Calculate difference between two colors (Euclidean distance in RGB space)
export function calculateColorDifference(
  colorX: { r: number; g: number; b: number },
  colorY: { r: number; g: number; b: number }
): number {
  const rDiff = colorX.r - colorY.r;
  const gDiff = colorX.g - colorY.g;
  const bDiff = colorX.b - colorY.b;

  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}