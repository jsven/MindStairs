<template>
  <div class="starmap">
    <div class="starmap-header">
      <router-link to="/" class="back-button">← 返回首页</router-link>
      <h2 v-if="selectedGrade">{{ selectedGrade.name }} - {{ selectedGrade.theme }}</h2>
      <p>点击节点开始学习之旅</p>
    </div>
    
    <!-- Grade Selector -->
    <div class="grade-selector">
      <button 
        v-for="grade in grades" 
        :key="grade.id"
        :class="['grade-button', { active: selectedGrade?.id === grade.id }]"
        @click="selectGrade(grade.id)"
      >
        {{ grade.name }}
      </button>
    </div>
    
    <div class="starmap-container" v-if="selectedGrade">
      <div class="starmap-content">
        <!-- 知识星图可视化 -->
        <div class="starmap-visualization">
          <div class="starmap-path"></div>
          <div 
            class="starmap-node" 
            v-for="(module, index) in selectedGrade.modules" 
            :key="module.id"
            :class="module.status"
            :style="getNodePosition(index)"
            @click="enterModule(module)"
          >
            <div class="node-icon">{{ module.icon }}</div>
            <div class="node-label">{{ module.title }}</div>
            <div class="node-status">
              <span v-if="module.status === 'locked'">🔒</span>
              <span v-if="module.status === 'available'">🌟</span>
              <span v-if="module.status === 'completed'">⭐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="starmap-controls" v-if="selectedGrade">
      <router-link to="/" class="control-button">返回首页</router-link>
      <button class="control-button" @click="goToProgress">我的进度</button>
    </div>
  </div>
</template>

<script>
import curriculumData from '../assets/data/curriculum.js'

export default {
  name: 'StarMap',
  props: {
    gradeId: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      grades: curriculumData,
      selectedGrade: null
    }
  },
  created() {
    this.selectGrade(this.gradeId || '1')
  },
  watch: {
    gradeId(newGradeId) {
      this.selectGrade(newGradeId)
    }
  },
  methods: {
    selectGrade(gradeId) {
      const id = parseInt(gradeId)
      this.selectedGrade = this.grades.find(grade => grade.id === id)
      if (this.$route.params.gradeId !== gradeId) {
        this.$router.push(`/starmap/${gradeId}`)
      }
    },
    enterModule(module) {
      if (module.status === 'locked') {
        alert('请先完成前置知识点')
        return
      }
      
      const gradeId = this.selectedGrade.id
      const moduleId = module.id
      const routePath = `/grade-${gradeId}/${moduleId}`
      
      this.$router.push(routePath)
    },
    goToProgress() {
      // TODO: Implement progress page
      alert('我的进度页面开发中...')
    },
    getNodePosition(index) {
      // 计算星图节点的位置，创建蜿蜒路径效果
      const x = 20 + (index % 3) * 30
      const y = 20 + Math.floor(index / 3) * 25
      return {
        left: `${x}%`,
        top: `${y}%`
      }
    }
  }
}
</script>

<style scoped>
.starmap {
  width: 100%;
  min-height: calc(100vh - 70px);
  background: #0c1427;
  color: white;
  padding: 2rem;
}

.starmap-header {
  text-align: center;
  margin-bottom: 2rem;
}

.starmap-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.back-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
  float: left;
  text-decoration: none;
  display: inline-block;
}

.back-button:hover {
  background: #359c6d;
}

.grade-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.grade-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.grade-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.grade-button.active {
  background: #42b983;
  border-color: #42b983;
}

.starmap-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.starmap-content {
  width: 100%;
  max-width: 1200px;
  height: 60vh;
  background: linear-gradient(135deg, #1a2a6c, #2c3e50);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.starmap-visualization {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230c1427"/><circle cx="20" cy="20" r="0.5" fill="white" opacity="0.5"/><circle cx="50" cy="40" r="0.3" fill="white" opacity="0.5"/><circle cx="80" cy="30" r="0.4" fill="white" opacity="0.5"/><circle cx="30" cy="70" r="0.6" fill="white" opacity="0.5"/><circle cx="70" cy="80" r="0.3" fill="white" opacity="0.5"/></svg>');
}

.starmap-path {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 80%;
  height: 60%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: rotate(15deg);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.starmap-node {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  transform: translate(-50%, -50%);
}

.starmap-node:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.starmap-node.locked {
  background: rgba(127, 140, 141, 0.7);
  border: 2px solid #7f8c8d;
}

.starmap-node.available {
  background: rgba(52, 152, 219, 0.7);
  border: 2px solid #3498db;
  box-shadow: 0 0 15px #3498db;
}

.starmap-node.completed {
  background: rgba(241, 196, 15, 0.7);
  border: 2px solid #f1c40f;
  box-shadow: 0 0 15px #f1c40f;
}

.node-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.node-label {
  font-size: 0.7rem;
  text-align: center;
  padding: 0 5px;
}

.node-status {
  font-size: 1rem;
  margin-top: 5px;
}

.starmap-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.control-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;
  display: inline-block;
}

.control-button:hover {
  background: #359c6d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .starmap {
    padding: 1rem;
  }
  
  .starmap-node {
    width: 60px;
    height: 60px;
  }
  
  .node-icon {
    font-size: 1.2rem;
  }
  
  .node-label {
    font-size: 0.6rem;
  }
  
  .grade-selector {
    gap: 0.5rem;
  }
  
  .grade-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>