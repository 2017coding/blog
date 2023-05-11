import{_ as e,p as i,q as a,a1 as r}from"./framework-69837a10.js";const n="/blog/assets/sort-6338d87f.png",d="/blog/assets/bubbleSort-3058bb5b.gif",s="/blog/assets/quickSort-c6d42714.gif",l={},t=r('<h1 id="排序算法" tabindex="-1"><a class="header-anchor" href="#排序算法" aria-hidden="true">#</a> 排序算法</h1><p>排序算法可以分为内部排序和外部排序，内部排序是数据记录在内存中进行排序，而外部排序是因排序的数据很大，一次不能容纳全部的排序记录，在排序过程中需要访问外存。</p><p>常见的排序对比：</p><img src="'+n+'" style="width:80%;padding:20px;"><h2 id="冒泡排序" tabindex="-1"><a class="header-anchor" href="#冒泡排序" aria-hidden="true">#</a> 冒泡排序</h2><p>冒泡排序是一种简单直观的排序算法，需要重复的走过要排序的数组，一次对比两个元素，根据排序方式对比后将顺序交换，直到没有需要交换的数据为止，说明该数组的排序已经完成，一般通过双层for循环可以实现，所以时间复杂度为O(n^2) 因为排序过程中小的元素会慢慢排在数列的顶端，所以形象的叫做冒泡排序。</p><h3 id="算法步骤" tabindex="-1"><a class="header-anchor" href="#算法步骤" aria-hidden="true">#</a> 算法步骤</h3><ol><li>从数组的顶部开始对比第一个和第二个元素，如果第一个比第二个元素大，则交换它们的顺序</li><li>对相邻的元素做同样的动作，一直到数组的最后一位，这个时候最后的元素会是最大的数</li><li>针对所有的元素重复1，2步骤，除了最后一个</li><li>重复1，2，3步骤，需要对比的元素会越来越少，直到没有任何可以对比的元素，则该数组的排序完成 <img src="'+d+`" style="width:80%;padding:20px;"></li></ol><h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function sort (arr) {
  for (let i = 0; i &lt; arr.length - 1; i++) {
    for(let j = 0; j &lt; arr.length - 1 - i; j++) {
      if (arr[j] &gt; arr[j + 1]) {
        const next = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = next;
      }
    }
  }
  return arr
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="选择排序" tabindex="-1"><a class="header-anchor" href="#选择排序" aria-hidden="true">#</a> 选择排序</h2><p>选择排序是一种简单直观的排序算法，主要通过找到当前最小（大）值，放到数组的顶端，然后接下来重复步骤直至完成，同样也是需要双层循环去完成，所以也是O(n^2)的时间复杂度。</p><h3 id="算法步骤-1" tabindex="-1"><a class="header-anchor" href="#算法步骤-1" aria-hidden="true">#</a> 算法步骤</h3><ol><li>定一个指针为0，从当前位置到数组的末尾查询最值，放到数组的起始位置</li><li>从剩余未排序的数组中继续寻找，放在已排序的末尾</li><li>重复1，2步骤，直到所有元素都排序完成 <img src="`+s+`" style="width:80%;padding:20px;"></li></ol><h3 id="代码实现-1" tabindex="-1"><a class="header-anchor" href="#代码实现-1" aria-hidden="true">#</a> 代码实现</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function sort (arr) {
  for (let i = 0; i &lt; arr.length - 1; i++) {
    let cur = arr[i], minIndex // 保留起始index，保留最小索引
    for (let j = i + 1; j &lt; arr.length; j++) {
      if (arr[i] &gt; arr[j]) {
        arr[i] = arr[j]
        minIndex = j
      }
    }
    if (minIndex) {
      arr[minIndex] = cur
    }
  }
  return arr
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="插入排序" tabindex="-1"><a class="header-anchor" href="#插入排序" aria-hidden="true">#</a> 插入排序</h2><p>插入排序</p><h3 id="算法步骤-2" tabindex="-1"><a class="header-anchor" href="#算法步骤-2" aria-hidden="true">#</a> 算法步骤</h3><ol><li>把数组看成两个序列，第一个元素为有序序列，第二个元素到最后为无序序列</li><li>从头到尾依次扫描未排序序列，在已排序序列中从后往前扫描</li><li>如果已排序元素大于新元素，则将该元素移动到下一个位置</li><li>重复3步骤，直到找到已排序的元素小于或等于新元素的位置</li><li>将新元素插入到该位置，重复2，6步骤</li></ol><h3 id="代码实现-2" tabindex="-1"><a class="header-anchor" href="#代码实现-2" aria-hidden="true">#</a> 代码实现</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div><h2 id="希尔排序" tabindex="-1"><a class="header-anchor" href="#希尔排序" aria-hidden="true">#</a> 希尔排序</h2><h2 id="归并排序" tabindex="-1"><a class="header-anchor" href="#归并排序" aria-hidden="true">#</a> 归并排序</h2><h2 id="快速排序" tabindex="-1"><a class="header-anchor" href="#快速排序" aria-hidden="true">#</a> 快速排序</h2><h2 id="堆排序" tabindex="-1"><a class="header-anchor" href="#堆排序" aria-hidden="true">#</a> 堆排序</h2><h2 id="计数排序" tabindex="-1"><a class="header-anchor" href="#计数排序" aria-hidden="true">#</a> 计数排序</h2><h2 id="桶排序" tabindex="-1"><a class="header-anchor" href="#桶排序" aria-hidden="true">#</a> 桶排序</h2><h2 id="桶排序-1" tabindex="-1"><a class="header-anchor" href="#桶排序-1" aria-hidden="true">#</a> 桶排序</h2>`,29),h=[t];function c(u,o){return i(),a("div",null,h)}const b=e(l,[["render",c],["__file","sort.html.vue"]]);export{b as default};
