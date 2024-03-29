<template>
  <div class="wrapper">
    <span class="fixedBtn">
      <el-button type="primary" @click="openPanel">配置阅览</el-button>
    </span>
    <el-tabs v-model="activeTopic">
      <el-tab-pane v-for="item in articleTypes" :key="item.name" :name="item.name">
        <template #label>
          {{ item.label }}
        </template>
        <el-scrollbar height="500px">
          <articleCollapse :ref="item.name" :thisType="item.name" :activeTopic="activeTopic" :option="articleOption"
            :tragger="tragger" @successGetList="returnTotal" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <el-drawer v-model="drawerState" title="配置浏览选项" direction="rtl" :before-close="handleClose">
      <el-form :model="articleOption" label-position="top">
        <el-form-item prop="userName" label="作者">
          <el-input placeholder="输入作者名称" v-model="articleOption.userName" clearable />
        </el-form-item>
        <el-form-item prop="articleId" label="文章Id">
          <el-input placeholder="输入文章Id" v-model="articleOption.articleId" clearable />
        </el-form-item>
        <el-form-item prop="updateTimeAfter" label="筛选某时间之后的文章">
          <el-date-picker v-model="articleOption.updateTimeAfter" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择起始日期" />
        </el-form-item>
        <el-form-item prop="updateTimeBefore" label="筛选某时间之前的文章">
          <el-date-picker v-model="articleOption.updateTimeBefore" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择截至日期" />
        </el-form-item>
      </el-form>
      <div style="margin-top: 60px">
        <el-config-provider :locale="zhCn">
          <el-pagination @size-change="pageSizeChange" @current-change="pageChange"
            :current-page="articleOption.pageCurrent" :page-size="articleOption.pageSize" :page-sizes="[5, 10, 20]"
            layout="sizes, prev, pager, next, jumper" :total="totalRows"></el-pagination>
        </el-config-provider>
      </div>
      <template #footer>
        <div style="display: flex; justify-content: space-around">
          <el-button @click="ConfirmOption" type="primary">确认配置</el-button>
          <el-button @click="clearOption">清空配置</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import articleCollapse from './components/articleCollapse.vue'
import { apiGetAllArticleTypes } from '@/api/article'

const tragger = ref(false)
const activeTopic = ref('')
const articleTypes = ref([])
const articleOption = ref({
  pageCurrent: 1,
  pageSize: 5,
  userName: '',
  articleId: null,
  updateTimeAfter: null,
  updateTimeBefore: null
})
const totalRows = ref(0)
const drawerState = ref(false)

// 获取所有文章类型
// 设置初始激活项
const getAllArticleTypes = async () => {
  articleTypes.value = await apiGetAllArticleTypes()
  activeTopic.value = articleTypes.value[0].name
}
getAllArticleTypes()

// 配置阅读文章列表
const openPanel = () => {
  drawerState.value = true
}
// 关闭drawer
const handleClose = () => {
  drawerState.value = false
}
// 返回总页数的回调
const returnTotal = (totalPage) => {
  totalRows.value = totalPage
}
// 清空配置
const clearOption = () => {
  articleOption.value.pageCurrent = 1
  articleOption.value.pageSize = 5
  articleOption.value.userName = ''
  articleOption.value.articleId = null
  articleOption.value.updateTimeAfter = null
  articleOption.value.updateTimeBefore = null
}
// 确认配置
const ConfirmOption = () => {
  // 通过该属性，组件watch其，获取更新数据的指令
  tragger.value = !tragger.value
  handleClose()
}
const pageSizeChange = (value) => {
  articleOption.value.pageSize = value
}

const pageChange = (value) => {
  articleOption.value.pageCurrent = value
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';

.wrapper {
  position: relative;

  .fixedBtn {
    z-index: 1;
    position: fixed;
    right: 20px;
  }
}

:deep(.el-tabs__item) {
  &:hover {
    color: rgb(48, 49, 51);
  }

  &.is-active {
    color: $menuActiveFontColor;
  }
}
</style>
