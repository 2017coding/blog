import{_ as r,M as d,p as a,q as v,R as n,t as e,N as s,a1 as l}from"./framework-69837a10.js";const t="/blog/assets/proxy-15d39530.png",c={},o=l('<h1 id="vue的响应式-vue3-x" tabindex="-1"><a class="header-anchor" href="#vue的响应式-vue3-x" aria-hidden="true">#</a> vue的响应式（vue3.x）</h1><h2 id="响应式对象" tabindex="-1"><a class="header-anchor" href="#响应式对象" aria-hidden="true">#</a> 响应式对象</h2><h3 id="vue3-x-proxy" tabindex="-1"><a class="header-anchor" href="#vue3-x-proxy" aria-hidden="true">#</a> vue3.x proxy</h3><blockquote><p>Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）</p></blockquote>',4),u={href:"https://caniuse.com/?search=proxy",target:"_blank",rel:"noopener noreferrer"},m=n("img",{src:t,style:{width:"100%",padding:"0px"}},null,-1),b={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy",target:"_blank",rel:"noopener noreferrer"},p=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/\`
 * target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
 * handler 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为
 */
const p = new Proxy(target, handler)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>handler 对象有许多方法，而set和get则可以满足对象的拦截：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// set

const p = new Proxy(target, {
    /\`
     * target 目标对象
     * property 将被设置的属性名或 Symbol
     * value 新属性值
     * receiver 最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）
     */
    set: function(target, property, value, receiver) {
    }
});

// get

const p = new Proxy(target, {
    /\`
     * target 目标对象
     * property 将被设置的属性名或 Symbol
     * receiver 最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）
     */
    set: function(target, property, receiver) {
    }
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用proxy来代理对象：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const obj = { num: 1, list: [1] }
const vm = new Proxy(obj, {
    get (target, key) {
        return target[key]
    },
    set (target, key, val) {
        console.log(key, &#39;由&#39;, target[key] ,&#39;变化为&#39;, val)
        target[key] = val
    }
})


vm.num = 2 // console.log =&gt; num 由 1 变化为 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个基础上，我们去模拟一下监听vue3的data：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const obj = { num: 1, list: [1], info: { year: 2023, years: [2020, 2021] } }

const vm = defineReactive(obj)

function defineReactive(obj) {
    return new Proxy(obj, {
        get (target, key) {
            if (typeof target[key] === &#39;object&#39;) {
                return defineReactive(target[key])
            }
            return target[key]
        },
        set (target, key, val) {
            console.log(key, &#39;由&#39;, target[key] ,&#39;变化为&#39;, val)
            target[key] = val
        }
    })

}

vm.num = 2 // console.log =&gt; num 由 1 变化为 2
vm.list[1] = 2 // console.log =&gt; 1 由 undefined 变化为 2
vm.sum = 100 // console.log =&gt; sum 由 undefined 变化为 100
vm.info.year = 2024 // console.log =&gt; year 由 2023 变化为 2024
vm.info.years[2] = 2022 // console.log =&gt; 2 由 undefined 变化为 2022
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对比defineproperty" tabindex="-1"><a class="header-anchor" href="#对比defineproperty" aria-hidden="true">#</a> 对比defineProperty</h4><p>对比defineProperty，优势很明显的体现出来了：</p><ol><li>可以监听到新增加的对象属性</li><li>可以监听到数组的新增</li><li>实现代码简洁了很多</li></ol><p>缺点：需要考虑兼容性</p>`,11);function g(x,y){const i=d("ExternalLinkIcon");return a(),v("div",null,[o,n("p",null,[e("兼容性可以去"),n("a",u,[e("这里看看"),s(i)]),e("： "),m]),n("p",null,[e("示例，"),n("a",b,[e("点这个看该函数详细文档"),s(i)]),e("：")]),p])}const f=r(c,[["render",g],["__file","reactive.html.vue"]]);export{f as default};
