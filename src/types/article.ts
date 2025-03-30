export interface ArticleRequest {
  id?: number
  userId?: number
  libraryId: number
  title: string
  content: string
  mnemonic?: string
  createdTime?: string
  updatedTime?: string
}

export interface ArticleResponse {
  id: number
  userId: number
  libraryId: number
  title: string
  content: string
  mnemonic: string
  createdTime: string
  updatedTime: string
} 