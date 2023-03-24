import { patchGuildMemberStore } from "./GuildMemberStore";
import { patchGuildPrototype } from "./GuildPrototype";
import { patchLoadedChannelMembers } from "./LoadedChannelMembers";
export const applyInjections = (): void => {
  patchGuildMemberStore();
  patchGuildPrototype();
  patchLoadedChannelMembers();
};
