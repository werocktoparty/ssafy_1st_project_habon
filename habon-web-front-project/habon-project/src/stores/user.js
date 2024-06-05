import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const REST_USER_API = "http://localhost:8080/api-user/user";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const router = useRouter();
  const userImg = ref('');

  const signInUser = function (loginUser) {
    axios
      .post(REST_USER_API + "/login", loginUser)
      .then((response) => {
        if (response.data) {

          Swal.fire({
            icon: 'success',  // 여기다가 아이콘 종류를 쓰면 됩니다.                     
            title: '로그인 성공',
            text: '즐겁게 놀다가세요!',
          }).then(() => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            user.value = response.data;
            console.log(user.value);
            router.push({ name: "Home" }).then(() => {
              location.reload().then(() => {
                console.log(user.value);
              })
            });
          })

        }
      })
      .catch((error) => {
        alert("잘못된 아이디 혹은 비밀번호입니다.");
        console.log(error);
      });
  };

  const signOutUser = function () {
    axios
      .delete(REST_USER_API + "/logout")
      .then((response) => {
        if (response.data) {
          sessionStorage.removeItem("user");
          user.value = {};
          Swal.fire({
            title: '로그아웃되었습니다',
            icon: 'info',
            confirmButtonText: '확인'
          }).then(() => {
            router.push({ name: "Home" }).then(() => {
              location.reload();
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpUser = function (registerUser) {
    axios
      .post(REST_USER_API + "/regist", registerUser)
      .then((response) => {
        if (response.data) {

          Swal.fire({
            title: '회원가입 성공!',
            text: '즐거운 시간 보내세요 :)',
            imageUrl: 'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          }).then(() => {
            router.push({ name: "Home" }).then(() => {
              location.reload();

            });

          })

        }
      })
      .catch((error) => {
        alert("이미 존재하는 아이디입니다.");
        console.log(error);
      });
  };

  const updateUser = function (data) {
    axios
      .put(REST_USER_API + '/update', data)
      .then(() => {
        sessionStorage.removeItem("user");
        user.value = {};
        Swal.fire({
          icon: 'info',
          title: '변경 완료',
          text: '다시 로그인해주세요!',
        }).then(() => {
          router.push({ name: "Home" }).then(() => {
            location.reload();
          });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'warning',
          title: 'ERROR',
          text: '그렇게 변경할 수 없습니다.',
        });
      });
  }


  const randImg = ()=>{
    axios.get(REST_USER_API + '/updateImg').then((response)=>{
      sessionStorage.setItem("user", JSON.stringify(response.data));
      location.reload();
    }).catch((error) => {
      Swal.fire({
        icon: 'warning',
        title: 'ERROR',
        text: '포인트를 확인해주세요',
      });
    });
  }

  const getUserImg = function (type, id) {
    axios
      .get(REST_USER_API + "/" + type + "/" + id)
      .then((response) => {
        userImg.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return {
    user,
    signInUser,
    signOutUser,
    signUpUser,
    updateUser,
    randImg,
    getUserImg,
    userImg
  };
});
