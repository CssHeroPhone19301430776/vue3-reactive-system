import reactive from "./reactive.js";

const obj = reactive({
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b;
  },
  set changeA(value) {
    this.a = value;
  },
});

function fn() {
  obj.a;
  obj.b;
}
obj.e = 3;
// fn();

/* 
  响应式本质上
  任何函数（视图层就是render）
  和
  函数运行过程中用到的响应式数据  // 推到过程需要重新看
  建立关系
*/
