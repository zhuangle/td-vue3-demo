import type { Response } from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  EmployeeList: '/employee/list',
  UpdateEmployee: '/employee/update',
  EmployeeInfo: '/employee',
  DelEmployee: '/employee/del',
};

export function GetEmployeeList(params: any) {
  return request.post<Response<any>>({
    url: Api.EmployeeList,
    params,
  });
}
export function UpdateEmployee(params: any) {
  return request.post<any>({
    url: Api.UpdateEmployee,
    params,
  });
}
export function GetEmployeeInfo(params: any) {
  return request.get<ListResult>({
    url: Api.EmployeeInfo,
    params,
  });
}
export function DelEmployee(params: any) {
  return request.post<ListResult>({
    url: Api.DelEmployee,
    params,
  });
}
