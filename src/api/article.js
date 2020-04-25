// 文章请求
import request from '@/utils/request'

export const getArticles = params => {
  return request({
    methods: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
// 获取
export const getArticlesChannels = () => {
  return request({
    methods: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 删除
export const deleteArticle = articleId => {
  return request({
    methods: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
