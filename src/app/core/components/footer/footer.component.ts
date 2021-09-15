import {Component} from '@angular/core';
import {AuthService} from '../../services/api/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'nsp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public authService: AuthService,
              public userService: UserService) {
  }
}
