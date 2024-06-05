<template>
  <div>
    <div class="reply-list">
      <div class="reply-item" v-for="reply in filteredReplies" :key="reply.id">
        <div class="reply-header">
          <div class="reply-writer">{{ reply.writer }}</div>
          <div class="reply-regist-date">{{ reply.registDate }}</div>
        </div>
        <div v-if="editReplyId === reply.id">
          <input v-model="editedReplyContent" placeholder="수정할 내용을 입력하세요" />
          <div class="reply-actions">
            <button class="save-button" @click="saveReplyEdit(reply.id)">저장</button>
            <button class="cancel-button" @click="cancelEdit()">취소</button>
          </div>
        </div>
        <div v-else>
          <div class="reply-content">{{ reply.content }}</div>
          <div class="reply-actions">
            <button class="edit-button" v-if="isLoggedIn && user.id === reply.userId"
              @click="editReply(reply.id, reply.content)">수정</button>
            <button class="delete-button" v-if="isLoggedIn && user.id === reply.userId"
              @click="deleteReply(reply.id)">삭제</button>
          </div>
        </div>
      </div>
      <div v-if="showReplyInput" class="reply-input">
        <input v-model="newReplyContent" placeholder="대댓글을 입력하세요" />
        <button class="add-reply-button" @click="addReply">대댓글 등록</button>
      </div>
      <button class="toggle-reply-button" @click="toggleReplyInput">
        {{ showReplyInput ? '취소' : '대댓글 달기' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useReplyStore } from '@/stores/reply';
import { useRoute } from 'vue-router';

const props = defineProps({
  commentId: Number
});

const route = useRoute();
const replyStore = useReplyStore();
const user = ref(JSON.parse(sessionStorage.getItem('user')));
const isLoggedIn = ref(user.value !== null);

const newReplyContent = ref('');
const showReplyInput = ref(false);
const editReplyId = ref(null);
const editedReplyContent = ref('');

const filteredReplies = computed(() => {
  return replyStore.replies.filter(reply => reply.commentId === props.commentId);
});

const showLoginAlert = () => {
  alert("로그인이 필요합니다.");
};

const addReply = () => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  if (newReplyContent.value.trim() === '') return;
  const newReply = {
    content: newReplyContent.value,
    userId: user.value.id,
    writer: user.value.nickname,
    commentId: props.commentId,
  };
  replyStore.addReply(route.params.id, props.commentId, newReply);
  newReplyContent.value = '';
  showReplyInput.value = false;
};

const editReply = (replyId, content) => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  editReplyId.value = replyId;
  editedReplyContent.value = content;
};

const saveReplyEdit = (replyId) => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  replyStore.updateReply(replyId, { content: editedReplyContent.value });
  editReplyId.value = null;
};

const deleteReply = (replyId) => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  replyStore.deleteReply(replyId);
};

const cancelEdit = () => {
  editReplyId.value = null;
};

const toggleReplyInput = () => {
  showReplyInput.value = !showReplyInput.value;
};

onMounted(async () => {
  await replyStore.getReplies([props.commentId]);
});
</script>

<style scoped>
.reply-list {
  margin-left: 20px;
  margin-top: 10px;
  padding-left: 10px;
  border-left: 2px solid #ddd;
}

.reply-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-writer {
  font-weight: bold;
  color: #555;
}

.reply-content {
  margin-bottom: 10px;
  color: #333;
}

.reply-regist-date {
  font-size: 0.8em;
  color: #999;
}

.reply-actions {
  display: flex;
  gap: 5px;
}

.reply-input {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.reply-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.reply-input button,
.save-button,
.cancel-button,
.edit-button,
.delete-button,
.add-reply-button,
.toggle-reply-button {
  font-family: 'BMEuljiro10yearslater';
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 0.9em;
}
</style>
