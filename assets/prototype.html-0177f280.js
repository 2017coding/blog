import{_ as e,p as o,q as t,a1 as r}from"./framework-69837a10.js";const n={},c=r(`<h1 id="原型和原型链" tabindex="-1"><a class="header-anchor" href="#原型和原型链" aria-hidden="true">#</a> 原型和原型链</h1><ul><li>原型 只要创建一个函数，就会按照特定的规则为这个函数创建一个<code>prototype</code>属性（指向原型对象）</li><li>constructor 原型对象有一个<code>constructor</code>属性，指向该原型对象对应的构造函数<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  function Obj () {}
  console.log(Obj.prototype.constructor === Obj); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><strong>proto</strong> 在Firefox、Safari、Chrome实现上，会在每个对象上暴露<code>__proto__</code>属性，通过这个属性可以访问对象的原型。（调用构造函数创建实例，实例内部的<code>[[Prototype]]</code>指针会被赋值为构造函数的原型对象，脚本中没有访问这个特性的标准方法，<code>__proto__</code>是其中一种方法）<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function Foo () {};
var f1 = new Foo;
console.log(f1.__proto__ === Foo.prototype); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,2),i=[c];function d(a,s){return o(),t("div",null,i)}const u=e(n,[["render",d],["__file","prototype.html.vue"]]);export{u as default};