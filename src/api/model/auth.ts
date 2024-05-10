export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}
export interface UserInfo {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
  permissions: string[];
  dept: string;
  deptId: number;
  email: string;
}
