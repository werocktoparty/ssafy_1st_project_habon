<template>
    <div>
        <div>
            <h1>게시글 수정</h1>
            <div class="board-modify">
                <div class="board-item">
                    <label>제목:</label>
                    <input type="text" v-model="store.board.title" placeholder="제목을 입력하세요">
                </div>
                <div class="board-item">
                    <label>작성자:</label>
                    <input type="text" :value="user.nickname" readonly>
                </div>
                <div class="board-item-content">
                    <label>내용:</label>
                    <textarea v-model="store.board.content" placeholder="내용을 입력하세요"></textarea>
                </div>

              
                <div class="button-container-2">
        <span class="mas">게시글 수정</span>
        <button @click="Submit" type="button" name="Hover">게시글 수정</button>
      </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';

const store = useBoardStore();

const router = useRouter();

const user = JSON.parse(sessionStorage.getItem('user'));


const Submit = () => {
    store.modifyBoard(router.currentRoute.value.params.id);
}

</script>

<style scoped>
body {
    background-color: #f5f5f5;
    font-family: 'Arial', sans-serif;
}

h1 {
    text-align: center;
    margin-top: 20px;
    color: #333;
    font-size: 2em;
}

.board-modify {
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-item,
.board-item-content {
    margin-bottom: 20px;
}

.board-item label,
.board-item-content label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
    color: #555;
}

.board-item input,
.board-item-content textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.board-item input[readonly] {
    background-color: #e9e9e9;
    cursor: not-allowed;
}

.board-item-content textarea {
    resize: vertical;
    height: 200px;
}

.button-container-2 {
  position: relative;
  width: 100%;
  height: 35px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  overflow: hidden;
  border: 1px solid #000;
  font-family: 'BMEuljiro10yearslater';
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
}
.button-container-2 button {
  width: 101%;
  height: 100%;
  font-family: 'BMEuljiro10yearslater';

  font-weight: 300;
  font-size: 20px;
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
  font-size: 20px;
  margin-top: 3.5px;
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
</style>