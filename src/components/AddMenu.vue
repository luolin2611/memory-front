<template>
  <div>
    <van-popup
      v-model:show="show"
      position="bottom"
      :style="{ height: 'auto' }"
      round
    >
      <div class="add-menu">
        <div class="menu-items">
          <div class="menu-item" @click="handleClick('knowledge')">
            <div class="icon-wrapper knowledge">
              <van-icon name="plus" color="#fff" size="24" />
            </div>
            <span class="label">知识卡</span>
          </div>
          <div class="menu-item" @click="handleClick('memory')">
            <div class="icon-wrapper memory">
              <van-icon name="star" color="#fff" size="24" />
            </div>
            <span class="label">记忆库</span>
          </div>
        </div>
        <div class="cancel-button" @click="handleCancel">
          <van-icon name="cross" size="20" />
        </div>
      </div>
    </van-popup>

    <!-- 创建记忆库表单 -->
    <create-memory-lib
      ref="createMemoryLibRef"
      @submit="handleCreateMemoryLib"
      @cancel="handleCreateMemoryLibCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateMemoryLib from './CreateMemoryLib.vue'

const show = ref(false)
const createMemoryLibRef = ref()

const emit = defineEmits(['select', 'cancel'])

const handleClick = (type: 'knowledge' | 'memory') => {
  if (type === 'memory') {
    show.value = false
    // 打开创建记忆库表单
    createMemoryLibRef.value?.open()
  } else {
    emit('select', type)
    show.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
  show.value = false
}

const handleCreateMemoryLib = (data: { name: string; description: string }) => {
  console.log('创建记忆库:', data)
  // 这里可以处理创建记忆库的逻辑
}

const handleCreateMemoryLibCancel = () => {
  console.log('取消创建记忆库')
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
  name: 'AddMenu'
}
</script>

<style lang="less" scoped>
.add-menu {
  padding: 20px 0;
  background: #f7f8fa;

  .menu-items {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-bottom: 30px;
  }

  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .icon-wrapper {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &.knowledge {
        background-color: #4080ff;
      }

      &.memory {
        background-color: #42c294;
      }
    }

    .label {
      font-size: 14px;
      color: #323233;
    }
  }

  .cancel-button {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: #969799;
  }
}
</style> 