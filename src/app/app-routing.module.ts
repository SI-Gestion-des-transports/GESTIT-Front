import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoiturageComponent } from './components/covoiturages/covoiturage/covoiturage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleCovoiturageComponent } from './components/covoiturages/single-covoiturage/single-covoiturage.component';
import { CovoiturageListComponent } from './components/covoiturages/covoiturage-list/covoiturage-list.component';
import {ReservationVsComponent} from "./components/reservation-vs/reservation-vs.component";
import {UtilisateursComponent} from "./components/utilisateurs/utilisateurs.component";
import {
  ReservationVsItemComponent
} from "./components/reservation-vs/reservation-vs-item/reservation-vs-item.component";

const routes: Routes = [
  {path:'covoiturages/:id', component:SingleCovoiturageComponent},   //Route avec paramètre dynamique
  {path:'covoiturages', component: CovoiturageListComponent},
  {path:'', component:LandingPageComponent},
  {path:'reservationsvs', component:ReservationVsComponent},
  {path:'reservationsvs/:id', component:ReservationVsItemComponent},
  {path:'utilisateurs', component:UtilisateursComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
