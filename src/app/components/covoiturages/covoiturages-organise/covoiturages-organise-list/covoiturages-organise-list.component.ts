import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Adresse } from 'src/app/shared/models/adresse';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { CovoiturageService } from '../../../../shared/services/covoiturage.service';
import {forkJoin, Subscription} from "rxjs";
import {VehiculePerso} from "../../../../shared/models/vehicule.perso";
import {Router} from "@angular/router";
import {AdressesService} from "../../../../shared/services/adresses.service";

@Component({
  selector: 'app-covoiturages-organise-list',
  templateUrl: './covoiturages-organise-list.component.html',
  styleUrls: ['./covoiturages-organise-list.component.css']
})
export class CovoituragesOrganiseListComponent {

  covoitOrgs: Covoiturage[] | undefined = [];
  upcomingCovoitOrgsResByUser : Covoiturage [] =[];
  pastCovoitOrgsResByUser : Covoiturage [] =[];

  mergedCovoitArray: Covoiturage [] = [];
  covoitFromDB: Covoiturage [] = [];
  allAdresses: Adresse[] = [];

  // Variables partagées via le service (observable, suscribe)
  adresseDepart: Adresse = {};
  adresseArrivee: Adresse ={};
  currentUser: Utilisateur = {}
  vehiculesPersoCurrentUser: VehiculePerso[] = [];
  currentCovoitOrg : Covoiturage = {};
  covoitOrg: Covoiturage = {};
  covoitByOrganisateur: Covoiturage[] = [];
  // Fin variables partagées
  modifBtn!: boolean;
  upcompingCovoiturages : boolean = true;
  errorMessage: string | null = null;


  private _subscription = new Subscription();


  constructor(private _covoitOrgService: CovoiturageService,
              private _router: Router,
              private _adresseService: AdressesService,
              private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
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
    this._subscription.add(
      this._covoitOrgService.covoiturage$.
      subscribe(data => {
        this.covoitOrg = data;
      })
    );
    this._subscription.add(
      this._covoitOrgService.currentCovoiturage$
        .subscribe(data => {
          this.currentCovoitOrg = data;
        })
    );
    this._subscription.add(
      this._covoitOrgService.covoitByOrganisateur$.subscribe(data => {
        this.covoitByOrganisateur = data
      })
    );
    this.mergedCovoitArray = [];
    this.getIncomingCovoiturages();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
  }


  private _init() {
    //console.log("init")
    if (this.currentUser.nom != undefined) {
      //console.log("user != undefined")
      this._covoitOrgService
        .getCovoituragesByOrganisateur(this.currentUser)
        .subscribe((covoitOrgsCreated) => {
          this.covoitOrgs = covoitOrgsCreated;
        });
      this.mergedCovoitArray = [];
      this.getIncomingCovoiturages();
      this.cdr.detectChanges();
    }
  }

  newCovoitOrg(){
    this._router.navigateByUrl('covoituragesOrganises/form');
  }

  getIncomingCovoiturages(){
    //console.log("TEST");
    this.upcompingCovoiturages = true;
    this.mergedCovoitArray = [];
    forkJoin({
      covoiturages: this._covoitOrgService.findUpcomingCovoituragesByUserId(this.currentUser.id),
      adresses: this._adresseService.findAll()
    }).subscribe(({covoiturages, adresses}) => {
      //console.log(covoiturages);
      //console.log(adresses);
      this.covoitFromDB = covoiturages;
      this.allAdresses = adresses;
      this.mergedCovoitArray = this.mergedCovoituragesWithAdresses();
      this.cdr.detectChanges();
    })

    //this._init();
/*    this._covoitOrgService.findUpcomingCovoituragesByUserId(this.currentUser.id).subscribe(upcomingCovoitOrgRes => {
      console.log(upcomingCovoitOrgRes);
      this.covoitOrgs = upcomingCovoitOrgRes;
    });*/
  }

  getPastCovoiturages(){
    //console.log("TEST");
    this.upcompingCovoiturages = false;
    this.mergedCovoitArray = [];
    forkJoin({
      covoiturages: this._covoitOrgService.findPastCovoituragesByUserId(this.currentUser.id),
      adresses: this._adresseService.findAll()
    }).subscribe(({covoiturages, adresses}) => {
      //console.log(covoiturages);
      //console.log(adresses);
      this.covoitFromDB = covoiturages;
      this.allAdresses = adresses;
      this.mergedCovoitArray = this.mergedCovoituragesWithAdresses();
      this.cdr.detectChanges();
    })
    //this._init();
/*    this._covoitOrgService.findPastCovoituragesByUserId(this.currentUser.id).subscribe(upcomingCovoitOrgRes => {
      console.log(upcomingCovoitOrgRes);
      this.covoitOrgs = upcomingCovoitOrgRes;
    });*/
  }

  updateCovoitOrg(covoitOrgToEdit: Covoiturage){
    if(covoitOrgToEdit.passagersId != null){
      //console.log("UpdateCovoitOrg")
      this._covoitOrgService.updateModifBtn(false);
      this.covoitOrg = covoitOrgToEdit;
      this._covoitOrgService.updateCurrentCovoitOrg(covoitOrgToEdit);
      //this._covoitOrgService.updateCovoitOrg(covoitOrgToEdit);
        this._router.navigateByUrl('covoituragesOrganises/modify/${covoitOrgToEdit.id}');
      //console.log("covoitOrgToEdit numero : ",covoitOrgToEdit.adresseArrivee.numero)
      //console.log("covoitOrgToEdit commune : ",covoitOrgToEdit.adresseArrivee.commune)
      //console.log("covoitOrg numero : ",this.covoitOrg.adresseArrivee.numero)
      //console.log("covoitOrg commune : ",this.covoitOrg.adresseArrivee.commune)
    } else {
      this.errorMessage = "Vous ne pouvez pas modifier ce covoiturage car il a des passagers.";
    }

  }

  deleteCovoitOrg(covoitOrgToDelete: Covoiturage){
    this._covoitOrgService.delete(covoitOrgToDelete).subscribe(() => {
      this.mergedCovoitArray = [];
      this.getIncomingCovoiturages();
      //this._init();
      this.cdr.detectChanges();
      }
    );
  }

  mergedCovoituragesWithAdresses():any[]{
    return this.covoitFromDB.map(covoiturages => {
      const adresseDepart = this.allAdresses.find(ad => ad.id === covoiturages.adresseDepartId);
      const adresseArrivee = this.allAdresses.find(ad => ad.id === covoiturages.adresseArriveeId);
    if (!adresseDepart || !adresseArrivee){
      return covoiturages;
    }
    return {
      ...covoiturages,
      adresseDepart: adresseDepart,
      adresseArrivee: adresseArrivee,
    };
    });
  }

}
