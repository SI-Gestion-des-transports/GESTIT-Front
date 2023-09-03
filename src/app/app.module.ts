import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { CovoituragesComponent } from './components/covoiturages/covoiturages.component';
import { CovoituragesListComponent } from './components/covoiturages/covoiturages-list/covoiturages-list.component';
import { CovoituragesItemComponent } from './components/covoiturages/covoiturages-item/covoiturages-item.component';
import { CovoituragesFormComponent } from './components/covoiturages/covoiturages-form/covoiturages-form.component';
import { CovoituragesVehiculePersoComponent } from './components/covoiturages/covoiturages-vehicule-perso/covoiturages-vehicule-perso.component';
import { CovoituragesOrganiseComponent } from './components/covoiturages/covoiturages-organise/covoiturages-organise.component';
import { CovoituragesReserveComponent } from './components/covoiturages/covoiturages-reserve/covoiturages-reserve.component';
import { ReservationVsComponent } from './components/reservation-vs/reservation-vs.component';
import { ReservationVsListComponent } from './components/reservation-vs/reservation-vs-list/reservation-vs-list.component';
import { ReservationVsItemComponent } from './components/reservation-vs/reservation-vs-item/reservation-vs-item.component';
import { ReservationVsFormComponent } from './components/reservation-vs/reservation-vs-form/reservation-vs-form.component';
import { VehiculeServiceComponent } from './components/vehicule-service/vehicule-service.component';
import { VehiculeServiceListComponent } from './components/vehicule-service/vehicule-service-list/vehicule-service-list.component';
import { VehiculeServiceItemComponent } from './components/vehicule-service/vehicule-service-item/vehicule-service-item.component';
import { VehiculeServiceFormComponent } from './components/vehicule-service/vehicule-service-form/vehicule-service-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    LoginComponent,
    MainComponent,
    AuthentificationComponent,
    CovoituragesComponent,
    CovoituragesListComponent,
    CovoituragesItemComponent,
    CovoituragesFormComponent,
    CovoituragesVehiculePersoComponent,
    CovoituragesOrganiseComponent,
    CovoituragesReserveComponent,
    ReservationVsComponent,
    ReservationVsListComponent,
    ReservationVsItemComponent,
    ReservationVsFormComponent,
    VehiculeServiceComponent,
    VehiculeServiceListComponent,
    VehiculeServiceItemComponent,
    VehiculeServiceFormComponent,
    FooterComponent,
    UtilisateursComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  /*Insertion de la locale française pour le formatage des dates*/
  providers: [ { provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(){
    registerLocaleData(fr.default);
  }
}
