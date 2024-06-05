<template>
  <div class="all">
    <div v-if="store.playWorldcupList && store.playWorldcupList.length > 1">
      <h1>주제 : {{ store.worldcupSubCategory }}</h1>
      <h1>{{ currentRound }} <span v-if="currentRound !== '결승'">강 - {{ currentGame }}/{{ currentRound / 2 }}번째 게임</span></h1>

      <div class="choices-container">
        <div class="choice fir" @click="chooseFirst">
          <div class="choice-img">
           <img :src="store.playWorldcupList[0].img" alt="Image 1">
          </div>
          <div class="choice-text">
            {{ store.playWorldcupList[0].subCategory }}: {{ store.playWorldcupList[0].name }}
          </div>
        </div>

        <div class="choice sec" @click="chooseSecond">
          <div class="choice-img">
            <img :src="store.playWorldcupList[1].img" alt="Image 2">
          </div>
          <div class="choice-text">
            {{ store.playWorldcupList[1].subCategory }}: {{ store.playWorldcupList[1].name }}
          </div>
        </div>
      </div>
      <div>
        <button v-on:click="hint" :disabled="isHintLoading">물어보기!</button>
        <p class="prompt-msg" v-if="isHintLoading">힌트 작성중입니다. 잠시만 기다려주세요!</p>
        <p class="prompt-msg" v-else>{{ promptmsg }}</p>
      </div>
    </div>
    <div v-else-if="store.playWorldcupList.length === 1">
      <div v-if="store.point">
        <button :disabled="pointClaimed" @click="randomPoint" :class="{ disabled: pointClaimed }">포인트 얻기</button>
      </div>
      <div class="winner-container">
        <div class="winner">
          우승: {{ store.playWorldcupList[0].name }}
        </div>
        <img :src="store.playWorldcupList[0].img" alt="">
        <RouterLink :to="'/noticeBoard/' + route.params.id">
          <div class="board-box">해당 월드컵 게시판으로 ! </div>
        </RouterLink>
      </div>
      <RankView />
    </div>
    <div v-else>
      <div>리스트가 비어 있습니다.</div>
    </div>
  </div>
</template>

<script setup>
import { OpenApiUtil } from "@/assets/js/OpenApiUtil";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWorldcupStore } from '@/stores/worldcup';
import RankView from './RankView.vue';

const store = useWorldcupStore();
const route = useRoute();

const updatelist = ref([]);
const currentRound = ref(route.params.cnt);
const currentGame = ref(1);
const totalGamesInCurrentRound = ref(0);
const pointClaimed = ref(false);
const promptmsg = ref('');
const isHintLoading = ref(false);

const initializeRound = () => {
  const length = store.playWorldcupList.length;

  if (length > 8) {
    currentRound.value = '16';
    totalGamesInCurrentRound.value = 8;
  } else if (length > 4) {
    currentRound.value = '8';
    totalGamesInCurrentRound.value = 4;
  } else if (length > 2) {
    currentRound.value = '4';
    totalGamesInCurrentRound.value = 2;
  } else {
    currentRound.value = '결승';
    totalGamesInCurrentRound.value = 1;
  }

  if (currentRound.value != route.params.cnt) {
    currentGame.value = 1;
  }
};

const updateGame = () => {
  currentGame.value += 1;
};

const chooseFirst = () => {
  promptmsg.value = '';

  if (store.playWorldcupList.length > 1) {
    updatelist.value.push(store.playWorldcupList[0]);
    store.playWorldcupList.splice(0, 2);

    if (store.playWorldcupList.length === 0) {
      store.rankUpWorldcup(route.params.id, updatelist.value);
      store.playWorldcupList = [...updatelist.value];
      updatelist.value = [];
      initializeRound();
    } else {
      updateGame();
    }
  }
};

const chooseSecond = () => {
  promptmsg.value = '';
  if (store.playWorldcupList.length > 1) {
    updatelist.value.push(store.playWorldcupList[1]);
    store.playWorldcupList.splice(0, 2);

    if (store.playWorldcupList.length === 0) {
      store.rankUpWorldcup(route.params.id, updatelist.value);
      store.playWorldcupList = [...updatelist.value];
      updatelist.value = [];
      initializeRound();
    } else {
      updateGame();
    }
  }
};

const randomPoint = () => {
  store.getPoint();
  pointClaimed.value = true;
};


onMounted(async () => {
  const worldcupId = route.params.worldcupId;
  store.getWorldcupSubCategory(route.params.id);
  if (!worldcupId) {
    return;
  }

  await store.playWorldcup(worldcupId);
  initializeRound();
});


const hint = () => {
  isHintLoading.value = true;
  OpenApiUtil.prompt(`${store.playWorldcupList[0].name}와 ${store.playWorldcupList[1].name}에 대해서 알려줘!`).then((res) => {
    promptmsg.value = res;
    isHintLoading.value = false;
  });
};
</script>

<style scoped>
.all {
  text-align: center;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.choices-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.choice {
  width: 45%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: url("../public/hyojason.png"), auto;
  transition: transform 0.3s, background-color 0.3s;
  position: relative;
}

.choice * {
  pointer-events: none;
}

.sec {
  background-color: #4169E1;
}

.fir {
  background-color: #8b0029;
}

.fir:hover, .sec:hover {
  cursor: url("../public/Chyojason.png"), auto;
  transform: scale(1.05);
}

.fir:hover {
  background-color: #d6cabc;
}

.sec:hover {
  background-color: white;
}

.choice-img img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.choice-text {
  margin-top: 10px;
  font-size: 1.2em;
  color: #333;
}

.winner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.winner {
  font-size: 3em;
  font-weight: bold;
  color: green;
  margin-bottom: 10px;
}

.board-box {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  cursor: url("../public/hyojason.png"), auto;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;
}

.board-box:hover {
  cursor: url("../public/Chyojason.png"), auto;
  background-color: #45a049;
  transform: scale(1.05);
}

button {
  margin: 20px 0;
  padding: 10px 20px;
  font-size: 1.2em;
  color: #000000;
  background-color: #b3137d;
  border: none;
  border-radius: 5px;
  cursor: url("../public/hyojason.png"), auto;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  cursor: url("../public/Chyojason.png"), auto;
  background-color: #0056b3;
  transform: scale(1.05);
}

button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.prompt-msg {
  font-size: 1.2em;
  color: #555;
  margin-top: 10px;
}
</style>
