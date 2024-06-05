import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const REST_BOARD_API = "http://localhost:8080/api-board/board";

export const useBoardStore = defineStore("board", () => {
  const board = ref({});
  const router = useRouter();

  const getBoard = function (id) {
    axios.get(`${REST_BOARD_API}/${id}`).then((response) => {
      console.log("response", response);
      board.value = response.data;
    });
  }


  const createBoard = function (worldcupId, data) {
    axios
      .post(`${REST_BOARD_API}/${worldcupId}`, data)
      .then((response) => {
        if (response.data) {


          const Toast = Swal.mixin({
            toast: true,
            position: 'center-center',
            showConfirmButton: false,
            timer: 500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: '게시물 작성 성공'
          }).then(() => {
            router.push({ name: "NoticeBoard", params: { id: worldcupId } }).then(() => {
              location.reload();
            });
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteBoard = function (id) {
    const worldcupId = board.value.worldcupId;

    Swal.fire({
      title: '정말로 게시물을 삭제하시겠습니까?',
      text: '다시 되돌릴 수 없습니다. 신중하세요.',
      icon: 'warning',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confirm 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '승인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(result => {
      if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios.delete(`${REST_BOARD_API}/${id}`).then(() => {
          Swal.fire('삭제되었습니다.', '나이스!', 'success').then(() => {
            router.push({ name: "NoticeBoard", params: { id: worldcupId } }).then(() => {
              location.reload();
            });
          });
        });
      }

      
    });
  }

  const modifyBoard = function (id) {
    axios.put(`${REST_BOARD_API}/${id}`, board.value).then((response) => {
      if (response.data) {

        Swal.fire({
          icon: 'info',  // 여기다가 아이콘 종류를 쓰면 됩니다.                     
          title: '변경되었습니다!',

        }).then(() => {
          router.push({ name: "NoticeBoard", params: { id: board.value.worldcupId } }).then(() => {
            location.reload();
          });

        })



      }
    });
  }

  return {
    board,
    getBoard,
    createBoard,
    deleteBoard,
    modifyBoard,
  };
});
