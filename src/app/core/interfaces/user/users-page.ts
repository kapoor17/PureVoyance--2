import {Page} from '../page';
import {Role} from './role';
import {UserSummary} from './user-summary';

export interface UsersPage extends Page<UserSummary> {
  filters: {
    roles: Role[];
  };
}