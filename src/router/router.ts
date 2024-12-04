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

// ADMIN ROUTES
import AdminHome from '../views/AdminHomePage.vue';

// COMPANY ROUTES
import CompanyHome from '../views/CompanyHomePage.vue';

import ChangePassword from '@/views/ChangePasswordPage.vue';
//import path from 'path';

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
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/company',
    name: 'CompanyHome',
    component: CompanyHome
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
   * Define change password route
   */
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: ChangePassword

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
