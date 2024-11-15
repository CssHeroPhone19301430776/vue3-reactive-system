import reactive from "./reactive.js";

const obj = reactive({
  a: 1,
  b: 2,
});

function fn() {
  obj.a;
  obj.b;

  obj.a++;
}

fn();
