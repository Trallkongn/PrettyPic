<template>
  <HeaderComponent />

  <div class="help-container">
    <!-- 左侧大纲栏 -->
    <div class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <div class="sidebar-header">
        <h3>帮助文档</h3>
        <button class="toggle-btn" @click="toggleSidebar">
          <span v-if="isSidebarCollapsed">▶</span>
          <span v-else>◀</span>
        </button>
      </div>

      <div class="sidebar-content" v-show="!isSidebarCollapsed">
        <ul class="toc">
          <li v-for="item in toc" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="scrollToSection(item.id)">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content" :class="{ expanded: isSidebarCollapsed }">
      <div class="help-content">
        <section id="introduction" class="content-section">
          <h2>欢迎使用PrettyPic拍照服务</h2>
          <p>PrettyPic是一个专业的在线拍照服务平台，为您提供便捷的一键约拍和客制化摄影服务。无论您是需要证件照、写真集还是商业摄影，我们都能为您提供专业解决方案。</p>
        </section>

        <section id="quick-shot" class="content-section">
          <h2>一键约拍服务</h2>
          <p>一键约拍是我们最受欢迎的服务，您只需简单几步就能预约到专业摄影师：</p>
          <ol>
            <li>选择拍摄类型（证件照、生活照、艺术照等）</li>
            <li>选择合适的时间和地点</li>
            <li>确认订单并完成支付</li>
            <li>等待摄影师上门服务或前往指定拍摄点</li>
          </ol>
          <p>我们的摄影师都经过严格筛选和专业培训，确保为您拍出满意的照片。</p>
        </section>

        <section id="custom-service" class="content-section">
          <h2>客制化服务</h2>
          <p>如果您有特殊需求，我们的客制化服务可以为您提供专属拍摄方案：</p>
          <ul>
            <li>专业摄影师一对一服务</li>
            <li>个性化拍摄方案设计</li>
            <li>多种风格和场景选择</li>
            <li>后期精修和特效处理</li>
            <li>多种尺寸和格式输出</li>
          </ul>
          <p>只需告诉我们您的需求，我们将为您量身打造最合适的拍摄方案。</p>
        </section>

        <section id="photo-tips" class="content-section">
          <h2>拍照小贴士</h2>
          <h3>拍摄前准备</h3>
          <ul>
            <li>保持良好的休息状态，确保精神饱满</li>
            <li>选择合适的服装，避免过于花哨的图案</li>
            <li>提前了解拍摄场景和风格要求</li>
          </ul>

          <h3>拍摄时注意事项</h3>
          <ul>
            <li>放松自然，听从摄影师指导</li>
            <li>保持良好姿态，挺胸收腹</li>
            <li>适当微笑，展现自信</li>
          </ul>
        </section>

        <section id="faq" class="content-section">
          <h2>常见问题</h2>
          <div class="faq-item">
            <h3>Q: 预约后可以修改时间吗？</h3>
            <p>A: 可以，但需要在拍摄前24小时以上进行修改，请通过客服或订单页面操作。</p>
          </div>

          <div class="faq-item">
            <h3>Q: 拍摄不满意可以重拍吗？</h3>
            <p>A: 我们提供一次免费重拍服务，如需额外重拍将收取一定费用。</p>
          </div>

          <div class="faq-item">
            <h3>Q: 照片的版权归属如何？</h3>
            <p>A: 您拥有照片的使用权，摄影师保留署名权。如需商业用途，请提前说明。</p>
          </div>
        </section>

        <section id="contact" class="content-section">
          <h2>联系我们</h2>
          <p>如有其他问题，欢迎通过以下方式联系我们：</p>
          <ul>
            <li>客服热线：xxx-xxx-xxxx（工作日 9:00-18:00）</li>
            <li>在线客服：个人消息</li>
            <li>邮箱：support@prettypic.com</li>
            <li>地址：江西省南昌市易美拍有限公司</li>
          </ul>
        </section>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

// 侧边栏状态
const isSidebarCollapsed = ref(false)
const activeSection = ref('introduction')

// 目录数据
const toc = [
  { id: 'introduction', title: '欢迎使用' },
  { id: 'quick-shot', title: '一键约拍服务' },
  { id: 'custom-service', title: '客制化服务' },
  { id: 'photo-tips', title: '拍照小贴士' },
  { id: 'faq', title: '常见问题' },
  { id: 'contact', title: '联系我们' }
]

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// 滚动到指定章节
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}

// 监听滚动事件，更新当前活动章节
const handleScroll = () => {
  const sections = document.querySelectorAll('.content-section')
  const scrollPosition = window.scrollY + 200

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i] as HTMLElement
    if (section.offsetTop <= scrollPosition) {
      activeSection.value = section.id
      break
    }
  }
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载前移除滚动监听
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.help-container {
  display: flex;
  min-height: calc(100vh - 120px);
  margin-top: 60px;
}

.sidebar {
  width: 280px;
  background: #fff;
  border-right: 1px solid #eee;
  transition: all 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 60px;
  height: fit-content;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.sidebar-header h3 {
  margin: 0;
  color: #ff9800;
  white-space: nowrap;
  overflow: hidden;
}

.toggle-btn {
  background: #ff9800;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: #e68900;
  transform: scale(1.05);
}

.toc {
  list-style: none;
  padding: 20px 0;
  margin: 0;
}

.toc li {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc li:hover {
  background: #fff3e0;
  color: #ff9800;
}

.toc li.active {
  background: #fff3e0;
  color: #ff9800;
  font-weight: bold;
  border-left: 3px solid #ff9800;
}

.main-content {
  flex: 1;
  padding: 20px 40px;
  transition: all 0.3s ease;
}

.main-content.expanded {
  padding-left: 60px;
}

.help-content {
  max-width: 900px;
  margin: 0 auto;
}

.content-section {
  padding: 30px 0;
  border-bottom: 1px solid #eee;
}

.content-section h2 {
  color: #ff9800;
  margin-bottom: 20px;
}

.content-section h3 {
  color: #ff9800;
  margin: 20px 0 10px;
}

.content-section p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
}

.content-section ul,
.content-section ol {
  margin: 15px 0;
  padding-left: 20px;
}

.content-section li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.faq-item {
  margin-bottom: 25px;
}

.faq-item h3 {
  color: #333;
  margin-bottom: 8px;
}

.faq-item p {
  margin: 0;
  padding-left: 15px;
  border-left: 3px solid #ff9800;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .help-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: relative;
    top: 0;
    height: auto;
  }

  .sidebar.collapsed {
    width: 100%;
  }

  .main-content {
    padding: 20px;
  }

  .main-content.expanded {
    padding-left: 20px;
  }

  .toc {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  .toc li {
    padding: 8px 12px;
    margin: 5px;
    background: #f5f5f5;
    border-radius: 4px;
  }
}
</style>
