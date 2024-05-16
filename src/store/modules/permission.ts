import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

import { RouteItem } from '@/api/model/permissionModel';
// import { getMenuList } from '@/api/permission';
import router, { fixedRouterList, homepageRouterList } from '@/router';
import { store } from '@/store';
import { transformObjectToRoute } from '@/utils/route';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
    removeRoutes: [],
    asyncRoutes: [],
  }),
  actions: {
    async initRoutes() {
      const accessedRouters = this.asyncRoutes;

      // 在菜单展示全部路由
      this.routers = [...homepageRouterList, ...accessedRouters, ...fixedRouterList];
      // 在菜单只展示动态路由和首页
      // this.routers = [...homepageRouterList, ...accessedRouters];
      // 在菜单只展示动态路由
      // this.routers = [...accessedRouters];
    },
    async buildAsyncRoutes() {
      try {
        // 发起菜单权限请求 获取菜单列表
        const dataList = {
          list: [
            {
              path: '/list',
              name: 'list',
              component: 'LAYOUT',
              redirect: '/list/base',
              meta: {
                title: {
                  zh_CN: '列表页',
                  en_US: 'List',
                },
                icon: 'view-list',
              },
              children: [
                {
                  path: 'base',
                  name: 'ListBase',
                  component: '/list/base/index',
                  meta: {
                    title: {
                      zh_CN: '基础列表页',
                      en_US: 'Base List',
                    },
                  },
                },
                {
                  path: 'card',
                  name: 'ListCard',
                  component: '/list/card/index',
                  meta: {
                    title: {
                      zh_CN: '卡片列表页',
                      en_US: 'Card List',
                    },
                  },
                },
                {
                  path: 'filter',
                  name: 'ListFilter',
                  component: '/list/filter/index',
                  meta: {
                    title: {
                      zh_CN: '筛选列表页',
                      en_US: 'Filter List',
                    },
                  },
                },
                {
                  path: 'tree',
                  name: 'ListTree',
                  component: '/list/tree/index',
                  meta: {
                    title: {
                      zh_CN: '树状筛选列表页',
                      en_US: 'Tree List',
                    },
                  },
                },
              ],
            },
            {
              path: '/form',
              name: 'form',
              component: 'LAYOUT',
              redirect: '/form/base',
              meta: {
                title: {
                  zh_CN: '表单页',
                  en_US: 'Form',
                },
                icon: 'edit-1',
              },
              children: [
                {
                  path: 'base',
                  name: 'FormBase',
                  component: '/form/base/index',
                  meta: {
                    title: {
                      zh_CN: '基础表单页',
                      en_US: 'Base Form',
                    },
                  },
                },
                {
                  path: 'step',
                  name: 'FormStep',
                  component: '/form/step/index',
                  meta: {
                    title: {
                      zh_CN: '分步表单页',
                      en_US: 'Step Form',
                    },
                  },
                },
              ],
            },
            {
              path: '/detail',
              name: 'detail',
              component: 'LAYOUT',
              redirect: '/detail/base',
              meta: {
                title: {
                  zh_CN: '详情页',
                  en_US: 'Detail',
                },
                icon: 'layers',
              },
              children: [
                {
                  path: 'base',
                  name: 'DetailBase',
                  component: '/detail/base/index',
                  meta: {
                    title: {
                      zh_CN: '基础详情页',
                      en_US: 'Base Detail',
                    },
                  },
                },
                {
                  path: 'advanced',
                  name: 'DetailAdvanced',
                  component: '/detail/advanced/index',
                  meta: {
                    title: {
                      zh_CN: '多卡片详情页',
                      en_US: 'Card Detail',
                    },
                  },
                },
                {
                  path: 'deploy',
                  name: 'DetailDeploy',
                  component: '/detail/deploy/index',
                  meta: {
                    title: {
                      zh_CN: '数据详情页',
                      en_US: 'Data Detail',
                    },
                  },
                },
                {
                  path: 'secondary',
                  name: 'DetailSecondary',
                  component: '/detail/secondary/index',
                  meta: {
                    title: {
                      zh_CN: '二级详情页',
                      en_US: 'Secondary Detail',
                    },
                  },
                },
              ],
            },
            {
              path: '/frame',
              name: 'Frame',
              component: 'Layout',
              redirect: '/frame/doc',
              meta: {
                icon: 'internet',
                title: {
                  zh_CN: '外部页面',
                  en_US: 'External',
                },
              },
              children: [
                {
                  path: 'doc',
                  name: 'Doc',
                  component: 'IFrame',
                  meta: {
                    frameSrc: 'https://tdesign.tencent.com/starter/docs/vue-next/get-started',
                    title: {
                      zh_CN: '使用文档（内嵌）',
                      en_US: 'Documentation(IFrame)',
                    },
                  },
                },
                {
                  path: 'TDesign',
                  name: 'TDesign',
                  component: 'IFrame',
                  meta: {
                    frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
                    title: {
                      zh_CN: 'TDesign 文档（内嵌）',
                      en_US: 'TDesign (IFrame)',
                    },
                  },
                },
                {
                  path: 'TDesign2',
                  name: 'TDesign2',
                  component: 'IFrame',
                  meta: {
                    frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
                    frameBlank: true,
                    title: {
                      zh_CN: 'TDesign 文档（外链',
                      en_US: 'TDesign Doc(Link)',
                    },
                  },
                },
              ],
            },
          ],
        };
        const asyncRoutes: Array<RouteItem> = dataList.list;
        this.asyncRoutes = transformObjectToRoute(asyncRoutes);
        await this.initRoutes();
        return this.asyncRoutes;
      } catch (error) {
        throw new Error("Can't build routes");
      }
    },
    async restoreRoutes() {
      // 不需要在此额外调用initRoutes更新侧边导肮内容，在登录后asyncRoutes为空会调用
      this.asyncRoutes.forEach((item: RouteRecordRaw) => {
        if (item.name) {
          router.removeRoute(item.name);
        }
      });
      this.asyncRoutes = [];
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
