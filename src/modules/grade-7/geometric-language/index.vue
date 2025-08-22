<template>
  <div class="geometric-language">
    <div class="module-header">
      <h1>几何语言</h1>
      <p>学习几何证明的表达和逻辑推理</p>
    </div>

    <div class="module-content">
      <div class="intro-section">
        <h2>什么是几何语言？</h2>
        <p>几何语言是描述几何对象及其关系的专用语言，包括文字语言、符号语言和图形语言。</p>
        <p>在几何证明中，我们需要按照逻辑顺序组织证明步骤，每一步都要有充分的理由。</p>
        
        <div class="stories-grid">
          <div class="story-card" @click="startProofPuzzle">
            <div class="story-icon">🧩</div>
            <h3>《证明拼图》</h3>
            <p>通过拼图游戏学习几何证明的逻辑顺序</p>
            <div class="story-status">
              <span class="status available">可学习</span>
            </div>
          </div>
        </div>
      </div>

      <div class="geometric-language-lesson">
        <h2>几何证明的基本结构</h2>
        <div class="lesson-content">
          <div class="concepts">
            <div class="concept-card">
              <h3>证明的组成部分</h3>
              <p><strong>已知：</strong>题目给出的条件</p>
              <p><strong>求证：</strong>需要证明的结论</p>
              <p><strong>证明：</strong>从已知条件出发，通过逻辑推理得出结论的过程</p>
            </div>
            
            <div class="concept-card">
              <h3>证明步骤的表达</h3>
              <p>每一步证明通常包括：</p>
              <ul>
                <li><strong>内容：</strong>这一步要证明什么</li>
                <li><strong>理由：</strong>依据什么定理、公理或已知条件</li>
              </ul>
              <p>例如：∵AB=AC（已知）</p>
              <p>∴△ABC是等腰三角形（等腰三角形定义）</p>
            </div>
            
            <div class="concept-card">
              <h3>常用证明方法</h3>
              <p><strong>综合法：</strong>从已知条件出发，逐步推导出结论</p>
              <p><strong>分析法：</strong>从结论出发，寻找使其成立的充分条件</p>
              <p><strong>反证法：</strong>假设结论不成立，推导出矛盾</p>
            </div>
          </div>
          
          <div class="examples">
            <h3>证明示例</h3>
            <div class="example">
              <div class="example-header">
                <h4>例题：</h4>
                <p>已知：如图，点B是线段AC的中点。</p>
                <p>求证：AB = BC</p>
              </div>
              
              <div class="example-proof">
                <h4>证明：</h4>
                <div class="proof-step">
                  <p><strong>∵</strong> 点B是线段AC的中点 <strong>（已知）</strong></p>
                </div>
                <div class="proof-step">
                  <p><strong>∴</strong> AB = BC <strong>（线段中点定义）</strong></p>
                </div>
              </div>
              
              <div class="example-explanation">
                <h4>解析：</h4>
                <p>这是一个简单的几何证明，直接根据中点的定义得出结论。</p>
                <p>在几何证明中，每一步推理都必须有充分的理由，不能凭空想象。</p>
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
  name: 'GeometricLanguage',
  methods: {
    startProofPuzzle() {
      // 触发跳转到《证明拼图》事件
      this.$emit('start-proof-puzzle');
    }
  }
}
</script>

<style scoped>
.geometric-language {
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

.geometric-language-lesson h2 {
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

.concept-card ul {
  color: #34495e;
  padding-left: 20px;
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

.example {
  margin-bottom: 20px;
}

.example:last-child {
  margin-bottom: 0;
}

.example-header h4,
.example-proof h4,
.example-explanation h4 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.example-header p,
.example-proof p,
.example-explanation p {
  color: #34495e;
  margin: 5px 0;
  line-height: 1.6;
}

.proof-step {
  margin: 10px 0;
  padding: 5px 0;
}

.proof-step p {
  margin: 0;
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
}
</style>