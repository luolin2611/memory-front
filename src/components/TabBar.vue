<template>
  <div class="tab-bar-container">
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/home" icon="wap-home">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="plus" @click="handleAdd">
        <template #icon>
          <div class="add-button">
            <van-icon name="plus" size="20" />
          </div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="user-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
    
    <!-- 添加菜单 -->
    <add-menu ref="addMenuRef" @select="handleMenuSelect" @cancel="handleMenuCancel" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddMenu from './AddMenu.vue'

const route = useRoute()
const router = useRouter()
const active = ref(0)
const addMenuRef = ref()

// 根据当前路由设置激活的标签
const routeMap: Record<string, number> = {
  '/home': 0,
  '/profile': 2,
}

active.value = routeMap[route.path] || 0

const handleAdd = () => {
  addMenuRef.value?.open()
}

const handleMenuSelect = (type: 'knowledge' | 'memory') => {
  console.log('Selected:', type)
  // 这里可以处理选项的点击事件
}

const handleMenuCancel = () => {
  console.log('Menu cancelled')
}
</script>

<style scoped lang="less">
.tab-bar-container {
  .van-tabbar {
    border-top: 1px solid #f5f5f5;
  }

  :deep(.van-tabbar-item) {
    &:nth-child(2) {
      .van-tabbar-item__text {
        display: none;
      }
    }
  }

  .add-button {
    width: 44px;
    height: 44px;
    background-color: #07c160;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    
    .van-icon {
      color: #fff;
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'TabBar'
}
</script>
