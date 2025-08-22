<template>
  <div class="parallel-lines">
    <div class="module-header">
      <h1>相交线与平行线</h1>
      <p>学习平行线的性质和判定方法</p>
    </div>

    <div class="module-content">
      <div class="intro-section">
        <h2>什么是平行线？</h2>
        <p>在同一平面内，不相交的两条直线叫做平行线。</p>
        <p>平行线的表示方法：AB∥CD，读作"AB平行于CD"。</p>
        <p>平行线的画法：一"落"、二"靠"、三"移"、四"画"。</p>
        
        <div class="stories-grid">
          <div class="story-card" @click="startCityLightPaths">
            <div class="story-icon">🌆</div>
            <h3>《城市光路规划》</h3>
            <p>通过设计城市光路理解平行线与相交线的性质</p>
            <div class="story-status">
              <span class="status available">可学习</span>
            </div>
          </div>
        </div>
      </div>

      <div class="parallel-lines-lesson">
        <h2>平行线的性质</h2>
        <div class="lesson-content">
          <div class="properties">
            <div class="property-card">
              <h3>平行公理</h3>
              <p>经过直线外一点，有且只有一条直线与这条直线平行。</p>
              <p>如果两条直线都与第三条直线平行，那么这两条直线也互相平行。</p>
            </div>
            
            <div class="property-card">
              <h3>平行线的判定</h3>
              <p>1. 同位角相等，两直线平行</p>
              <p>2. 内错角相等，两直线平行</p>
              <p>3. 同旁内角互补，两直线平行</p>
            </div>
            
            <div class="property-card">
              <h3>平行线的性质</h3>
              <p>1. 两直线平行，同位角相等</p>
              <p>2. 两直线平行，内错角相等</p>
              <p>3. 两直线平行，同旁内角互补</p>
            </div>
          </div>
          
          <div class="examples">
            <h3>角度关系示例</h3>
            <div class="example-diagram">
              <div class="diagram-container">
                <div class="parallel-lines-demo">
                  <!-- 平行线 -->
                  <div class="line line1"></div>
                  <div class="line line2"></div>
                  
                  <!-- 截线 -->
                  <div class="transversal"></div>
                  
                  <!-- 角度标记 -->
                  <div class="angle angle1">∠1</div>
                  <div class="angle angle2">∠2</div>
                  <div class="angle angle3">∠3</div>
                  <div class="angle angle4">∠4</div>
                  <div class="angle angle5">∠5</div>
                  <div class="angle angle6">∠6</div>
                  <div class="angle angle7">∠7</div>
                  <div class="angle angle8">∠8</div>
                </div>
              </div>
              
              <div class="angle-relations">
                <div class="relation-group">
                  <h4>同位角</h4>
                  <p>∠1 与 ∠5</p>
                  <p>∠2 与 ∠6</p>
                  <p>∠3 与 ∠7</p>
                  <p>∠4 与 ∠8</p>
                </div>
                
                <div class="relation-group">
                  <h4>内错角</h4>
                  <p>∠3 与 ∠5</p>
                  <p>∠4 与 ∠6</p>
                </div>
                
                <div class="relation-group">
                  <h4>同旁内角</h4>
                  <p>∠3 与 ∠6</p>
                  <p>∠4 与 ∠5</p>
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
  name: 'ParallelLines',
  methods: {
    startCityLightPaths() {
      // 触发跳转到《城市光路规划》事件
      this.$emit('start-city-light-paths');
    }
  }
}
</script>

<style scoped>
.parallel-lines {
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

.parallel-lines-lesson h2 {
  color: #2c3e50;
  text-align: center;
}

.lesson-content {
  margin-top: 20px;
}

.properties {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.property-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;
  min-width: 250px;
}

.property-card h3 {
  color: #2c3e50;
  margin-top: 0;
}

.property-card p {
  color: #34495e;
  line-height: 1.6;
}

.examples {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.examples h3 {
  color: #2c3e50;
  margin-top: 0;
}

.example-diagram {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.diagram-container {
  flex: 1;
  min-width: 300px;
}

.angle-relations {
  flex: 1;
  min-width: 200px;
}

.parallel-lines-demo {
  position: relative;
  height: 200px;
  background: #f8f9fa;
  border-radius: 5px;
  overflow: hidden;
}

.line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: #3498db;
}

.line1 {
  top: 60px;
}

.line2 {
  top: 140px;
}

.transversal {
  position: absolute;
  width: 2px;
  height: 100%;
  background: #e74c3c;
  left: 50%;
  transform: rotate(30deg);
  transform-origin: center;
}

.angle {
  position: absolute;
  font-weight: bold;
  color: #2c3e50;
}

.angle1 { top: 40px; left: 40%; }
.angle2 { top: 40px; left: 60%; }
.angle3 { top: 80px; left: 45%; }
.angle4 { top: 80px; left: 55%; }
.angle5 { top: 120px; left: 45%; }
.angle6 { top: 120px; left: 55%; }
.angle7 { top: 160px; left: 40%; }
.angle8 { top: 160px; left: 60%; }

.relation-group {
  margin-bottom: 20px;
}

.relation-group h4 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.relation-group p {
  color: #34495e;
  margin: 5px 0;
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
  
  .properties {
    flex-direction: column;
    align-items: center;
  }
  
  .property-card {
    width: 90%;
  }
  
  .example-diagram {
    flex-direction: column;
  }
}
</style>