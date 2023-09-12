import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { VehiculePerso } from 'src/app/shared/models/vehicule.perso';
import { VehiculeService } from 'src/app/shared/models/vehicule.service';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';
import { UtilisateursService } from 'src/app/shared/services/utilisateurs.service';
import { VehiculePersoService } from 'src/app/shared/services/vehicule.perso.service';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-single-covoiturage',
  templateUrl: './single-covoiturage.component.html',
  styleUrls: ['./single-covoiturage.component.css']
})
export class SingleCovoiturageComponent {

  title!: string;
  showDetailsInProgress!: boolean;
  covoiturage$!: Observable<Covoiturage>;
  vehiculeObs$!: Observable<VehiculePerso>;
  organisateur$!: Observable<Utilisateur>;
  toto!: number;
  covoitNbrePlacesRestantesCalculees$!: Observable<number>;
  passagers$: Observable<Utilisateur>[];

  passagers!: Utilisateur[];
  listePassagers!: Utilisateur[];

  utilisateur!: Utilisateur
  passagerId!: number[];


  vehiculePerso: VehiculePerso;



  mec$: Observable<Utilisateur>;
  mecsDansBagnole$!: Observable<Utilisateur>[];

  vehicule!: VehiculePerso;

  covoiturage: Covoiturage | undefined;


  /*refection*/
  mochizukiCovoiturage: Covoiturage | undefined;
  mochizukiVehiculePerso: VehiculePerso | undefined;
  mochizukiListePassagers: Utilisateur[] | undefined;
  mochizukiListeIdPassagers: number[] | undefined;
  essaiUser: Utilisateur | undefined;
  tab: string[];
  tableauObs: Observable<any>[];
  arrayOfObservable:any;






  constructor(private covoiturageService: CovoiturageService,
    private vehiculePersoService: VehiculePersoService,
    private utilisateurService: UtilisateursService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tab = new Array();
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

    const covoiturageId = +this.route.snapshot.params['id'];

    let name: string[];
    this.covoiturageService.getCovoiturageById(covoiturageId).subscribe((covoit) => {
      this.mochizukiCovoiturage = covoit;
      
        this.arrayOfObservable = covoit.passagersId.map(idPassager => {
          return this.utilisateurService.findById(idPassager);
        })
        
      


      this.vehiculePersoService.findVpById_Mochizuki(covoit.vehiculePersoId.toString())
        .subscribe(vehicule => this.mochizukiVehiculePerso = vehicule);

    });












    // this.covoiturage$.subscribe((covoit) => {
    //   this.covoiturage = covoit;
    //   console.log("********", this.covoiturage);

    //   this.vehiculeObs$ = this.vehiculePersoService.findVpById_Mochizuki(covoit.vehiculePersoId.toString());
    //   this.vehiculeObs$.subscribe(value => {

    //     this.vehiculePerso = value;
    //     console.log("tttttttt",this.vehiculePerso);
    //   })

    //   console.log("------> ", this.vehiculeObs$);

    //   this.vehiculeObs$.subscribe();


    //this.vehiculeObs$.subscribe(); //Pourquoi il a besoin de ca?

    /*Récupération de la liste des id des passagers*/
    // this.passagerId = covoit.passagersId;
    /*test si on récupère un passager ca fonctionne*/
    // this.mec$ = this.utilisateurService.findById(this.passagerId[0]);


    // this.passagerId.forEach(idPassager => {
    //   let type = this.utilisateurService.findById(idPassager);
    //   console.log("passager dans la voiture");
    //   type.subscribe(value => {
    //     console.log(value)
    // this.mecsDansBagnole$.push(value);
    //   });
    // })
    // console.log("aaaaa",this.vehiculePerso);


    // mec$
    // console.log("affivhage tuilisaeur");


  }





  onShowDetails() {
    if (this.showDetailsInProgress) {
    }
    else
      throw new Error('Covoiturage not found!');
  }

  onClickAnnuler() {
    this.router.navigateByUrl('covoiturages');
  }

  onClickConfirmerParticipation() {
    this.router.navigateByUrl('covoituragesConfirmReservation');
  }

}

