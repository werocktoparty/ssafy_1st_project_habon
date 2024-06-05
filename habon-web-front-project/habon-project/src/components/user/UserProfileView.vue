<template>
  <div class="box">
    <h3>내 정보 보기</h3>
    <div class="description">- 하본 프로젝트 회원님의 정보입니다.</div>
    <div class="form">
      <div class="form-group profile-section">
        <label for="img">프로필 이미지</label>
        <img :src="user.img" alt="프로필 이미지" v-if="user.img" class="profile-img" />
        <p v-else>이미지가 없습니다.</p>
        <div class="point-group">
          <label for="point">포인트</label>
          <p id="point">{{ user.point }}</p>

          <!-- <a href="#" data-text="button">이미지 변경</a> -->
          <button class="btn-hover color-8" @click="randomizePoints">이미지 변경</button>
          <!-- <button @click="randomizePoints" class="random-btn">이미지 변경</button> -->
        
        
        </div>
      </div>
      <div class="form-group">
        <label for="id">아이디</label>
        <p id="id">{{ user.id }}</p>
      </div>
      <div class="form-group">
        <label for="name">이름</label>
        <p id="name">{{ user.name }}</p>
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <p id="email">{{ user.email }}</p>
      </div>
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <p id="nickname">{{ user.nickname }}</p>
      </div>

      <hr class="divider" />
      <div class="form-group">
        <label for="sport">좋아하는 스포츠</label>
        <p id="sport">{{ user.sport }}</p>
      </div>
      <div class="form-group">
        <label for="team">좋아하는 팀</label>
        <p id="team">{{ user.team }}</p>
      </div>
      <div class="form-group">
        <label for="player">좋아하는 선수</label>
        <p id="player">{{ user.player }}</p>
      </div>
      
    </div>
    <!-- <button @click="promptPassword">내 정보 수정</button> -->



      <div class="button-container-2">
        <span class="mas">내 정보 수정</span>
        <button @click="promptPassword" type="button" name="Hover">내 정보 수정</button>
      </div>
      
      
    </div>
      
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Swal from 'sweetalert2';
import { storeToRefs } from 'pinia';

const user = ref(JSON.parse(sessionStorage.getItem('user')));
const router = useRouter();
const store = useUserStore();

const randomizePoints = () => {
  Swal.fire({
    title: '랜덤으로 정말 바꾸시겠습니까?',
    text: '1000 Point가 사용되며 다시 되돌릴 수 없습니다.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '승인',
    cancelButtonText: '취소',
    reverseButtons: true,
  }).then(result => {
    if (result.isConfirmed) {
      store.randImg()
      Swal.fire('랜덤으로 등록되었습니다.', '확인해보세요!', 'success');
    }
  });
};

const promptPassword = () => {
  const checkPassword = () => {
    return Swal.fire({
      title: '비밀번호를 입력해주세요',
      input: 'password',
      inputPlaceholder: '비밀번호',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      preConfirm: (password) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (password === user.value.password) {
              resolve();
            } else {
              Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
              reject();
            }
          }, 1000);
        });
      }
    });
  };

  checkPassword().then((result) => {
    if (result.isConfirmed) {
      router.push({ name: 'UserUpdateView' });
    }
  }).catch(() => {
    // 비밀번호가 일치하지 않을 경우의 처리 (필요 시)
  });
};
</script>

<style scoped>

.buttons {
    margin: 10%;
    text-align: center;
}

.btn-hover {
    width: 200px;
    font-size: 25px;
    font-weight: 600;
    color: #fff;
    font-family: 'BMEuljiro10yearslater';
    margin: 20px;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-8 {
    background-image: linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376);
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}

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

.form-group p {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f9f9f9;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.point-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.random-btn {
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;

  font-size: 14px;
  transition: background-color 0.3s ease;
}

.random-btn:hover {
  background-color: #218838;
}

/* 
button {
  padding: 15px;
  width: 100%;
  max-width: 300px;
  margin: 20px auto 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
} */

/* button:hover {
  background-color: #0056b3;
} */

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
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
