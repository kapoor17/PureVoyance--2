import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {Observable, Subject} from 'rxjs';
import {NotificationType} from '../../shared/enums/notification-type.enum';
import {NotificationInterface} from '../../shared/interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private subject: Subject<any> = new Subject<Notification>();

  constructor(private translate: TranslateService) {
  }

  public notify(): Observable<NotificationInterface> {
    return this.subject.asObservable();
  }

  public success(message: string): void {
    this.notification(NotificationType.Success, this.translate.instant(message));
  }

  public error(message: string): void {
    this.notification(NotificationType.Error, this.translate.instant(message));
  }

  private notification(type: NotificationType, translationLabel: string): void {
    this.subject.next(<NotificationInterface>{type: type, message: translationLabel});
  }
}
