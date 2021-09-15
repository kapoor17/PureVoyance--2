import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {chain} from 'lodash';
import {filter} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {SpinnerService} from '../../../core/services/spinner.service';
import {PsychoTestsInterface} from '../../../shared/interfaces/psycho-tests.interface';
import {PsychoTestService} from 'src/app/core/services/psycho-test.service';

interface Question {
  text: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
}

interface Quizz {
  questions: Question[];
}

@UntilDestroy()
@Component({
  selector: 'nsp-psycho-test',
  templateUrl: './psycho-test.component.html',
  styleUrls: ['./psycho-test.component.scss']
})
export class PsychoTestComponent implements OnInit {
  public quizz: Quizz;
  public type: string;
  public selectedTest: PsychoTestsInterface;
  public selectedValue: 1 | 2 | 3 | 4 = 1;
  public highestScore: 'a' | 'b' | 'c';

  public counters: number[] = [];
  public showPagination: boolean = false;
  public showResult: boolean = false;
  public questionNum: number = null;
  public resultLoaded: boolean = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly psychoTestsService: PsychoTestService,
    private readonly spinnerService: SpinnerService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => !!value.has('type')),
        untilDestroyed(this))
      .subscribe(value => {
        this.type = value.get('type');
        this.selectedTest = this.psychoTestsService.tests.find(item => item.routePath === this.type);
        const questions: Question[] = [];
        for (let i = 1; i <= 15; i++) {
          questions.push({
            text: `quizz.${this.type}.question${i}.text`,
            c1: `quizz.${this.type}.question${i}.c1`,
            c2: `quizz.${this.type}.question${i}.c2`,
            c3: `quizz.${this.type}.question${i}.c3`,
            c4: `quizz.${this.type}.question${i}.c4`,
          });
        }

        this.quizz = {questions};
      });
  }

  public startQuizz(): void {
    this.questionNum = 1;
  }

  public nextQuestion(): void {
    this.counters.push(this.selectedValue);
    if (this.questionNum === this.quizz.questions.length) {
      this.showPagination = !this.showPagination;
      this.showResult = !this.showResult;
      this.spinnerService.showSpinner();
      setTimeout(() => {
        const maxValue = chain(this.counters).countBy().toPairs().maxBy().head().value();
        switch (maxValue) {
          case 1:
            this.highestScore = 'a';
            break;
          case 2:
            this.highestScore = 'b';
            break;
          default:
            this.highestScore = 'c';
            break;
        }
        this.spinnerService.hideSpinner();
        this.resultLoaded = !this.resultLoaded;
      }, 2000);
    } else {
      this.questionNum += 1;
      this.selectedValue = 1;
    }
  }

  public restart(): void {
    this.selectedValue = 1;
    this.counters = [];
    this.showPagination = false;
    this.showResult = false;
    this.questionNum = 1;
    this.resultLoaded = false;
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
}
