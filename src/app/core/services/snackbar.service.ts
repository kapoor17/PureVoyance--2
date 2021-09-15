import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {NotificationType} from '../../shared/enums/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) {
  }

  public openSnackBar(type: NotificationType, message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      verticalPosition: 'top',
      data: {message: message, snackType: type, snackBar: this.snackBar}
    });
  }
}
