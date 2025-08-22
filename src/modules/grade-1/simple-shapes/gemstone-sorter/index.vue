<template>
  <div class="gemstone-sorter">
    <div class="module-header">
      <h1>《宝石分类箱》</h1>
      <p>通过分类不同形状的宝石来认识基本图形</p>
    </div>

    <div class="game-container">
      <div class="task-panel">
        <h2>任务目标</h2>
        <div class="task-display">
          <span class="task-text">将宝石放入对应形状的凹槽中</span>
        </div>
        <div class="progress">
          <span>已分类 {{ sortedCount }} / {{ totalCount }} 颗宝石</span>
        </div>
      </div>

      <div class="game-area">
        <div class="sky-area">
          <h3>天空区域</h3>
          <p>宝石会从这里掉落</p>
          
          <!-- 掉落的宝石 -->
          <div 
            v-for="gem in fallingGems" 
            :key="gem.id"
            class="falling-gem"
            :class="gem.shape"
            :style="{
              left: gem.position.x + 'px',
              top: gem.position.y + 'px'
            }"
            draggable="true"
            @dragstart="startDrag($event, gem)"
          >
            <div class="gem-inner"></div>
          </div>
        </div>
        
        <div class="chest-area">
          <h3>宝石分类箱</h3>
          <p>将宝石拖入对应形状的凹槽中</p>
          
          <div class="gemstone-chest">
            <!-- 圆形凹槽 -->
            <div 
              class="slot circle-slot"
              :class="{ 'active': activeSlot === 'circle' }"
              @dragover.prevent
              @dragenter.prevent="setActiveSlot('circle')"
              @drop="dropGem($event, 'circle')"
              @mouseleave="clearActiveSlot"
              @dragleave="clearActiveSlot"
            >
              <div class="slot-label">圆形</div>
            </div>
            
            <!-- 正方形凹槽 -->
            <div 
              class="slot square-slot"
              :class="{ 'active': activeSlot === 'square' }"
              @dragover.prevent
              @dragenter.prevent="setActiveSlot('square')"
              @drop="dropGem($event, 'square')"
              @mouseleave="clearActiveSlot"
              @dragleave="clearActiveSlot"
            >
              <div class="slot-label">正方形</div>
            </div>
            
            <!-- 三角形凹槽 -->
            <div 
              class="slot triangle-slot"
              :class="{ 'active': activeSlot === 'triangle' }"
              @dragover.prevent
              @dragenter.prevent="setActiveSlot('triangle')"
              @drop="dropGem($event, 'triangle')"
              @mouseleave="clearActiveSlot"
              @dragleave="clearActiveSlot"
            >
              <div class="slot-label">三角形</div>
            </div>
          </div>
        </div>
      </div>

      <div class="feedback-panel">
        <div class="feedback-message" v-if="showFeedback">
          <div v-if="isCorrectDrop" class="correct-feedback">
            <p>太棒了！分类正确！</p>
            <p>💎 +1 分</p>
          </div>
          <div v-if="isIncorrectDrop" class="incorrect-feedback">
            <p>分类错误，请再试一次</p>
            <p>请仔细观察宝石的形状</p>
          </div>
        </div>
        
        <div class="shape-info">
          <h3>图形知识</h3>
          <div class="shape-descriptions">
            <div class="shape-description" :class="{ 'highlighted': highlightedShape === 'circle' }">
              <div class="shape-icon circle-icon"></div>
              <div class="shape-text">
                <h4>圆形</h4>
                <p>圆形是一个平面上到定点距离相等的所有点组成的图形</p>
              </div>
            </div>
            
            <div class="shape-description" :class="{ 'highlighted': highlightedShape === 'square' }">
              <div class="shape-icon square-icon"></div>
              <div class="shape-text">
                <h4>正方形</h4>
                <p>正方形是四条边都相等且四个角都是直角的四边形</p>
              </div>
            </div>
            
            <div class="shape-description" :class="{ 'highlighted': highlightedShape === 'triangle' }">
              <div class="shape-icon triangle-icon"></div>
              <div class="shape-text">
                <h4>三角形</h4>
                <p>三角形是由三条线段首尾相连组成的图形</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button 
          class="control-btn reset-btn" 
          @click="resetGame"
        >
          重新开始
        </button>
        <button 
          class="control-btn finish-btn" 
          @click="finishModule"
          :disabled="sortedCount < totalCount"
        >
          完成学习
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GemstoneSorter',
  data() {
    return {
      fallingGems: [],
      draggingGem: null,
      dragPosition: { x: 0, y: 0 },
      activeSlot: null,
      isCorrectDrop: false,
      isIncorrectDrop: false,
      showFeedback: false,
      highlightedShape: null,
      sortedCount: 0,
      totalCount: 15,
      gemIdCounter: 0,
      nextGemTime: 0
    }
  },
  computed: {
    isGameCompleted() {
      return this.sortedCount >= this.totalCount;
    }
  },
  methods: {
    generateGem() {
      // 生成随机形状的宝石
      const shapes = ['circle', 'square', 'triangle'];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      
      this.gemIdCounter++;
      const gem = {
        id: this.gemIdCounter,
        shape: randomShape,
        position: {
          x: Math.random() * 300 + 50,
          y: -50
        },
        isDropped: false
      };
      
      this.fallingGems.push(gem);
    },
    
    startDrag(event, gem) {
      // 设置拖拽数据
      event.dataTransfer.setData('text/plain', JSON.stringify(gem));
      event.dataTransfer.effectAllowed = 'move';
      
      // 标记宝石已被拾取
      gem.isDropped = true;
      this.draggingGem = gem;
      
      // 高亮对应的图形信息
      this.highlightedShape = gem.shape;
    },
    
    setActiveSlot(slotType) {
      this.activeSlot = slotType;
      // 高亮对应的图形信息
      this.highlightedShape = slotType;
    },
    
    clearActiveSlot() {
      this.activeSlot = null;
      this.highlightedShape = null;
    },
    
    dropGem(event, slotType) {
      event.preventDefault();
      
      // 获取拖拽的宝石数据
      const gemData = JSON.parse(event.dataTransfer.getData('text/plain'));
      
      // 检查宝石是否与凹槽匹配
      if (gemData.shape === slotType) {
        // 正确分类
        this.isCorrectDrop = true;
        this.sortedCount++;
        
        // 从掉落宝石列表中移除已分类的宝石
        this.fallingGems = this.fallingGems.filter(gem => gem.id !== gemData.id);
      } else {
        // 错误分类
        this.isIncorrectDrop = true;
        
        // 将宝石放回天空区域（重置位置）
        const gem = this.fallingGems.find(g => g.id === gemData.id);
        if (gem) {
          gem.isDropped = false;
          gem.position.y = -50;
          gem.position.x = Math.random() * 300 + 50;
        }
      }
      
      // 显示反馈信息
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
        this.isCorrectDrop = false;
        this.isIncorrectDrop = false;
      }, 2000);
      
      // 清除拖拽状态
      this.draggingGem = null;
      
      // 清除凹槽高亮
      this.activeSlot = null;
      this.highlightedShape = null;
    },
    
    resetGame() {
      this.fallingGems = [];
      this.draggingGem = null;
      this.sortedCount = 0;
      this.gemIdCounter = 0;
      this.nextGemTime = 0;
      
      // 初始化生成一些宝石
      for (let i = 0; i < 5; i++) {
        setTimeout(() => this.generateGem(), i * 100);
      }
    },
    
    finishModule() {
      this.$emit('finish-module');
    }
  },
  mounted() {
    // 初始化生成一些宝石
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.generateGem(), i * 1000);
    }
    
    // 定时生成新宝石
    setInterval(() => {
      if (this.fallingGems.filter(gem => !gem.isDropped).length < 5 && this.sortedCount < this.totalCount) {
        this.generateGem();
      }
    }, 3000);
    
    // 更新宝石位置的动画循环
    const updateGemPositions = () => {
      this.fallingGems.forEach(gem => {
        if (!gem.isDropped) {
          gem.position.y += 2;
          // 如果宝石掉出屏幕底部，重新放到顶部
          if (gem.position.y > 400) {
            gem.position.y = -50;
            gem.position.x = Math.random() * 300 + 50;
          }
        }
      });
      requestAnimationFrame(updateGemPositions);
    };
    updateGemPositions();
  },
  beforeDestroy() {
    // 清理定时器
    if (this.gemInterval) {
      clearInterval(this.gemInterval);
    }
  }
}
</script>

