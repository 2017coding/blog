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
      lastUpdated: 'Last Updated', // string | boolean
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
        title: 'html-css',
        collapsable: false,
        children: [
          'html-css/box-sizing',
          'html-css/css-layout',
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