import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/home/HomePage.vue'
import CommunityPage from '@/views/community/CommunityPage.vue'
import HelpPage from '@/views/help/HelpPage.vue'
import ProductPage from '@/views/products/ProductPage.vue'
import MsgPage from '@/views/message/MsgPage.vue'
import UserPage from '@/views/user/UserPage.vue'
import AdminPage from '@/views/admin/AdminPage.vue'
import BlogPage from '@/views/blog/BlogPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/HomePage',
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/Community',
      name: 'Community',
      component: CommunityPage,
    },
    {
      path: '/Help',
      name: 'Help',
      component: HelpPage,
    },
    {
      path: '/Product',
      name: 'Product',
      component: ProductPage,
    },
    {
      path: '/Msg',
      name: 'Msg',
      component: MsgPage,
    },
    {
      path: '/User',
      name: 'User',
      component: UserPage,
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: AdminPage,
    },
    {
      path: '/BlogPage',
      name: 'BlogPage',
      component: BlogPage,
    },
  ],
})

export default router
