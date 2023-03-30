# 盒模型

## 盒子的组成

一个盒子由外到内可以分为四个部分: margin（外边距）、border（边框）、padding（内边距）、content（内容）。其中margin、border、padding是css属性，因此可以通过这三个盒子来控制盒子的这三个部分，content则是HTML元素的内容。

## 盒子的大小

盒子的大小是整个盒子的宽度和高度，所以可以得到盒子的宽高计算方式（默认情况下）：
```
盒子的宽度 = content-width + padding-left + padding-right + border-right + border-left + margin-left + margin-right
盒子的高度 = content-height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
```

## 不同盒模型对大小的计算差异

我们先来了解一下**box-sizing**属性：

| 值      | 说明 |
| ----------- | ----------- |
| content-box      | 默认值。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。       |
| border-box   | 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，内容区的实际宽度是 width 减 去(border + padding) 的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。
注：border-box 不包含 margin。        |
| inherit   | 指定 box-sizing 属性的值，应该从父元素继承  |

当 **box-sizing: content-box**时，盒子模型为 **标准盒子模型**，当**box-sizing: border-box**时，这种盒子模型称为**IE盒子模型**。

<!-- ## BFC

## IFC -->