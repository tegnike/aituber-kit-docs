<template>
  <div class="vp-layout-with-chat">
    <!-- 既存のVitePressレイアウト -->
    <VPLayout />

    <!-- vue3-beautiful-chat のランチャー / ウィンドウ -->
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :open="openChat"
      :close="closeChat"
      :showEmoji="false"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DefaultTheme from 'vitepress/theme'

// デフォルトテーマのレイアウトコンポーネントを利用
const VPLayout = DefaultTheme.Layout

/**
 * チャットに表示する参加者リスト
 * 今回はサンプルとしてサポート担当者のみを登録
 */
const participants = ref([
  {
    id: 'support',
    name: 'Support',
    imageUrl: '/logo2.png',
  },
])

/**
 * チャットウィンドウで使用するリアクティブステート
 */
const messageList = ref([
  {
    type: 'text',
    author: 'support',
    data: { text: 'こんにちは！ご質問があればお気軽にどうぞ。' },
  },
])
const newMessagesCount = ref(0)
const isChatOpen = ref(false)
const titleImageUrl = '/logo2.png'

/**
 * ユーザーがメッセージを送信した際のハンドラ
 */
function onMessageWasSent(message: any) {
  messageList.value = [...messageList.value, message]
}

/** チャットを開く */
function openChat() {
  isChatOpen.value = true
  newMessagesCount.value = 0
}

/** チャットを閉じる */
function closeChat() {
  isChatOpen.value = false
}

/** カラースキーム (必要最低限) */
const colors = {
  header: {
    bg: '#4e8cff',
    text: '#ffffff',
  },
  launcher: {
    bg: '#4e8cff',
  },
  messageList: {
    bg: '#ffffff',
  },
  sentMessage: {
    bg: '#4e8cff',
    text: '#ffffff',
  },
  receivedMessage: {
    bg: '#eaeaea',
    text: '#222222',
  },
  userInput: {
    bg: '#f4f7f9',
    text: '#565867',
  },
  emojiPicker: {
    bg: 'white',
    text: '#b8c3ca',
  },
}
</script>
