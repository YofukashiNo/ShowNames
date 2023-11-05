import { webpack } from "replugged";
import Types from "../types";

export const ThemeStore = webpack.getByStoreName<{ theme: string } & Types.Store>("ThemeStore");

export const GuildMemberStore = webpack.getByStoreName<Types.GuildMemberStore>("GuildMemberStore");

export const ChannelMemberStore =
  webpack.getByStoreName<Types.ChannelMemberStore>("ChannelMemberStore");

export const GuildPrototype = webpack.getBySource<Types.DefaultTypes.AnyFunction>(
  "this.publicUpdatesChannelId",
);
