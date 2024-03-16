export interface AuthSliceState {
  loggedIn: boolean;
  message?: any;
  user: {};
  accessToken: any;
  refreshToken: any;
  userRole: any;
  requestStatus: string;
  tokenLoginError?: any;
}
