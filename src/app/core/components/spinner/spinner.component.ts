import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpinnerService} from '../../services/spinner.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'nsp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public isSpinnerVisible = false;
  public unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private spinnerService: SpinnerService) {
  }

  public ngOnInit(): void {
    this.spinnerService.getSpinnerStateSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.isSpinnerVisible = res);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

