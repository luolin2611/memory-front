// 记忆库请求参数类型
export interface MemoryLibraryRequest {
  id?: number
  userId?: number
  name: string
  description: string
  createdTime?: string
  updatedTime?: string
}

// 记忆库响应类型
export interface MemoryLibraryResponse {
  id: number
  userId: number
  name: string
  description: string
  createdTime: string
  updatedTime: string
}

// API 通用响应类型
export interface ApiResponse<T> {
  code: string
  message: string
  timestamp: number
  body: T
}

// 记忆库列表响应类型
export type MemoryLibraryListResponse = MemoryLibraryResponse[] 