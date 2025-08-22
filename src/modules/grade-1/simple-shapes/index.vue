<template>
  <div class="simple-shapes">
    <div class="module-header">
      <h1>认识图形</h1>
      <p>学习认识圆形、正方形、三角形等基本图形</p>
    </div>

    <div class="module-content">
      <div class="intro-section">
        <h2>基本图形</h2>
        <p>在我们的日常生活中，到处都可以看到各种各样的图形。让我们一起来认识一些基本的平面图形。</p>
        
        <div class="stories-grid">
          <div class="story-card" @click="startGemstoneSorter">
            <div class="story-icon">💎</div>
            <h3>《宝石分类箱》</h3>
            <p>通过分类不同形状的宝石来认识基本图形</p>
            <div class="story-status">
              <span class="status available">可学习</span>
            </div>
          </div>
          
          <div class="story-card" @click="startOwlSchedule">
            <div class="story-icon">🦉</div>
            <h3>《猫头鹰的作息》</h3>
            <p>通过调整时钟帮助猫头鹰安排作息时间</p>
            <div class="story-status">
              <span class="status available">可学习</span>
            </div>
          </div>
        </div>
      </div>

      <div class="shapes-lesson">
        <h2>基本图形介绍</h2>
        <div class="lesson-content">
          <div class="shapes-grid">
            <div class="shape-card">
              <div class="shape-display circle"></div>
              <h3>圆形</h3>
              <p>圆形是一个平面上到定点距离相等的所有点组成的图形。</p>
              <p>特点：没有角，边缘光滑。</p>
            </div>
            
            <div class="shape-card">
              <div class="shape-display square"></div>
              <h3>正方形</h3>
              <p>正方形是四条边都相等且四个角都是直角的四边形。</p>
              <p>特点：4条边相等，4个直角。</p>
            </div>
            
            <div class="shape-card">
              <div class="shape-display triangle"></div>
              <h3>三角形</h3>
              <p>三角形是由三条线段首尾相连组成的图形。</p>
              <p>特点：3条边，3个角。</p>
            </div>
          </div>
          
          <div class="examples">
            <h3>生活中的图形</h3>
            <div class="example-grid">
              <div class="example-item">
                <div class="example-icon circle-example"></div>
                <p>圆形：车轮、硬币、钟表</p>
              </div>
              
              <div class="example-item">
                <div class="example-icon square-example"></div>
                <p>正方形：魔方、地砖、窗户</p>
              </div>
              
              <div class="example-item">
                <div class="example-icon triangle-example"></div>
                <p>三角形：三明治、红领巾、屋顶</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleShapes',
  methods: {
    startGemstoneSorter() {
      // 触发跳转到《宝石分类箱》事件
      this.$emit('start-gemstone-sorter');
    },
    startOwlSchedule() {
      // 触发跳转到《猫头鹰的作息》事件
      this.$emit('start-owl-schedule');
    }
  }
}
</script>

<style scoped>
.simple-shapes {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.module-header {
  text-align: center;
  margin-bottom: 30px;
}

.module-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.module-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.intro-section {
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.intro-section h2 {
  color: #2c3e50;
  margin-top: 0;
}

.intro-section p {
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.6;
}

.stories-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.story-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.story-card:hover {
  transform: translateY(-5px);
}

.story-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.story-card h3 {
  color: #2c3e50;
  margin: 10px 0;
}

.story-card p {
  color: #7f8c8d;
  margin-bottom: 15px;
}

.story-status {
  margin-top: 15px;
}

.status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.status.available {
  background: #d5f5e3;
  color: #27ae60;
}

.clock-lesson h2 {
  color: #2c3e50;
  text-align: center;
}

.lesson-content {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.clock-example {
  display: flex;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;
}

.example-clock {
  width: 150px;
  height: 150px;
  position: relative;
}

.clock-face {
  width: 100%;
  height: 100%;
  border: 4px solid #3498db;
  border-radius: 50%;
  position: relative;
  background: #f9f9f9;
}

.clock-center {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #e74c3c;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hour-hand {
  position: absolute;
  width: 4px;
  height: 40px;
  background: #2c3e50;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%) rotate(90deg);
  transform-origin: bottom center;
}

.minute-hand {
  position: absolute;
  width: 2px;
  height: 60px;
  background: #3498db;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%) rotate(180deg);
  transform-origin: bottom center;
}

.clock-numbers {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.clock-numbers span {
  font-size: 0.9rem;
  font-weight: bold;
  color: #2c3e50;
}

.clock-description {
  max-width: 300px;
}

.clock-description p {
  margin: 10px 0;
  color: #34495e;
}

@media (max-width: 768px) {
  .stories-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .story-card {
    width: 90%;
    margin-bottom: 20px;
  }
  
  .shapes-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .shape-card {
    width: 90%;
  }
  
  .example-grid {
    flex-direction: column;
  }
  
  .example-item {
    width: 90%;
  }
}
</style>