<template>
  <div class="perimeter-fence">
    <div class="module-header">
      <h1>《蚂蚁工匠的围栏》</h1>
      <p>通过铺设围栏学习周长的概念</p>
    </div>

    <div class="game-container">
      <div class="task-panel">
        <h2>任务目标</h2>
        <div class="task-display">
          <span class="task-text">{{ currentTask.description }}</span>
        </div>
        <div class="progress">
          <span>任务 {{ currentTaskIndex + 1 }} / {{ tasks.length }}</span>
        </div>
      </div>

      <div class="work-area">
        <div class="shapes-area">
          <h3>图形区域</h3>
          <p>蚂蚁工匠需要为这些图形铺设围栏</p>
          
          <div class="shapes-container">
            <!-- 正方形 -->
            <div 
              class="shape square-shape"
              v-if="currentTask.shape === 'square'"
            >
              <div class="shape-grid">
                <div 
                  v-for="stick in squareSticks" 
                  :key="stick.id"
                  class="stick"
                  :class="stick.placed ? 'placed' : 'available'"
                  :style="{
                    left: stick.position.x + 'px',
                    top: stick.position.y + 'px',
                    transform: `rotate(${stick.rotation}deg)`
                  }"
                  @click="placeStick(stick)"
                ></div>
              </div>
              <div class="shape-outline square-outline"></div>
            </div>
            
            <!-- 长方形 -->
            <div 
              class="shape rectangle-shape"
              v-if="currentTask.shape === 'rectangle'"
            >
              <div class="shape-grid">
                <div 
                  v-for="stick in rectangleSticks" 
                  :key="stick.id"
                  class="stick"
                  :class="stick.placed ? 'placed' : 'available'"
                  :style="{
                    left: stick.position.x + 'px',
                    top: stick.position.y + 'px',
                    transform: `rotate(${stick.rotation}deg)`
                  }"
                  @click="placeStick(stick)"
                ></div>
              </div>
              <div class="shape-outline rectangle-outline"></div>
            </div>
            
            <!-- 三角形 -->
            <div 
              class="shape triangle-shape"
              v-if="currentTask.shape === 'triangle'"
            >
              <div class="shape-grid">
                <div 
                  v-for="stick in triangleSticks" 
                  :key="stick.id"
                  class="stick"
                  :class="stick.placed ? 'placed' : 'available'"
                  :style="{
                    left: stick.position.x + 'px',
                    top: stick.position.y + 'px',
                    transform: `rotate(${stick.rotation}deg)`
                  }"
                  @click="placeStick(stick)"
                ></div>
              </div>
              <div class="shape-outline triangle-outline"></div>
            </div>
          </div>
        </div>
        
        <div class="sticks-area">
          <h3>围栏材料区</h3>
          <p>点击虚线围栏将其铺设到图形边缘</p>
          
          <div class="sticks-container">
            <div class="sticks-info">
              <p>已铺设: {{ placedSticksCount }} 根</p>
              <p>总需要: {{ totalSticksNeeded }} 根</p>
            </div>
            
            <div class="sticks-visualization">
              <div 
                class="stick-preview"
                v-for="i in totalSticksNeeded"
                :key="i"
                :class="{ 'placed': i <= placedSticksCount }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="perimeter-info">
        <div class="perimeter-title">
          <h3>周长知识</h3>
        </div>
        
        <div class="perimeter-content">
          <div class="perimeter-explanation">
            <h4>什么是周长？</h4>
            <p>周长是封闭图形一周的长度。</p>
            <p>计算周长就是计算图形所有边的长度之和。</p>
          </div>
          
          <div class="perimeter-formula">
            <h4>计算公式</h4>
            <div v-if="currentTask.shape === 'square'">
              <p>正方形周长 = 边长 × 4</p>
              <p>本题：{{ currentTask.sideLength }} × 4 = {{ currentTask.sideLength * 4 }}</p>
            </div>
            <div v-if="currentTask.shape === 'rectangle'">
              <p>长方形周长 = (长 + 宽) × 2</p>
              <p>本题：({{ currentTask.length }} + {{ currentTask.width }}) × 2 = {{ (currentTask.length + currentTask.width) * 2 }}</p>
            </div>
            <div v-if="currentTask.shape === 'triangle'">
              <p>三角形周长 = 三边长度之和</p>
              <p>本题：{{ currentTask.side1 }} + {{ currentTask.side2 }} + {{ currentTask.side3 }} = {{ currentTask.side1 + currentTask.side2 + currentTask.side3 }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button 
          class="control-btn check-btn" 
          @click="checkSolution"
        >
          检查答案
        </button>
        <button 
          class="control-btn reset-btn" 
          @click="resetTask"
        >
          重新开始
        </button>
        <button 
          class="control-btn next-btn" 
          @click="nextTask"
          :disabled="!isTaskCompleted"
          v-if="currentTaskIndex < tasks.length - 1"
        >
          下一个任务
        </button>
        <button 
          class="control-btn finish-btn" 
          @click="finishModule"
          :disabled="!isTaskCompleted"
          v-if="currentTaskIndex === tasks.length - 1"
        >
          完成学习
        </button>
      </div>

      <div class="result-panel" v-if="showResult">
        <div class="result-message" :class="{ correct: isCorrect, incorrect: !isCorrect }">
          <p v-if="isCorrect">太棒了！围栏铺设正确！</p>
          <p v-if="isCorrect">这个图形的周长是 {{ currentTask.perimeter }} 单位长度</p>
          <p v-if="!isCorrect">围栏铺设不正确，请再试一次</p>
          <p v-if="!isCorrect">提示：沿着图形边缘铺设一圈</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerimeterFence',
  data() {
    return {
      currentTaskIndex: 0,
      showResult: false,
      isCorrect: false,
      tasks: [
        {
          shape: 'square',
          sideLength: 4,
          perimeter: 16,
          description: '为边长为4的正方形铺设围栏'
        },
        {
          shape: 'rectangle',
          length: 5,
          width: 3,
          perimeter: 16,
          description: '为长为5、宽为3的长方形铺设围栏'
        },
        {
          shape: 'triangle',
          side1: 3,
          side2: 4,
          side3: 5,
          perimeter: 12,
          description: '为三边长分别为3、4、5的三角形铺设围栏'
        }
      ]
    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
    squareSticks() {
      if (this.currentTask.shape !== 'square') return [];
      
      const sticks = [];
      const sideLength = this.currentTask.sideLength;
      const stickLength = 20;
      const offsetX = 100;
      const offsetY = 100;
      
      // 上边
      for (let i = 0; i < sideLength; i++) {
        sticks.push({
          id: `top-${i}`,
          position: { x: offsetX + i * stickLength, y: offsetY },
          rotation: 0,
          placed: false
        });
      }
      
      // 右边
      for (let i = 0; i < sideLength; i++) {
        sticks.push({
          id: `right-${i}`,
          position: { x: offsetX + sideLength * stickLength, y: offsetY + i * stickLength },
          rotation: 90,
          placed: false
        });
      }
      
      // 下边
      for (let i = 0; i < sideLength; i++) {
        sticks.push({
          id: `bottom-${i}`,
          position: { x: offsetX + i * stickLength, y: offsetY + sideLength * stickLength },
          rotation: 0,
          placed: false
        });
      }
      
      // 左边
      for (let i = 0; i < sideLength; i++) {
        sticks.push({
          id: `left-${i}`,
          position: { x: offsetX, y: offsetY + i * stickLength },
          rotation: 90,
          placed: false
        });
      }
      
      return sticks;
    },
    rectangleSticks() {
      if (this.currentTask.shape !== 'rectangle') return [];
      
      const sticks = [];
      const length = this.currentTask.length;
      const width = this.currentTask.width;
      const stickLength = 20;
      const offsetX = 100;
      const offsetY = 100;
      
      // 上边
      for (let i = 0; i < length; i++) {
        sticks.push({
          id: `top-${i}`,
          position: { x: offsetX + i * stickLength, y: offsetY },
          rotation: 0,
          placed: false
        });
      }
      
      // 右边
      for (let i = 0; i < width; i++) {
        sticks.push({
          id: `right-${i}`,
          position: { x: offsetX + length * stickLength, y: offsetY + i * stickLength },
          rotation: 90,
          placed: false
        });
      }
      
      // 下边
      for (let i = 0; i < length; i++) {
        sticks.push({
          id: `bottom-${i}`,
          position: { x: offsetX + i * stickLength, y: offsetY + width * stickLength },
          rotation: 0,
          placed: false
        });
      }
      
      // 左边
      for (let i = 0; i < width; i++) {
        sticks.push({
          id: `left-${i}`,
          position: { x: offsetX, y: offsetY + i * stickLength },
          rotation: 90,
          placed: false
        });
      }
      
      return sticks;
    },
    triangleSticks() {
      if (this.currentTask.shape !== 'triangle') return [];
      
      const sticks = [];
      const side1 = this.currentTask.side1;
      const side2 = this.currentTask.side2;
      const side3 = this.currentTask.side3;
      const stickLength = 20;
      const offsetX = 150;
      const offsetY = 150;
      
      // 假设这是一个直角三角形，边1是底边，边2是高，边3是斜边
      // 底边
      for (let i = 0; i < side1; i++) {
        sticks.push({
          id: `base-${i}`,
          position: { x: offsetX + i * stickLength, y: offsetY },
          rotation: 0,
          placed: false
        });
      }
      
      // 高边
      for (let i = 0; i < side2; i++) {
        sticks.push({
          id: `height-${i}`,
          position: { x: offsetX, y: offsetY - i * stickLength },
          rotation: 90,
          placed: false
        });
      }
      
      // 斜边 (简化处理)
      const hypotenuseSticks = side3;
      for (let i = 0; i < hypotenuseSticks; i++) {
        const progress = i / (hypotenuseSticks - 1);
        sticks.push({
          id: `hypotenuse-${i}`,
          position: { 
            x: offsetX + progress * (side1 * stickLength), 
            y: offsetY - progress * (side2 * stickLength) 
          },
          rotation: Math.atan2(-side2, side1) * 180 / Math.PI,
          placed: false
        });
      }
      
      return sticks;
    },
    placedSticksCount() {
      if (this.currentTask.shape === 'square') {
        return this.squareSticks.filter(stick => stick.placed).length;
      } else if (this.currentTask.shape === 'rectangle') {
        return this.rectangleSticks.filter(stick => stick.placed).length;
      } else if (this.currentTask.shape === 'triangle') {
        return this.triangleSticks.filter(stick => stick.placed).length;
      }
      return 0;
    },
    totalSticksNeeded() {
      if (this.currentTask.shape === 'square') {
        return this.currentTask.sideLength * 4;
      } else if (this.currentTask.shape === 'rectangle') {
        return (this.currentTask.length + this.currentTask.width) * 2;
      } else if (this.currentTask.shape === 'triangle') {
        return this.currentTask.side1 + this.currentTask.side2 + this.currentTask.side3;
      }
      return 0;
    },
    isTaskCompleted() {
      return this.isCorrect;
    }
  },
  methods: {
    placeStick(stick) {
      // 切换围栏的铺设状态
      stick.placed = !stick.placed;
    },
    checkSolution() {
      // 检查是否所有围栏都已铺设
      this.isCorrect = (this.placedSticksCount === this.totalSticksNeeded);
      this.showResult = true;
      
      // 几秒后自动隐藏结果
      setTimeout(() => {
        this.showResult = false;
      }, 3000);
    },
    resetTask() {
      // 重置当前任务的围栏状态
      if (this.currentTask.shape === 'square') {
        this.squareSticks.forEach(stick => stick.placed = false);
      } else if (this.currentTask.shape === 'rectangle') {
        this.rectangleSticks.forEach(stick => stick.placed = false);
      } else if (this.currentTask.shape === 'triangle') {
        this.triangleSticks.forEach(stick => stick.placed = false);
      }
      
      this.isCorrect = false;
      this.showResult = false;
    },
    nextTask() {
      if (this.currentTaskIndex < this.tasks.length - 1) {
        this.currentTaskIndex++;
        this.resetTask();
      }
    },
    finishModule() {
      this.$emit('finish-module');
    }
  }
}
</script>

<style scoped>
.perimeter-fence {
  padding: 20px;
  max-width: 1200px;
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

.game-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-panel {
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.task-display {
  margin: 15px 0;
}

.task-text {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
}

.progress {
  font-size: 1rem;
  color: #7f8c8d;
}

.work-area {
  display: flex;
  gap: 20px;
  height: 400px;
}

.shapes-area, .sticks-area {
  flex: 1;
  background: #d5f5e3;
  border-radius: 10px;
  padding: 15px;
}

.shapes-area h3, .sticks-area h3 {
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
}

.shapes-area p, .sticks-area p {
  color: #7f8c8d;
  text-align: center;
  margin-top: 5px;
}

.shapes-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
}

.shape {
  position: relative;
  width: 300px;
  height: 300px;
}

.shape-grid {
  position: absolute;
  width: 100%;
  height: 100%;
}

.stick {
  position: absolute;
  width: 20px;
  height: 4px;
  background: #8e6e4a;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stick.available {
  background: #d5dbdb;
  border: 1px dashed #8e6e4a;
}

.stick.placed {
  background: #8e6e4a;
  box-shadow: 0 0 5px #8e6e4a;
}

.shape-outline {
  position: absolute;
  top: 100px;
  left: 100px;
}

.square-outline {
  width: 80px;
  height: 80px;
  border: 2px solid #2c3e50;
}

.rectangle-outline {
  width: 100px;
  height: 60px;
  border: 2px solid #2c3e50;
}

.triangle-outline {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 80px solid #2c3e50;
}

.sticks-container {
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
}

.sticks-info {
  text-align: center;
  margin-bottom: 20px;
}

.sticks-info p {
  margin: 5px 0;
  color: #2c3e50;
  font-weight: bold;
}

.sticks-visualization {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-content: flex-start;
  overflow-y: auto;
  padding: 10px;
  background: white;
  border-radius: 5px;
}

.stick-preview {
  width: 30px;
  height: 6px;
  background: #d5dbdb;
  border: 1px dashed #8e6e4a;
  border-radius: 2px;
}

.stick-preview.placed {
  background: #8e6e4a;
  border: 1px solid #8e6e4a;
  box-shadow: 0 0 5px #8e6e4a;
}

.perimeter-info {
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}

.perimeter-title h3 {
  margin: 0;
  color: #2c3e50;
  text-align: center;
}

.perimeter-content {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.perimeter-explanation, .perimeter-formula {
  flex: 1;
  min-width: 300px;
  background: white;
  padding: 15px;
  border-radius: 5px;
}

.perimeter-explanation h4, .perimeter-formula h4 {
  margin-top: 0;
  color: #2c3e50;
}

.perimeter-explanation p, .perimeter-formula p {
  color: #34495e;
  line-height: 1.6;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.check-btn {
  background: #3498db;
  color: white;
}

.check-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.reset-btn {
  background: #f39c12;
  color: white;
}

.reset-btn:hover {
  background: #d35400;
  transform: translateY(-2px);
}

.next-btn, .finish-btn {
  background: #42b983;
  color: white;
}

.next-btn:hover:not(:disabled), .finish-btn:hover:not(:disabled) {
  background: #359c6d;
  transform: translateY(-2px);
}

.next-btn:disabled, .finish-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.result-panel {
  background: #d5f5e3;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.result-panel .incorrect {
  background: #fadbd8;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.result-message p {
  margin: 10px 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .work-area {
    flex-direction: column;
    height: auto;
  }
  
  .shapes-area, .sticks-area {
    height: 300px;
  }
  
  .perimeter-content {
    flex-direction: column;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .control-btn {
    width: 80%;
  }
}
</style>