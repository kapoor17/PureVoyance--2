import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {isNil, pickBy} from 'lodash';
import {debounceTime, finalize} from 'rxjs/operators';
import {FormControl} from 'ngx-strongly-typed-forms';

import {NotificationService} from 'src/app/core/services/notification.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {UserSummary} from 'src/app/core/interfaces/user/user-summary';
import {UsersApiService} from 'src/app/core/services/api/users.api.service';
import {AuthService} from '../../../core/services/api/auth.service';

const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  selector: 'nsp-users',
  templateUrl: './users-back-office.component.html',
  styleUrls: ['./users-back-office.component.scss']
})
export class UsersBackOfficeComponent implements OnInit {
  private direction: 'asc' | 'desc' = 'asc';
  private sortProperty: string;

  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public dataSource: UserSummary[] = [];
  public displayedColumns = [
    'id',
    'name',
    'lastname',
    'role',
    'totalCredits',
    'hasDiscoveryOffer',
    'verified',
    'dateOfBirth',
    'email',
    'newsletter',
    'actions',
    'edit'];

  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;
  public searchControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly usersApiService: UsersApiService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
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
    this.usersApiService.getPage(this.page, this.pageSize, this.direction, this.sortProperty, this.searchControl.value)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(data => {
          data.data.forEach(item => item.roleNames = item.roles.map(role => this.toTitleCase(role.name)));
          this.dataSource = data.data;
          this.total = data.meta.total;
          this.pagesCount = data.meta.last_page;
          this.updateUrl();
        },
        () => this.notificationService.error('error.commonError'));
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
      ['back-office', 'users'],
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
      case 'totalCredits':
        return 'total_credits';
      case 'hasDiscoveryOffer':
        return 'has_discovery_offer';
      case 'dateOfBirth':
        return 'birthday';
      default:
        return value;
    }
  }

  public paginatorEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadData();
  }

  private toTitleCase = (role: string) => role.replace(
    /\w\S*/g,
    name => name.charAt(0).toUpperCase() + name.substr(1).toLowerCase());
}
