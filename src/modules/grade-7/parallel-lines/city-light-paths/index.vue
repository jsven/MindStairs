<template>
  <div class="city-light-paths">
    <div class="module-header">
      <h1>《城市光路规划》</h1>
      <p>通过设计城市光路理解平行线与相交线的性质</p>
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

      <div class="light-paths-container">
        <div class="city-title">
          <h3>城市光路规划图</h3>
          <p>拖动第三条光路（红线）切割两条平行光路，观察角度变化</p>
        </div>
        
        <div class="city-map">
          <!-- 城市背景 -->
          <div class="city-background">
            <!-- 建筑物 -->
            <div class="building" v-for="(building, index) in buildings" :key="index"
                 :style="{ left: building.left, top: building.top, width: building.width, height: building.height }">
            </div>
          </div>
          
          <!-- 光路图 -->
          <div class="light-paths-map" ref="lightMap">
            <!-- 平行光路1 -->
            <div class="parallel-line line1"></div>
            
            <!-- 平行光路2 -->
            <div class="parallel-line line2"></div>
            
            <!-- 可拖动的第三条光路 -->
            <div 
              class="transversal-line" 
              :style="{ transform: `rotate(${transversalAngle}deg)` }"
              @mousedown="startDrag"
              @touchstart="startDrag"
            ></div>
            
            <!-- 相交点 -->
            <div class="intersection-point point1" 
                 :style="{ left: '50%', top: '30%', display: showIntersections ? 'block' : 'none' }">
            </div>
            
            <div class="intersection-point point2" 
                 :style="{ left: '50%', top: '70%', display: showIntersections ? 'block' : 'none' }">
            </div>
            
            <!-- 角度标记 -->
            <div class="angle-markers" v-if="showAngleMarkers">
              <!-- 同位角 -->
              <div class="angle-marker corresponding1" 
                   :style="{ left: '45%', top: '25%' }">
                <span class="angle-label">∠1</span>
                <span class="angle-value">{{ angleValues[1] }}°</span>
              </div>
              
              <div class="angle-marker corresponding2" 
                   :style="{ left: '45%', top: '65%' }">
                <span class="angle-label">∠2</span>
                <span class="angle-value">{{ angleValues[2] }}°</span>
              </div>
              
              <!-- 内错角 -->
              <div class="angle-marker alternate1" 
                   :style="{ left: '55%', top: '35%' }">
                <span class="angle-label">∠3</span>
                <span class="angle-value">{{ angleValues[3] }}°</span>
              </div>
              
              <div class="angle-marker alternate2" 
                   :style="{ left: '55%', top: '55%' }">
                <span class="angle-label">∠4</span>
                <span class="angle-value">{{ angleValues[4] }}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="angle-info-panel">
        <div class="angle-title">
          <h3>角度信息</h3>
        </div>
        
        <div class="angle-display">
          <div class="angle-controls">
            <h4>角度控制</h4>
            <div class="angle-slider">
              <label>第三条光路角度: {{ transversalAngle }}°</label>
              <input 
                type="range" 
                min="0" 
                max="180" 
                step="1" 
                v-model.number="transversalAngle"
                class="angle-range"
              >
            </div>
            
            <div class="toggle-buttons">
              <button @click="toggleIntersections">
                {{ showIntersections ? '隐藏' : '显示' }}交点
              </button>
              <button @click="toggleAngleMarkers">
                {{ showAngleMarkers ? '隐藏' : '显示' }}角度标记
              </button>
            </div>
          </div>
          
          <div class="angle-properties">
            <h4>角度性质</h4>
            <div class="property-list">
              <div class="property-item" :class="{ highlighted: isHighlighted('corresponding') }">
                <strong>同位角:</strong> 
                <span v-if="showAngleMarkers">∠1 = ∠2 = {{ angleValues[1] }}°</span>
                <span v-else>位置相同的一对角相等</span>
              </div>
              
              <div class="property-item" :class="{ highlighted: isHighlighted('alternate') }">
                <strong>内错角:</strong> 
                <span v-if="showAngleMarkers">∠3 = ∠4 = {{ angleValues[3] }}°</span>
                <span v-else>交错位置的一对角相等</span>
              </div>
              
              <div class="property-item">
                <strong>邻补角:</strong> 
                <span>相邻的两个角之和为180°</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button 
          class="control-btn check-btn" 
          @click="checkSolution"
        >
          检查结果
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
          <p v-if="isCorrect">太棒了！你已经掌握了平行线的性质！</p>
          <p v-if="isCorrect">同位角相等: ∠1 = ∠2</p>
          <p v-if="isCorrect">内错角相等: ∠3 = ∠4</p>
          <p v-if="!isCorrect">请再仔细观察角度之间的关系</p>
          <p v-if="!isCorrect">提示：拖动红线观察角度变化</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityLightPaths',
  data() {
    return {
      transversalAngle: 45,
      showIntersections: true,
      showAngleMarkers: true,
      currentTaskIndex: 0,
      showResult: false,
      isCorrect: false,
      isDragging: false,
      lastX: 0,
      angleValues: {
        1: 45,
        2: 45,
        3: 135,
        4: 135
      },
      tasks: [
        {
          description: "观察两条平行光路被第三条光路切割形成的同位角",
          target: "identify_corresponding"
        },
        {
          description: "观察两条平行光路被第三条光路切割形成的内错角",
          target: "identify_alternate"
        },
        {
          description: "调整第三条光路的角度，观察角度变化关系",
          target: "observe_changes"
        }
      ],
      buildings: [
        { left: '10%', top: '10%', width: '60px', height: '100px' },
        { left: '20%', top: '60%', width: '80px', height: '120px' },
        { left: '70%', top: '20%', width: '70px', height: '90px' },
        { left: '80%', top: '65%', width: '50px', height: '80px' }
      ]
    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
    isTaskCompleted() {
      return this.isCorrect;
    }
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.lastX = event.clientX || (event.touches && event.touches[0].clientX) || 0;
      
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('touchmove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
      document.addEventListener('touchend', this.stopDrag);
    },
    
    onDrag(event) {
      if (!this.isDragging) return;
      
      const clientX = event.clientX || (event.touches && event.touches[0].clientX) || 0;
      const deltaX = clientX - this.lastX;
      
      // 更新角度（根据拖动距离调整）
      this.transversalAngle = (this.transversalAngle + deltaX * 0.5) % 180;
      if (this.transversalAngle < 0) this.transversalAngle += 180;
      
      // 更新角度值
      this.updateAngleValues();
      
      this.lastX = clientX;
      event.preventDefault();
    },
    
    stopDrag() {
      this.isDragging = false;
      
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
      document.removeEventListener('touchend', this.stopDrag);
    },
    
    updateAngleValues() {
      // 根据第三条光路的角度计算其他角度
      const angle = this.transversalAngle % 90;
      if (angle < 0) angle += 90;
      
      this.angleValues[1] = Math.round(angle);
      this.angleValues[2] = Math.round(angle);
      this.angleValues[3] = Math.round(180 - angle);
      this.angleValues[4] = Math.round(180 - angle);
    },
    
    toggleIntersections() {
      this.showIntersections = !this.showIntersections;
    },
    
    toggleAngleMarkers() {
      this.showAngleMarkers = !this.showAngleMarkers;
    },
    
    isHighlighted(type) {
      // 根据当前任务高亮显示对应性质
      if (this.currentTask.target === 'identify_corresponding' && type === 'corresponding') {
        return true;
      }
      if (this.currentTask.target === 'identify_alternate' && type === 'alternate') {
        return true;
      }
      return false;
    },
    
    checkSolution() {
      // 在这个模块中，只要用户进行了操作就认为是正确的
      this.isCorrect = true;
      this.showResult = true;
      
      // 几秒后自动隐藏结果
      setTimeout(() => {
        this.showResult = false;
      }, 3000);
    },
    
    nextTask() {
      if (this.currentTaskIndex < this.tasks.length - 1) {
        this.currentTaskIndex++;
        this.isCorrect = false;
        this.showResult = false;
      }
    },
    
    finishModule() {
      this.$emit('finish-module');
    }
  },
  mounted() {
    this.updateAngleValues();
  }
}
</script>

