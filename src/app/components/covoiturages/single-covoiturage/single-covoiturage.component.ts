import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, forkJoin, map, switchMap } from 'rxjs';
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

  /*refection*/
  mochizukiCovoiturage: Covoiturage | undefined;
  title!: string;
  showDetailsInProgress!: boolean;
  ObservableListePassagers: Observable<Utilisateur[]> | undefined;
  mochizukiVehiculePerso: VehiculePerso | undefined;


  constructor(private covoiturageService: CovoiturageService,
    private vehiculePersoService: VehiculePersoService,
    private utilisateurService: UtilisateursService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

    const covoiturageId = +this.route.snapshot.params['id'];  /*L'opérateur '+' effectue un cast*/

    this.covoiturageService.getCovoiturageById(covoiturageId).subscribe((covoit) => {
      /*récupération du covoiturage depuis son Observable*/
      this.mochizukiCovoiturage = covoit;

      /*récupération d'un Observable de la liste des Passagers à partir de la liste des ids*/
      this.ObservableListePassagers = this.getObservableOfPassengersList(covoit.passagersId);

      /*Récupération du véhicule sur lequel s'opère le covoiturage*/
      this.vehiculePersoService.findVpById_Mochizuki(covoit.vehiculePersoId.toString())
        .subscribe(vehicule => this.mochizukiVehiculePerso = vehicule);
    });
  }



  getObservableOfPassengersList(listIdPassagers: number[]): Observable<Utilisateur[]> {
    const arrayOfObservables = listIdPassagers.map(idPassager => {
      return this.utilisateurService.findById(idPassager);
    });
    return combineLatest(arrayOfObservables);
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

