import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "./consts";
import { ThemeStore } from "./requiredModules";

export const rgba2hex = (rgba: string): string =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", ""),
    )
    .join("")}`;
export const hexToDecimal = (hex: string): number => {
  return parseInt(hex.replace(/^#/, ""), 16);
};
export const getBackgroundColor = (): string => {
  const getBody = document.getElementsByTagName("body")[0];
  const prop = window.getComputedStyle(getBody).getPropertyValue("background-color");
  if (prop === "transparent") {
    PluginLogger.error("Transparent background detected. Contact the developer for help!");
  }
  return rgba2hex(prop);
};
export const lightenDarkenColor = (color: string, amount: number): string =>
  `#${color
    .replace(/^#/, "")
    .replace(/../g, (color) =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)}`.substr(-2),
    )}`;
export const makeColorVisible = (color: string, precent: number): string => {
  const { theme } = ThemeStore;
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
export const changeColor = (item): void => {
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
  rgba2hex,
  hexToDecimal,
  lightenDarkenColor,
  makeColorVisible,
  getDifference,
  changeColor,
};
