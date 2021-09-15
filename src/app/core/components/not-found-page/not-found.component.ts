import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'nsp-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private location: Location) {
  }

  // tslint:disable-next-line:typedef
  public goBack() {
    this.location.back();
  }
}
