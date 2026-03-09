<script setup lang="ts">
import { useData } from 'vitepress'

const { lang } = useData()

// ここでバージョン情報を管理
const version = 'v2.40.0'
const repoUrl = 'https://github.com/tegnike/aituber-kit'

const labels = {
  'ja': {
    prefix: '本ドキュメントは',
    version: version,
    suffix: 'に対応しています'
  },
  'en': {
    prefix: 'This documentation corresponds to',
    version: version,
    suffix: ''
  },
  'zh': {
    prefix: '本文档对应',
    version: version,
    suffix: '版本'
  }
}

const getLang = () => {
  if (lang.value.startsWith('zh')) return 'zh'
  if (lang.value.startsWith('en')) return 'en'
  return 'ja'
}
</script>

<template>
  <div class="doc-version">
    <span>{{ labels[getLang()].prefix }}</span>
    <a :href="`${repoUrl}/releases/tag/${version}`" target="_blank">{{ labels[getLang()].version }}</a>
    <span>{{ labels[getLang()].suffix }}</span>
  </div>
</template>

<style scoped>
.doc-version {
  text-align: center;
  padding: 16px 24px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.doc-version a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

.doc-version a:hover {
  text-decoration: underline;
}
</style>
