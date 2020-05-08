import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/')
const Home = () => import('@/views/home/')
const Layout = () => import('@/views/layout/')
const Article = () => import('@/views/article/')
const Publish = () => import('@/views/publish/')
const Image = () => import('@/views/image/')
const Comment = () => import('@/views/comment')
const Settings = () => import('@/views/settings')
const Fans = () => import('@/views/fans')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fans
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const user = window.localStorage.getItem('user')
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
