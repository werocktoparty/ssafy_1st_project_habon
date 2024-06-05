<template>
    <div class="report-container">
        <div class="report-header">
            <h1 class="report-title">
                {{ store.report.contentType === 'board' ? '게시글' : store.report.contentType === 'comment' ? '댓글' : '' }}
            </h1>
        </div>
        <div class="report-body">
            <h3 class="report-content-details">게시글 내용 : {{ store.report.contentContent }}</h3>
            <h2 class="report-content">신고 내용 : {{ store.report.reportContent }}</h2>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useReportStore } from '@/stores/report';
import { onMounted } from 'vue';

const route = useRoute();
const store = useReportStore();

onMounted(() => {
    store.getReport(route.params.id);
});
</script>

<style scoped>
.report-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    max-width: 600px;
    margin: 20px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.report-header {
    background-color: #f5f5f5;
    padding: 12px;
    border-bottom: 1px solid #ddd;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.report-title {
    margin: 0;
    font-size: 1.5em;
    color: #333;
}

.report-body {
    padding: 16px;
}

.report-content,
.report-content-details {
    margin: 0;
    padding: 8px 0;
    color: #555;
}

.report-content-details {
    font-size: 1.2em;
    color: #666;
}
</style>
