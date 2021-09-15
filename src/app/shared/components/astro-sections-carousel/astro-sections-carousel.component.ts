import {Component, Input, OnInit} from '@angular/core';
import {AstroSectionsService} from '../../../core/services/astro-sections.service';
import {AstroSectionsInterface} from '../../interfaces/astro-sections.interface';
import {chunk} from 'lodash';

const DEFAULT_PAGE_SIZE: number = 2;


@Component({
  selector: 'nsp-astro-sections-carousel',
  templateUrl: './astro-sections-carousel.component.html',
  styleUrls: ['./astro-sections-carousel.component.scss'],
})
export class AstroSectionsCarouselComponent implements OnInit {
  @Input() public witchSectionTestShow: boolean = true;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public mediumsToShow: number;
  public arrows: boolean;
  public slidesToShow: number;
  public slideHeight: string;

  public firstSection: AstroSectionsInterface[][];
  public secondSection: AstroSectionsInterface[][];

  constructor(public astroSection: AstroSectionsService) {
  }

  public ngOnInit(): void {
    if (window.innerWidth < 1040 && innerWidth > 620) {
      this.mediumsToShow = 2;
      this.arrows = false;
      this.slidesToShow = 2;
      this.slideHeight = '420px';
    } else if (innerWidth < 620) {
      this.mediumsToShow = 2;
      this.arrows = false;
      this.slidesToShow = 2;
      this.slideHeight = '250px';
    } else if (innerWidth < 470) {
      this.mediumsToShow = 2;
      this.arrows = false;
      this.slidesToShow = 2;
      this.slideHeight = '230px';
    } else if (innerWidth < 370) {
      this.mediumsToShow = 2;
      this.arrows = false;
      this.slidesToShow = 2;
      this.slideHeight = '200px';
    } else {
      this.mediumsToShow = 4;
      this.arrows = true;
      this.slidesToShow = 1;
      this.slideHeight = '500px';
    }

    this.secondSection = chunk(this.astroSection.sectionSecond, this.mediumsToShow);
    this.firstSection = chunk(this.astroSection.sectionFirst, this.mediumsToShow);
  }

  public openAstroTest(i: number): void {
    this.astroSection.selectTest = this.astroSection.sectionFirst[i];
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  public openSecondAstroTest(i: number): void {
    this.astroSection.selectTest = this.astroSection.sectionSecond[i];
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
}
