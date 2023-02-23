import { types as DefaultTypes } from "replugged";
export { types as DefaultTypes } from "replugged";
export { ReactElement, ComponentClass } from "react";
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
export interface User {
  avatar: string;
  avatarDecoration: undefined | string;
  bot: boolean;
  desktop: boolean;
  discriminator: string;
  email: null | string;
  flags: number;
  guildMemberAvatars: {
    [key: number]: string;
  };
  hasBouncedEmail: boolean;
  hasFlag: DefaultTypes.AnyFunction;
  id: string;
  isStaff: DefaultTypes.AnyFunction;
  isStaffPersonal: DefaultTypes.AnyFunction;
  mfaEnabled: boolean;
  mobile: boolean;
  nsfwAllowed: undefined | boolean;
  personalConnectionId: null | string;
  phone: null | string;
  premiumType: undefined | number;
  premiumUsageFlags: number;
  publicFlags: number;
  purchasedFlags: number;
  system: boolean;
  username: string;
  verified: boolean;
  createdAt: Date;
  tag: string;
}
export interface GuildMember {
  activities: [];
  applicationStream: null | string;
  avatar: null | string;
  colorRoleId: null | string;
  colorString: null | string;
  communicationDisabledUntil: null | string;
  flags: number;
  fullProfileLoadedTimestamp: undefined | number;
  guildId: string;
  hoistRoleId: null | string;
  iconRoleId: null | string;
  isMobileOnline: boolean;
  isOwner: boolean;
  isPending: boolean;
  joinedAt: string;
  nick: null | string;
  premiumSince: null | string;
  roles: string[];
  status: string;
  type: string;
  user: User;
  userId: string;
}
export interface ChannelMemerListCache {
  memberLists: {
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
  };
  previousStreams: Array<{
    channelId: string;
    guildId: string;
    ownerId: string;
    streamType: string;
  }>;
}
export interface ChannelMemberStore {
  getProps: DefaultTypes.AnyFunction;
  initialize: DefaultTypes.AnyFunction;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __getLocalVars: () => ChannelMemerListCache;
}
export interface SliderItemProps {
  title?: string;
  note?: string;
  disabled?: boolean;
  markers?: number[];
  stickToMarkers?: boolean;
  initialValue?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  mini?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onValueChange?: (e: number) => void;
  asValueChanges?: (e: number) => void;
  onValueRender?: (e: number) => string;
  onMarkerRender?: (e: number) => string;
  value?: number;
  onChange?: (e: number) => void;
}
export interface Settings {
  colorThreshold: number;
  percentage: number;
  shouldPatchRole: boolean;
}
