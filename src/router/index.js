import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import BookList from '../components/BookList'
import BookManage from '../components/BookManage'
import UserManage from '../components/UserManage'
import Register from '../components/Register'
import Cart from '../components/Cart'
import Orderlist from '../components/Orderlist'
import UserHome from '../components/UserHome'

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
      path: '/booklist',
      name: 'Booklist',
      component: BookList
    },
    {
      path: '/bookmanage',
      name: 'Bookmanage',
      component: BookManage
    },
    {
      path: '/usermanage',
      name: 'Usermanage',
      component: UserManage
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/orderlist',
      name: 'Orderlist',
      component: Orderlist
    },
    {
      path: '/user/home',
      name: 'UserHome',
      component: UserHome
    }
  ]
})
