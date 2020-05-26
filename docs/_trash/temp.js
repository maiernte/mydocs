var docBase = 'https://github.com/maiernte/mydocs/edit/master/docs/';

window.$docsify = {
  name: '鎏金天涯',
  repo: '',
  loadSidebar: true,
  subMaxLevel: 4,
  loadNavbar: true,
  alias: {
    '/.*/_navbar.md': '/_navbar.md'
  },
  // 完整配置参数
  search: {
    maxAge: 3600000,  // 86400000 过期时间，单位毫秒，默认一天
    paths: 'auto',
    placeholder: '搜索',
    noData: '没有记录！',
    depth: 6,
  },
  plugins: [
    EditOnGithubPlugin.create(docBase, null, '在线编辑')
  ],
  copyCode: {
    buttonText: {
      '/'      : '点击复制'
    },
    errorText: {
      '/': '错误',

    },
    successText: {
      '/': '复制',
    }
  }
}