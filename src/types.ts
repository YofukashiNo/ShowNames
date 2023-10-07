import { types as DefaultTypes } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";
import type { GuildMember } from "discord-types/general";
export type { Role, User, GuildMember } from "discord-types/general";
export type { Store } from "replugged/dist/renderer/modules/common/flux";
export { types as DefaultTypes } from "replugged";

export interface GuildMemberStore {
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
  _guildLists: {
    [key: number | null]: {
      [key: number | string]: {
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
        members: {
          [key: number]: GuildMember;
        };
        rows: Array<{
          count: string;
          id: string;
          index: undefined | number;
          key: string;
          title: string;
          type: string;
        }>;
        version: number;
      };
    };
  };
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
