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
import { CovoiturageService } from '../../../../shared/services/covoiturage.service';
import {Subscription} from "rxjs";
import {VehiculePerso} from "../../../../shared/models/vehicule.perso";
import {Router} from "@angular/router";

@Component({
  selector: 'app-covoiturages-organise-list',
  templateUrl: './covoiturages-organise-list.component.html',
  styleUrls: ['./covoiturages-organise-list.component.css']
})
export class CovoituragesOrganiseListComponent {

  covoitOrgs: Covoiturage[] | undefined = [];
  upcomingCovoitOrgsResByUser : Covoiturage [] =[];
  pastCovoitOrgsResByUser : Covoiturage [] =[];

  // Variables partagées via le service (observable, suscribe)
  adresseDepart: Adresse = {};
  adresseArrivee: Adresse ={};
  currentUser: Utilisateur = {}
  vehiculesPersoCurrentUser: VehiculePerso[] = [];
  // Fin variables partagées
  modifBtn!: boolean;
  upcompingCovoiturages : boolean = true;


  covoitOrg: Covoiturage = {};

  private _subscription = new Subscription();
  constructor(private _covoitOrgService: CovoiturageService,
              private _router: Router) {}
  ngOnInit(): void {
    this._init();
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

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
  }


  private _init() {
    if (this.currentUser.nom != undefined) {
      this._covoitOrgService
        .getCovoituragesByOrganisateur(this.currentUser)
        .subscribe((covoitOrgsCreated) => {
          this.covoitOrgs = covoitOrgsCreated;
        });

      this.upcompingCovoiturages =true;
      this._covoitOrgService.findUpcomingCovoituragesByUserId(this.currentUser.id).subscribe(upcomingCovoitOrgRes => this.upcomingCovoitOrgsResByUser = upcomingCovoitOrgRes)
    }
  }

  newCovoitOrg(){
    this._covoitOrgService.update({})
    this._router.navigateByUrl('covoituragesOrganises/list');
  }

  getIncomingReservations(){
    this._init();
  }

  updateCovoitOrg(covoitOrgToEdit: Covoiturage){
    this._covoitOrgService.updateModifBtn(false);
    this._covoitOrgService.updateCurrentCovoitOrg(covoitOrgToEdit);
    //this._covoitOrgService.updateCovoitOrg(covoitOrgToEdit);
    //this._router.navigateByUrl('covoituragesOrganises/form/${covoitOrgToEdit.id}');
  }

  deleteCovoitOrg(covoitOrgToDelete: Covoiturage){
    this._covoitOrgService.delete(covoitOrgToDelete).subscribe(() => {
      this._init();
      }
    );
  }



}
