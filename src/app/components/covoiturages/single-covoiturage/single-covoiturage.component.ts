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
  passagers$:Observable<Utilisateur>[];
  
  passagers!:Utilisateur[];



  vehiculePerso!: VehiculePerso;




  constructor(private covoiturageService: CovoiturageService,
    private vehiculePersoService: VehiculePersoService,
    private utilisateurService: UtilisateursService,
    private router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

    /* Nota: le typeCast permet, à l'aide du caractère '+', de transformer
    une chaine de caractères qui contient des nombres en numberAttribute. */
    const covoiturageId = +this.route.snapshot.params['id'];
    this.covoiturage$ = this.covoiturageService.getCovoiturageById(covoiturageId);
    this.covoiturage$.subscribe((covoit) => {
      this.vehiculeObs$ = this.vehiculePersoService.findVpById(covoit.vehiculePersoId.toString());
      // covoit.passagersId.forEach(idPassager=>{
      //   this.passagers$.push(this.utilisateurService.findById(idPassager));
      //   console.log(this.passagers$);
      // })
      this.vehiculeObs$.subscribe((vehicule) => {
        /*On recrée un observable à l'aide de pipe.
        il y a un problème d'asynchronicité ici.
        Le mécanisme de pipe.map() marche très bien, c'est le véhicule perso qu'il 
        n'arrive pas à hydrater ici.
        Je commente pour l'instant et laisse covoit.nbreDePlaceRestantes mais ce n'est pas bon
        il faut trouver le problème, le nombre de places restantes doit être calculé*/
        //this.covoitNbrePlacesRestantesCalculees$ = this.covoiturage$.pipe(map(covoit => covoit.nombrePlacesRestantes = vehicule.nombreDePlaceDisponibles - covoit.passagers.length));
      });
      this.organisateur$ = this.utilisateurService.findById(covoit.organisateurId);
      
    })

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

