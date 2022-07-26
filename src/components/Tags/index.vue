<template>
  <div class="tabsWrapper">
    <el-tabs
      v-model="$route.path"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="goto"
    >
      <el-tab-pane
        v-for="item in currentTagsList"
        :key="item.fullPath"
        :label="item.meta.title"
        :name="item.fullPath"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()

const currentTagsList = computed(() => store.getters.tagsList)

const goto = (tag) => {
  router.push(tag.props.name)
}
const removeTab = (targetPathName) => {
  let index
  let temp = 0
  currentTagsList.value.forEach((item) => {
    if (item.fullPath === targetPathName) {
      index = temp
    }
    temp++
  })
  if (route.path === targetPathName) {
    router.push(
      currentTagsList.value[index + 1]?.fullPath ??
        currentTagsList.value[index - 1]?.fullPath ??
        '/home'
    )
  }
  store.commit('app/removeTag', { ind: index })
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';

:deep(.el-tabs__item){
  &:hover{
    color: black;
  }
  &.is-active {
    background-color: #{$menuBgColor} !important;
    color: $menuActiveFontColor;
  }
}
</style>
