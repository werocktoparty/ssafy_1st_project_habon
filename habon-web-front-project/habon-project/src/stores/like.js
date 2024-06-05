import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_LIKE_API = "http://localhost:8080/api-like/";

export const useLikeStore = defineStore("like", () => {
  const router = useRouter();
  const islike = ref(false);

  const likeCheck = async (contentType, contentId) => {
    try {
      const response = await axios.get(
        `${REST_LIKE_API}likecheck/${contentType}/${contentId}`
      );
      islike.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const likeclick = async (contentType, contentId) => {
    try {
      const response = await axios.get(
        `${REST_LIKE_API}likeclick/${contentType}/${contentId}`
      );
      islike.value = !islike.value; // 토글 상태 반영
    } catch (error) {
      console.error(error);
    }
  };

  return {
    islike,
    likeCheck,
    likeclick,
  };
});
