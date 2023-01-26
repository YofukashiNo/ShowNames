import { Injector, Logger, settings } from "replugged";
import { ChannelMemberStore, GuildMemberStore, GuildPrototype } from "./lib/requiredModules.jsx";
import { defaultSettings } from "./lib/consts.jsx";
import * as ColorUtils from "./lib/ColorUtils.jsx";
const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ShowNames");
export const sns = await settings.init("Tharki.ShowNames", defaultSettings);
const changeColor = (item) => {
  if (!item?.colorString) return;
  const backgroundColor = ColorUtils.getBackgroundColor();
  const difference = ColorUtils.getDifference(backgroundColor, item.colorString);

  if (difference > sns.get("colorThreshold", defaultSettings.colorThreshold)) return;
  const changePercent = Math.floor(
    ((sns.get("percentage", defaultSettings.percentage) - difference) / 100) * 255,
  );
  item.colorString = ColorUtils.makeColorVisible(item.colorString, changePercent);
};
const patchLoadedChannelMembers = () => {
  const ChannelMemerListCache = ChannelMemberStore.__getLocalVars();
  const channelLists = Object.values(ChannelMemerListCache.memberLists._guildLists);
  const LoadedMembersCache = channelLists
    .map((m) => Object.values(m))
    .flat(1)
    .map((m) => Object.values(m.members))
    .flat(1);
  for (const member of LoadedMembersCache) {
    changeColor(member);
  }
};

const applyInjections = () => {
  PluginInjector.after(GuildMemberStore, "getMember", (args, res) => {
    changeColor(res);
  });
  if (sns.get("shouldPatchRole", defaultSettings.shouldPatchRole))
    PluginInjector.after(GuildPrototype.prototype, "getRole", (args, res) => {
      changeColor(res);
    });
  patchLoadedChannelMembers();
};
export const start = () => {
  applyInjections();
};

export const stop = () => {
  PluginInjector.uninjectAll();
};
export { Settings } from "./Components/Settings.jsx";
