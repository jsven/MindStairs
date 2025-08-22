<template>
  <div class="perimeter">
    <div class="module-header">
      <h1>周长</h1>
      <p>学习图形周长的概念和计算方法</p>
    </div>

    <div class="module-content">
      <div class="intro-section">
        <h2>什么是周长？</h2>
        <p>周长是封闭图形一周的长度，也就是图形所有边的长度总和。</p>
        <p>在日常生活中，我们会遇到很多需要计算周长的情况，比如围栏的长度、相框的边框等等。</p>
        
        <div class="stories-grid">
          <div class="story-card" @click="startPerimeterFence">
            <div class="story-icon">🐜</div>
            <h3>《蚂蚁工匠的围栏》</h3>
            <p>通过铺设围栏学习周长的概念</p>
            <div class="story-status">
              <span class="status available">可学习</span>
            </div>
          </div>
        </div>
      </div>

      <div class="perimeter-lesson">
        <h2>周长的计算</h2>
        <div class="lesson-content">
          <div class="concepts">
            <div class="concept-card">
              <h3>周长的定义</h3>
              <p>周长是封闭图形一周的长度。</p>
              <p>计算周长就是计算图形所有边的长度之和。</p>
              <p>周长通常用字母C表示，长度单位有厘米(cm)、米(m)等。</p>
            </div>
            
            <div class="concept-card">
              <h3>常见图形的周长公式</h3>
              <div class="formula">
                <p><strong>正方形：</strong>C = 边长 × 4</p>
                <p><strong>长方形：</strong>C = (长 + 宽) × 2</p>
                <p><strong>三角形：</strong>C = 三边长度之和</p>
                <p><strong>任意多边形：</strong>C = 所有边长之和</p>
              </div>
            </div>
            
            <div class="concept-card">
              <h3>周长与面积的区别</h3>
              <p><strong>周长：</strong>指图形边缘的长度，是一维的。</p>
              <p><strong>面积：</strong>指图形内部的大小，是二维的。</p>
              <p>两者计算方法不同，单位也不同（周长用长度单位，面积用面积单位）。</p>
            </div>
          </div>
          
          <div class="examples">
            <h3>计算示例</h3>
            <div class="example-grid">
              <div class="example-card">
                <h4>正方形示例</h4>
                <div class="example-content">
                  <div class="shape-example square-example"></div>
                  <p>边长为5cm的正方形</p>
                  <p>周长 = 5 × 4 = 20(cm)</p>
                </div>
              </div>
              
              <div class="example-card">
                <h4>长方形示例</h4>
                <div class="example-content">
                  <div class="shape-example rectangle-example"></div>
                  <p>长为6cm，宽为4cm的长方形</p>
                  <p>周长 = (6 + 4) × 2 = 20(cm)</p>
                </div>
              </div>
              
              <div class="example-card">
                <h4>三角形示例</h4>
                <div class="example-content">
                  <div class="shape-example triangle-example"></div>
                  <p>三边分别为3cm、4cm、5cm的三角形</p>
                  <p>周长 = 3 + 4 + 5 = 12(cm)</p>
                </div>
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
  name: 'Perimeter',
  methods: {
    startPerimeterFence() {
      // 触发跳转到《蚂蚁工匠的围栏》事件
      this.$emit('start-perimeter-fence');
    }
  }
}
</script>

<style scoped>
.perimeter {
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

.perimeter-lesson h2 {
  color: #2c3e50;
  text-align: center;
}

.lesson-content {
  margin-top: 20px;
}

.concepts {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.concept-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;
  min-width: 250px;
}

.concept-card h3 {
  color: #2c3e50;
  margin-top: 0;
}

.concept-card p {
  color: #34495e;
  line-height: 1.6;
}

.formula p {
  margin: 10px 0;
  color: #e74c3c;
  font-weight: bold;
}

.examples {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.examples h3 {
  color: #2c3e50;
  text-align: center;
  margin-top: 0;
}

.example-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.example-card {
  flex: 1;
  min-width: 200px;
  background: #f8f9fa;
  border-radius: 5px;
  padding: 15px;
}

.example-card h4 {
  color: #2c3e50;
  text-align: center;
  margin-top: 0;
}

.example-content {
  text-align: center;
}

.shape-example {
  width: 100px;
  height: 100px;
  margin: 0 auto 15px;
}

.square-example {
  background: #3498db;
}

.rectangle-example {
  width: 120px;
  background: #2ecc71;
}

.triangle-example {
  width: 0;
  height: 0;
  background: transparent;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #f39c12;
  margin: 0 auto 15px;
}

.example-content p {
  margin: 5px 0;
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
  
  .concepts {
    flex-direction: column;
    align-items: center;
  }
  
  .concept-card {
    width: 90%;
  }
  
  .example-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .example-card {
    width: 90%;
  }
}
</style>