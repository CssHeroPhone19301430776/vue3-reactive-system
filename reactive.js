import { track, trigger } from "./effect.js";
export default function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      track(key);
      return target[key];
    },
    set(target, key, value) {
      trigger(key, value);
      return Reflect.set(target, key, value);
    },
  });
}
