import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {SignUpComponent} from 'src/app/+auth/components/sign-up/sign-up.component';

@Component({
  selector: 'nsp-register-side-block',
  templateUrl: './register-side-block.component.html',
  styleUrls: ['./register-side-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterSideBlockComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  public register(): void {
    this.dialog.open(SignUpComponent);
  }
}
