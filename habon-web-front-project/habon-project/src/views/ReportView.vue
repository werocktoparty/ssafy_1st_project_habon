<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>타입</th>
                    <th>내용</th>
                </tr>
            </thead>
            <tbody v-for="report in store.reportList" :key="report.id">
                <tr>
                    <td>{{ report.contentType }}</td>
                    <td><RouterLink :to="{path: '/report/' + report.id}">{{ report.reportContent }}</RouterLink></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useReportStore } from '@/stores/report';
import { onMounted } from 'vue';

const store = useReportStore();

onMounted(() => {
    store.getReportList();
});
</script>

<style scoped></style>