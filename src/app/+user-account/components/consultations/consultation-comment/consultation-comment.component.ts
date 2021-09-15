import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';

@Component({
  selector: 'nsp-consultation-comment',
  templateUrl: './consultation-comment.component.html',
  styleUrls: ['./consultation-comment.component.scss']
})
export class ConsultationCommentComponent implements OnInit {
  public form!: FormGroup<{ theme: string, text: string }>;

  constructor(
    private readonly dialogRef: MatDialogRef<ConsultationCommentComponent>,
    private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.setCommentForm();
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public setCommentForm(): void {
    this.form = this.formBuilder.group<{ theme: string, text: string }>({
      theme: ['', Validators.required],
      text: ['', Validators.required]
    });
  }
}
