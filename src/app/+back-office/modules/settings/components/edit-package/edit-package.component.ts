import {Component, Inject, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {cloneDeep, isNil} from 'lodash';

import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';

import {Package} from 'src/app/core/interfaces/packages/package';
import {greaterThanValidator} from 'src/app/shared/validators/greaterThanValidator';
import {starKeysValidator} from '../../../../../shared/validators/starKeyValidator';

@Component({
  selector: 'nsp-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {
  public form: FormGroup<Package>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      package: Package,
      allPackages: Package[]
    },
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditPackageComponent>) {
  }

  public ngOnInit(): void {
    this.setForm();
  }

  private setForm(): void {
    this.form = this.formBuilder.group<Package>({
      id: this.data?.package?.id,
      order: this.data?.package?.order || 0,
      amount: [this.data?.package?.amount || 0, [Validators.required, Validators.min(1)]],
      credits: [this.data?.package?.credits || 0, [Validators.required, Validators.min(1), greaterThanValidator(() => this.form?.value?.amount)]],
      active: this.data?.package?.active || true,
      star_key: [this.data?.package?.star_key || null, [Validators.max(3), starKeysValidator(this.data?.allPackages, this.data?.package)]],
      market: 'FR',
      extra_credits: [this.data?.package?.extra_credits || 0, greaterThanValidator(() => this.form?.value?.extra_amount)],
      extra_amount: this.data?.package?.extra_amount || 0,
    });
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }

    const request = cloneDeep(this.form.value);
    request.star_key = isNil(request.star_key)
      ? request.star_key
      : request.star_key.toString();

    this.dialogRef.close(request);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
