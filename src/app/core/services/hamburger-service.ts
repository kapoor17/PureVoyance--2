import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HamburgerService {
  private readonly openedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public opened$: Observable<boolean> = this.openedSubject.asObservable();

  private status: boolean = false;
  public accountMenu: boolean;

  public toggle(): void {
    this.status = !this.status;
    this.openedSubject.next(this.status);
  }
}
