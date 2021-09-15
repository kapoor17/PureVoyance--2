import {Component, OnInit} from '@angular/core';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {chunk} from 'lodash';

import {CommentsAdminApiService} from 'src/app/core/services/api/comments-admin.api.service';
import {Comment} from '../../../core/interfaces/comments/comment';

@UntilDestroy()
@Component({
  selector: 'nsp-customer-reviews-carousel',
  templateUrl: './customer-reviews-carousel.component.html',
  styleUrls: ['./customer-reviews-carousel.component.scss']
})
export class CustomerReviewsCarouselComponent implements OnInit {
  public chunks: Comment[][] = [];

  constructor(private readonly commentsApiService: CommentsAdminApiService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.commentsApiService.getPage(1, 8)
      .pipe(untilDestroyed(this))
      .subscribe(data => this.chunks = chunk(data.data, 2));
  }
}
