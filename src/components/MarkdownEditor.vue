<template>
  <div class="markdown-editor">
    <MdEditor
      v-model="content"
      :theme="theme"
      :toolbars="toolbars"
      @onUploadImg="onUploadImg"
      @onChange="onChange"
      previewOnly
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { showToast, showLoadingToast, closeToast } from 'vant'
import axios from 'axios'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const content = ref(props.modelValue || '')
const theme = ref('light')

// 工具栏配置
const toolbars = [
  'bold',
  'italic',
  'strikethrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'preview',
  'htmlPreview',
  'catalog'
]

// 监听 modelValue 变化
watch(() => props.modelValue, (newVal) => {
  if (newVal !== content.value) {
    content.value = newVal
  }
})

// 监听内容变化
const onChange = (value: string) => {
  emit('update:modelValue', value)
}

// 图片上传处理
const onUploadImg = async (files: Array<File>, callback: (urls: string[]) => void) => {
  try {
    showLoadingToast({
      message: '上传中...',
      forbidClick: true,
    })

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post('/common/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.code === 200) {
        return response.data.data
      } else {
        throw new Error('上传失败')
      }
    })

    const urls = await Promise.all(uploadPromises)
    callback(urls)
    closeToast()
  } catch (error) {
    closeToast()
    showToast('图片上传失败')
  }
}
</script>

<style lang="less" scoped>
.markdown-editor {
  height: 100%;
  min-height: 200px;

  :deep(.md-editor) {
    height: 100%;
  }
}
</style>