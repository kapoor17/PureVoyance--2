import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'nsp-free-credits-modal',
  templateUrl: './free-credits-modal.component.html',
  styleUrls: ['./free-credits-modal.component.scss']
})
export class FreeCreditsModalComponent implements OnInit {
  public freeCreditsForm: FormGroup;

  constructor(private matDialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.setForm();
  }

  public setForm(): void {
    this.freeCreditsForm = this.formBuilder.group({
      creditsAmount: null
    });
  }

  public onClose(): void {
    this.matDialog.closeAll();
  }

  public onConfirm(): void {
    const amount = this.freeCreditsForm.get('creditsAmount').value;
    if (amount !== null) {
      this.matDialog.closeAll();
    }
  }
}
