import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      isLogin: true // 该路由需要登录权限
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/Error/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // 判断是否匹配到路由
  if (to.matched.length > 0) {
    // 判断是否需要登录权限
    if (to.meta.isLogin) {
      const token = useStorage.get('token');
      // 判断是否登录
      if (token) {
        next();
      } else {
        next('/login');
      }
    } else {
      next();
    }
  } else {
    next('/error');
  }
});

export default router;
