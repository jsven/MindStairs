<template>
  <div class="linear-equations">
    <div class="module-header">
      <h1>一元一次方程</h1>
      <p>学习解一元一次方程的方法</p>
    </div>

    <div class="module-content">
      <div class="intro-section">
        <h2>什么是一元一次方程？</h2>
        <p>只含有一个未知数，并且未知数的次数是1的方程叫做一元一次方程。</p>
        <p>例如：X + 3 = 7，2X - 5 = 15 等都是一元一次方程。</p>
        <p>解方程的目标是求出未知数X的值。</p>
        
        <div class="stories-grid">
          <div class="story-card" @click="startEquationDecoder">
            <div class="story-icon">⚙️</div>
            <h3>《方程解码器》</h3>
            <p>通过天平模型解一元一次方程</p>
            <div class="story-status">
              <span class="status available">可学习</span>
            </div>
          </div>
        </div>
      </div>

      <div class="equation-lesson">
        <h2>解方程的基本原则</h2>
        <div class="lesson-content">
          <div class="principles">
            <div class="principle-card">
              <h3>等式性质1</h3>
              <p>等式两边同时加上（或减去）同一个数，等式仍然成立。</p>
              <p>如果 a = b，那么 a ± c = b ± c</p>
            </div>
            
            <div class="principle-card">
              <h3>等式性质2</h3>
              <p>等式两边同时乘以（或除以）同一个不为0的数，等式仍然成立。</p>
              <p>如果 a = b，那么 a × c = b × c (c ≠ 0)</p>
            </div>
          </div>
          
          <div class="example-equations">
            <h3>解方程示例</h3>
            <div class="example">
              <p><strong>例题：</strong>解方程 X + 3 = 7</p>
              <p><strong>解：</strong></p>
              <p>X + 3 = 7</p>
              <p>X + 3 - 3 = 7 - 3 （两边同时减去3）</p>
              <p>X = 4</p>
              <p><strong>检验：</strong>把X = 4代入原方程，左边 = 4 + 3 = 7，右边 = 7，左边 = 右边，所以X = 4是方程的解。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinearEquations',
  methods: {
    startEquationDecoder() {
      // 触发跳转到《方程解码器》事件
      this.$emit('start-equation-decoder');
    }
  }
}
</script>

<style scoped>
.linear-equations {
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

.equation-lesson h2 {
  color: #2c3e50;
  text-align: center;
}

.lesson-content {
  margin-top: 20px;
}

.principles {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.principle-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;
  min-width: 300px;
}

.principle-card h3 {
  color: #2c3e50;
  margin-top: 0;
}

.principle-card p {
  color: #34495e;
  line-height: 1.6;
}

.example-equations {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.example-equations h3 {
  color: #2c3e50;
  margin-top: 0;
}

.example {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
}

.example p {
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
  
  .principles {
    flex-direction: column;
    align-items: center;
  }
  
  .principle-card {
    width: 90%;
  }
}
</style>