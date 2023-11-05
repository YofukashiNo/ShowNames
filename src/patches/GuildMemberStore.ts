import { PluginInjector } from "../index";
import { GuildMemberStore } from "../lib/requiredModules";
import ColorUtils from "../lib/ColorUtils";
import Types from "../types";
export default (): void => {
  PluginInjector.after(GuildMemberStore, "getMember", (_args, res: Types.GuildMember) => {
    ColorUtils.changeColor(res);
  });
};
