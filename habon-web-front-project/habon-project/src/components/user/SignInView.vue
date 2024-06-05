<template>
    <div class="box">
        <h3>로그인</h3>
        <div class="description">월드컵을 즐기시려면 로그인을 해주세요!</div>
        <div>
            <form @submit.prevent="signInUser" class="form">
                <div>
                    <label for="id">아이디</label>
                    <input type="text" id="id" name="id" v-model="user.id" />
                </div>
                <div>
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" name="password" v-model="user.password" />
                </div>

                <div class="button-container-1">
                    <span class="mas">로그인</span>
                    <button id='work' type="submit" name="Hover">로그인</button>
                </div>
                
                <RouterLink to="/signup">
                <div class="button-container-2">
                    <span class="mas">회원가입</span>
                    <button type="button" name="Hover">회원가입</button>
                </div></RouterLink>
                 <!-- <button type="submit">로그인</button>
                회원가입 -->

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
    password: ''
})


const signInUser = () => {
    userStore.signInUser(user.value);
}

</script>

<style scoped>
h3 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.description {
    text-align: center;
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
}

.box {
    width: 100%;
    max-width: 500px;
    margin: 50px auto;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
}

.form div {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form div label {
    font-weight: bold;
    color: #555;
}

.form div input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

/* .form button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
} */




.button-container-1 {
  position: relative;
  /* width: 100px;
  height: 50px; */
  width: 100%;
  height: 35px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4px;
  overflow: hidden;
  border: 1px solid;
  font-family: 'BMEuljiro10yearslater';
  font-weight: 300;
  font-size: 25px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
}
.button-container-1 button {
  width: 101%;
  height: 100%;
  font-family: 'BMEuljiro10yearslater';
  font-weight: 300;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  background: #000;
  -webkit-mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png");
  mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png");
  -webkit-mask-size: 2300% 100%;
  mask-size: 2300% 100%;
  border: none;
  color: #fff;
  -webkit-animation: ani2 0.7s steps(22) forwards;
  animation: ani2 0.7s steps(22) forwards;
}
.button-container-1 button:hover {
  -webkit-animation: ani 0.7s steps(22) forwards;
  animation: ani 0.7s steps(22) forwards;
}

a{
    text-decoration-line: none;
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
