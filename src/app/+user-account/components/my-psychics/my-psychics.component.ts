import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter, finalize, switchMap} from 'rxjs/operators';
import {ConfirmationDialogDataInterface} from 'src/app/core/components/confirmation-dialog/confirmation-dialog-data';
import {ConfirmationDialogComponent} from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

import {FavoritePsychic} from 'src/app/core/interfaces/psychic/favorite-psychic';
import {ProfileApiService} from 'src/app/core/services/api/profile.api.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';

const DEFAULT_PAGE_SIZE: number = 6;

@UntilDestroy()
@Component({
  selector: 'nsp-user-favorite-psychics',
  templateUrl: './my-psychics.component.html',
  styleUrls: ['./my-psychics.component.scss']
})
export class MyPsychicsComponent implements OnInit {
  public dataSource: FavoritePsychic[] = [];
  public total: number;
  public page: number = 0;
  public pageSize: number = DEFAULT_PAGE_SIZE;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly spinnerService: SpinnerService,
    private readonly notificationService: NotificationService,
    private readonly profileApiService: ProfileApiService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.spinnerService.showSpinner();
    this.profileApiService.getPsychics(this.page, this.pageSize)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(value => {
          this.dataSource = value.data;
          this.total = value.meta.total;
        },
        () => this.notificationService.error('error.commonError'));
  }

  public paginatorEvent(page: number): void {
    this.page = page;
    this.loadData();
  }

  public unlike(id: number): void {
    const data: ConfirmationDialogDataInterface = {
      canCancel: true,
      noLabel: 'general.cancelLabel',
      message: 'mySeers.unlikeConfirmationLabel'
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
        switchMap(() => this.profileApiService.removePsychic(id)),
        untilDestroyed(this))
      .subscribe(() => {
          this.dataSource = this.dataSource.filter(item => item.id !== id);
          this.total = this.total - 1;
          this.notificationService.success('success.commonSuccess');
        },
        () => this.notificationService.error('error.commonError'));
  }

  public trackFn = (index: number, item: FavoritePsychic) => item.id;
}
