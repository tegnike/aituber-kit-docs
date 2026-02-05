<script setup lang="ts">
</script>

<template>
  <div class="home-badges">
    <div class="badges-content">
      <a href="https://github.com/tegnike/aituber-kit/stargazers" target="_blank" rel="noopener noreferrer">
        <img src="https://img.shields.io/github/stars/tegnike/aituber-kit?style=flat&logo=github&label=Stars" alt="GitHub Stars" />
      </a>
      <a href="https://github.com/tegnike/aituber-kit/releases/latest" target="_blank" rel="noopener noreferrer">
        <img src="https://img.shields.io/github/v/release/tegnike/aituber-kit?style=flat&logo=github&label=Release" alt="Latest Release" />
      </a>
      <a href="https://github.com/tegnike/aituber-kit/commits/main" target="_blank" rel="noopener noreferrer">
        <img src="https://img.shields.io/github/last-commit/tegnike/aituber-kit?style=flat&logo=github&label=Last%20Commit" alt="Last Commit" />
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
</style>
