import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nsp-consultation-offer-block',
  templateUrl: './consultation-offer-block.component.html',
  styleUrls: ['./consultation-offer-block.component.scss']
})
export class ConsultationOfferBlockComponent implements OnInit {

  public price: number = 10;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
