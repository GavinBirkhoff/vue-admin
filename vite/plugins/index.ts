import { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import createSvgIcon from './svg-icon'
import createSetupExtend from './setup-extend'
import createViteMock from './vite-mock'

interface ViteEnv {
  // 根据你的实际环境变量定义属性类型
  [key: string]: any
}

export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean = false): Plugin[] {
  const vitePlugins: Plugin[] = [vue()]
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createViteMock())
  return vitePlugins
}
