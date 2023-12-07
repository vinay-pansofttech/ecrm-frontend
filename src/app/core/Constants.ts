export enum AppSettingsConfigKey {
  FileName = 'appSettings.json',
  Path = 'assets/configs',
  APIURL = 'https://demo.engagecrmpro.com',
}

export enum AppRoutePaths {
  Default = '',
  Login = 'login',
  Empty = 'empty',
  Waiting = 'waiting',
  Error = 'error',
  UserManagement = 'user-management',
  UserList = 'user-list',
  Dashboard = 'dashboard',
  EnquiryCapture = 'enquiry-capture',
  ResetPassword = 'reset-password',
  Email = 'email',
  ForgotPassword = 'forgot-password',
  DashboardWrapper=' dashboard-wrapper'
}

export enum EcrmUserAdminRoutePath {
  Default = '',
  User = 'users/:id',
  Users = 'users',
  AddUser = 'new-user',
}
