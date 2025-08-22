<template>
  <div class="homepage">
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
          <img src="../assets/images/1.png" alt="思维阶梯插画">
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
          <div class="grade-theme">{{ grade.theme }}</div>
        </div>
      </div>
    </div>

    <!-- 第四屏 (Featured Module) -->
    <div class="featured-section">
      <h3>亮点体验</h3>
      <div class="featured-content">
        <div class="featured-demo">
          <div class="demo-placeholder">
            <p>数学概念可视化演示</p>
          </div>
        </div>
        <div class="featured-description">
          <p>通过互动游戏和可视化动画，让抽象的数学概念变得生动有趣。</p>
          <button class="explore-button" @click="startExploring">立即体验 →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import curriculumData from '../assets/data/curriculum.js'

export default {
  name: 'Home',
  data() {
    return {
      grades: curriculumData
    }
  },
  methods: {
    startExploring() {
      this.$router.push('/starmap/1')
    },
    selectGrade(grade) {
      this.$router.push(`/starmap/${grade.id}`)
    }
  }
}
</script>

<style scoped>
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

.grade-theme {
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
  font-style: italic;
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

/* 响应式设计 */
@media (max-width: 768px) {
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