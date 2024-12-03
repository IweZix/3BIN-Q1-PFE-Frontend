/**
 * Import vue-router
 */
import { createRouter, createWebHistory } from 'vue-router';

/**
 * Import views
 */
import Home from '../views/HomePage.vue';
import About from '../views/AboutPage.vue';
import CreateAdmin from '../views/CreatAdminPage.vue';
import NotFound from '@/views/NotFoundPage.vue';
import Login from '../views/LoginPage.vue';

/**
 * Define routes
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/createAdmin',
    name: 'CreateAdmin',
    component: CreateAdmin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  /**
   * Define not found route
   */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

/**
 * Create router
 */
export default createRouter({
  // Add history to router
  history: createWebHistory(),
  // Give routes
  routes
});
