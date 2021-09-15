import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatDialog} from '@angular/material/dialog';

import {indexOf, sortBy} from 'lodash';
import {filter, finalize, switchMap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {Package} from 'src/app/core/interfaces/packages/package';
import {PackagesAdminApiService} from 'src/app/core/services/api/packages-admin.api.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {EditPackageComponent} from '../edit-package/edit-package.component';
import {ConfirmationDialogComponent} from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogDataInterface} from 'src/app/core/components/confirmation-dialog/confirmation-dialog-data';


@UntilDestroy()
@Component({
  selector: 'nsp-packages-settings',
  templateUrl: './packages-settings.component.html',
  styleUrls: ['./packages-settings.component.scss']
})
export class PackagesSettingsComponent implements OnInit {
  public dataSource: Package[] = [];

  constructor(
    private readonly spinnerService: SpinnerService,
    private readonly matDialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly packagesAdminApiService: PackagesAdminApiService) {
  }

  public ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.packagesAdminApiService.get()
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(
        value => this.dataSource = sortBy(value.data, item => item.order),
        () => this.notificationService.error('error.commonError'));
  }

  public drop($event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataSource, $event.previousIndex, $event.currentIndex);
    this.packagesAdminApiService.updateOrder(this.dataSource.map((item, index) => ({id: item.id, order: index})))
      .pipe(untilDestroyed(this))
      .subscribe(() => this.notificationService.success('settings.package.reorderSuccess'));
  }

  public activityToggled($event: MatSlideToggleChange, pack: Package): void {
    pack.active = $event.checked;
    this.packagesAdminApiService.update(pack.id, pack)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => this.notificationService.success(
          $event.checked
            ? 'settings.package.activateSuccess'
            : 'settings.package.deactivateSuccess'),
        () => this.notificationService.error('error.commonError'));
  }

  public edit(pack: Package): void {
    const dialogRef = this.matDialog.open(EditPackageComponent, {
      data: {
        package: pack,
        allPackages: this.dataSource
      },
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed()
      .pipe(
        filter(value => !!value),
        switchMap(pack => this.packagesAdminApiService.update(pack.id, pack)),
        untilDestroyed(this))
      .subscribe(result => {
        const target = this.dataSource.find(item => item.id === result.data.id);
        const index = indexOf(this.dataSource, target);
        this.dataSource.splice(index, 1, result.data);
        this.notificationService.success('settings.package.updateSuccess');
      }, () => this.notificationService.error('error.commonError'));
  }

  public createPackage(): void {
    const dialogRef = this.matDialog.open(EditPackageComponent, {
      panelClass: 'custom-dialog',
      data: {
        allPackages: this.dataSource
      },
    });

    dialogRef.afterClosed()
      .pipe(
        filter(value => !!value),
        switchMap(pack => this.packagesAdminApiService.create(pack)),
        untilDestroyed(this))
      .subscribe(pack => {
        this.dataSource.push(pack.data);
        this.notificationService.success('settings.package.createSuccess');
      }, () => this.notificationService.error('error.commonError'));
  }

  public deletePackage(id: number): void {
    const data: ConfirmationDialogDataInterface = {
      canCancel: true,
      noLabel: 'general.cancelLabel',
      message: 'settings.package.deleteConfirmationLabel'
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
        switchMap(() => this.packagesAdminApiService.delete(id)),
        untilDestroyed(this))
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(item => item.id !== id);
        this.notificationService.success('settings.package.deleteSuccess');
      }, () => () => this.notificationService.error('error.commonError'));
  }
}
