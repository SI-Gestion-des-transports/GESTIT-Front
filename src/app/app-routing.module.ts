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
import { CovoituragesOrganiseComponent } from './components/covoiturages/covoiturages-organise/covoiturages-organise.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { VehiculeServiceComponent } from './components/vehicule-service/vehicule-service.component';
import {
  VehiculeServiceListComponent
} from "./components/vehicule-service/vehicule-service-list/vehicule-service-list.component";
import {
  VehiculeServiceAddComponent
} from "./components/vehicule-service/vehicule-service-add/vehicule-service-add.component";
import {
  VehiculeServiceModifyComponent
} from "./components/vehicule-service/vehicule-service-modify/vehicule-service-modify.component";
import {
  ReservationVsFormComponent
} from "./components/reservation-vs/reservation-vs-form/reservation-vs-form.component";
import {
  ReservationVsListComponent
} from "./components/reservation-vs/reservation-vs-list/reservation-vs-list.component";
import {VehiculePersoComponent} from "./components/vehicule-perso/vehicule-perso.component";

const routes: Routes = [
  {path:'covoiturages/:id', component:SingleCovoiturageComponent},   //Route avec paramètre dynamique
  {path:'covoiturages', component: CovoiturageListComponent},
  {path:'covoituragesOrganises', component: CovoituragesOrganiseComponent},
  {path:'', component:LandingPageComponent},

  {path:'reservation', component:ReservationVsComponent},
  {path:'reservation/upcoming', component:ReservationVsListComponent},
  {path:'reservation/past', component:ReservationVsListComponent},
  {path:'reservationsvs', component:ReservationVsComponent,
  children: [
    {path:'form', component:ReservationVsFormComponent},
    {path:'item', component:ReservationVsItemComponent},
    {path:'list', component:ReservationVsListComponent},
    {path:':id', component:ReservationVsItemComponent},
  ]},

  {path:'utilisateurs', component:UtilisateursComponent},
  {path:'login', component:AuthentificationComponent},
  {path:'vehiculeperso', component:VehiculePersoComponent},
  {
    path: 'vehiculeService', component: VehiculeServiceComponent,
    children: [
      {path: "list", component: VehiculeServiceListComponent},
      {path: "add", component: VehiculeServiceAddComponent},
      {path: "modify/:id", component: VehiculeServiceModifyComponent},
      {path: "**", component: VehiculeServiceListComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
