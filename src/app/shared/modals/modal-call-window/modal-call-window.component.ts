import {Component, Inject, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Psychic} from '../../../core/interfaces/psychic/psychic';

@Component({
  selector: 'nsp-modal-call-window',
  templateUrl: './modal-call-window.component.html',
  styleUrls: ['./modal-call-window.component.scss']
})
export class ModalCallWindowComponent implements OnInit {
  public id!: number;
  public psychic!: Psychic;

  constructor(public route: ActivatedRoute, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { psychic: Psychic }) {
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.psychic = this.data.psychic;

  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
