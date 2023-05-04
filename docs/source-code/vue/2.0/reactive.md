# vue的响应式（vue2.x）

## 响应式对象
### Object.defineProperty
> Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

示例，[点这个看该函数详细文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)：
```
`
* obj 要定义的属性对象
* prop 要定义或者修改的属性
* descriptor 要定义或修改的属性描述符
* @return obj(被传递给函数的对象)
`
Object.defineProperty(obj, prop, descriptor)
```

#### 对象的属性
在JavaScript中，对象的属性分为两种类型：
- 数据属性：包含的是一个数据值的位置，在这可以对数据值进行读写
- 访问器属性：不包含数据值，包含的是一对get和set方法，在读取访问器属性时，在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用 setter 并传入新值，这个函数负责决定如何处理数据

这两种属性都是对象，它们共享以下可选键值（默认值是指在使用 Object.defineProperty() 定义属性时的默认值）：
- configurable：当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。 默认为 false
- enumerable：当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。 默认为 false
- writable：当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符 (en-US)改变。 默认为 false
- value：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 默认为 undefined
- get：在读取属性时调用的函数，默认为undefined
- set：在写入属性时调用的函数，默认值为undefined

描述符可拥有的键值：
|          | configurable | enumerable   | writable | value   | get | set  |
| -------- | -----------  | --------     | -------- | ------- | --- |----- |
| 数据属性   | y           |           y   | y        | y       | n  | n     |
| 访问器属性 | y            |          y   | n        | n       | y   | y     |

#### 使用defineProperty
使用defineProperty去监听一个对象的属性变化：
```
const obj = { name: 'hi' }
var newName = obj.name
Object.defineProperty(obj, 'name', {
    get: function() {
        return newName
    },
    set: function(newVal) {
        console.log('name变化为', newName, '->', newVal);
        newName = newVal
    }
})

obj.name = 12 // console.log =>  name变化为 hi -> 12
```

由上我们可以去升级一下，模拟监听vue中的data：
```
const data = {
    name: 'vue',
    list: [1, 2, 3],
    options: {
        props: { value: 'attrs' },
        methods: {
            init: () => {},
            getData: () => {},
        }
    }
}

observe(data)

function observe (data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
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
            console.log(key, '由', val ,'变化为', newVal)
            val = newVal
        }
    })
}

data.list[3] = 9 // 无consolo.log
data.list = [1, 2, 3, 4] // console.log => list 由 [1, 2, 3] 变化为 [1, 2, 3, 4]
data.name = 'vue3.0' // console.log => name 由 vue 变化为 vue3.0
data.newName = 'vue4.0' // 无consolo.log
```

从上面可以看到，通过defineProperty去循环对象，我们就实现了基本的数据绑定，但是同时也存在几个问题：
1. 数组的下标发生改变不会触发 defineProperty 的 set 方法
2. 对象新增的属性不会触发 defineProperty 的 set 方法

解决方案有：
1. 官方提供的 $set 方法，原理是会重新调用一遍 defineReactive 去监听 当前设置的 key
2. 重新设置 data 中的key，比如 data.list = [1, 2], 也会重新触发 defineReactive
3. vue3.0 通过proxy解决该问题

### vue是怎么做的
在 Vue 的初始化阶段，_init 方法执行的时候，会执行 initState(vm) 方法，代码在 `/src/core/instance/state.js`：
```
export function initState (vm: Component) {
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
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
这段初始化了`props`，`methods`，`data`，`computed`，`watch`，其中`props`，`data`是响应式数据，而`computed`，`watch`是基于`props`，`data`的改变才会触发，这里先主要分析`props`和`data`。

#### initData
```
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
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
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```
这里主要做了几个事情：
1. 获取到data
2. 当data不是对象需要设置为对象，在开发环境提示报错信息
3. 遍历所有的data，如果key在props或者methods中存在提示报错信息
4. 当属性的前缀不是 `$`或者`_`，将这个属性代理到`vm`实例上
5. 通过 `observe`监听数据

#### initProps
```
function initProps (vm: Component, propsOptions: Object) {
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
    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwritten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}
