import {Component, OnInit} from '@angular/core';

import {Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {ContactUsFormInterface} from '../shared/interfaces/form-interfaces/contact-us-form.interface';


@Component({
  selector: 'nsp-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public showMessage: boolean = false;
  public contactUsForm!: FormGroup<ContactUsFormInterface>;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.contactUsForm = this.formBuilder.group<ContactUsFormInterface>({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      sendMessage: ['', Validators.required]
    });
  }

  public sentInfo(): void {
    this.showMessage = !this.showMessage;
  }
}
