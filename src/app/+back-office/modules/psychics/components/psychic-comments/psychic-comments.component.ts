import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {isNil, pickBy} from 'lodash';
import {debounceTime, filter, finalize} from 'rxjs/operators';
import {FormControl} from 'ngx-strongly-typed-forms';
import {combineLatest} from 'rxjs';

import {Comment} from 'src/app/core/interfaces/comments/comment';
import {CommentsAdminApiService} from 'src/app/core/services/api/comments-admin.api.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';

const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  selector: 'nsp-psychic-comments',
  templateUrl: './psychic-comments.component.html',
  styleUrls: ['./psychic-comments.component.scss']
})
export class PsychicCommentsComponent implements OnInit {
  private psychicId: number;
  private direction: 'asc' | 'desc' = 'asc';
  private sortProperty: string;

  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public dataSource: Comment[] = [];
  public displayedColumns = [
    'date',
    'rate',
    'customer',
    'status',
    'content',
    'highlight'];

  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;
  public searchControl: FormControl<string> = new FormControl<string>('');

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinnerService: SpinnerService,
    private readonly commentsApiService: CommentsAdminApiService) {
  }

  public ngOnInit(): void {
    combineLatest([this.activatedRoute.parent.paramMap, this.activatedRoute.queryParamMap])
      .pipe(
        filter(value => value[0].has('id')),
        untilDestroyed(this))
      .subscribe(params => {
        this.psychicId = +params[0].get('id');
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
    this.commentsApiService.getPage(
      this.page,
      this.pageSize,
      null,
      this.psychicId,
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
      ['back-office', 'psychics', this.psychicId, 'comments'],
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
      case 'customer':
        return 'user_name';
      default:
        return value;
    }
  }
}
