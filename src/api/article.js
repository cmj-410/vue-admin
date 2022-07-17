import request from '@/utils/request'

// 发布文章
export const apiAddArticle = (data) => {
  return request({
    url: 'article/operate',
    method: 'POST',
    data: {
      ...data,
      action: 'add'
    }
  })
}

// 获取所有文章类型
export const apiGetAllArticleTypes = () => {
  return request({
    url: 'article/getAll-article-type',
    method: 'GET'
  })
}

// 获取某一类型的三篇文章（前端计数，这里没有用分页）
export const apiGetTypeArticles = ({ type, count }) => {
  return request({
    url: 'article/type-article-list',
    method: 'GET'
  })
}
