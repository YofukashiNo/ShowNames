import { common, components, util } from "replugged";
import { PluginLogger, sns } from "../index.jsx";
const { SwitchItem } = components;
const { React } = common;
import { defaultSettings } from "../lib/consts.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (pss.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    pss.set(key, value);
  }
};

export const Settings = () => {
  return (
    <div>
      <SwitchItem
        note="Show someone's Nitro banner instead of USRBG banner if they have one."
        {...util.useSetting(sns, "shouldPatchRole")}>
        Role color
      </SwitchItem>
    </div>
  );
};
