import { ChannelMemberStore } from "../lib/requiredModules";
import * as ColorUtils from "../lib/ColorUtils";
export const patchLoadedChannelMembers = (): void => {
  const ChannelMemerListCache = ChannelMemberStore.__getLocalVars();
  const channelLists = Object.values(ChannelMemerListCache.memberLists._guildLists);
  const LoadedMembersCache = channelLists
    .map((m) => Object.values(m))
    .flat(1)
    .map((m) => Object.values(m.members))
    .flat(1);
  for (const member of LoadedMembersCache) {
    ColorUtils.changeColor(member);
  }
};
