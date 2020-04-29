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
              <el-form ref="form" :model="user" label-width="80px">
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
                    <el-button :loading="udploading" type="primary" @click="onSubmit">保存</el-button>
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
        @opened='onOpened'
        :visible.sync='dialogVisible'
        append-to-body
        @closed='onClosed'
        >
        <div class="perview-image-wrap">
            <img class="perview-image" :src="previewImage" ref="preview-image">
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button :loading="udloading" type="primary" @click="onUpdatePhoto">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import globalBus from '@/utils/global-bus'
export default {
  name: 'SettingsIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        id: null,
        mobile: '',
        intro: '',
        name: '',
        photo: '',
        email: ''
      },
      dialogVisible: false,
      previewImage: '',
      cropper: null,
      udloading: false,
      udploading: false
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
      this.udploading = true
      updateUserProfile(this.user).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.udploading = false
        globalBus.$emit('update-user', this.user)
      })
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
    },
    onOpened () {
      const image = this.$refs['preview-image']
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizable: false
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    onClosed () {
    //   this.cropper.destory()
    },
    onUpdatePhoto () {
      this.udloading = true
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updateUserPhoto(fd).then(res => {
          this.dialogVisible = false
          this.user.photo = window.URL.createObjectURL(file)
          // this.user.photo = res.data.data.photo
          this.udloading = false
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          globalBus.$emit('update-user', this.user)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.perview-image-wrap {
    .perview-image {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
    }
}
</style>
