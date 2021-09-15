import {Role} from './role';
import {User} from './user';

export interface UserResponse {
  data: User;
  form: {
    roles: Role[]
  };
}