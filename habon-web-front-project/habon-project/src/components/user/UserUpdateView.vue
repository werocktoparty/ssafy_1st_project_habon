<template>
    <div class="box">
      <h3>내 정보 수정</h3>
      <div class="description">- 수정할 정보를 입력하세요.</div>
      <div class="form">
        <div class="form-group">
          <label for="id">아이디</label>
          <p id="id" class="readonly">{{ user.id }}</p>
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <p id="email" class="readonly">{{ user.email }}</p>
        </div>
        <div class="form-group">
          <label for="name">이름</label>
          <p id="name" class="readonly">{{ user.name }}</p>
        </div>
        <div class="form-group">
          <label for="point">포인트</label>
          <p id="point" class="readonly">{{ user.point }}</p>
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input v-model="form.password" id="password" type="password" />
        </div>
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <input v-model="form.nickname" id="nickname" type="text" />
        </div>
        <div class="form-group">
          <label for="sport">좋아하는 스포츠</label>
          <input v-model="form.sport" id="sport" type="text" />
        </div>
        <div class="form-group">
          <label for="team">좋아하는 팀</label>
          <input v-model="form.team" id="team" type="text" />
        </div>
        <div class="form-group">
          <label for="player">좋아하는 선수</label>
          <input v-model="form.player" id="player" type="text" />
        </div>

      </div>
    
    

    <div class="button-container-2">
        <span class="mas">수정 완료</span>
        <button @click="updateUser" type="button" name="Hover">수정 완료</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  
  const userStore = useUserStore();
  const router = useRouter();
  
  const user = ref(JSON.parse(sessionStorage.getItem('user')));
  
  const form = ref({
    password: '',
    nickname: user.value.nickname,
    sport: user.value.sport,
    team: user.value.team,
    player: user.value.player
  });
  
  const updateUser = () => {
    if (form.value.password && form.value.nickname) {
      userStore.updateUser({
        id: user.value.id,
        password: form.value.password,
        nickname: form.value.nickname,
        sport: form.value.sport,
        team: form.value.team,
        player: form.value.player
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'ERROR',
        text: '필수 항목을 입력하세요.',
      });
    }
  };
  </script>
  
  <style scoped>
  .box {
    width: 100%;
    max-width: 800px;
    margin: 50px auto;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  h3 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .description {
    text-align: center;
    margin-bottom: 20px;
    color: #666;
    font-size: 16px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .form-group label {
    font-weight: bold;
    color: #555;
  }
  
  .form-group p.readonly {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    background-color: #f9f9f9;
  }
  
  .form-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    background-color: #fff;
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
  