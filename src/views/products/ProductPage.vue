<template>
  <HeaderComponent />

  <div class="products-container">
    <!-- 产品分类侧边栏 -->
    <div class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <div class="sidebar-header">
        <h3>产品分类</h3>
        <button class="toggle-btn" @click="toggleSidebar">
          <span v-if="isSidebarCollapsed">▶</span>
          <span v-else>◀</span>
        </button>
      </div>

      <div class="sidebar-content" v-show="!isSidebarCollapsed">
        <ul class="category-list">
          <li v-for="category in categories" :key="category.id" :class="{ active: activeCategory === category.id }"
            @click="selectCategory(category.id)">
            {{ category.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content" :class="{ expanded: isSidebarCollapsed }">
      <h1>我们的产品</h1>

      <div class="products-grid">
        <div class="product-card" v-for="product in filteredProducts" :key="product.id" @click="selectProduct(product)">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">¥{{ product.price }}</div>
            <div class="product-actions">
              <button class="btn-primary">立即购买</button>
              <button class="btn-secondary" @click.stop="viewDocumentation(product)">查看文档</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 产品详情模态框 -->
  <div class="modal" v-if="selectedProduct" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ selectedProduct.name }}</h2>
      <div class="modal-body">
        <div class="modal-image">
          <img :src="selectedProduct.image" :alt="selectedProduct.name">
        </div>
        <div class="modal-info">
          <p>{{ selectedProduct.detailedDescription }}</p>
          <div class="product-price">¥{{ selectedProduct.price }}</div>
          <div class="purchase-options">
            <h4>购买渠道:</h4>
            <ul>
              <li v-for="channel in selectedProduct.purchaseChannels" :key="channel.name">
                <a :href="channel.url" target="_blank">{{ channel.name }}</a> - {{ channel.description }}
              </li>
            </ul>
          </div>
          <button class="btn-primary">立即购买</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 文档模态框 -->
  <div class="modal" v-if="documentationProduct" @click="closeDocumentation">
    <div class="modal-content documentation" @click.stop>
      <span class="close" @click="closeDocumentation">&times;</span>
      <h2>{{ documentationProduct.name }} - 说明文档</h2>
      <div class="documentation-content" v-html="documentationProduct.documentation"></div>
    </div>
  </div>

  <FooterComponent />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

interface PurchaseChannel {
  name: string,
  url: string,
  description: string
}

interface Product {
  id: number,
  name: string,
  categoryId: string,
  description: string,
  detailedDescription: string,
  price: number,
  image: string,
  purchaseChannels: PurchaseChannel[],
  documentation: string
}

// 侧边栏状态
const isSidebarCollapsed = ref(false)
const activeCategory = ref('all')

// 产品分类数据
const categories = [
  { id: 'all', name: '全部产品' },
  { id: 'accessories', name: '摄影配件' },
  { id: 'software', name: '处理软件' },
  { id: 'ai-models', name: 'AI模型' }
]

