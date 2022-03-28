import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'), //路由懒加载
  },
  {
    path: '/',
    // name: 'layout',  //  不省略会有警告
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', //空表示默认路由
        name: 'home',
        component: () => import('@/views/layout/home'),
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/layout/qa'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/layout/video'),
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/layout/my'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
