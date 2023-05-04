# 实现promise
`Promise`对象用于表示一个异步操作的最终完成（或失败）及其结果值。

## 分析promise功能

```
// 标准用法
new Promise((resolve, reject) => {
  if () {
    resolve()
    return
  }
  reject()
})

// 全部成功
Promise.all([promise1, promise2, promise3]).then(res => {
  const [res1, res2, res3] = res
})

// 有一个执行成功
Promise.any([promise1, promise2, promise3]).then(res => {
  const [res1, res2, res3] = res
})

// 第一个成功或者失败
Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
})
```
可以看到该函数需要实现这些功能：
1. 链式调用，`.then`之后还可以调用`.then`或者`.catch`
2. 需要我们告诉`promise`当前执行后是成功还是失败，然后去链式调用函数，否则`promise`一直会处于`pending`状态
3. 同时调用多个请求后的处理，根据`all`, `any`, `rece`方法

## 实现
分步实现：
1. `promise`内部需要修改状态
2. 需要实现实现`then`和`catch`方法
3. 需要实现`all`, `any`, `rece`方法

### 内部状态维护
一个 Promise 必然处于以下几种状态之一：
  - 待定（pending）：初始状态，既没有被兑现，也没有被拒绝。
  - 已兑现（fulfilled）：意味着操作成功完成。
  - 已拒绝（rejected）：意味着操作失败。

初始状态：
```
// 状态列表
const STATUS_OBJ = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

// 初始状态
let status = STATUS_OBJ.PENDING

```
已知`resolve`和`reject`是传入`promise`的参数，成功会调用`resolve`，失败则调用`reject`。可以推理得到`resolve`和`reject`是`promise`内部去修改状态的方法：
```
// 状态列表
const STATUS_OBJ = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

// 初始状态
let status = STATUS_OBJ.PENDING

function resolve () {
  status = STATUS_OBJ.FULFILLED
}

function reject () {
  status = STATUS_OBJ.REJECTED
}
```

### 实现`then`和`catch`
`promise`的`handle`方法中的`resolve`和`reject`会设定执行后得到的结果，`then`和`catch`在执行的时候会得到该结果传入给对应的`cb`：
```
...

let params = undefined


function resolve (res) {
  params = res
  status = STATUS_OBJ.FULFILLED
}

function reject (e) {
  params = e
  status = STATUS_OBJ.REJECTED
}
```
然后再实现`then`和`catch`：
```
function then (cb) {
  cb(params)
}

function catch (cb) {
  cb(params)
}
```
到这里，完整的函数如下：
```
function PromiseFn (handler) {
  // 状态列表
  const STATUS_OBJ = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
  }

  // 初始状态
  let status = STATUS_OBJ.PENDING

  let params = undefined


  function resolve (res) {
    params = res
    status = STATUS_OBJ.FULFILLED
  }

  function reject (e) {
    params = e
    status = STATUS_OBJ.REJECTED
  }

  function thenFn (cb) {
    cb(params)
  }

  function catchFn (cb) {
    cb(params)
  }

  handler(resolve, reject)

  return {
    then: thenFn,
    catch: catchFn
  }
}
```
执行一下是成功的：
```
new PromiseFn((resolve) => {
  resolve('10086')
}).then(res => {
  console.log(res) // 打印结果 10086
})
```
但是到这里存在几个问题：
1. 当`resolve`是在请求后再去执行的，那按现在写法`.then`执行的时候是拿不到数据的，并且`promise`的写法，`.then`执行后依旧可以执行`.then`或者`.catch`等`promise`上的各种方法
2. `then`和`catch`不能同时执行
3. 当传入`promise`的函数执行错误要怎么处理
4. 当`resolve`在异步中执行的时候，`.then`如何拿到异步返回的数据

