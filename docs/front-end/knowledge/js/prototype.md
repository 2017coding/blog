# 原型和原型链
- 原型
  只要创建一个函数，就会按照特定的规则为这个函数创建一个`prototype`属性（指向原型对象）
- constructor
  原型对象有一个`constructor`属性，指向该原型对象对应的构造函数
  ```
    function Obj () {}
    console.log(Obj.prototype.constructor === Obj); // true
  ```
- __proto__
  在Firefox、Safari、Chrome实现上，会在每个对象上暴露`__proto__`属性，通过这个属性可以访问对象的原型。（调用构造函数创建实例，实例内部的`[[Prototype]]`指针会被赋值为构造函数的原型对象，脚本中没有访问这个特性的标准方法，`__proto__`是其中一种方法）
  ```
  function Foo () {};
  var f1 = new Foo;
  console.log(f1.__proto__ === Foo.prototype); // true
  ```
