<template>
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
::v-deep .el-tabs__header {
  margin-bottom: 0;
}
::v-deep .el-tabs__item {
  &:hover {
    color: skyblue;
  }
  &.is-active {
    background-color: gray !important;
    border-bottom-color: black;
    color: skyblue;
  }
}
</style>
