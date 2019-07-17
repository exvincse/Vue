import Vue from 'vue'
import VueRouter from 'vue-router'
//  components
import indexMode from '@/components/indexMode'
import index from '@/components/custom/index'
import login from '@/components/login'
import dashboard from '@/components/admin/dashboard'
import products from '@/components/admin/Products/products'
import cart from '@/components/custom/cart'
import coupons from '@/components/admin/Coupons/coupons'
import orderlist from '@/components/admin/orderlist'
import checkout from '@/components/custom/checkout'
import cproducts from '@/components/custom/products'
import MoreProducts from '@/components/custom/MoreProduct'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },

    {
      name: '登入',
      path: '/login',
      component: login
    },

    {
      name: '後台',
      path: '/admin',
      component: dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          component: products,
          meta: { requiresAuth: true }
        },
        {
          path: 'orderlist',
          component: orderlist,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          component: coupons,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/index',
      component: indexMode,
      children: [
        {
          path: '',
          component: index
        },
        {
          path: '/products',
          component: cproducts
        }
      ]
    },
    {
      path: '/products/:id',
      component: MoreProducts
    },
    {
      path: '/cart',
      component: cart
    },
    {
      path: '/checkout/:id',
      component: checkout
    }
  ]
})
