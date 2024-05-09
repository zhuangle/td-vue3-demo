import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/employee',
    name: 'employee',
    component: Layout,
    redirect: '/employee/list/index',
    meta: { title: { zh_CN: '员工管理', en_US: 'Employee Center' }, icon: 'user-list' },
    children: [
      {
        path: 'list/index',
        name: 'employeeList',
        component: () => import('@/pages/employee/list/index.vue'),
        meta: { title: { zh_CN: '员工管理', en_US: 'Employee Center' } },
      },
    ],
  },
];
