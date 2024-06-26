---
title: Promise
date: 2024-06-26
categories: js 基础
tags: js 基础
---

## 1. 概念

- Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。
- 简单说，Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。
- 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
- 有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

## 2. 基本用法

- ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

- Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
- resolve 函数的作用是，将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
- 调用 resolve 或 reject 以后，Promise 对象的状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经 resolved 的 Promise 对象，就会报错。

```js
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});

promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

- Promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数。

```js
getJSON("/posts.json").then(
  function (json) {
    console.log("Contents: " + json);
  },
  function (error) {
    console.error("出错了", error);
  }
);
```

- then 方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 resolved 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受 Promise 对象传出的值作为参数。

### 2.1 Promise.then()

- then 方法是定义在原型对象 Promise.prototype 上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

```js
getJSON("/posts.json")
  .then(function (json) {
    return json.post;
  })
  .then(function (post) {
    // ...
  });
```

- 上面代码中，第一个 then 方法指定的回调函数，返回的是另一个 Promise 对象。这时，第二个 then 方法指定的回调函数，就会等待这个新的 Promise 对象状态发生变化。如果变为 resolved，就调用后面的回调函数；如果状态变为 rejected，就调用后面的回调函数。

### 2.2 Promise.catch()

- Promise.prototype.catch 方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

```js
getJSON("/posts.json")
  .then(function (posts) {
    // ...
  })
  .catch(function (error) {
    // 处理getJSON和前一个回调函数运行时发生的错误
    console.log("发生错误！", error);
  });
```

- 上面代码中，getJSON 方法返回一个 Promise 对象，如果该对象状态变为 resolved，则会调用 then 方法指定的回调函数；如果异步操作抛出错误，状态就会变为 rejected，就会调用 catch 方法指定的回调函数，处理这个错误。另外，then 方法指定的回调函数，如果运行中抛出错误，也会被 catch 方法捕获。

### 2.3 Promise.all()

- Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

- 上面代码中，Promise.all 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

- p 的状态由 p1、p2、p3 决定，分成两种情况。
  - 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。
  - 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

```js
const p1 = new Promise((resolve, reject) => {
  resolve("hello");
});

const p2 = new Promise((resolve, reject) => {
  resolve("world");
});

const p3 = new Promise((resolve, reject) => {
  reject("error");
});

Promise.all([p1, p2, p3])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

- 上面代码中，p1、p2、p3 的状态都变成 fulfilled，才会输出 all。如果 p2、p3 的状态变成 rejected，p 的状态就会变成 rejected，并返回 reject 的值。

### 2.4 Promise.race()

- Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

- 上面代码中，只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "three");
});

Promise.race([p1, p2, p3]).then((result) => {
  console.log(result);
});
```

- 上面代码中，p1、p2、p3 都处于 pending 状态，1000 毫秒以后，p3 先改变状态，结果作为 Promise.race()的返回值，传递给回调函数。

### 2.5 Promise.resolve()

- Promise.resolve 方法可以将现有对象转为 Promise 对象。

```js
const jsPromise = Promise.resolve($.ajax("/whatever.json"));
```

- 上面的代码将 jQuery 生成的 deferred 对象，转为一个新的 Promise 对象。

```js
Promise.resolve("foo");
// 等价于
new Promise((resolve) => resolve("foo"));
```

- Promise.resolve 等价于下面的写法。

```js
Promise.resolve("foo");
// 等价于
new Promise((resolve) => resolve("foo"));
```

- Promise.resolve 方法的参数分成四种情况。
  - 参数是一个 Promise 实例
  - 参数是一个 thenable 对象
  - 参数不是具有 then 方法的对象，或根本就不是对象
  - 不带有任何参数

```js
const thenable = {
  then: function (resolve, reject) {
    resolve(42);
  },
};

const p1 = new Promise((resolve) => resolve(1));
const p2 = new Promise((resolve, reject) => resolve(2));
const p3 = new Promise((resolve, reject) => reject(3));
const p4 = new Promise((resolve, reject) => reject(4));

