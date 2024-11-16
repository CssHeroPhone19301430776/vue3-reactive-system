export function track(key, type) {
  console.log("依赖收集", type, key);
}

export function trigger(key, value, type) {
  console.log("派发更新", type, key, value);
}
