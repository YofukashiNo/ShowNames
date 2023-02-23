import { webpack } from "replugged";
import * as Utils from "./utils";
import * as Types from "../types";

export const ThemeStore = webpack.getByProps("theme");

export const GuildMemberStore = webpack.getByProps(
  "getMember",
) as unknown as Types.GuildMemberStore;

const ChannelMemberStoreModule = webpack.getBySource("ChannelMemberStore");

export const ChannelMemberStore = webpack.getExportsForProps(ChannelMemberStoreModule, [
  "getProps",
  "initialize",
  "__getLocalVars",
]) as unknown as Types.ChannelMemberStore;

export const GuildPrototype = webpack.getModule((m) =>
  Utils.prototypeChecker(m?.exports, ["getRole", "getIconURL"]),
) as unknown as Types.DefaultTypes.AnyFunction;
