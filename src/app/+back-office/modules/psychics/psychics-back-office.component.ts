import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {isNil, pickBy} from 'lodash';
import {debounceTime, finalize} from 'rxjs/operators';
import {FormControl} from 'ngx-strongly-typed-forms';

import {PsychicSummary} from 'src/app/core/interfaces/psychic/psychic-summary';
import {NotificationService} from 'src/app/core/services/notification.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {PsychicAdminApiService} from '../../../core/services/api/psychics-admin.api.service';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  selector: 'nsp-psychics',
  templateUrl: './psychics-back-office.component.html',
  styleUrls: ['./psychics-back-office.component.scss']
})
export class PsychicsBackOfficeComponent implements OnInit {
  private direction: 'asc' | 'desc' = 'asc';
  private sortProperty: string;
  private refreshMainInfoTriggerSubject: Subject<void> = new Subject();

  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public dataSource: PsychicSummary[] = [];
  public displayedColumns = [
    'image',
    'name',
    'skills',
    'description',
    'market',
    'isOnline',
    'price',
    'rate',
    'minCallTime',
    'actions',
    'edit'];
  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;
  public searchControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly psychicApiService: PsychicAdminApiService,
    private readonly notificationService: NotificationService,
    private readonly spinnerService: SpinnerService,
    private readonly matDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        this.page = params.has('page') ? +params.get('page') : 1;
        this.pageSize = params.has('pageSize') ? +params.get('pageSize') : DEFAULT_PAGE_SIZE;
        this.direction = params.has('direction') ? 'desc' : 'asc';
        this.sortProperty = params.has('sort') ? params.get('sort') : null;
        if (params.has('search')) {
          this.searchControl.setValue(params.get('search'), {emitEvent: false});
        }

        this.loadData();
      });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        untilDestroyed(this))
      .subscribe(() => this.loadData());
  }

  private loadData(): void {
    this.spinnerService.showSpinner();
    this.psychicApiService.getPage(
      this.page,
      this.pageSize,
      this.direction,
      this.sortProperty,
      this.searchControl.value)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(data => {
          this.dataSource = data.data;
          this.total = data.meta.total;
          this.pagesCount = data.meta.last_page;
          this.updateUrl();
        },
        () => this.notificationService.error('error.commonError'));
  }

  public paginatorEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadData();
  }

  public sortingEvent(event: Sort): void {
    this.direction = event.direction === 'asc' ? 'asc' : 'desc';
    this.sortProperty = this.parseSortByCriteria(event.active);
    this.loadData();
  }

  private parseSortByCriteria(value: string): string {
    switch (value) {
      case 'isOnline':
        return 'online_status';
      case 'minCallTime':
        return 'min_call_time';
      default:
        return value;
    }
  }

  public updateUrl(): void {
    const queryParams = {
      page: this.page > 1 ? this.page : null,
      pageSize: this.pageSize === DEFAULT_PAGE_SIZE ? null : this.pageSize,
      direction: this.direction === 'asc' ? null : 'desc',
      sort: this.sortProperty,
      search: isNil(this.searchControl.value) ? null : this.searchControl.value
    };

    const url = this.router.createUrlTree(
      ['back-office', 'psychics'],
      {queryParams: pickBy(queryParams)}).toString();
    this.location.go(url);
  }
}
