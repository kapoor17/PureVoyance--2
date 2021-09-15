import {Component} from '@angular/core';

import {AuthService} from '../../services/api/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'nsp-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent {
  constructor(
    public readonly authService: AuthService,
    public readonly userService: UserService) {
  }
}
