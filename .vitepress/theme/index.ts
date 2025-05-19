import DefaultTheme from 'vitepress/theme'
import Chat from 'vue3-beautiful-chat'
import Layout from './Layout.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // デフォルトテーマが持つ enhanceApp を保持
    DefaultTheme.enhanceApp?.({ app })
    app.use(Chat)
  },
}
