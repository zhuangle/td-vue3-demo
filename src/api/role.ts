import type { Response } from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  GetRoleList: '/role/list',
};

export function GetRoleList() {
  return request.get<Response<any>>({
    url: Api.GetRoleList,
  });
}