<style scoped>
.gemstone-sorter {
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

.game-area {
  display: flex;
  gap: 20px;
  height: 400px;
}

.sky-area, .chest-area {
  flex: 1;
  background: #d6eaf8;
  border-radius: 10px;
  padding: 15px;
  position: relative;
  overflow: hidden;
}

.sky-area h3, .chest-area h3 {
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
}

.sky-area p, .chest-area p {
  color: #7f8c8d;
  text-align: center;
  margin-top: 5px;
}

.chest-area {
  background: #f8c471;
}

/* 宝石样式 */
.falling-gem, .dragging-gem {
  position: absolute;
  width: 50px;
  height: 50px;
  cursor: grab;
  z-index: 10;
}

.falling-gem:active, .dragging-gem {
  cursor: grabbing;
}

.falling-gem.circle, .dragging-gem.circle {
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ff6b6b, #c0392b);
}

.falling-gem.square, .dragging-gem.square {
  background: radial-gradient(circle at 30% 30%, #48c9b0, #16a085);
}

.falling-gem.triangle, .dragging-gem.triangle {
  width: 0;
  height: 0;
  background: transparent;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 50px solid #f39c12;
}

.gem-inner {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  top: 10px;
  left: 15px;
}

.dragging-gem.correct {
  box-shadow: 0 0 20px #27ae60;
}

.dragging-gem.incorrect {
  box-shadow: 0 0 20px #e74c3c;
}

/* 宝石分类箱 */
.gemstone-chest {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: #6c3483;
  border-radius: 10px;
  padding: 20px;
}

.slot {
  width: 100px;
  height: 100px;
  background: #154360;
  border: 3px dashed #aed6f1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
}

.slot.active {
  border: 3px solid #f4d03f;
  background: #1a5276;
  transform: scale(1.1);
}

.slot-label {
  color: #aed6f1;
  font-weight: bold;
  margin-top: 5px;
}

.circle-slot::after {
  content: "";
  width: 60px;
  height: 60px;
  border: 2px solid #aed6f1;
  border-radius: 50%;
}

.square-slot::after {
  content: "";
  width: 60px;
  height: 60px;
  border: 2px solid #aed6f1;
}

.triangle-slot::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 60px solid #aed6f1;
}

.feedback-panel {
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}

.feedback-message {
  text-align: center;
  margin-bottom: 20px;
}

.correct-feedback {
  color: #27ae60;
  font-weight: bold;
  font-size: 1.2rem;
}

.incorrect-feedback {
  color: #e74c3c;
  font-weight: bold;
  font-size: 1.2rem;
}

.shape-info h3 {
  color: #2c3e50;
  text-align: center;
  margin-top: 0;
}

.shape-descriptions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.shape-description {
  background: white;
  padding: 15px;
  border-radius: 10px;
  flex: 1;
  min-width: 200px;
  display: flex;
  gap: 10px;
  transition: all 0.3s ease;
}

.shape-description.highlighted {
  background: #d5f5e3;
  border: 2px solid #27ae60;
  transform: scale(1.05);
}

.shape-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.circle-icon {
  border-radius: 50%;
  background: #3498db;
}

.square-icon {
  background: #2ecc71;
}

.triangle-icon {
  width: 0;
  height: 0;
  background: transparent;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 50px solid #f39c12;
}

.shape-text h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.shape-text p {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;
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

.reset-btn {
  background: #f39c12;
  color: white;
}

.reset-btn:hover {
  background: #d35400;
  transform: translateY(-2px);
}

.finish-btn {
  background: #42b983;
  color: white;
}

.finish-btn:hover:not(:disabled) {
  background: #359c6d;
  transform: translateY(-2px);
}

.finish-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .game-area {
    flex-direction: column;
    height: auto;
  }
  
  .sky-area, .chest-area {
    height: 300px;
  }
  
  .gemstone-chest {
    flex-direction: column;
    gap: 20px;
  }
  
  .shape-descriptions {
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