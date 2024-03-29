import { webpack } from "replugged";
import Types from "../types";

export const ThemeStore = webpack.getByStoreName<Types.ThemeStore>("ThemeStore");

export const GuildMemberStore = webpack.getByStoreName<Types.GuildMemberStore>("GuildMemberStore");

export const ChannelMemberStore =
  webpack.getByStoreName<Types.ChannelMemberStore>("ChannelMemberStore");

export const GuildStore = webpack.getByStoreName<Types.GuildStore>("GuildStore");
