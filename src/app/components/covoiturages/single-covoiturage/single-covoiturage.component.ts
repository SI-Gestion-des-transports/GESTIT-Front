import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { VehiculePerso } from 'src/app/shared/models/vehicule.perso';
import { VehiculeService } from 'src/app/shared/models/vehicule.service';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';
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
  vehiculePerso!: VehiculePerso;
  nombrePlacesRestantes!: number;



  constructor(private covoiturageService: CovoiturageService,
    private vehiculePersoService: VehiculePersoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

    /* Nota: le typeCast permet, à l'aide du caractère '+', de transformer
    une chaine de caractères qui contient des nombres en numberAttribute. */
    const covoiturageId = +this.route.snapshot.params['id'];
    this.covoiturage$ = this.covoiturageService.getCovoiturageById(covoiturageId);
    this.covoiturage$.forEach((covoit) => {
      console.log("******Affichage****covoit");
      console.log(covoit);
      console.log(covoit.vehiculePersoId.toString());
      this.vehiculeObs$ = this.vehiculePersoService.findVpById(covoit.vehiculePersoId.toString());
      this.vehiculeObs$.subscribe((vehicule) => {
        console.log("******Affichage****vehicule");
        console.log(vehicule);
        this.vehiculePerso = vehicule;
        this.nombrePlacesRestantes = vehicule.nombreDePlaceDisponibles - covoit.passagers.length;
        console.log("******Affichage****covoit");
        console.log(this.vehiculePerso);

      });
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

