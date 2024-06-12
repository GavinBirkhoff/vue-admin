import { viteMockServe } from 'vite-plugin-mock'

export default function createViteMock() {
  return viteMockServe({
    // 配置项
    mockPath: 'mock', // 指定 Mock 文件路径
    localEnabled: true, // 本地开发启用
    prodEnabled: false // 生产环境禁用
  })
}
