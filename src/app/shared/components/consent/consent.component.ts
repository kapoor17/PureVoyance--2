import {Component, Input, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {sortBy} from 'lodash';
import {FormArray, FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {Subject} from 'rxjs';
import {ConsentType} from 'src/app/core/constants/consent-types';

import {Consent} from 'src/app/core/interfaces/consent/consent';
import {ConsentItem} from 'src/app/core/interfaces/consent/consent-item';
import {ConsentRequestItem} from 'src/app/core/interfaces/consent/consent-request-item';
import {ConsentApiService} from 'src/app/core/services/api/consent.api.service';
import {NotificationService} from 'src/app/core/services/notification.service';

interface ConsentForm {
  consents: ConsentItem[];
}

@UntilDestroy()
@Component({
  selector: 'nsp-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit {
  @Input() public hideSubmit: boolean = false;
  @Input() public submit$: Subject<void>;

  public form: FormGroup<ConsentForm>;
  public consent: Consent;
  public submitted: boolean;

  public get consentFormArray(): FormArray<ConsentItem> {
    return this.form.controls.consents as FormArray<ConsentItem>;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly consentApiService: ConsentApiService) {
  }

  public ngOnInit(): void {
    this.consentApiService.get(ConsentType.RequestCallback)
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        this.consent = response;
        this.form = this.formBuilder.group<ConsentForm>({
          consents: this.formBuilder.array<ConsentItem>(this.buildConsentForms(response))
        });
      });
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }

    let consents: ConsentRequestItem[] = [];
    this.form.value.consents.forEach(value => {
      consents = [
        ...consents,
        {type: value.name, agreed: value.checked},
        ...value.implicitConsents.map(item => ({type: item, agreed: value.checked}))];
    });

    this.consentApiService.post({consents})
      .pipe(untilDestroyed(this))
      .subscribe(() => {
          this.submit$.next();
          this.submitted = true;
        },
        () => this.notificationService.error('error.commonError'));
  }

  private buildConsentForms(response: Consent): FormGroup<ConsentItem>[] {
    return sortBy(response.consents, item => item.priority)
      .map(item => this.formBuilder.group<ConsentItem>({
        name: item.name,
        required: item.required,
        displayedText: item.displayedText,
        checked: [false, item.required ? Validators.requiredTrue : Validators.nullValidator],
        implicitConsents: [{value: item.implicitConsents, disabled: false}],
        errorMessage: item.errorMessage
      }));
  }
}