```
这里主要做了几个事情：
1. 根结点关闭数据监听
2. 循环props，里面做了这些事情
    1. 设置 `$options._propKeys`
    2. 验证`props`
    3. 检测给定字符串是否是内置的属性，是的话提示不能作为`props`
    4. 通过 `defineReactive` 监听数据
    5. 当属性的前缀不是 `$`或者`_`，将这个属性代理到`vm`实例上
3. 开启数据监听

#### Observer，observe，defineReactive
通过上面得到了，`props`和`data`是通过`defineReactive`和`observe`来做的，来看看这两个方法具体做了什么事情，代码在`src/core/observer/index.js`：
##### observe
```
export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```
上面代码做了几件事情：
1. 不是对象或者已经是VNode对象的数据不做处理
2. 当前数据存在__ob__属性并且该属性是Observer的实例需要单独处理；如果不是，满足条件下去实例化一个 Observer 对象实例
3. 是root节点数据并且ob成功创建的情况下，增加vmCount

##### defineReactive
```
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
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
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```
上面代码做了几件事情：
1. 初始化一个 Dep(下文会详细解读这个的作用)
2. 获取当前对象要监听属性的configurable，如果该属性设置为false，则不能修改当前属性的描述符，直接retyrn
3. 当前没有设置val情况下，设置val为 obj[key]
4. shallow为true(需要深度监听)，则循环调用observe，使得对象下的属性都是Observer的实例
5. 使用Object.defineProperty监听对象，并且做了这些事情：
    - get的时候
      1. 获取到值并返回
      2. 当前Dep的目标存在，则收集依赖
    - set的时候
      1. 获取到当前val，对比和设置的val一样或者值为NaN的时候直接不做处理
      2. 开发环境下存在自定义set方法，会调用自定义set方法(基本都是vue对开发环境的一些warn处理)
      3. 设置新的val
      4. shallow为true(需要深度监听)，调用observe，使该属性是Observer的实例
      5. 调用dep.notify

##### Observer
上面分析了`observe`和`defineReactive`，它们之前存在这样的关系：
- 满足条件下，observe 返回已经 Observer的实例
- 满足条件下，defineReactive 的 get set 调用 满足条件下，observe

那我们来看看 `Observer` 又主要做了什么：
```
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
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

  /`
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /`
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```
上面代码做了几件事情：
1. 实例化dep对象
2. 通过执行 def 函数把自身实例添加到数据对象 value 的 __ob__ 属性上
3. 数组数据：处理__proto__，循环调用 observe
4. 非数组数据：调用 defineReactive 监听数据



### 总结
关于响应式数据，vue做了这些事情：
1. 初始化执行initState 初始化 `data` 和 `props`
2. 初始化`data`和`props`的时候调用了`observe`和`defineReactive`，不管调用的哪个最终都会调用`defineReactive`来完成数据的监听

但同时存在几个问题：
1. vue中的data 和 props，除了getter的时候可以获取到，watch和computed也可以监听到，这是怎么实现的？
2. dep是什么？为什么defineReactive和Observer中能看见它的身影?


## watch和computed
现在已经知道了响应式数据是怎么做到了，其实很容易联想到watch和computed的实现。
我们先思考一下watch和computed做了什么事情：
- watch
  监听data和props的数据变化，然后调用我们设置的方法。那是不是意味着，在数据set的时候去调用当前watch的key，然后调用对应的方法就行了？
- computed
  监听当前computed方法返回的值的变化，当值发生变化则computed返回最新的值。那它可能会是这样实现的，watch到compounted的数据变化并返回回来？

但是上面看了vue的实现，set和get的时候并没有看到watch的相关实现，带着这个问题我们往下看。
### dep
先来看看dep在数据响应中用到的地方：
1. Observer：将Dep实例挂载到dep属性上，同时将自身实例添加到数据对象 value 的 __ob__ 属性上
2. defineReactive：get的时候满足条件触发了 dep.depend() 方法，set的时候触发dep.notify()

再来看看dep，看看它做了什么事情，代码在`src/core/observer/dep.js`：
```
let uid = 0
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

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
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
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
```
- 初始化设置了一个唯一的id，设置了一个subs订阅列表
- addSub：
  - 做了什么：每次调用该方法，会往里面添加一条watcher
  - 触发时机：调用watcher的`addDep`
- removeSub：
  - 做了什么：删除一条watcher
  - 触发时机：
    1. watcher调用`teardown`
    2. watcher调用`cleanupDeps`
- depend：
  - 做了什么：如果当前dep的target存在，调用它的addDep方法
  - 触发时机：
    1. watcher调用`depend`
    2. Object.defineProperty的`get`
- notify：
  - 做了什么：开发环境下，如果不是异步需要排序，同时会调用每一个watcher的update方法
  - 触发时机：数据发生改变的时候
    1. Object.defineProperty的`set`
    2. 调用 `$del`

从这些代码可以看出，dep其实是对watcher的管理，负责收集watcher以及派发watcher的更新，所以要弄明白问题所在我们还需要看water的实现。

### watcher
watcher源码在`src/core/observer/watcher.js`：
```
let uid = 0
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
  deps: Array<Dep>; // 订阅列表
  newDeps: Array<Dep>; // 新订阅列表
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
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /`
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
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /`
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

  /`
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

  /`
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

  /`
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
          const info = `callback for watcher "${this.expression}"`
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info)
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /`
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /`
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /`
   * Remove self from all dependencies' subscriber list.
   */
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
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
```
- 初始化：
  1. 满足条件设置 vm._watcher
  2. 维护vm._watchers
  3. 设置this.deep，this.user，this.lazy，this.sync等参数
  4. 设置this.cb，当watch到数据改变的时候需要用到
  5. 设置this.id作为watcher的唯一标识
  6. 设置this.active为true，run和teardown方法中需要这个参数
  7. 设置this.dirty，computed中需要该参数，代码在`src/core/instance/state.js`的`createComputedGetter`中
  8. 设置this.deps 和 this.newDeps等dep相关参数
  9. 设置this.expression 主要用来开发环境的报错
  10. 设置this.getter方法，
  11. 设置watch的value
- get：
  - 做了什么：
    1. 调用`pushTarget(this)`，这里主要为了将`Dep.target` 赋值为当前的渲染 watcher 并压入栈中
    2. 执行`getter`方法获取到value，这这个过程中会对 vm 上的数据访问，触发了数据对象的 getter，getter里面会触发Dep.depend，进行依赖收集
    3. `this.deep`为true，递归去访问 value，触发它所有子项的 getter
    4. 调用`popTarget()`，把 Dep.target 恢复成上一个状态，因为当前 vm 的数据依赖收集已经完成，那么对应的渲染Dep.target 也需要改变。
    5. 调用 `cleanupDeps` 方法清除依赖
  - 触发时机：
    1. watcher初始化的时候
    2. update后
    3. computed求值的时候
- addDep：
  - 做了什么：判断new dep 和 dep是否已经存在当前watcher，不存在则添加进去
  - 触发时机：
    在 Object.defineProperty的getter中添加依赖，代码在`src/core/observer/index.js`中，这里会触发`dep`的depend方法.
    该方法调用`Dep.target.addDep`，也就是watcher的addDep方法
- cleanupDeps：
  - 做了什么：
    1. 清除当前订阅
    2. 把new dep和dep交换
    3. 清除new dep
  - 触发时机：调用watcher的get中
- update：
  - 做了什么
    1. 判断是否是lazy，是的话则修改dirty
    2. 当前是同步，则执行 run方法
    3. 执行queueWatcher方法，将监听到的变化变成队列处理
  - 触发时机：
    1. `$forceUpdate`被调用，代码在`src/core/instance/lifecycle.js`
    2. `dep`的notify方法触发，代码在`src/core/observer/dep.js`
- run：
  - 做了什么：满足条件后执行对应的cb
  - 触发时机：调用watcher的update后
- evaluate：
  - 做了什么：设置 value，修改dirty
  - 触发时机：`createComputedGetter`创建计算属性的时候，代码在`src/core/instance/state.js`
- depend：
  - 做了什么：循环deps，并触发每次dep下的depend方法，该方法最后会调用 watcher下的 addDep
  - 触发时机：`createComputedGetter`创建计算属性的时候，代码在`src/core/instance/state.js`
- teardown：
    - 做了什么：处理watcher，移除dep
    - 触发时机：
      1. `$destroy`的 destroy，beforeDestroy后，destroyed前，代码在`src/core/instance/lifecycle.js`
      2. `$watch`的unwatchFn，但是没有调用场景，代码在`src/core/instance/state.js`

### computed
computed的实现逻辑主要在`src/core/instance/state.js`中，主要看下面几个函数：
```
function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
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
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn(`The computed property "${key}" is already defined as a method.`, vm)
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
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
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
```
- initComputed
  1. 初始化vm._computedWatchers
  2. 得到computed的get方法
  3. watch监听computed的值
  4. 调用`defineComputed`

- defineComputed
  1. 设置当前key的get set方法，get方法根据用户当前设置的get或者调用 `createComputedGetter`
  2. 调用`Object.defineProperty`监听当前值变化

- createComputedGetter
  1. 数据更新的时候，触发watcher.dirty为true，调用watcher的evaluate重置dirty，并重新计算watcher的value
  2. 初始化的时候添加对当前数据的订阅

通过上面可以发现，computed的实现主要包括几步：
1. 初始化一个懒加载的watcher监听器
2. 在computed的get中设置一个watcher的求值逻辑，返回最新的数据

当computed里面计算的响应式数据发生改变后，会触发dep的notice方法，这个时候会通知给所有订阅数据，从而去执行watcher的update方法，设置watcher.dirty为true，这个时候重新获取computed就会得到最新的值。


## 整个流程

1. observe，主要实现了对数据的监听。

  这个过程主要做了：
  - get的时候通过dep给所有数据添加依赖，通过dep的depend
  - set的时候通知dep数据变化，通过dep的notify

2. dep，主要维护了watcher的订阅。

  初始化的时候，当watcher初始化的时候设置dep.target，同时获取value, 这个时候会触发当前被监听数据的getter方法从而调用dep的depend。
  dep的depend通过调用当前watcher的addDep方法，设置了watcher中的new Dep相关数据，并且调用了dep的addSub将当前watcher添加到了订阅列表中。
  数据更新的时候，数据的setter会调用dep的notice，区调用watcher的update方法从而触发cb。

  总结来说，就是数据发生getter的时候，往订阅列表里面添加一条对当前数据的watcher，数据发生setter的时候通知对应的数据

3. watcher，主要做的是observe和dep之间的桥梁，初始化获取watcher的value触发getter，提供给dep添加订阅的方法，提供给dep调用的update方法，自身清除订阅的方法。



