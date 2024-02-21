import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlightSearchComponent } from './flight-search.component';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlightSearchResultComponent } from './flight-search-result/flight-search-result.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightSearchResultComponent,
    DialogContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
  ],
  exports: [FlightSearchComponent],
  providers: [DatePipe],
})
export class FlightSearchModule {}
