import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'nsp-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {

  constructor(private location: Location) {
  }

  public goBack(): void {
    this.location.back();
  }
}
