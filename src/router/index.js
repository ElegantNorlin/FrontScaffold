import { createRouter, createWebHistory} from 'vue-router'

const router = createRouter({  
    history: createWebHistory(),  
    routes: [
        {
          path: '/',
          name: 'login',
          component: () => import('../views/login.vue'),
        }, {
          path: '/index',
          name: 'index',
          component: () => import('../views/index.vue')
        }
      ]
})

export default router