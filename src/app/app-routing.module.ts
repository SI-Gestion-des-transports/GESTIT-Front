import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoituragesReserveComponent } from './components/covoiturages/covoiturages-reserve/covoiturages-reserve.component';
import { CovoituragesListComponent } from './components/covoiturages/covoiturages-list/covoiturages-list.component';
import { CovoituragesReservesListComponent } from './components/covoiturages/covoiturages-reserves-list/covoiturages-reserves-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleCovoiturageComponent } from './components/covoiturages/single-covoiturage/single-covoiturage.component';

const routes: Routes = [
  {path:'covoiturages/:id', component:SingleCovoiturageComponent},   //Route avec paramètre dynamique
  {path:'covoiturages', component: CovoituragesReservesListComponent},
  {path:'', component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
