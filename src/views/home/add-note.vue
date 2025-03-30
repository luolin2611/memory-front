<template>
  <div class="add-note">
    <!-- 固定顶部导航栏 -->
    <van-nav-bar
      title="添加笔记"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    >
      <template #right>
        <div class="right-actions">
          <van-icon name="eye-o" size="20" class="preview-icon" @click="togglePreview" />
          <van-icon name="success" size="20" class="save-icon" @click="onClickRight" />
        </div>
      </template>
    </van-nav-bar>

    <!-- 表单内容 -->
    <div class="form-content">
      <!-- 记忆库选择 -->
      <div class="card-side">
        <div class="side-header" @click="showLibPopup">
          <span>记忆库</span>
          <div class="side-actions">
            <span class="selected-lib">{{ selectedLibName }}</span>
            <van-icon name="arrow" size="18" />
          </div>
        </div>
      </div>

      <!-- 正面内容 -->
      <div class="card-side">
        <div class="side-header" @click="togglePanel('front')">
          <span>正面</span>
          <div class="side-actions">
            <van-icon name="link" size="18" />
            <van-icon :name="frontExpanded ? 'arrow-down' : 'arrow-up'" size="18" />
          </div>
        </div>
        <div class="editor-container" v-show="frontExpanded">
          <van-field
            v-model="frontContent"
            type="textarea"
            rows="3"
            maxlength="255"
            show-word-limit
            placeholder="请输入正面内容"
          />
        </div>
      </div>

      <!-- 背面内容 -->
      <div class="card-side">
        <div class="side-header" @click="togglePanel('back')">
          <span>背面</span>
          <div class="side-actions">
            <van-icon name="link" size="18" />
            <van-icon :name="backExpanded ? 'arrow-down' : 'arrow-up'" size="18" />
          </div>
        </div>
        <div class="editor-container" v-show="backExpanded">
          <MdEditor
            v-model="backContent"
            :theme="theme"
            :toolbars="toolbars"
            @onUploadImg="onUploadImg"
          />
        </div>
      </div>

      <!-- 助记内容 -->
      <div class="card-side">
        <div class="side-header" @click="togglePanel('mnemonic')">
          <span>助记</span>
          <div class="side-actions">
            <van-icon name="link" size="18" />
            <van-icon :name="mnemonicExpanded ? 'arrow-down' : 'arrow-up'" size="18" />
          </div>
        </div>
        <div class="editor-container" v-show="mnemonicExpanded">
          <MdEditor
            v-model="mnemonicContent"
            :theme="theme"
            :toolbars="toolbars"
            @onUploadImg="onUploadImg"
          />
        </div>
      </div>
    </div>

    <!-- 记忆库选择弹出层 -->
    <van-popup
      v-model:show="showLib"
      position="bottom"
      round
      teleport="body"
    >
      <template #default>
        <van-picker
          :columns="libColumns"
          @confirm="onLibConfirm"
          @cancel="showLib = false"
          show-toolbar
          :title="showSelectedLibName"
          value-key="text"
        />
      </template>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { MdEditor, Themes, ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getMemoryLibraryList } from '@/api/memory-library'
import type { MemoryLibraryResponse } from '@/types/memory-library'
import { createArticle } from '@/api/article'
import type { ArticleRequest } from '@/types/article'
import { uploadFile } from '@/api/common'

const router = useRouter()

// 表单数据
const frontContent = ref('')
const backContent = ref('')
const mnemonicContent = ref('')
const theme = ref<Themes>('light')

// 记忆库列表数据
const showSelectedLibName = ref('请选择记忆库')
const memoryLibraries = ref<MemoryLibraryResponse[]>([])
const selectedLibId = ref<number>()
const selectedLibName = computed(() => {
  const selected = memoryLibraries.value.find(lib => lib.id === selectedLibId.value)
  return selected?.name || '请选择记忆库'
})
const libColumns = computed(() => memoryLibraries.value.map(lib => ({
  text: lib.name,
  value: lib.id
})))

