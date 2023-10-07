import * as Types from "./types";
export default [
  {
    find: /\.displayName="ChannelMemberStore"/,
    replacements: [
      {
        match:
          /(\w+).\s*getProps\s*=\s*function\s*\(\s*\w+\s*,\s*\w+\s*\)\s*{\s*var\s*\w+\s*=\s*(\w+)\s*\.\s*get\s*\(\s*\w+\s*,\s*\w+\s*\(\s*\w+\s*\)\s*\)\s*;\s*return\s*{\s*listId\s*:""\s*\.\s*concat\s*\(\s*\w+\s*\.\s*guildId\s*,\s*"\s*:\s*"\s*\)\s*\.\s*concat\s*\(\s*\w+\s*\.\s*listId\s*\)\s*,\s*groups\s*:\s*\w+\s*\.\s*groups\s*,\s*rows\s*:\s*\w+\s*\.\s*rows\s*,\s*version\s*:\s*\w+\s*\.\s*version\s*}\s*}\s*;/,
        replace: `$1.getState=function(){return $2};$&`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