p1.then(function (value) {
  console.log(value);
});

p2.then(function (value) {
  console.log(value);
});

p3.catch(function (value) {});

p4.catch(function (value) {
  console.log(value);
});
```

- 上面代码中，p1、p2、p3、p4 的状态都改变为 resolved，它们的回调函数都会依次调用。p1 会首先完成，p2、p3、p4 依次完成。这四个 Promise 对象是平级关系。

### 2.6. Promise.reject()

- Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。

```js
const p = Promise.reject("出错了");
// 等同于
const p = new Promise((resolve, reject) => reject("出错了"));

p.then(null, function (s) {
  console.log(s);
});
// 出错了
```

- 上面代码生成一个 Promise 对象的实例 p，状态为 rejected，回调函数会立即执行。

### 2.7. Promise.try()

- Promise.try 方法用于立即执行异步操作，其类似于 try 语句的用途。

```js
Promise.try(function () {
  return fetch(url);
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
  });
```

- 上面代码中，fetch 函数和 response.json 函数，都有可能抛出错误，这时可以使用 try 语句，将它们放在 try 代码块之中，这样不管有没有发生错误，finally 方法都会执行。

### 2.8 Promise.allSettled()

- Promise.allSettled 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是 fulfilled 还是 rejected，包装实例才会结束。

```js
const promises = [Promise.resolve(3), Promise.resolve(4), Promise.resolve(5)];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => {
    console.log(result);
  })
);
```

- 上面代码中，Promise.allSettled 方法接受一个数组作为参数，该数组的每个成员都是一个 Promise 对象。它返回一个新的 Promise 对象，只有等到所有这些成员的 Promise 对象都发生状态变更（不管是 fulfilled 还是 rejected），返回的那个 Promise 对象才会发生状态变更。

- 该方法的一个用处是，在处理多个 Promise 对象时，不用显式调用 Promise.all 方法，而是直接用 Promise.allSettled 方法，就能保证只要有一个成员的状态发生变化，就能立即得到这个变化。

- 它的最大好处，就是成功和失败的结果都会返回。所以，处理失败结果的时候，就不需要单独对 Promise.reject 返回的结果，进行判断了。

### 2.9 Promise.any()

- Promise.any 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态。

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "resolve1");
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(reject, 500, "reject2");
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 300, "resolve3");
});

Promise.any([p1, p2, p3]).then((result) => {
  console.log(result);
});
```

- 上面代码中，p1、p2、p3 三个 Promise 实例，只要有一个变成 fulfilled 状态，包装实例 p 就会变成 fulfilled 状态；如果所有三个实例都变成 rejected 状态，包装实例 p 就会变成 rejected 状态。

- 上面代码中，p1 会先完成，导致 p 状态变为 fulfilled，从而结束。

### 2.10 Promise.finally()

- Promise.prototype.finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

- 上面代码中，不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数。

## 实现

