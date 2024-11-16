import { track, trigger } from "./effect.js";
import { TrackType, TriggerType } from "./type.js";

export const handler = {
  get(target, key, receiver) {
    track(key, TrackType.GET);
    return Reflect.get(target, key, receiver); // 通过Reflect.get代替target[key]获取数据，当target对象中有get ×××(){}，可以指定this为proxy，这样可以多层监听
  },
  has(target, key) {
    // 当判断的值存在于对象中才需要依赖收集
    const result = Reflect.has(target, key);
    if (result) {
      // 只收集存在于响应式对象的数据
      track(key, TrackType.HAS);
    }
    return result;
  },
  ownKeys(target) {
    const result = Reflect.ownKeys(target);
    if (result.length) {
      track(null, TrackType.ITERATOR);
    }
    return result;
  },
  set(target, key, value, receiver) {
    // 如果存在属性则为set，不存在属性则为add
    const type = target.hasOwnProperty(key) ? TriggerType.SET : TriggerType.ADD; // key in target 会检查对象及其原型链上是否存在该属性，而 hasOwnProperty 仅检查对象本身是否包含该属性。
    trigger(key, value, type);
    return Reflect.set(target, key, value, receiver);
  },
  deleteProperty(target, key) {
    const hadKey = target.hasOwnProperty(key); // key in target 会检查对象及其原型链上是否存在该属性，而 hasOwnProperty 仅检查对象本身是否包含该属性。
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(key, result, TriggerType.DELETE);
    }
    return result;
  },
};
