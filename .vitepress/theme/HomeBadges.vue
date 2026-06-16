<script setup lang="ts">
import { computed, onMounted } from 'vue'
import {
  formatRelease,
  formatShortDate,
  formatStars,
  useGithubRepoStats,
} from './githubRepoStats'

const { stats, loadStats } = useGithubRepoStats()

onMounted(() => {
  loadStats()
})

const starsLabel = computed(() => formatStars(stats.value.stars))
const releaseLabel = computed(() => formatRelease(stats.value.release))
const lastCommitLabel = computed(() =>
  formatShortDate(stats.value.lastCommitAt)
)
</script>

<template>
  <div class="home-badges">
    <div class="badges-content">
      <a
        class="repo-badge"
        href="https://github.com/tegnike/aituber-kit/stargazers"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Stars"
      >
        <span class="badge-label">Stars</span>
        <span class="badge-value">{{ starsLabel }}</span>
      </a>
      <a
        class="repo-badge"
        href="https://github.com/tegnike/aituber-kit/releases/latest"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Latest Release"
      >
        <span class="badge-label">Release</span>
        <span class="badge-value">{{ releaseLabel }}</span>
      </a>
      <a
        class="repo-badge"
        href="https://github.com/tegnike/aituber-kit/commits/main"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Last Commit"
      >
        <span class="badge-label">Last Commit</span>
        <span class="badge-value">{{ lastCommitLabel }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.home-badges {
  padding: 0 24px 24px;
}

.badges-content {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.badges-content a {
  text-decoration: none;
}

.repo-badge {
  display: inline-flex;
  align-items: stretch;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-1);
  font-size: 11px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
}

.repo-badge:hover {
  border-color: var(--vp-c-brand-1);
}

.badge-label {
  padding: 0 7px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.badge-value {
  padding: 0 7px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
</style>
