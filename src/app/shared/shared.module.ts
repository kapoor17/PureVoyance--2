import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialsModule} from './modules/materials.module';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from './pipes/pipes.module';
import {MdePopoverModule} from '@material-extended/mde';

// components
import {PsychicsAboutComponent} from './components/psychics-about/psychics-about.component';
import {CustomerReviewsCarouselComponent} from './components/customer-reviews-carousel/customer-reviews-carousel.component';
import {AstroSectionsCarouselComponent} from './components/astro-sections-carousel/astro-sections-carousel.component';
import {SendSmsBlockComponent} from './components/send-sms-block/send-sms-block.component';
import {DiscoveryOfferBlockComponent} from './components/discovery-offer-block/discovery-offer-block.component';
import {TopRatedMediumsComponent} from './components/top-rated-mediums/top-rated-mediums.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ModalCallWindowComponent} from './modals/modal-call-window/modal-call-window.component';
import {ReusablePersonalGoalsComponent} from './components/reusable-personal-goals/reusable-personal-goals.component';
import {AstrologyTestLinksComponent} from './components/astrology-test-links/astrology-test-links.component';
import {CommonDialogHeaderComponent} from './components/common-dialog-header/common-dialog-header.component';
import {ConsultationOfferBlockComponent} from './components/consultation-offer-block/consultation-offer-block.component';
import {RatingStarsComponent} from './components/rating-stars/rating-stars.component';
import {OnlineStatusComponent} from './components/online-status/online-status.component';
import {HoroscopeRequestComponent} from './components/horoscope-request/horoscope-request.component';
import {LatestCommentsComponent} from './components/latest-comments/latest-comments.component';
import {NeedHelpComponent} from './components/need-help/need-help.component';
import {OfferDisclaimerComponent} from './components/offer-disclaimer/offer-disclaimer.component';
import {ReusableRegistrationComponentComponent} from './components/reusable-registration-component/reusable-registration-component.component';
import {RegisterSideBlockComponent} from './components/register-side-block/register-side-block.component';
import {OfferSideBlockComponent} from './components/offer-side-block/offer-side-block.component';
import {BeforeConsultationComponent} from './modals/consultation-with-psychic/before-consultation/before-consultation.component';
import {AfterConsultationComponent} from './modals/consultation-with-psychic/after-consultation/after-consultation.component';
import {SubHeaderBurgerMenuComponent} from './components/sub-header-burger-menu/sub-header-burger-menu.component';
import {UserAccountMenuComponent} from './components/user-account-menu/user-account-menu.component';
import {AnswerCallComponent} from './components/answer-call/answer-call.component';
import {DuringConsultationComponent} from './modals/consultation-with-psychic/during-consultation/during-consultation.component';
import {SelectPackageComponent} from './components/select-package/select-package.component';
import {ConsentComponent} from './components/consent/consent.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    MatCarouselModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    PipesModule,
    MdePopoverModule
  ],
  exports: [
    CustomerReviewsCarouselComponent,
    CommonModule,
    MaterialsModule,
    MatCarouselModule,
    RouterModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    TranslateModule,
    ReactiveFormsModule,
    MdePopoverModule,
    PsychicsAboutComponent,
    DiscoveryOfferBlockComponent,
    SendSmsBlockComponent,
    AstroSectionsCarouselComponent,
    TopRatedMediumsComponent,
    ReusablePersonalGoalsComponent,
    HoroscopeRequestComponent,
    CommonDialogHeaderComponent,
    AstrologyTestLinksComponent,
    ConsultationOfferBlockComponent,
    CommonDialogHeaderComponent,
    RatingStarsComponent,
    OnlineStatusComponent,
    LatestCommentsComponent,
    OfferDisclaimerComponent,
    NeedHelpComponent,
    RegisterSideBlockComponent,
    OfferSideBlockComponent,
    ReusableRegistrationComponentComponent,
    SubHeaderBurgerMenuComponent,
    UserAccountMenuComponent,
    AnswerCallComponent,
    SelectPackageComponent,
    ConsentComponent
  ],
  declarations: [
    PsychicsAboutComponent,
    CustomerReviewsCarouselComponent,
    AstroSectionsCarouselComponent,
    SendSmsBlockComponent,
    DiscoveryOfferBlockComponent,
    TopRatedMediumsComponent,
    ModalCallWindowComponent,
    ReusablePersonalGoalsComponent,
    HoroscopeRequestComponent,
    CommonDialogHeaderComponent,
    AstrologyTestLinksComponent,
    ConsultationOfferBlockComponent,
    CommonDialogHeaderComponent,
    RatingStarsComponent,
    OnlineStatusComponent,
    LatestCommentsComponent,
    OfferDisclaimerComponent,
    NeedHelpComponent,
    RegisterSideBlockComponent,
    OfferSideBlockComponent,
    ReusableRegistrationComponentComponent,
    BeforeConsultationComponent,
    DuringConsultationComponent,
    AfterConsultationComponent,
    SubHeaderBurgerMenuComponent,
    UserAccountMenuComponent,
    AnswerCallComponent,
    SelectPackageComponent,
    ConsentComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class SharedModule {
}
