import {Component, OnInit} from '@angular/core';

import {filter, finalize, switchMap, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import {ValidationService} from 'src/app/core/services/validation.service';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../../../core/services/notification.service';
import {ServerResponse} from '../../../../../core/interfaces/server-response';
import {SpinnerService} from '../../../../../core/services/spinner.service';
import {PsychicAdminApiService} from '../../../../../core/services/api/psychics-admin.api.service';
import {PsychicAdmin} from '../../../../../core/interfaces/psychic/psychic-admin';


@UntilDestroy()
@Component({
  templateUrl: './psychic-edit.component.html',
  styleUrls: ['./psychic-edit.component.scss'],
})
export class PsychicEditComponent implements OnInit {
  public psychicForm: FormGroup;
  public id!: number;
  public psychic: PsychicAdmin;
  public rolesList: Array<any> = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly spinnerService: SpinnerService,
    private readonly psychicApiService: PsychicAdminApiService) {
  }

  public ngOnInit(): void {
    this.getUser();
  }

  private setForms(psychic: ServerResponse<PsychicAdmin>): void {
    this.psychicForm = this.formBuilder.group({
      description: [psychic.data.description || '', Validators.required],
      commission: [psychic.data.commission || '', Validators.required],
      price: [psychic.data.price || '', Validators.required],
      old_price: [psychic.data.old_price || '', Validators.required]
    });
  }

  private getUser(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => value.has('id')),
        tap(value => this.id = +value.get('id')),
        switchMap(value => this.psychicApiService.getById(this.id)),
        untilDestroyed(this))
      .subscribe(
        psychic => {
          this.psychic = psychic.data;
          this.setForms(psychic);
        },
        () => this.notificationService.error('error.commonError'));
  }


  public update(): void {
    this.psychicForm.value.commission = 1;
    this.psychicApiService.update(this.psychicForm.value, this.id)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this)
      ).subscribe(() => {
        this.notificationService.success('success.commonSuccess');
      },
      () => this.notificationService.error('error.commonError'));
  }
}
