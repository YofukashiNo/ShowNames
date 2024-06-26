import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import Settings from "./Components/Settings";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ShowNames", "#b380ff");
export const SettingValues = await settings.init("dev.tharki.ShowNames", defaultSettings);
import Injections from "./injections/index";

export const start = (): void => {
  Settings.registerSettings();
  Injections.applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};
export { Settings } from "./Components/Settings";
