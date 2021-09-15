import {Component, OnInit} from '@angular/core';
import {TarotService} from '../core/services/toggle-tarot.service';
import {HoroscopeService} from '../core/services/horoscope.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TarotInterface} from '../shared/interfaces/tarot.interface';
import {HoroscopeInterface} from '../shared/interfaces/horoscope.interface';
import {filter} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {UserService} from '../core/services/user.service';

@UntilDestroy()
@Component({
  selector: 'nsp-tarot',
  templateUrl: './tarot.component.html',
  styleUrls: ['./tarot.component.scss']
})
export class TarotComponent implements OnInit {
  public taros: TarotInterface[];
  public check: number;
  public sign: HoroscopeInterface[];


  public tarotSelect: FormGroup;


  constructor(private readonly userService: UserService,
              private readonly formBuilder: FormBuilder,
              public tarotService: TarotService,
              private readonly horoscopeSigns: HoroscopeService) {
  }

  public ngOnInit(): void {
    this.taros = this.tarotService.tarotPacks;
    this.sign = this.horoscopeSigns.horoscopes;
    this.tarotSelect = this.formBuilder.group({
      checkRadio: ['', Validators.required],
      firstName: ['', Validators.required],
      selectSing: ['', Validators.required]
    });
    this.userService.user$
      .pipe(
        filter(value => !!value),
        untilDestroyed(this))
      .subscribe(user => {
        this.tarotSelect.controls.firstName.setValue(user.name);
      });

  }
}
