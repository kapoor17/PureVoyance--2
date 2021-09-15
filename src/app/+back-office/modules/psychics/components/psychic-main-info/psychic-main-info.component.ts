import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter, finalize} from 'rxjs/operators';

import {PsychicAdmin} from 'src/app/core/interfaces/psychic/psychic-admin';
import {PsychicAdminApiService} from 'src/app/core/services/api/psychics-admin.api.service';
import {SpinnerService} from 'src/app/core/services/spinner.service';

@UntilDestroy()
@Component({
  selector: 'nsp-psychic-main-info',
  templateUrl: './psychic-main-info.component.html',
  styleUrls: ['./psychic-main-info.component.scss']
})
export class PsychicMainInfoComponent implements OnInit {
  private psychicId: number;

  public data: PsychicAdmin;
  public status!: string;
  public statusStyle: string = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinnerService: SpinnerService,
    private readonly psychicsApiService: PsychicAdminApiService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(value => value.has('id')),
        untilDestroyed(this))
      .subscribe(params => {
        this.psychicId = +params.get('id');
        this.spinnerService.showSpinner();
        this.psychicsApiService.getById(this.psychicId)
          .pipe(
            finalize(() => this.spinnerService.hideSpinner()),
            untilDestroyed(this))
          .subscribe(value => {
            this.data = value.data;
            if (this.data.online_status === false) {
              this.status = 'Offline';
              this.statusStyle = 'status-offline';
            } else {
              this.status = 'Online';
              this.statusStyle = 'status-online';
            }
          });
      });
  }
}

