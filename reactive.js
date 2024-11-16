import { handler } from "./handler.js";
import { isObject } from "./util.js";

const targetMap = new WeakMap(); // 存储已经进行监听的数据

export default function reactive(target) {
  if (!isObject(target)) {
    return target; // 如果监听的不是对象则直接返回target，不进行proxy代理
  }
  if (targetMap.has(target)) {
    return targetMap.get(target);
  }
  const result = new Proxy(target, handler);
  targetMap.set(target, result);
  return result;
}
