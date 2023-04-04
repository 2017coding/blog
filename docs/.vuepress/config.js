module.exports = {
    title: "lyh's blog",
    description: "持续学习，持续成长",
    base: '/blog/',
    markdown: {
      lineNumbers: true,
    },
    themeConfig: {
      // sidebarDepth: 2,
      editLinks: true,
      displayAllHeaders: false,
      docsDir: 'docs',
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdated: '更新时间', // string | boolean
      nav:[
        { text: '前端', link: '/front-end/'},
        { text: 'git', link: '/git/git' },
        { text: 'GitHub', link: 'https://github.com/2017coding' }      
      ],
      sidebar:{
        '/front-end/': getFrontEndSidebar(),
        '/node/': [
          {
            title: 'node',
            collapsable: false,
            children: [
              'node',
            ]
          },
        ],
        '/git/': [
          {
            title: 'git',
            collapsable: false,
            children: [
              'git',
            ]
          },
        ],
      },
      plugins: [
        [
          '@vuepress/last-updated',
          {
            transformer: (timestamp) => {
              const moment = require('moment')
              return moment(timestamp).format('YYYY/MM/DD h:mm:ss')
            }
          }
        ]
      ]
    },
  }


  function getFrontEndSidebar () {
    return [
      {
        title: '',
        path: '/',
        collapsable: false,
        children: [
          ''
        ]
      },
      {
        title: 'base',
        collapsable: false,
        children: [
          'base/box-sizing',
          'base/css-layout',
        ]
      },
      {
        title: 'js',
        collapsable: false,
        children: [
          'js/execute-context',
          'js/this',
          'js/prototype',
          'js/closure',
          'js/trash-recycling',
        ]
      },
      {
        title: 'vue',
        collapsable: false,
        children: [
          'vue/reactive',
          'vue/render',
          'vue/vnode',
        ]
      },
      {
        title: '浏览器和网络',
        collapsable: false,
        children: [
          'network/browser',
          'network/sandbox',
          'network/pageParse',
          'network/pageRender',
          'network/http',
          'network/https',
          'network/crossDomain',
          'network/security',
        ]
      },
      {
        title: '工程化',
        collapsable: false,
        children: [
          'build/package-manage/npm',
          'build/package-manage/package-manage-contrast',
          'build/cli',
          'build/babel',
        ]
      }
    ]
  }