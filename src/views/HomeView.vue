<template>
  <div class="home-page">
    <header class="home-header">
      <div class="header-left">
        <button class="menu-button" @click="toggleSideNav">
          <i class="fas fa-bars"></i>
        </button>
        <h2>首页</h2>
      </div>
      <div class="header-right">
        <div class="user-info">
          <img :src="userInfo?.avatar" :alt="userInfo?.nickname" class="user-avatar">
          <span>{{ userInfo?.nickname || '用户' }}</span>
        </div>
        <button class="logout-button" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          <span>退出</span>
        </button>
      </div>
    </header>

    <!-- 侧边导航栏 -->
    <transition name="slide-fade">
      <nav v-if="sideNavOpen" class="side-nav">
        <div class="side-nav-header">
          <img :src="userInfo?.avatar" :alt="userInfo?.nickname" class="side-nav-avatar">
          <span class="side-nav-username">{{ userInfo?.nickname || '用户' }}</span>
        </div>
        <ul class="side-nav-menu">
          <li :class="{ active: currentMenuItem === 'home' }">
            <a href="#" @click.prevent="handleMenuItem('home')">
              <i class="fas fa-home"></i>
              首页
            </a>
          </li>
          <li :class="{ active: currentMenuItem === 'dashboard' }">
            <a href="#" @click.prevent="handleMenuItem('dashboard')">
              <i class="fas fa-th-large"></i>
              仪表盘
            </a>
          </li>
          <li :class="{ active: currentMenuItem === 'settings' }">
            <a href="#" @click.prevent="handleMenuItem('settings')">
              <i class="fas fa-cog"></i>
              设置
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="handleLogout">
              <i class="fas fa-sign-out-alt"></i>
              退出登录
            </a>
          </li>
        </ul>
        <button class="side-nav-close" @click="toggleSideNav">
          <i class="fas fa-times"></i>
        </button>
      </nav>
    </transition>

    <div class="side-nav-overlay" v-if="sideNavOpen" @click="toggleSideNav"></div>

    <main class="main-content">
      <div class="tab-container">
        <div class="tab-buttons">
          <button
            class="tab-button"
            :class="{ active: activeTab === 'tab1' }"
            @click="switchTab('tab1')"
          >
            <i class="fas fa-clipboard-list"></i>
            <span>项目</span>
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'tab2' }"
            @click="switchTab('tab2')"
          >
            <i class="fas fa-chart-bar"></i>
            <span>数据统计</span>
          </button>
        </div>

        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'tab1'" key="tab1" class="tab-content">
            <div class="tab-header">
              <h3>项目</h3>
              <p class="tab-description">这是项目的内容区域</p>
            </div>
            <div class="content-placeholder">
              <div class="placeholder-card">
                <div class="placeholder-icon">
                  <i class="fas fa-inbox"></i>
                </div>
                <div class="placeholder-text">
                  <div class="placeholder-title">项目 1</div>
                  <div class="placeholder-subtitle">描述文本</div>
                </div>
              </div>
              <div class="placeholder-card">
                <div class="placeholder-icon">
                  <i class="fas fa-tasks"></i>
                </div>
                <div class="placeholder-text">
                  <div class="placeholder-title">项目 2</div>
                  <div class="placeholder-subtitle">描述文本</div>
                </div>
              </div>
              <div class="placeholder-card">
                <div class="placeholder-icon">
                  <i class="fas fa-folder"></i>
                </div>
                <div class="placeholder-text">
                  <div class="placeholder-title">项目 3</div>
                  <div class="placeholder-subtitle">描述文本</div>
                </div>
              </div>
            </div>
          </div>

          <div v-else key="tab2" class="tab-content">
            <div class="tab-header">
              <h3>数据统计</h3>
              <p class="tab-description">这是数据统计的内容区域</p>
            </div>
            <div class="content-placeholder">
              <div class="placeholder-card">
                <div class="placeholder-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <div class="placeholder-text">
                  <div class="placeholder-title">统计数据 1</div>
                  <div class="placeholder-subtitle">描述文本</div>
                </div>
              </div>
              <div class="placeholder-card">
                <div class="placeholder-icon">
                  <i class="fas fa-chart-pie"></i>
                </div>
                <div class="placeholder-text">
                  <div class="placeholder-title">统计数据 2</div>
                  <div class="placeholder-subtitle">描述文本</div>
                </div>
              </div>
              <div class="placeholder-card">
                <div class="placeholder-icon">
                  <i class="fas fa-database"></i>
                </div>
                <div class="placeholder-text">
                  <div class="placeholder-title">统计数据 3</div>
                  <div class="placeholder-subtitle">描述文本</div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const activeTab = ref('tab1')
