import Modules from "../lib/requiredModules";
import ColorUtils from "../lib/ColorUtils";
export default (): void => {
  const ChannelMemerListCache = Modules.ChannelMemberStore.getState();
  const channelLists = Object.values(ChannelMemerListCache._guildLists);
  const LoadedMembersCache = channelLists
    .map((m) => Object.values(m))
    .flat(1)
    .map((m) => Object.values(m.members))
    .flat(1);
  for (const member of LoadedMembersCache) {
    ColorUtils.changeColor(member);
  }
};
