<template>
  <div>
    <nav class="nav">
      <div class="total">
        <div class="left">
          <RouterLink to="/" class="home"><img src="/src/assets/img/logo.png" alt="logo" class="logo" ></RouterLink>
        </div>
        <div class="center">
          <RouterLink to="/worldcup" class="worldCup">월드컵</RouterLink>
          <!-- <RouterLink to="/noticeBoard" class="board">게시판</RouterLink>
          <RouterLink to="/rank" class="ranking">랭킹</RouterLink> -->
        </div>
        <div class="right">
          <RouterLink to="/signin" class="sign-in" v-if="!user">로그인/회원가입</RouterLink>
          <span class="welcome" v-else>{{ user.nickname }}님 환영합니다!</span>
          <RouterLink to="/user/profile" class="sign-in" v-if="user"> <span class="welcome"> 내 정보 </span> </RouterLink>
          <div class="button-container-3 " v-if="user" @click="logout" >
            <span class="mas">로그아웃</span>
            <button type="button" name="Hover">로그아웃</button>
          </div>

        </div>
      </div>
    </nav>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const logout = () => {
  userStore.signOutUser();
}

const user = ref(JSON.parse(sessionStorage.getItem('user')))
</script>

<style scoped>
.nav {
  width: 100%;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
}

.total {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto;
  /* 가운데 정렬을 위해 추가 */
}

.left,
.center,
.right {
  display: flex;
  align-items: center;
  flex: 1;
  /* 각 섹션의 너비를 동일하게 설정 */
  justify-content: center;
  /* 가운데 정렬 */
}

.home,
.worldCup,
.board,
.ranking,
.sign-in,
.welcome,
.logout-button {

  margin-right: 20px;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.3s ease;
}

.logo {
  width: 80px;
  height: 80px;
}


.welcome:hover,
.home:hover,
.worldCup:hover,
.board:hover,
.ranking:hover,
.sign-in:hover,
.logout-button:hover {
  color: rgb(132, 70, 190);
  transform: scale(1.1);
  cursor: url("../public/Chyojason.png"), auto;
}


.welcome {
  font-size: 16px;
  margin-right: 20px;
  font-weight: bold;
}

.content {
  padding-top: 70px;
  /* 네비게이션 바 높이만큼 패딩 추가 */
}


.mas {
  position: absolute;
  color: white;
  text-align: center;
  width: 101%;
  /* font-family: "Lato", sans-serif; */
  font-weight: 300;
  position: absolute;
  font-size: 16px;
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

.button-container-3 {
  position: relative;
  width: 101px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
 
  overflow: hidden;
  border: 1px solid #000;
  /* font-family: "Lato", sans-serif; */
  font-size: 16px;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
}

.button-container-3 button {
  width: 101%;
  height: 100%;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 16px;
  font-family: 'BMEuljiro10yearslater';
  letter-spacing: 1px;
  font-weight: bold;
  background: #000;
  -webkit-mask: url("https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png");
  mask: url("https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png");
  -webkit-mask-size: 7100% 100%;
  mask-size: 7100% 100%;
  border: none;
  color: #fff;
  
  -webkit-animation: ani2 0.7s steps(70) forwards;
  animation: ani2 0.7s steps(70) forwards;
}


.button-container-3 button:hover {
  font-size: 16px;
  -webkit-animation: ani 0.7s steps(70) forwards;
  animation: ani 0.7s steps(70) forwards;

}</style>