```js
// 三种状态常量
const STATE_PENDING = "pending";
const STATE_FULFILLED = "fulfilled";
const STATE_REJECTED = "rejected";

class MyPromise {
  // 构造函数，接收一个函数作为入参
  constructor(executor) {
    try {
      // 立即执行函数 需要手动指定bind指向
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (err) {
      // 出现异常则认为rejected
      this.reject(err);
    }
  }

  // 状态，默认为pending
  #state = STATE_PENDING;
  // 成功的值
  #value = null;
  // 失败的原因
  #reason = null;
  // 异步promise调用then时的回调 处理对同一个Promise多次调用then的情况，需要用数组
  #onFulfilledCallbackList = [];
  #onRejectedCallbackList = [];

  #resolve(value) {
    // 在构造函数回调中返回自身
    if (value === this) {
      // 触发rejected状态
      this.#rejectHandle(
        TypeError("Chaining cycle detected for promise #<Promise>")
      );
      return;
    }
    // 如果值为一个新的Promise，那么状态由这个新的Promise确定
    if (value instanceof MyPromise) {
      value.then(
        (newValue) => {
          this.#resolveHandle(newValue);
        },
        (newReason) => {
          this.#rejectHandle(newReason);
        }
      );
    } else {
      this.#resolveHandle(value);
    }
  }

  // resolve函数状态变更的处理逻辑
  #resolveHandle(value) {
    // 只处理pending状态
    if (this.#state !== STATE_PENDING) return;
    this.#state = STATE_FULFILLED;
    this.#value = value;
    // 状态改变时如果有回调函数需要执行
    this.#onFulfilledCallbackList.forEach((callback) => callback(value));
    // 处理完再清空数组
    this.#onFulfilledCallbackList = [];
  }

  #reject(reason) {
    this.#rejectHandle(reason);
  }

  // reject函数状态变更的处理逻辑
  #rejectHandle(reason) {
    // 只处理pending状态
    if (this.#state !== STATE_PENDING) return;
    this.#state = STATE_REJECTED;
    this.#reason = reason;
    // 状态改变时如果有回调函数需要执行
    this.#onRejectedCallbackList.forEach((callback) => callback(reason));
    // 处理完再清空数组
    this.#onRejectedCallbackList = [];
  }

  // then中的回调处理
  // thenPromise then返回的Promise newValue 回调的返回值  onCallback 回调
  #resolutionProduce(thenPromise, newValue, resolve, reject) {
    // 如果循环调用自身，抛出TypeError
    if (thenPromise === newValue) {
      reject(TypeError("Chaining cycle detected for promise #<Promise>"));
      return;
    }
    // 兼容的promise实现
    if (typeof newValue === "object" || typeof newValue === "function") {
      // typeof null 也是 'object'
      if (newValue === null) {
        resolve(newValue);
        return;
      }
      let then;
      try {
        then = newValue.then;
      } catch (e) {
        // 如果抛出异常则设为rejected状态
        reject(e);
        return;
      }
      // 如果then不是函数，则设置fulfilled状态
      if (typeof then !== "function") {
        resolve(newValue);
        return;
      }
      // 是否调用过的标志 只能调用一次
      let calledFlag = false;
      // 调用then方法
      try {
        then.call(
          newValue,
          (y) => {
            if (calledFlag) return;
            calledFlag = true;
            this.#resolutionProduce(thenPromise, y, resolve, reject);
          },
          (r) => {
            if (calledFlag) return;
            calledFlag = true;
            reject(r);
          }
        );
      } catch (err) {
        if (calledFlag) return;
        reject(err);
      }
    } else {
      resolve(newValue);
    }
  }

  then(onFulfilled, onRejected) {
    // 回调的默认值，适用于省略入参
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      // 使用引发异常的方式来传递 rejected状态
      onRejected = (reason) => {
        throw reason;
      };
    }
    // 返回Promise，适配链式调用
    const thenPromise = new MyPromise((resolve, reject) => {
      if (this.#state === STATE_FULFILLED) {
        queueMicrotask(() => {
          try {
            const newValue = onFulfilled(this.#value);
            this.#resolutionProduce(thenPromise, newValue, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }
      if (this.#state === STATE_REJECTED) {
        queueMicrotask(() => {
          try {
            const newValue = onRejected(this.#reason);
            this.#resolutionProduce(thenPromise, newValue, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }
      if (this.#state === STATE_PENDING) {
        // pending状态时，无法执行回调，因此把状态写入属性中，等后续状态改变时执行
        this.#onFulfilledCallbackList.push((value) => {
          queueMicrotask(() => {
            try {
              const newValue = onFulfilled(value);
              this.#resolutionProduce(thenPromise, newValue, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
        this.#onRejectedCallbackList.push((reason) => {
          queueMicrotask(() => {
            try {
              const newValue = onRejected(reason);
              this.#resolutionProduce(thenPromise, newValue, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    });
    return thenPromise;
  }

  // Promise/A+规范的测试工具使用
  static deferred() {
    const res = {};
    res.promise = new MyPromise(function (resolve, reject) {
      res.resolve = resolve;
      res.reject = reject;
    });
    return res;
  }

  static resolve(data) {
    // 如果是Promise，则直接返回
    if (data instanceof MyPromise) return data;
    // thenable对象等由then方法处理
    return new MyPromise(function (resolveItem, rejectItem) {
      resolveItem(data);
    });
  }

  static reject(data) {
    return new MyPromise(function (resolveItem, rejectItem) {
      rejectItem(data);
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // 不管状态如何都会执行。而且finally会把Promise的状态传递下去
  finally(callback) {
    // 如果callback()返回Promise且状态rejected，则后续状态为rejected
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }

  // 判断入参是否为Iterator
  static #isIterator(data) {
    if (!data || typeof data[Symbol.iterator] !== "function") {
      const type = typeof data;
      throw new TypeError(
        `${type} ${data} is not iterable (cannot read property Symbol(Symbol.iterator))`
      );
    }
  }

  static all(data) {
    MyPromise.#isIterator(data);
    // count为总数量，count为Promise完成的数量
    let sum = 0,
      count = 0;
    // 存储promise值的数组
    const valueList = [];
    return new MyPromise((resolveItem, rejectItem) => {
      for (let item of data) {
        // 当前的序号
        let tempi = sum++;
        valueList.push(null);
        MyPromise.resolve(item).then(
          (value) => {
            ++count;
            valueList[tempi] = value;
            // 全部完成
            if (count === valueList.length) resolveItem(valueList);
          },
          (reason) => {
            // 有一个出现rejected状态则返回rejected
            rejectItem(reason);
          }
        );
      }
      // 循环一次都没进入，实际是空数组
      if (sum === 0) resolveItem([]);
    });
  }

  static race(data) {
    MyPromise.#isIterator(data);
    return new MyPromise((resolveItem, rejectItem) => {
      for (let item of data) {
        MyPromise.resolve(item).then(resolveItem, rejectItem);
      }
    });
  }

  static allSettled(data) {
    MyPromise.#isIterator(data);
    // count为总数量，count为Promise完成的数量
    let sum = 0,
      count = 0;
    // 存储promise值的数组
    const valueList = [];
    return new MyPromise((resolveItem, rejectItem) => {
      for (let item of data) {
        // 当前的序号
        let tempi = sum++;
        valueList.push(null);
        MyPromise.resolve(item).then(
          (value) => {
            ++count;
            valueList[tempi] = { status: "fulfilled", value: value };
            if (count === valueList.length) resolveItem(valueList);
          },
          (reason) => {
            ++count;
            valueList[tempi] = { status: "rejected", reason: reason };
            if (count === valueList.length) resolveItem(valueList);
          }
        );
      }
      // 循环一次都没进入，实际是空数组
      if (sum === 0) resolveItem([]);
    });
  }

  static any(data) {
    MyPromise.#isIterator(data);
    // count为总数量，count为Promise完成的数量
    let sum = 0,
      count = 0;
    // 存储promise值的数组
    const reasonList = [];
    return new MyPromise((resolveItem, rejectItem) => {
      for (let item of data) {
        // 当前的序号
        let tempi = sum++;
        reasonList.push(null);
        MyPromise.resolve(item).then(
          (value) => {
            resolveItem(value);
          },
          (reason) => {
            ++count;
            reasonList[tempi] = reason;
            if (count === reasonList.length)
              // ECMAScript要求抛出AggregateError错误
              rejectItem(
                new AggregateError(reasonList, "All promises were rejected")
              );
          }
        );
      }
      // 循环一次都没进入，实际是空数组 为rejected状态
      if (sum === 0)
        rejectItem(new AggregateError([], "All promises were rejected"));
    });
  }
}

module.exports = MyPromise;
```
