import{_ as e,p as d,q as i,a1 as c}from"./framework-69837a10.js";const n={},l=c(`<h1 id="设计" tabindex="-1"><a class="header-anchor" href="#设计" aria-hidden="true">#</a> 设计</h1><p>Vue.js 的源码都在 src 目录下，其目录结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>|-- dist              # 构建目录
|-- flow              # flow的类型声明，类似于TypeScipt
|-- packages          # 衍生的npm包，例如vue-server-renderer和vue-template-compiler
|-- scripts           # 构建配置和构建脚本
|-- test              # 端到端测试和单元测试用例
|-- src               # 源代码
|   |-- compiler      # 编译相关代码
|   |-- core          # 核心代码
|   |-- platforms     # 跨平台
|   |-- server        # 服务端渲染
|   |-- sfc           # .vue文件解析逻辑
|   |-- shared        # 工具函数/共享代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于目录主要做了什么：</p><ul><li><code>dist</code>：<code>rollup</code>构建目录，里面存放了所有<code>vue</code>构建后不同版本的文件。</li><li><code>flow</code>：Facebook出品的<code>Javascript</code>静态类型检查工具，<code>vue2.*</code>版本选择了<code>flow</code>来做静态检查，<code>vue3.*</code>版本则使用了<code>typeScript</code>来重写。</li><li><code>packages</code>：<code>vue</code>衍生其他<code>npm</code>包，在<code>vue</code>构建时自动从源码中生成并且始终和<code>vue.js</code>保持相同的版本，其中<code>vue-server-renderer</code>用于处理服务端渲染，<code>vue-template-compiler</code>在使用<code>.vue</code>文件开发的时候会使用到。</li><li><code>scripts</code>：<code>rollup</code>构建配置和构建简本，<code>vue.js</code>能够通过不同的环境构建不同版本的相关逻辑都通过该目录下的脚本实现。</li><li><code>src/compiler</code>：此目录包含了与<code>Vue.js</code>编译相关的代码，它包括：模板编译成 AST 抽象语法树、AST 抽象语法树优化和代码生成相关代码。编译的工作可以在构建时用<code>runtime-only</code>版本，借助w<code>ebpack</code>和<code>vue-loader</code>等工具或插件来进行编译。也可以在运行时，使用包含构建功能的<code>runtime + compiler</code>版本。显然，编译是一项比较消耗性能的工作，在日常的开发中，更推荐使用<code>runtime-only</code>的版本开发(体积也更小)，也就是通过<code>.vue</code>文件的形式开发</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 需要使用带编译的版本
new Vue({
  data: {
    msg: &#39;hello,world&#39;
  }
  template: &#39;&lt;div&gt;{{msg}}&lt;/div&gt;&#39;
})

// 不需要使用带编译的版本
new Vue({
  data: {
    msg: &#39;hello,world&#39;
  },
  render (h) {
    return h(&#39;div&#39;, this.msg)
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>src/core</code>：该目录包含了<code>Vue.js</code>的核心代码，包括：内置组件<code>keep-alive</code>、全局 API(<code>Vue.use、Vue.mixin和Vue.extend</code>等)、实例化、响应式相关、虚拟 DOM 和工具函数等</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>|-- core
|   |-- components      # 内助组件
|   |-- global-api      # 全局API
|   |-- instance        # 实例化
|   |-- observer        # 响应式
|   |-- util            # 工具函数
|   |-- vdom            # 虚拟DOM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>src/platform</code>：<code>Vue2.0</code>提供了跨平台的能力，对比<code>React</code>中的<code>React Native</code>跨平台客户端，在<code>Vue2.0</code>中对应的跨平台就是<code>Weex</code>。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>|-- platform
|   |-- web      # web浏览器端
|   |-- weex     # native客户端
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>src/server</code>：<code>Vue2.0</code>提供服务端渲染的能力，所有跟服务端渲染相关的代码都在<code>server</code>目录下，此部分代码主要运行在服务端，而非 Web 浏览器端。</li><li><code>src/sfc</code>：该目录主要将<code>.vue</code>文件解析成一个<code>JavaScript</code>对象。</li><li><code>src/shared</code>：该目录下存放了一些在 Web 浏览器端和服务端都会用到的共享代码。</li></ul>`,11),s=[l];function o(r,a){return d(),i("div",null,s)}const u=e(n,[["render",o],["__file","design.html.vue"]]);export{u as default};
