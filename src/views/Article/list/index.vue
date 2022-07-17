<template>
  <div class="wrapper">
    <el-tabs v-model="activeTopic" @tab-click="changeTopic">
      <el-tab-pane
        v-for="item in articleTypes"
        :key="item.name"
        :name="item.name"
      >
        <template #label>
          {{ item.label }}
        </template>
        <articleCollapse
          :ref="item.name"
          :thisType="item.name"
          :activeTopic="activeTopic"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import articleCollapse from './components/articleCollapse.vue'
import { apiGetAllArticleTypes } from '@/api/article'

const activeTopic = ref('')
const articleTypes = ref([])
const showArticleList = ref([])

// 获取所有文章类型
// 设置初始激活项
const getAllArticleTypes = async () => {
  articleTypes.value = await apiGetAllArticleTypes()
  activeTopic.value = articleTypes.value[0].name
}
getAllArticleTypes()
const changeTopic = (name) => {
  // name.value.init()
}
</script>

<style lang="scss" scoped></style>
