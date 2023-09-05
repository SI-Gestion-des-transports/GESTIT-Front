import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CovoiturageFiltrage } from 'src/app/shared/models/CovoiturageFiltrage';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-list',
  templateUrl: './covoiturage-list.component.html',
  styleUrls: ['./covoiturage-list.component.css']
})
export class CovoiturageListComponent implements OnInit {

  covoiturages$!: Observable<Covoiturage[]>;
  covoituragesByIdUser$!: Observable<Covoiturage[]>;
  covoiturageToPush!: Covoiturage;
  value!: number;
  value_str!: string;
  filtrage!: CovoiturageFiltrage;

  




  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {
    this.covoiturages$ = this.covoiturageService.getAllCovoiturages();
    this.covoituragesByIdUser$ = this.covoiturageService.getAllCovoiturages();
    this.filtrage = new CovoiturageFiltrage();
  }

  onKey(event: any) { // without type info
    this.value = +event.target.value;
    this.covoituragesByIdUser$ = this.covoiturageService.getFilteredbyUsersCovoit(this.value);
  }

  onVilleDepart(event: any) { // without type info
    this.value_str = event.target.value;
    if (this.value_str !== "") {
      this.filtrage.isFilteringByVilleDepart = true;
      //this.covoiturages$ = this.covoiturageService.getFilteredbyVilleDepart(this.value_str);
    }
    else {
      this.filtrage.isFilteringByVilleDepart = false;
      //this.covoiturages$ = this.covoiturageService.getAllCovoiturages();
    }
    this.listFiltering();
    
  }

  listFiltering(){
    /*To implement*/
      

  }

  onVilleArrivee(event: any) { // without type info
    this.value_str = event.target.value;
    this.covoiturages$ = this.covoiturageService.getFilteredbyVilleDepart(this.value_str);
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
        /* this.listeCovoiturages.push */
      });
    this.covoiturages$ = this.covoiturageService.getAllCovoiturages();
    // this._init();

    /* private _init() {
  this.covoiturageService.findAll(this.user)
   .subscribe(covoiturages => {
     this.listeCovoiturages = covoiturages;
   }) */

  }
  private _init() {
    this.covoiturageService.getAllCovoiturages();

  }

  onFiltrerUtilisateur() {
    console.log("demande de filtrage");
    this.covoiturages$.pipe(filter(value => value === null));
  }
}



/*  this.covoiturageService.create(this.covoiturageToPush).subscribe(covoiturageReceived => {
   this.createdCovoiturage = covoiturageReceived;});

   console.log("covoiturage créeeeeeeeee");
*/