// 面板展开状态
const frontExpanded = ref(true)
const backExpanded = ref(true)
const mnemonicExpanded = ref(true)

// 弹出层控制
const showLib = ref(false)

// 工具栏配置
const toolbars = ref<ToolbarNames[]>([
  'bold',
  'italic',
  'strikeThrough',
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
])

// 图片上传处理
const onUploadImg = async (files: Array<File>, callback: (urls: string[]) => void) => {
  try {
    showLoadingToast({
      message: '上传中...',
      forbidClick: true,
    })

    const uploadPromises = files.map(async (file) => {
      return await uploadFile(file)
    })

    const urls = await Promise.all(uploadPromises)
    callback(urls)
    closeToast()
  } catch (error) {
    closeToast()
    showToast('图片上传失败')
  }
}

// 获取记忆库列表
const fetchMemoryLibraries = async () => {
  try {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
    })
    const list = await getMemoryLibraryList()
    memoryLibraries.value = Array.isArray(list) ? list : []
    closeToast()
  } catch (error) {
    closeToast()
    showToast('获取记忆库列表失败')
  }
}

// 页面加载时获取记忆库列表
onMounted(() => {
  fetchMemoryLibraries()
})

// 导航栏事件处理
const onClickLeft = () => {
  router.back()
}

const onClickRight = async () => {
  // 表单验证
  if (!selectedLibId.value) {
    showToast('请选择记忆库')
    return
  }
  if (!frontContent.value.trim()) {
    showToast('请输入正面内容')
    return
  }
  if (!backContent.value.trim()) {
    showToast('请输入背面内容')
    return
  }

  try {
    showLoadingToast({
      message: '保存中...',
      forbidClick: true,
    })

    // 构建提交数据
    const formData: ArticleRequest = {
      libraryId: selectedLibId.value,
      title: frontContent.value,
      content: backContent.value,
      mnemonic: mnemonicContent.value || ''
    }

    // 调用创建文章接口
    await createArticle(formData)
    
    closeToast()
    showToast('保存成功')
    router.back()
  } catch (error) {
    closeToast()
    showToast('保存失败')
  }
}

// 预览切换
const togglePreview = () => {
  showToast('预览功能开发中')
}

// 面板折叠切换
const togglePanel = (type: 'front' | 'back' | 'mnemonic') => {
  switch (type) {
    case 'front':
      frontExpanded.value = !frontExpanded.value
      break
    case 'back':
      backExpanded.value = !backExpanded.value
      break
    case 'mnemonic':
      mnemonicExpanded.value = !mnemonicExpanded.value
      break
  }
}

// 记忆库选择
const showLibPopup = () => {
  showLib.value = true
}

const onLibConfirm = (selectedValue: any) => {
  selectedLibId.value = selectedValue.selectedValues[0]
  showSelectedLibName.value = selectedValue.selectedOptions[0].text
  showLib.value = false
}
</script>

<style lang="less" scoped>
.add-note {
  min-height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;

  :deep(.van-nav-bar) {
    background-color: #42c294;

    .van-nav-bar__title {
      color: #fff;
    }

    .van-icon {
      color: #fff;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 12px;

      .preview-icon,
      .save-icon {
        color: #fff;
      }
    }
  }

  .form-content {
    flex: 1;
    padding: 12px 0;
    .van-cell-group {
      margin-bottom: 12px;
    }
  }

  .card-side {
    background: #fff;
    margin-bottom: 12px;

    .side-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      border-bottom: 1px solid #f2f3f5;
      cursor: pointer;

      .side-actions {
        display: flex;
        gap: 12px;
        color: #969799;
        align-items: center;

        .selected-lib {
          color: #323233;
          font-size: 14px;
        }
      }
    }

    .editor-container {
      padding: 8px;

      :deep(.van-field__word-limit) {
        color: #969799;
        font-size: 12px;
      }

      :deep(.van-field__control) {
        min-height: 80px;
        font-size: 14px;
      }

      :deep(.md-editor) {
        height: 300px;
        border: 1px solid #ebedf0;
        border-radius: 4px;
      }
    }
  }
}
</style>