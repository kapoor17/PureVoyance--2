import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter} from 'rxjs/operators';
import {ConfirmationDialogDataInterface} from 'src/app/core/components/confirmation-dialog/confirmation-dialog-data';
import {ConfirmationDialogComponent} from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

interface NavigationLink {
  name: string;
  link: string;
}

@UntilDestroy()
@Component({
  selector: 'nsp-psychic-details',
  templateUrl: './psychic-details.component.html',
  styleUrls: ['./psychic-details.component.scss']
})
export class PsychicDetailsComponent implements OnInit {
  public activeLink: string = 'consultations';
  public activated: boolean = true;

  public links: NavigationLink[] = [
    {
      name: 'consultations',
      link: 'consultations'
    },
    {
      name: 'appointments',
      link: 'appointments'
    },
    {
      name: 'comments',
      link: 'comments'
    }];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    if (!this.activatedRoute.firstChild) {
      return;
    }

    const childRoute = this.activatedRoute.firstChild.snapshot.url.pop();
    if (!childRoute || !childRoute.path) {
      return;
    }

    this.activeLink = childRoute.path;
  }

  public activate(): void {
    this.toggleActivatedState(true);
  }

  public deactivate(): void {
    this.toggleActivatedState(false);
  }

  private toggleActivatedState(activated: boolean): void {
    const data: ConfirmationDialogDataInterface = {
      canCancel: true,
      noLabel: 'general.cancelLabel',
      message: activated ? 'userProfile.activateConfirmationLabel' : 'userProfile.deactivateConfirmationLabel'
    };

    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data,
      width: '500px',
      height: '320px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed()
      .pipe(
        filter(value => !!value),
        untilDestroyed(this))
      .subscribe(() => this.activated = activated);
  }
}
