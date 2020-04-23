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
        <el-radio-group v-model="form.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
          <el-radio label="已删除"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="form.region" placeholder="请选择频道">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.date1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    </el-card>
    <!-- 日期 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
           根据内容共查询到515条数据结果：
        </div>
        <!-- 数据列表 -->
    <el-table
      :data="articles"
      class="list-table"
      size="mini"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="封面">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
         <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">草稿</el-tag>
          <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
          <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
          <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
        </template>
      </el-table-column>
         <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template >
        <el-button
          size="mini"
          icon="el-icon-edit"
          circle
         ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
    layout="prev, pager, next"
    background
    :total="1000">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    loadArticle () {
      getArticles().then(res => {
        this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
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
</style>
