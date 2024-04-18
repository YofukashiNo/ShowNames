import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = (): void => {
  Modules.ThemeStore ??= webpack.getByStoreName<Types.ThemeStore>("ThemeStore");
  Modules.GuildMemberStore ??= webpack.getByStoreName<Types.GuildMemberStore>("GuildMemberStore");
  Modules.ChannelMemberStore ??=
    webpack.getByStoreName<Types.ChannelMemberStore>("ChannelMemberStore");
  Modules.GuildStore ??= webpack.getByStoreName<Types.GuildStore>("GuildStore");
};

export default Modules;
