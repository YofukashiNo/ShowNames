import { common, components, util } from "replugged";
import { PluginLogger, sns } from "../index.jsx";
const { SwitchItem } = components;
const { React } = common;
import { defaultSettings } from "../lib/consts.jsx";
import { Slider } from "./Slider.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (sns.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    sns.set(key, value);
  }
};

export const Settings = () => {
  return (
    <div>
      <Slider
        {...{
          name: "Color Threshold",
          note: "The threshold at which the plugin should change colors. (Default: 70)",
          initialValue: sns.get("colorThreshold", defaultSettings.colorThreshold),
          minValue: 10,
          maxValue: 100,
          renderValue: (value) => `${value}%`,
          ...util.useSetting(sns, "colorThreshold"),
        }}></Slider>
      <Slider
        {...{
          name: "Change percentage",
          note: "The percentage to lighten/darken the color. (Default: 40)",
          initialValue: sns.get("percentage", defaultSettings.percentage),
          minValue: 10,
          maxValue: 100,
          renderValue: (value) => `${value}%`,
          ...util.useSetting(sns, "percentage"),
        }}></Slider>
      <SwitchItem
        note="Show someone's Nitro banner instead of USRBG banner if they have one."
        {...util.useSetting(sns, "shouldPatchRole")}>
        Role color
      </SwitchItem>
    </div>
  );
};
