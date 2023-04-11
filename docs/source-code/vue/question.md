- pushTarget popTarget

- callHook怎么触发的生命周期

- defineReactive做了哪些事情

- mark 函数

- measure函数

- isReserved 
    函数通过判断一个字符串的第一个字符是不是 $ 或_来决定其是否是保留的
- _render 做了什么事情

- setActiveInstance

- createElm 

- _update 做了什么事情
    1. 设置当前激活的vm const restoreActiveInstance = setActiveInstance(vm)
    2. 第一次执行 vnode 不存在，这个时候会触发 __patch__ 挂载 vnode
    3. prevVnode存在，则传入 prevVnode 和 当前 vNode
    4. restoreActiveInstance()

- __patch__ 做了什么事情
    1. 如果vnode不存在，则当前不需要做dom比对，对当前oldVnode做标记 invokeDestroyHook
    2. 如果 __patch__ 传入空，这个时候会

- mountComponent做了什么事情
    1. callHook(vm, 'beforeMount')
    2. 设置 updateComponent，该方法中的 _update 会将 $el __patch__ 到vm上
    3. 监听component，改变时候派发 callHook(vm, 'beforeUpdate')
    4. $vode == null时 触发 callHook(vm, 'mounted')

- $mount
    1. 原先的 $mount，只触发 mountComponent
    2. 重写后的 $mount
        1. 获取到el
        2. 当前如果不是render模式则需要获取到 template
            1. template存在
                1. template是string，看看能不能找到对应的ID，找不到直接提示错误
                2. 如果不是string并且nodeType存在，则template为当前node的innerHTML
                3. 都不存在则报错提升
            2. 如果template不存在，但是el存在，则template为el里面的内容
        3. template存在需要对template做一系列处理，compileTodunciton 解析 template
        4. 触发原先的 $mount（相当于触发mountComponent）
