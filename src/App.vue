[
  {
    "id": 1,
    "name": "一年级",
    "description": "数字认知、简单加减法、基础图形",
    "theme": "数学探险的起点",
    "modules": [
      {
        "id": 1,
        "title": "数字王国",
        "icon": "🔢",
        "description": "认识数字 0-10，学会数数和基本数字书写。",
        "status": "available"
      },
      {
        "id": 2,
        "title": "加法初体验",
        "icon": "➕",
        "description": "理解加法的基本概念，掌握 10 以内的加法。",
        "status": "available"
      },
      {
        "id": 3,
        "title": "减法冒险",
        "icon": "➖",
        "description": "学习减法的基本概念，掌握 10 以内的减法。",
        "status": "locked"
      }
    ]
  },
  {
    "id": 2,
    "name": "二年级",
    "description": "进位加减法、乘法口诀、长度测量",
    "theme": "数学的进阶之旅",
    "modules": [
      {
        "id": 1,
        "title": "进位加法",
        "icon": "➕",
        "description": "掌握进位加法的技巧，解决两位数加法问题。",
        "status": "available"
      },
      {
        "id": 2,
        "title": "退位减法",
        "icon": "➖",
        "description": "学习退位减法，解决两位数减法问题。",
        "status": "available"
      },
      {
        "id": 3,
        "title": "乘法口诀",
        "icon": "✖️",
        "description": "掌握乘法口诀表，熟练进行乘法计算。",
        "status": "available"
      }
    ]
  },
  {
    "id": 3,
    "name": "三年级",
    "description": "周长与面积、分数初识、时间概念",
    "theme": "数学的应用探索",
    "modules": [
      {
        "id": 1,
        "title": "周长计算",
        "icon": "📐",
        "description": "学习如何计算矩形和正方形的周长。",
        "status": "available"
      },
      {
        "id": 2,
        "title": "面积概念",
        "icon": "🧮",
        "description": "理解面积的概念，计算矩形和正方形的面积。",
        "status": "available"
      },
      {
        "id": 3,
        "title": "分数初识",
        "icon": "🧩",
        "description": "认识分数，理解分数的基本概念。",
        "status": "locked"
      }
    ]
  }
]
<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <nav class="navbar">
      <div class="nav-brand">
        <h1>思维阶梯 - MindStairs</h1>
      </div>
      <ul class="nav-menu">
        <li class="nav-item"><a href="#" class="nav-link" @click.prevent="goToHome">首页</a></li>
        <li class="nav-item"><a href="#" class="nav-link" @click.prevent="goToStarmap">知识星图</a></li>
        <li class="nav-item"><a href="#" class="nav-link">我的进度</a></li>
        <li class="nav-item"><a href="#" class="nav-link">设置</a></li>
      </ul>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 首页 -->
      <div class="homepage" v-if="currentPage === 'home'">
        <!-- 第一屏 (Hero Section) -->
        <div class="hero-section">
          <div class="hero-content">
            <h2 class="hero-title">思维阶梯</h2>
            <p class="hero-subtitle">每一步，都算数</p>
            <button class="cta-button" @click="startExploring">开始探索 →</button>
          </div>
          <div class="hero-illustration">
            <!-- 思维阶梯插画 -->
            <div class="illustration-image">
              <img src="./assets/images/1.png" alt="思维阶梯插画">
            </div>
          </div>
        </div>

        <!-- 第二屏 (What & How) -->
        <div class="features-section">
          <h3>拾级而上，点亮思维</h3>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🎮</div>
              <h4>游戏化学习</h4>
              <p>告别枯燥的公式，在生动的故事和挑战中，像玩游戏一样学数学。</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💡</div>
              <h4>可视化概念</h4>
              <p>将抽象的数学知识，变成看得见、摸得着的图形与动画，直观理解背后原理。</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🗺️</div>
              <h4>体系化路径</h4>
              <p>覆盖小学到初中的所有关键知识点，构建一个完整、连贯的思维地图。</p>
            </div>
          </div>
        </div>

        <!-- 第三屏 (Choose Your Grade) -->
        <div class="grades-section">
          <h3>选择你的起点</h3>
          <div class="grades-grid">
            <div 
              class="grade-card" 
              v-for="grade in grades" 
              :key="grade.id"
              @click="selectGrade(grade)"
            >
              <h4>{{ grade.name }}</h4>
              <p>{{ grade.description }}</p>
            </div>
          </div>
        </div>

        <!-- 第四屏 (Featured Module) -->
        <div class="featured-section">
          <h3>亮点体验</h3>
          <div class="featured-content">
            <div class="featured-demo">
              <div class="demo-placeholder">
                <p>抛物线大炮演示动画</p>
              </div>
            </div>
            <div class="featured-description">
              <p>调整参数，发射炮弹！在游戏中直观感受二次函数的魅力。</p>
              <button class="explore-button">立即体验 →</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 知识星图页面 -->
      <div class="starmap" v-if="currentPage === 'starmap' && selectedGrade">
        <div class="starmap-header">
          <button class="back-button" @click="goToHome">← 返回首页</button>
          <h2>{{ selectedGrade.name }} - {{ selectedGrade.theme }}</h2>
          <p>点击节点开始学习之旅</p>
        </div>
        <div class="starmap-container">
          <div class="starmap-content">
            <!-- 知识星图可视化 -->
            <div class="starmap-visualization">
              <div class="starmap-path"></div>
              <div 
                class="starmap-node" 
                v-for="(module, index) in selectedGrade.modules" 
                :key="module.id"
                :class="module.status"
                :style="getNodePosition(index)"
                @click="enterModule(module)"
              >
                <div class="node-icon">{{ module.icon }}</div>
                <div class="node-label">{{ module.title }}</div>
                <div class="node-status">
                  <span v-if="module.status === 'locked'">🔒</span>
                  <span v-if="module.status === 'available'">🌟</span>
                  <span v-if="module.status === 'completed'">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="starmap-controls">
          <button @click="goToHome">返回首页</button>
          <button>回到当前任务</button>
        </div>
      </div>

      <!-- 模块学习页面 -->
      <div class="module-view" v-if="currentPage === 'module' && currentModule">
        <div class="module-header">
          <button class="back-button" @click="backToStarmap">← 返回星图</button>
          <h2>{{ currentModule.title }}</h2>
          <p>{{ currentModule.description }}</p>
        </div>
        <div class="module-content">
          <div class="module-placeholder" v-if="currentModule.id !== 'multiplication-tables' && !showMushroomMatrix">
            <p>这里是模块 "{{ currentModule.title }}" 的学习内容</p>
            <p>实际项目中，这里会显示互动学习界面</p>
            <div class="module-demo">
              <p>互动学习模块演示区域</p>
            </div>
            <button class="complete-button" @click="completeModule">完成学习</button>
          </div>
          <div class="module-specific-content" v-if="currentModule.id === 'multiplication-tables' && !showMushroomMatrix">
            <!-- 这里将加载乘法口诀模块的具体内容 -->
            <multiplication-tables-module @start-mushroom-matrix="showMushroomMatrix = true"></multiplication-tables-module>
          </div>
          <div class="module-specific-content" v-if="currentModule.id === 'multiplication-tables' && showMushroomMatrix">
            <!-- 这里将加载《种蘑菇方阵》子模块 -->
            <mushroom-matrix-module @finish-module="finishMushroomMatrix"></mushroom-matrix-module>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import curriculumData from './assets/data/curriculum.js';
