import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';
import { environment } from 'src/environments/environment.development';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {UtilisateursService} from "../../../shared/services/utilisateurs.service";
import {add} from "ngx-bootstrap/chronos";


@Component({
  selector: 'app-single-covoiturage',
  templateUrl: './single-covoiturage.component.html',
  styleUrls: ['./single-covoiturage.component.css']
})
export class SingleCovoiturageComponent {

  title!: string;
  showDetailsInProgress!: boolean;
  covoiturage$!: Observable<Covoiturage>;
  covoiturage!: Covoiturage;
  // Shared attributes
  currentUser: Utilisateur = {};

  private _subscription = new Subscription();
  constructor(private covoiturageService: CovoiturageService,
              private _utilisateurService: UtilisateursService,
              private router: Router,
              private route: ActivatedRoute) { }

/*  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.showDetailsInProgress = false;

    /!* Nota: le typeCast permet, à l'aide du caractère '+', de transformer
    une chaine de caractères qui contient des nombres en numberAttribute. *!/
    const covoiturageId = +this.route.snapshot.params['id'];
    this.covoiturage$ = this.covoiturageService.getCovoiturageById(covoiturageId);
    this.covoiturage$.forEach((covoit)=>{
      covoit.nombrePlacesRestantes = covoit.vehiculePerso.nombreDePlaceDisponibles - covoit.passagers.length;
    });
    this._subscription.add(this._utilisateurService.currentUser$.subscribe(data => {
          this.currentUser = data;
        })
    );
  }*/

  onShowDetails() {
    if (this.showDetailsInProgress) {
    }
    else
      throw new Error('Covoiturage not found!');
  }

  onClickAnnuler()
  {
    this.router.navigateByUrl('covoiturages');
  }

  onClickConfirmerParticipation()
  {
    console.log("SingleCovoitComp —onClickConfirmerParticipation")
    this._subscription.add(
      this.covoiturage$.subscribe(covoit => {
        this.covoiturage = covoit;
        console.log(this.covoiturage)
      })
    );
    console.log("SingleCovoitComp —onClickConfirmerParticipation/ updatePass ?")
    this.updatePass(this.covoiturage);
    console.log("SingleCovoitComp —onClickConfirmerParticipation/ updatePass done !")
    this.router.navigateByUrl('covoituragesConfirmReservation');
  }

  updatePass(covoit: Covoiturage){
    console.log("SingleCovoitComp —updatePass")
    console.log("SingleCovoitComp —updatePass / covoit.passagers : ", covoit.passagers)
    //if (covoit.nombrePlacesRestantes>0){
    covoit.passagers.push(this.currentUser.id)
    console.log("SingleCovoitComp —updatePass / covoit.passagers : ", covoit.passagers)
    this.covoiturageService.updateCovoituragePassager(covoit).subscribe(() => {
        console.log("CovoitOrg uodated");
      });
    //}
  }

}

