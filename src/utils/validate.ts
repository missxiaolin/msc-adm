/** 判断是否为外链 */
export const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/;
  return reg.test(path);
};

/**
 * */
export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}
