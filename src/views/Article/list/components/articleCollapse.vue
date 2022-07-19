<template>
  <el-collapse accordion v-model="activeArticleId" @change="handleChange">
    <template v-for="article in showArticleList" :key="article.articleId">
      <el-collapse-item :name="article.articleId">
        <template #title>
          <div class="titleWrapper">
            <span class="title">{{ article.title }}</span>
            <span class="rightPart">
              <b>作者</b>
              {{ article.userName }}
              <b style="margin-left: 20px">更新时间</b
              >{{ article.lastUpdateTime.split('T')[0] }}
            </span>
          </div>
        </template>
        <span v-html="article.content" />
        <div style="padding-left: 10px">
          <el-button
            link
            @click="
              () => {
                activeArticleId = null
              }
            "
            type="success"
            ><b>折叠该文章</b></el-button
          >
        </div>
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import { apiGetTypeArticles } from '@/api/article'

const props = defineProps(['activeTopic', 'thisType', 'option', 'tragger'])
const emits = defineEmits(['successGetList'])

const activeArticleId = ref()
const showArticleList = ref([])
const count = ref(0)
const theTopic = computed(() => {
  return props.activeTopic
})
const theType = computed(() => {
  return props.thisType
})
const theTragger = computed(() => {
  return props.tragger
})

const getArticleList = async () => {
  const res = await apiGetTypeArticles({
    ...props.option,
    type: theTopic.value
  })
  emits('successGetList', res.page.total)
  showArticleList.value = res.list
}

const init = () => {
  // 如果是当前的panel被激活，获取相应的文章列表
  if (theTopic.value === theType.value) {
    getArticleList()
  }
}

init()
// 必须要watch props的变化，然后重新执行获取文章的函数
watch(theTopic, () => init())
// 通过监听触发器，知道什么时候更改了配置，以获取新的列表
watch(theTragger, () => init())

const handleChange = () => {}
</script>

<style lang="scss" scoped>
.titleWrapper {
  display: flex;
  justify-content: space-between;
  width: 80%;
  .title {
    font-size: 26px !important;
  }
}
</style>
