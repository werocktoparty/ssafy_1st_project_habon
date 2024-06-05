<template>
  <div class="background">
    <div class="container">
      <h1>스포츠 이상형 월드컵</h1>
      <p>진행하고자 하는 월드컵을 선택하세요!</p>

      <div class="worldcup-list">
        <div v-for="worldcup in store.worldcupList" :key="worldcup.id" class="worldcup-item">
          <RouterLink :to="'/worldcup/' + worldcup.id" class="world-cup-link">
            <div class="world-cup-box">{{ worldcup.subCategory }}</div>
          </RouterLink>
          <RouterLink :to="'/noticeBoard/' + worldcup.id" class="board-link">
            <div class="board-box">게시판</div>
          </RouterLink>
          <RouterLink :to="'/worldcup/result/' + worldcup.id" class="rank-link">
            <div class="rank-box">랭킹</div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue';
import { useWorldcupStore } from '@/stores/worldcup';

const store = useWorldcupStore();

onMounted(() => {
  store.getWorldcupList();
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.background {
  background-image: url('src/assets/img/back1.jpg');
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  
  text-align: center;
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent white background */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease-in-out; /* Added fade-in animation */
}

h1 {
  font-size: 2.8em;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 1.3em;
  color: #555;
  margin-bottom: 30px;
}

.worldcup-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.worldcup-item {
  margin: 20px;
  text-align: center;
}

.world-cup-link {
  text-decoration: none;
}

.world-cup-box {
  width: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  cursor: pointer;
  border-radius: 12px;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  color: #333;
}

.board-link, .rank-link {
  
  display: block;
  text-decoration: none;
}

.board-box, .rank-box {

  width: 160px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1em;
  margin: 0 auto;
}

.board-box {
  cursor: url("../public/Chyojason.png"), auto;
  background-color: #e0e0e0;
  color: #555;
}

.rank-box {
  cursor: url("../public/Chyojason.png"), auto;
  background-color: #c3d6e9;
  color: #004085;
}

.world-cup-box:hover {
  cursor: url("../public/Chyojason.png"), auto;
  transform: scale(1.05);
  background-color: #d0d0d0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.board-box:hover {
  transform: scale(1.05);
  background-color: #d0d0d0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.rank-box:hover {
  transform: scale(1.05);
  background-color: #b8daff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
