<template>
  <el-collapse accordion v-model="activeArticleId" @change="handleChange">
    <template v-for="article in showArticleList" :key="article.articleId">
      <el-collapse-item :name="article.articleId">
        <template #title>
          <h1>{{ article.title }}</h1>
          <b style="margin-left: 20px">{{ article.userName }}</b>
        </template>
        <div class="mutil-line-ellipsis">
          <span v-html="article.content" />
        </div>
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script setup>
import { ref, defineProps, computed, watch } from 'vue'
import { apiGetTypeArticles } from '@/api/article'

const props = defineProps(['activeTopic', 'thisType'])
const activeArticleId = ref()
const showArticleList = ref([])
const count = ref(0)
const theTopic = computed(() => {
  return props.activeTopic
})
const theType = computed(() => {
  return props.thisType
})

const getArticleList = async () => {
  showArticleList.value = await apiGetTypeArticles({
    count: count.value,
    type: theTopic.value
  })
  // count.value += 1
}

const init = () => {
  // 如果是当前的panel被激活，获取相应的文章列表
  if (theTopic.value === theType.value) {
    getArticleList()
  }
}

init()
watch(theTopic, () => init())

const handleChange = () => {}
</script>

<style lang="scss" scoped></style>
