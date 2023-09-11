import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Adresse } from 'src/app/shared/models/adresse';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { CovoiturageService } from '../../../shared/services/covoiturage.service';
import {Subscription} from "rxjs";
import {VehiculePerso} from "../../../shared/models/vehicule.perso";
import {Router} from "@angular/router";

@Component({
  selector: 'app-covoiturages-organise',
  templateUrl: './covoiturages-organise.component.html',
  styleUrls: ['./covoiturages-organise.component.css'],
})
export class CovoituragesOrganiseComponent implements OnInit, OnChanges {
 /* @Input()
  organisateur: Utilisateur = {};*/

  /*@Input()*/
  covoitOrgs: Covoiturage[] | undefined = [];

  /*
  @Input()
  adresseDepart: Adresse | null = null;
  */

  // Variables partagées via le service (observable, suscribe)
  adresseDepart: Adresse = {};
  adresseArrivee: Adresse ={};
  currentUser: Utilisateur = {}
  vehiculesPersoCurrentUser: VehiculePerso[] = [];
  // Fin variables partagées


  covoitOrg: Covoiturage = {};

  private _subscription = new Subscription();
  constructor(private _covoitOrgService: CovoiturageService,
              private _router: Router) {}
  ngOnInit(): void {
    this._init();
    this.reInitCovoitOrg();
    // Subscription aux variables du service
    this._subscription.add(
      this._covoitOrgService.adresseDepart$.subscribe(data => this.adresseDepart = data)
    );
    this._subscription.add(
      this._covoitOrgService.adresseArrivee$.subscribe(data => this.adresseArrivee = data)
    );
    this._subscription.add(
      this._covoitOrgService.currentUser$.subscribe(data => this.currentUser = data)
    );
    this._subscription.add(
      this._covoitOrgService.vehiculesPersoCurrentUser$.subscribe(data => this.vehiculesPersoCurrentUser = data)
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.currentUser);
    if (this.currentUser) {
      this._init();
      this.reInitCovoitOrg();
    }
  }


  private _init() {
    if (this.currentUser.nom != undefined) {
      console.log("_init")
      console.log("User : " + this.currentUser.nom)
      this._covoitOrgService
        .getCovoituragesByOrganisateur(this.currentUser)
        .subscribe((covoitOrgsCreated) => {
          this.covoitOrgs = covoitOrgsCreated;
        });
    }
  }

  reInitCovoitOrg() {
    this.covoitOrg = {};
    this.adresseDepart = {};
    this.adresseArrivee = {};
    //this.covoitOrg.organisateurId = this.currentUser;

  }

/*  create() {
    this.covoitOrg.organisateur = this.currentUser;
    this.covoitOrg.adresseDepart = this.adresseDepart;
    this._covoitOrgService.create(this.covoitOrg).subscribe(() => {
      this.reInitCovoitOrg();
      this._init();
    });
  }*/


  onSubmit(){
   // this.covoitOrg.organisateurId = this.currentUser;
    this.covoitOrg.adresseDepart = this.adresseDepart;
    this.covoitOrg.adresseArrivee = this.adresseArrivee;
    console.log(this.adresseDepart.codePostal);
    console.log(this.covoitOrg.dureeTrajet);
    console.log(this.covoitOrg.distanceKm);
    this._covoitOrgService.create(this.covoitOrg).subscribe(() => {
      console.log("Covoit created");
      this.reInitCovoitOrg();
      this._router.navigateByUrl('covoituragesOrganises-list');
    });
  }

  cancel(){
    this._router.navigateByUrl('covoituragesOrganises-list');
  }
}
