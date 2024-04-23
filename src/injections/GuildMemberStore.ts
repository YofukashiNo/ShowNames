import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import ColorUtils from "../lib/ColorUtils";
import Types from "../types";
export default (): void => {
  PluginInjector.after(Modules.GuildMemberStore, "getMember", (_args, res: Types.GuildMember) => {
    ColorUtils.changeColor(res);
    return res;
  });
};
