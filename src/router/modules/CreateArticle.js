import layout from '@/layout'

export default {
  path: '/article',
  name: 'CreateArticle',
  redirect: '/article/list',
  component: layout,
  meta: {
    showOnMenu: true,
    title: '文章管理',
    icon: 'Document'
  },
  children: [
    {
      path: '/article/create-article',
      component: () =>
        import(
          /* webpackChunkName: "createArticle" */ '@/views/Article/createArticle'
        ),
      meta: {
        showOnMenu: true,
        title: '创建文章'
      }
    }
  ]
}
