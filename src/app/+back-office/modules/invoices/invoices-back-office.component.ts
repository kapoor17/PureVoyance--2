import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {isNil, pickBy} from 'lodash';
import {debounceTime, finalize} from 'rxjs/operators';
import {FormControl} from 'ngx-strongly-typed-forms';

import {SpinnerService} from 'src/app/core/services/spinner.service';
import {InvoiceSummary} from 'src/app/core/interfaces/invoices/invoice-summary';
import {InvoicesApiService} from 'src/app/core/services/api/invoices.api.service';

const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  templateUrl: './invoices-back-office.component.html',
  styleUrls: ['./invoices-back-office.component.scss']
})
export class InvoicesBackOfficeComponent implements OnInit {
  private direction: 'asc' | 'desc' = 'asc';
  private sortProperty: string;

  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public dataSource: InvoiceSummary[] = [];
  public displayedColumns = [
    'date',
    'customer',
    'psychic',
    'duration',
    'cost'];

  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;
  public searchControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly invoicesApiService: InvoicesApiService,
    private readonly spinnerService: SpinnerService) {
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
    this.invoicesApiService.getPage(
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
      ['back-office', 'invoices'],
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
        return 'customer_name';
      case 'psychic':
        return 'psychic_name';
      default:
        return value;
    }
  }

  public paginatorEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.updateUrl();
    this.loadData();
  }
}
