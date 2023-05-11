import{_ as e,p as n,q as o,a1 as c}from"./framework-69837a10.js";const t={},a=c(`<h1 id="执行上下文和作用域" tabindex="-1"><a class="header-anchor" href="#执行上下文和作用域" aria-hidden="true">#</a> 执行上下文和作用域</h1><p>执行上下文的概念是<code>Javascript</code>中重要的一部分。变量或者函数的上下文决定了它们可以访问哪些数据，以及它们的行为。</p><p>每一个上下文都有一个关联的<strong>变量对象</strong>（variable object）,而这个上下文中定义的所有变量和函数都会存在于这个对象中，变量对象是无法被代码访问的，但是程序处理数据时会用到它。</p><p>上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数（全局上下文在应用程序退出前才会销毁，比如关闭网页或退出浏览器）。</p><h2 id="作用域链" tabindex="-1"><a class="header-anchor" href="#作用域链" aria-hidden="true">#</a> 作用域链</h2><p>上下文的代码在执行的时候，会创建变量对象的一个<strong>作用域链</strong>（scope chain）。这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序，代码正在执行的上下文的变量对象始终位于作用域链的最前端。</p><p>如果上下文是函数，则其<strong>活动对象</strong>（activiion object）用作<strong>变量对象</strong>。活动对象最初只有一个定义变量：<code>arguments</code>。作用域链中的下一个变量对象来自包含上下文，再下一个对象来自下一个包含上下文，以此类推直至全局上下文；全局上下文的变量对象始终是作用域链的最后一个变量对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var color = &quot;blue&quot;;
function changeColor() {
 if (color === &quot;blue&quot;) {
 color = &quot;red&quot;;
 } else {
 color = &quot;blue&quot;;
 }
}
changeColor();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对这个例子而言，函数 <code>changeColor()</code>的作用域链包含两个对象：一个是它自己的变量对象（就 是定义 <code>arguments</code> 对象的那个），另一个是全局上下文的变量对象。这个函数内部之所以能够访问变量 <code>color</code>，就是因为可以在作用域链中找到它。</p>`,9),i=[a];function r(s,d){return n(),o("div",null,i)}const u=e(t,[["render",r],["__file","execute-context.html.vue"]]);export{u as default};
