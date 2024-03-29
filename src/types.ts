import { types } from "replugged";
import type { Store as StoreType } from "replugged/dist/renderer/modules/common/flux";
import { ContextMenuProps } from "replugged/dist/renderer/modules/components/ContextMenu";
import util from "replugged/util";
import GeneralDiscordTypes from "discord-types/general";

export namespace Types {
  export import DefaultTypes = types;
  export type MenuProps = ContextMenuProps["ContextMenu"];
  export type Tree = util.Tree;
  export type Store = StoreType;
  export type OriginalChannel = GeneralDiscordTypes.Channel;
  export type Guild = GeneralDiscordTypes.Guild;
  export type Role = GeneralDiscordTypes.Role;
  export type User = GeneralDiscordTypes.User & { globalName?: string };
  export type GuildMember = GeneralDiscordTypes.GuildMember & { color: string };
  export interface ThemeStore extends Store {
    theme: string;
  }
  export interface GuildStore extends Store {
    getGuild: (guildId: string) => Guild;
    getGuildCount: DefaultTypes.AnyFunction;
    getGuilds: DefaultTypes.AnyFunction;
    getRole: (guildId: string, roleId: string) => Role;
    getRoles: (guildId: string) => Role[];
    isLoaded: DefaultTypes.AnyFunction;
  }
  export interface GuildMemberStore extends Store {
    getCommunicationDisabledUserMap: DefaultTypes.AnyFunction;
    getCommunicationDisabledVersion: DefaultTypes.AnyFunction;
    getMember: DefaultTypes.AnyFunction;
    getMemberIds: DefaultTypes.AnyFunction;
    getMemberRoleWithPendingUpdates: DefaultTypes.AnyFunction;
    getMembers: DefaultTypes.AnyFunction;
    getMutableAllGuildsAndMembers: DefaultTypes.AnyFunction;
    getNick: DefaultTypes.AnyFunction;
    getNicknameGuildsMapping: DefaultTypes.AnyFunction;
    getNicknames: DefaultTypes.AnyFunction;
    getPendingRoleUpdates: DefaultTypes.AnyFunction;
    getSelfMember: DefaultTypes.AnyFunction;
    getTrueMember: DefaultTypes.AnyFunction;
    initialize: DefaultTypes.AnyFunction;
    isMember: DefaultTypes.AnyFunction;
    memberOf: DefaultTypes.AnyFunction;
  }
  export interface ChannelMemerListCache {
    _guildLists: Record<
      number | null,
      Record<
        number | string,
        {
          groups: Array<{
            count: number;
            id: string;
            index: number;
            key: string;
            title: string;
            type: string;
          }>;
          guildId: string;
          listId: string;
          members: Record<number, GuildMember>;

          rows: Array<{
            count: string;
            id: string;
            index: undefined | number;
            key: string;
            title: string;
            type: string;
          }>;
          version: number;
        }
      >
    >;
  }
  export interface ChannelMemberStore extends Store {
    getProps: DefaultTypes.AnyFunction;
    initialize: DefaultTypes.AnyFunction;
    getState: () => ChannelMemerListCache;
  }
  export interface Settings {
    colorThreshold: number;
    percentage: number;
    shouldPatchRole: boolean;
  }
}
export default Types;
