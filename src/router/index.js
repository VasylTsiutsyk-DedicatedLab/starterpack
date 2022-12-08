import { createRouter, createWebHistory } from 'vue-router';

import { routes as homeRoutes } from '../views/home';
import { routes as aboutRoutes } from '../views/about';
import { routes as notFoundRoutes } from '../views/not-found';

const routes = [
  ...homeRoutes,
  ...aboutRoutes,
  ...notFoundRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
