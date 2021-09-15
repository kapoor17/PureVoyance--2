import {Component} from '@angular/core';

import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Comment} from 'src/app/core/interfaces/comments/comment';
import {CommentsApiService} from 'src/app/core/services/api/comments.api.service';

@Component({
  selector: 'nsp-latest-comments',
  templateUrl: './latest-comments.component.html',
  styleUrls: ['./latest-comments.component.scss']
})
export class LatestCommentsComponent {
  public dataSource$: Observable<Comment[]> = this.commentsApiService.getPage(3)
    .pipe(map(item => {
      item.data.forEach(comment => comment.date = moment(comment.date, 'DD/MM/YYYY').toDate());

      return item.data;
    }));

  constructor(private readonly commentsApiService: CommentsApiService) {
  }
}
