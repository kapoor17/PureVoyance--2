import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {HoroscopeService} from 'src/app/core/services/horoscope.service';
import {TarotService} from 'src/app/core/services/toggle-tarot.service';
import {TarotInterface} from 'src/app/shared/interfaces/tarot.interface';

export interface TarotForm {
  sign: string;
  name: string;
  pack: TarotInterface;
}

@Component({
  selector: 'nsp-tarot-links',
  templateUrl: './tarot-links.component.html',
  styleUrls: ['./tarot-links.component.scss']
})
export class TarotLinksComponent implements OnInit {
  public form: FormGroup<TarotForm>;

  constructor(
    public readonly tarotService: TarotService,
    public readonly horoscopeSigns: HoroscopeService,
    private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group<TarotForm>({
      sign: ['', Validators.required],
      name: ['', Validators.required],
      pack: [null, Validators.required]
    });
  }
}
