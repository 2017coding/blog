## 声明式编程和命令式编程
命令式编程是一种描述计算机所需要做出的行为的编程典范。几乎所有计算机的硬件工作都是命令式的，大部分的编程语言都是命令式的。
声明式编程是一种编程范式。它描述目标的性质，让计算机明白目标，而非流程。
> 编程范式是编程语言背后的思想,要通过编程语言来体现

`声明式代码的性能不优于命令式代码的性能`
`声明式代码更利于维护，可维护性强`
框架设计上要做出关于可维护性和性能上的权衡：对于框架开发者而言，在保持可维护性的同时要让性能损失做到最小

## 虚拟dom的性能

### 创建

虚拟dom创建页面的过程分为两步：
1. 创建JavaScript对象，这个对象是基于真实dom的描述；
2. 递归遍历虚拟DOM树并创建真实DOM。

虚拟dom创建页面计算量：
创建JavaScript对象（vNode） + 创建所有DOM元素。

innerHTML创建页面计算量：
渲染HTML字符串 + 新建所有DOM元素

### 更新

innerHTML更新页面过程：
重新构建HTML字符串，重新设置DOM的innerHMTML属性。

虚拟DOM更新页面过程：
重新创建JavaScript对象（虚拟DOM树），然后对比新旧虚拟DOM，找出变化的元素并更新。

更新时的性能因素：
虚拟DOM：和数据量的变化有关
innerHTML：和HTML模版大小有关

## 运行时和编译时

设计框架可选择：
- 纯运行时
- 纯编译时
- 运行时 + 编译时



## 框架应该怎么输出构建产物

开发环境：需要必要的警告信息（通过tree-shaking处理）
生产环境：不包含警告信息

### 场景：希望在html引入后直接使用
```
<script src="js/vue.js"><script/>
<scirpt>
    const { createApp } = vue
</scirpt>
```

这个时候需要IIFE（立即执行函数），输出的产物则是：
```
(function () {
  // ...
}())
```

对比rollup.js的配置：
```
export default {
  input: 'src/main.js', // 入口文件
  output: {
    file: 'bundle.js', // 输出文件
    format: 'cjs' 输出类型 (amd, cjs, es, iife, umd, system)
  }
}
```

现在主流浏览器对原生ESM支持不错，所以现在用户也能直接引入ESM格式的资源，
can I use 可以看到兼容情况, 所以rollup.js 可以输出格式可以配置为: format: es













