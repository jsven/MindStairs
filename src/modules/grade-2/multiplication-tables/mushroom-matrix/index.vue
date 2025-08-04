<template>
  <div class="mushroom-matrix">
    <div class="module-header">
      <h1>《种蘑菇方阵》</h1>
      <p>通过种植蘑菇方阵来直观理解乘法是方阵的概念</p>
    </div>

    <div class="game-container">
      <div class="task-panel">
        <h2>任务卡</h2>
        <div class="task-display">
          <span class="task-text">请种植一个 {{ currentTask.rows }} × {{ currentTask.cols }} 的蘑菇方阵</span>
        </div>
        <div class="progress">
          <span>任务 {{ currentTaskIndex + 1 }} / {{ tasks.length }}</span>
        </div>
      </div>

      <div class="garden-container">
        <div class="garden-grid" :style="gridStyle">
          <div 
            v-for="(cell, index) in gridCells" 
            :key="index"
            class="cell"
            :class="{ selected: cell.selected, planted: cell.planted }"
            @click="selectCell(index)"
          >
            <div v-if="cell.planted" class="mushroom">🍄</div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button 
          class="control-btn plant-btn" 
          @click="plantMushrooms"
          :disabled="!isSelectionValid"
        >
          种植蘑菇
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
        <div class="result-message">
          <p>太棒了！你成功种植了一个 {{ currentTask.rows }} × {{ currentTask.cols }} 的蘑菇方阵</p>
          <p>总共种植了 {{ currentTask.rows * currentTask.cols }} 个蘑菇</p>
          <p>{{ currentTask.rows }} × {{ currentTask.cols }} = {{ currentTask.rows * currentTask.cols }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MushroomMatrix',
  data() {
    return {
      gridSize: 10, // 10x10 的网格
      currentTaskIndex: 0,
      selectedCells: [],
      plantedCells: [],
      showResult: false,
      tasks: [
        { rows: 2, cols: 3 },
        { rows: 3, cols: 4 },
        { rows: 4, cols: 5 }
      ]
    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
    gridCells() {
      const cells = [];
      for (let i = 0; i < this.gridSize * this.gridSize; i++) {
        const isSelected = this.selectedCells.includes(i);
        const isPlanted = this.plantedCells.includes(i);
        cells.push({
          selected: isSelected,
          planted: isPlanted
        });
      }
      return cells;
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${this.gridSize}, 1fr)`
      };
    },
    isSelectionValid() {
      // 检查选中的区域是否形成一个矩形
      if (this.selectedCells.length !== this.currentTask.rows * this.currentTask.cols) {
        return false;
      }

      // 获取选中区域的边界
      const rows = [];
      const cols = [];
      
      for (const index of this.selectedCells) {
        const row = Math.floor(index / this.gridSize);
        const col = index % this.gridSize;
        rows.push(row);
        cols.push(col);
      }
      
      const minRow = Math.min(...rows);
      const maxRow = Math.max(...rows);
      const minCol = Math.min(...cols);
      const maxCol = Math.max(...cols);
      
      // 检查是否形成完整的矩形
      return (
        (maxRow - minRow + 1) === this.currentTask.rows &&
        (maxCol - minCol + 1) === this.currentTask.cols &&
        this.selectedCells.length === this.currentTask.rows * this.currentTask.cols
      );
    },
    isTaskCompleted() {
      return this.plantedCells.length === this.currentTask.rows * this.currentTask.cols;
    }
  },
  methods: {
    selectCell(index) {
      // 如果已经种植了，不能再选择
      if (this.plantedCells.includes(index)) {
        return;
      }

      const selectedIndex = this.selectedCells.indexOf(index);
      if (selectedIndex > -1) {
        // 取消选择
        this.selectedCells.splice(selectedIndex, 1);
      } else {
        // 添加选择
        this.selectedCells.push(index);
      }
    },
    plantMushrooms() {
      if (this.isSelectionValid) {
        this.plantedCells = [...this.plantedCells, ...this.selectedCells];
        this.selectedCells = [];
        this.showResult = true;
        
        // 几秒后自动隐藏结果
        setTimeout(() => {
          this.showResult = false;
        }, 3000);
      }
    },
    nextTask() {
      if (this.currentTaskIndex < this.tasks.length - 1) {
        this.currentTaskIndex++;
        this.selectedCells = [];
        this.plantedCells = [];
        this.showResult = false;
      }
    },
    finishModule() {
      alert('恭喜完成《种蘑菇方阵》的学习！你已经理解了乘法的方阵概念。');
      // 触发完成学习事件
      this.$emit('finish-module');
    }
  }
}
</script>

<style scoped>
.mushroom-matrix {
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

.garden-container {
  display: flex;
  justify-content: center;
}

.garden-grid {
  display: grid;
  gap: 2px;
  width: 500px;
  height: 500px;
  background: #27ae60;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.cell {
  background: #8bc34a;
  border: 1px dashed #7cb342;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cell:hover {
  background: #7cb342;
}

.cell.selected {
  background: #ffd54f;
  border: 1px solid #ffca28;
}

.cell.planted {
  background: #689f38;
  border: 1px solid #558b2f;
}

.mushroom {
  font-size: 1.5rem;
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  0% { transform: scale(0); }
  80% { transform: scale(1.2); }
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

.plant-btn {
  background: #42b983;
  color: white;
}

.plant-btn:hover:not(:disabled) {
  background: #359c6d;
  transform: translateY(-2px);
}

.plant-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.next-btn, .finish-btn {
  background: #3498db;
  color: white;
}

.next-btn:hover:not(:disabled), .finish-btn:hover:not(:disabled) {
  background: #2980b9;
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
  .garden-grid {
    width: 300px;
    height: 300px;
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