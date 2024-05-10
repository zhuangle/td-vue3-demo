import type { LoginResult } from '@/api/model/auth';
import { request } from '@/utils/request';

const Api = {
  Register: '/auth/login',
};

export function Login() {
  return request.post<LoginResult>({
    url: Api.Register,
  });
}
