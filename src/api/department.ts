import type { Response } from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  GetDepartmentList: '/department',
};

export function GetDepartmentList() {
  return request.get<Response<any>>({
    url: Api.GetDepartmentList,
  });
}
