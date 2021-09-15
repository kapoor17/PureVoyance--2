import {Component, OnInit} from '@angular/core';

import {finalize} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {MediumInterface} from '../../interfaces/medium.interface';
import {SpinnerService} from '../../../core/services/spinner.service';
import {PsychicSummary} from '../../../core/interfaces/psychic/psychic-summary';
import {PsychicApiService} from 'src/app/core/services/api/psychics.api.service';
import {chunk} from 'lodash';

@UntilDestroy()
@Component({
  selector: 'nsp-top-rated-mediums',
  templateUrl: './top-rated-mediums.component.html',
  styleUrls: ['./top-rated-mediums.component.scss']
})
export class TopRatedMediumsComponent implements OnInit {
  public mediums!: MediumInterface[];
  public ratedMediums: PsychicSummary[][];
  public mediumsToShow: number;
  public arrows: boolean;
  public slideHeight: string;

  constructor(
    private readonly psychicApiService: PsychicApiService,
    private readonly spinnerService: SpinnerService) {
  }

  public ngOnInit(): void {
    this.getPsychics();
  }

  public getPsychics(): void {
    this.spinnerService.showSpinner();
    this.psychicApiService.getPage(1, 5).pipe(
      finalize(() => this.spinnerService.hideSpinner()),
      untilDestroyed(this))
      .subscribe(psychics => {
        if (window.innerWidth > 1040) {
          this.mediumsToShow = 5;
          this.arrows = true;
          this.slideHeight = '450px';
        } else if (window.innerWidth < 1040 && window.innerWidth > 620) {
          this.mediumsToShow = 2;
          this.arrows = false;
          this.slideHeight = '340px';
        } else if (window.innerWidth > 350) {
          this.mediumsToShow = 2;
          this.slideHeight = '274px';
        } else {
          this.mediumsToShow = 1;
          this.slideHeight = '274px';
        }
        this.ratedMediums = chunk(psychics.data.filter(el => el.rate = 5).slice(0, 5), this.mediumsToShow);
      });
  }
}
