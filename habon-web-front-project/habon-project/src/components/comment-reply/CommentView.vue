<template>
  <div class="container">
    <h2>댓글</h2>
    <hr />
    <div class="comment-list">
      <div class="comment-item" v-for="comment in commentStore.comments" :key="comment.id">
        <div class="comment-header">
          <div class="comment-writer">{{ comment.writer }}</div>
          <div class="comment-regist-date">{{ comment.registDate }}</div>
          <div class="comment-regist-date">좋아요:{{ comment.likeCount }}</div>
        </div>
        <div v-if="editCommentId === comment.id">
          <input v-model="editedCommentContent" placeholder="수정할 내용을 입력하세요" />
          <div class="comment-actions">
            <button class="save-button" @click="saveCommentEdit(comment.id)">저장</button>
            <button class="cancel-button" @click="cancelEdit()">취소</button>
          </div>
        </div>
        <div v-else>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-actions">
            <button class="edit-button" v-if="isLoggedIn && user.id === comment.userId" @click="editComment(comment.id, comment.content)">수정</button>
            <button class="delete-button" v-if="isLoggedIn && user.id === comment.userId" @click="deleteComment(comment.id)">삭제</button>
            <button class="like-button" @click="toggleCommentLike(comment.id)">
              {{ isCommentLiked[comment.id] ? "❤️" : "🤍" }}
            </button>
            <button class="report-button" v-if="isLoggedIn" @click="reportComment(comment.id, comment.content)">신고</button>
          </div>
        </div>
        <div class="reply-toggle-container">
          <button class="toggle-reply-button" @click="toggleReplies(comment.id)">
            {{ showReplies[comment.id] ? '대댓글 숨기기' : '대댓글 보기' }}
          </button>
        </div>
        <ReplyView v-if="showReplies[comment.id]" :commentId="comment.id" />
        <hr />
      </div>
    </div>
    <div class="comment-input">
      <input v-model="newCommentContent" placeholder="댓글을 입력하세요" />
      <button class="add-comment-button" @click="addComment">댓글 등록</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useCommentStore } from '@/stores/comments';
import { useLikeStore } from '@/stores/like';
import { useReportStore } from '@/stores/report';
import { useRoute } from 'vue-router';
import ReplyView from './ReplyView.vue';
import Swal from 'sweetalert2';

const route = useRoute();
const commentStore = useCommentStore();
const likeStore = useLikeStore();
const user = ref(JSON.parse(sessionStorage.getItem('user')));
const isLoggedIn = ref(user.value !== null);
const reportStore = useReportStore();
const reportContent = ref('');

const newCommentContent = ref('');
const editCommentId = ref(null);
const editedCommentContent = ref('');

const showReplies = reactive({});
const isCommentLiked = reactive({}); // 댓글 좋아요 상태를 저장하는 객체

const showLoginAlert = () => {
  alert("로그인이 필요합니다.");
};

const addComment = () => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  if (newCommentContent.value.trim() === '') return;
  const newComment = {
    content: newCommentContent.value,
    userId: user.value.id,
    writer: user.value.nickname,
  };
  commentStore.addComment(route.params.id, newComment);
  newCommentContent.value = '';
};

const editComment = (commentId, content) => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  editCommentId.value = commentId;
  editedCommentContent.value = content;
};

const saveCommentEdit = (commentId) => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  commentStore.updateComment(commentId, { content: editedCommentContent.value });
  editCommentId.value = null;
};

const deleteComment = (commentId) => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  commentStore.deleteComment(commentId);
};

const cancelEdit = () => {
  editCommentId.value = null;
};

const toggleReplies = (commentId) => {
  showReplies[commentId] = !showReplies[commentId];
};

const checkCommentLikeStatus = async (commentId) => {
  if (!isLoggedIn.value) return;
  await likeStore.likeCheck('comment', commentId);
  isCommentLiked[commentId] = likeStore.islike;
};

const toggleCommentLike = async (commentId) => {
  if (!isLoggedIn.value) {
    showLoginAlert();
    return;
  }
  await likeStore.likeclick('comment', commentId);
  await commentStore.getComments(route.params.id); // 댓글 데이터를 다시 불러와 좋아요 수 업데이트
  isCommentLiked[commentId] = likeStore.islike;
};

const reportComment = async (commentId, commentContent) => {
  const { value: reportContentValue } = await Swal.fire({
    title: '신고 내용을 입력하세요.',
    input: 'textarea',
    inputPlaceholder: '신고 내용을 입력...',
    showCancelButton: true,
  });

  if (reportContentValue) {
    const reportData = {
      contentContent: commentContent,
      reportContent: reportContentValue,
    };
    await reportStore.postReport('comment', commentId, reportData);
    Swal.fire('신고가 접수되었습니다.');
  }
};

onMounted(async () => {
  await commentStore.getComments(route.params.id);
  commentStore.comments.forEach(comment => {
    checkCommentLikeStatus(comment.id);
  });
});
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.comment-list {
  margin-top: 20px;
}

.comment-item,
.reply-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.comment-header,
.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-writer,
.reply-writer {
  font-weight: bold;
  color: #555;
}

.comment-content,
.reply-content {
  margin-bottom: 10px;
  color: #333;
}

.comment-regist-date,
.reply-regist-date {
  font-size: 0.8em;
  color: #999;
}

.comment-actions,
.reply-actions {
  display: flex;
  gap: 5px;
}

.reply-toggle-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.comment-input,
.reply-input {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.comment-input input,
.reply-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comment-input button,
.reply-input button,
.save-button,
.cancel-button,
.edit-button,
.delete-button,
.add-comment-button,
.add-reply-button,
.toggle-reply-button,
.like-button,
.report-button {
  font-family: 'BMEuljiro10yearslater';
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 0.9em;
}
</style>
