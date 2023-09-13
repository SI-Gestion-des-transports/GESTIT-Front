import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Covoiturage} from "../../../../shared/models/covoiturage";
import {Adresse} from "../../../../shared/models/adresse";
import {Utilisateur} from "../../../../shared/models/utilisateur";
import {VehiculePerso} from "../../../../shared/models/vehicule.perso";
import {Observable, Subscription} from "rxjs";
import {CovoiturageService} from "../../../../shared/services/covoiturage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VehiculeService} from "../../../../shared/models/vehicule.service";
import {VehiculePersoService} from "../../../../shared/services/vehicule.perso.service";
import {ReservationVs} from "../../../../shared/models/reservation.vs";
import {UtilisateursService} from "../../../../shared/services/utilisateurs.service";
import {AdressesService} from "../../../../shared/services/adresses.service";
import {CovoiturageCreate} from "../../../../shared/models/covoiturageCreate";

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
  listVehiculePerso: VehiculePerso[] = [];
  selectedVehiculePerso: VehiculeService = {};
  selectedVehiculePersoId: number;

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
  currentUserId: number;
  // Fin variables partagées



  private _subscription = new Subscription();
  constructor(private _covoitOrgService: CovoiturageService,
              private _router: Router,
              private _vehiculePersoService:VehiculePersoService,
              private _utilisateurService: UtilisateursService,
              private _adresseService: AdressesService) {}

  ngOnInit(): void {
    this.currentUserId = this._utilisateurService.getSharedCurrentUserId();
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
      this._covoitOrgService.vehiculesPersoCurrentUser$.subscribe(data => {
        this.vehiculesPersoCurrentUser = data
      })
    );
    this._subscription.add(
      this._covoitOrgService.currentCovoiturage$
        .subscribe(data => {
          this.currentCovoitOrg = data;
        })
    );
    this._vehiculePersoService.findAllVP().subscribe(res=>{
      this.listVehiculePerso =res;
      if (this.listVehiculePerso.length !=0) {
        this.selectedVehiculePerso = this.listVehiculePerso[0];
      }
    });
    this._init();
    this.reInitCovoitOrg()
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.currentUser);
    if (this.currentUser) {
      this._init();
      this.reInitCovoitOrg();
    }
  }

  ngOnDestroy(){
    //console.log("Enter DESTROY")
    this._subscription.unsubscribe();
    //console.log("Destroy ———— UNSUSCRIBED —————")
  }


  private _init() {
    if (this.currentUser.nom != undefined) {
      //console.log("_init")
      //console.log("User : " + this.currentUser.nom)
/*      this._covoitOrgService
        .getCovoituragesByOrganisateur(this.currentUser)
        .subscribe((covoitOrgsCreated) => {
          this.covoitOrgs = covoitOrgsCreated;
        });*/
      //console.log("currentCovoitOrg : ", this.currentCovoitOrg.adresseDepart.commune)
      //console.log("currentCovoitOrg : ", this.currentCovoitOrg.adresseDepart.numero)
      this.adresseDepart = this.currentCovoitOrg.adresseDepart;
      //console.log("adresseDepart : ", this.adresseDepart.commune)
      //console.log("adresseDepart : ", this.adresseDepart.numero)
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
      this.create(this.currentCovoitOrg);
    /*this.covoitOrg.organisateurId = this.currentUser.id;
    this.covoitOrg.adresseDepart = this.adresseDepart;
    this.covoitOrg.adresseArrivee = this.adresseArrivee;
    console.log(this.adresseDepart.codePostal);
    console.log(this.covoitOrg.dureeTrajet);
    console.log(this.covoitOrg.distanceKm);
      this._covoitOrgService.create(this.covoitOrg).subscribe(() => {
        console.log("Covoit created");
        this.reInitCovoitOrg();
        this._router.navigateByUrl('covoituragesOrganises-list');
      });*/
    } else {
      this.updateOrg(this.currentCovoitOrg);
/*      this.covoitOrg.organisateurId = this.currentUser.id;
      this.covoitOrg.adresseDepart = this.adresseDepart;
      this.covoitOrg.adresseArrivee = this.adresseArrivee;
      this._covoitOrgService.updateCovoiturageOrganise(this.currentCovoitOrg).subscribe(() => {
        console.log("CovoitOrg uodated");
        this.reInitCovoitOrg();
        this._router.navigateByUrl('covoituragesOrganises-list');
      });*/
    }
  }
  create(covoit: CovoiturageCreate){
    covoit.organisateurId = parseInt(String(this.currentUserId), 10);
    /*
    covoit.adresseDepart = this.adresseDepart;
    covoit.adresseArrivee = this.adresseArrivee;
    */
    covoit.vehiculePersoId = parseInt(String(this.selectedVehiculePersoId), 10);
    /*
    console.log("this.selectedVehiculePersoId.valueOf() typeof : ",typeof(this.selectedVehiculePersoId.valueOf()));
    console.log("this.selectedVehiculePersoId.parseInt() typeof : ",typeof(parseInt(String(this.selectedVehiculePersoId), 10)));
    */
    covoit.distanceKm = this.covoitOrg.distanceKm;
    covoit.dureeTrajet = this.covoitOrg.dureeTrajet;
    //console.log("covoit : ", covoit);
    //console.log("covoit.dateDepart : ", covoit.dateDepart);
    covoit.dateDepart = this.covoitOrg.dateDepart;
    //console.log("covoit.dateDepart : ", covoit.dateDepart);

     if (this.adresseDepart && this.adresseArrivee) {

       const observer = new Observable<boolean>(response =>{
        this._adresseService
         .create(this.adresseDepart)
         .subscribe((adresse) => {
           //console.log("adresseDepart", adresse);
           covoit.adresseDepartId = adresse.id;
           //console.log("covoiturageCreated.adresseDepart : ", covoit.adresseDepartId);

           /// 2E subscribe
            this._adresseService
             .create(this.adresseArrivee)
             .subscribe((adresse) => {
               //console.log("adresseArrivee", adresse);
               covoit.adresseArriveeId = adresse.id;
               //console.log("covoiturageCreated.adresseArrivee : ", covoit.adresseArriveeId);

               //// 3E Subscribe
                this._vehiculePersoService.findVpById(this.selectedVehiculePersoId.toString()).subscribe(data =>{
                  //console.log("covoit.nombrePlacesRestantes : ", covoit.nombrePlacesRestantes);
                  covoit.nombrePlacesRestantes = data.nombreDePlaceDisponibles-1;
                  //console.log("covoit.nombrePlacesRestantes : ", covoit.nombrePlacesRestantes);

                  response.next(true);
                  response.complete();

                // FIN 3E SUB
                })
                /*
                console.log(this.adresseDepart.codePostal);
                console.log(this.covoitOrg.dureeTrajet);
                console.log(this.covoitOrg.distanceKm);
                */
            // FIN 2E SUB
             });
           //console.log("Cov Org Form — Create / covoit after adresses : ", covoit)

          // FIN 1ER SUB
         });

       });

       observer.subscribe(response => {
         //console.log("Cov Org Form — Create / covoit before Srv call : ", covoit);
          this._covoitOrgService.create(covoit).subscribe((data) => {
            //console.log("Covoit created : ", data);
            this.reInitCovoitOrg();
            this._router.navigateByUrl('covoituragesOrganises-list');
        });
       })

     } else {
       console.log("ADRESSES INCORRECTES")
       return null;
     }
    /*
    console.log("covoit : ", covoit);
    console.log("this.selectedVehiculePersoId : ",this.selectedVehiculePersoId);
    console.log("this.selectedVehiculePersoId typeof : ",typeof(this.selectedVehiculePersoId));
    */
  }

  updateOrg(covoit: Covoiturage) {
    covoit.organisateurId = this.currentUser.id;
    covoit.adresseDepart = this.adresseDepart;
    covoit.adresseArrivee = this.adresseArrivee;
    covoit.vehiculePersoId = this.selectedVehiculePerso.id;
    this._covoitOrgService.updateCovoiturageOrganise(covoit).subscribe(() => {
      //console.log("CovoitOrg uodated");
      this.reInitCovoitOrg();
      this._router.navigateByUrl('covoituragesOrganises-list');
    });
  }



  cancel(){
    this._router.navigateByUrl('covoituragesOrganises-list');
  }

  private reformatDate(covoit: Covoiturage): Covoiturage {
    covoit.dateDepart = covoit.dateDepart.toString().slice(0, 16);
    //console.log("reformatDate / covoit.dateDepart : ", covoit.dateDepart);
    return covoit;
  }


}
