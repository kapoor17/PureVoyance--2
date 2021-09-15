import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter} from 'rxjs/operators';

import {UserService} from '../../../../core/services/user.service';
import {Psychic} from '../../../../core/interfaces/psychic/psychic';
import {DuringConsultationComponent} from '../during-consultation/during-consultation.component';
import {ConsultationsApiService} from 'src/app/core/services/api/consultations.api.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {User} from '../../../../core/interfaces/user/user';

@UntilDestroy()
@Component({
  selector: 'nsp-before-consultation',
  templateUrl: './before-consultation.component.html',
  styleUrls: ['./before-consultation.component.scss']
})
export class BeforeConsultationComponent implements OnInit {
  public startPhoneCall: boolean = true;
  public phoneNumber: FormControl = new FormControl('');
  public currentUser: User;
  public status: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly consultationsApiService: ConsultationsApiService,
    public readonly dialogRef: MatDialogRef<BeforeConsultationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { psychic: Psychic }) {
  }

  public ngOnInit(): void {
    this.getStatusCall();

    this.getCurrentUser();
    this.userService.user$
      .pipe(
        filter(value => !!value),
        untilDestroyed(this))
      .subscribe(user => {
        this.phoneNumber.setValue(user.phone);
      });
  }

  public getStatusCall(): void {
    this.consultationsApiService.status$.pipe(untilDestroyed(this))
      .subscribe(status => {
          if (status === 'ONGOING' || status === 'NEED_RECHARGE') {
            this.dialog.closeAll();
            this.dialog.open(DuringConsultationComponent, {
              data: {
                psychic: this.data.psychic,
              },
              panelClass: 'custom-dialog',
              width: '500px'
            });
          } else if (status === 'FAIL') {
          }
        },
        () => this.notificationService.error('error.commonError'));
  }

  private getCurrentUser(): void {
    this.userService.user$.pipe(untilDestroyed(this)).subscribe(user => {
      this.currentUser = user;
    });
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public startCall(): void {
    this.startPhoneCall = !this.startPhoneCall;
    this.consultationsApiService.call(this.data.psychic.id, this.phoneNumber.value)
      .pipe(untilDestroyed(this)).subscribe();
  }
}
