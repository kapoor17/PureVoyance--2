import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';

import {DomSanitizer, Title} from '@angular/platform-browser';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {LanguageService} from './core/services/language.service';
import {NotificationService} from './core/services/notification.service';
import {SnackbarService} from './core/services/snackbar.service';
import {AuthService} from './core/services/api/auth.service';
import {UserService} from './core/services/user.service';

import {IconRegistry} from './core/services/icon.registry.service';
import {HamburgerService} from './core/services/hamburger-service';
import {WebsocketService} from './core/services/websocket.service';

import Pusher from "pusher-js"
;

@UntilDestroy()
@Component({
  selector: 'nsp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public initialized: boolean;

  constructor(
    private socketService: WebsocketService,
    public readonly matIconRegistry: MatIconRegistry,
    public readonly authService: AuthService,
    public readonly userService: UserService,
    public readonly hamburgerService: HamburgerService,
    private readonly translateService: TranslateService,
    private readonly languageService: LanguageService,
    private readonly title: Title,
    private readonly router: Router,
    private readonly domSanitizer: DomSanitizer,
    private readonly notificationService: NotificationService,
    private snackbarService: SnackbarService) {
  }

  public get currentLanguage(): string {
    return this.languageService.currentLanguage;
  }

  public ngOnInit(): void {
    const socket = new WebSocket(`wss://socket-back-purevoyance.dev-prom.pp.ua:6001/app/consultation?protocol=7&client=js&version=7.0.3&flash=false`);

    socket.onmessage = (www) => {
      const socketId = JSON.parse(JSON.parse(www.data).data).socket_id;
      this.socketService.open({socket_id: socketId, channel_name: 'consultation'}).subscribe(res => {
        const www = new Pusher(res.auth);

        const cahnnel = www.subscribe('consultation');
        cahnnel.bind('Consultation', data => {
        });
      });
    };

    IconRegistry.register(this.matIconRegistry, this.domSanitizer);
    this.initialized = true;

    this.translateService.onLangChange
      .pipe(untilDestroyed(this))
      .subscribe(() => this.changeTitle());

    this.translateService.setDefaultLang(this.currentLanguage);
    this.translateService.use(this.currentLanguage);
    this.subscribeToNotification();

    if (!this.authService.isAuthenticated) {
      return;
    }

    this.authService.getUser()
      .pipe(untilDestroyed(this))
      .subscribe(value => this.userService.onUserLoaded(value));
  }

  private changeTitle(): void {
    this.translateService.get('titleLabel')
      .pipe(untilDestroyed(this))
      .subscribe((result) => this.title.setTitle(result));
  }

  private subscribeToNotification(): void {
    this.notificationService.notify()
      .pipe(untilDestroyed(this))
      .subscribe((result) => this.snackbarService.openSnackBar(result.type, result.message));
  }

  public get isBackOffice(): boolean {
    return this.router.url.includes('back-office');
  }

  public get isBurgerMenu(): boolean {
    return this.router.url.includes('burger-menu');
  }
}

