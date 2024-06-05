<template>
    <div class="container">
      <h1>월드컵 총 누적 순위!</h1>
      <hr>
      
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>이미지</th>
            <th>이름</th>
            <th>총 획득포인트</th>
          </tr>
         
        </thead>
        <tbody>
          <tr v-for="(rank, index) in store.elementsRank" :key="rank.id">
            <td>{{ index + 1 }}</td>
            <td>
              <img :src="rank.img" alt="rank.name 이미지" class="rank-image">
            </td>
            <td>{{ rank.name }}</td>
            <td>{{ rank.accPoint }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useWorldcupStore } from '@/stores/worldcup';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const store = useWorldcupStore();
  
  onMounted(() => {
    store.getElementsAllRank(route.params.id);
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h1 {
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
  }
  
  hr {
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    padding: 10px;
    text-align: center;
  }
  
  th {
    background-color: #4caf50;
    color: white;
    font-size: 1.2em;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .rank-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: contain;
  }
  </style>
  