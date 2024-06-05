import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const REST_REPLY_API = "http://localhost:8080/api-reply/reply";

export const useReplyStore = defineStore("reply", () => {
  const replies = ref([]);
  const router = useRouter();

  const getReplies = function (id) {
    axios.get(`${REST_REPLY_API}/${id}`).then((response) => {
      console.log("response", response);
      replies.value = response.data;
    });
  };

  const addReply = function (boardId, commentId, data) {
    data.commentId = commentId; // commentId 필드를 데이터에 추가
    axios
      .post(`${REST_REPLY_API}/${boardId}/${commentId}`, data)
      .then((response) => {
        if (response.data) {


          replies.value.push(response.data); // 응답 데이터를 replies 배열에 추가


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
            title: '답글 작성 성공'
        }).then(()=>{
          location.reload(); // 답글 작성 후 페이지 새로고침

        })
    
  




        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateReply = function (id, data) {
    axios.put(`${REST_REPLY_API}/${id}`, data).then((response) => {
      if (response.data) {
        const index = replies.value.findIndex((reply) => reply.id === id);
        if (index !== -1) {


          replies.value[index] = response.data;



          Swal.fire({
            icon: 'info',  // 여기다가 아이콘 종류를 쓰면 됩니다.                     
            title: '답글이 변경되었습니다!',    
          })



        }
      }
    });
  };

  const deleteReply = function (id) {
    Swal.fire({
      title: '답글을 정말로 삭제하시겠습니까?',
      text: '다시 되돌릴 수 없습니다!.',
      icon: 'warning',
      showCancelButton: true, // cancel 버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confirm 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '승인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then(result => {
      if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios.delete(`${REST_REPLY_API}/${id}`).then(() => {
          replies.value = replies.value.filter((reply) => reply.id !== id);
          Swal.fire('삭제되었습니다.', '답글이 삭제되었습니다.', 'success').then(() => {
            location.reload();
          });
        });
      }
    });
  };
  

  return {
    replies,
    getReplies,
    addReply,
    updateReply,
    deleteReply,
  };
});