<style scoped>
.city-light-paths {
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

.light-paths-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.city-title {
  text-align: center;
}

.city-title h3 {
  margin: 0;
  color: #2c3e50;
}

.city-title p {
  margin: 5px 0 0;
  color: #7f8c8d;
}

.city-map {
  width: 100%;
  height: 400px;
  position: relative;
  background: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.city-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #bdc3c7;
}

.building {
  position: absolute;
  background: #7f8c8d;
  border-radius: 5px;
}

.light-paths-map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.parallel-line {
  position: absolute;
  width: 100%;
  height: 4px;
  background: #3498db;
  left: 0;
  box-shadow: 0 0 10px #3498db;
}

.line1 {
  top: 30%;
}

.line2 {
  top: 70%;
}

.transversal-line {
  position: absolute;
  width: 100%;
  height: 4px;
  background: #e74c3c;
  top: 50%;
  left: 0;
  transform-origin: center;
  cursor: grab;
  box-shadow: 0 0 10px #e74c3c;
}

.transversal-line:active {
  cursor: grabbing;
}

.intersection-point {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #f1c40f;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px #f1c40f;
}

.angle-markers {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.angle-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.angle-label {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1rem;
}

.angle-value {
  color: #e74c3c;
  font-weight: bold;
}

.angle-info-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}

.angle-title h3 {
  margin: 0;
  color: #2c3e50;
}

.angle-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
}

.angle-controls h4,
.angle-properties h4 {
  color: #2c3e50;
  margin-top: 0;
}

.angle-slider {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.angle-range {
  width: 100%;
}

.toggle-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.toggle-buttons button {
  flex: 1;
  min-width: 100px;
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-buttons button:hover {
  background: #2980b9;
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.property-item {
  background: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.property-item.highlighted {
  background: #d5f5e3;
  border-left: 4px solid #27ae60;
  transform: scale(1.02);
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
  .city-map {
    height: 300px;
  }
  
  .angle-display {
    grid-template-columns: 1fr;
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