// 产品数据
const products = ref([
  {
    id: 1,
    name: '专业三脚架',
    categoryId: 'accessories',
    description: '轻便稳定的专业摄影三脚架，适用于各种拍摄场景',
    detailedDescription: '这款专业三脚架采用碳纤维材质，重量轻但承重能力强，最大承重可达10kg。可调节高度设计，适应不同拍摄需求。配备云台，支持360度旋转，精确调整拍摄角度。',
    price: 899,
    image: 'Banner/1.jpg',
    purchaseChannels: [
      { name: '官方商城', url: '#', description: '官方直供，品质保证' },
      { name: '京东', url: '#', description: '京东自营，快速配送' }
    ],
    documentation: '<h3>产品说明</h3><p>本三脚架具有以下特点：</p><ul><li>碳纤维材质，重量轻强度高</li><li>最大高度150cm，最小高度30cm</li><li>承重能力10kg</li><li>360度旋转云台</li></ul><h3>使用方法</h3><p>1. 展开三脚架，调节到合适高度<br>2. 锁紧各节旋钮<br>3. 安装相机<br>4. 调节云台角度</p>'
  },
  {
    id: 2,
    name: '智能补光灯',
    categoryId: 'accessories',
    description: '智能感应补光灯，自动调节亮度和色温',
    detailedDescription: '智能补光灯配备多种光源模式，支持手机APP控制。内置感应器，可根据环境光线自动调节亮度和色温。360度可旋转设计，满足各种角度补光需求。',
    price: 599,
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=400&q=80',
    purchaseChannels: [
      { name: '天猫旗舰店', url: '#', description: '品牌官方店铺' },
      { name: '苏宁易购', url: '#', description: '正品保障，售后无忧' }
    ],
    documentation: '<h3>产品说明</h3><p>智能补光灯特点：</p><ul><li>亮度可调：10%-100%</li><li>色温调节：3200K-5600K</li><li>多种光源模式</li><li>支持APP控制</li></ul><h3>使用方法</h3><p>1. 安装电池或连接电源<br>2. 打开开关<br>3. 通过按钮或APP调节亮度和色温<br>4. 调整照射角度</p>'
  },
  {
    id: 3,
    name: '照片处理大师',
    categoryId: 'software',
    description: '专业级照片处理软件，功能强大易于使用',
    detailedDescription: '照片处理大师是一款专业级照片处理软件，集成了多种高级功能。支持RAW格式处理，拥有智能修图功能，一键优化照片质量。内置数百种滤镜和特效，满足不同风格需求。',
    price: 299,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
    purchaseChannels: [
      { name: '官方网站', url: '#', description: '最新版本，免费升级' },
      { name: 'Steam平台', url: '#', description: '数字版，即买即用' }
    ],
    documentation: '<h3>软件功能</h3><p>照片处理大师包含以下功能模块：</p><ul><li>基础调整：曝光、对比度、色彩等</li><li>高级工具：液化、祛痘、瘦脸等</li><li>滤镜系统：胶片、复古、黑白等风格</li><li>批处理功能：批量处理照片</li></ul><h3>系统要求</h3><p>Windows 10及以上版本，至少8GB内存，2GB可用硬盘空间</p>'
  },
  {
    id: 4,
    name: 'AI人像美化模型',
    categoryId: 'ai-models',
    description: '基于深度学习的人像美化AI模型',
    detailedDescription: 'AI人像美化模型采用最新的深度学习技术，能够智能识别人像特征并进行美化处理。支持批量处理，保留原始细节的同时提升照片质量。适用于证件照、写真等多种场景。',
    price: 1299,
    image: 'Banner/1.jpg',
    purchaseChannels: [
      { name: 'AI模型市场', url: '#', description: '专业AI模型交易平台' },
      { name: '开发者官网', url: '#', description: '技术支持完善' }
    ],
    documentation: '<h3>模型说明</h3><p>AI人像美化模型功能：</p><ul><li>智能面部识别</li><li>皮肤美化与细节保留</li><li>支持批量处理</li><li>多种美化强度可选</li></ul><h3>使用方法</h3><p>1. 下载并安装模型<br>2. 导入照片<br>3. 选择美化参数<br>4. 运行处理<br>5. 导出结果</p>'
  },
  {
    id: 5,
    name: 'AI场景识别插件',
    categoryId: 'ai-models',
    description: '自动识别照片场景并优化参数的AI插件',
    detailedDescription: 'AI场景识别插件能够自动识别照片中的场景类型，如风景、人像、夜景等，并自动应用最佳处理参数。支持主流照片处理软件，大幅提升后期处理效率。',
    price: 899,
    image: 'Banner/1.jpg',
    purchaseChannels: [
      { name: '插件市场', url: '#', description: '即装即用' },
      { name: '订阅服务', url: '#', description: '按月订阅，持续更新' }
    ],
    documentation: '<h3>插件功能</h3><p>支持场景识别类型：</p><ul><li>人像摄影</li><li>风景摄影</li><li>夜景摄影</li><li>运动摄影</li><li>微距摄影</li></ul><h3>兼容性</h3><p>支持Photoshop CC 2019及以上版本，Lightroom Classic 9.0及以上版本</p>'
  },
  {
    id: 6,
    name: '便携式摄影背包',
    categoryId: 'accessories',
    description: '专业摄影背包，防水防震设计',
    detailedDescription: '便携式摄影背包采用防水材料制作，内部有专业防震设计，可容纳专业单反相机、镜头、闪光灯等设备。人体工学背带设计，长时间背负也不会感到疲劳。',
    price: 499,
    image: 'Banner/1.jpg',
    purchaseChannels: [
      { name: '官方商城', url: '#', description: '官方直供' },
      { name: '户外用品店', url: '#', description: '线下体验' }
    ],
    documentation: '<h3>产品规格</h3><p>尺寸：45×30×20cm<br>重量：1.2kg<br>容量：25L<br>隔层：主隔层+5个配件隔层</p><h3>保养说明</h3><p>1. 避免长期暴晒<br>2. 清洁时使用湿布擦拭<br>3. 避免接触尖锐物品<br>4. 定期检查拉链和扣具</p>'
  }
])

// 选中的产品
const selectedProduct = ref(null as Product | null)
const documentationProduct = ref(null as Product | null)

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// 选择分类
const selectCategory = (categoryId: string) => {
  activeCategory.value = categoryId
}

// 过滤产品
const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(product => product.categoryId === activeCategory.value)
})

// 选择产品
const selectProduct = (product: Product) => {
  selectedProduct.value = product
}

// 查看文档
const viewDocumentation = (product: Product) => {
  documentationProduct.value = product
}

// 关闭模态框
const closeModal = () => {
  selectedProduct.value = null
}

// 关闭文档
const closeDocumentation = () => {
  documentationProduct.value = null
}
</script>

<style scoped>
.products-container {
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

.sidebar-content {
  padding: 20px 0;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-list li:hover {
  background: #fff3e0;
  color: #ff9800;
}

.category-list li.active {
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

.main-content h1 {
  color: #ff9800;
  margin-bottom: 30px;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}

.product-card:hover {
  box-shadow: 0 6px 24px rgba(255, 152, 0, 0.18);
  transform: translateY(-4px) scale(1.03);
}

.product-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.product-description {
  color: #666;
  margin-bottom: 15px;
  min-height: 60px;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  color: #ff9800;
  margin: 15px 0;
}

.product-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn-primary {
  background: #ff9800;
  color: white;
}

.btn-primary:hover {
  background: #e68900;
  transform: scale(1.05);
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
  transform: scale(1.05);
}

/* 模态框样式 */
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  margin: auto;
  padding: 30px;
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalopen 0.3s;
}

@keyframes modalopen {
  from {
    opacity: 0;
    transform: translateY(-60px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 15px;
}

.close:hover {
  color: #000;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

.modal-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.purchase-options ul {
  padding-left: 20px;
}

.purchase-options li {
  margin-bottom: 10px;
}

.documentation {
  max-width: 90%;
  width: 90%;
}

.documentation-content {
  margin-top: 20px;
}

.documentation-content h3 {
  color: #ff9800;
  margin: 20px 0 10px;
}

.documentation-content ul {
  padding-left: 20px;
}

.documentation-content li {
  margin-bottom: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .products-container {
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

  .category-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  .category-list li {
    padding: 8px 12px;
    margin: 5px;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .modal-body {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .modal-content {
    width: 95%;
    padding: 20px;
  }
}
</style>
