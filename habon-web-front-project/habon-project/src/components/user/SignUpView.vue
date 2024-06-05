<template>
    <div class="box">
      <h3>회원가입</h3>
      <div class="description">-하본 프로젝트의 회원이 되어주세요!</div>
      <div class="form">
        <form @submit.prevent="signUpUser" class="form">
          <div class="essential">
            <p>*필수</p>
            <div class="form-group">
              <label for="id">아이디</label>
              <input type="text" id="id" name="id" placeholder="아이디" v-model="user.id" />
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input type="password" id="password" placeholder="비밀번호" name="password" v-model="user.password" />
            </div>
            <div class="form-group">
              <label for="passwordConfirm">비밀번호 확인</label>
              <input type="password" id="passwordConfirm" placeholder="비밀번호 확인" name="passwordConfirm" v-model="user.userPasswordConfirm" />
            </div>
            <div class="form-group">
              <label for="name">이름</label>
              <input type="text" id="name" placeholder="이름" name="name" v-model="user.name" />
            </div>
            <div class="form-group">
              <label for="email">이메일</label>
              <input type="email" id="email" placeholder="aaa@example.com" name="email" v-model="user.email" />
            </div>
            <div class="form-group">
              <label for="nickname">닉네임</label>
              <input type="text" id="nickname" placeholder="닉네임" name="nickname" v-model="user.nickname" />
            </div>
            <div class="form-group">
              <label for="age">나이</label>
              <input type="number" id="age" placeholder="나이" name="age" v-model="user.age" />
            </div>
          </div>
          <div class="optional">
            <p>*선택</p>
            <div class="form-group">
              <label for="sport">좋아하는 스포츠</label>
              <input type="text" id="sport" placeholder="좋아하는 스포츠" name="sport" v-model="user.sport" />
            </div>
            <div class="form-group">
              <label for="team">좋아하는 팀</label>
              <input type="text" id="team" placeholder="좋아하는 팀" name="team" v-model="user.team" />
            </div>
            <div class="form-group">
              <label for="player">좋아하는 선수</label>
              <input type="text" id="player" placeholder="좋아하는 선수" name="player" v-model="user.player" />
            </div>
          </div>
  
          <button type="submit">

        
                <div class="button-container-2">
                    <span class="mas">회원가입</span>
                    <button type="button" name="Hover">회원가입</button>
                </div>
              
            </button>



        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/user';
  import { ref } from 'vue';
  
  const userStore = useUserStore();
  
  const user = ref({
    id: '',
    password: '',
    userPasswordConfirm: '',
    name: '',
    email: '',
    nickname: '',
    age: '',
    sport: '',
    team: '',
    player: ''
  })
  
  const signUpUser = () => {
    if (user.value.password !== user.value.userPasswordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    userStore.signUpUser(user.value);
  }
  </script>
  
  <style scoped>
  
  .box {
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  button{
    border: none;
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
  
  .form-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .form-group input::placeholder {
    color: #aaa;
  }
  
 
  



  .essential, .optional {
    margin-bottom: 30px;
  }
  
  .essential p, .optional p {
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
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

.button-container-2 {
  position: relative;
  width: 100%;
  height: 35px;
  margin-left: auto;
  margin-right: auto;
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


  </style>
  