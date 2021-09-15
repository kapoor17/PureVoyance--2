import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {filter, finalize} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {ConsultationDetailsComponent} from './details-modal-window/consultation-details.component';
import {NotificationService} from 'src/app/core/services/notification.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {PatientConsultation} from 'src/app/core/interfaces/consultations/patient-consultation';
import {ProfileApiService} from 'src/app/core/services/api/profile.api.service';
import {ConsultationCommentComponent} from './consultation-comment/consultation-comment.component';

const DEFAULT_PAGE_SIZE: number = 6;

@UntilDestroy()
@Component({
  selector: 'nsp-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit {
  public page = 1;
  public total: number;
  public dataSource: PatientConsultation[] = [];
  public itemsPerPage: number = DEFAULT_PAGE_SIZE;

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
    this.profileApiService.getConsultations(this.page, DEFAULT_PAGE_SIZE)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(value => {
          this.total = value.meta.total;
          this.dataSource = value.data;
        },
        () => this.notificationService.error('error.commonError'));
  }

  public paginatorEvent(page: number): void {
    this.page = page;
    this.loadData();
  }

  public showDetails(consultation: PatientConsultation): void {
    this.matDialog.open(ConsultationDetailsComponent, {
      data: {
        consultation
      }
    });
  }

  public onCommentClick(id: number): void {
    const dialogRef = this.matDialog.open(ConsultationCommentComponent);
    dialogRef.afterClosed()
      .pipe(
        filter(value => !!value),
        untilDestroyed(this))
      .subscribe(
        () => this.notificationService.success('success.commonSuccess'),
        () => this.notificationService.error('error.commonError'));
  }
}
