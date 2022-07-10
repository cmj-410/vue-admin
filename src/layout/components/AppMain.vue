<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const hasInTagaList = (isPath) => {
  return store.getters.tagsList.some((item) => {
    return item.fullPath === isPath
  })
}
watch(
  route,
  (to) => {
    const { fullPath, meta } = to
    // meta中存在title的可以显示（404和login不设置）
    if (meta?.title && !hasInTagaList(fullPath)) {
      store.commit('app/addTags', { fullPath, meta })
    }
  },
  {
    immediate: true
  }
)
</script>
