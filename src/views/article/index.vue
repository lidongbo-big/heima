<template>
  <div class="article-container">
      <el-card class="filter-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>内容管理</el-breadcrumb-item>
             </el-breadcrumb>
        </div>
    <el-form ref="form" :model="form" label-width="40px" size="mini">
      <el-form-item label="状态">
        <el-radio-group v-model="status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="channelId" placeholder="请选择频道">
           <el-option label="全部" :value="null"></el-option>
          <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="rangeDate"
          type="datetimerange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadArticle(1)" :disabled = 'loading'>查询</el-button>
      </el-form-item>
    </el-form>
    </el-card>
    <!-- 日期 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
           根据内容共查询到{{totalCount}}条数据结果：
        </div>
        <!-- 数据列表 -->
    <el-table
      v-loading="loading"
      :data="articles"
      class="list-table"
      size="mini"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="封面">
        <template slot-scope="scope">
          <img v-if="scope.row.cover.images[0]" class="atricle-cover" :src="scope.row.cover.images[0]" alt="">
          <img v-else="" class="atricle-cover" src="./nohave.gif" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
         <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus [scope.row.status].text }}</el-tag>
        </template>
      </el-table-column>
         <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          circle
          @click="$router.push('/publish?id=' + scope.row.id.toString())"
         ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
          @click="onDeleteArticle(scope.row.id)"
        ></el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
    layout="prev, pager, next"
    background
    :total="totalCount"
    :current-page.sync="page"
    :page-size="pageSize"
    :disabled = 'loading'
    @current-change="onCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      articleStatus: [
        { status: 1, text: '草稿', type: '' },
        { status: 2, text: '待审核', type: 'warning' },
        { status: 3, text: '审核通过', type: 'success' },
        { status: 4, text: '审核失败', type: 'danger' },
        { status: 5, text: '已删除', type: 'info' }
      ],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channels: [],
      channelId: null,
      rangeDate: [],
      loading: true,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle(1)
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticle (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onCurrentChange (page) {
      this.loadArticle(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          this.loadArticle(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style scoped lang='less'>
.filter-card {
  margin-bottom: 30px;
}
.list-table {
    margin-bottom: 20px;
}
.atricle-cover {
  width: 60px;
  background-size: cover;
}
</style>
