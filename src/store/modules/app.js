import { getItem, setItem } from '@/utils/storage'
import { SIDERBAROPENED, THEMECOLORDAY } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: getItem(SIDERBAROPENED) ?? false,
    themeColorDay: getItem(THEMECOLORDAY) ?? true
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
      setItem(SIDERBAROPENED, state.sidebarOpened)
    },
    tangleTheme(state) {
      state.themeColorDay = !state.themeColorDay
      setItem(THEMECOLORDAY, state.themeColorDay)
    }
  }
}
