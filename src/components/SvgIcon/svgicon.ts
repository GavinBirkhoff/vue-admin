import type { App } from 'vue'
import * as components from '@element-plus/icons-vue'

export default {
  install: (app: App) => {
    for (const key in components) {
      const componentConfig = (components as Record<string, any>)[key]
      app.component(componentConfig.name, componentConfig)
    }
  }
}
