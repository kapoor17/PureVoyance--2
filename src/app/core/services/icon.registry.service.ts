import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export class IconRegistry {
  public static register(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer): void {

    matIconRegistry.addSvgIcon(
      'logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg'));

    matIconRegistry.addSvgIcon(
      'empty-heart',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/psychics/star-grey.svg'));

    matIconRegistry.addSvgIcon(
      'red-heart',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile-about/heart-clicked-icon.svg'));

    matIconRegistry.addSvgIcon(
      'eye',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/psychics/eye.svg'));

    matIconRegistry.addSvgIcon(
      'circle',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/circle.svg'));

    matIconRegistry.addSvgIcon(
      'star-icon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/star-icon.svg'));

    matIconRegistry.addSvgIcon(
      'recharge',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/credit-card.svg'));

    matIconRegistry.addSvgIcon(
      'profile',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/my-profile-icon.svg'));

    matIconRegistry.addSvgIcon(
      'consultations',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/consultations-icon.svg'));

    matIconRegistry.addSvgIcon(
      'heart',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/heart-icon.svg'));

    matIconRegistry.addSvgIcon(
      'factures',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/factures-icon.svg'));

    matIconRegistry.addSvgIcon(
      'communications',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/communications.svg'));

    matIconRegistry.addSvgIcon(
      'arrow-left',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-left-icon.svg'));

    matIconRegistry.addSvgIcon(
      'arrow-right',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-right-icon.svg'));

    matIconRegistry.addSvgIcon(
      'credit-card',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/credit-card.svg'));

    matIconRegistry.addSvgIcon(
      'lock',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/lock.svg'));

    matIconRegistry.addSvgIcon(
      'calendar',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar.svg'));

    matIconRegistry.addSvgIcon(
      'person',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/person.svg'));

    matIconRegistry.addSvgIcon(
      'success-checkmark',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/success-checkmark.svg'));

    matIconRegistry.addSvgIcon(
      'error-cross',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/error-cross.svg'));

    matIconRegistry.addSvgIcon(
      'sun',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/sun.svg'));

    matIconRegistry.addSvgIcon(
      'moon',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/small-moon.svg'));

    matIconRegistry.addSvgIcon(
      'appointments',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/appointments.svg'));

    matIconRegistry.addSvgIcon(
      'comment',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/comment.svg'));

    matIconRegistry.addSvgIcon(
      'letter',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/mail.svg'));

    matIconRegistry.addSvgIcon(
      'payments',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/payment-method.svg'));

    matIconRegistry.addSvgIcon(
      'log-out',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile/sign-out.svg'));

    matIconRegistry.addSvgIcon(
      'trolley',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/header/trolley.svg'));

    matIconRegistry.addSvgIcon(
      'second-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/header/logo-tablet-icon.svg'));

    matIconRegistry.addSvgIcon(
      'burger-menu',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/header/burger-menu-icon.svg'));

    matIconRegistry.addSvgIcon(
      'close-menu',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/close-icon.svg'));

    matIconRegistry.addSvgIcon(
      'psychics-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/psychics-icon.svg'));

    matIconRegistry.addSvgIcon(
      'horoscope-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/horoscopes-icon.svg'));

    matIconRegistry.addSvgIcon(
      'psycho-test-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/psycho-icon.svg'));

    matIconRegistry.addSvgIcon(
      'sexo-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/sexo-icon.svg'));

    matIconRegistry.addSvgIcon(
      'tarot-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/tarot-icon.svg'));

    matIconRegistry.addSvgIcon(
      'astrology-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/astrology-icon.svg'));

    matIconRegistry.addSvgIcon(
      'chat-live-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/chat-live-icon.svg'));

    matIconRegistry.addSvgIcon(
      'forums-logo',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/forums-icon.svg'));

    matIconRegistry.addSvgIcon(
      'phone',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/header/header-phone-icon.svg'));

    matIconRegistry.addSvgIcon(
      'arrow-close',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-menu/close-arrow-right-icon.svg'));

    matIconRegistry.addSvgIcon(
      'mobile-phone',
      domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/burger-menu/sms-icon.svg'));

    matIconRegistry.addSvgIcon(
      'chat',
      domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/burger-menu/chat-icon.svg'));

    matIconRegistry.addSvgIcon(
      'phone-call',
      domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/burger-menu/audio-icon.svg'));

    matIconRegistry.addSvgIcon(
      'green-phone',
      domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/green-phone-icon.svg'));

    matIconRegistry.addSvgIcon(
      'grey-comas',
      domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/psychics/grey-lapki.svg'));
  }
}
