import { getItem, setItem } from '@/utils/storage'
import { SIDERBAROPENED, THEMECOLORDAY } from '@/constants'
import scssVariables from '@/styles/variables.module.scss'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: getItem(SIDERBAROPENED) ?? false,
    themeColorDay: getItem('vueuse-color-scheme'),
    scssVariables
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
      setItem(SIDERBAROPENED, state.sidebarOpened)
    },
    tangleTheme(state) {
      if (state.themeColorDay === 'auto') {
        state.themeColorDay = 'dark'
      } else {
        state.themeColorDay = 'auto'
      }
    }
  }
}
