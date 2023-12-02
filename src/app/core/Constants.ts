export enum AppSettingsConfigKey {
  FileName = 'appSettings.json',
  Path = 'assets/configs',
}

export enum AppRoutePaths {
  Default = '',
  Login = 'login',
  Empty = 'empty',
  Waiting = 'waiting',
  Error = 'error',
  UserManagement = 'user-management',
  UserList = 'user-list',
}

export enum EcrmUserAdminRoutePath {
  Default = '',
  User = 'users/:id',
  Users = 'users',
  AddUser = 'new-user',
}
