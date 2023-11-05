import patchGuildMemberStore from "./GuildMemberStore";
import patchGuildPrototype from "./GuildPrototype";
import patchLoadedChannelMembers from "./LoadedChannelMembers";
export default (): void => {
  patchGuildMemberStore();
  patchGuildPrototype();
  patchLoadedChannelMembers();
};
