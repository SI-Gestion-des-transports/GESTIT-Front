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
import {
  CovoituragesOrganiseListComponent
} from "./components/covoiturages/covoiturages-organise/covoiturages-organise-list/covoiturages-organise-list.component";
import {
  CovoituragesOrganiseFormComponent
} from "./components/covoiturages/covoiturages-organise/covoiturages-organise-form/covoiturages-organise-form.component";
import { CovoiturageConformationComponent } from "./components/covoiturages/covoiturage-conformation/covoiturage-conformation.component";
import {VehiculePersoComponent} from "./components/vehicule-perso/vehicule-perso.component";
import {
  VehiculePersoListComponent
} from "./components/vehicule-perso/vehicule-perso-list/vehicule-perso-list.component";
import {VehiculePersoAddComponent} from "./components/vehicule-perso/vehicule-perso-add/vehicule-perso-add.component";
import {
  VehiculePersoModifyComponent
} from "./components/vehicule-perso/vehicule-perso-modify/vehicule-perso-modify.component";
import {
  CovoituragesOrganiseModifyComponent
} from "./components/covoiturages/covoiturages-organise/covoiturages-organise-modify/covoiturages-organise-modify.component";
import { ConfirmationComponent } from './components/covoiturages/confirmation/confirmation.component';


const routes: Routes = [
  {path:'covoituragesConfirmReservation', component: CovoiturageConformationComponent},
  {path:'covoiturages/:id', component:SingleCovoiturageComponent},   //Route avec paramètre dynamique
  {path:'covoiturages', component: CovoiturageListComponent,
    children: [
      {path:'reservations', component: CovoituragesOrganiseListComponent}
    ]},


  {path:'covoituragesOrganises-list', component: CovoituragesOrganiseListComponent},
  {path:'covoituragesOrganises', component: CovoituragesOrganiseComponent,
    children: [
      {path:'list', component: CovoituragesOrganiseListComponent},
      {path:'form', component: CovoituragesOrganiseFormComponent},
      {path:'modify/:id', component: CovoituragesOrganiseModifyComponent}
    ]},
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
  {path:'vehiculeperso', component:VehiculePersoComponent,
  children:[
    {path: "list",component: VehiculePersoListComponent},
    {path: "add",component: VehiculePersoAddComponent},
    {path: "modify/:id",component: VehiculePersoModifyComponent}
  ]
  },
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
