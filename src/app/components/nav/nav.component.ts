import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Subscription} from "rxjs";
import {AuthentificationService} from "../../shared/services/authentification.service";
import {HttpHeaders} from "@angular/common/http";
import {UtilisateursService} from "../../shared/services/utilisateurs.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

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




  // Données partagées : subscribe from services
  loggedBtn: boolean = false;
  currentUserId: number = null;


  private _subscription = new Subscription();
  constructor(private router: Router,
              private _utilisateurService: UtilisateursService,
              private _authService: AuthentificationService)
  { }

  ngOnInit(): void {
    this._subscription.add(
      this._utilisateurService.currentIdUser$
        .subscribe(data => {
          this.currentUserId = data;
        })
    );
    this._subscription.add(
      this._authService.loggedBtn$.subscribe(data =>{
        this.loggedBtn = data;
      })
    )
  }

  ngOnChanges(){
/*    if(this.currentUserId != null){
      console.log("NavComp — ngOnChanges / this.currentUserId : ",this.currentUserId);
      console.log("NavComp — ngOnChanges / loggedBtn : ",this.loggedBtn);
      this._authService.updateLoggedBtn(true);
      console.log("NavComp — ngOnChanges / loggedBtn : ",this.loggedBtn);
    }
    if (this.currentUserId == null){
      console.log("NavComp — ngOnChanges / this.currentUserId : ",this.currentUserId);
      console.log("NavComp — ngOnChanges / loggedBtn : ",this.loggedBtn);
      this._authService.updateLoggedBtn(false);
      console.log("NavComp — ngOnChanges / loggedBtn : ",this.loggedBtn);
    }*/
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

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

  logout() {
    console.log("NavComp — logout");
    this._authService.logout();
    this.router.navigateByUrl('')
    this._authService.updateHeaders(new HttpHeaders());
    console.log("NavComp — logout / currentUserId : ", this.currentUserId);
    this._utilisateurService.updateCurrentUserId(null);
    console.log("NavComp — logout / currentUserId : ", this.currentUserId);
    console.log("NavComp — logout / loggedBtn : ",this.loggedBtn);
    this._authService.updateLoggedBtn(false);
    console.log("NavComp — logout / loggedBtn : ",this.loggedBtn);
  }




  // this.router.navigateByUrl('covoiturages');
}


