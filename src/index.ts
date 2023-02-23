import { Injector, Logger, settings } from "replugged";
import { ChannelMemberStore, GuildMemberStore, GuildPrototype } from "./lib/requiredModules";
import { defaultSettings } from "./lib/consts";
import * as ColorUtils from "./lib/ColorUtils";
import { registerSettings } from "./Components/Settings";
const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ShowNames");
export const SettingValues = await settings.init("Tharki.ShowNames", defaultSettings);
const changeColor = (item): void => {
    if (!item?.colorString) {
      return;
    }
    const backgroundColor = ColorUtils.getBackgroundColor(),
      difference = ColorUtils.getDifference(backgroundColor, item.colorString);

    if (difference > SettingValues.get("colorThreshold", defaultSettings.colorThreshold)) {
      return;
    }
    const changePercent = Math.floor(
      ((SettingValues.get("percentage", defaultSettings.percentage) - difference) / 100) * 255,
    );
    const visiblifiedColor = ColorUtils.makeColorVisible(item.colorString, changePercent);
    item.colorString = visiblifiedColor;
    item.color = ColorUtils.hexToDecimal(visiblifiedColor);
  },
  patchLoadedChannelMembers = (): void => {
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
  },
  applyInjections = (): void => {
    PluginInjector.after(GuildMemberStore, "getMember", (_args, res) => {
      changeColor(res);
    });
    if (SettingValues.get("shouldPatchRole", defaultSettings.shouldPatchRole)) {
      PluginInjector.after(GuildPrototype.prototype, "getRole", (_args, res) => {
        changeColor(res);
      });
    }
    patchLoadedChannelMembers();
  };
export const start = (): void => {
  registerSettings();
  applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};
export { Settings } from "./Components/Settings";
