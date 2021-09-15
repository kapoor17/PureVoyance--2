import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable} from 'rxjs';
import {filter, finalize, switchMap} from 'rxjs/operators';

import {User} from 'src/app/core/interfaces/user/user';
import {UsersApiService} from 'src/app/core/services/api/users.api.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';
import {MatDialog} from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'nsp-user-main-info',
  templateUrl: './user-main-info.component.html',
  styleUrls: ['./user-main-info.component.scss']
})
export class UserMainInfoComponent implements OnInit {
  @Input() public refreshTrigger$: Observable<void>;

  private userId: number;

  public data: User;
  public roles: string[];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinnerService: SpinnerService,
    private readonly usersApiService: UsersApiService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => value.has('id')),
        untilDestroyed(this))
      .subscribe(params => {
        this.userId = +params.get('id');
        this.spinnerService.showSpinner();
        this.usersApiService.getById(this.userId)
          .pipe(
            finalize(() => this.spinnerService.hideSpinner()),
            untilDestroyed(this))
          .subscribe(value => {
            this.data = value.data;
            this.roles = value.data.roles.map(item => this.toTitleCase(item.name));
          });
      });

    this.refreshTrigger$
      .pipe(
        switchMap(() => this.usersApiService.getById(this.userId)),
        untilDestroyed(this))
      .subscribe(value => this.data = value.data);
  }

  private toTitleCase = (role: string) => role.replace(
    /\w\S*/g,
    name => name.charAt(0).toUpperCase() + name.substr(1).toLowerCase());
}
