import { Routes } from '@angular/router';
import { FlightSearchResultComponent } from './flight-search-result/flight-search-result.component';
import { FlightSearchComponent } from './flight-search.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FlightSearchComponent,
      },
      {
        path: 'search-result',
        component: FlightSearchResultComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/error/404',
  },
];
