import request from '@/utils/request'
import type { ArticleRequest, ArticleResponse } from '@/types/article'

export const createArticle = (data: ArticleRequest) => {
  return request<ArticleResponse>({
    url: '/article',
    method: 'POST',
    data
  })
} 