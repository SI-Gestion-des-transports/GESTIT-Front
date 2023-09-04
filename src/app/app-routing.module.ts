import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoituragesReserveComponent } from './components/covoiturages/covoiturages-reserve/covoiturages-reserve.component';
import { CovoituragesListComponent } from './components/covoiturages/covoiturages-list/covoiturages-list.component';
import { CovoituragesReservesListComponent } from './components/covoiturages/covoiturages-reserves-list/covoiturages-reserves-list.component';

const routes: Routes = [
  {path:'covoiturages', component: CovoituragesReservesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
