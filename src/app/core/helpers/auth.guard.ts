import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {intersection} from 'lodash';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {AuthService} from '../services/api/auth.service';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['403']);

      return false;
    }

    const roles = route.data.roles as string[];
    if (!roles || !roles.length) {
      return true;
    }

    return this.userService.user$
      .pipe(
        filter(value => !!value),
        map(value => {
          const canActivate = !!value && !!value.roles && !!intersection(value.roles.map(item => item.name), roles).length;
          if (!canActivate) {
            this.router.navigate(['403']);
          }

          return canActivate;
        }));
  }
}
