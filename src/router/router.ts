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
import ManageAll from '@/views/manageAll/AdminManageAll.vue';
import TemplateEdit from '../views/manageAll/AdminTemplateEdit.vue';
import TemplateAdd from '../views/manageAll/AdminTemplateAdd.vue';
import GroupIssueEdit from '../views/manageAll/AdminGroupIssueEdit.vue';
import GroupIssueAdd from '../views/manageAll/AdminGroupIssueAdd.vue';

/* routes for company */
import CompanyHome from '../views/CompanyHomePage.vue';
import ModuleESG from '../views/ModuleESGPage.vue';
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
  {
    path: '/manageAll',
    name: 'ManageAll',
    component: ManageAll
  },
  {
    path: '/admin/template/:id',
    name: 'TemplateEdit',
    component: TemplateEdit
  },
  {
    path: '/admin/add-template',
    name: 'TemplateAdd',
    component: TemplateAdd
  },
  {
    path: '/admin/group-issue/:id',
    name: 'GroupIssueEdit',
    component: GroupIssueEdit
  },
  {
    path: '/admin/add-group-issue',
    name: 'GroupIssueAdd',
    component: GroupIssueAdd
  },
  /* routes for company */
  {
    path: '/company',
    name: 'CompanyHome',
    component: CompanyHome
  },
  {
    path: '/moduleESG',
    name: 'ModuleESG',
    component: ModuleESG

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
