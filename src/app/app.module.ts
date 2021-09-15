// modules
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {GoTopButtonModule} from 'ng-go-top-button';

// components
import {AppComponent} from './app.component';
import {SidebarModule} from 'ng-sidebar';
import {NativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    GoTopButtonModule,
    SidebarModule,
    MatDatepickerModule,
    NativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

