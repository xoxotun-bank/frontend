export interface UserCredentials {
  login: string;
  password: string;
}

export interface AccessToken {
  user_id: number;
  roles: UserRole[];
}

export interface UserData {
  userId: number;
  userRoles: UserRole[];
}

export enum UserRole {
  ADMIN = 'administrator',
  OPERATOR = 'operator'
}
