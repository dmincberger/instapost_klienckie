import { createRouter, createWebHistory } from 'vue-router'

//static load
//@ oznacza katalog /src

import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ConfirmView from '@/views/ConfirmView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LogoutView from '@/views/LogoutView.vue'
import EditView from '@/views/EditView.vue'
import UserView from '@/views/UserView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
//lazy load - renderuje się tylko gdy jest potrzebny a nie z góry

const NotFoundView = () => import("@/views/NotFoundView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/confirm',
      name: 'confirm',
      component: ConfirmView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundView',
      component: NotFoundView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditView
    },
    {
      path: '/user/:email',
      name: 'user',
      component: UserView
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfileView
    }
  ]
})

export default router