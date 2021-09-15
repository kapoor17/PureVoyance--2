import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

import {finalize} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {pickBy} from 'lodash';

import {AppointmentSummary} from 'src/app/core/interfaces/appointments/appointment-summary';
import {ProfileApiService} from 'src/app/core/services/api/profile.api.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {NotificationService} from 'src/app/core/services/notification.service';

const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  selector: 'nsp-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('htmlTable') public htmlTable!: ElementRef;

  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;

  public displayedColumns = [
    'start',
    'end',
    'psychic',
    'media'];

  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;
  public dataSource: AppointmentSummary[] = [];

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly profileApiService: ProfileApiService,
    private readonly spinnerService: SpinnerService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        this.page = params.has('page') ? +params.get('page') : 1;
        this.pageSize = params.has('pageSize') ? +params.get('pageSize') : DEFAULT_PAGE_SIZE;
        this.loadData();
      });
  }

  private loadData(): void {
    this.spinnerService.showSpinner();
    this.profileApiService.getAppointments(this.page, this.pageSize)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(data => {
          this.dataSource = data.data;
          this.total = data.meta.total;
          this.pagesCount = data.meta.last_page;
        },
        () => this.notificationService.error('error.commonError'));
  }

  public updateUrl(): void {
    const queryParams = {
      page: this.page > 1 ? this.page : null,
      pageSize: this.pageSize === DEFAULT_PAGE_SIZE ? null : this.pageSize
    };
    const url = this.router.createUrlTree(
      ['account', 'appointments'],
      {queryParams: pickBy(queryParams)}).toString();
    this.location.go(url);
  }

  public paginatorEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.updateUrl();
    this.loadData();
  }
}
