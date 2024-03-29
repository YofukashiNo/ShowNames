import { util } from "replugged";
import { SliderItem, SwitchItem } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};

export const Settings = (): React.ReactElement => (
  <div>
    <SliderItem
      note="The threshold at which the plugin should change colors. (Default: 30)"
      initialValue={SettingValues.get("colorThreshold", defaultSettings.colorThreshold)}
      minValue={10}
      maxValue={100}
      onValueRender={(value) => `${value}%`}
      {...util.useSetting(SettingValues, "colorThreshold", defaultSettings.colorThreshold)}>
      Color Threshold
    </SliderItem>
    <SliderItem
      note="The percentage to lighten/darken the color. (Default: 40)"
      initialValue={SettingValues.get("percentage", defaultSettings.percentage)}
      minValue={10}
      maxValue={100}
      onValueRender={(value) => `${value}%`}
      {...util.useSetting(SettingValues, "percentage", defaultSettings.percentage)}>
      Change percentage
    </SliderItem>
    <SwitchItem
      note="Whether to change the role color. Normally the member color gets patched directly. (It is recommended to keep this turned off, as it may cause performance issues.)"
      {...util.useSetting(SettingValues, "shouldPatchRole", defaultSettings.shouldPatchRole)}>
      Role color
    </SwitchItem>
  </div>
);
