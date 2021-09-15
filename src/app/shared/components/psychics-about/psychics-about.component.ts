import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, finalize} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {forkJoin, Observable} from 'rxjs';
import {SpinnerService} from '../../../core/services/spinner.service';
import {PsychicApiService} from 'src/app/core/services/api/psychics.api.service';
import {AuthService} from 'src/app/core/services/api/auth.service';
import {ProfileApiService} from 'src/app/core/services/api/profile.api.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {UserService} from 'src/app/core/services/user.service';
import {PsychicsService} from 'src/app/core/services/psychic.service';
import {PsychicSummary} from '../../../core/interfaces/psychic/psychic-summary';
import {BaseSummary} from 'src/app/core/interfaces/base-summary';
import {User} from '../../../core/interfaces/user/user';
import {Page} from 'src/app/core/interfaces/page';
import {SettingsApiService} from 'src/app/core/services/api/settings.api.service';
import {MatDialog} from '@angular/material/dialog';
import {BeforeConsultationComponent} from '../../modals/consultation-with-psychic/before-consultation/before-consultation.component';
import {RechargeComponent} from '../../modules/recharge/recharge.component';
import {SignUpComponent} from '../../../+auth/components/sign-up/sign-up.component';


@UntilDestroy()
@Component({
  selector: 'nsp-psychics-about',
  templateUrl: './psychics-about.component.html',
  styleUrls: ['./psychics-about.component.scss']
})
export class PsychicsAboutComponent implements OnInit {
  @Input() public psychicsToShow: number = 12;
  @Input() public dense: boolean = false;
  @Input() public filter$: Observable<{ search: string, skillId: number, status: string }>;

  private favoritePsychicIds: number[] = [];

  public pageNumber = 1;
  public total: number = 0;
  public psychicList: PsychicSummary[] = [];
  public filter: { search: string, skillId: number, status: string } = {search: '', skillId: null, status: null};
  public currentUser: User;

  constructor(
    public readonly authService: AuthService,
    public readonly userService: UserService,
    public readonly settingsApiService: SettingsApiService,
    private readonly psychicService: PsychicsService,
    private readonly notificationService: NotificationService,
    private readonly profileApiService: ProfileApiService,
    private readonly psychicApiService: PsychicApiService,
    private readonly spinnerService: SpinnerService,
    private readonly dialog: MatDialog) {
  }

  public ngOnInit(): void {
    if (!!this.filter$) {
      this.filter$
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          untilDestroyed(this))
        .subscribe(value => {
          this.filter = value;
          this.pageNumber = 1;
          this.getPsychics();
        });
    }

    if (this.authService.isAuthenticated) {
      this.initiateAuthorized();

      return;
    }

    this.initiateAnonymous();
  }

  private setFilters(response: Page<PsychicSummary>): void {
    this.psychicService.setFilters(
      response.filters.skills as BaseSummary[],
      response.filters.statuses as string[]);
  }

  private initiateAnonymous(): void {
    this.spinnerService.showSpinner();
    this.psychicApiService.getPage(this.pageNumber, this.psychicsToShow)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(value => {
          this.psychicList = value.data;
          this.total = value.meta.total;
          this.setFilters(value);
        },
        () => this.notificationService.error('error.commonError'));
  }

  private initiateAuthorized(): void {
    this.spinnerService.showSpinner();
    forkJoin([
      this.psychicApiService.getPage(this.pageNumber, this.psychicsToShow),
      this.profileApiService.getPsychics(1, 100)])
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(value => {
          this.favoritePsychicIds = value[1].data.map(item => item.id);
          this.psychicList = value[0].data;
          this.total = value[0].meta.total;
          this.setFilters(value[0]);
          this.psychicList.forEach(item => item.isFavorite = this.favoritePsychicIds.includes(item.id));
        },
        () => this.notificationService.error('error.commonError'));
  }

  public getPsychics(): void {
    this.spinnerService.showSpinner();
    this.psychicApiService.getPage(
      this.pageNumber,
      this.psychicsToShow,
      this.filter.search,
      this.filter.skillId,
      this.filter.status)
      .pipe(
        finalize(() => this.spinnerService.hideSpinner()),
        untilDestroyed(this))
      .subscribe(psychics => {
          this.psychicList = psychics.data;
          this.total = psychics.meta.total;
          this.setFilters(psychics);
          this.psychicList.forEach(item => item.isFavorite = this.favoritePsychicIds.includes(item.id));
        },
        () => this.notificationService.error('error.commonError'));
  }

  public paginatorEvent(page: number): void {
    this.pageNumber = page;
    this.getPsychics();
  }

  public getUser(): void {
    this.userService.user$
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  public toggleFavorite(psychic: PsychicSummary, $event: Event): void {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    const endpointCall = psychic.isFavorite
      ? this.profileApiService.removePsychic(psychic.id)
      : this.profileApiService.addPsychic(psychic.id);

    endpointCall
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          psychic.isFavorite = !psychic.isFavorite;
          this.notificationService.success('success.commonSuccess');
        },
        () => this.notificationService.error('error.commonError'));
  }

  public startConsultation(i: number): void {
    if (this.authService.isAuthenticated) {
      this.getUser();
      if (this.currentUser?.total_credits < 1) {
        this.dialog.open(RechargeComponent, {
          panelClass: 'custom-dialog'
        });
      } else {
        this.dialog.open(BeforeConsultationComponent, {
          data: {
            psychic: this.psychicList[i]
          },
          width: '500px'
        });
      }
    } else {
      this.dialog.open(SignUpComponent);
    }
  }
}
