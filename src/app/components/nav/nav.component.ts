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
      name: "Réserver un covoiturage"
    },
    {
      id: 2,
      name: "Empty"
    },
    {
      id: 3,
      name: "Organisation"
    },
    {
      id: 4,
      name: "Créer un covoit"
    },
    {
      id: 5,
      name: "Lister mes covoits"
    }
  ]

  ReservationsVehiculeServiceChoicies = [
    {
      id: 1,
      name: "Véhicule de société"
    },
    {
      id: 2,
      name: "Réserver un véhicule"
    },
    {
      id: 3,
      name: "Mes réservations"
    }
  ]


  VehiculeServiceChoicies = [
    {
      id: 1,
      name: "Véhicule de société"
    },
    {
      id: 2,
      name: "Créer un véhicule"
    },
    {
      id: 3,
      name: "Gérer le parc"
    }
  ]

  constructor(private router: Router) { }

  getCovoiturageChoice(event: any) {
    switch (event.target.value) {
      case '1':
        this.router.navigateByUrl('covoiturages');
        break;
      case '2': console.log(2);
        this.router.navigateByUrl('');
        break;
      case '3':
        this.router.navigateByUrl('covoituragesOrganises');
        break;
      case '4': console.log(2);
        this.router.navigateByUrl('covoituragesOrganises/form');
        break;
      case '5': console.log(2);
        this.router.navigateByUrl('covoituragesOrganises/list');
        break;
      default: throw new Error();
    }
  }

  getVehiculeServiceChoice(event: any) {
    switch (event.target.value) {
      case '1':
        this.router.navigateByUrl('reservationsvs');
        break;
      case '2': console.log(2);
        this.router.navigateByUrl('reservationsvs/form');
        break;
      case '3': console.log(2);
        this.router.navigateByUrl('reservationsvs/list');
        break;
      default: throw new Error();
    }
  }  getCovoitOrgChoice(event: any) {
    switch (event.target.value) {
      case '1':
        this.router.navigateByUrl('covoituragesOrganises');
        break;
      case '2': console.log(2);
        this.router.navigateByUrl('covoituragesOrganises/form');
        break;
      case '3': console.log(2);
        this.router.navigateByUrl('covoituragesOrganises/list');
        break;
      default: throw new Error();
    }
  }

  getServiceChoice(event: any) {
    switch (event.target.value) {
      case '1':
        this.router.navigateByUrl('vehiculeService');
        break;
      case '2': console.log(2);
        this.router.navigateByUrl('vehiculeService/add');
        break;
      case '3': console.log(2);
        this.router.navigateByUrl('vehiculeService/list');
        break;
      default: throw new Error();
    }
  }

  login(){
    this.router.navigateByUrl('login');
  }




  // this.router.navigateByUrl('covoiturages');
}


