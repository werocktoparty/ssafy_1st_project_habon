import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_NOTICEBOARD_API = "http://localhost:8080/api-Noticeboard/noticeboard";

export const useNoticeBoardStore = defineStore("noticeBoard", () => {
  const noticeBoard = ref({});
  const boardList = ref([]);
  const router = useRouter();

  const getBoardList = function () {
    const id = router.currentRoute.value.params.id || 1; // 기본값 설정
    console.log("id", id);
    axios.get(`${REST_NOTICEBOARD_API}/${id}`).then((response) => {
      console.log("response", response);
      boardList.value = response.data;
    });
  };
 
  return {
    noticeBoard,
    boardList,
    getBoardList,
  };
});
