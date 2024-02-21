import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FactoryComponentsModule } from './factory-components/factory-components.module';
import { FlightSearchModule } from './flight-search/flight-search.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FactoryComponentsModule,
    FlightSearchModule,
    BrowserAnimationsModule,
    OverlayModule,
    NgxSliderModule,
  ],
  providers: [],
  exports: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
