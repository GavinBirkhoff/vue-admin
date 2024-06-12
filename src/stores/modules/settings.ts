import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import { defineStore } from 'pinia'
import storetify from 'storetify'
import { ref, reactive } from 'vue'

const { sideTheme, showSettings, topNav, tagsView, dynamicTitle } = defaultSettings

const storageSetting: any = storetify('layout-setting') || ''

export const useSettingsStore = defineStore('settings', () => {
  const title = ref('')
  const theme = ref(storageSetting.theme || '#409EFF')
  const sideThemeState = ref(storageSetting.sideTheme || sideTheme)
  const showSettingsState = ref(showSettings)
  const topNavState = ref(storageSetting.topNav === undefined ? topNav : storageSetting.topNav)
  const tagsViewState = ref(
    storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView
  )
  const dynamicTitleState = ref(
    storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
  )

  const state = reactive({
    title,
    theme,
    sideTheme: sideThemeState,
    showSettings: showSettingsState,
    topNav: topNavState,
    tagsView: tagsViewState,
    dynamicTitle: dynamicTitleState
  })

  const changeSetting = (data: { key: string; value: string }) => {
    const { key, value } = data
    if (key in state) {
      ;(state as any)[key] = value
    }
  }

  const setTitle = (newTitle: string) => {
    title.value = newTitle
    useDynamicTitle()
  }

  return {
    ...state,
    changeSetting,
    setTitle
  }
})

export default useSettingsStore
