export function track(key) {
  console.log("依赖收集", key);
}

export function trigger(key, value) {
  console.log("事件派发", key, value);
}
