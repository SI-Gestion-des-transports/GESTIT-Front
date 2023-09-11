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
  currentCovoitOrg : Covoiturage = {};
  covoitOrg: Covoiturage = {};
  // Fin variables partagées



  private _subscription = new Subscription();
  constructor(private _covoitOrgService: CovoiturageService,
              private _router: Router) {}
  ngOnInit(): void {

    //this.reInitCovoitOrg();

    // Subscription aux variables du service
    this._subscription.add(
      this._covoitOrgService.covoiturage$.
      subscribe(data => {
        this.covoitOrg = data;
      })
    );
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
    this._subscription.add(
      this._covoitOrgService.currentCovoiturage$
        .subscribe(data => {
          this.currentCovoitOrg = data;
        })
    );
    this._init();
    this.reInitCovoitOrg()

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.currentUser);
    if (this.currentUser) {
      this._init();
      this.reInitCovoitOrg();
    }
  }

  ngOnDestroy(){
    console.log("Enter DESTROY")
    this._subscription.unsubscribe();
    console.log("Destroy ———— UNSUSCRIBED —————")
  }


  private _init() {
    if (this.currentUser.nom != undefined) {
      console.log("_init")
      console.log("User : " + this.currentUser.nom)
/*      this._covoitOrgService
        .getCovoituragesByOrganisateur(this.currentUser)
        .subscribe((covoitOrgsCreated) => {
          this.covoitOrgs = covoitOrgsCreated;
        });*/
      console.log("currentCovoitOrg : ", this.currentCovoitOrg.adresseDepart.commune)
      console.log("currentCovoitOrg : ", this.currentCovoitOrg.adresseDepart.numero)
      this.adresseDepart = this.currentCovoitOrg.adresseDepart;
      console.log("adresseDepart : ", this.adresseDepart.commune)
      console.log("adresseDepart : ", this.adresseDepart.numero)
      this.adresseArrivee = this.currentCovoitOrg.adresseArrivee;
    }
  }

  reInitCovoitOrg() {
    this.covoitOrg = {};
    this.currentCovoitOrg = {};
    this.adresseDepart = {};
    this.adresseArrivee = {};
    this.covoitOrg.organisateurId = this.currentUser.id;

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
    if(!this.currentCovoitOrg.id){
    this.covoitOrg.organisateurId = this.currentUser.id;
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
    } /*else {
      this.covoitOrg.organisateur = this.currentUser;
      this.covoitOrg.adresseDepart = this.adresseDepart;
      this.covoitOrg.adresseArrivee = this.adresseArrivee;
      this._covoitOrgService.update(this.currentCovoitOrg).subscribe(() => {
        console.log("CovoitOrg uodated");
        this.reInitCovoitOrg();
        this._router.navigateByUrl('covoituragesOrganises-list');
      });
    }*/

  }

  cancel(){
    this._router.navigateByUrl('covoituragesOrganises-list');
  }

}
