export const getNthParentSelector = (levels: number) =>
  "xpath=" + new Array(levels).fill("..").join("/");
