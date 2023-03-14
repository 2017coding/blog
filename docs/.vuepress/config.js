module.exports = {
    title: "lyh's blog",
    description: "持续学习，持续成长",
    base: '/blog/',
    markdown: {
      lineNumbers: true,
    },
    themeConfig: {
      sidebarDepth: 3,
      editLinks: true,
      displayAllHeaders: false,
      docsDir: 'docs',
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdated: 'Last Updated', // string | boolean
      nav:[
        { text: '前端', 
        items: [
          { text: 'html/css', link: '/front-end/html-css/box-sizing' },
          { text: 'js', link: '/front-end/js/execute-context' },
          { text: 'vue', link: '/front-end/vue/vue' },
          { text: '浏览器', link: '/front-end/network/browser' },
          { text: '构建', link: '/front-end/build/babel' },
        ]
      },
        { text: 'git', link: '/git/git' },
        { text: 'GitHub', link: 'https://github.com/2017coding' }      
      ],
      sidebar:{
        '/front-end/html-css/': [
          {
            title: 'html/css',
            collapsable: false,
            children: [
              'box-sizing',
              'css-layout',
            ]
          },
        ],
        '/front-end/js/': [
          {
            title: 'js',
            collapsable: false,
            children: [
              'execute-context',
              'this',
              'prototype',
              'closure',
              'trash-recycling',
            ]
          }
        ],
        '/front-end/vue/': [
          {
            title: 'vue',
            collapsable: false,
            children: [
              'http',
            ]
          }
        ],
        '/front-end/network/': [
            {
              title: '浏览器',
              collapsable: false,
              children: [
                'browser',
                'sandbox',
                'pageParse',
                'pageRender',
              ]
            },
            {
              title: '网络',
              collapsable: false,
              children: [
                'http',
                'https',
                'crossDomain',
                'security'
              ]
            },
            {
              title: '性能优化',
              collapsable: false,
              children: [
                'http',
              ]
            }
          ],
          '/front-end/build/': [
            {
              title: '构建',
              collapsable: false,
              children: [
                'babel',
                'npm-yarn',
                'test',
              ]
            }
          ],
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
          '/blog/': [
            {
              title: 'blog',
              collapsable: false,
              children: [
                'http',
              ]
            }
          ]
      },
    },
  }