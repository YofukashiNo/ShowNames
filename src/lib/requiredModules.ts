import { webpack } from "replugged";
import * as Utils from "./utils";
import * as Types from "../types";

export const ThemeStore = webpack.getByProps<{ theme: string }>("theme");

export const GuildMemberStore = webpack.getByProps<Types.GuildMemberStore>("getMember");

const ChannelMemberStoreModule = webpack.getBySource("ChannelMemberStore");

export const ChannelMemberStore = webpack.getExportsForProps<Types.ChannelMemberStore>(
  ChannelMemberStoreModule,
  ["getProps", "initialize", "__getLocalVars"],
);

export const GuildPrototype = webpack.getModule<Types.DefaultTypes.AnyFunction>((m) =>
  Utils.prototypeChecker(m?.exports, ["getRole", "getIconURL"]),
);
