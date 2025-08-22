<template>
  <div class="thermo-elevator">
    <div class="module-header">
      <h1>《温差电梯》</h1>
      <p>通过控制电梯在数轴上的移动来理解正负数的加减法</p>
    </div>

    <div class="game-container">
      <div class="task-panel">
        <h2>任务指令</h2>
        <div class="task-display">
          <span class="task-text">{{ currentTask.instruction }}</span>
        </div>
        <div class="progress">
          <span>任务 {{ currentTaskIndex + 1 }} / {{ tasks.length }}</span>
        </div>
      </div>

      <div class="elevator-container">
        <div class="building-title">
          <h3>数轴大楼</h3>
          <p>地面为0层，向上为正数，向下为负数</p>
        </div>
        
        <div class="building-visualization">
          <!-- 建筑物 -->
          <div class="building">
            <!-- 楼层数字 -->
            <div class="floor-numbers">
              <div 
                v-for="floor in floors" 
                :key="floor" 
                class="floor-number"
                :class="{ 'ground-floor': floor === 0 }"
              >
                {{ floor }}
              </div>
            </div>
            
            <!-- 电梯井 -->
            <div class="elevator-shaft">
              <!-- 电梯 -->
              <div 
                class="elevator" 
                :style="{ transform: `translateY(${elevatorPosition}px)` }"
              >
                <div class="elevator-floor-display">
                  {{ currentPosition }} 楼
                </div>
                <div class="elevator-door">
                  <div class="door-left"></div>
                  <div class="door-right"></div>
                </div>
                <div class="elevator-light" :class="{ active: isElevatorMoving }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="temperature-panel">
        <div class="temperature-title">
          <h3>温度计</h3>
        </div>
        
        <div class="temperature-display">
          <div class="temperature-scale">
            <div 
              class="temperature-marker"
              v-for="temp in temperatures"
              :key="temp"
              :class="{ 'zero-mark': temp === 0 }"
            >
              {{ temp }}°
            </div>
          </div>
          
          <div class="temperature-indicator">
            <div 
              class="temperature-pointer" 
              :style="{ transform: `translateY(${temperaturePosition}px)` }"
            ></div>
          </div>
        </div>
      </div>

      <div class="controls-panel">
        <div class="operation-controls">
          <h4>电梯控制面板</h4>
          <div class="control-buttons">
            <div class="control-row">
              <button @click="moveElevator(5)">上升5层</button>
              <button @click="moveElevator(3)">上升3层</button>
              <button @click="moveElevator(1)">上升1层</button>
            </div>
            <div class="control-row">
              <button @click="moveElevator(-1)">下降1层</button>
              <button @click="moveElevator(-3)">下降3层</button>
              <button @click="moveElevator(-5)">下降5层</button>
            </div>
          </div>
        </div>
        
        <div class="math-expression">
          <h4>数学表达式</h4>
          <div class="expression-display">
            <div class="current-position">当前位置: {{ currentPosition }}层</div>
            <div class="operation-history">
              <div 
                v-for="(operation, index) in operationHistory" 
                :key="index"
                class="operation-step"
              >
                {{ operation }}
              </div>
            </div>
            <div class="current-expression">{{ mathExpression }}</div>
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
          <p v-if="isCorrect">太棒了！电梯到达正确位置！</p>
          <p v-if="isCorrect">最终位置: {{ targetPosition }}层</p>
          <p v-if="isCorrect">数学表达式: {{ mathExpression }} = {{ targetPosition }}</p>
          <p v-if="!isCorrect">位置不正确，请再试一次</p>
          <p v-if="!isCorrect">提示：注意正负数的方向</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThermoElevator',
  data() {
    return {
      currentPosition: 0,
      currentTaskIndex: 0,
      showResult: false,
      isCorrect: false,
      isElevatorMoving: false,
      operationHistory: [],
      tasks: [
        {
          instruction: "从地面开始，上升5层",
          target: 5,
          description: "0 + 5 = 5"
        },
        {
          instruction: "从5层下降8层",
          target: -3,
          description: "5 + (-8) = -3"
        },
        {
          instruction: "从-3层上升4层",
          target: 1,
          description: "-3 + 4 = 1"
        },
        {
          instruction: "从1层下降6层",
          target: -5,
          description: "1 + (-6) = -5"
        }
      ]
    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
    floors() {
      // 生成从10到-10的楼层
      const floors = [];
      for (let i = 10; i >= -10; i--) {
        floors.push(i);
      }
      return floors;
    },
    temperatures() {
      // 生成从40到-40的温度刻度
      const temps = [];
      for (let i = 40; i >= -40; i -= 5) {
        temps.push(i);
      }
      return temps;
    },
    elevatorPosition() {
      // 计算电梯在屏幕上的位置
      // 每层楼高度为20px，0层在中间
      return -this.currentPosition * 20;
    },
    temperaturePosition() {
      // 计算温度指针位置
      // 每5度为20px，0度在中间
      return -this.currentPosition * 4;
    },
    targetPosition() {
      return this.currentTask.target;
    },
    mathExpression() {
      if (this.operationHistory.length === 0) {
        return "0";
      }
      return this.operationHistory.join(" ");
    },
    isTaskCompleted() {
      return this.isCorrect;
    }
  },
  methods: {
    moveElevator(floors) {
      this.isElevatorMoving = true;
      
      // 更新当前位置
      const newPosition = this.currentPosition + floors;
      this.currentPosition = newPosition;
      
      // 添加操作到历史记录
      const operation = floors > 0 ? `+ ${floors}` : `- ${Math.abs(floors)}`;
      this.operationHistory.push(operation);
      
      // 模拟电梯移动动画
      setTimeout(() => {
        this.isElevatorMoving = false;
      }, 500);
    },
    checkSolution() {
      this.isCorrect = (this.currentPosition === this.targetPosition);
      this.showResult = true;
      
      // 几秒后自动隐藏结果
      setTimeout(() => {
        this.showResult = false;
      }, 3000);
    },
    nextTask() {
      if (this.currentTaskIndex < this.tasks.length - 1) {
        this.currentTaskIndex++;
        this.currentPosition = 0; // 重置到地面
        this.operationHistory = [];
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
.thermo-elevator {
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

.elevator-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.building-title {
  text-align: center;
}

.building-title h3 {
  margin: 0;
  color: #2c3e50;
}

.building-title p {
  margin: 5px 0 0;
  color: #7f8c8d;
}

.building-visualization {
  display: flex;
  justify-content: center;
  width: 100%;
}

.building {
  display: flex;
  height: 500px;
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.floor-numbers {
  width: 60px;
  background: #bdc3c7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

.floor-number {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 1px solid #aaa;
}

.floor-number.ground-floor {
  background: #27ae60;
  color: white;
}

.elevator-shaft {
  flex: 1;
  background: #ecf0f1;
  position: relative;
  overflow: hidden;
}

.elevator {
  width: 80%;
  height: 40px;
  background: #3498db;
  position: absolute;
  left: 10%;
  bottom: 50%;
  transition: transform 0.5s ease;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.elevator-floor-display {
  color: white;
  font-weight: bold;
  font-size: 1rem;
  margin-right: 30px;
  z-index: 2;
}

.elevator-door {
  width: 100%;
  height: 100%;
  display: flex;
}

.door-left, .door-right {
  flex: 1;
  background: #2980b9;
  border: 1px solid #1c5c8c;
}

.door-left {
  border-right: none;
  border-radius: 5px 0 0 5px;
}

.door-right {
  border-left: none;
  border-radius: 0 5px 5px 0;
}

.elevator-light {
  width: 10px;
  height: 10px;
  background: #7f8c8d;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
}

.elevator-light.active {
  background: #e74c3c;
  box-shadow: 0 0 5px #e74c3c;
}

.temperature-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.temperature-title h3 {
  margin: 0;
  color: #2c3e50;
}

.temperature-display {
  display: flex;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.temperature-scale {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 15px;
}

.temperature-marker {
  height: 20px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.temperature-marker.zero-mark {
  color: #27ae60;
  font-weight: bold;
}

.temperature-indicator {
  width: 30px;
  height: 420px;
  background: linear-gradient(to bottom, #e74c3c, #f1c40f, #27ae60, #3498db, #8e44ad);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.temperature-pointer {
  width: 40px;
  height: 4px;
  background: #2c3e50;
  position: absolute;
  left: -5px;
  top: 50%;
  transition: transform 0.5s ease;
}

.controls-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}

.operation-controls h4,
.math-expression h4 {
  color: #2c3e50;
  margin-top: 0;
}

.control-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.control-row button {
  flex: 1;
  min-width: 80px;
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.control-row button:hover {
  background: #2980b9;
}

.expression-display {
  background: white;
  padding: 15px;
  border-radius: 5px;
  min-height: 150px;
}

.current-position {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.operation-history {
  margin: 10px 0;
  max-height: 100px;
  overflow-y: auto;
}

.operation-step {
  padding: 2px 0;
  color: #7f8c8d;
}

.current-expression {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #bdc3c7;
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
  .building {
    height: 400px;
  }
  
  .controls-panel {
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