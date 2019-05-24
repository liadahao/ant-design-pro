export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {path: '/user', redirect: '/user/login'},
      {path: '/user/login', name: 'login', component: './User/Login'},
      {path: '/user/register', name: 'register', component: './User/Register'},
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      {path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user']},
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // 产品管理
      {path: '/product', redirect: '/product/spu'},
      {
        path: '/product',
        name: 'product',
        icon: 'table',
        routes: [
          {
            path: '/product/spu',
            name: 'spu',
            component: './Product/TableList',
          },
          {
            path: '/product/profile/:vendorId/:productVendorId',
            hideInMenu: true,
            component: './Product/ProductProfile',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
