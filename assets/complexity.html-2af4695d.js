import{_ as e,p as n,q as i,a1 as a}from"./framework-69837a10.js";const d="/blog/assets/complexity-c902dbf2.jpeg",l={},r=a('<h1 id="算法的复杂度" tabindex="-1"><a class="header-anchor" href="#算法的复杂度" aria-hidden="true">#</a> 算法的复杂度</h1><p>一个算法好不好，应该如何去评价呢？</p><p>最直观的就是看代码执行速度，比如同样去实现排序，可以用冒泡排序，也可以用快排，功能都可以实现，但是对比之下速度快的算法，便是更优的。如果说两个算法的实现速度差不多，那则还可以根据算法所占用的空间，占用空间少的是更优的，这就是算法的基础：时间复杂度和空间复杂度。</p><h2 id="大o、大ω、大θ、小o-小ω" tabindex="-1"><a class="header-anchor" href="#大o、大ω、大θ、小o-小ω" aria-hidden="true">#</a> 大O、大Ω、大θ、小o，小ω</h2><ul><li>Ο，读音：big-oh；表示上界，小于等于。</li><li>Ω，读音：big omega、欧米伽；表示下界，大于等于。</li><li>Θ，读音：theta、西塔；既是上界也是下界，称为确界，等于。</li><li>ο，读音：small-oh；表示上界，小于。</li><li>ω，读音：small omega；表示下界，大于。</li></ul><p>Ο是渐进上界，Ω是渐进下界。Θ需同时满足大Ο和Ω，故称为确界。Ο极其有用，因为它表示了最差性能。</p><h3 id="大o表示法" tabindex="-1"><a class="header-anchor" href="#大o表示法" aria-hidden="true">#</a> 大O表示法</h3><p>大O是在分析算法复杂度时常用的一种表示法。当函数的大小只有上界，没有明确下界的时候可以使用大O表示法，该渐进描述符一般用于描述算法的<strong>最坏复杂度</strong>。</p><h3 id="大ω表示法" tabindex="-1"><a class="header-anchor" href="#大ω表示法" aria-hidden="true">#</a> 大Ω表示法</h3><p>当函数的大小只有下界，没有明确上界的时候，可以使用大Ω表示法，该渐进描述符一般用于描述算法的<strong>最优复杂度</strong>。</p><h3 id="大θ表示法" tabindex="-1"><a class="header-anchor" href="#大θ表示法" aria-hidden="true">#</a> 大θ表示法</h3><p>用于界定函数的渐进上界和渐进下界。当 f(n)= θ(g(n)) 的时候，代表着g(n)为f(n)的渐进紧确界。而θ渐进描述符在所有的渐进描述符中是最严格的一个，因为它既描述了函数的上界，有描述了函数的下界。</p><h3 id="小o表示法" tabindex="-1"><a class="header-anchor" href="#小o表示法" aria-hidden="true">#</a> 小o表示法</h3><p>小ο表示法用于描述不能紧的上限。</p><h3 id="小ω表示法" tabindex="-1"><a class="header-anchor" href="#小ω表示法" aria-hidden="true">#</a> 小ω表示法</h3><p>让 f(n) 和 g(n) 是将正整数映射到正实数的函数。如果对于任何实常数 c &gt; 0，存在整数常数 n0 ≥ 1 使得 f (n) &gt; c * g(n) ≥ 0 对于每个整数 n ≥ n0。</p><h2 id="时间复杂度" tabindex="-1"><a class="header-anchor" href="#时间复杂度" aria-hidden="true">#</a> 时间复杂度</h2><p>要获得时间的复杂度最直观的做法是通过算法程序运行一遍即可获得，但是由于实践会受到设备环境、数据规模等因素的影响，测试算法很难得到一个标准执行时间，所以只需要找到一个评估指标，获得算法执行所消耗时间的基本趋势即可。</p><p>常见的时间复杂度量级有：</p><ul><li>常数阶O(1)</li><li>对数阶O(logN)</li><li>线性阶O(n)</li><li>线性对数阶O(nlogN)</li><li>平方阶O(n²)</li><li>立方阶(n³)</li><li>K次方阶O(n^k)</li><li>指数阶(2^n)</li><li>阶乘阶𝑂(n!)</li></ul><p>上面从上至下依次的时间复杂度越来越大，执行的效率越来越低。</p><img src="'+d+`" style="width:80%;padding:20px;"><p>在大O符号表示法中，时间复杂度的公式是：T(n) = O(f(n))，其中f(n)表示每行代码执行次数之和，而O表示正比例关系，这个公式的全称是：<strong>算法的渐进时间复杂度</strong>。</p><h3 id="常数阶o-1" tabindex="-1"><a class="header-anchor" href="#常数阶o-1" aria-hidden="true">#</a> 常数阶O(1)</h3><p>无论代码执行了多少行，只要没有循环等复杂的结构，那这个代码的时间复杂度就是O(1)：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const i = 1
const j = 2
++i;
j++;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码在执行时，消耗的时间并不会随着某个变量的增长而增长，即使代码很长，有几千几万行，都可以用O(1)来表示它的时间复杂度。</p><h3 id="对数阶o-logn" tabindex="-1"><a class="header-anchor" href="#对数阶o-logn" aria-hidden="true">#</a> 对数阶O(logN)</h3><blockquote><p>如果a的x次方等于N（a&gt;0，且a≠1），那么数x叫做以a为底N的对数（logarithm），记作x=loga N。其中，a叫做对数的底数，N叫做真数</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let i = 1;
while(i &lt; n)
{
    i = i * 2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码可以看到，在while循环中，每次都将i * 2，乘完之后，i距离n就越来越近了，假设循环x次后，i大于2，这个时候循环退出，可以得出2的x次方等于n，即x = log2^n，当循环log2^n次后，代码结束，因此这类代码的时间复杂度为：<strong>O(logn)</strong></p><h3 id="线性阶o-n" tabindex="-1"><a class="header-anchor" href="#线性阶o-n" aria-hidden="true">#</a> 线性阶O(n)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(i=1; i&lt;=n; ++i)
{
   j = i;
   j++;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码在执行时，for循环中的代码会执行n遍，因此它消耗的时间会随着n的变化而变化，这类形式的代码可以用O(n)来表示它的时间复杂度。</p><h3 id="线性对数阶o-nlogn" tabindex="-1"><a class="header-anchor" href="#线性对数阶o-nlogn" aria-hidden="true">#</a> 线性对数阶O(nlogN)</h3><p>将时间复杂度为O(logN)的代码循环n遍，那么时间复杂度将为 n * O(logN)，也就是O(nlogN)：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(m=1; m&lt;n; m++)
{
    i = 1;
    while(i&lt;n)
    {
        i = i * 2;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="平方阶o-n2" tabindex="-1"><a class="header-anchor" href="#平方阶o-n2" aria-hidden="true">#</a> 平方阶O(n²)</h3><p>平方阶O(n²)可以理解为用O(n)的代码再循环嵌套一遍，这种情况下的时间复杂度就是O(n²)了：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(x=1; i&lt;=n; x++)
{
   for(i=1; i&lt;=n; i++)
    {
       j = i;
       j++;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码使用了两层for循环，它的时间复杂度就是O(n * n)，如果将其中一层循环的n改为m：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(x=1; i&lt;=n; x++)
{
   for(i=1; i&lt;=m; i++)
    {
       j = i;
       j++;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候时间复杂度就变成了O(n * m)</p><h3 id="立方阶o-n3-、k次方阶o-n-k" tabindex="-1"><a class="header-anchor" href="#立方阶o-n3-、k次方阶o-n-k" aria-hidden="true">#</a> 立方阶O(n³)、K次方阶O(n^k)</h3><p>O(n)嵌套三次即为O(n³)，嵌套k次，即为O(n^k)</p><h3 id="指数阶-2-n" tabindex="-1"><a class="header-anchor" href="#指数阶-2-n" aria-hidden="true">#</a> 指数阶(2^n)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for (int i = 0; i &lt; 2^n; i++) {
  	n++;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="阶乘阶o-n" tabindex="-1"><a class="header-anchor" href="#阶乘阶o-n" aria-hidden="true">#</a> 阶乘阶𝑂(n!)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function a(n) {
  for (let i = 0; i &lt; n; i++) {
    a(n - 1);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>循环执行次数最多的语句为<code>a(n - 1)</code>，在当前 n 下，会调用n次<code>a(n - 1)</code>，而在每个 n−1 下，又会调用n - 1次<code>a(n - 2)</code>，以此类推，得执行次数为 n×(n−1)×(n−2)×...×1，即 n!</p><h2 id="空间复杂度" tabindex="-1"><a class="header-anchor" href="#空间复杂度" aria-hidden="true">#</a> 空间复杂度</h2><p>空间复杂度主要指执行算法所需内存的大小，用于对程序运行过程中所需要的临时存储空间的度量，同样反映的也是一个趋势。</p><p>程序执行除了需要储存空间、指令、常数、变量和输入数据外，还包括对数据进行操作的工作单元和存储计算所需要信息的辅助空间。存储空间通常包括：指令空间（即代码空间）、数据空间（常量、简单变量）等所占的固定部分和动态分配、递归栈所需的可变空间，其中可变空间和算法有关。</p><p>一个算法所需的存储空间用f(n)表示。S(n)=O(n)其中n为问题的规模，S(n)表示空间复杂度。</p><p>常见的空间复杂度量级有：</p><ul><li>常数阶O(1)</li><li>线性阶O(n)</li><li>平方阶O(n²)</li></ul><h3 id="常数阶o-1-1" tabindex="-1"><a class="header-anchor" href="#常数阶o-1-1" aria-hidden="true">#</a> 常数阶O(1)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let i = 1
let j = 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>代码中的i、j所分配的空间都不随着处理数据量变化，因此它的空间复杂度为S(n) = O(1)</p><h3 id="线性阶o-n-1" tabindex="-1"><a class="header-anchor" href="#线性阶o-n-1" aria-hidden="true">#</a> 线性阶O(n)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let arr = new Array(n)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述代码创建了一个长度为n的数组，所分配的空间根据数组长度来决定，因此它的空间复杂度为S(n) = O(n)</p><h3 id="平方阶o-n2-1" tabindex="-1"><a class="header-anchor" href="#平方阶o-n2-1" aria-hidden="true">#</a> 平方阶O(n²)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let arr=[]
for (var i = 0; i &lt; n; i++) {
    arr[i] = i
    for (var j = 0; i &lt; n; i++) {
        arr[i][i] = i
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当用长度为n的for循环嵌套在空间复杂度为O(n)的数组上生成一个二维数组，这个时候的空间复杂度即为O(n * n)</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>当对时间复杂度和空间复杂度有一定的了解后，编写代码的时候就会想到for循环的时间复杂度为O(n)，递归 + for循环的时间复杂度为O(n!)，怎样去编写更优的代码，是一条漫长的路程，丰富知识会让我们走的更远，共勉。</p>`,67),s=[r];function t(c,o){return n(),i("div",null,s)}const h=e(l,[["render",t],["__file","complexity.html.vue"]]);export{h as default};
