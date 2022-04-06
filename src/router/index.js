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
        component: () => import('@/views/home'),
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, //开启props传参，将动态路由参数映射到组件的props中
  },
]

const router = new VueRouter({
  routes,
})

export default router
