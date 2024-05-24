import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "./consts";
import Modules from "./requiredModules";
import Types from "../types";

const _backgroundColorCache = {
  timeFetched: Date.now(),
  color: null,
};

export const oklabToLinearRGB = (L: number, a: number, b: number): [number, number, number] => {
  const M = L - a * 0.3963377774 - b * 0.2158037573;
  const S = L - a * 0.1055613458 - b * 0.0638541728;
  return [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
};

export const colorToHex = (color: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.style.color = color;
  document.body.appendChild(tempDiv);
  const computedColor = window.getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);

  const rgbaMatch = computedColor.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*(?:\.\d+)?))?\)$/,
  );
  if (rgbaMatch)
    return `#${rgbaMatch
      .slice(1)
      .map((n, i) =>
        (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
          .toString(16)
          .padStart(2, "0")
          .replace("NaN", ""),
      )
      .join("")}`;

  const oklabMatch = computedColor.match(
    /^oklab\((-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\)$/,
  );
  if (oklabMatch) {
    const [L, a, b] = [
      parseFloat(oklabMatch[1]),
      parseFloat(oklabMatch[3]),
      parseFloat(oklabMatch[5]),
    ];
    const [R, G, B] = oklabToLinearRGB(L, a, b);
    return `#${[R, G, B]
      .map((c) => Math.round(c * 255))
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")}`;
  }

  return "#000000";
};

export const hexToDecimal = (hex: string): number => {
  return parseInt(hex.replace(/^#/, ""), 16);
};

export const getBackgroundColor = (): string => {
  const color = window.getComputedStyle(document.body).getPropertyValue("background-color");
  if (color === "transparent") {
    PluginLogger.error("Transparent background detected. Contact the developer for help!");
    return "#000000000";
  }
  if (
    Date.now() - _backgroundColorCache.timeFetched > 1000 * 60 * 1.5 ||
    !_backgroundColorCache.color
  ) {
    _backgroundColorCache.color = colorToHex(color);
    _backgroundColorCache.timeFetched = Date.now();
  }
  return _backgroundColorCache.color;
};

export const lightenDarkenColor = (color: string, amount: number): string =>
  `#${color
    .replace(/^#/, "")
    .replace(/../g, (color) =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)}`.substr(-2),
    )}`;
export const makeColorVisible = (color: string, precent: number): string => {
  const { theme } = Modules.ThemeStore;
  switch (theme) {
    case "light":
      return lightenDarkenColor(color, -precent);
    case "dark":
      return lightenDarkenColor(color, precent);
    default:
      PluginLogger.error("Unknown theme detected. Contact the developer for help!");
  }
};
export const getDifference = (color1: string, color2: string): number => {
  if (!color1 && !color2) {
    PluginLogger.error("Colors to change or background color not provided.");
    return;
  }
  color1 = color1.substring(1, 7);
  color2 = color2.substring(1, 7);
  const r1 = parseInt(color1.substring(0, 2), 16);
  const g1 = parseInt(color1.substring(2, 4), 16);
  const b1 = parseInt(color1.substring(4, 6), 16);
  const R2 = parseInt(color2.substring(0, 2), 16);
  const G2 = parseInt(color2.substring(2, 4), 16);
  const B2 = parseInt(color2.substring(4, 6), 16);
  const p1 = (r1 / 255) * 100;
  const p2 = (g1 / 255) * 100;
  const p3 = (b1 / 255) * 100;
  const perc1 = Math.round((p1 + p2 + p3) / 3);
  const P1 = (R2 / 255) * 100;
  const P2 = (G2 / 255) * 100;
  const P3 = (B2 / 255) * 100;
  const PREC2 = Math.round((P1 + P2 + P3) / 3);
  return Math.abs(perc1 - PREC2);
};
export const changeColor = (item: Types.GuildMember | Types.Role): void => {
  if (!item?.colorString) {
    return;
  }
  const backgroundColor = getBackgroundColor(),
    difference = getDifference(backgroundColor, item.colorString);

  if (difference > SettingValues.get("colorThreshold", defaultSettings.colorThreshold)) {
    return;
  }
  const changePercent = Math.floor(
    ((SettingValues.get("percentage", defaultSettings.percentage) - difference) / 100) * 255,
  );
  const visiblifiedColor = makeColorVisible(item.colorString, changePercent);
  item.colorString = visiblifiedColor;
  item.color = hexToDecimal(visiblifiedColor);
};

export default {
  oklabToLinearRGB,
  colorToHex,
  hexToDecimal,
  lightenDarkenColor,
  makeColorVisible,
  getDifference,
  changeColor,
};
