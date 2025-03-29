<template>
  <div class="home">
    <!-- 顶部导航 -->
    <div class="nav-tabs">
      <div class="tab-items">
        <div class="tab-item active">
          <span>学习</span>
          <div class="active-bar"></div>
        </div>
        <div class="tab-item">
          <span>笔记</span>
        </div>
      </div>
      <div class="right-actions">
        <div class="vip-tag">
          <van-icon name="crown" color="#ff9500" />
          <span>超级学霸</span>
        </div>
        <van-icon name="replay" size="18" class="refresh-icon" />
        <van-icon name="ellipsis" size="18" />
      </div>
    </div>

    <!-- 今日待学 -->
    <div class="today-study">
      <h2>今日待学</h2>
      <div class="study-stats">
        <div class="stat-item">
          <div class="number">18</div>
          <div class="label">新卡</div>
        </div>
        <div class="stat-item">
          <div class="number">24</div>
          <div class="label">复习</div>
        </div>
        <div class="stat-item">
          <div class="number">8</div>
          <div class="label">预计耗时(分)</div>
        </div>
      </div>
    </div>

    <!-- 学习内容 -->
    <div class="study-content">
      <div class="content-header">
        <h2>学习内容</h2>
        <div class="my-resource" @click="goToResource">
          我的资源
          <van-icon name="arrow" />
        </div>
      </div>

      <!-- 内容列表 -->
      <div class="content-list">
        <div class="content-item">
          <div class="item-title">aaa</div>
          <div class="item-stats">
            <span>今日新卡 0</span>
            <span>待复习 0</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 0%"></div>
          </div>
          <div class="progress-text">
            <span>已掌握 0.0%</span>
            <span>0/0</span>
          </div>
        </div>

        <div class="content-item">
          <div class="item-title">新概念英语1</div>
          <div class="item-stats">
            <span>今日新卡 18</span>
            <span>待复习 24</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 64%"></div>
          </div>
          <div class="progress-text">
            <span>已学 64.0%</span>
            <span>32/50</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToResource = () => {
  // 跳转到资源页面
  console.log('Go to resource page')
}
</script>

<style lang="less" scoped>
.home {
  min-height: 100vh;
  background: #f7f8fa;
  padding: 16px;
}

.nav-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .tab-items {
    display: flex;
    gap: 24px;
  }

  .tab-item {
    position: relative;
    font-size: 16px;
    color: #969799;
    padding: 4px 0;

    &.active {
      color: #323233;
      font-weight: 500;

      .active-bar {
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #07c160;
        border-radius: 1px;
      }
    }
  }

  .right-actions {
    display: flex;
    align-items: center;
    gap: 16px;

    .vip-tag {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #ff9500;
      font-size: 14px;
    }

    .refresh-icon {
      color: #323233;
    }
  }
}

.today-study {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  h2 {
    font-size: 16px;
    color: #323233;
    margin-bottom: 16px;
  }

  .study-stats {
    display: flex;
    justify-content: space-around;
    text-align: center;

    .stat-item {
      .number {
        font-size: 28px;
        font-weight: bold;
        color: #323233;
        margin-bottom: 4px;
      }

      .label {
        font-size: 12px;
        color: #969799;
      }
    }
  }
}

.study-content {
  background: #fff;
  border-radius: 8px;
  padding: 16px;

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h2 {
      font-size: 16px;
      color: #323233;
    }

    .my-resource {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #969799;
      font-size: 14px;
    }
  }

  .content-item {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    .item-title {
      font-size: 16px;
      font-weight: 500;
      color: #323233;
      margin-bottom: 8px;
    }

    .item-stats {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
      font-size: 12px;
      color: #969799;
    }

    .progress-bar {
      height: 4px;
      background: #f2f3f5;
      border-radius: 2px;
      margin-bottom: 8px;

      .progress {
        height: 100%;
        background: #07c160;
        border-radius: 2px;
      }
    }

    .progress-text {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #969799;
    }
  }
}
</style>
