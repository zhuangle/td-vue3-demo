import type { Response } from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  EmployeeList: '/employee/list',
  UpdateEmployee: '/employee/update',
  EmployeeInfo: '/employee',
  DelEmployee: '/employee/del',
  ResetEmployeePassword: '/employee/resetEmployeePassword',
};

export function GetEmployeeList(params: any) {
  return request.post<Response<any>>({
    url: Api.EmployeeList,
    params,
  });
}
export function UpdateEmployee(params: any) {
  return request.post<Response<any>>({
    url: Api.UpdateEmployee,
    params,
  });
}
export function GetEmployeeInfo(params: any) {
  return request.get<Response<any>>({
    url: Api.EmployeeInfo,
    params,
  });
}
export function DelEmployee(params: any) {
  return request.post<Response<any>>({
    url: Api.DelEmployee,
    params,
  });
}
export function ResetEmployeePassword(params: any) {
  return request.put<Response<any>>({
    url: Api.ResetEmployeePassword,
    params,
  });
}
