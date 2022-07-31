<template>
  <div class="user-info-container">
    <div class="optionBtn">
      <el-button type="primary" v-print="printObj" :loading="printLoading">打印</el-button>
    </div>
    <el-card>
      <div id="userInfoBox" class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">标题</h2>
        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item label="姓名">{{
                detailData.username
            }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{
                detailData.gender
            }}</el-descriptions-item>
            <el-descriptions-item label="国家">{{
                detailData.nationality
            }}</el-descriptions-item>
            <el-descriptions-item label="电话号码">{{
                detailData.mobile
            }}</el-descriptions-item>
            <el-descriptions-item label="省份">{{
                detailData.province
            }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{
                detailData.updateTime.format('yyyy-MM-dd hh:mm')
            }}</el-descriptions-item>
            <el-descriptions-item label="标签" :span="2">
              <el-tag class="remark" size="small" v-for="(item, index) in detailData.remark" :key="index">{{ item }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="地址" :span="2">{{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image class="avatar" :src="detailData.avatar" :preview-src-list="[detailData.avatar]"></el-image>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item label="经验">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ item.startTime.format('yyyy-MM-dd') }}
                    ----
                    {{ item.endTime.format('yyyy-MM-dd') }}</span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item label="专业">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item label="荣耀">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// import { userDetail } from '@/api/user-manage'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref()
// 数据相关
const detailData = ref({})
const getUserDetail = async () => {
  id.value = route.path
  // detailData.value = await userDetail(props.id)
  detailData.value = {
    username: 'sam',
    gender: '男',
    nationality: '中国',
    mobile: '400823823',
    province: '浙江',
    updateTime: new Date(),
    remark: [
      'vue',
      'nodeJs',
      'element-plus',
      'koa2'
    ],
    address: '浙江温州',
    avatar: 'https://www.baidu.com/favicon.ico',
    experience: [
      {
        startTime: new Date(),
        endTime: new Date(),
        title: '江苏大学',
        desc: '在读研究生'
      }
    ],
    major: '计算机技术',
    glory: '江苏大学优秀研究生'
  }
}
getUserDetail()

// 打印相关
const printLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'mj-vue-admin',
  // 打印前
  beforeOpenCallback(vue) {
    printLoading.value = true
  },
  // 执行打印
  openCallback(vue) {
    printLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.optionBtn {
  display: flex;
  justify-content: flex-end;
  height: 42px;
  margin-bottom: 10px;
}

.user-info-box {
  width: calc(100% - 20px);
  margin: 0 auto;

  .title {
    text-align: center;
    margin-bottom: 18px;
  }

  .header {
    display: flex;

    :deep(.el-descriptions) {
      flex-grow: 1;
    }

    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }

    .remark {
      margin-right: 12px;
    }
  }

  .body {
    ul {
      list-style: none;

      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }

}
</style>
