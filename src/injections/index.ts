import Modules from "../lib/requiredModules";
import injectGuildMemberStore from "./GuildMemberStore";
import injectGuildStore from "./GuildStore";
import injectLoadedChannelMembers from "./LoadedChannelMembers";
export const applyInjections = (): void => {
  void Modules.loadModules();
  injectGuildMemberStore();
  injectGuildStore();
  injectLoadedChannelMembers();
};

export default { applyInjections };
