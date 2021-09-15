import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/interfaces/user/user';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'nsp-comunication-preferences',
  templateUrl: './comunication-preferences.component.html',
  styleUrls: ['./comunication-preferences.component.scss']
})
export class ComunicationPreferencesComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<void> = new Subject<void>();
  public currentUser!: User;
  public preferencesForm = new FormGroup({});
  public smsPreferences = new FormControl(null, Validators.required);
  public emailPreferences = new FormControl(null, Validators.required);

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  private setForm(): void {
    this.preferencesForm = this.formBuilder.group({
      smsPreferences: this.smsPreferences,
      emailPreferences: this.emailPreferences
    });
  }

  public ngOnInit(): void {
    this.getCurrentUser();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getCurrentUser(): void {
    this.userService.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  public onValidate(): void {
    this.setForm();
  }
}
