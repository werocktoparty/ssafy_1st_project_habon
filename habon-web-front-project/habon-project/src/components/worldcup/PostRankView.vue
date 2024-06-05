<template>
  <div class="container">
    <h1>월드컵 총 누적 순위!</h1>
    <hr>
    <div v-for="(ranks, key) in groupedRanks" :key="key">
      <h2>{{ key }}</h2>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>이미지</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rank, index) in ranks" :key="rank.fn">
            <td>{{ index + 1 }}</td>
            <td>
              <img :src="rank.fi" alt="rank.fn 이미지" class="rank-image">
            </td>
            <td>{{ rank.fn }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import { useWorldcupStore } from '@/stores/worldcup';

const route = useRoute();
const store = useWorldcupStore();

const groupByWeek = (data) => {
  return data.reduce((acc, item) => {
    const key = `${item.year}년 ${item.month}월 ${item.week}주차`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

const groupedRanks = computed(() => {
  return groupByWeek(store.postRank);
});

onMounted(async () => {
  await store.getPostRankList(route.params.id);
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

h2 {
  font-size: 2em;
  color: #555;
  margin: 20px 0 10px;
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
