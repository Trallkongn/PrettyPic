<template>
  <div class="comments-section">
    <h2>评论区</h2>

    <!-- 发表评论 -->
    <div class="comment-form">
      <textarea v-model="newCommentContent" placeholder="请输入您的评论..." rows="4"></textarea>
      <div class="form-footer">
        <button @click="submitComment" :disabled="!newCommentContent.trim()">发表评论</button>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <!-- 评论主体 -->
        <div class="comment-main">
          <div class="avatar">
            <img :src="comment.avatar" :alt="comment.author" />
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="author">{{ comment.author }}</span>
              <span class="time">{{ comment.time }}</span>
            </div>
            <p class="content">{{ comment.content }}</p>
            <div class="comment-actions">
              <button class="action-button" @click="toggleLike(comment)" :class="{ liked: comment.liked }">
                <span class="like-count" v-if="comment.likes > 0">{{ comment.likes }}</span>
                点赞
              </button>
              <button class="action-button" @click="toggleReplyForm(comment.id)">
                回复
              </button>
            </div>

            <!-- 回复表单 -->
            <div v-if="replyingTo === comment.id" class="reply-form">
              <textarea v-model="replyContent" placeholder="请输入回复内容..." rows="3"></textarea>
              <div class="form-footer">
                <button @click="submitReply(comment.id)" :disabled="!replyContent.trim()">发表回复</button>
                <button class="cancel" @click="cancelReply">取消</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 回复列表 -->
        <div v-if="comment.replies && comment.replies.length > 0" class="replies">
          <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
            <div class="avatar">
              <img :src="reply.avatar" :alt="reply.author" />
            </div>
            <div class="reply-content">
              <div class="comment-header">
                <span class="author">{{ reply.author }}</span>
                <span class="time">{{ reply.time }}</span>
              </div>
              <p class="content">{{ reply.content }}</p>
              <div class="comment-actions">
                <button class="action-button" @click="toggleLike(reply)" :class="{ liked: reply.liked }">
                  <span class="like-count" v-if="reply.likes > 0">{{ reply.likes }}</span>
                  点赞
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 新评论内容
const newCommentContent = ref('')

// 回复相关
const replyingTo = ref<number | null>(null)
const replyContent = ref('')

// 评论数据
const comments = ref([
  {
    id: 1,
    author: '摄影爱好者',
    avatar: 'https://img.icons8.com/ios-filled/100/camera.png',
    content: '这组照片拍得太棒了！构图和光线都处理得非常好。',
    time: '2024-06-01 14:30',
    likes: 24,
    liked: false,
    replies: [
      {
        id: 11,
        author: '摄影师小李',
        avatar: 'https://img.icons8.com/ios-filled/100/settings.png',
        content: '谢谢夸奖！这组照片是在黄山拍摄的，那里的风景真的很美。',
        time: '2024-06-01 15:45',
        likes: 8,
        liked: false
      }
    ]
  },
  {
    id: 2,
    author: '旅行达人',
    avatar: 'https://img.icons8.com/ios-filled/100/camera.png',
    content: '请问这是用什么相机拍的？效果太震撼了！',
    time: '2024-06-02 09:15',
    likes: 12,
    liked: false,
    replies: []
  }
])

// 提交新评论
const submitComment = () => {
  if (!newCommentContent.value.trim()) return

  const newComment = {
    id: Date.now(),
    author: '当前用户',
    avatar: 'https://img.icons8.com/ios-filled/100/camera.png',
    content: newCommentContent.value,
    time: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-'),
    likes: 0,
    liked: false,
    replies: []
  }

  comments.value.unshift(newComment)
  newCommentContent.value = ''
}

// 切换回复表单
const toggleReplyForm = (commentId: number) => {
  if (replyingTo.value === commentId) {
    replyingTo.value = null
    replyContent.value = ''
  } else {
    replyingTo.value = commentId
    replyContent.value = ''
  }
}

// 提交回复
const submitReply = (commentId: number) => {
  if (!replyContent.value.trim()) return

  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    const newReply = {
      id: Date.now(),
      author: '当前用户',
      avatar: 'https://img.icons8.com/ios-filled/100/camera.png',
      content: replyContent.value,
      time: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/\//g, '-'),
      likes: 0,
      liked: false
    }

    comment.replies.push(newReply)
    replyContent.value = ''
    replyingTo.value = null
  }
}

// 取消回复
const cancelReply = () => {
  replyingTo.value = null
  replyContent.value = ''
}

// 点赞功能
// 在 script setup 中添加以下接口定义
interface CommentItem {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  liked: boolean;
  replies?: CommentItem[]; // 可选的回复列表
}

// 修改 toggleLike 函数签名
const toggleLike = (item: CommentItem) => {
  item.liked = !item.liked
  item.likes += item.liked ? 1 : -1
}
</script>

<style scoped>
.comments-section {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
}

.comments-section h2 {
  margin-bottom: 1.5rem;
  color: #ff9800;
}

.comment-form textarea,
.reply-form textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 15px;
  resize: vertical;
  box-sizing: border-box;
}

.form-footer {
  margin-top: 0.8rem;
  text-align: right;
}

.form-footer button {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.form-footer button:hover:not(:disabled) {
  background: #ffa726;
}

.form-footer button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.form-footer .cancel {
  background: #f5f5f5;
  color: #666;
  margin-left: 0.5rem;
}

.form-footer .cancel:hover {
  background: #e0e0e0;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 1.5rem 0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-main {
  display: flex;
  gap: 1rem;
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #fafafa;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}

.author {
  font-weight: bold;
  color: #333;
}

.time {
  color: #999;
  font-size: 14px;
}

.content {
  margin-bottom: 1rem;
  line-height: 1.5;
  color: #333;
}

.comment-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem;
}

.action-button:hover {
  color: #ff9800;
}

.action-button.liked {
  color: #ff9800;
}

.like-count {
  font-size: 13px;
}

.replies {
  margin-top: 1rem;
  margin-left: 3rem;
  border-left: 2px solid #eee;
  padding-left: 1.5rem;
}

.reply-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
}

.reply-item:first-child {
  padding-top: 0;
}

.reply-item:last-child {
  padding-bottom: 0;
}

.reply-content {
  flex: 1;
}

.reply-form {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .replies {
    margin-left: 1.5rem;
    padding-left: 1rem;
  }

  .comment-main,
  .reply-item {
    gap: 0.8rem;
  }

  .avatar img {
    width: 36px;
    height: 36px;
  }
}
</style>
