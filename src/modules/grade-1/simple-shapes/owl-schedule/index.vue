<template>
  <div class="owl-schedule">
    <div class="module-header">
      <h1>《猫头鹰的作息》</h1>
      <p>通过调整时钟帮助猫头鹰安排作息时间</p>
    </div>

    <div class="game-container">
      <div class="task-panel">
        <h2>任务卡</h2>
        <div class="task-display">
          <span class="task-text">{{ currentTask.description }}</span>
        </div>
        <div class="progress">
          <span>任务 {{ currentTaskIndex + 1 }} / {{ tasks.length }}</span>
        </div>
      </div>

      <div class="clock-container">
        <div class="scene-description">
          <p>{{ currentTask.scene }}</p>
        </div>
        
        <div class="clock-area">
          <div class="clock" ref="clock">
            <div class="clock-face">
              <!-- 时钟刻度 -->
              <div class="clock-numbers">
                <span v-for="n in 12" :key="n" :style="numberStyle(n)">
                  {{ n }}
                </span>
              </div>
              
              <!-- 时针 -->
              <div 
                class="hour-hand" 
                :style="{ transform: `rotate(${hourRotation}deg)` }"
              ></div>
              
              <!-- 分针 -->
              <div 
                class="minute-hand" 
                :style="{ transform: `rotate(${minuteRotation}deg)` }"
              ></div>
              
              <!-- 中心点 -->
              <div class="center-dot"></div>
            </div>
          </div>
          
          <div class="time-controls">
            <div class="control-group">
              <label>时针</label>
              <input 
                type="range" 
                min="0" 
                max="12" 
                step="1" 
                v-model.number="hour"
                class="time-slider"
              >
              <span class="time-value">{{ hour }} 时</span>
            </div>
            
            <div class="control-group">
              <label>分针</label>
              <input 
                type="range" 
                min="0" 
                max="60" 
                step="5" 
                v-model.number="minute"
                class="time-slider"
              >
              <span class="time-value">{{ minute }} 分</span>
            </div>
          </div>
        </div>
      </div>

      <div class="owl-scene">
        <div class="owl" :class="{ active: isCorrect }">
          <div class="owl-body"></div>
          <div class="owl-eyes"></div>
          <div class="owl-beak"></div>
        </div>
      </div>

      <div class="controls">
        <button 
          class="control-btn check-btn" 
          @click="checkTime"
        >
          检查时间
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
          <p v-if="isCorrect">太棒了！时间设置正确！</p>
          <p v-if="isCorrect">{{ currentTask.description }}，猫头鹰会去{{ currentTask.activity }}</p>
          <p v-if="!isCorrect">时间设置不正确，请再试一次</p>
          <p v-if="!isCorrect">提示：{{ currentTask.hint }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OwlSchedule',
  data() {
    return {
      hour: 7,
      minute: 0,
      currentTaskIndex: 0,
      showResult: false,
      isCorrect: false,
      tasks: [
        {
          time: { hour: 7, minute: 0 },
          description: "7:00，去抓老鼠",
          scene: "天刚亮，猫头鹰需要去抓老鼠作为早餐",
          activity: "抓老鼠",
          hint: "时针指向7，分针指向12"
        },
        {
          time: { hour: 12, minute: 30 },
          description: "12:30，午休时间",
          scene: "中午时分，猫头鹰需要休息一下",
          activity: "午休",
          hint: "时针在12和1之间，分针指向6"
        },
        {
          time: { hour: 19, minute: 0 },
          description: "19:00，晚间巡逻",
          scene: "夜晚来临，猫头鹰开始夜间巡逻",
          activity: "巡逻",
          hint: "时针指向7，分针指向12"
        }
      ]
    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
    hourRotation() {
      // 计算时针旋转角度 (每小时30度，每分钟0.5度)
      // 时针从12点位置开始计算，12点位置为0度
      return (this.hour % 12) * 30 + (this.minute / 60) * 30;
    },
    minuteRotation() {
      // 计算分针旋转角度 (每分钟6度)
      // 分针从12点位置开始计算，12点位置为0度
      return this.minute * 6;
    },
    isTaskCompleted() {
      return this.isCorrect;
    }
  },
  methods: {
    numberStyle(n) {
      // 计算时钟数字的位置
      // 每个数字间隔30度（360度/12个数字）
      // 确保12在顶部，3在右侧，6在底部，9在左侧
      // 使用标准的时钟布局计算
      const angle = (n * 30); // 12点为0度
      const radius = 80; // 半径
      
      // 由于CSS的top/left坐标系与数学坐标系不同
      // 需要进行转换，使0度在顶部
      const radian = ((angle - 90) * Math.PI) / 180;
      const x = Math.cos(radian) * radius;
      const y = Math.sin(radian) * radius;
      
      return {
        position: 'absolute',
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      };
    },
    checkTime() {
      const target = this.currentTask.time;
      this.isCorrect = (this.hour === target.hour && this.minute === target.minute);
      this.showResult = true;
      
      // 几秒后自动隐藏结果
      setTimeout(() => {
        this.showResult = false;
      }, 3000);
    },
    nextTask() {
      if (this.currentTaskIndex < this.tasks.length - 1) {
        this.currentTaskIndex++;
        this.resetClock();
        this.isCorrect = false;
        this.showResult = false;
      }
    },
    resetClock() {
      // 重置时钟到当前任务的默认时间
      const target = this.currentTask.time;
      this.hour = target.hour;
      this.minute = target.minute;
    },
    finishModule() {
      this.$emit('finish-module');
    }
  }
}
</script>

<style scoped>
.owl-schedule {
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

.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.scene-description {
  text-align: center;
  font-size: 1.1rem;
  color: #34495e;
}

.clock-area {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  align-items: center;
}

.clock {
  width: 250px;
  height: 250px;
  position: relative;
}

.clock-face {
  width: 100%;
  height: 100%;
  border: 8px solid #3498db;
  border-radius: 50%;
  position: relative;
  background: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.clock-numbers {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.clock-numbers span {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hour-hand {
  position: absolute;
  width: 6px;
  height: 60px;
  background: #2c3e50;
  top: 50%;
  left: 50%;
  transform-origin: top center;
  transform: translate(-50%, -100%);
  border-radius: 4px;
}

.minute-hand {
  position: absolute;
  width: 4px;
  height: 90px;
  background: #3498db;
  top: 50%;
  left: 50%;
  transform-origin: top center;
  transform: translate(-50%, -100%);
  border-radius: 4px;
}

.center-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #e74c3c;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.time-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.control-group label {
  font-weight: bold;
  color: #2c3e50;
}

.time-slider {
  width: 150px;
}

.time-value {
  font-weight: bold;
  color: #3498db;
}

.owl-scene {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.owl {
  position: relative;
  width: 100px;
  height: 100px;
}

.owl-body {
  width: 80px;
  height: 60px;
  background: #8e6e4a;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 10px;
}

.owl-eyes {
  position: absolute;
  top: 30px;
  left: 25px;
  width: 30px;
  height: 20px;
  display: flex;
  justify-content: space-between;
}

.owl-eyes::before,
.owl-eyes::after {
  content: "";
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  position: absolute;
}

.owl-eyes::before {
  left: 0;
}

.owl-eyes::after {
  right: 0;
}

.owl-beak {
  position: absolute;
  top: 45px;
  left: 40px;
  width: 20px;
  height: 10px;
  background: #ffa500;
  border-radius: 50%;
}

.owl.active .owl-body {
  background: #27ae60;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
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
  .clock-area {
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