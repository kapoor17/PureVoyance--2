import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {ConfirmationDialogDataInterface} from 'src/app/core/components/confirmation-dialog/confirmation-dialog-data';
import {ConfirmationDialogComponent} from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import {UsersApiService} from 'src/app/core/services/api/users.api.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {FreeCreditsModalComponent} from '../user-main-info/free-credits-modal/free-credits-modal.component';

interface NavigationLink {
  name: string;
  link: string;
}

@UntilDestroy()
@Component({
  selector: 'nsp-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private refreshMainInfoTriggerSubject: Subject<void> = new Subject();
  public userId: number;

  public refreshMainInfoTrigger$: Observable<void> = this.refreshMainInfoTriggerSubject.asObservable();
  public activeLink: string = 'consultations';
  public activated: boolean = true;

  public links: NavigationLink[] = [
    {
      name: 'consultation',
      link: 'consultations'
    },
    {
      name: 'appointments',
      link: 'appointments'
    },
    {
      name: 'credits',
      link: 'credits'
    },
    {
      name: 'comments',
      link: 'comments'
    },
    {
      name: 'payments',
      link: 'payments'
    },
    {
      name: 'invoices',
      link: 'invoices'
    }];

  constructor(
    private readonly spinnerService: SpinnerService,
    private readonly notificationService: NotificationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersApiService: UsersApiService,
    private readonly matDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => value.has('id')),
        untilDestroyed(this))
      .subscribe(params => this.userId = +params.get('id'));

    const childRoute = this.activatedRoute.firstChild.snapshot.url.pop();
    if (!childRoute || !childRoute.path) {
      return;
    }

    this.activeLink = childRoute.path;
  }

  public openFreeCredits(): void {
    this.matDialog.open(FreeCreditsModalComponent);
  }

  public activate(): void {
    this.toggleActivatedState(true);
  }

  public deactivate(): void {
    this.toggleActivatedState(false);
  }

  private toggleActivatedState(activated: boolean): void {
    const data: ConfirmationDialogDataInterface = {
      canCancel: true,
      noLabel: 'general.cancelLabel',
      message: activated ? 'userProfile.activateConfirmationLabel' : 'userProfile.deactivateConfirmationLabel'
    };

    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data,
      width: '500px',
      height: '320px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed()
      .pipe(
        filter(value => !!value),
        untilDestroyed(this))
      .subscribe(() => this.activated = activated);
  }
}
