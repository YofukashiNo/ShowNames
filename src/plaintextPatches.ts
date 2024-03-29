import Types from "./types";
export default [
  {
    find: '"displayName","ChannelMemberStore"',
    replacements: [
      {
        match: /getProps\(\w+,\w+\){let \w+=(\w+).get/,
        replace: (suffix: string, cache: string) => `getState(){return ${cache}}${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
