import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntilDestroy} from '@ngneat/until-destroy';

import {PatientConsultation} from 'src/app/core/interfaces/consultations/patient-consultation';
import {PsychicAdmin} from 'src/app/core/interfaces/psychic/psychic-admin';

@UntilDestroy()
@Component({
  selector: 'nsp-details-modal-window',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.scss']
})
export class ConsultationDetailsComponent {
  public consultation!: PatientConsultation;
  public psychic: PsychicAdmin;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { consultation: PatientConsultation },
    private readonly dialogRef: MatDialogRef<ConsultationDetailsComponent>) {
    this.consultation = this.data.consultation;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
