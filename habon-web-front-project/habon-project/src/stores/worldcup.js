import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const REST_WORLDCUP_API = "http://localhost:8080/api-Worldcup/worldcup";

export const useWorldcupStore = defineStore("worldcup", () => {
  const worldcup = ref({});
  const worldcupList = ref([]);
  const worldcupSubCategory = ref('');
  const router = useRouter();
  const elementsRank = ref([]);

  const point = ref(false);

  const getWorldcupList = function () {
    axios.get(REST_WORLDCUP_API).then((response) => {
      if (response.data) {
        point.value = true;
        console.log(response.data);
        worldcupList.value = response.data;
      }
    });
  };

  const getWorldcupSubCategory = function (id) {
    axios.get(REST_WORLDCUP_API + "/" + id).then((response) => {
      if (response.data) {
        worldcupSubCategory.value = response.data;
        console.log(worldcupSubCategory.value);
        return worldcupSubCategory.value;
      }
    });
  };

  const playWorldcupList = ref([]);

  const playWorldcup = function (worldcupId, cnt) {
    axios
      .get(`${REST_WORLDCUP_API}/${worldcupId}/${cnt}`)
      .then((response) => {
        // alert( cnt + "강 월드컵을 진행합니다!");
        // console.log(response.data);

        playWorldcupList.value = response.data;

        Swal.fire({
          icon: "info", // 여기다가 아이콘 종류를 쓰면 됩니다.
          title: cnt + "강 월드컵을 진행합니다!",
        });
      })
      .catch((error) => {
        alert(error.response.data);
        console.log(error);
        router.push({ name: "Home" });
      });
  };

  const rankUpWorldcup = function (worldcupId, data) {
    axios
      .post(`${REST_WORLDCUP_API}/${worldcupId}`, data)
      .then(() => {})
      .catch((error) => {
        alert(error.response.data);
        console.log(error);
      });
  };


  const getElementsAllRank = function(worldcupId){
    axios
    .get(`${REST_WORLDCUP_API}/accresult/${worldcupId}`)
    .then((response)=>{
      elementsRank.value = response.data;
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
  }

  const getElementsRank = function(worldcupId){
    axios
    .get(`${REST_WORLDCUP_API}/result/${worldcupId}`)
    .then((response)=>{
      elementsRank.value = response.data;
    })
    .catch((error) => {
      alert(error.response.data);
      console.log(error);
    });
  }




  const user = ref({});
  const getPoint = () => {
    point.value = false;
    axios
      .get(REST_WORLDCUP_API + "/point")
      .then((response) => {
        Swal.fire({
          title: `${response.data} 랜덤 포인트가 지급되었습니다!`,
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/images/trees.png)",
          backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        });
      })

      .then(() => {
        axios
          .get("http://localhost:8080/api-user/user/session/update")
          .then((response) => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
          });
      });
  };

  const postRank =ref([]);
  const getPostRankList = function(worldcupId){
    axios
    .get(`${REST_WORLDCUP_API}/postresult/${worldcupId}`)
    .then((response)=>{
      postRank.value = response.data;
    })
    .catch((error) => {
      Swal.fire({
        icon: 'warning',
        title: 'ERROR',
        text: '아직 기록이 없습니다.',
      });
    });
  }


  return {
    worldcup,
    worldcupList,
    getWorldcupList,
    playWorldcupList,
    playWorldcup,
    rankUpWorldcup,
    getElementsAllRank,
    elementsRank,
    getElementsRank,
    getPoint,
    point,
    getWorldcupSubCategory,
    worldcupSubCategory,
    postRank,
    getPostRankList
  };
});
