import{_ as i,p as e,q as n,a1 as a}from"./framework-69837a10.js";const l={},d=a(`<h1 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式" aria-hidden="true">#</a> 设计模式</h1><p>在GoF(Gang of Four)的书籍《Design Patterns - Elements of Reusable Object-Oriented Software(设计模式-可复用面向对象软件的基础)》中是这样定义的：</p><blockquote><p>每一个模式描述了一个在我们周围不断重复发生的问题以及该问题的解决方案的核心。这样，你就能一次又一次地使用该方案而不必做重复劳动 》〉 -Christopher Alexander</p></blockquote><p>文中Alexander指的是城市和建筑模式，但是其思想同样适用于面向对象设计模式，只不过在面对对象的解决方案中，是用对象和接口代替了墙壁和门窗，两类模式的核心都在于提供了相同问题的解决方案，这里我们需要记住设计模式的四个基本要素：</p><ol><li>模式名称（pattern name）：一个助记名，它用一两个词来描述模式的问题、解决方案和效果。</li><li>问题（problem）：描述了应该在何时使用模式。</li><li>解决方案（solution）：描述了设计的组成成分，它们之间的相关关系以及各自的职责和协作方案。</li><li>效果（consequences）：描述了模式应用的效果以及使用模式应该权衡的问题。</li></ol><p>设计模式的创始人很明确地指出了设计模式的基本要素，但是由于现在中浮躁，偏向过度设计等因素的干扰，开发者很多时候会重点关注第一和第三要素，模式和解决方案，而忽略设计模式的场景和目标，导致设计出来的编码可能过于复杂或者达不到预期效果。</p><p>总的来说，设计模式（Design Pattern）是一套被反复利用、多数人知晓的、经过分类编码目的、代码设计经验的总结，或者说本来不存在所谓的设计模式，当某一类场景解决方案足够成熟，用的人多了，便成为了设计模式。</p><h2 id="设计模式的七大原则" tabindex="-1"><a class="header-anchor" href="#设计模式的七大原则" aria-hidden="true">#</a> 设计模式的七大原则</h2><p>面向对象的设计模式有七大基本原则：</p><ul><li>开闭原则（Open Closed Principle，OCP） <ul><li>模块或者函数应该对外扩展开发（对提供方），关闭修改（对使用方）</li><li>当程序需要变化时，尽量通过扩展软件实体的行为实现变化，而不是通过修改已有的代码来实现变化</li></ul></li><li>单一职责原则（Single Responsibility Principle, SRP） <ul><li>降低类的复杂度，一个类只负责一项职责</li><li>提高类的可读性</li><li>降低变更引起的风险</li><li>通常情况下，我们应当遵守单一职责原则，只有逻辑足够简单，才可以在代码级违反单一职责原则；只有类中 方法数量足够少，可以在方法级别保持单一职责原则</li></ul></li><li>里氏代换原则（Liskov Substitution Principle，LSP） <ul><li>继承的时候，父类实现的方法子类尽量不要重写，可以通过聚合组合的方式来解决问题</li><li>当一个类被其他类所继承，当这个类需要修改的时候需要考虑所有的子类，因为父类修改后所有涉及设计到子类的功能有可能出现问题</li></ul></li><li>依赖倒转原则（Dependency Inversion Principle，DIP） <ul><li>高层模块不应该依赖底层模块，二者都应该依赖其抽象（中间层）</li><li>抽象不应该依赖细节，细节应该依赖抽象</li><li>依赖倒转的中心思想是 面对接口编程</li><li>相对于细节的多变性，抽象的东西要稳定的多，以抽象为基础搭建的架构比以细节为基础的架构要稳定的多。在<code>java</code>中，抽象指的是接口或者类，细节就是具体的实现类。</li><li>使用接口或者抽象类的目的是制定好规范，而不涉及任何具体操作，把展现细节的任务交给他们的实现类去完成</li><li>低层模块尽量要有抽象类或接口，或者两种都有，程序稳定性更好</li><li>变量的声明类型尽量是抽象类或接口，这样变量引用和实际对象间，就存在一个缓冲层，利于程序扩展和优化</li><li>继承时遵循<strong>里氏代换原则</strong></li></ul></li><li>接口隔离原则（Interface Segregation Principle，ISP）</li></ul><blockquote><p>当一个类a通过Interface1依赖类b，类c通过Interface1依赖类d，那Interface1对于类a和类c来说就不是最小接口，所以需要将Interface1拆分为多个接口，对应的类分别与它们需要的接口建立联系，也就是采用接口隔离原则。</p></blockquote><ul><li>合成/聚合复用原则（Composite/Aggregate Reuse Principle，CARP） <ul><li>找到应用中可能需要变化之处，把它们独立起来，不要和那些不需要变化的代码混在一起</li><li>针对接口编程，而不是针对实现编程</li></ul></li><li>最少知识原则（Least Knowledge Principle，LKP）或者迪米特法则（Law of Demeter，LOD） <ul><li>一个对象应该对其他对象保持最少的了解</li><li>类与类关系越密切，耦合度越大</li><li>一个类 对自己依赖的类知道的越少越好。也就是说，对于 被依赖的类不管多么复杂，都尽量将逻辑封装在类的内部。对外除了提供的 public 方法，不对外泄露任何信息</li><li>迪米特法则还有个更简单的定义：只与直接的朋友通信。直接的朋友：每个对象都会与其他对象有 耦合关系，只要两个对象之间有耦合关系，我们就说这两个对象之间 是朋友关系。耦合的方式很多，依赖，关联，组合，聚合等。其中，我们称出现 成员变量， 方法参数， 方法返 回值中的类为直接的朋友，而出现在 局部变量中的类不是直接的朋友。也就是说，陌生的类最好不要以局部变 量的形式出现在类的内部</li></ul></li></ul><h2 id="设计模式的三大类型" tabindex="-1"><a class="header-anchor" href="#设计模式的三大类型" aria-hidden="true">#</a> 设计模式的三大类型</h2><p>设计模式分为三种类型，共23类：</p><ul><li>创建型：工厂模式，抽象工厂模式，建造者模式，单例模式，原型模式</li><li>结构型：适配器模式，装饰器模式，代理模式，外观模式，桥接模式，组合模式，享元模式</li><li>行为型：策略模式，模版方法模式，发布订阅模式，迭代器模式，职责链模式，命令模式，备忘录模式，状态模式，访问者模式，中介者模式，解释器模式</li></ul><h2 id="模式分析" tabindex="-1"><a class="header-anchor" href="#模式分析" aria-hidden="true">#</a> 模式分析</h2><h3 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h3><blockquote><p>工厂模式是用来创建对象的常见设计模式，不暴露创建对象的具体逻辑，而是将逻辑封装。工厂模式又叫做静态工厂模式，由一个工厂对象决定创建某一个类的实例。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class DownJacker {
  prodution () {
    console.log(&#39;生产羽绒服&#39;)
  }
}

class Tshirt {
  prodution () {
    console.log(&#39;生产T恤&#39;)
  }
}

// 工厂
class clothingFactory {
  constructor () {
    this.downJacker = DownJacker
    this.tshirt = Tshirt
  }

  getFactory (clothingType) {
    const _production = new this[clothingType]
    return _production.production()
  }
}

const clothing = new clothingFactory()
clothing.getFactory(&#39;tshirt&#39;) // 生产T恤
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>优点：</p><ol><li>调用者创建对象只要知道其名称即可</li><li>扩展性高，如果需要增加一个产品，直接扩展工厂类即可。</li><li>隐藏产品的具体实现，只关心产品的接口。</li></ol><p>缺点：</p><p>每次增加一个产品，需要增加一个具体类，增加维护成本，以及代码复杂度</p><h3 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式" aria-hidden="true">#</a> 抽象工厂模式</h3><blockquote><p>抽象工厂模式就是通过类的抽象使得业务适用于一个产品类簇的创建，而不负责某一个类产品的实例，和普通工厂不一样的是，普通工厂主要生产实例，抽象工厂的目的主要生产工厂。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class ProductionFlow {
  constructor(){
    if(new.target === ProductionFlow){
      throw new Error(&#39;抽象类不能被实例&#39;)
    }
  }
  production(){
    throw new Error(&#39;production要被重写&#39;)
  }
  materials(){
    throw new Error(&#39;materials要被重写&#39;)
  }
}

class DownJacket extends ProductionFlow{
  production(){
    console.log(\`材料:\${this.materials()},生产羽绒服\`)
  }
  materials(){
    return &#39;鸭毛&#39;
  }
}

class Underwear extends ProductionFlow{
  production(){
    console.log(\`材料:\${this.materials()},生产内衣\`)
  }
  materials(){
    return &#39;丝光棉&#39;
  }
}

function getAbstractProductionFactory(clothingType){
  const clothingObj = {
    downJacket:DownJacket,
    underwear:Underwear,
    t_shirt:TShirt,
  }
  if(clothingObj[clothingType]){
    return clothingObj[clothingType]
  }
  throw new Error(\`工厂暂时不支持生产这个\${clothingType}类型的服装\`)
}

const downJacketClass = getAbstractProductionFactory(&#39;downJacket&#39;)
const underwearClass = getAbstractProductionFactory(&#39;underwear&#39;)

const downJacket = new downJacketClass()
const underwear = new underwearClass()
downJacket.production() // 材料:鸭毛,生产羽绒服
underwear.production() // 材料:丝光棉,生产内衣
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式" aria-hidden="true">#</a> 建造者模式</h3><h3 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h3><h3 id="适配器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式" aria-hidden="true">#</a> 适配器模式</h3><h3 id="装饰器模式" tabindex="-1"><a class="header-anchor" href="#装饰器模式" aria-hidden="true">#</a> 装饰器模式</h3><h3 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h3><h3 id="发布订阅模式" tabindex="-1"><a class="header-anchor" href="#发布订阅模式" aria-hidden="true">#</a> 发布订阅模式</h3><h3 id="迭代器模式" tabindex="-1"><a class="header-anchor" href="#迭代器模式" aria-hidden="true">#</a> 迭代器模式</h3><h3 id="状态模式" tabindex="-1"><a class="header-anchor" href="#状态模式" aria-hidden="true">#</a> 状态模式</h3><h3 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h3><h3 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式" aria-hidden="true">#</a> 命令模式</h3><h3 id="组合模式" tabindex="-1"><a class="header-anchor" href="#组合模式" aria-hidden="true">#</a> 组合模式</h3><h3 id="模块方法模式" tabindex="-1"><a class="header-anchor" href="#模块方法模式" aria-hidden="true">#</a> 模块方法模式</h3><h3 id="享元模式" tabindex="-1"><a class="header-anchor" href="#享元模式" aria-hidden="true">#</a> 享元模式</h3><h3 id="职责链模式" tabindex="-1"><a class="header-anchor" href="#职责链模式" aria-hidden="true">#</a> 职责链模式</h3><h3 id="中介模式" tabindex="-1"><a class="header-anchor" href="#中介模式" aria-hidden="true">#</a> 中介模式</h3><h3 id="原型模式" tabindex="-1"><a class="header-anchor" href="#原型模式" aria-hidden="true">#</a> 原型模式</h3><h3 id="备忘录模式" tabindex="-1"><a class="header-anchor" href="#备忘录模式" aria-hidden="true">#</a> 备忘录模式</h3><h3 id="桥接模式" tabindex="-1"><a class="header-anchor" href="#桥接模式" aria-hidden="true">#</a> 桥接模式</h3><h3 id="访问者模式" tabindex="-1"><a class="header-anchor" href="#访问者模式" aria-hidden="true">#</a> 访问者模式</h3><h3 id="解释器模式" tabindex="-1"><a class="header-anchor" href="#解释器模式" aria-hidden="true">#</a> 解释器模式</h3>`,46),r=[d];function s(c,t){return e(),n("div",null,r)}const h=i(l,[["render",s],["__file","design-module.html.vue"]]);export{h as default};
