# 设计
Vue.js 的源码都在 src 目录下，其目录结构如下：
```
|-- dist              # 构建目录
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
```
关于目录主要做了什么：
- `dist`：`rollup`构建目录，里面存放了所有`vue`构建后不同版本的文件。
- `flow`：Facebook出品的`Javascript`静态类型检查工具，`vue2.*`版本选择了`flow`来做静态检查，`vue3.*`版本则使用了`typeScript`来重写。
- `packages`：`vue`衍生其他`npm`包，在`vue`构建时自动从源码中生成并且始终和`vue.js`保持相同的版本，其中`vue-server-renderer`用于处理服务端渲染，`vue-template-compiler`在使用`.vue`文件开发的时候会使用到。
- `scripts`：`rollup`构建配置和构建简本，`vue.js`能够通过不同的环境构建不同版本的相关逻辑都通过该目录下的脚本实现。
- `src/compiler`：此目录包含了与`Vue.js`编译相关的代码，它包括：模板编译成 AST 抽象语法树、AST 抽象语法树优化和代码生成相关代码。编译的工作可以在构建时用`runtime-only`版本，借助w`ebpack`和`vue-loader`等工具或插件来进行编译。也可以在运行时，使用包含构建功能的`runtime + compiler`版本。显然，编译是一项比较消耗性能的工作，在日常的开发中，更推荐使用`runtime-only`的版本开发(体积也更小)，也就是通过`.vue`文件的形式开发
```
// 需要使用带编译的版本
new Vue({
  data: {
    msg: 'hello,world'
  }
  template: '<div>{{msg}}</div>'
})

// 不需要使用带编译的版本
new Vue({
  data: {
    msg: 'hello,world'
  },
  render (h) {
    return h('div', this.msg)
  }
})
```
- `src/core`：该目录包含了`Vue.js`的核心代码，包括：内置组件`keep-alive`、全局 API(`Vue.use、Vue.mixin和Vue.extend`等)、实例化、响应式相关、虚拟 DOM 和工具函数等
```
|-- core
|   |-- components      # 内助组件
|   |-- global-api      # 全局API
|   |-- instance        # 实例化
|   |-- observer        # 响应式
|   |-- util            # 工具函数
|   |-- vdom            # 虚拟DOM
```
- `src/platform`：`Vue2.0`提供了跨平台的能力，对比`React`中的`React Native`跨平台客户端，在`Vue2.0`中对应的跨平台就是`Weex`。
```
|-- platform
|   |-- web      # web浏览器端
|   |-- weex     # native客户端
```
- `src/server`：`Vue2.0`提供服务端渲染的能力，所有跟服务端渲染相关的代码都在`server`目录下，此部分代码主要运行在服务端，而非 Web 浏览器端。
- `src/sfc`：该目录主要将`.vue`文件解析成一个`JavaScript`对象。
- `src/shared`：该目录下存放了一些在 Web 浏览器端和服务端都会用到的共享代码。

