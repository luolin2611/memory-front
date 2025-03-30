import request from '@/utils/request'
import type { MemoryLibraryRequest, MemoryLibraryResponse } from '@/types/memory-library'

// 创建记忆库
export function createMemoryLibrary(data: MemoryLibraryRequest) {
  return request<MemoryLibraryResponse>({
    url: '/memory-library',
    method: 'post',
    data
  })
}

// 查询记忆库列表
export function getMemoryLibraryList() {
  return request<MemoryLibraryResponse[]>({
    url: '/memory-library/list',
    method: 'get'
  })
} 