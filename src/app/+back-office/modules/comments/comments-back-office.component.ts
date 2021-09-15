import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import {isNil, pickBy} from 'lodash';
import {debounceTime, finalize} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {Comment} from 'src/app/core/interfaces/comments/comment';
import {CommentsAdminApiService} from 'src/app/core/services/api/comments-admin.api.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {Sort} from '@angular/material/sort';
import {FormControl} from 'ngx-strongly-typed-forms';
import {UpdateComment} from '../../../core/interfaces/comments/update-comment';
import {NotificationService} from '../../../core/services/notification.service';
import {CommentStatusEnum} from '../../../core/interfaces/comments/comment-status.enum';
import {EnumValues} from 'enum-values';

const DEFAULT_PAGE_SIZE: number = 10;

@UntilDestroy()
@Component({
  templateUrl: './comments-back-office.component.html',
  styleUrls: ['./comments-back-office.component.scss']
})
export class CommentsBackOfficeComponent implements OnInit {
  private direction: 'asc' | 'desc' = 'asc';
  private sortProperty: string;

  public page: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public dataSource: Comment[] = [];
  public displayedColumns = [
    'date',
    'rate',
    'customer',
    'psychic',
    'status',
    'content',
    'highlight'];

  public paginatorPageSizeOptions: any[] = [10, 20, 50];
  public total: number = 0;
  public pagesCount: number = 0;
  public searchControl: FormControl<string> = new FormControl<string>('');
  public commentStatuses: typeof CommentStatusEnum = CommentStatusEnum;
  public commentStatusOptions = EnumValues.getNamesAndValues(CommentStatusEnum)
    .map(item => ({
      value: item.value as CommentStatusEnum,
      name: 'comments.statuses.' + item.value
    }));

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinnerService: SpinnerService,
    private readonly notificationService: NotificationService,
    private readonly commentsApiService: CommentsAdminApiService) {
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
    this.commentsApiService.getPage(
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
      ['back-office', 'comments'],
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

  public highLightChanged(comment: Comment): void {
    comment.high_light = !comment.high_light;
    this.updateComment(comment);
  }

  public statusChanged(comment: Comment): void {
    this.updateComment(comment);
  }

  private updateComment(comment: Comment): void {
    const request: UpdateComment = {
      id: comment.id,
      consultation_id: comment.consultation_id,
      content: comment.content,
      high_light: comment.high_light,
      rate: comment.rate,
      status: comment.status,
      user_id: comment.user.id
    };

    this.commentsApiService.update(request)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => this.notificationService.success('success.commonSuccess'),
        () => this.notificationService.error('error.commonError'));
  }
}
