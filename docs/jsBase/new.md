---
title: new 操作符
date: 2024-06-26
categories: js 基础
tags: js 基础
---

## 实现一个new
1.首先创建一个空的对象，空对象的__proto__属性指向构造函数的原型对象
2.把上面创建的空对象赋值构造函数内部的this，用构造函数内部的方法修改空对象
3.如果构造函数返回一个非基本类型的值，则返回这个值，否则上面创建的对象
```js
/**
 *  实现一个new函数
 *
 * @param {Function} fn
 */
function _new(fn, ...args) {
    // 创建空对象
  const obj = Object.create(null);
  // 修改空对象的原型指向构造函数的原型对象
  Object.setPrototypeOf(obj, fn.prototype);
  // 修改this指向空对象，并执行构造函数
  const result = fn.apply(obj, args);
  // 根据规范，返回 null 和 undefined 不处理，依然返回obj
  return result instanceof Object ? result : obj;
}

function A(d){
  this.d = d
}
let child = _new(A,1)
console.log(child)

```