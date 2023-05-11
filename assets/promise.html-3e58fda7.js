import{_ as d,M as l,p as c,q as v,R as n,t as e,N as a,a1 as i}from"./framework-69837a10.js";const r={},u=i(`<h1 id="实现promise" tabindex="-1"><a class="header-anchor" href="#实现promise" aria-hidden="true">#</a> 实现promise</h1><p><code>Promise</code>对象用于表示一个异步操作的最终完成（或失败）及其结果值。</p><h2 id="分析promise功能" tabindex="-1"><a class="header-anchor" href="#分析promise功能" aria-hidden="true">#</a> 分析promise功能</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 标准用法
new Promise((resolve, reject) =&gt; {
  if () {
    resolve()
    return
  }
  reject()
})

// 全部成功
Promise.all([promise1, promise2, promise3]).then(res =&gt; {
  const [res1, res2, res3] = res
})

// 有一个执行成功
Promise.any([promise1, promise2, promise3]).then(res =&gt; {
  const [res1, res2, res3] = res
})

// 第一个成功或者失败
Promise.race([promise1, promise2]).then((value) =&gt; {
  console.log(value);
  // Both resolve, but promise2 is faster
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到该函数需要实现这些功能：</p><ol><li>链式调用，<code>.then</code>之后还可以调用<code>.then</code>或者<code>.catch</code></li><li>需要我们告诉<code>promise</code>当前执行后是成功还是失败，然后去链式调用函数，否则<code>promise</code>一直会处于<code>pending</code>状态</li><li>同时调用多个请求后的处理，根据<code>all</code>, <code>any</code>, <code>rece</code>方法</li></ol><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><p>分步实现：</p><ol><li><code>promise</code>内部需要修改状态</li><li>需要实现实现<code>then</code>和<code>catch</code>方法</li><li>需要实现<code>all</code>, <code>any</code>, <code>rece</code>方法</li></ol><h3 id="内部状态维护" tabindex="-1"><a class="header-anchor" href="#内部状态维护" aria-hidden="true">#</a> 内部状态维护</h3><p>一个 Promise 必然处于以下几种状态之一：</p><ul><li>待定（pending）：初始状态，既没有被兑现，也没有被拒绝。</li><li>已兑现（fulfilled）：意味着操作成功完成。</li><li>已拒绝（rejected）：意味着操作失败。</li></ul><p>初始状态：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 状态列表
const STATUS_OBJ = {
  PENDING: &#39;pending&#39;,
  FULFILLED: &#39;fulfilled&#39;,
  REJECTED: &#39;rejected&#39;,
}

// 初始状态
let status = STATUS_OBJ.PENDING

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>已知<code>resolve</code>和<code>reject</code>是传入<code>promise</code>的参数，成功会调用<code>resolve</code>，失败则调用<code>reject</code>。可以推理得到<code>resolve</code>和<code>reject</code>是<code>promise</code>内部去修改状态的方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 状态列表
const STATUS_OBJ = {
  PENDING: &#39;pending&#39;,
  FULFILLED: &#39;fulfilled&#39;,
  REJECTED: &#39;rejected&#39;,
}

// 初始状态
let status = STATUS_OBJ.PENDING

function resolve () {
  status = STATUS_OBJ.FULFILLED
}

function reject () {
  status = STATUS_OBJ.REJECTED
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现then和catch" tabindex="-1"><a class="header-anchor" href="#实现then和catch" aria-hidden="true">#</a> 实现<code>then</code>和<code>catch</code></h3><p><code>promise</code>的<code>handle</code>方法中的<code>resolve</code>和<code>reject</code>会设定执行后得到的结果，<code>then</code>和<code>catch</code>在执行的时候会得到该结果传入给对应的<code>cb</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...

let params = undefined


function resolve (res) {
  params = res
  status = STATUS_OBJ.FULFILLED
}

function reject (e) {
  params = e
  status = STATUS_OBJ.REJECTED
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再实现<code>then</code>和<code>catch</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function then (cb) {
  cb(params)
}

function catch (cb) {
  cb(params)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里，完整的函数如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function PromiseFn (handler) {
  // 状态列表
  const STATUS_OBJ = {
    PENDING: &#39;pending&#39;,
    FULFILLED: &#39;fulfilled&#39;,
    REJECTED: &#39;rejected&#39;,
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行一下是成功的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new PromiseFn((resolve) =&gt; {
  resolve(&#39;10086&#39;)
}).then(res =&gt; {
  console.log(res) // 打印结果 10086
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是到这里存在几个问题：</p><ol><li>当<code>resolve</code>是在请求后再去执行的，那按现在写法<code>.then</code>执行的时候是拿不到数据的，并且<code>promise</code>的写法，<code>.then</code>执行后依旧可以执行<code>.then</code>或者<code>.catch</code>等<code>promise</code>上的各种方法</li><li><code>then</code>和<code>catch</code>不能同时执行</li><li>当传入<code>promise</code>的函数执行错误要怎么处理</li><li>当<code>resolve</code>在异步中执行的时候，<code>.then</code>如何拿到异步返回的数据</li></ol><p>第一个问题，可以将方法挂载到<code>this</code>上并且返回<code>this</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个问题，需要对<code>then</code>和<code>catch</code>执行时机处理：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三个问题，需要对<code>handle</code>执行做异常处理：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第四个问题，当<code>resolve</code>或者<code>reject</code>是异步处理的，那应该在<code>status</code>改变后再去执行<code>then</code>或者<code>catch</code>方法，可以先将对应方法存储下来，等到状态改变后再去执行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
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
  const fn = () =&gt; {
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
  const fn = () =&gt; {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    function PromiseFn (handler) {
      // 状态列表
      const STATUS_OBJ = {
        PENDING: &#39;pending&#39;,
        FULFILLED: &#39;fulfilled&#39;,
        REJECTED: &#39;rejected&#39;,
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
        const fn = () =&gt; {
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
        const fn = () =&gt; {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行效果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new PromiseFn((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(110)
  }, 2000)
}).then(res =&gt; {
  console.log(res) // 2s后打印 110
}).catch(e =&gt; {
  console.log(&#39;e&#39;, e)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2后打印 <code>e 110</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new PromiseFn((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    reject(110)
  }, 2000)
}).then(res =&gt; {
  console.log(res) // 2s后打印 110
}).catch(e =&gt; {
  console.log(&#39;e&#39;, e)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当前执行错误也打印<code>e 110</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new PromiseFn((resolve, reject) =&gt; {
  throw(110)
}).then(res =&gt; {
  console.log(res)
}).catch(e =&gt; {
  console.log(&#39;e&#39;, e)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43),t=n("code",null,"promise",-1),m=n("code",null,"promise",-1),b={href:"https://promisesaplus.com/",target:"_blank",rel:"noopener noreferrer"},o=i(`<h2 id="实现all-any-rece" tabindex="-1"><a class="header-anchor" href="#实现all-any-rece" aria-hidden="true">#</a> 实现<code>all</code>, <code>any</code>, <code>rece</code></h2><p>做之前就是分析功能，<code>all</code>是同时调用多个<code>promise</code>，全部成功后将执行的结果放入数组中返回，所以需要考虑维护一个<code>promise</code>状态，思路是这样：维护一组数据，分别执行promise并且通过.then方法得到所有promise的数据然后组装成一个可以返回的数据结构。</p><p>简易代码如下下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this.all = function (arr) {
  const fnList = arr.map(item =&gt; {
    return {
      promise: item,
      status: STATUS_OBJ.PENDING,
      params: undefined
    }
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而<code>any</code>和<code>rece</code>也是这个思路，都是基于<code>promise</code>的实现后去提供的一些方便使用的方法，都可以通过该方法实现了什么去反推代码实现。</p>`,5);function h(p,g){const s=l("ExternalLinkIcon");return c(),v("div",null,[u,n("p",null,[e("至此，"),t,e("的基本功能就已经实现了，不过一个标准的"),m,e("需要遵循"),n("a",b,[e("promiseA+规范"),a(s)]),e("，才能避免不必要的问题")]),o])}const x=d(r,[["render",h],["__file","promise.html.vue"]]);export{x as default};
