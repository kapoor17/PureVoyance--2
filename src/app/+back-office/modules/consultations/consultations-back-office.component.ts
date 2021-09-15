import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormControl} from 'ngx-strongly-typed-forms';
import {debounceTime, finalize} from 'rxjs/operators';
import {isNil, pickBy} from 'lodash';

import {ConsultationSummary} from 'src/app/core/interfaces/consultations/consultation-summary';
import {ConsultationsAdminApiService} from 'src/app/core/services/api/consultations-admin.api.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';


const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  templateUrl: './consultations-back-office.component.html',
  styleUrls: ['./consultations-back-office.component.scss']
})
export class ConsultationsBackOfficeComponent implements OnInit {
  private direction: 'asc' | 'desc' = 'asc';
  private sortProperty: string;

  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public dataSource: ConsultationSummary[] = [];
  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;

  public searchControl: FormControl<string> = new FormControl<string>('');
  public displayedColumns = [
    'start',
    'end',
    'invoice',
    'customer',
    'psychic',
    'duration',
    'price',
    'media',
    'telcoEndStatus'];

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinnerService: SpinnerService,
    private readonly consultationsAdminApiService: ConsultationsAdminApiService) {
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
    this.consultationsAdminApiService.getPage(
      this.page,
      this.pageSize,
      null,
      null,
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
      });
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
      ['back-office', 'consultations'],
      {queryParams: pickBy(queryParams)}).toString();

    this.location.go(url);
  }

  public sortingEvent(event: Sort): void {
    this.direction = event.direction === 'asc' ? 'asc' : 'desc';
    this.sortProperty = this.parseSortByCriteria(event.active);
    this.loadData();
  }

  private parseSortByCriteria(value: string): string {
    switch (value) {
      case 'customer':
        return 'user_name';
      case 'psychic':
        return 'psychic_name';
      case 'telcoEndStatus':
        return 'telco_end_status';
      default:
        return value;
    }
  }

  public paginatorEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadData();
  }
}