import MultiplicationTablesModule from './modules/grade-2/multiplication-tables/index.vue';
import MushroomMatrixModule from './modules/grade-2/multiplication-tables/mushroom-matrix/index.vue';

export default {
  name: 'App',
  components: {
    MultiplicationTablesModule,
    MushroomMatrixModule
  },
  data() {
    return {
      currentPage: 'home', // 'home', 'starmap', or 'module'
      grades: curriculumData,
      selectedGrade: null,
      currentModule: null,
      showMushroomMatrix: false
    }
  },
  methods: {
    startExploring() {
      this.currentPage = 'starmap';
      this.selectedGrade = this.grades[0]; // 默认选择第一个年级
    },
    goToHome() {
      this.currentPage = 'home';
      this.selectedGrade = null;
      this.currentModule = null;
      this.showMushroomMatrix = false;
    },
    goToStarmap() {
      this.currentPage = 'starmap';
      this.selectedGrade = this.grades[0]; // 默认选择第一个年级
      this.currentModule = null;
      this.showMushroomMatrix = false;
    },
    selectGrade(grade) {
      this.selectedGrade = grade;
      this.currentPage = 'starmap';
    },
    backToStarmap() {
      this.currentPage = 'starmap';
      this.currentModule = null;
      this.showMushroomMatrix = false;
    },
    enterModule(module) {
      if (module.status === 'locked') {
        alert('请先完成前置知识点');
        return;
      }
      this.currentModule = module;
      this.currentPage = 'module';
      this.showMushroomMatrix = false;
    },
    completeModule() {
      alert(`恭喜完成 "${this.currentModule.title}" 的学习！`);
      // 在实际应用中，这里会更新用户进度
      this.backToStarmap();
    },
    finishMushroomMatrix() {
      this.showMushroomMatrix = false;
      // 可以在这里添加完成学习后的逻辑
      alert('恭喜完成《种蘑菇方阵》的学习！');
    },
    getNodePosition(index) {
      // 计算星图节点的位置，创建蜿蜒路径效果
      const x = 20 + (index % 3) * 30;
      const y = 20 + Math.floor(index / 3) * 25;
      return {
        left: `${x}%`,
        top: `${y}%`
      };
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #42b983;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.nav-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  list-style: none;
}

.nav-item {
  margin-left: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
  cursor: pointer;
}

.nav-link:hover {
  opacity: 0.8;
}

/* 主内容区域 */
.main-content {
  width: 100%;
  min-height: calc(100vh - 70px);
}

/* 首页样式 */
.homepage {
  width: 100%;
}

/* 第一屏 (Hero Section) */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto 2rem;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background: #fff;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s;
  font-weight: bold;
}

.cta-button:hover {
  transform: scale(1.05);
}

.hero-illustration {
  max-width: 600px;
  margin: 2rem auto 0;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 第二屏 (Features Section) */
.features-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.features-section h3 {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h4 {
  margin: 1rem 0;
  color: #2c3e50;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

/* 第三屏 (Grades Section) */
.grades-section {
  padding: 4rem 2rem;
}

.grades-section h3 {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.grades-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.grade-card {
  background: linear-gradient(135deg, #42b983 0%, #42b983 100%);
  border-radius: 10px;
  padding: 2rem;
  color: white;
  cursor: pointer;
  transition: transform 0.3s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.grade-card:hover {
  transform: scale(1.05);
}

.grade-card h4 {
  margin-top: 0;
  font-size: 1.5rem;
}

.grade-card p {
  opacity: 0.9;
}

/* 第四屏 (Featured Section) */
.featured-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.featured-section h3 {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.featured-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.featured-demo {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-placeholder {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.featured-description p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.explore-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s;
}

.explore-button:hover {
  background: #359c6d;
}

/* 知识星图页面 */
.starmap {
  width: 100%;
  min-height: calc(100vh - 70px);
  background: #0c1427;
  color: white;
  padding: 2rem;
}

.starmap-header {
  text-align: center;
  margin-bottom: 2rem;
}

.starmap-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.starmap-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.starmap-content {
  width: 100%;
  max-width: 1200px;
  height: 70vh;
  background: linear-gradient(135deg, #1a2a6c, #2c3e50);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.starmap-placeholder {
  text-align: center;
  padding: 2rem;
}

.back-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
  float: left;
}

.starmap-visualization {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230c1427"/><circle cx="20" cy="20" r="0.5" fill="white" opacity="0.5"/><circle cx="50" cy="40" r="0.3" fill="white" opacity="0.5"/><circle cx="80" cy="30" r="0.4" fill="white" opacity="0.5"/><circle cx="30" cy="70" r="0.6" fill="white" opacity="0.5"/><circle cx="70" cy="80" r="0.3" fill="white" opacity="0.5"/></svg>');
}

.starmap-path {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 80%;
  height: 60%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: rotate(15deg);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.starmap-node {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  transform: translate(-50%, -50%);
}

.starmap-node:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.starmap-node.locked {
  background: rgba(127, 140, 141, 0.7);
  border: 2px solid #7f8c8d;
}

.starmap-node.available {
  background: rgba(52, 152, 219, 0.7);
  border: 2px solid #3498db;
  box-shadow: 0 0 15px #3498db;
}

.starmap-node.completed {
  background: rgba(241, 196, 15, 0.7);
  border: 2px solid #f1c40f;
  box-shadow: 0 0 15px #f1c40f;
}

.node-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.node-label {
  font-size: 0.7rem;
  text-align: center;
  padding: 0 5px;
}

.node-status {
  font-size: 1rem;
  margin-top: 5px;
}

.starmap-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.starmap-controls button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s;
}

.starmap-controls button:hover {
  background: #359c6d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }
  
  .nav-menu {
    margin-top: 1rem;
  }
  
  .nav-item {
    margin: 0 0.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .featured-content {
    grid-template-columns: 1fr;
  }
  
  .grades-grid {
    grid-template-columns: 1fr;
  }
}
</style>