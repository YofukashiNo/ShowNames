import { webpack } from "replugged";
import * as Utils from "./utils";
import * as Types from "../types";

export const ThemeStore = webpack.getByStoreName<{ theme: string } & Types.Store>("ThemeStore");

export const GuildMemberStore = webpack.getByProps<Types.GuildMemberStore>("getMember");

export const ChannelMemberStore = webpack.getByStoreName("ChannelMemberStore");

export const GuildPrototype = webpack.getModule<Types.DefaultTypes.AnyFunction>((m) =>
  Utils.prototypeChecker(m?.exports, ["getRole", "getIconURL"]),
);
