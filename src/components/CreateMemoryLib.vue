<template>
  <van-dialog
    v-model:show="show"
    title="创建记忆库"
    show-cancel-button
    confirm-button-text="确认"
    cancel-button-text="取消"
    :before-close="handleBeforeClose"
  >
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.name"
          name="name"
          label="记忆库名称"
          placeholder="请输入记忆库名称"
          :rules="[
            { required: true, message: '请输入记忆库名称' },
            { max: 100, message: '名称不能超过100个字符' }
          ]"
        />
        <van-field
          v-model="formData.description"
          name="description"
          label="描述"
          type="textarea"
          placeholder="请输入记忆库描述"
          :rules="[
            { max: 500, message: '描述不能超过500个字符' }
          ]"
          :autosize="{ minHeight: 100 }"
          maxlength="500"
          show-word-limit
        />
      </van-cell-group>
    </van-form>
  </van-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { showToast } from 'vant'

const show = ref(false)
const formData = reactive({
  name: '',
  description: ''
})

const emit = defineEmits(['submit', 'cancel'])

const handleBeforeClose = (action: string) => {
  if (action === 'confirm') {
    // 验证表单
    if (!formData.name) {
      showToast('请输入记忆库名称')
      return false
    }
    // 提交表单
    emit('submit', { ...formData })
  } else {
    // 取消时清空表单
    formData.name = ''
    formData.description = ''
    emit('cancel')
  }
}

const open = () => {
  show.value = true
}

// 暴露方法给父组件
defineExpose({
  open
})
</script>

<script lang="ts">
export default {
  name: 'CreateMemoryLib'
}
</script>

<style lang="less" scoped>
:deep(.van-dialog__content) {
  padding: 16px 0;
}

:deep(.van-cell-group) {
  margin: 0;
}
</style> 