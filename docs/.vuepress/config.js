import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right'
import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  title: "lyh's blog",
  logo: '/logo.jpeg',
  description: "持续学习，持续成长",
  base: '/blog/',
  markdown: {
    lineNumbers: true,
  },
  theme: defaultTheme({
    // sidebarDepth: 2,
    head: [
      ['meta', { name: 'application-name', content: "lyh's blog" }],
      ['meta', { name: 'apple-mobile-web-app-title', content: "lyh's blog" }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ],
    editLinks: true,
    displayAllHeaders: false,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    contributors: false,
    lastUpdatedText: '上次更新',
    navbar:[
      { text: '前端', link: '/front-end/'},
      { text: 'git', link: '/git/git' },
      { text: 'GitHub', link: 'https://github.com/2017coding' }      
    ],
    sidebar:{
      '/front-end/': getFrontEndSidebar(),
      '/node/': [
        {
          text: 'node',
          collapsable: false,
          children: [
            'node',
          ]
        },
      ],
      '/git/': [
        {
          text: 'git',
          collapsable: false,
          children: [
            'git',
          ]
        },
      ],
    },
  }),
  plugins: [
    vuepressPluginAnchorRight(),
  ]
})


function getFrontEndSidebar () {
  const sidebarList = [
    {
      text: '',
      prefix: '',
      link: '/',
      collapsable: false,
      children: [
        'README.md'
      ]
    },
    {
      text: 'base',
      prefix: 'base',
      // collapsable: false,
      children: [
        'box-sizing.md',
        'css-layout.md',
      ]
    },
    {
      text: 'js',
      prefix: 'js',
      collapsable: false,
      children: [
        'execute-context.md',
        'this',
        'prototype',
        'closure',
        'trash-recycling',
      ]
    },
    {
      text: 'vue',
      prefix: 'vue',
      // collapsable: false,
      children: [
        'reactive2',
        'reactive3',
        'render',
        'vnode',
      ]
    },
    {
      text: '浏览器和网络',
      prefix: 'network',
      collapsable: false,
      children: [
        'browser',
        'sandbox',
        'pageParse',
        'pageRender',
        'http',
        'https',
        'crossDomain',
        'security',
      ]
    },
    {
      text: '工程化',
      prefix: 'build',
      collapsable: false,
      children: [
        'package-manage/npm',
        'package-manage/package-manage-contrast',
        'cli',
        'babel',
      ]
    }
  ]
  return sidebarList.map(item => {
    try {
      item.children = item.children.map(children => {
        const str = item.prefix ? `/${item.prefix}/` : '/'
        return `/front-end${str}${children}`
      })
    } catch (e) {
      console.log('err', item. e)
    }
    return item
  })
}