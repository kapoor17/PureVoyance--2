import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

interface NavigationLink {
  name: string;
  link: string;
}

@Component({
  templateUrl: './settings-back-office.component.html',
  styleUrls: ['./settings-back-office.component.scss']
})
export class SettingsBackOfficeComponent implements OnInit {
  public activeLink: string = 'packages';
  public links: NavigationLink[] = [
    {
      name: 'packages',
      link: 'packages'
    },
    {
      name: 'discoveryOffer',
      link: 'discovery'
    },
    {
      name: 'callSettings',
      link: 'call-settings'
    },
    {
      name: 'emailSettings',
      link: 'email-settings'
    }];

  constructor(private readonly activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const childRoute = this.activatedRoute.firstChild.snapshot.url.pop();
    if (!childRoute || !childRoute.path) {
      return;
    }

    this.activeLink = childRoute.path;
  }
}
