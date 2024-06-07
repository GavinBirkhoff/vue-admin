import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import store from 'storetify'

import '@/assets/styles/main.scss'

import App from './App'
import router from './router'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import ElementIcons from '@/components/SvgIcon/svgicon'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementIcons)
app.component('svg-icon', SvgIcon)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: store('size') || 'default'
})

app.mount('#app')
