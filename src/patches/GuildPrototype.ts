import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { GuildPrototype } from "../lib/requiredModules";
import * as ColorUtils from "../lib/ColorUtils";
import * as Types from "../types";
export const patchGuildPrototype = (): void => {
  PluginInjector.after(GuildPrototype.prototype, "getRole", (_args, res: Types.Role) => {
    if (!SettingValues.get("shouldPatchRole", defaultSettings.shouldPatchRole)) return res;
    ColorUtils.changeColor(res);
    return res;
  });
};
