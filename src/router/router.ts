/**
 * Import vue-router
 */
import { createRouter, createWebHistory } from 'vue-router';
import { adminVerif } from '@/services/authAdminService';

/**
 * Import views
 */
import NotFound from '@/views/NotFoundPage.vue';
import Login from '@/views/LoginPage.vue';
import ChangePassword from '@/views/ChangePasswordPage.vue';

// ADMIN ROUTES
import AdminHome from '@/views/AdminHomePage.vue';
import AdminCreateCredentials from '@/views/AdminCreateCredentials.vue';
import AdminCreateCompany from '@/views/AdminCreateCompany.vue';
import CreateAdmin from '@/views/CreateAdminPage.vue';
import ManageAll from '@/views/manageAll/AdminManageAll.vue';
import TemplateEdit from '@/views/manageAll/AdminTemplateEdit.vue';
import TemplateAdd from '@/views/manageAll/AdminTemplateAdd.vue';
import GroupIssueEdit from '@/views/manageAll/AdminGroupIssueEdit.vue';
import GroupIssueAdd from '@/views/manageAll/AdminGroupIssueAdd.vue';
import DetailsScoringCompany from '@/views/scoring/DetailsScoringCompany.vue';
import AdminValidatedForm from '@/views/AdminValidatedFormPage.vue';
import IssuesByGroup from '@/views/manageAll/AdminIssuesByGroup.vue';
import IssueAdd from '@/views/manageAll/AdminIssueAdd.vue';
import IssueEdit from '@/views/manageAll/AdminIssueEdit.vue';
/* routes for company */
import CompanyHome from '@/views/CompanyHomePage.vue';
import ModuleESG from '@/views/ModuleESGPage.vue';
import path from 'path';
//import path from 'path';

/**
 * Define routes
 */
const routes = [
  /* route to redirect / to /login */
  {
    path: '/',
    redirect: '/login'
  },
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
    path: '/admin/template/:templateName',
    name: 'TemplateEdit',
    component: TemplateEdit
  },
  {
    path: '/admin/add-template',
    name: 'TemplateAdd',
    component: TemplateAdd
  },
  {
    path: '/admin/group-issue/:groupIssueName',
    name: 'GroupIssueEdit',
    component: GroupIssueEdit
  },
  {
    path: '/admin/add-group-issue',
    name: 'GroupIssueAdd',
    component: GroupIssueAdd
  },
  {
    path: '/admin/issuesByGroup/:groupIssueName',
    name: 'IssuesByGroup',
    component: IssuesByGroup
  },
  {
    path: '/admin/add-issue/:groupIssueName',
    name: 'IssueAdd',
    component: IssueAdd
  },
  {
    path: '/admin/edit-issue/:issueName',
    name: 'IssueEdit',
    component: IssueEdit
  },
  {
    path: '/scoringCompany/:email',
    name: 'scoringCompany',
    component: DetailsScoringCompany
  },
  {
    path: '/answerFormUser/:email',
    name: 'answerFormUser',
    component: AdminValidatedForm,
    props: true
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
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  if (
    to.path.startsWith('/admin') ||
    to.path.startsWith('/createCredentials') ||
    to.path.startsWith('/createCompany') ||
    to.path.startsWith('/createAdmin') ||
    to.path.startsWith('/manageAll') 
  ) {
    if (token) {
      const isAdmin = await adminVerif(token);
      if (isAdmin) {
        next();
      } else {
        next({ name: 'NotFound' });
      }
    } else {
      next({ name: 'NotFound' });
    }
  } else {
    if (token == null && to.path != '/login') {
      next({ name: 'Login' });
    } else next();
  }
});

export default router;
