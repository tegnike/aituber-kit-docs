import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import HomeNotice from './HomeNotice.vue'
import DocVersion from './DocVersion.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-before': () => h(HomeNotice),
      'layout-bottom': () => h(DocVersion)
    })
  }
}
