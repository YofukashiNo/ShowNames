import patchGuildMemberStore from "./GuildMemberStore";
import patchGuildStore from "./GuildStore";
import patchLoadedChannelMembers from "./LoadedChannelMembers";
export const applyInjections = (): void => {
  patchGuildMemberStore();
  patchGuildStore();
  patchLoadedChannelMembers();
};

export default { applyInjections };
