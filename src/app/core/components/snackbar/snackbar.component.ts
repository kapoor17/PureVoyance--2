import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import {NotificationType} from '../../../shared/enums/notification-type.enum';

@Component({
  selector: 'nsp-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  public imageSrc: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.getIconSrc();
  }

  public getIconSrc(): any {
    if (this.data.snackType === NotificationType.Success) {
      this.imageSrc = 'assets/icons/snackbar-success-icon.svg';
    } else {
      this.imageSrc = 'assets/icons/snackbar-error-icon.svg';

    }
  }

  public closeSnackbar(): void {
    this.data.snackBar.dismiss();
  }

}
