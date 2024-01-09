# 编译过程
vue
分为编译时 + 运行时 和 运行时，运行时需要依赖编译工具，编译时会损耗性能。
编译 template 生成 render

_render方法中调用render生成vnode

1. 初始$mount
2. 如果是template，则调用 complite 生成 render：1. parse生成ast 2. 优化ast节点树 标记静态节点 2. gen生成render code
3. 调用缓存好的$mount，里面会调用mountCompount: 1. 调用render方法生成vnode，调用_update方法挂在vnode，_update主要调用了-patch-,-patch-里面调用了createElement

-patch-做了什么




路由
路由切换，判断当前是hash还是history模式，然后做对应的逻辑处理。
渲染主要通过router-view组件渲染组件。
