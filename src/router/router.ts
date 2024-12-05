/**
 * Import vue-router
 */
import { createRouter, createWebHistory } from 'vue-router';

/**
 * Import views
 */
import NotFound from '@/views/NotFoundPage.vue';
import Login from '../views/LoginPage.vue';
import ChangePassword from '@/views/ChangePasswordPage.vue';

// ADMIN ROUTES
import AdminHome from '@/views/AdminHomePage.vue';
import AdminCreateCredentials from '@/views/AdminCreateCredentials.vue';
import AdminCreateCompany from '../views/AdminCreateCompany.vue';
import CreateAdmin from '../views/CreateAdminPage.vue';
// COMPANY ROUTES
import CompanyHome from '../views/CompanyHomePage.vue';
//import path from 'path';

/**
 * Define routes
 */
const routes = [
  /* routes for admin */
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/createCredentials',
    name: 'CreateCredentials',
    component: AdminCreateCredentials
  },
  {
    path: '/createAdmin',
    name: 'CreateAdmin',
    component: CreateAdmin
  },
  {
    path: '/createCompany',
    name: 'CreateCompany',
    component: AdminCreateCompany
  },
  /* routes for company */
  {
    path: '/company',
    name: 'CompanyHome',
    component: CompanyHome
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
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
