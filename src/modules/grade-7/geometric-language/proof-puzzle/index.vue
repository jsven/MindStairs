<template>
  <div class="proof-puzzle">
    <div class="module-header">
      <h1>《证明拼图》</h1>
      <p>通过拼图游戏学习几何证明的逻辑顺序</p>
    </div>

    <div class="game-container">
      <div class="task-panel">
        <h2>证明任务</h2>
        <div class="task-display">
          <div class="proposition">
            <h3>已知：</h3>
            <p>{{ currentTask.given }}</p>
          </div>
          <div class="conclusion">
            <h3>求证：</h3>
            <p>{{ currentTask.conclusion }}</p>
          </div>
        </div>
        <div class="progress">
          <span>任务 {{ currentTaskIndex + 1 }} / {{ tasks.length }}</span>
        </div>
      </div>

      <div class="proof-container">
        <div class="proof-title">
          <h3>证明过程</h3>
          <p>将证明步骤按正确顺序拖入证明框中</p>
        </div>
        
        <div class="proof-workspace">
          <!-- 证明步骤放置区 -->
          <div class="proof-steps-area">
            <h4>证明步骤</h4>
            <div 
              class="proof-bin"
              @drop="onDrop"
              @dragover="onDragOver"
            >
              <div 
                v-for="(step, index) in proofSteps" 
                :key="step.id"
                class="proof-step"
                :class="{ 'in-place': step.inPlace }"
              >
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">{{ step.content }}</div>
                <div class="step-reason">{{ step.reason }}</div>
              </div>
              <div v-if="proofSteps.length === 0" class="empty-bin">
                <p>将证明步骤拖到这里</p>
              </div>
            </div>
          </div>
          
          <!-- 可选的证明步骤 -->
          <div class="available-steps-area">
            <h4>可选步骤</h4>
            <div class="available-steps">
              <div 
                v-for="step in availableSteps" 
                :key="step.id"
                class="available-step"
                :class="{ 'dragging': step.isDragging }"
                :draggable="true"
                @dragstart="onDragStart($event, step)"
                @dragend="onDragEnd(step)"
              >
                <div class="step-content">{{ step.content }}</div>
                <div class="step-reason">{{ step.reason }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="geometry-panel">
        <div class="geometry-title">
          <h3>几何图形</h3>
        </div>
        
        <div class="geometry-display">
          <div class="geometry-diagram">
            <!-- 几何图形可视化 -->
            <div class="triangle-diagram" v-if="currentTask.id === 1">
              <div class="triangle">
                <div class="vertex a">A</div>
                <div class="vertex b">B</div>
                <div class="vertex c">C</div>
                <div class="vertex d">D</div>
                <div class="side ab">AB</div>
                <div class="side ac">AC</div>
                <div class="side bc">BC</div>
                <div class="side ad">AD</div>
              </div>
            </div>
            
            <div class="angle-diagram" v-if="currentTask.id === 2">
              <div class="intersecting-lines">
                <div class="line line1"></div>
                <div class="line line2"></div>
                <div class="angle angle1">∠1</div>
                <div class="angle angle2">∠2</div>
                <div class="angle angle3">∠3</div>
                <div class="angle angle4">∠4</div>
              </div>
            </div>
          </div>
          
          <div class="geometry-info">
            <h4>图形信息</h4>
            <div class="info-content">
              <p v-for="(info, index) in currentTask.geometryInfo" :key="index">
                {{ info }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button 
          class="control-btn check-btn" 
          @click="checkSolution"
        >
          检查证明
        </button>
        <button 
          class="control-btn reset-btn" 
          @click="resetProof"
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
          <p v-if="isCorrect">证明正确！你已经掌握了几何证明的逻辑顺序。</p>
          <p v-if="!isCorrect">证明顺序有误，请重新排列步骤。</p>
          <p v-if="!isCorrect">提示：{{ currentTask.hint }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProofPuzzle',
  data() {
    return {
      currentTaskIndex: 0,
      showResult: false,
      isCorrect: false,
      proofSteps: [],
      tasks: [
        {
          id: 1,
          given: "在△ABC中，AB=AC，D是BC的中点",
          conclusion: "求证：AD⊥BC",
          geometryInfo: [
            "△ABC是等腰三角形",
            "AB=AC",
            "D是BC的中点，即BD=CD",
            "AD是BC边上的中线"
          ],
          steps: [
            { id: 1, content: "连接AD", reason: "辅助线作法", correctOrder: 1 },
            { id: 2, content: "在△ABD和△ACD中", reason: "构造全等三角形", correctOrder: 2 },
            { id: 3, content: "AB=AC", reason: "已知", correctOrder: 3 },
            { id: 4, content: "BD=CD", reason: "中点定义", correctOrder: 4 },
            { id: 5, content: "AD=AD", reason: "公共边", correctOrder: 5 },
            { id: 6, content: "∴△ABD≌△ACD", reason: "SSS", correctOrder: 6 },
            { id: 7, content: "∴∠ADB=∠ADC", reason: "全等三角形对应角相等", correctOrder: 7 },
            { id: 8, content: "∠ADB+∠ADC=180°", reason: "平角定义", correctOrder: 8 },
            { id: 9, content: "∴∠ADB=∠ADC=90°", reason: "等量代换", correctOrder: 9 },
            { id: 10, content: "∴AD⊥BC", reason: "垂直定义", correctOrder: 10 }
          ],
          hint: "从作辅助线开始，然后证明三角形全等"
        },
        {
          id: 2,
          given: "直线AB、CD相交于点O，∠1=∠2",
          conclusion: "求证：∠3=∠4",
          geometryInfo: [
            "直线AB、CD相交于点O",
            "∠1和∠2是对顶角",
            "∠3和∠4是对顶角"
          ],
          steps: [
            { id: 1, content: "∠1+∠3=180°", reason: "邻补角定义", correctOrder: 1 },
            { id: 2, content: "∠2+∠4=180°", reason: "邻补角定义", correctOrder: 2 },
            { id: 3, content: "∠1=∠2", reason: "已知", correctOrder: 3 },
            { id: 4, content: "∠1+∠3=∠2+∠4", reason: "等量代换", correctOrder: 4 },
            { id: 5, content: "∠3=∠4", reason: "等式性质", correctOrder: 5 }
          ],
          hint: "利用邻补角的性质来证明"
        }
      ]
    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
    availableSteps() {
      // 获取尚未放置的步骤
      const placedStepIds = this.proofSteps.map(step => step.id);
      return this.currentTask.steps
        .filter(step => !placedStepIds.includes(step.id))
        .map(step => ({ ...step, isDragging: false }));
    },
    isTaskCompleted() {
      return this.isCorrect;
    }
  },
  methods: {
    onDragStart(event, step) {
      event.dataTransfer.setData('text/plain', step.id);
      step.isDragging = true;
    },
    
    onDragEnd(step) {
      step.isDragging = false;
    },
    
    onDragOver(event) {
      event.preventDefault();
    },
    
    onDrop(event) {
      event.preventDefault();
      const stepId = parseInt(event.dataTransfer.getData('text/plain'));
      
      // 找到被拖拽的步骤
      const step = this.currentTask.steps.find(s => s.id === stepId);
      if (step && !this.proofSteps.find(s => s.id === stepId)) {
        // 将步骤添加到证明步骤中
        this.proofSteps.push({ ...step, inPlace: true });
      }
    },
    
    checkSolution() {
      // 检查步骤顺序是否正确
      let isCorrect = true;
      for (let i = 0; i < this.proofSteps.length; i++) {
        if (this.proofSteps[i].correctOrder !== i + 1) {
          isCorrect = false;
          break;
        }
      }
      
      // 检查是否所有步骤都已放置
      if (this.proofSteps.length !== this.currentTask.steps.length) {
        isCorrect = false;
      }
      
      this.isCorrect = isCorrect;
      this.showResult = true;
      
      // 几秒后自动隐藏结果
      setTimeout(() => {
        this.showResult = false;
      }, 3000);
    },
    
    resetProof() {
      this.proofSteps = [];
      this.isCorrect = false;
      this.showResult = false;
    },
    
    nextTask() {
      if (this.currentTaskIndex < this.tasks.length - 1) {
        this.currentTaskIndex++;
        this.resetProof();
      }
    },
    
    finishModule() {
      this.$emit('finish-module');
    }
  }
}
</script>

<style scoped>
.proof-puzzle {
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
}

.task-panel h2 {
  margin-top: 0;
  color: #2c3e50;
}

.task-display {
  margin: 15px 0;
}

.proposition, .conclusion {
  margin-bottom: 15px;
}

.proposition h3, .conclusion h3 {
  color: #2c3e50;
  margin-bottom: 5px;
}

.proposition p, .conclusion p {
  font-size: 1.1rem;
  color: #34495e;
  margin: 0;
}

.progress {
  font-size: 1rem;
  color: #7f8c8d;
  text-align: right;
}

.proof-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.proof-title {
  text-align: center;
}

.proof-title h3 {
  margin: 0;
  color: #2c3e50;
}

.proof-title p {
  margin: 5px 0 0;
  color: #7f8c8d;
}

.proof-workspace {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.proof-steps-area, .available-steps-area {
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}

.proof-steps-area h4, .available-steps-area h4 {
  margin-top: 0;
  color: #2c3e50;
}

.proof-bin {
  min-height: 300px;
  background: white;
  border: 2px dashed #bdc3c7;
  border-radius: 5px;
  padding: 15px;
}

.empty-bin {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #7f8c8d;
}

.proof-step {
  background: #d5f5e3;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.proof-step.in-place {
  background: #d5f5e3;
}

.step-number {
  background: #27ae60;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
}

.step-content {
  flex: 1;
  font-weight: bold;
  color: #2c3e50;
}

.step-reason {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-left: 10px;
}

.available-steps {
  min-height: 300px;
  background: white;
  border: 2px dashed #bdc3c7;
  border-radius: 5px;
  padding: 15px;
}

.available-step {
  background: #fff;
  border: 1px solid #3498db;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: grab;
}

.available-step.dragging {
  opacity: 0.5;
}

.available-step:hover {
  background: #f8f9fa;
}

.geometry-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}

.geometry-title h3 {
  margin: 0;
  color: #2c3e50;
}

.geometry-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
}

.geometry-diagram {
  background: white;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.triangle-diagram {
  position: relative;
  width: 200px;
  height: 150px;
}

.triangle {
  position: relative;
  width: 100%;
  height: 100%;
}

.vertex {
  position: absolute;
  font-weight: bold;
  color: #e74c3c;
}

.a { top: 0; left: 50%; transform: translate(-50%, -50%); }
.b { bottom: 0; left: 0; transform: translate(-50%, 50%); }
.c { bottom: 0; right: 0; transform: translate(50%, 50%); }
.d { bottom: 0; left: 50%; transform: translate(-50%, 50%); }

.side {
  position: absolute;
  font-size: 0.9rem;
  color: #3498db;
}

.ab {
  top: 25%;
  left: 25%;
}

.ac {
  top: 25%;
  right: 25%;
}

.bc {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.ad {
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
}

.angle-diagram {
  position: relative;
  width: 200px;
  height: 200px;
}

.intersecting-lines {
  position: relative;
  width: 100%;
  height: 100%;
}

.line {
  position: absolute;
  background: #3498db;
}

.line1 {
  width: 100%;
  height: 2px;
  top: 50%;
  left: 0;
}

.line2 {
  width: 2px;
  height: 100%;
  top: 0;
  left: 50%;
}

.angle {
  position: absolute;
  font-weight: bold;
  color: #e74c3c;
}

.angle1 { top: 20%; left: 20%; }
.angle2 { top: 20%; right: 20%; }
.angle3 { bottom: 20%; right: 20%; }
.angle4 { bottom: 20%; left: 20%; }

.geometry-info h4 {
  color: #2c3e50;
  margin-top: 0;
}

.info-content p {
  color: #34495e;
  margin: 10px 0;
  line-height: 1.5;
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
  .proof-workspace {
    grid-template-columns: 1fr;
  }
  
  .geometry-display {
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