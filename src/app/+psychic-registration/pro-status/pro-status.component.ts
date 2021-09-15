import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'nsp-pro-status',
  templateUrl: './pro-status.component.html',
  styleUrls: ['./pro-status.component.scss']
})
export class ProStatusComponent implements OnInit {
  public creationDate: Date = new Date();
  public statusForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.setForm();
  }

  public setForm(): void {
    this.statusForm = this.fb.group({
      currentStatus: this.fb.control(null),
      date: this.fb.control(this.creationDate, Validators.required),
      reason: this.fb.control(null, Validators.required),
      numberOfRegistration: this.fb.control(null, Validators.required),
      firstTax: this.fb.control(null),
      secondTax: this.fb.control(null),
      taxNumber: this.fb.control(null),
      accept: this.fb.control(null, Validators.required),
    });
  }
}
