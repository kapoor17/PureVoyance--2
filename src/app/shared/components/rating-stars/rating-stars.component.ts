import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'nsp-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsComponent {
  @Input() public rate: number;
}
