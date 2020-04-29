<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
            <i :class="{'el-icon-s-unfold': !isCollapse, 'el-icon-s-fold': isCollapse}" @click="isCollapse = !isCollapse"></i>
            <span>江苏省传智播客</span>
        </div>
        <el-dropdown>
          <div class="avatar-warp">
              <img :src="user.photo">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down"></i>
          </div>
          <!-- <span>
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
import globalBus from '@/utils/global-bus'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
    globalBus.$on('update-user', data => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认推出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
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

<style scoped lang="less">
.aside-menu {
  height: 100%;
}
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.aside {
  background-color: #d3dce6;
}
.header {
  border-bottom: 1px solid #ccc;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main {
  background-color: red;
}
.avatar-warp {
  display: flex;
  align-items: center;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
}
</style>
