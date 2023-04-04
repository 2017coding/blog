var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// docs/.vuepress/config.js
import vuepressPluginAnchorRight from "vuepress-plugin-anchor-right";
import { defineUserConfig, defaultTheme } from "vuepress";
import pkg from "@vuepress/plugin-google-analytics";
var { googleAnalyticsPlugin } = pkg;
var config_default = defineUserConfig({
  title: "lyh's blog",
  description: "\u6301\u7EED\u5B66\u4E60\uFF0C\u6301\u7EED\u6210\u957F",
  base: "/blog/",
  markdown: {
    lineNumbers: true
  },
  theme: defaultTheme({
    // sidebarDepth: 2,
    editLinks: true,
    displayAllHeaders: false,
    docsDir: "docs",
    editLinkText: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875",
    lastUpdated: "\u66F4\u65B0\u65F6\u95F4",
    // string | boolean
    navbar: [
      { text: "\u524D\u7AEF", link: "/front-end/" },
      { text: "git", link: "/git/git" },
      { text: "GitHub", link: "https://github.com/2017coding" }
    ],
    sidebar: {
      "/front-end/": getFrontEndSidebar(),
      "/node/": [
        {
          title: "node",
          collapsable: false,
          children: [
            "node"
          ]
        }
      ],
      "/git/": [
        {
          title: "git",
          collapsable: false,
          children: [
            "git"
          ]
        }
      ]
    }
  }),
  plugins: googleAnalyticsPlugin([
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp) => {
          const moment = __require("moment");
          return moment(timestamp).format("YYYY/MM/DD h:mm:ss");
        }
      }
    ],
    [vuepressPluginAnchorRight()]
  ])
});
function getFrontEndSidebar() {
  return [
    {
      title: "",
      path: "/",
      collapsable: false,
      children: [
        ""
      ]
    },
    {
      title: "base",
      collapsable: false,
      children: [
        "base/box-sizing",
        "base/css-layout"
      ]
    },
    {
      title: "js",
      collapsable: false,
      children: [
        "js/execute-context",
        "js/this",
        "js/prototype",
        "js/closure",
        "js/trash-recycling"
      ]
    },
    {
      title: "vue",
      collapsable: false,
      children: [
        "vue/reactive2",
        "vue/reactive3",
        "vue/render",
        "vue/vnode"
      ]
    },
    {
      title: "\u6D4F\u89C8\u5668\u548C\u7F51\u7EDC",
      collapsable: false,
      children: [
        "network/browser",
        "network/sandbox",
        "network/pageParse",
        "network/pageRender",
        "network/http",
        "network/https",
        "network/crossDomain",
        "network/security"
      ]
    },
    {
      title: "\u5DE5\u7A0B\u5316",
      collapsable: false,
      children: [
        "build/package-manage/npm",
        "build/package-manage/package-manage-contrast",
        "build/cli",
        "build/babel"
      ]
    }
  ];
}
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2xpYW5neXVoYW8vY29kaW5nL2x5aF9ibG9nL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbGlhbmd5dWhhby9jb2RpbmcvbHloX2Jsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9saWFuZ3l1aGFvL2NvZGluZy9seWhfYmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWcuanNcIjtpbXBvcnQgdnVlcHJlc3NQbHVnaW5BbmNob3JSaWdodCBmcm9tICd2dWVwcmVzcy1wbHVnaW4tYW5jaG9yLXJpZ2h0J1xuaW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZywgZGVmYXVsdFRoZW1lIH0gZnJvbSAndnVlcHJlc3MnXG4vLyBpbXBvcnQgeyBnb29nbGVBbmFseXRpY3NQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWdvb2dsZS1hbmFseXRpY3MnXG5pbXBvcnQgcGtnIGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tZ29vZ2xlLWFuYWx5dGljcyc7XG5jb25zdCB7IGdvb2dsZUFuYWx5dGljc1BsdWdpbiB9ID0gcGtnO1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIHRpdGxlOiBcImx5aCdzIGJsb2dcIixcbiAgZGVzY3JpcHRpb246IFwiXHU2MzAxXHU3RUVEXHU1QjY2XHU0RTYwXHVGRjBDXHU2MzAxXHU3RUVEXHU2MjEwXHU5NTdGXCIsXG4gIGJhc2U6ICcvYmxvZy8nLFxuICBtYXJrZG93bjoge1xuICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxuICB9LFxuICB0aGVtZTogZGVmYXVsdFRoZW1lKHtcbiAgICAvLyBzaWRlYmFyRGVwdGg6IDIsXG4gICAgZWRpdExpbmtzOiB0cnVlLFxuICAgIGRpc3BsYXlBbGxIZWFkZXJzOiBmYWxzZSxcbiAgICBkb2NzRGlyOiAnZG9jcycsXG4gICAgZWRpdExpbmtUZXh0OiAnXHU1NzI4IEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzUnLFxuICAgIGxhc3RVcGRhdGVkOiAnXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0JywgLy8gc3RyaW5nIHwgYm9vbGVhblxuICAgIG5hdmJhcjpbXG4gICAgICB7IHRleHQ6ICdcdTUyNERcdTdBRUYnLCBsaW5rOiAnL2Zyb250LWVuZC8nfSxcbiAgICAgIHsgdGV4dDogJ2dpdCcsIGxpbms6ICcvZ2l0L2dpdCcgfSxcbiAgICAgIHsgdGV4dDogJ0dpdEh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vMjAxN2NvZGluZycgfSAgICAgIFxuICAgIF0sXG4gICAgc2lkZWJhcjp7XG4gICAgICAnL2Zyb250LWVuZC8nOiBnZXRGcm9udEVuZFNpZGViYXIoKSxcbiAgICAgICcvbm9kZS8nOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogJ25vZGUnLFxuICAgICAgICAgIGNvbGxhcHNhYmxlOiBmYWxzZSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgJ25vZGUnLFxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICAnL2dpdC8nOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogJ2dpdCcsXG4gICAgICAgICAgY29sbGFwc2FibGU6IGZhbHNlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnZ2l0JyxcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH0pLFxuICBwbHVnaW5zOiBnb29nbGVBbmFseXRpY3NQbHVnaW4oW1xuICAgIFtcbiAgICAgICdAdnVlcHJlc3MvbGFzdC11cGRhdGVkJyxcbiAgICAgIHtcbiAgICAgICAgdHJhbnNmb3JtZXI6ICh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICBjb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxuICAgICAgICAgIHJldHVybiBtb21lbnQodGltZXN0YW1wKS5mb3JtYXQoJ1lZWVkvTU0vREQgaDptbTpzcycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdLFxuICAgIFt2dWVwcmVzc1BsdWdpbkFuY2hvclJpZ2h0KCldLFxuICBdKVxufSlcblxuXG5mdW5jdGlvbiBnZXRGcm9udEVuZFNpZGViYXIgKCkge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIHBhdGg6ICcvJyxcbiAgICAgIGNvbGxhcHNhYmxlOiBmYWxzZSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcnXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ2Jhc2UnLFxuICAgICAgY29sbGFwc2FibGU6IGZhbHNlLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgJ2Jhc2UvYm94LXNpemluZycsXG4gICAgICAgICdiYXNlL2Nzcy1sYXlvdXQnLFxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdqcycsXG4gICAgICBjb2xsYXBzYWJsZTogZmFsc2UsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAnanMvZXhlY3V0ZS1jb250ZXh0JyxcbiAgICAgICAgJ2pzL3RoaXMnLFxuICAgICAgICAnanMvcHJvdG90eXBlJyxcbiAgICAgICAgJ2pzL2Nsb3N1cmUnLFxuICAgICAgICAnanMvdHJhc2gtcmVjeWNsaW5nJyxcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAndnVlJyxcbiAgICAgIGNvbGxhcHNhYmxlOiBmYWxzZSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICd2dWUvcmVhY3RpdmUyJyxcbiAgICAgICAgJ3Z1ZS9yZWFjdGl2ZTMnLFxuICAgICAgICAndnVlL3JlbmRlcicsXG4gICAgICAgICd2dWUvdm5vZGUnLFxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdcdTZENEZcdTg5QzhcdTU2NjhcdTU0OENcdTdGNTFcdTdFREMnLFxuICAgICAgY29sbGFwc2FibGU6IGZhbHNlLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgJ25ldHdvcmsvYnJvd3NlcicsXG4gICAgICAgICduZXR3b3JrL3NhbmRib3gnLFxuICAgICAgICAnbmV0d29yay9wYWdlUGFyc2UnLFxuICAgICAgICAnbmV0d29yay9wYWdlUmVuZGVyJyxcbiAgICAgICAgJ25ldHdvcmsvaHR0cCcsXG4gICAgICAgICduZXR3b3JrL2h0dHBzJyxcbiAgICAgICAgJ25ldHdvcmsvY3Jvc3NEb21haW4nLFxuICAgICAgICAnbmV0d29yay9zZWN1cml0eScsXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1x1NURFNVx1N0EwQlx1NTMxNicsXG4gICAgICBjb2xsYXBzYWJsZTogZmFsc2UsXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAnYnVpbGQvcGFja2FnZS1tYW5hZ2UvbnBtJyxcbiAgICAgICAgJ2J1aWxkL3BhY2thZ2UtbWFuYWdlL3BhY2thZ2UtbWFuYWdlLWNvbnRyYXN0JyxcbiAgICAgICAgJ2J1aWxkL2NsaScsXG4gICAgICAgICdidWlsZC9iYWJlbCcsXG4gICAgICBdXG4gICAgfVxuICBdXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQXdULE9BQU8sK0JBQStCO0FBQzlWLFNBQVMsa0JBQWtCLG9CQUFvQjtBQUUvQyxPQUFPLFNBQVM7QUFDaEIsSUFBTSxFQUFFLHNCQUFzQixJQUFJO0FBQ2xDLElBQU8saUJBQVEsaUJBQWlCO0FBQUEsRUFDOUIsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLElBQ1IsYUFB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
