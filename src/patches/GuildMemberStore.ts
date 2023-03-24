import { PluginInjector } from "../index";
import { GuildMemberStore } from "../lib/requiredModules";
import * as ColorUtils from "../lib/ColorUtils";
import * as Types from "../types";
export const patchGuildMemberStore = (): void => {
  PluginInjector.after(GuildMemberStore, "getMember", (_args, res: Types.GuildMember) => {
    ColorUtils.changeColor(res);
  });
};
