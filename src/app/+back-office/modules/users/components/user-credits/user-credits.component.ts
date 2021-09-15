import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {Sort} from '@angular/material/sort';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {isNil, pickBy} from 'lodash';
import {debounceTime, filter, finalize} from 'rxjs/operators';
import {FormControl} from 'ngx-strongly-typed-forms';
import {combineLatest} from 'rxjs';

import {SpinnerService} from 'src/app/core/services/spinner.service';
import {Credit} from 'src/app/core/interfaces/credits/credit';
import {CreditsApiService} from 'src/app/core/services/api/credits.api.service';


const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  selector: 'nsp-user-credits',
  templateUrl: './user-credits.component.html',
  styleUrls: ['./user-credits.component.scss']
})
export class UserCreditsComponent implements OnInit {
  private userId: number;
  private direction: 'asc' | 'desc' = 'asc';
  private sortProperty: string;

  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public dataSource: Credit[] = [];
  public displayedColumns = [
    'date',
    'type',
    'payment',
    'invoice',
    'amount',
    'basicAmount',
    'bonusAmount'];

  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;
  public searchControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinnerService: SpinnerService,
    private readonly creditsApiService: CreditsApiService) {
  }

  public ngOnInit(): void {
    combineLatest([this.activatedRoute.parent.paramMap, this.activatedRoute.queryParamMap])
      .pipe(
        filter(value => value[0].has('id')),
        untilDestroyed(this))
      .subscribe(params => {
        this.userId = +params[0].get('id');
        this.page = params[1].has('page') ? +params[1].get('page') : 1;
        this.pageSize = params[1].has('pageSize') ? +params[1].get('pageSize') : DEFAULT_PAGE_SIZE;
        this.direction = params[1].has('direction') ? 'desc' : 'asc';
        this.sortProperty = params[1].has('sort') ? params[1].get('sort') : null;
        if (params[1].has('search')) {
          this.searchControl.setValue(params[1].get('search'), {emitEvent: false});
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
    this.creditsApiService.getPage(
      this.page,
      this.pageSize,
      this.userId,
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
      ['back-office', 'users', this.userId, 'credits'],
      {queryParams: pickBy(queryParams)}).toString();
    this.location.go(url);
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
      case 'bonusAmount':
        return 'bonus_amount';
      case 'basicAmount':
        return 'basic_amount';
      default:
        return value;
    }
  }
}