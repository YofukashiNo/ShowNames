import { common, components, util } from "replugged";
import { PluginLogger, SettingValues } from "../index.jsx";
const { SwitchItem } = components;
const { React } = common;
import { defaultSettings } from "../lib/consts.jsx";
import { SliderItem } from "./Slider.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (SettingValues.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    SettingValues.set(key, value);
  }
};

export const Settings = () => {
  return (
    <div>
      <SliderItem
        {...{
          title: "Color Threshold",
          note: "The threshold at which the plugin should change colors. (Default: 70)",
          initialValue: SettingValues.get("colorThreshold", defaultSettings.colorThreshold),
          minValue: 10,
          maxValue: 100,
          renderValue: (value) => `${value}%`,
          ...util.useSetting(SettingValues, "colorThreshold"),
        }}
      />
      <SliderItem
        {...{
          title: "Change percentage",
          note: "The percentage to lighten/darken the color. (Default: 40)",
          initialValue: SettingValues.get("percentage", defaultSettings.percentage),
          minValue: 10,
          maxValue: 100,
          renderValue: (value) => `${value}%`,
          ...util.useSetting(SettingValues, "percentage"),
        }}
      />
      <SwitchItem
        note="Show someone's Nitro banner instead of USRBG banner if they have one."
        {...util.useSetting(SettingValues, "shouldPatchRole")}>
        Role color
      </SwitchItem>
    </div>
  );
};
