/*
 * @Description:
 * @version:
 * @Author: whimzhu
 * @Date: 2020-12-05 13:15:19
 * @LastEditors: whimzhu
 * @LastEditTime: 2020-12-05 14:28:09
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    children: [
      {
        path: '/project',
        name: 'project',
        component: () => import('@/views/project/index'),
        meta: { title: '应用管理', icon: 'project' }
      },
      {
        path: '/pageDetail',
        name: 'pageDetail',
        component: () => import('@/views/project/pageDetail'),
        meta: { title: '页面插件详情' },
        hidden: true
      },
      {
        path: '/projectPlugin',
        name: '',
        component: () => import('@/views/project/projectPlugin'),
        meta: { title: '应用管理-已使用插件' },
        hidden: true
      }
    ]
  },
  {
    path: '/pluginDetail',
    name: 'plugin',
    component: () => import('@/views/plugin/pluginDetail'),
    hidden: true
  },
  {
    path: '/terminal',
    component: Layout,
    children: [
      {
        path: '/terminal',
        name: 'terminal',
        component: () => import('@/views/terminal/index'),
        meta: { title: '终端管理', icon: 'terminal' }
      }
    ]
  },
  {
    path: '/packetManage',
    component: Layout,
    children: [
      {
        path: '/packetManage',
        name: 'packetManage',
        component: () => import('@/views/packetManage/index'),
        meta: { title: '数据管理', icon: 'shujubao' }
      }
    ]
  },
  {
    path: '/dataManage',
    component: Layout,
    children: [
      {
        path: '/dataManage',
        name: 'dataManage',
        component: () => import('@/views/dataManage/index'),
        meta: { title: '插件管理', icon: 'shuju' }
      }
    ]
  },
  {
    path: '/plugin',
    component: Layout,
    children: [
      {
        path: '/plugin',
        name: 'plugin',
        component: () => import('@/views/plugin/index'),
        meta: { title: '插件管理2', icon: 'shuju' }
      }
    ]
  },
  {
    path: '/dataDetail',
    component: Layout,
    children: [
      {
        path: '/dataDetail',
        name: 'dataDetail',
        component: () => import('@/views/dataManage/dataDetail'),
        meta: { title: '数据详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/dataAnalysis',
    component: Layout,
    children: [
      {
        path: '/dataAnalysis',
        name: 'dataAnalysis',
        component: () => import('@/views/dataAnalysis/index'),
        meta: { title: '数据分析', icon: 'shujufenxi' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/login', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
