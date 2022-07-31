<template>
  <div class="tabsWrapper">
    <el-tabs v-model="$route.path" type="border-card" closable @tab-remove="removeTab" @tab-click="goto">
      <el-tab-pane v-for="item in currentTagsList" :key="item.fullPath" :name="item.fullPath">
        <template #label>
          <span @contextmenu.prevent="Clickcontextmenu($event, item.fullPath)">
            {{ item.meta.title }}
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="selectTip" v-show="showSelect">
      <ul>
        <li @click="removeTabOther(1)"><small>关闭当前</small></li>
        <li @click="removeTabOther(2)"><small>关闭其他</small></li>
        <li @click="removeTabOther(3)"><small>关闭所有</small></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()
const showSelect = ref(false)
const contextMenuCurIndex = ref()

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

const removeTabOther = (flag) => {
  // 关闭当前
  if (flag === 1) {
    removeTab(contextMenuCurIndex.value)
  }
  // 关闭所有除当前
  if (flag === 2) {
    const reservePath = currentTagsList.value.find(item => {
      return item.fullPath === contextMenuCurIndex.value
    })
    store.commit('app/removeOthersTag', { reservePath })
  }
  // 关闭所有
  if (flag === 3) {
    store.commit('app/clearTagList')
  }
}

const listener = () => {
  showSelect.value = false
}
const Clickcontextmenu = (e, fullPath) => {
  const el = document.querySelector('.selectTip')
  showSelect.value = true
  document.addEventListener('click', listener)
  el.style.left = e.pageX + 'px'
  el.style.top = e.pageY + 'px'

  contextMenuCurIndex.value = fullPath
}
// 及时移除监听器
watch(() => showSelect.value, (newVal) => {
  if (!newVal) {
    document.removeEventListener('click', listener)
  }
})

</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';

.tabsWrapper {
  position: relative;

  .selectTip {
    position: fixed;
    z-index: 10;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    ul,
    li {
      list-style: none;
      padding: 0px;
      margin: 0px;
      background: lightgray;
    }

    ul {
      border: solid 1px gray;
    }

    li {
      padding: 0 10px 0 10px;
      line-height: 30px;

      &:hover {
        background: #{$menuBgColor};
        color: $menuActiveFontColor;
      }
    }
  }
}

:deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item) {
  border-right: 1px solid rgb(211, 211, 211);

  &:hover {
    color: rgb(144, 147, 153) !important;
  }

  &.is-active {
    background-color: #{$menuBgColor} !important;
    color: $menuActiveFontColor  !important;
  }
}

:deep(.el-tabs--border-card>.el-tabs__content) {
  padding: 0;
}
</style>
