<template>
  <div class="settings-cantainer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to='/'>首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span='15'>
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="编号">
                    {{user.id}}
                </el-form-item>
                <el-form-item label="手机">
                    {{user.mobile}}
                </el-form-item>
                <el-form-item label="媒体名称">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍">
                    <el-input type="textarea" v-model="user.intro"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="user.email"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :offset="2" :span='4'>
                <el-avatar shape="square" :size="150" fit="cover" :src="user.photo"></el-avatar>
                <p @click="$refs.file.click()">点击修改头像</p>
                <input type="file" hidden ref="file" @change='onFileChange'>
            </el-col>
        </el-row>
      </el-card>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        append-to-body
        >
        <img :src="previewImage" alt="">
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'SettingsIndex',
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
      user: {
        id: null,
        mobile: '',
        intro: '',
        name: '',
        photo: '',
        email: ''
      },
      dialogVisible: false,
      previewImage: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      this.dialogVisible = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less"></style>
