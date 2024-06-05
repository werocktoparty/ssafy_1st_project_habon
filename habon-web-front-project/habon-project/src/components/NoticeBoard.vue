<template>
  <div class="background">
  <div class="container">
    <h1>게시판</h1>
    <p>여러분의 토론주제를 펼쳐보세요!</p>
    <div class="button-container-2">
      <RouterLink :to="'/board/create/' + route.params.id">
        <span class="mas">글쓰기</span>
        <button type="button" name="Hover">글쓰기</button>
      </RouterLink>
    </div>
    <hr>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
          <th>좋아요</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!boardList">
          <td colspan="6">데이터를 불러오는 중입니다...</td>
        </tr>
        <tr v-else-if="paginatedBoards.length === 0">
          <td colspan="6">게시글이 아직 없습니다!</td>
        </tr>
        <tr v-else v-for="(board, index) in paginatedBoards" :key="board.id">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>
            <RouterLink class="board" :to="{ path: '/board/' + board.id }">{{ board.title }}</RouterLink>
          </td>
          <td>{{ board.writer }}</td>
          <td>{{ board.registDate }}</td>
          <td>{{ board.viewCount }}</td>
          <td>{{ board.likeCount }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prev10Pages" :disabled="currentPage === 1">&lt;&lt;</button>
      <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
      <button @click="nextPage" :disabled="currentPage * itemsPerPage >= boardList.length">&gt;</button>
      <button @click="next10Pages" :disabled="currentPage * itemsPerPage >= boardList.length">&gt;&gt;</button>
    </div>
  </div>
</div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useNoticeBoardStore } from '@/stores/noticeBoard';
import { useRoute } from 'vue-router';

const store = useNoticeBoardStore();
const route = useRoute();
const boardList = computed(() => store.boardList);
const loginUser = ref(JSON.parse(sessionStorage.getItem('user')));
const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedBoards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return boardList.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < boardList.value.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const next10Pages = () => {
  const maxPage = Math.ceil(boardList.value.length / itemsPerPage);
  currentPage.value = Math.min(currentPage.value + 10, maxPage);
};

const prev10Pages = () => {
  currentPage.value = Math.max(currentPage.value - 10, 1);
};

onMounted(() => {
  store.getBoardList();
});
</script>

<style scoped>

.button-container-2 {
  position: relative;
  width: 100px;
  height: 50px;
  margin-left: auto;
  margin-right: 0;
  margin-top: 7vh;
  overflow: hidden;
  border: 1px solid #000;
  font-family: 'BMEuljiro10yearslater';
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
  font-size: 17px;
}
.button-container-2 button {
  width: 101%;
  height: 100%;
  font-family: 'BMEuljiro10yearslater';
  font-weight: 300;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: bold;
  background: #000;
  -webkit-mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png");
  mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png");
  -webkit-mask-size: 3000% 100%;
  mask-size: 3000% 100%;
  border: none;
  color: #fff;

  -webkit-animation: ani2 0.7s steps(29) forwards;
  animation: ani2 0.7s steps(29) forwards;
}
.button-container-2 button:hover {
  -webkit-animation: ani 0.7s steps(29) forwards;
  animation: ani 0.7s steps(29) forwards;
}

.mas {
  position: absolute;
  color: #000;
  text-align: center;
  width: 101%;

  font-weight: 300;
  position: absolute;
  font-size: 17px;
  margin-top: 17px;
  overflow: hidden;
  font-weight: bold;
}

@-webkit-keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@-webkit-keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
@keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
a {
  color: #00ff95;
}


.background {
  background-image: url('src/assets/img/back5.png');
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


.container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #343a40;
  text-align: center;
}

p {
  font-size: 1.2em;
  color: #6c757d;
  margin-bottom: 20px;
  text-align: center;
}

.button-container-2 {
  text-align: right;
  margin-bottom: 20px;
}

.create-button {
  font-family: 'BMEuljiro10yearslater';
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #343a40;
  color: white;
}

th,
td {
  border: 1px solid #dee2e6;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #343a40;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f8f9fa;
}

tr:hover {
  background-color: #e9ecef;
}

.board {
  color: #cc305f;
  text-decoration: none;
  transition: color 0.3s;
}

.board:hover {
  color: #0056b3;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin: 0 5px;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #800026;
}
</style>
