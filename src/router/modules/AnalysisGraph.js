import layout from '@/layout'

export default {
  path: '/analysis',
  name: 'AnalysisGraph',
  redirect: '/analysis/analysis-graph',
  component: layout,
  meta: {
    showOnMenu: true,
    title: '数据分析',
    icon: 'DataAnalysis'
  },
  children: [
    {
      path: '/analysis/analysis-graph',
      component: () =>
        import(/* webpackChunkName: "AnalysisGraph" */ '@/views/Analysis'),
      meta: {
        showOnMenu: true,
        title: '分析图像'
      }
    }
  ]
}
