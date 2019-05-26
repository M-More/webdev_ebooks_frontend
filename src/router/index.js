import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import UserBookList from '../components/UserBookList'
import AdminBookManage from '../components/AdminBookManage'
import AdminUserManage from '../components/AdminUserManage'
import Register from '../components/Register'
import UserCart from '../components/UserCart'
import UserOrderlist from '../components/UserOrderlist'
import UserHome from '../components/UserHome'
import AdminHome from '../components/AdminHome'
import AdminBookList from '../components/AdminBookList'
import AdminCart from '../components/AdminCart'
import AdminOrderlist from '../components/AdminOrderlist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/home',
      name: 'UserHome',
      component: UserHome
    },
    {
      path: '/admin/home',
      name: 'AdminHome',
      component: AdminHome
    },
    {
      path: '/user/booklist',
      name: 'UserBooklist',
      component: UserBookList
    },
    {
      path: '/admin/booklist',
      name: 'AdminBooklist',
      component: AdminBookList
    },
    {
      path: '/user/cart',
      name: 'UserCart',
      component: UserCart
    },
    {
      path: '/admin/cart',
      name: 'AdminCart',
      component: AdminCart
    },
    {
      path: '/admin/bookmanage',
      name: 'AdminBookmanage',
      component: AdminBookManage
    },
    {
      path: '/admin/usermanage',
      name: 'AdminUsermanage',
      component: AdminUserManage
    },
    {
      path: '/user/orderlist',
      name: 'UserOrderlist',
      component: UserOrderlist
    },
    {
      path: '/admin/orderlist',
      name: 'AdminOrderlist',
      component: AdminOrderlist
    }
  ]
})
