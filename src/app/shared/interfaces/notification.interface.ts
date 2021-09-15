import {NotificationType} from '../enums/notification-type.enum';

export interface NotificationInterface {
  type: NotificationType;
  message: string;
}
