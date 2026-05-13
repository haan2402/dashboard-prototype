import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import MontorView from '@/views/MontorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/montor",
    name: "montor",
    component: MontorView
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView
  } 
]
});

export default router
