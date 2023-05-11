import{_ as t,p as o,q as a,R as e,t as n}from"./framework-69837a10.js";const s={},c=e("h1",{id:"浏览器的沙箱机制",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#浏览器的沙箱机制","aria-hidden":"true"},"#"),n(" 浏览器的沙箱机制")],-1),_=e("blockquote",null,[e("p",null,"沙箱: 网络编程虚拟执行环境 Sandbox(又叫沙箱、沙盘)即是一个虚拟系统程序，允许你在沙盘环境中运行浏览器或其他程序，因此运行所产生的变化可以随后删除。它创造了一个类似沙盒的独立作业环境，在其内部运行的程序并不能对硬盘产生永久性的影响。 在网络安全中，沙箱指在隔离环境中，用以测试不受信任的文件或应用程序等行为的工具。")],-1),r=e("p",null,"一般来说，对于在网页中的JavaScript代码和插件都是不可信的，为了保护用户的系统不被网页上的恶意软件入侵，有了沙箱模型这个机制，将网页的运行限制在一个特定的环境，网页只能访问有限的功能。即使该网页的渲染进程被攻击，入侵者也无法获取到当前渲染进程以外的任何权限，这就是沙箱模型。",-1),d=[c,_,r];function l(i,h){return o(),a("div",null,d)}const f=t(s,[["render",l],["__file","sandbox.html.vue"]]);export{f as default};