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