const sideNavOpen = ref(false)
const currentMenuItem = ref('home')

const userInfo = computed(() => userStore.userInfo)

const switchTab = (tab) => {
  activeTab.value = tab
}

const toggleSideNav = () => {
  sideNavOpen.value = !sideNavOpen.value
}

const handleMenuItem = (item) => {
  currentMenuItem.value = item
  if (window.innerWidth <= 768) {
    sideNavOpen.value = false
  }
}

const handleLogout = async () => {
  try {
    await userStore.logout()
    sideNavOpen.value = false
    router.push('/login')
  } catch (error) {
    console.error('退出失败:', error)
  }
}

// 键盘切换Tab
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    activeTab.value = activeTab.value === 'tab1' ? 'tab2' : 'tab1'
  } else if (e.key === 'ArrowRight') {
    activeTab.value = activeTab.value === 'tab1' ? 'tab2' : 'tab1'
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 70px;
}

.home-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 15px 30px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  height: 70px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.menu-button {
  display: none;
  background: none;
  border: none;
  font-size: 22px;
  color: #333;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.menu-button:hover {
  background: #f0f0f0;
}

.home-header h2 {
  color: #1a1a2e;
  font-size: 24px;
  font-weight: 700;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.logout-button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
}

/* 侧边导航栏 */
.side-nav {
  position: fixed;
  left: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background: white;
  z-index: 1001;
  box-shadow: 5px 0 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.side-nav-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #e8ecf4;
  margin-bottom: 20px;
}

.side-nav-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  margin-bottom: 15px;
}

.side-nav-username {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
}

.side-nav-menu {
  list-style: none;
}

.side-nav-menu li {
  margin-bottom: 5px;
}

.side-nav-menu a {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 18px;
  color: #666;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.side-nav-menu a:hover {
  background: #f8f9fa;
  color: #667eea;
}

.side-nav-menu li.active a {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.side-nav-menu i {
  font-size: 18px;
  width: 24px;
}

.side-nav-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.side-nav-close:hover {
  background: #f0f0f0;
  color: #333;
}

.side-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.main-content {
  padding: 30px;
}

.tab-container {
  max-width: 1200px;
  margin: 0 auto;
}

.tab-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.tab-button {
  flex: 1;
  padding: 18px 24px;
  background: white;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.tab-button:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}

.tab-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.tab-button i {
  font-size: 18px;
}

.tab-content {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  min-height: 450px;
}

.tab-header h3 {
  color: #1a1a2e;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 700;
}

.tab-description {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

.content-placeholder {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.placeholder-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  border: 1px solid #e8ecf4;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.placeholder-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.placeholder-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.placeholder-icon i {
  font-size: 26px;
  color: white;
}

.placeholder-text {
  flex: 1;
}

.placeholder-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 5px;
}

.placeholder-subtitle {
  font-size: 14px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-header {
    height: 60px;
    padding: 12px 15px;
  }

  .menu-button {
    display: flex;
  }

  .home-header h2 {
    font-size: 20px;
  }

  .user-info {
    display: none;
  }

  .logout-button {
    padding: 8px 16px;
    font-size: 13px;
  }

  .logout-button span {
    display: none;
  }

  .main-content {
    padding: 20px 15px;
  }

  .tab-buttons {
    gap: 8px;
    margin-bottom: 20px;
  }

  .tab-button {
    padding: 14px 16px;
    font-size: 14px;
    border-radius: 12px;
  }

  .tab-button i {
    font-size: 16px;
  }

  .tab-content {
    padding: 25px 20px;
    min-height: 380px;
    border-radius: 16px;
  }

  .tab-header h3 {
    font-size: 24px;
  }

  .tab-description {
    font-size: 14px;
    margin-bottom: 25px;
  }

  .content-placeholder {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .placeholder-card {
    padding: 20px;
    border-radius: 12px;
  }

  .placeholder-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
  }

  .placeholder-icon i {
    font-size: 22px;
  }

  .placeholder-title {
    font-size: 16px;
  }

  .placeholder-subtitle {
    font-size: 13px;
  }
}
</style>
