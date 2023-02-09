import { webpack as Webpack } from "replugged";
import * as Utils from "./utils.jsx";

export const ThemeStore = Webpack.getByProps("theme");

export const GuildMemberStore = Webpack.getByProps("getMember");

const ChannelMemberStoreModule = Webpack.getModule(
  (m) =>
    Utils.isObject(m?.exports) &&
    Object.values(m?.exports).some((n) => n?.getProps?.toString?.().includes("groups")),
);
const ChannelMemberStoreModuleKey = Object.keys(ChannelMemberStoreModule).find((FunctionKey) =>
  ChannelMemberStoreModule[FunctionKey]?.getProps?.toString()?.includes("groups"),
);
export const { [ChannelMemberStoreModuleKey]: ChannelMemberStore } = ChannelMemberStoreModule;

export const GuildPrototype = Webpack.getModule((m) =>
  Utils.prototypeChecker(m?.exports, ["getRole", "getIconURL"]),
);
