import{_ as s,M as l,p as a,q as u,R as e,t as n,N as v,Q as r,a1 as i}from"./framework-69837a10.js";const o={},c=i(`<h1 id="包管理工具" tabindex="-1"><a class="header-anchor" href="#包管理工具" aria-hidden="true">#</a> 包管理工具</h1><blockquote><p>npm 是 <code>Node.js</code>的包管理工具, 除此之外社区有一些类似的包管理工具如yarn、pnpm、cnpm，以及集团内部使用的tnpm。在实际开发中通常使用这些主流的包管理工具生成node_modules目录安装依赖并进行依赖管理。</p></blockquote><h2 id="npm" tabindex="-1"><a class="header-anchor" href="#npm" aria-hidden="true">#</a> npm</h2><p>当我们执行npm install后，npm会帮助我们下载对应的依赖包并解压到本地缓存，然后构建出node_modules目录结构，写入依赖文件。而对应的依赖包在node_modules目录中是怎样的结构呢，npm主要经历了以下变化。</p><h3 id="npm-v1-v2-依赖嵌套" tabindex="-1"><a class="header-anchor" href="#npm-v1-v2-依赖嵌套" aria-hidden="true">#</a> npm v1/v2 依赖嵌套</h3><p>npm最早的版本使用了简单的嵌套模式进行依赖管理，每个模块下面还会存在一个node_modules来存放模块的依赖：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// A B C同时依赖 D@1.0.0
node_modules
|-- A@1.0.0
|   |__node_modules
|      |__ D@1.0.0
|-- B@1.0.0
|   |__node_modules
|      |__ D@1.0.0
|-- C@1.0.0
|   |__node_modules
|      |__ D@2.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种依赖管理的方式会造成<code>依赖地狱</code>，比如几个模块同时依赖同一个版本的C模块，则C会被重复下载多次，造成重复的空间浪费。</p><h3 id="npm-v3-扁平化" tabindex="-1"><a class="header-anchor" href="#npm-v3-扁平化" aria-hidden="true">#</a> npm v3 扁平化</h3><p>npm v3重写了依赖安装程序，npm3通过扁平化的方式将子依赖项安装在主依赖项所在的目录中（hoisting提升），用来减少深层树和冗余。这个时候的node_modules会变成这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// A B同时依赖 D@1.0.0
node_modules
|-- A@1.0.0
|-- B@1.0.0
|-- C@1.0.0
|   |__node_modules
|      |__ D@2.0.0
|-- D@1.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了保证模块的正确加载，npm实现了额外的依赖查找算法，通过递归向上查找node_modules。在安装新的包时，会不停向上级node_modules中查找，如果找到相同的包就不会重新安装，在遇到版本冲突时才会在模块下的node_modules目录下存放该模块的子依赖。 这样解决了大量包重复安装的问题，依赖的层级也不会过深，但是却带来了新问题：</p><h4 id="_1-幽灵地狱" tabindex="-1"><a class="header-anchor" href="#_1-幽灵地狱" aria-hidden="true">#</a> 1. 幽灵地狱</h4><p>幽灵依赖主要变现为：某个包没有在package.json中定义，但是项目中却可以引用到。</p><p>比如我们现在的node_modules结构为下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// A B同时依赖 D@1.0.0
node_modules
|-- A@1.0.0
|-- B@1.0.0
|-- C@1.0.0
|   |__node_modules
|      |__ D@2.0.0
|-- D@1.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>package.json如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    name: &quot;app&quot;,
    version: &quot;1.0.0&quot;,
    &quot;main&quot;: &quot;index.js&quot;,
    &quot;dependencies&quot;: {
        &quot;A&quot;: &quot;^1.0.0&quot;,
        &quot;C&quot;: &quot;^1.0.0&quot;,
    },
    &quot;devDependencies&quot;: {
        &quot;B&quot;: &quot;^1.0.0&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到在package.json中，是没有引入D这个模块的，但是在项目中我们在引入B模块后，还能引入D， 因为D是B的依赖项，在安装的时候，npm会将该依赖平铺到node_modules下，通过node的require()查找文件夹的时候不会受package.json影响。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const B = require(&#39;B&#39;);
const D = require(&#39;D&#39;); // 但是这个没有在package.json中引入
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种情况往往容易导致意想不到的问题：</p><ul><li><p>依赖不兼容 package.json只是声明了需要1.0.0版本的A，但是D的版本是没有声明的。只要不影响A的API签名，那A的PATCH发行版本中包含一个D的MAJOR升级对于SemVer体系来说是可以成立的，这就导致其他用户安装的时候可能会下载到与当前依赖不兼容的版本。</p></li><li><p>依赖缺失 B模块来自于devDepdency，说明该模块只会被这个项目的开发者安装。这个项目的开发者可以直接引入devDepdency的子依赖，但是对于其他使用者来说，require(&quot;D&quot;)正常执行会立刻出错，因为他们没有安装相关依赖。不过开发中如果使用者自己的项目中依赖也包含D模块，require(&quot;D&quot;)是可以正常运行的，当D模块是一个项目常见模块时，便会出现大部分人可以正常使用，而小部分人无法运行项目的情况，而使用者往往也很难找到原因在哪里。</p></li></ul><h4 id="_2-多重依赖" tabindex="-1"><a class="header-anchor" href="#_2-多重依赖" aria-hidden="true">#</a> 2. 多重依赖</h4><p>我们来看看这种情况，A、B模块都依赖了D@1.0.0版本，而C、E模块依赖了D@2.0.0版本，这个时候无论把哪个版本的D放在顶层，都依旧会存在另外一个版本重复的问题，比如这里重复的@D@2.0.0：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// A B同时依赖 D@1.0.0，C、D同时依赖D@2.0.0
node_modules
|-- A@1.0.0
|-- B@1.0.0
|-- C@1.0.0
|   |__node_modules
|      |__ D@2.0.0
|-- D@1.0.0
|-- E@1.0.0
|   |__node_modules
|      |__ D@2.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是不止这些问题，还有这些：</p><ul><li><p>破坏单例模式 模块C、E中引入了模块E中导出的一个单例对象，虽然代码里看起来是加载的同一个模块的同一个版本，但是实际上加载的是不同的module，引入的也是不同的对象，如果这个时候同时对该对象进行操作，就会产生问题。</p></li><li><p>types冲突： 虽然各个packages的代码不会互相感染，但是他们的types仍然可以互相影响，因此版本重复可能会导致全局的types命名冲突。</p></li></ul><h4 id="_3-不确定性" tabindex="-1"><a class="header-anchor" href="#_3-不确定性" aria-hidden="true">#</a> 3. 不确定性</h4><p>目前的前端包管理下，给定package.json后，无论在任何环境执行npm install命令都能得到相同的node_modules目录结构，但是npm v3版本却是不确定的，因为它的node_modules目录以及依赖树结构取决于用户安装的顺序。</p><p>比如当前用户npm install生成的node_modules目录结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// A B同时依赖 D@1.0.0，C、D同时依赖D@2.0.0
node_modules
|-- A@1.0.0
|-- B@1.0.0
|-- C@1.0.0
|   |__node_modules
|      |__ D@2.0.0
|-- D@1.0.0
|-- E@1.0.0
|   |__node_modules
|      |__ D@2.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候当开发者升级A模块的版本到A@2.0.0，内部依赖的D@1.0.0也升级到D@2.0.0的时候，重新安装node_modules的目录结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// B依赖 D@1.0.0，A、C、D同时依赖D@2.0.0
node_modules
|-- A@1.0.0
|   |__node_modules
|      |__ D@2.0.0
|-- B@1.0.0
|-- C@1.0.0
|   |__node_modules
|      |__ D@2.0.0
|-- D@1.0.0
|-- E@1.0.0
|   |__node_modules
|      |__ D@2.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当另外一个开发者拉取到这个新项目，去安装依赖的时候，他的node_modules的目录结构却会是这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// B依赖 D@1.0.0，A、C、D同时依赖D@2.0.0
node_modules
|-- A@1.0.0
|-- B@1.0.0
|   |__node_modules
|      |__ D@1.0.0
|-- C@1.0.0
|-- D@2.0.0
|-- E@1.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npm-v5-扁平化-lock" tabindex="-1"><a class="header-anchor" href="#npm-v5-扁平化-lock" aria-hidden="true">#</a> npm v5 扁平化 + lock</h3><p>在npm v5中新增了 package-lock.json。当项目有package.json文件并且首次执行npm install后，会生成一个package-lock.json文件，这个文件记录了package.json依赖的模块，以及模块的子依赖，并且给每个依赖标明了版本、获取地址和验证模块完整性哈希值。通过package-lock.json文件很好的保证了安装的确定性和兼容性，保证了每次安装的结果一样。 在日常的项目开发中，package-lock.json一般有单独开发者维护，其他开发者不能随意提交该文件的改动，这样能保证项目开发中，开发者的node_modules是一致的。</p><p>package-lock.json的目录结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    name: &quot;app&quot;,
    version: &quot;1.0.0&quot;,
    &quot;lockfileVersion&quot;: &quot;index.js&quot;,
    &quot;dependencies&quot;: {
        &quot;A&quot;: {
            &quot;version&quot;: &quot;2.0&quot;,
            &quot;resolved&quot;: &quot;uri&quot;,
            &quot;integrity&quot;: &quot;sha1-&quot;,
            &quot;requires&quot;: {
                &quot;D&quot;: &quot;2.0&quot;
            }
        }
    },
    &quot;devDependencies&quot;: {
        &quot;B&quot;: {
            &quot;version&quot;: &quot;2.0&quot;,
            &quot;resolved&quot;: &quot;uri&quot;,
            &quot;integrity&quot;: &quot;sha1-&quot;,
            &quot;requires&quot;: {
                &quot;D&quot;: &quot;1.0&quot;
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yarn" tabindex="-1"><a class="header-anchor" href="#yarn" aria-hidden="true">#</a> yarn</h2><p>yarn是在2016年开源的，出现是为了解决npm v3中存在一些问题，npm v5则是在2017年发布的。</p><h3 id="yarn-v1-lockfile" tabindex="-1"><a class="header-anchor" href="#yarn-v1-lockfile" aria-hidden="true">#</a> yarn v1 lockfile</h3><p>yarn 生成的node_modules目录结构和npm v5是一样的，并且在首次执行 yarn install后，会生成一个yarn.lock文件，和package-lock.json不同的是，yarn.lock使用的是自定义格式，并且会将所有的依赖放在顶层，这样做的好处是方便阅读和审查：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>A@^1.0.0:
    version: &quot;1.0.0&quot;
    resolved &quot;uri&quot;
    integrity &quot;&quot;
    dependencies:
        D &quot;^1.0.0&quot;

B@^1.0.0:
    version: &quot;1.0.0&quot;
    resolved &quot;uri&quot;
    integrity &quot;&quot;
    dependencies:
        D &quot;^1.0.0&quot;

C@^1.0.0:
    version: &quot;1.0.0&quot;
    resolved &quot;uri&quot;
    integrity &quot;&quot;
    dependencies:
        D &quot;^2.0.0&quot;

D@^1.0.0:
    version: &quot;1.0.0&quot;
    resolved &quot;uri&quot;

D@^2.0.0:
    version: &quot;2.0.0&quot;
    resolved &quot;uri&quot;

E@^1.0.0:
    version: &quot;1.0.0&quot;
    resolved &quot;uri&quot;
    integrity &quot;&quot;
    dependencies:
        D &quot;^2.0.0&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="yarn-lock-对比-package-lock-json" tabindex="-1"><a class="header-anchor" href="#yarn-lock-对比-package-lock-json" aria-hidden="true">#</a> yarn.lock 对比 package-lock.json</h3><ol><li>文件格式不同</li><li>package-lock.json记录的版本是确定的，而yarn.lock记录的是语义化的版本（~ ^ *）</li><li>package-lock.json文件内容更丰富，实现了更密集的锁文件，并且通过package-lock.json就可以知道node_modules的目录结构</li></ol><h3 id="yarn-v2-plug-n-play" tabindex="-1"><a class="header-anchor" href="#yarn-v2-plug-n-play" aria-hidden="true">#</a> yarn v2 Plug&#39;n&#39;Play</h3>`,47),t={href:"https://www.yarnpkg.cn/getting-started/install",target:"_blank",rel:"noopener noreferrer"},m=i(`<p>在yarn的2.x版本推出了 Plug&#39;n&#39;Play（PnP）零安装模式，放弃了node_modules，更加保证了依赖的可靠性，构建速度也得到了更大的提升。</p><p>先来看看node_modules存在的问题：</p><ul><li>生成node_modules前，需要将文件下载解压到缓存中</li><li>node_modules包含大量文件，生成它们可以弥补运行所需时间的70%以上的yarn install</li><li>node_modules中存在大量重复的包</li></ul><p>那yarn v2的解决方案是怎么样的呢。 当yarn已经知道关于你的依赖树的一切————甚至安装到磁盘上，这个时候就变成了包管理工具来告诉解释器，包在磁盘上的位置了，并且包A对包D的任何require调用都意味着解析为版本V？Plug&#39;n&#39;Play 就是从这个假设中诞生的。</p><p>当用这个模式安装（默认yarn2.0开始），yarn生成单个.<code>pnp.cjs</code>文件，而不再是传统的node_modules，该文件不包含已安装的包的源代码，而是.<code>pnp.cjs</code>包含各种映射： 一个将包名称和版本链接到它们磁盘上的位置，另一个将包名称和版本链接到它们的依赖项列表。同时还实现了resolveRequest方法处理require请求，该方法会直接根据映射表确定依赖在文件系统中的位置，从而避免了在node_modules查找依赖的 I/O 操作</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[
    &quot;A&quot;, new Map([
        [
            &quot;1.0.0&quot;, {
                packageLocation: path.resolve(__dirname, &quot;../../D@1.0.0&quot;),
                packageDependencies: new Map([
                    [&quot;F&quot;, &quot;1.0.0&quot;],
                    [&quot;H&quot;, &quot;1.0.0&quot;],
                ])
            }
        ]
    ])
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pnp模式优点：</p><ul><li>优点 <ol><li>摆脱了node_modules，安装、加载模块速度更快</li><li>所有的npm模块都会放在全局的缓存目录下，避免多重依赖</li><li>严格模式下子依赖不会提升，也避免了幽灵依赖</li></ol></li></ul>`,8),b=e("h2",{id:"pnpm",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#pnpm","aria-hidden":"true"},"#"),n(" pnpm")],-1),p=e("h2",{id:"cnpm-和-tnpm",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#cnpm-和-tnpm","aria-hidden":"true"},"#"),n(" cnpm 和 tnpm")],-1);function q(_,h){const d=l("ExternalLinkIcon");return a(),u("div",null,[c,e("p",null,[e("a",t,[n("yarn升级v2"),v(d)])]),m,r(` - 缺点
    自建的resolver处理node require方法，执行node文件需要yarn node解释器执行，需兼容性不太好 `),b,p])}const x=s(o,[["render",q],["__file","package-manage-contrast.html.vue"]]);export{x as default};
