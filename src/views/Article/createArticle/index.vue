<template>
  <div class="wrapper">
    <el-form :model="articleContent" :inline="true" style="height: 60px">
      <el-form-item prop="title" class="title">
        <template #label><b>文章标题</b></template>
        <el-input
          v-model="articleContent.title"
          size="large"
          placeholder="请输入标题"
          border:
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="articleAbstractItem" class="abstractItems">
        <template #label><b>关键字</b></template>
        <el-select
          multiple
          :multiple-limit="2"
          placeholder="请选择"
          v-model="articleContent.articleAbstractItem"
        >
          <el-option
            v-for="item in allArticleAbstracts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 350px; overflow-y: hidden"
        v-model="articleContent.content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <div class="rightBottom">
      <span style="margin-right: 20px"><el-switch
        v-model="articleContent.articlePermission"
        size="large"
        active-text="公开"
        inactive-text="私有"
      /></span>
      <el-button type="primary" @click="submitArticle">提交文章</el-button>
    </div>
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'
import { apiAddArticle } from '@/api/article'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// 编辑器模式
const mode = ref('default') // simple, default
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 文章内容
const articleContent = ref({
  title: '',
  content: '',
  articleAbstractItem: [],
  articlePermission: true
})
// 初始化页面
const initArticle = () => {
  articleContent.value.title = ''
  articleContent.value.content = ''
  articleContent.value.articleAbstractItem = []
  articleContent.value.articlePermission = true
}
// 文章关键词
const allArticleAbstracts = [
  {
    value: 'regularlLife',
    label: '日常生活'
  },
  {
    value: 'emotionLife',
    label: '情感生活'
  },
  {
    value: 'happy',
    label: '开心'
  }
]
// 模拟 ajax 异步获取内容
onMounted(() => {})

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const store = useStore()
const router = useRouter()
const submitArticle = async () => {
  const validate = Object.keys(articleContent.value).every(key => {
    debugger
    if (!articleContent.value[key] || articleContent.value[key]?.length === 0) return false
    return true
  })
  if (!validate) {
    ElMessage.error('请填写完整')
    return
  }
  await apiAddArticle({
    ...(articleContent.value),
    userId: store.getters.getCurrentUserInfo.userId,
    userName: store.getters.getCurrentUserInfo.userName
  })
  initArticle()
  router.push({
    name: 'articleList'
  })
}
</script>

<style lang="scss" scoped>
.el-form {
  display: flex;
  justify-content: space-between;
}
.title {
  ::v-deep .el-form-item__label {
    height: 40px;
    line-height: 40px;
    font-size: 20px !important;
    padding-right: 20px;
  }

  ::v-deep .el-input__wrapper {
    width: 350px;
    .el-input__inner {
      height: 40px;
      line-height: 40px;
      font-size: 20px !important;
    }
  }
}
.abstractItems {
  ::v-deep .el-form-item__label {
    height: 42px;
    line-height: 42px;
  }
  ::v-deep .el-select {
    width: 250px !important;
  }
}

.rightBottom {
  display: flex;
  justify-content: flex-end;
  margin: 20px 20px 0 0;
}
</style>
