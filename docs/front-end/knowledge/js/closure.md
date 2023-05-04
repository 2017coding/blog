# 闭包

> 闭包就是能够读取其他函数内部变量的函数。 在JavaScript中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成“定义在一个函数内部的函数”。在本质上，闭包是将函数内部和函数外部连接起来的桥梁。

```
function b () {
  const a = 1
  function getData () {
    console.log(a)
  }
  a()
}
b()
```
从上面可以看到，`getData`函数访问了`b`函数中的`a`变量，所以这个函数就是一个闭包。

不过也有另外一种解释，说闭包是**带有数据的函数**，按这个理解，则`b`中这一段组成一个闭包：
```
const a = 1
function getData () {
  console.log(a)
}
```

