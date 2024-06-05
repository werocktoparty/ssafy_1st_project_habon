<template>
  <div class="background">
    <div class="container">
      <h1>스포츠 이상형 월드컵</h1>
      <p>진행할 라운드를 선택하세요!</p>
      <select v-model="selectedRound" class="round-select">
        <option value="16">16강</option>
        <option value="8">8강</option>
        <option value="4">4강</option>
      </select>
      <RouterLink :to="`${$route.path}/${selectedRound}`" @click="initializeRound" class="select-button">라운드 선택
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';
import { useWorldcupStore } from '@/stores/worldcup';

const selectedRound = ref('16'); // 기본값은 16강
const $route = useRoute(); // 현재 라우터 정보를 가져옴

const store = useWorldcupStore(); //월드컵 스토어 사용

//버튼을 누르는 순간 store.playList에 월드컵이 저장됩니다!
const initializeRound = () => {
  store.playWorldcup($route.params.id, selectedRound.value);
}
</script>

<style scoped>
.background {
  background-image: url('src/assets/img/back4.jpg');
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {

  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
}

.round-select {
  width: 200px;
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.select-button {
  cursor: url("../public/Chyojason.png"), auto;
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  font-size: 1.1em;
  color: white;
  background-color: #596659;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}

.select-button:hover {
  cursor: url("../public/Chyojason.png"), auto;
  background-color: #45a049;
  transform: scale(1.05);
}
</style>