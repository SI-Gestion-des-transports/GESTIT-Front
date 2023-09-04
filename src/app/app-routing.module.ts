import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoiturageComponent } from './components/zorro/covoiturage/covoiturage.component';
import { ListeZorroComponent } from './components/zorro/liste-zorro/liste-zorro.component';
import { CovoiturageListComponent } from './components/zorro/covoiturage-list/covoiturage-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleCovoiturageComponent } from './components/zorro/single-covoiturage/single-covoiturage.component';

const routes: Routes = [
  {path:'covoiturages/:id', component:SingleCovoiturageComponent},   //Route avec paramètre dynamique
  {path:'covoiturages', component: CovoiturageListComponent},
  {path:'', component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
