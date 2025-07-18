import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import IndexView from '../views/IndexView.vue'
import AppointmentView from '../views/AppointmentView.vue'
import HospitalView from '../views/HospitalView.vue'
import SetmealView from '../views/SetmealView.vue'
import SelectdateView from '../views/SelectdateView.vue'
import ConfirmorderView from '@/views/ConfirmorderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/index',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: AppointmentView,
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: HospitalView,
    },
    {
      path: '/setMeal',
      name: 'setMeal',
      component: SetmealView,
    },
    {
      path: '/selectDate',
      name: 'selectDate',
      component: SelectdateView,
    },
        {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: ConfirmorderView,
    },
  ],
})

export default router
