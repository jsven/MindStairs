<template>
  <div class="equation-decoder">
    <div class="module-header">
      <h1>《方程解码器》</h1>
      <p>通过天平模型解一元一次方程</p>
    </div>

    <div class="game-container">
      <div class="task-panel">
        <h2>当前方程</h2>
        <div class="equation-display">
          <div class="equation-text">{{ formattedEquation }}</div>
        </div>
        <div class="progress">
          <span>任务 {{ currentTaskIndex + 1 }} / {{ tasks.length }}</span>
        </div>
      </div>

      <div class="balance-scale-container">
        <div class="scale-title">
          <h3>天平模型</h3>
          <p>保持天平平衡，解出 X</p>
        </div>
        
        <div class="balance-scale">
          <!-- 天平横梁 -->
          <div class="scale-beam"></div>
          
          <!-- 天平左侧 -->
          <div class="scale-side left-side" :class="{ 'tilted-down': isLeftHeavier }">
            <div class="side-label">左侧</div>
            <div class="side-content">
              <div class="expression">
                <div v-for="(term, index) in leftExpression" :key="'left'+index" class="term">
                  <span v-if="index > 0 && term.value >= 0">+</span>
                  <span v-if="term.type === 'variable'"> {{ term.coefficient }}X </span>
                  <span v-else> {{ term.value }} </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 天平中心点 -->
          <div class="scale-center"></div>
          
          <!-- 天平右侧 -->
          <div class="scale-side right-side" :class="{ 'tilted-down': isRightHeavier }">
            <div class="side-label">右侧</div>
            <div class="side-content">
              <div class="expression">
                <div v-for="(term, index) in rightExpression" :key="'right'+index" class="term">
                  <span v-if="index > 0 && term.value >= 0">+</span>
                  <span v-if="term.type === 'variable'"> {{ term.coefficient }}X </span>
                  <span v-else> {{ term.value }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="solution-container">
        <div class="solution-title">
          <h3>解题步骤</h3>
          <p>X = ?</p>
        </div>
        
        <div class="operations-panel">
          <h4>操作面板</h4>
          <div class="operation-buttons">
            <div class="operation-row">
              <button @click="applyOperation('add', -1)">左侧 -1</button>
              <button @click="applyOperation('add', -5)">左侧 -5</button>
              <button @click="applyOperation('add', -10)">左侧 -10</button>
            </div>
            <div class="operation-row">
              <button @click="applyOperation('add', 1)">左侧 +1</button>
              <button @click="applyOperation('add', 5)">左侧 +5</button>
              <button @click="applyOperation('add', 10)">左侧 +10</button>
            </div>
            <div class="operation-row">
              <button @click="applyOperation('subtract', -1)">右侧 -1</button>
              <button @click="applyOperation('subtract', -5)">右侧 -5</button>
              <button @click="applyOperation('subtract', -10)">右侧 -10</button>
            </div>
            <div class="operation-row">
              <button @click="applyOperation('subtract', 1)">右侧 +1</button>
              <button @click="applyOperation('subtract', 5)">右侧 +5</button>
              <button @click="applyOperation('subtract', 10)">右侧 +10</button>
            </div>
          </div>
          
          <div class="advanced-operations">
            <h4>高级操作</h4>
            <div class="operation-row">
              <button @click="applyOperation('multiply', 2)">两边 ×2</button>
              <button @click="applyOperation('multiply', 0.5)">两边 ×0.5</button>
            </div>
            <div class="operation-row">
              <button @click="applyOperation('divide', 2)">两边 ÷2</button>
              <button @click="applyOperation('divide', 0.5)">两边 ÷0.5</button>
            </div>
          </div>
        </div>
        
        <div class="steps-tracker">
          <h4>解题过程</h4>
          <div class="steps-list">
            <div 
              v-for="(step, index) in solutionSteps" 
              :key="index" 
              class="step-item"
            >
              {{ index + 1 }}. {{ step }}
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
          <p v-if="isCorrect">恭喜！方程解正确！</p>
          <p v-if="isCorrect">X = {{ currentTask.solution }}</p>
          <p v-if="!isCorrect">答案不正确，请再试一次</p>
          <p v-if="!isCorrect">提示：保持天平两边平衡</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquationDecoder',
  data() {
    return {
      currentTaskIndex: 0,
      showResult: false,
      isCorrect: false,
      solutionSteps: [],
      tasks: [
        {
          equation: {
            left: [{ type: 'variable', coefficient: 1 }, { type: 'constant', value: 3 }],
            right: [{ type: 'constant', value: 10 }]
          },
          solution: 7,
          description: "X + 3 = 10"
        },
        {
          equation: {
            left: [{ type: 'variable', coefficient: 1 }, { type: 'constant', value: -5 }],
            right: [{ type: 'constant', value: 2 }]
          },
          solution: 7,
          description: "X - 5 = 2"
        },
        {
          equation: {
            left: [{ type: 'variable', coefficient: 2 }],
            right: [{ type: 'constant', value: 14 }]
          },
          solution: 7,
          description: "2X = 14"
        }
      ]
    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
    leftExpression() {
      return this.currentTask.equation.left;
    },
    rightExpression() {
      return this.currentTask.equation.right;
    },
    formattedEquation() {
      let left = '';
      this.leftExpression.forEach((term, index) => {
        if (index > 0 && ((term.type === 'variable' && term.coefficient >= 0) || 
                          (term.type === 'constant' && term.value >= 0))) {
          left += '+';
        }
        if (term.type === 'variable') {
          left += term.coefficient + 'X';
        } else {
          left += term.value;
        }
      });

      let right = '';
      this.rightExpression.forEach((term, index) => {
        if (index > 0 && ((term.type === 'variable' && term.coefficient >= 0) || 
                          (term.type === 'constant' && term.value >= 0))) {
          right += '+';
        }
        if (term.type === 'variable') {
          right += term.coefficient + 'X';
        } else {
          right += term.value;
        }
      });

      return left + ' = ' + right;
    },
    isLeftHeavier() {
      // 简化的天平倾斜逻辑
      return false;
    },
    isRightHeavier() {
      // 简化的天平倾斜逻辑
      return false;
    },
    isTaskCompleted() {
      return this.isCorrect;
    }
  },
  methods: {
    applyOperation(operation, value) {
      const newStep = this.getOperationDescription(operation, value);
      this.solutionSteps.push(newStep);
      
      // 在实际应用中，这里会更新方程
      console.log(`应用操作: ${operation} 值: ${value}`);
    },
    getOperationDescription(operation, value) {
      switch (operation) {
        case 'add':
          return `左侧 ${value >= 0 ? '+' : ''}${value}`;
        case 'subtract':
          return `右侧 ${value >= 0 ? '+' : ''}${value}`;
        case 'multiply':
          return `两边同时 ×${value}`;
        case 'divide':
          return `两边同时 ÷${value}`;
        default:
          return '';
      }
    },
    checkSolution() {
      // 简化的答案检查逻辑
      // 在实际应用中，这里会根据用户的操作步骤验证答案
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
        this.solutionSteps = [];
        this.isCorrect = false;
        this.showResult = false;
      }
    },
    finishModule() {
      this.$emit('finish-module');
    }
  }
}
</script>

