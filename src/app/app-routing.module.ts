import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// components
import {NotFoundComponent} from './core/components/not-found-page/not-found.component';
import {ForbiddenComponent} from './core/components/forbidden-page/forbidden.component';

import {AuthGuard} from './core/helpers/auth.guard';
import {UserAccountMenuComponent} from './shared/components/user-account-menu/user-account-menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'psychics',
    pathMatch: 'full'
  },
  {
    path: 'profile-users',
    loadChildren: () => import('./+user-account/user-account.module').then(m => m.UserAccountModule)
  },
  {
    path: 'psychics',
    loadChildren: () => import('./+psychics/psychics.module').then(m => m.PsychicsModule)
  },
  {
    path: 'back-office',
    loadChildren: () => import('./+back-office/back-office.module').then(m => m.BackOfficeModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'account',
    loadChildren: () => import('./+user-account/user-account.module').then(m => m.UserAccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'astrology',
    loadChildren: () => import('./+astrology/astrology.module').then(m => m.AstrologyModule)
  },
  {
    path: 'horoscope',
    loadChildren: () => import('./+horoscope/horoscope.module').then(m => m.HoroscopeModule)
  },
  {
    path: 'psychic-registration',
    loadChildren: () => import('./+psychic-registration/psychic-registration.module').then(m => m.PsychicRegistrationModule)
  },
  {
    path: 'psycho-tests',
    loadChildren: () => import('./+psycho-tests/psycho-tests.module').then(m => m.PsychoTestsModule)
  },
  {
    path: 'tarot',
    loadChildren: () => import('./+tarot/tarot.module').then(m => m.TarotModule)
  },
  {
    path: 'sexo',
    loadChildren: () => import('./+sexo/sexo.module').then(m => m.SexoModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./+contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'user-account-menu',
    component: UserAccountMenuComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
