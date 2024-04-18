import Modules from "../lib/requiredModules";
import patchGuildMemberStore from "./GuildMemberStore";
import patchGuildStore from "./GuildStore";
import patchLoadedChannelMembers from "./LoadedChannelMembers";
export const applyInjections = (): void => {
  void Modules.loadModules();
  patchGuildMemberStore();
  patchGuildStore();
  patchLoadedChannelMembers();
};

export default { applyInjections };
