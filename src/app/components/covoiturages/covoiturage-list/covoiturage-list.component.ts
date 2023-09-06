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

  filtrage!: CovoiturageFiltrage;
  listeAafficher: Array<Covoiturage>;

  disabled:boolean;

  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {
    this.filtrage = new CovoiturageFiltrage();
    let listeToShow = this.covoiturageService.recupListeCovoituragesOnServer()
      .then(res => this.listeAafficher = res);
    this.disabled=true;
  }

  async onVilleDepart(event: any) {
    this.filtrage.filter_VilleDepart_Value = event.target.value;
    this.filtrageListe();

  }

  async filtrageListe() {
    let completListOfCovoiturages;

    if (this.filtrage.filter_VilleDepart_Value !== "") {
      completListOfCovoiturages = await this.covoiturageService.recupListeCovoituragesOnServer();
      this.listeAafficher = completListOfCovoiturages.filter(covoit => covoit.adresseDepart === this.filtrage.filter_VilleDepart_Value); 
      if(this.listeAafficher.length>0)
        this.disabled = false;
      else
        this.disabled = true;
    }
    else {
      this.listeAafficher = await this.covoiturageService.recupListeCovoituragesOnServer();
      this.disabled = true;
    }
  }

  onVilleArrivee(event: any) {
    this.filtrage.filter_VilleArrivee_value = event.target.value;
    this.filtrage.filter_VilleDepart_Value = '';
  }


  listFiltering(filtres: CovoiturageFiltrage) {
    console.log("Lancement du filtrage dans listFiltering");
    /*Pipe permet d'accéder à la liste de covoiturage encapsulée dans l'observable.
      - l'opérateur primitif map permet d'executer une action sur chaque membre du tableau
      - l'opérateur primitif filter permet de garder tout itération dans la mesure où 
        la condition qui lui est fournie en paramètres est true.
    En résumé:
      1 - getAllCovoiturage renvoit la liste de tous les covoiturages enregistrés en base
      2 - Pour chaque covoiturage, un lance un filtrage par l'intermédiaire de map, afin de
      garder ou d"écarter l'occurence selon la condition précisée à filter().
   listeFiltree : this.covoiturageService.getAllCovoiturages()*/
    // listeFiltree: Covoiturage[] = this.covoiturageService.getAllCovoiturages()
    //                               .pipe(map(res=>res.filter(res=> res.dateDepart === this.filtrage.)));

    /* ca marche*/
    // if (this.filtrage.filter_VilleDepart_Value !== "") {
    //   this.covoiturages$ = this.covoiturageService.getAllCovoiturages()
    //     .pipe(map(res => res.filter(res => res.adresseDepart === this.filtrage.filter_VilleDepart_Value)));
    //     this.isVilleArriveeFilterDisabled = false;
    // }

    // else {
    //   if (this.filtrage.filter_VilleArrivee_value !== "") {
    //     this.covoiturages$ = this.covoiturageService.getAllCovoiturages()
    //       .pipe(map(res => res.filter(res => res.adresseArrivee === this.filtrage.filter_VilleArrivee_value)));
    //   }
    // }


    //Ca marche
    // this.covoiturageService.getAllCovoiturages().subscribe(countries => this.countries = countries);
    // this.countries.forEach(()=>this.countFilteredVilleDepart++ );
    // console.log(++this.countFilteredVilleDepart);
    // this.countFilteredVilleDepart = 0;
    let filteredItems: Covoiturage[] | undefined;
    this.covoiturageService.getAllCovoiturages().subscribe(res => filteredItems = res);
    return filteredItems;



  }




  onCreateCovoiturage(): void {
    let covoiturageToPush = {
      "nombrePlacesRestantes": 45,
      "dureeTrajet": 45,
      "distanceKm": 99,
      "adresseDepart": "1 place du menuet dansant 78350 Noisy les ardillons",
      "adresseArrivee": "87 avenue de Maupassant 23000 Guéret"
    }

    this.covoiturageService
      .create(covoiturageToPush)
      .subscribe(() => {
        /* this.listeCovoiturages.push */
      });
    //this.covoituragesAuComplet$ = this.covoiturageService.getAllCovoiturages();
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


}



/*  this.covoiturageService.create(this.covoiturageToPush).subscribe(covoiturageReceived => {
   this.createdCovoiturage = covoiturageReceived;});

   console.log("covoiturage créeeeeeeeee");
*/



