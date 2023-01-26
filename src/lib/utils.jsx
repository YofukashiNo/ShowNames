export const isObject = (testMaterial) =>
  typeof testMaterial === "object" && !Array.isArray(testMaterial) && testMaterial != null;

export const getFunctionKeyFromStrings = (Module, StringArray) =>
  Object.keys(Module).find((FunctionKey) =>
    StringArray.every((s) => Module[FunctionKey].toString().includes(s)),
  );

export const prototypeChecker = (ModuleExports, Protos) =>
  isObject(ModuleExports) &&
  Protos.every((p) => Object.values(ModuleExports).some((m) => m?.prototype?.[p]));