第一个问题，可以将方法挂载到`this`上并且返回`this`：
```
...
this.then = function (cb) {
  cb(params)
  return this
}

this.catch = function (cb) {
  cb(params)
  return this
}

handler(resolve, reject)

return this
```
第二个问题，需要对`then`和`catch`执行时机处理：
```
...
this.then = function (cb) {
  if (status !== STATUS_OBJ.FULFILLED) return this
  cb(params)
  return this
}

this.catch = function (cb) {
  if (status !== STATUS_OBJ.REJECTED) return this
  cb(params)
  return this
}
```
第三个问题，需要对`handle`执行做异常处理：
```
...
this.then = function (cb) {
  cb(params)
  return this
}

this.catch = function (cb) {
  cb(params)
  return this
}

try {
  handler(resolve, reject)
} catch (e) {
  this.catch = function (cb) {
    cb(e)
    return this
  }
}

return this
```
第四个问题，当`resolve`或者`reject`是异步处理的，那应该在`status`改变后再去执行`then`或者`catch`方法，可以先将对应方法存储下来，等到状态改变后再去执行：
```
...
// 成功执行函数
let thenFn = undefined

// 失败执行函数
let catchFn = undefined

...

function resolve (res) {
  params = res
  status = STATUS_OBJ.FULFILLED
  if (thenFn) thenFn()
}

function reject (e) {
  params = e
  status = STATUS_OBJ.REJECTED
  if (catchFn) catchFn()
}

this.then = function (cb) {
  const fn = () => {
    if (status !== STATUS_OBJ.FULFILLED) return this
    cb(params)
    return this
  }
  // 状态未变化则存储当前要执行的函数
  if (status === STATUS_OBJ.PENDING) {
    thenFn = fn
    return this
  }
  return fn()
}

this.catch = function (cb) {
  const fn = () => {
    if (status !== STATUS_OBJ.REJECTED) return this
    cb(params)
    return this
  }
  // 状态未变化则存储当前要执行的函数
  if (status === STATUS_OBJ.PENDING) {
    catchFn = fn
    return this
  }
  return fn()
}
...
```
完整代码如下：
```
    function PromiseFn (handler) {
      // 状态列表
      const STATUS_OBJ = {
        PENDING: 'pending',
        FULFILLED: 'fulfilled',
        REJECTED: 'rejected',
      }

      // 初始状态
      let status = STATUS_OBJ.PENDING

      // promise结果
      let params = undefined

      // 成功执行函数
      let thenFn = undefined

      // 失败执行函数
      let catchFn = undefined

      function resolve (res) {
        params = res
        status = STATUS_OBJ.FULFILLED
        if (thenFn) thenFn()
      }

      function reject (e) {
        params = e
        status = STATUS_OBJ.REJECTED
        if (catchFn) catchFn()
      }

      this.then = function (cb) {
        const fn = () => {
          if (status !== STATUS_OBJ.FULFILLED) return this
          cb(params)
          return this
        }
        if (status === STATUS_OBJ.PENDING) {
          thenFn = fn
          return this
        }
        return fn()
      }

      this.catch = function (cb) {
        const fn = () => {
          if (status !== STATUS_OBJ.REJECTED) return this
          cb(params)
          return this
        }
        if (status === STATUS_OBJ.PENDING) {
          catchFn = fn
          return this
        }
        return fn()
      }

      try {
        handler(resolve, reject)
      } catch (e) {
        this.catch = function (cb) {
          cb(e)
          return this
        }
      }

      return this
    }
```
执行效果：
```
new PromiseFn((resolve, reject) => {
  setTimeout(() => {
    resolve(110)
  }, 2000)
}).then(res => {
  console.log(res) // 2s后打印 110
}).catch(e => {
  console.log('e', e)
})
```
2后打印 `e 110`：
```
new PromiseFn((resolve, reject) => {
  setTimeout(() => {
    reject(110)
  }, 2000)
}).then(res => {
  console.log(res) // 2s后打印 110
}).catch(e => {
  console.log('e', e)
})
```
当前执行错误也打印`e 110`：
```
new PromiseFn((resolve, reject) => {
  throw(110)
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log('e', e)
})
```
至此，`promise`的基本功能就已经实现了，不过一个标准的`promise`需要遵循[promiseA+规范](https://promisesaplus.com/)，才能避免不必要的问题

## 实现`all`, `any`, `rece`
做之前就是分析功能，`all`是同时调用多个`promise`，全部成功后将执行的结果放入数组中返回，所以需要考虑维护一个`promise`状态，思路是这样：维护一组数据，分别执行promise并且通过.then方法得到所有promise的数据然后组装成一个可以返回的数据结构。

简易代码如下下：
```
this.all = function (arr) {
  const fnList = arr.map(item => {
    return {
      promise: item,
      status: STATUS_OBJ.PENDING,
      params: undefined
    }
  })
}
```

而`any`和`rece`也是这个思路，都是基于`promise`的实现后去提供的一些方便使用的方法，都可以通过该方法实现了什么去反推代码实现。
