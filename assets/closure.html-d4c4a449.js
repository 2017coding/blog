import{_ as e,p as n,q as a,a1 as i}from"./framework-69837a10.js";const d={},s=i(`<h1 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包" aria-hidden="true">#</a> 闭包</h1><blockquote><p>闭包就是能够读取其他函数内部变量的函数。 在JavaScript中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成“定义在一个函数内部的函数”。在本质上，闭包是将函数内部和函数外部连接起来的桥梁。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function b () {
  const a = 1
  function getData () {
    console.log(a)
  }
  a()
}
b()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到，<code>getData</code>函数访问了<code>b</code>函数中的<code>a</code>变量，所以这个函数就是一个闭包。</p><p>不过也有另外一种解释，说闭包是<strong>带有数据的函数</strong>，按这个理解，则<code>b</code>中这一段组成一个闭包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const a = 1
function getData () {
  console.log(a)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[s];function l(t,o){return n(),a("div",null,c)}const u=e(d,[["render",l],["__file","closure.html.vue"]]);export{u as default};
