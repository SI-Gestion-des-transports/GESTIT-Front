import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Covoiturage} from "../../../../shared/models/covoiturage";
import {Adresse} from "../../../../shared/models/adresse";
import {Utilisateur} from "../../../../shared/models/utilisateur";
import {VehiculePerso} from "../../../../shared/models/vehicule.perso";
import {Subscription} from "rxjs";
import {CovoiturageService} from "../../../../shared/services/covoiturage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-covoiturages-organise-form',
  templateUrl: './covoiturages-organise-form.component.html',
  styleUrls: ['./covoiturages-organise-form.component.css']
})
export class CovoituragesOrganiseFormComponent implements OnInit, OnChanges {

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
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this._init();
    this.reInitCovoitOrg();

  // Récupérez l'ID du covoiturage à partir de la route
    this._activatedRoute.params.subscribe((params) => {
      const covoiturageId = +params['covoiturageId']; // Convertissez en nombre
      if (!isNaN(covoiturageId)) {
        // Chargez les informations du covoiturage à partir de son ID
        this._covoitOrgService.getCovoiturageById(covoiturageId).subscribe((covoiturage) => {
          this.covoitOrg = covoiturage;
          // Pré-remplir les autres champs comme adresseDepart, adresseArrivee, etc.
        });
      }
    });

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
    this.covoitOrg.organisateur = this.currentUser;

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
    this.covoitOrg.organisateur = this.currentUser;
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
