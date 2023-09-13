import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AuthentificationService} from "../../shared/services/authentification.service";
import {HttpHeaders} from "@angular/common/http";
import {UtilisateursService} from "../../shared/services/utilisateurs.service";
import {HttpHeaderService} from "../../shared/services/http-header.service";
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import {environment} from "../../../environments/environment.development";

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
      name: "Mes réservations"
    },
    {
      id: 3,
      name: "Créer un covoiturage"
    },
    {
      id: 4,
      name: "Lister mes covoiturages"
    },
    {
      id: 5,
      name: "Véhicule personnel"
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
  currentUserName:string="(Anonyme)";
  exampleUser!:Utilisateur;

  nomUtilisateurCourant$: Observable<string>;
  IdUtilisateurCourant$ : Observable<number>;


  private _subscription = new Subscription();
  constructor(private router: Router,
              private _utilisateurService: UtilisateursService,
              private _authService: AuthentificationService,
              private _httpHeader:HttpHeaderService)
  { }

  ngOnInit(): void {
    if (window.localStorage.getItem(environment.JWT)) {
      this._authService.verifyJWT().subscribe(res=>{
        if (res.status!=200) {
          window.localStorage.removeItem(environment.JWT)
        }else {
          environment.currentUserName = res.body.nom;
          this.loggedBtn=true;
        };
      })
    }
     /*récupération de la référence de l'observable sur le nom de l'utilisateur courant*/
     this.nomUtilisateurCourant$=this._utilisateurService.currentUserNameSource$;
    
     

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
    this.ngOnChanges();
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
        //console.log(1);
        this.router.navigateByUrl('covoiturages');
        break;
      case '2':
        //console.log(2);
        this.router.navigateByUrl('covoiturages/reservations');
        break;
      case '3':
        //console.log(3);
        this.router.navigateByUrl('covoituragesOrganises/form');
        break;
      case '4':
        //console.log(4);
        this.router.navigateByUrl('covoituragesOrganises/list');
        break;
      case '5':
        //console.log(5);
        this.router.navigateByUrl('vehiculeperso/list');
        break;
      default: throw new Error();
    }
  }

  getVehiculeServiceChoice(event: any) {
    switch (event.target.value) {
      case '1':
        //console.log(1);
        this.router.navigateByUrl('reservationsvs');
        break;
      case '2':
        //console.log(2);
        this.router.navigateByUrl('reservationsvs/form');
        break;
      case '3':
        //console.log(3);
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
        //console.log(1);
        this.router.navigateByUrl('vehiculeService');
        break;
      case '2':
        //console.log(2);
        this.router.navigateByUrl('vehiculeService/add');
        break;
      case '3':
        //console.log(3);
        this.router.navigateByUrl('vehiculeService/list');
        break;
      default: throw new Error();
    }
  }

  login(){
    this.router.navigateByUrl('login');
  }

  logout() {
    console.log("===================into logout()====================");
    this._authService.logout().subscribe(res=> {
      console.log("===================into logout()===================="+res.status);
      if (res.status==200) {
        window.localStorage.removeItem(this._httpHeader.tokenName);
        environment.currentUserName="(Anonyme)";
      }
    });
    this.router.navigateByUrl('')
    this._authService.updateHeaders(new HttpHeaders());
    //console.log("NavComp — logout / currentUserId : ", this.currentUserId);
    this._utilisateurService.updateCurrentUserId(null);
    this._utilisateurService.updateCurrentUserName("");
    this.nomUtilisateurCourant$ = null;
    //console.log("NavComp — logout / currentUserId : ", this.currentUserId);
    //console.log("NavComp — logout / loggedBtn : ",this.loggedBtn);
    this._authService.updateLoggedBtn(false);
    //console.log("NavComp — logout / loggedBtn : ",this.loggedBtn);
  }


  updatenomUtilisateurCourant (){

  }


  // this.router.navigateByUrl('covoiturages');
  protected readonly environment = environment;
}


