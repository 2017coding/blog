import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right'
import { defineUserConfig, defaultTheme } from 'vuepress'
import { knowledgeSidear, tsSidebar, networkSidebar, buildSidebar, redisSidebar,
  mysqlSidebar, nodeSidebar, vue2Sidebar, vue3Sidebar, operationSidebar, testSidebar, gitSidebar } from './sidebarList'
// import generateSidebar from './plugins/generateSidebar'

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
      { text: '前端',
        children: [
          { text: '知识点', link: '/front-end/knowledge/' },
          { text: 'Typescript', link: '/front-end/ts/' },
          { text: '浏览器和网络', link: '/front-end/network/' },
          { text: '工程化', link: '/front-end/build/module' },
        ]
      },
      { text: '后端',
        children: [
          { text: 'redis', link: '/service-end/redis/' },
          { text: 'mysql', link: '/service-end/mysql/' },
          { text: 'node', link: '/service-end/node/' },
          // { text: 'python', link: '/service-end/python/' },
        ]
      },
      { text: '源码解析',
        children: [
          { text: 'vue2', link: '/source-code/vue/2.0/design/' },
          { text: 'vue3', link: '/source-code/vue/3.0/design/' },
        ]
      },
      { text: '运维', link: '/operation-maintenance/' },
      { text: 'test', link: '/test/' },
      { text: 'git', link: '/git/git/' },
      { text: 'GitHub', link: 'https://github.com/2017coding' }
    ],
    sidebar:{
      '/front-end/knowledge/': createSidebar({prefix: 'front-end/knowledge', sidebarList: knowledgeSidear}),
      '/front-end/ts/': createSidebar({prefix: 'front-end/ts', sidebarList: tsSidebar}),
      '/front-end/network/': createSidebar({prefix: 'front-end/network', sidebarList: networkSidebar}),
      '/front-end/build/': createSidebar({prefix: 'front-end/build', sidebarList: buildSidebar}),
      '/service-end/redis/': createSidebar({prefix: 'service-end/redis', sidebarList: redisSidebar}),
      '/service-end/mysql/': createSidebar({prefix: 'service-end/mysql', sidebarList: mysqlSidebar}),
      '/service-end/node/': createSidebar({prefix: 'service-end/node', sidebarList: nodeSidebar}),
      '/source-code/vue/2.0': createSidebar({prefix: 'source-code/vue/2.0', sidebarList: vue2Sidebar}),
      '/source-code/vue/3.0': createSidebar({prefix: 'source-code/vue/3.0', sidebarList: vue3Sidebar}),
      '/operation-maintenance/': createSidebar({prefix: 'operation-maintenance', sidebarList: operationSidebar}),
      '/test/': createSidebar({prefix: 'test', sidebarList: testSidebar}),
      '/git/': createSidebar({prefix: 'git', sidebarList: gitSidebar}),
    },
  }),
  plugins: [
    vuepressPluginAnchorRight(),
    // generateSidebar()
  ]
})

function createSidebar({ prefix, sidebarList }) {
  return sidebarList.map(item => {
    try {
      item.children = item.children.map(children => {
        const str = item.prefix && item.prefix !== '/' ? `/${item.prefix}/` : '/'
        return `/${prefix}${str}${children}`
      })
    } catch (e) {
      console.log('err', item. e)
    }
    return item
  })
}
