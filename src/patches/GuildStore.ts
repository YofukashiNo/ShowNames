import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { GuildStore } from "../lib/requiredModules";
import ColorUtils from "../lib/ColorUtils";
import Types from "../types";
export default (): void => {
  PluginInjector.after(GuildStore, "getRole", (_args, res: Types.Role) => {
    if (!SettingValues.get("shouldPatchRole", defaultSettings.shouldPatchRole)) return res;
    ColorUtils.changeColor(res);
    return res;
  });
};
