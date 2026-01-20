<script setup lang="ts">
import { useData } from 'vitepress'

const { lang } = useData()

const notices = {
  'ja': {
    title: 'お知らせ',
    line1: '本プロジェクトは現在アクティブな開発を停止しています。',
    line2: 'なお、本プロジェクトの譲渡・売却を検討しています。ご興味のある方は',
    contact: 'X（@tegnike）のDM',
    or: 'または',
    email: 'メール（support@aituberkit.com）',
    suffix: 'にてご連絡ください。',
    details: '詳細はこちら'
  },
  'en': {
    title: 'Notice',
    line1: 'Active development of this project is currently on hold, but it has not stopped entirely. Development continues at a slower pace.',
    line2: 'We are also considering transferring or selling this project. If you are interested, please contact us via',
    contact: 'X (@tegnike) DM',
    or: 'or',
    email: 'email (support@aituberkit.com)',
    suffix: '.',
    details: 'Details here'
  },
  'zh': {
    title: '通知',
    line1: '本项目目前暂停了活跃开发，但并未完全停止。开发正在以较慢的节奏继续进行。',
    line2: '我们也在考虑转让或出售本项目。如有兴趣，请通过',
    contact: 'X（@tegnike）私信',
    or: '或',
    email: '邮件（support@aituberkit.com）',
    suffix: '与我们联系。',
    details: '详情请点击'
  }
}

const getLang = () => {
  if (lang.value.startsWith('zh')) return 'zh'
  if (lang.value.startsWith('en')) return 'en'
  return 'ja'
}
</script>

<template>
  <div class="home-notice">
    <div class="notice-content">
      <p class="notice-title">{{ notices[getLang()].title }}</p>
      <p>
        {{ notices[getLang()].line1 }}
        <a href="https://note.com/nike_cha_n/n/n60fd3f5f4fe6" target="_blank">{{ notices[getLang()].details }}</a>
      </p>
      <p>
        {{ notices[getLang()].line2 }}
        <a href="https://x.com/tegnike" target="_blank">{{ notices[getLang()].contact }}</a>
        {{ notices[getLang()].or }}
        {{ notices[getLang()].email }}{{ notices[getLang()].suffix }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.home-notice {
  padding: 0 24px 24px;
}

.notice-content {
  max-width: 1152px;
  margin: 0 auto;
  background-color: var(--vp-c-danger-soft);
  border: 1px solid var(--vp-c-danger-1);
  border-radius: 8px;
  padding: 16px 20px;
}

.notice-title {
  font-weight: bold;
  color: var(--vp-c-danger-1);
  margin-bottom: 8px;
}

.notice-content p {
  margin: 4px 0;
  line-height: 1.6;
}

.notice-content a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}
</style>
