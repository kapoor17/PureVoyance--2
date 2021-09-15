import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserResponse} from '../interfaces/user/user-response';
import {User} from '../interfaces/user/user';
import {Role} from '../constants/roles.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user$: Observable<User> = this.userSubject.asObservable();

  public showDiscoverOffer$: Observable<boolean> = this.userSubject.pipe(map(item => !item || !item.has_discovery_offer));
  public hasDiscoverOffer$: Observable<boolean> = this.userSubject.pipe(map(item => !item || item.has_discovery_offer));

  public isAdmin: boolean;

  public onUserLoaded(response: UserResponse): void {
    this.userSubject.next(response.data);
    this.isAdmin = !!response.data && !!response.data.roles?.length && response.data.roles.some(item => item.name === Role.Admin);
  }

  public reset(): void {
    this.userSubject.next(null);
    this.isAdmin = false;
  }
}
