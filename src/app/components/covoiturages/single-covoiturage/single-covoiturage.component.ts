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
import { add} from "ngx-bootstrap/chronos";

/**
 * Regroupe toutes les fonctions d'affichage  d'un covoiturage avec confirmation de réservation
 * @author Atsuhiko Mochizuki
 */

@Component({
  selector: 'app-single-covoiturage',
  templateUrl: './single-covoiturage.component.html',
  styleUrls: ['./single-covoiturage.component.css']
})
export class SingleCovoiturageComponent {

  nomUtilisateurCourant$: Observable<string>;
  idUtilisateurCourant$: Observable<number>;
  currentUser: Utilisateur = {};

  covoiturageAconfirmer!: Covoiturage;
  title!: string;
  showDetailsInProgress!: boolean;
  organisateur!: Utilisateur;
  observableListePassagers!: Observable<Utilisateur[]>;
  vehiculeForCovoiturage!: VehiculePerso;
  nombreDePlacesRestances!: number;

  /*Injection des services*/
  constructor(private covoiturageService: CovoiturageService,
    private vehiculePersoService: VehiculePersoService,
    private utilisateurService: UtilisateursService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    /*récupération de la référence de l'observable sur le nom de l'utilisateur courant*/
    this.nomUtilisateurCourant$ = this.utilisateurService.currentUserNameSource$;

    /*récupération de la référence de l'observable sur l'id de l'utilisateur courant*/
    this.idUtilisateurCourant$ = this.utilisateurService.currentIdUser$;
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

    const covoiturageId = +this.route.snapshot.params['id'];  /*L'opérateur '+' effectue un cast*/

    this.covoiturageService.getCovoiturageById(covoiturageId)
      .subscribe((covoit) => {


        /*récupération du covoiturage depuis son Observable*/
        this.covoiturageAconfirmer = covoit;

        /*Récupération de l'organisateur*/
        this.utilisateurService.findById(covoit.organisateurId)
          .subscribe(user => this.organisateur = user);

        /*récupération d'un Observable de la liste des Passagers à partir de la liste des ids*/
        this.observableListePassagers = this.getObservableOfPassengersList(covoit.passagersId);

        /*Récupération du véhicule sur lequel s'opère le covoiturage*/
        this.vehiculePersoService.findVpById(covoit.vehiculePersoId.toString())
          .subscribe(vehicule => {
            this.vehiculeForCovoiturage = vehicule;
            /*Calcul du nombre de places restantes*/
            this.nombreDePlacesRestances = vehicule.nombreDePlaceDisponibles - covoit.passagersId.length;
          });
      });
  }

  /**
   * Récupère à partir d'un tableau d'identifiants passagers, les données correspondant à chaque
   * utilisateur correspondant à l'id.
   * La fonction combineLatest de rxjs permet de renvoyer un Observable du tableau d'utilisateur
   * généré.
   * Le contenu de ce dernier pourra donc être directement affiché dans le template à l'aide
   * du pipe async.
   * exemple : <div *ngFor="let passager of observableListePassagers | async">{{passager.nom}}</div>.
   *
   * @param listIdPassagers
   * @returns
   */
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
    if (this.nombreDePlacesRestances < 1)
      throw new Error("Le nombre de places restantes pour le covoiturage ne devrait pas être inférieur à 1");

    this.idUtilisateurCourant$
      .subscribe(id => {
        this.covoiturageAconfirmer.passagersId.push(id);
        this.covoiturageService.update(this.covoiturageAconfirmer);
      });
  }

  updatePass(covoit: Covoiturage){
    //console.log("SingleCovoitComp —updatePass")
    //console.log("SingleCovoitComp —updatePass / covoit : ", covoit)
    //if (covoit.nombrePlacesRestantes>0){
    covoit.passagersId.push(this.currentUser.id)
    //console.log("SingleCovoitComp —updatePass / covoit : ", covoit)
    this.covoiturageService.updateCovoituragePassager(covoit).subscribe(() => {
      //console.log("CovoitOrg uodated");
      });
    //}
  }

}

