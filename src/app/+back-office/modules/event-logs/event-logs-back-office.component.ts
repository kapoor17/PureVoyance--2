import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {finalize} from 'rxjs/operators';
import {pickBy} from 'lodash';

import {EventLog} from 'src/app/core/interfaces/events/event-log';
import {EventsApiService} from 'src/app/core/services/api/events.api.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {MatDialog} from '@angular/material/dialog';
import {EventsDiffComponent} from './components/events-diff/events-diff.component';


const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  templateUrl: './event-logs-back-office.component.html',
  styleUrls: ['./event-logs-back-office.component.scss']
})
export class EventLogsBackOfficeComponent implements OnInit {
  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public dataSource: EventLog[] = [];
  public displayedColumns = [
    'message',
    'date',
    'subjectType',
    'causerType',
    'showDiff'];

  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventsApiService: EventsApiService,
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
    this.eventsApiService.getPage(
      this.page,
      this.pageSize)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(data => {
        data.data.forEach(item => {
          item.subject_type = item.subject_type.replace('App\\Models\\', '');
          item.causer_type = item.subject_type.replace('App\\Models\\', '');
          item.causerLink = `${item.causer_type.toLowerCase()}s`;
        });
        this.dataSource = data.data;
        this.total = data.meta.total;
        this.pagesCount = data.meta.last_page;
      });
  }

  public updateUrl(): void {
    const queryParams = {
      page: this.page > 1 ? this.page : null,
      pageSize: this.pageSize === DEFAULT_PAGE_SIZE ? null : this.pageSize
    };

    const url = this.router.createUrlTree(
      ['back-office', 'events'],
      {queryParams: pickBy(queryParams)}).toString();

    this.location.go(url);
  }

  public paginatorEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.updateUrl();
    this.loadData();
  }

  public showDiff(log: EventLog): void {
    this.matDialog.open(EventsDiffComponent, {
      data: {
        log
      },
      panelClass: 'custom-dialog'
    });
  }
}
