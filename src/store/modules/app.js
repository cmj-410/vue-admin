import { getItem, setItem } from '@/utils/storage'
import { SIDERBAROPENED, NORMALTHEMECOLOR, TAGSLIST } from '@/constants'
import scssVariables from '@/styles/variables.module.scss'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: getItem(SIDERBAROPENED) ?? false,
    themeColorDay: getItem(NORMALTHEMECOLOR) ?? 'auto',
    tagsList: getItem(TAGSLIST) ?? [],
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
    },
    tangleThemeDay(state) {
      state.themeColorDay = 'auto'
    },
    addTags(state, payload) {
      state.tagsList.push(payload)
      setItem(TAGSLIST, state.tagsList)
    },
    removeTag(state, { ind }) {
      state.tagsList.splice(ind, 1)
      setItem(TAGSLIST, state.tagsList)
    },
    removeOthersTag(state, { reservePath }) {
      state.tagsList = [reservePath]
      debugger
      setItem(TAGSLIST, state.tagsList)
    },
    clearTagList(state) {
      router.push('/home')
      state.tagsList = []
      setItem(TAGSLIST, [])
    }
  }
}
