<script setup lang="ts">
import { useData } from 'vitepress'

const { lang } = useData()

const notices = {
  'ja': {
    title: 'お知らせ',
    line2: '本プロジェクトの譲渡・売却を検討しています。ご興味のある方は',
    contact: 'X（@tegnike）のDM',
    or: 'または',
    email: 'メール（support@aituberkit.com）',
    suffix: 'にてご連絡ください。'
  },
  'en': {
    title: 'Notice',
    line2: 'We are considering transferring or selling this project. If you are interested, please contact us via',
    contact: 'X (@tegnike) DM',
    or: 'or',
    email: 'email (support@aituberkit.com)',
    suffix: '.'
  },
  'zh': {
    title: '通知',
    line2: '我们正在考虑转让或出售本项目。如有兴趣，请通过',
    contact: 'X（@tegnike）私信',
    or: '或',
    email: '邮件（support@aituberkit.com）',
    suffix: '与我们联系。'
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
  background-color: var(--vp-c-warning-soft);
  border: 1px solid var(--vp-c-warning-1);
  border-radius: 8px;
  padding: 16px 20px;
}

.notice-title {
  font-weight: bold;
  color: var(--vp-c-warning-1);
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
