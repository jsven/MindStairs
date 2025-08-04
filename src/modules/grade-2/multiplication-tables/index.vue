<template>
  <div class="multiplication-tables">
    <div class="module-header">
      <h1>乘法口诀</h1>
      <p>学习并熟练掌握乘法口诀表</p>
    </div>

    <div class="module-content">
      <div class="intro-section">
        <h2>什么是乘法？</h2>
        <p>乘法是相同加数的简便运算。例如：3 + 3 + 3 + 3 = 12 可以写成 3 × 4 = 12</p>
        
        <div class="stories-grid">
          <div class="story-card" @click="startMushroomMatrix">
            <div class="story-icon">🍄</div>
            <h3>《种蘑菇方阵》</h3>
            <p>通过种植蘑菇方阵来直观理解乘法是方阵的概念</p>
            <div class="story-status">
              <span class="status available">可学习</span>
            </div>
          </div>
        </div>
      </div>

      <div class="multiplication-table">
        <h2>乘法口诀表</h2>
        <div class="table-container">
          <table>
            <tr>
              <th>×</th>
              <th v-for="i in 9" :key="i">{{ i }}</th>
            </tr>
            <tr v-for="i in 9" :key="i">
              <th>{{ i }}</th>
              <td v-for="j in 9" :key="j">{{ i * j }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiplicationTables',
  methods: {
    startMushroomMatrix() {
      // 触发跳转到《种蘑菇方阵》事件
      this.$emit('start-mushroom-matrix');
    }
  }
}
</script>

<style scoped>
.multiplication-tables {
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

.multiplication-table h2 {
  color: #2c3e50;
  text-align: center;
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ecf0f1;
}

th {
  background: #3498db;
  color: white;
}

tr:nth-child(even) {
  background: #f8f9fa;
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
  
  table {
    font-size: 0.9rem;
  }
  
  th, td {
    padding: 8px;
  }
}
</style>