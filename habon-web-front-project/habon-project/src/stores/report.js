import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const REST_REPORT_API = "http://localhost:8080/api-report/report";

export const useReportStore = defineStore("report", () => {
  const report = ref({});
  const reportList = ref([]);
  const router = useRouter();

  const getReportList = async () => {
    try {
      const response = await axios.get(`${REST_REPORT_API}`);
      console.log("response", response);
      reportList.value = response.data;
    } catch (error) {
      console.error("Failed to fetch report list:", error);
    }
  };

  const getReport = async (id) => {
    try {
      const response = await axios.get(`${REST_REPORT_API}/${id}`);
      console.log("response", response);
      report.value = response.data;
    } catch (error) {
      console.error("Failed to fetch report:", error);
    }
  };

  const postReport = async (type, c_id, reportData) => {
    try {
        console.log("reportData", reportData);
      const response = await axios.post(`${REST_REPORT_API}/${type}/${c_id}`, reportData);
      console.log("response", response);
    } catch (error) {
      console.error("Failed to post report:", error);
    }
  };

  return {
    report,
    reportList,
    getReportList,
    getReport,
    postReport,
  };
});
