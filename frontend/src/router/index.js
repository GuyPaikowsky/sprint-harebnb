import {createRouter, createWebHistory} from 'vue-router'

import StayIndex from '@/views/StayIndex.vue'
import StayUser from "@/views/StayUser.vue"

import StayDetails from '@/components/StayDetails.vue'
import StayEdit from '@/components/StayEdit.vue'
import mapComponent from '@/components/MapComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'stay-index',
      component: StayIndex
    },
    {
      path: '/stays',
      name: 'stays',
      component: StayIndex
    },
    { path: '/stays-map',
      name: 'staysMap',
      component: mapComponent
    },
    {
      path: '/stays/:id',
      name: 'stay-details',
      component: StayDetails
    },
    {
      path: '/stays/edit/:id',
      name: 'stay-edit',
      component: StayEdit,
      props: true
    },
    {
      path: '/user',
      name: 'stay-user',
      component: StayUser
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: StayIndex
    }
  ]
})

export default router
