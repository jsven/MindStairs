<template>
  <div class="rational-numbers">
    <div class="module-header">
      <h1>有理数</h1>
      <p>学习正负数、数轴、绝对值等概念</p>
    </div>

    <div class="module-content">
      <div class="intro-section">
        <h2>什么是有理数？</h2>
        <p>有理数是整数和分数的统称，包括正数、负数和零。</p>
        <p>正数：大于0的数，如 +3、+5.2 等</p>
        <p>负数：小于0的数，如 -2、-7.5 等</p>
        <p>零：0既不是正数也不是负数</p>
        
        <div class="stories-grid">
          <div class="story-card" @click="startThermoElevator">
            <div class="story-icon">🌡️</div>
            <h3>《温差电梯》</h3>
            <p>通过控制电梯在数轴上的移动来理解正负数的加减法</p>
            <div class="story-status">
              <span class="status available">可学习</span>
            </div>
          </div>
        </div>
      </div>

      <div class="rational-numbers-lesson">
        <h2>有理数的基本概念</h2>
        <div class="lesson-content">
          <div class="concepts">
            <div class="concept-card">
              <h3>数轴</h3>
              <p>规定了原点、正方向和单位长度的直线叫做数轴。</p>
              <p>数轴三要素：</p>
              <ul>
                <li>原点：表示0的点</li>
                <li>正方向：向右为正方向</li>
                <li>单位长度：表示1个单位长度的线段</li>
              </ul>
              <p>在数轴上，右边的数总比左边的数大。</p>
            </div>
            
            <div class="concept-card">
              <h3>相反数</h3>
              <p>只有符号不同的两个数叫做互为相反数。</p>
              <p>例如：+3和-3互为相反数，0的相反数是0。</p>
              <p>在数轴上，互为相反数的两个点到原点的距离相等。</p>
            </div>
            
            <div class="concept-card">
              <h3>绝对值</h3>
              <p>数轴上表示数a的点与原点的距离叫做数a的绝对值，记作|a|。</p>
              <p>正数的绝对值是它本身；负数的绝对值是它的相反数；0的绝对值是0。</p>
              <p>例如：|+5| = 5，|-3| = 3，|0| = 0</p>
            </div>
          </div>
          
          <div class="examples">
            <h3>正负数加减法示例</h3>
            <div class="example">
              <p><strong>例题1：</strong> (+3) + (+5) = +8</p>
              <p>同号两数相加，取相同的符号，并把绝对值相加。</p>
            </div>
            
            <div class="example">
              <p><strong>例题2：</strong> (-2) + (+7) = +5</p>
              <p>异号两数相加，取绝对值较大的加数的符号，并用较大的绝对值减去较小的绝对值。</p>
            </div>
            
            <div class="example">
              <p><strong>例题3：</strong> (+4) - (+6) = (+4) + (-6) = -2</p>
              <p>减去一个数，等于加上这个数的相反数。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RationalNumbers',
  methods: {
    startThermoElevator() {
      // 触发跳转到《温差电梯》事件
      this.$emit('start-thermo-elevator');
    }
  }
}
</script>

<style scoped>
.rational-numbers {
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

.rational-numbers-lesson h2 {
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
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
}

.example:last-child {
  margin-bottom: 0;
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
  
  .concepts {
    flex-direction: column;
    align-items: center;
  }
  
  .concept-card {
    width: 90%;
  }
}
</style>