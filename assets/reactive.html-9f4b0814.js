import{_ as s,M as l,p as a,q as r,R as i,t as e,N as v,a1 as n}from"./framework-69837a10.js";const t={},c=n('<h1 id="vue的响应式" tabindex="-1"><a class="header-anchor" href="#vue的响应式" aria-hidden="true">#</a> vue的响应式</h1><h2 id="响应式对象" tabindex="-1"><a class="header-anchor" href="#响应式对象" aria-hidden="true">#</a> 响应式对象</h2><h3 id="object-defineproperty" tabindex="-1"><a class="header-anchor" href="#object-defineproperty" aria-hidden="true">#</a> Object.defineProperty</h3><blockquote><p>Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象</p></blockquote>',4),u={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty",target:"_blank",rel:"noopener noreferrer"},o=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`
* obj 要定义的属性对象
* prop 要定义或者修改的属性
* descriptor 要定义或修改的属性描述符
* @return obj(被传递给函数的对象)
\`
Object.defineProperty(obj, prop, descriptor)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对象的属性" tabindex="-1"><a class="header-anchor" href="#对象的属性" aria-hidden="true">#</a> 对象的属性</h4><p>在JavaScript中，对象的属性分为两种类型：</p><ul><li>数据属性：包含的是一个数据值的位置，在这可以对数据值进行读写</li><li>访问器属性：不包含数据值，包含的是一对get和set方法，在读取访问器属性时，在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用 setter 并传入新值，这个函数负责决定如何处理数据</li></ul><p>这两种属性都是对象，它们共享以下可选键值（默认值是指在使用 Object.defineProperty() 定义属性时的默认值）：</p><ul><li>configurable：当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。 默认为 false</li><li>enumerable：当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。 默认为 false</li><li>writable：当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符 (en-US)改变。 默认为 false</li><li>value：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 默认为 undefined</li><li>get：在读取属性时调用的函数，默认为undefined</li><li>set：在写入属性时调用的函数，默认值为undefined</li></ul><p>描述符可拥有的键值：</p><table><thead><tr><th></th><th>configurable</th><th>enumerable</th><th>writable</th><th>value</th><th>get</th><th>set</th></tr></thead><tbody><tr><td>数据属性</td><td>y</td><td>y</td><td>y</td><td>y</td><td>n</td><td>n</td></tr><tr><td>访问器属性</td><td>y</td><td>y</td><td>n</td><td>n</td><td>y</td><td>y</td></tr></tbody></table><h4 id="使用defineproperty" tabindex="-1"><a class="header-anchor" href="#使用defineproperty" aria-hidden="true">#</a> 使用defineProperty</h4><p>使用defineProperty去监听一个对象的属性变化：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const obj = { name: &#39;hi&#39; }
var newName = obj.name
Object.defineProperty(obj, &#39;name&#39;, {
    get: function() {
        return newName
    },
    set: function(newVal) {
        console.log(&#39;name变化为&#39;, newName, &#39;-&gt;&#39;, newVal);
        newName = newVal
    }
})

obj.name = 12 // console.log =&gt;  name变化为 hi -&gt; 12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由上我们可以去升级一下，模拟监听vue中的data：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const data = {
    name: &#39;vue&#39;,
    list: [1, 2, 3],
    options: {
        props: { value: &#39;attrs&#39; },
        methods: {
            init: () =&gt; {},
            getData: () =&gt; {},
        }
    }
}

observe(data)

function observe (data) {
    if (!data || typeof data !== &#39;object&#39;) return
    Object.keys(data).forEach(key =&gt; {
        defineReactive(data, key, data[key])
    })
}

function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get () {
            return val
        },
        set (newVal) {
            console.log(key, &#39;由&#39;, val ,&#39;变化为&#39;, newVal)
            val = newVal
        }
    })
}

data.list[3] = 9 // 无consolo.log
data.list = [1, 2, 3, 4] // console.log =&gt; list 由 [1, 2, 3] 变化为 [1, 2, 3, 4]
data.name = &#39;vue3.0&#39; // console.log =&gt; name 由 vue 变化为 vue3.0
data.newName = &#39;vue4.0&#39; // 无consolo.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到，通过defineProperty去循环对象，我们就实现了基本的数据绑定，但是同时也存在几个问题：</p><ol><li>数组的下标发生改变不会触发 defineProperty 的 set 方法</li><li>对象新增的属性不会触发 defineProperty 的 set 方法</li></ol><p>解决方案有：</p><ol><li>官方提供的 $set 方法，原理是会重新调用一遍 defineReactive 去监听 当前设置的 key</li><li>重新设置 data 中的key，比如 data.list = [1, 2], 也会重新触发 defineReactive</li><li>vue3.0 通过proxy解决该问题</li></ol><h3 id="vue是怎么做的" tabindex="-1"><a class="header-anchor" href="#vue是怎么做的" aria-hidden="true">#</a> vue是怎么做的</h3><p>在 Vue 的初始化阶段，_init 方法执行的时候，会执行 initState(vm) 方法，代码在 <code>/src/core/instance/state.js</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段初始化了<code>props</code>，<code>methods</code>，<code>data</code>，<code>computed</code>，<code>watch</code>，其中<code>props</code>，<code>data</code>是响应式数据，而<code>computed</code>，<code>watch</code>是基于<code>props</code>，<code>data</code>的改变才会触发，这里先主要分析<code>props</code>和<code>data</code>。</p><h4 id="initdata" tabindex="-1"><a class="header-anchor" href="#initdata" aria-hidden="true">#</a> initData</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === &#39;function&#39;
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
      &#39;data functions should return an object:\\n&#39; +
      &#39;https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function&#39;,
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39;) {
      if (methods &amp;&amp; hasOwn(methods, key)) {
        warn(
          \`Method &quot;\${key}&quot; has already been defined as a data property.\`,
          vm
        )
      }
    }
    if (props &amp;&amp; hasOwn(props, key)) {
      p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
        \`The data property &quot;\${key}&quot; is already declared as a prop. \` +
        \`Use prop default value instead.\`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, \`_data\`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里主要做了几个事情：</p><ol><li>获取到data</li><li>当data不是对象需要设置为对象，在开发环境提示报错信息</li><li>遍历所有的data，如果key在props或者methods中存在提示报错信息</li><li>当属性的前缀不是 <code>$</code>或者<code>_</code>，将这个属性代理到<code>vm</code>实例上</li><li>通过 <code>observe</code>监听数据</li></ol><h4 id="initprops" tabindex="-1"><a class="header-anchor" href="#initprops" aria-hidden="true">#</a> initProps</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false)
  }
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39;) {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          \`&quot;\${hyphenatedKey}&quot; is a reserved attribute and cannot be used as component prop.\`,
          vm
        )
      }
      defineReactive(props, key, value, () =&gt; {
        if (!isRoot &amp;&amp; !isUpdatingChildComponent) {
          warn(
            \`Avoid mutating a prop directly since the value will be \` +
            \`overwritten whenever the parent component re-renders. \` +
            \`Instead, use a data or computed property based on the prop&#39;s \` +
            \`value. Prop being mutated: &quot;\${key}&quot;\`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    // static props are already proxied on the component&#39;s prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, \`_props\`, key)
    }
  }
  toggleObserving(true)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里主要做了几个事情：</p><ol><li>根结点关闭数据监听</li><li>循环props，里面做了这些事情 <ol><li>设置 <code>$options._propKeys</code></li><li>验证<code>props</code></li><li>检测给定字符串是否是内置的属性，是的话提示不能作为<code>props</code></li><li>通过 <code>defineReactive</code> 监听数据</li><li>当属性的前缀不是 <code>$</code>或者<code>_</code>，将这个属性代理到<code>vm</code>实例上</li></ol></li><li>开启数据监听</li></ol><h4 id="observer-observe-definereactive" tabindex="-1"><a class="header-anchor" href="#observer-observe-definereactive" aria-hidden="true">#</a> Observer，observe，defineReactive</h4><p>通过上面得到了，<code>props</code>和<code>data</code>是通过<code>defineReactive</code>和<code>observe</code>来做的，来看看这两个方法具体做了什么事情，代码在<code>src/core/observer/index.js</code>：</p><h5 id="observe" tabindex="-1"><a class="header-anchor" href="#observe" aria-hidden="true">#</a> observe</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, &#39;__ob__&#39;) &amp;&amp; value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &amp;&amp;
    !isServerRendering() &amp;&amp;
    (Array.isArray(value) || isPlainObject(value)) &amp;&amp;
    Object.isExtensible(value) &amp;&amp;
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData &amp;&amp; ob) {
    ob.vmCount++
  }
  return ob
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码做了几件事情：</p><ol><li>不是对象或者已经是VNode对象的数据不做处理</li><li>当前数据存在__ob__属性并且该属性是Observer的实例需要单独处理；如果不是，满足条件下去实例化一个 Observer 对象实例</li><li>是root节点数据并且ob成功创建的情况下，增加vmCount</li></ol><h5 id="definereactive" tabindex="-1"><a class="header-anchor" href="#definereactive" aria-hidden="true">#</a> defineReactive</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property &amp;&amp; property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property &amp;&amp; property.get
  const setter = property &amp;&amp; property.set
  if ((!getter || setter) &amp;&amp; arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow &amp;&amp; observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter &amp;&amp; !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow &amp;&amp; observe(newVal)
      dep.notify()
    }
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码做了几件事情：</p><ol><li>初始化一个 Dep(下文会详细解读这个的作用)</li><li>获取当前对象要监听属性的configurable，如果该属性设置为false，则不能修改当前属性的描述符，直接retyrn</li><li>当前没有设置val情况下，设置val为 obj[key]</li><li>shallow为true(需要深度监听)，则循环调用observe，使得对象下的属性都是Observer的实例</li><li>使用Object.defineProperty监听对象，并且做了这些事情： <ul><li>get的时候 <ol><li>获取到值并返回</li><li>当前Dep的目标存在，则收集依赖</li></ol></li><li>set的时候 <ol><li>获取到当前val，对比和设置的val一样或者值为NaN的时候直接不做处理</li><li>开发环境下存在自定义set方法，会调用自定义set方法(基本都是vue对开发环境的一些warn处理)</li><li>设置新的val</li><li>shallow为true(需要深度监听)，调用observe，使该属性是Observer的实例</li><li>调用dep.notify</li></ol></li></ul></li></ol><h5 id="observer" tabindex="-1"><a class="header-anchor" href="#observer" aria-hidden="true">#</a> Observer</h5><p>上面分析了<code>observe</code>和<code>defineReactive</code>，它们之前存在这样的关系：</p><ul><li>满足条件下，observe 返回已经 Observer的实例</li><li>满足条件下，defineReactive 的 get set 调用 满足条件下，observe</li></ul><p>那我们来看看 <code>Observer</code> 又主要做了什么：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, &#39;__ob__&#39;, this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /\`
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i &lt; keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /\`
   * Observe a list of Array items.
   */
  observeArray (items: Array&lt;any&gt;) {
    for (let i = 0, l = items.length; i &lt; l; i++) {
      observe(items[i])
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码做了几件事情：</p><ol><li>实例化dep对象</li><li>通过执行 def 函数把自身实例添加到数据对象 value 的 <strong>ob</strong> 属性上</li><li>数组数据：处理__proto__，循环调用 observe</li><li>非数组数据：调用 defineReactive 监听数据</li></ol><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>关于响应式数据，vue做了这些事情：</p><ol><li>初始化执行initState 初始化 <code>data</code> 和 <code>props</code></li><li>初始化<code>data</code>和<code>props</code>的时候调用了<code>observe</code>和<code>defineReactive</code>，不管调用的哪个最终都会调用<code>defineReactive</code>来完成数据的监听</li></ol><p>但同时存在几个问题：</p><ol><li>vue中的data 和 props，除了getter的时候可以获取到，watch和computed也可以监听到，这是怎么实现的？</li><li>dep是什么？为什么defineReactive和Observer中能看见它的身影?</li></ol><h2 id="watch和computed" tabindex="-1"><a class="header-anchor" href="#watch和computed" aria-hidden="true">#</a> watch和computed</h2><p>现在已经知道了响应式数据是怎么做到了，其实很容易联想到watch和computed的实现。 我们先思考一下watch和computed做了什么事情：</p><ul><li>watch 监听data和props的数据变化，然后调用我们设置的方法。那是不是意味着，在数据set的时候去调用当前watch的key，然后调用对应的方法就行了？</li><li>computed 监听当前computed方法返回的值的变化，当值发生变化则computed返回最新的值。那它可能会是这样实现的，watch到compounted的数据变化并返回回来？</li></ul><p>但是上面看了vue的实现，set和get的时候并没有看到watch的相关实现，带着这个问题我们往下看。</p><h3 id="dep" tabindex="-1"><a class="header-anchor" href="#dep" aria-hidden="true">#</a> dep</h3><p>先来看看dep在数据响应中用到的地方：</p><ol><li>Observer：将Dep实例挂载到dep属性上，同时将自身实例添加到数据对象 value 的 <strong>ob</strong> 属性上</li><li>defineReactive：get的时候满足条件触发了 dep.depend() 方法，set的时候触发dep.notify()</li></ol><p>再来看看dep，看看它做了什么事情，代码在<code>src/core/observer/dep.js</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let uid = 0
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array&lt;Watcher&gt;;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; !config.async) {
      // subs aren&#39;t sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) =&gt; a.id - b.id)
    }
    for (let i = 0, l = subs.length; i &lt; l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>初始化设置了一个唯一的id，设置了一个subs订阅列表</li><li>addSub： <ul><li>做了什么：每次调用该方法，会往里面添加一条watcher</li><li>触发时机：调用watcher的<code>addDep</code></li></ul></li><li>removeSub： <ul><li>做了什么：删除一条watcher</li><li>触发时机： <ol><li>watcher调用<code>teardown</code></li><li>watcher调用<code>cleanupDeps</code></li></ol></li></ul></li><li>depend： <ul><li>做了什么：如果当前dep的target存在，调用它的addDep方法</li><li>触发时机： <ol><li>watcher调用<code>depend</code></li><li>Object.defineProperty的<code>get</code></li></ol></li></ul></li><li>notify： <ul><li>做了什么：开发环境下，如果不是异步需要排序，同时会调用每一个watcher的update方法</li><li>触发时机：数据发生改变的时候 <ol><li>Object.defineProperty的<code>set</code></li><li>调用 <code>$del</code></li></ol></li></ul></li></ul><p>从这些代码可以看出，dep其实是对watcher的管理，负责收集watcher以及派发watcher的更新，所以要弄明白问题所在我们还需要看water的实现。</p><h3 id="watcher" tabindex="-1"><a class="header-anchor" href="#watcher" aria-hidden="true">#</a> watcher</h3><p>watcher源码在<code>src/core/observer/watcher.js</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let uid = 0
export default class Watcher {
  vm: Component; // 当前上下文
  expression: string; // 表达式
  cb: Function; // 回调函数
  id: number; //
  deep: boolean; // 是否深度监听
  user: boolean; // 标志位
  lazy: boolean; // computed中传入该参数
  sync: boolean; // 是否同步
  dirty: boolean; //
  active: boolean; // 是否处于激活状态
  deps: Array&lt;Dep&gt;; // 订阅列表
  newDeps: Array&lt;Dep&gt;; // 新订阅列表
  depIds: SimpleSet; // 订阅id设置
  newDepIds: SimpleSet; // 新订阅id设置
  before: ?Function; // 钩子
  getter: Function; // getter
  value: any; // watch返回的值

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = p<wbr>rocess.env.NODE_ENV !== &#39;production&#39;
      ? expOrFn.toString()
      : &#39;&#39;
    // parse expression for getter
    if (typeof expOrFn === &#39;function&#39;) {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
          \`Failed watching path: &quot;\${expOrFn}&quot; \` +
          &#39;Watcher only accepts simple dot-delimited paths. &#39; +
          &#39;For full control, use a function instead.&#39;,
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /\`
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, \`getter for watcher &quot;\${this.expression}&quot;\`)
      } else {
        throw e
      }
    } finally {
      // &quot;touch&quot; every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /\`
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /\`
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /\`
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  /\`
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          const info = \`callback for watcher &quot;\${this.expression}&quot;\`
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info)
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /\`
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /\`
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /\`
   * Remove self from all dependencies&#39; subscriber list.
   */
  teardown () {
    if (this.active) {
      // remove self from vm&#39;s watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>初始化： <ol><li>满足条件设置 vm._watcher</li><li>维护vm._watchers</li><li>设置this.deep，this.user，this.lazy，this.sync等参数</li><li>设置this.cb，当watch到数据改变的时候需要用到</li><li>设置this.id作为watcher的唯一标识</li><li>设置this.active为true，run和teardown方法中需要这个参数</li><li>设置this.dirty，computed中需要该参数，代码在<code>src/core/instance/state.js</code>的<code>createComputedGetter</code>中</li><li>设置this.deps 和 this.newDeps等dep相关参数</li><li>设置this.expression 主要用来开发环境的报错</li><li>设置this.getter方法，</li><li>设置watch的value</li></ol></li><li>get： <ul><li>做了什么： <ol><li>调用<code>pushTarget(this)</code>，这里主要为了将<code>Dep.target</code> 赋值为当前的渲染 watcher 并压入栈中</li><li>执行<code>getter</code>方法获取到value，这这个过程中会对 vm 上的数据访问，触发了数据对象的 getter，getter里面会触发Dep.depend，进行依赖收集</li><li><code>this.deep</code>为true，递归去访问 value，触发它所有子项的 getter</li><li>调用<code>popTarget()</code>，把 Dep.target 恢复成上一个状态，因为当前 vm 的数据依赖收集已经完成，那么对应的渲染Dep.target 也需要改变。</li><li>调用 <code>cleanupDeps</code> 方法清除依赖</li></ol></li><li>触发时机： <ol><li>watcher初始化的时候</li><li>update后</li><li>computed求值的时候</li></ol></li></ul></li><li>addDep： <ul><li>做了什么：判断new dep 和 dep是否已经存在当前watcher，不存在则添加进去</li><li>触发时机： 在 Object.defineProperty的getter中添加依赖，代码在<code>src/core/observer/index.js</code>中，这里会触发<code>dep</code>的depend方法. 该方法调用<code>Dep.target.addDep</code>，也就是watcher的addDep方法</li></ul></li><li>cleanupDeps： <ul><li>做了什么： <ol><li>清除当前订阅</li><li>把new dep和dep交换</li><li>清除new dep</li></ol></li><li>触发时机：调用watcher的get中</li></ul></li><li>update： <ul><li>做了什么 <ol><li>判断是否是lazy，是的话则修改dirty</li><li>当前是同步，则执行 run方法</li><li>执行queueWatcher方法，将监听到的变化变成队列处理</li></ol></li><li>触发时机： <ol><li><code>$forceUpdate</code>被调用，代码在<code>src/core/instance/lifecycle.js</code></li><li><code>dep</code>的notify方法触发，代码在<code>src/core/observer/dep.js</code></li></ol></li></ul></li><li>run： <ul><li>做了什么：满足条件后执行对应的cb</li><li>触发时机：调用watcher的update后</li></ul></li><li>evaluate： <ul><li>做了什么：设置 value，修改dirty</li><li>触发时机：<code>createComputedGetter</code>创建计算属性的时候，代码在<code>src/core/instance/state.js</code></li></ul></li><li>depend： <ul><li>做了什么：循环deps，并触发每次dep下的depend方法，该方法最后会调用 watcher下的 addDep</li><li>触发时机：<code>createComputedGetter</code>创建计算属性的时候，代码在<code>src/core/instance/state.js</code></li></ul></li><li>teardown： <ul><li>做了什么：处理watcher，移除dep</li><li>触发时机： <ol><li><code>$destroy</code>的 destroy，beforeDestroy后，destroyed前，代码在<code>src/core/instance/lifecycle.js</code></li><li><code>$watch</code>的unwatchFn，但是没有调用场景，代码在<code>src/core/instance/state.js</code></li></ol></li></ul></li></ul><h3 id="computed" tabindex="-1"><a class="header-anchor" href="#computed" aria-hidden="true">#</a> computed</h3><p>computed的实现逻辑主要在<code>src/core/instance/state.js</code>中，主要看下面几个函数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === &#39;function&#39; ? userDef : userDef.get
    if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; getter == null) {
      warn(
        \`Getter is missing for computed property &quot;\${key}&quot;.\`,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39;) {
      if (key in vm.$data) {
        warn(\`The computed property &quot;\${key}&quot; is already defined in data.\`, vm)
      } else if (vm.$options.props &amp;&amp; key in vm.$options.props) {
        warn(\`The computed property &quot;\${key}&quot; is already defined as a prop.\`, vm)
      } else if (vm.$options.methods &amp;&amp; key in vm.$options.methods) {
        warn(\`The computed property &quot;\${key}&quot; is already defined as a method.\`, vm)
      }
    }
  }
}

export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === &#39;function&#39;) {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache &amp;&amp; userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp;
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        \`Computed property &quot;\${key}&quot; was assigned to but it has no setter.\`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>initComputed</p><ol><li>初始化vm._computedWatchers</li><li>得到computed的get方法</li><li>watch监听computed的值</li><li>调用<code>defineComputed</code></li></ol></li><li><p>defineComputed</p><ol><li>设置当前key的get set方法，get方法根据用户当前设置的get或者调用 <code>createComputedGetter</code></li><li>调用<code>Object.defineProperty</code>监听当前值变化</li></ol></li><li><p>createComputedGetter</p><ol><li>数据更新的时候，触发watcher.dirty为true，调用watcher的evaluate重置dirty，并重新计算watcher的value</li><li>初始化的时候添加对当前数据的订阅</li></ol></li></ul><p>通过上面可以发现，computed的实现主要包括几步：</p><ol><li>初始化一个懒加载的watcher监听器</li><li>在computed的get中设置一个watcher的求值逻辑，返回最新的数据</li></ol><p>当computed里面计算的响应式数据发生改变后，会触发dep的notice方法，这个时候会通知给所有订阅数据，从而去执行watcher的update方法，设置watcher.dirty为true，这个时候重新获取computed就会得到最新的值。</p><h2 id="整个流程" tabindex="-1"><a class="header-anchor" href="#整个流程" aria-hidden="true">#</a> 整个流程</h2><ol><li>observe，主要实现了对数据的监听。</li></ol><p>这个过程主要做了：</p><ul><li>get的时候通过dep给所有数据添加依赖，通过dep的depend</li><li>set的时候通知dep数据变化，通过dep的notify</li></ul><ol start="2"><li>dep，主要维护了watcher的订阅。</li></ol><p>初始化的时候，当watcher初始化的时候设置dep.target，同时获取value, 这个时候会触发当前被监听数据的getter方法从而调用dep的depend。 dep的depend通过调用当前watcher的addDep方法，设置了watcher中的new Dep相关数据，并且调用了dep的addSub将当前watcher添加到了订阅列表中。 数据更新的时候，数据的setter会调用dep的notice，区调用watcher的update方法从而触发cb。</p><p>总结来说，就是数据发生getter的时候，往订阅列表里面添加一条对当前数据的watcher，数据发生setter的时候通知对应的数据</p><ol start="3"><li>watcher，主要做的是observe和dep之间的桥梁，初始化获取watcher的value触发getter，提供给dep添加订阅的方法，提供给dep调用的update方法，自身清除订阅的方法。</li></ol>`,81);function m(b,p){const d=l("ExternalLinkIcon");return a(),r("div",null,[c,i("p",null,[e("示例，"),i("a",u,[e("点这个看该函数详细文档"),v(d)]),e("：")]),o])}const f=s(t,[["render",m],["__file","reactive.html.vue"]]);export{f as default};
