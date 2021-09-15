import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Validators} from '@angular/forms';

import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {TranslateService} from '@ngx-translate/core';

import {Psychic} from '../../../../core/interfaces/psychic/psychic';
import {ConsultationsAddCommentsService} from '../../../../core/services/api/consultations-add-comments.service';
import {finalize} from 'rxjs/operators';
import {untilDestroyed} from '@ngneat/until-destroy';
import {SpinnerService} from '../../../../core/services/spinner.service';
import {NotificationService} from '../../../../core/services/notification.service';

@Component({
  selector: 'nsp-after-consultation',
  templateUrl: './after-consultation.component.html',
  styleUrls: ['./after-consultation.component.scss']
})
export class AfterConsultationComponent implements OnInit {
  public buttons: Array<string> = [
    'consultations.defaultButtonLabel',
    'consultations.kindnessButtonLabel',
    'consultations.predictionButtonLabel',
    'consultations.listenButtonLabel',
    'consultations.qualityCallButtonLabel',
    'consultations.otherButtonLabel'
  ];

  public selectedButton: number;
  public closeConsultation: boolean = true;
  public title: string = this.translate.instant('consultations.connectionConsultationLabel');
  public form!: FormGroup<{ theme?: string, text: string, rate: number }>;

  public rating: number = 5;

  constructor(
    private readonly spinnerService: SpinnerService,
    private readonly notificationService: NotificationService,
    private readonly consultationsAddComments: ConsultationsAddCommentsService,
    private readonly translate: TranslateService,
    private readonly formBuilder: FormBuilder,
    public readonly dialogRef: MatDialogRef<AfterConsultationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { psychic: Psychic }) {
  }

  public ngOnInit(): void {
    this.setCommentForm();
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public selected(i: number): void {
    this.selectedButton = this.selectedButton === i ? null : i;
  }

  public setCommentForm(): void {
    this.form = this.formBuilder.group<{ theme?: string, text: string, rate: number }>({
      theme: ['', Validators.required],
      text: ['', [Validators.required, Validators.minLength(50)]],
      rate: [this.rating]
    });
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }

    this.closeConsultation = !this.closeConsultation;
  }

  public closeModal(): void {
    this.consultationsAddComments.addComment(this.data.psychic.id, this.form.value).pipe(
      finalize(() => this.spinnerService.hideSpinner()),
      untilDestroyed(this))
      .subscribe(() => {
          this.notificationService.success('success.commonSuccess');
        },
        () => this.notificationService.error('error.commonError'));

    this.dialogRef.close();
  }
}
