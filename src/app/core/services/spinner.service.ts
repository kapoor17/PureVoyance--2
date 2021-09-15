import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerStateSubject$: Subject<boolean> = new Subject<boolean>();

  public showSpinner(): void {
    this.spinnerStateSubject$.next(true);
  }

  public hideSpinner(): void {
    this.spinnerStateSubject$.next(false);
  }

  public getSpinnerStateSubject(): Observable<boolean> {
    return this.spinnerStateSubject$.asObservable();
  }
}