<style scoped>
.equation-decoder {
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

.equation-display {
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.progress {
  font-size: 1rem;
  color: #7f8c8d;
}

.balance-scale-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.scale-title {
  text-align: center;
}

.scale-title h3 {
  margin: 0;
  color: #2c3e50;
}

.scale-title p {
  margin: 5px 0 0;
  color: #7f8c8d;
}

.balance-scale {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  height: 200px;
}

.scale-beam {
  width: 80%;
  height: 8px;
  background: #7f8c8d;
  border-radius: 4px;
  position: relative;
  z-index: 10;
}

.scale-center {
  width: 20px;
  height: 30px;
  background: #2c3e50;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}

.scale-side {
  width: 40%;
  min-height: 120px;
  background: #f8f9fa;
  border: 2px solid #bdc3c7;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 20;
}

.scale-side.tilted-down {
  transform: rotate(5deg);
}

.left-side {
  margin-right: 10%;
}

.right-side {
  margin-left: 10%;
}

.side-label {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.expression {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
}

.term {
  font-size: 1.2rem;
  font-weight: bold;
  color: #3498db;
}

.solution-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}

.solution-title {
  grid-column: 1 / -1;
  text-align: center;
}

.solution-title h3 {
  margin: 0;
  color: #2c3e50;
}

.solution-title p {
  margin: 5px 0 0;
  font-size: 1.2rem;
  color: #e74c3c;
  font-weight: bold;
}

.operations-panel h4,
.steps-tracker h4 {
  color: #2c3e50;
  margin-top: 0;
}

.operation-buttons,
.advanced-operations {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.operation-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.operation-row button {
  flex: 1;
  min-width: 80px;
  padding: 8px 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.operation-row button:hover {
  background: #2980b9;
}

.steps-list {
  max-height: 200px;
  overflow-y: auto;
  background: white;
  padding: 10px;
  border-radius: 5px;
}

.step-item {
  padding: 5px 0;
  border-bottom: 1px solid #ecf0f1;
}

.step-item:last-child {
  border-bottom: none;
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
  .balance-scale {
    flex-direction: column;
    height: auto;
  }
  
  .scale-beam {
    width: 8px;
    height: 200px;
  }
  
  .left-side, .right-side {
    width: 80%;
    margin: 10% 0;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .control-btn {
    width: 80%;
  }
  
  .solution-container {
    grid-template-columns: 1fr;
  }
}
</style>