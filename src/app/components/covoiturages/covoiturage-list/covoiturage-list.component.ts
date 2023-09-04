import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-list',
  templateUrl: './covoiturage-list.component.html',
  styleUrls: ['./covoiturage-list.component.css']
})
export class CovoiturageListComponent implements OnInit {
  listeCovoiturages: Covoiturage[] = [];
  createdCovoiturage!: Covoiturage;
  covoiturageToPush!: Covoiturage;


  /*  Observable<Covoiturage[]> toto;
   covoituragesAinserer!:Covoiturage[]; */

  /*Injection du service dans le composant*/
  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {
    this.covoiturageService.findAll().subscribe(covoiturageReceived => {
      this.listeCovoiturages = covoiturageReceived;
    })

  }

  onCreateCovoiturage(): void {
    this.covoiturageToPush = {
      "nombrePlacesRestantes": 45,
      "dureeTrajet": 45,
      "distanceKm": 99,
      "adresseDepart": "1 place du menuet dansant 78350 Noisy les ardillons",
      "adresseArrivee": "87 avenue de Maupassant 23000 Guéret"
    }

    this.covoiturageService
      .create(this.covoiturageToPush)
      .subscribe(() => {
        this.listeCovoiturages.push
      });
      this._init();


  }

  private _init() {
    this.covoiturageService.findAll()
    .subscribe(covoiturages => {
      this.listeCovoiturages = covoiturages;
    })
  }

  /*  this.covoiturageService.create(this.covoiturageToPush).subscribe(covoiturageReceived => {
     this.createdCovoiturage = covoiturageReceived;});
 
     console.log("covoiturage créeeeeeeeee");
*/


}


