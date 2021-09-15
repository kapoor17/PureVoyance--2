import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {filter, switchMap, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {Psychic} from 'src/app/core/interfaces/psychic/psychic';
import {PsychicApiService} from 'src/app/core/services/api/psychics.api.service';
import {NotificationService} from 'src/app/core/services/notification.service';
import {ModalCallWindowComponent} from 'src/app/shared/modals/modal-call-window/modal-call-window.component';
import {SettingsApiService} from 'src/app/core/services/api/settings.api.service';
import {BeforeConsultationComponent} from '../../../shared/modals/consultation-with-psychic/before-consultation/before-consultation.component';
import {AuthService} from '../../../core/services/api/auth.service';
import {SignUpComponent} from '../../../+auth/components/sign-up/sign-up.component';

@UntilDestroy()
@Component({
  selector: 'nsp-profile',
  templateUrl: './profile-medium.component.html',
  styleUrls: ['./profile-medium.component.scss']
})

export class ProfileMediumComponent implements OnInit {
  @ViewChildren('star') public starCollection: QueryList<any>;

  public psychic: Psychic;
  public scheduleLengthDefault: number = 6;
  public id!: number;
  public currentDate = new Date();
  public stars: { img: string, mark: number }[] = [
    {
      img: 'assets/icons/psychics/empty-star.png',
      mark: 1
    },
    {
      img: 'assets/icons/psychics/empty-star.png',
      mark: 2
    },
    {
      img: 'assets/icons/psychics/empty-star.png',
      mark: 3
    },
    {
      img: 'assets/icons/psychics/empty-star.png',
      mark: 4
    },
    {
      img: 'assets/icons/psychics/empty-star.png',
      mark: 5
    },
  ];
  public openedSlot: number;
  public timeSlots: any[];
  public pickedDate: Date;
  public timeOfStartList: string[] = [];
  public isMoreInfo: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly psychicApiService: PsychicApiService,
    private readonly notificationService: NotificationService,
    private readonly dialogModal: MatDialog,
    public readonly settingsApiService: SettingsApiService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => value.has('id')),
        tap(value => this.id = +value.get('id')),
        switchMap(value => this.psychicApiService.getById(+value.get('id'))),
        untilDestroyed(this))
      .subscribe(
        response => this.psychic = response.data,
        () => this.notificationService.error('error.commonError'));
  }

  public getTimeslots(): void {
    this.timeOfStartList = [];
    const pickedDateSlots = Object.entries(this.psychic.schedulesSlots)
      .filter(slot => slot[0] === this.pickedDate.toString().slice(0, -9));

    if (!pickedDateSlots.length) {

      return;
    }

    pickedDateSlots.forEach(elem => Object.values(elem[1])
      .forEach(data => this.timeSlots = data));

    this.timeSlots.forEach(slots => this.timeOfStartList.push(slots.date.toString().slice(11, 16)));
  }


  public onStarClick(i): void {
    this.starCollection.forEach(starDiv => {
      starDiv.nativeElement.style.background = '';
    });
    this.stars.forEach(star => {
      if (i === star.mark - 1) {
        this.starCollection.forEach((starDiv, id) => {
          if (id <= i) {
            starDiv.nativeElement.style.background = '#CFAC41';
          }
        });
      }
    });
  }

  public onSlotClick(i: number): void {
    this.pickedDate = this.psychic?.schedules[i].start;
    this.getTimeslots();
    if (this.openedSlot === i) {
      this.openedSlot = null;
    } else {
      this.openedSlot = i;
    }
  }

  public onMoreAvailabilityClick(): void {
    this.isMoreInfo = !this.isMoreInfo;
  }

  public callWindow(): void {
    this.dialogModal.open(ModalCallWindowComponent, {
      data: {
        psychic: this.psychic
      }
    });
  }

  public startConsultation(): void {
    if (this.authService.isAuthenticated) {
      this.dialogModal.open(BeforeConsultationComponent, {
        data: {
          psychic: this.psychic
        },
        width: '500px'
      });
    } else {
      this.dialogModal.open(SignUpComponent);
    }
  }
}
