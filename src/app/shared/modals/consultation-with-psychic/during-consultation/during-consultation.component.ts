import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {Psychic} from 'src/app/core/interfaces/psychic/psychic';
import {RechargeService} from 'src/app/shared/modules/recharge/recharge.service';
import {AfterConsultationComponent} from '../after-consultation/after-consultation.component';
import {ConsultationsApiService} from '../../../../core/services/api/consultations.api.service';

@UntilDestroy()
@Component({
  selector: 'nsp-during-consultation',
  templateUrl: './during-consultation.component.html',
  styleUrls: ['./during-consultation.component.scss']
})
export class DuringConsultationComponent implements OnInit {
  @ViewChild('fileInput') public fileInput: ElementRef;

  public uploadedFileName: string;
  public status: string;

  constructor(
    private readonly consultationsApiService: ConsultationsApiService,
    private readonly dialog: MatDialog,
    private readonly rechargeService: RechargeService,
    private readonly matDialogRef: MatDialogRef<DuringConsultationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { psychic: Psychic }) {
  }

  public ngOnInit(): void {
    this.consultationsApiService.status$.pipe(untilDestroyed(this))
      .subscribe((status) => {
        if (status === 'ENDED_NORMAL') {
          this.dialog.closeAll();
          this.dialog.open(AfterConsultationComponent, {
            data: {
              psychic: this.data.psychic
            },
            panelClass: 'custom-dialog',
            width: '500px'
          });
        } else if (status === 'ENDED_SMALL' || status === 'FAIL') {
          this.dialog.closeAll();
        }
      });
  }

  public cancel(): void {
    this.matDialogRef.close();
  }

  public packageSelected(): void {
  }

  public uploadFile(): void {
    this.fileInput.nativeElement.click();
  }

  public fileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length === 0) {
      return;
    }

    this.uploadedFileName = fileList[0].name;
  }
}
