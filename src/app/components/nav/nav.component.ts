import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  covoiturageChoicies = [
    {
      id: 1,
      name: "Participer à un covoiturage"
    },
    {
      id: 2,
      name: "Organiser un covoiturage"
    }
  ]

  ReservationsVehiculeServiceChoicies = [
    {
      id: 1,
      name: "Mes réservations"
    },
    {
      id: 2,
      name: "Réserver un véhicule"
    }
  ]



  constructor(private router: Router) { }

  getCovoiturageChoice(event: any) {
    switch (event.target.value) {
      case '1':
        this.router.navigateByUrl('covoiturages');
        break;
      case '2': console.log(2);
        this.router.navigateByUrl('covoituragesOrganises');
        break;
      default: throw new Error();
    }
  }

  getVehiculeServiceChoice(event: any) {
    switch (event.target.value) {
      case '1':
        this.router.navigateByUrl('vehiculeService');
        break;
      case '2': console.log(2);
        this.router.navigateByUrl('reservationsvs');
        break;
      default: throw new Error();
    }
  }

  



  // this.router.navigateByUrl('covoiturages');
}


