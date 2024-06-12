import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import storetify from 'storetify'

import '@/assets/styles/main.scss'

import store from './stores'
import router from './router'
import App from './App'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import ElementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementIcons)
app.component('svg-icon', SvgIcon)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: storetify('size') || 'default'
})

app.mount('#app')
