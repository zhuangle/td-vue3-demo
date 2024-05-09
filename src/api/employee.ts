import type { ListResult } from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  EmployeeList: '/employee',
};

export function getEmployeeList() {
  return request.get<ListResult>({
    url: Api.EmployeeList,
  });
}
