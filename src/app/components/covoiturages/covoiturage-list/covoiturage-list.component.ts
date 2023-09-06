import { ElementSchemaRegistry } from '@angular/compiler';
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

  disabledFilterVilleArrivee: boolean;
  disabledFilterVilleDepart: boolean;
  disabledFilterDate: boolean;

  isFoundedVilleArrivee: boolean;
  isFoundedVilleDepart: boolean;
  isFoundedDate: boolean;
  name: string;
  villeArrivee_searchValue: string;
  villeDepart_searchValue: string;
  date_searchValue: Date;

  placeholder_villeArrivee: string;

  VillesArrivee_liste: string[];

  covoiturages_listeComplete: Array<Covoiturage>;




  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {
    this.filtrage = new CovoiturageFiltrage();



    this.disabledFilterVilleDepart = true;
    this.disabledFilterDate = true;
    this.disabledFilterVilleArrivee = false;
    this.isFoundedVilleArrivee = false;
    this.isFoundedVilleDepart = false;
    this.isFoundedDate = false;
    this.placeholder_villeArrivee = "ville d'arrivée";
    this.villeArrivee_searchValue = "";
    this.villeDepart_searchValue = "";
    this.date_searchValue = null;
    this.filtrage.villeArrivee_liste = null;

    this.covoiturages_listeComplete = [];
    this.VillesArrivee_liste = [];
    this.setupFiltrage();
  }

  async setupFiltrage() {
    console.log("config filtrage");
    this.filtrage = new CovoiturageFiltrage();

    this.covoiturages_listeComplete = await this.covoiturageService.recupListeCovoituragesOnServer();

    let listThisDuplicateItems: string[] = [];
    this.covoiturages_listeComplete.forEach((covoit) => {
      listThisDuplicateItems.push(covoit.adresseArrivee.commune);
    });
    this.VillesArrivee_liste = Array.from(new Set(listThisDuplicateItems));
    
        
  }







  async onVilleDepart(event: any) {
    console.log("récupération input ville départ");
    this.filtrage.filter_VilleDepart_Value = event.target.value;
    this.filtrageListe_old();

  }

  async onVilleArrivee(event: any) {
    console.log("récupération input ville arrivée");
    this.filtrage.filter_VilleArrivee_value = event.target.value;
    this.filtrageListe_old();
  }

  async onDateEntree(event: any) {
    console.log("récupération input date");
    this.filtrage.filter_Date_value = event.target.value;
    this.filtrageListe_old();
  }
  onResetFiltrage() {

    this.ngOnInit();
    this.filtrageListe_old();
  }



  async filtrageListe_old() {
    // let completListOfCovoiturages = await this.covoiturageService.recupListeCovoituragesOnServer();
    // console.log("récupération de la liste OK");

    // if (this.filtrage.filter_VilleArrivee_value !== "") {
    //   this.disabledFilterVilleArrivee = false;
    //   let listeFiltree_villeArrivee = completListOfCovoiturages.filter((covoit) => covoit.adresseArrivee === this.filtrage.filter_VilleArrivee_value);
    //   if (listeFiltree_villeArrivee.length > 0) {
    //     this.isFoundedVilleArrivee = true;
    //     this.disabledFilterVilleDepart = false;
    //     this.disabledFilterDate = true;

    //     if (this.filtrage.filter_VilleDepart_Value !== "") {
    //       let listeFiltree_villeDepart = completListOfCovoiturages.filter((covoit) => covoit.adresseDepart === this.filtrage.filter_VilleDepart_Value);

    //       if (listeFiltree_villeDepart.length > 0) {
    //         this.disabledFilterVilleArrivee = true;
    //         this.isFoundedVilleDepart = true;
    //         this.disabledFilterDate = false;
    //         this.listeAafficher = listeFiltree_villeDepart;

    //         if (this.filtrage.filter_Date_value) {
    //           console.log("présence d'une date")
    //           console.log(this.filtrage.filter_Date_value);
    //           this.disabledFilterVilleDepart = true;
    //           this.disabledFilterVilleArrivee = true;

    //           let listeFiltree_byDate = listeFiltree_villeDepart.filter((covoit) => {
    //             const dateCovoit = new Date(covoit.dateDepart);
    //             const dateSouhaitee = new Date(this.filtrage.filter_Date_value);
    //             if(dateCovoit.getDate() !== dateSouhaitee.getDate()){
    //               return false;
    //             }
    //             if(dateCovoit.getMonth() !== dateSouhaitee.getMonth()){
    //               return false;
    //             }
    //             if(dateCovoit.getMonth() !== dateSouhaitee.getMonth()){
    //               return false;
    //             }
    //             if(dateCovoit.getFullYear() !== dateSouhaitee.getFullYear()){
    //               return false;
    //             }
    //             return true;
    //           });
    //           if (listeFiltree_byDate.length > 0) {
    //            this.isFoundedDate = true;
    //            this.listeAafficher = listeFiltree_byDate;

    //           }
    //           else {
    //             console.log("aucune date trouvée après filtrage");
    //             this.listeAafficher = listeFiltree_villeDepart;
    //             this.isFoundedDate = false;

    //           }
    //         }
    //         else {
    //           console.log("aucune date");
    //           console.log(this.filtrage.filter_Date_value)
    //           this.listeAafficher = listeFiltree_villeDepart;
    //         }


    //       }
    //       else {
    //         this.isFoundedVilleDepart = false;
    //         this.disabledFilterDate = true;
    //         this.disabledFilterVilleArrivee = true;
    //         this.listeAafficher = listeFiltree_villeArrivee;
    //       }
    //     }
    //     else {
    //       this.listeAafficher = listeFiltree_villeArrivee;
    //     }
    //   }
    //   else {
    //     this.disabledFilterVilleDepart = true;
    //     this.disabledFilterDate = true;
    //     this.listeAafficher = listeFiltree_villeArrivee;
    //     this.isFoundedVilleArrivee = false;
    //   }
    // }
    // else {
    //   this.disabledFilterVilleArrivee = false;
    //   console.log("le champ arrivé est vide");
    //   this.listeAafficher = completListOfCovoiturages;

  }



  // if (this.filtrage.filter_VilleDepart_Value !== "") {
  //   completListOfCovoiturages = await this.covoiturageService.recupListeCovoituragesOnServer();
  //   this.listeAafficher = completListOfCovoiturages.filter(covoit => covoit.adresseDepart === this.filtrage.filter_VilleDepart_Value);
  //   if (this.listeAafficher.length > 0) {
  //     this.disabledFilterVilleDepart = false;
  //     this.disabledFilterDate = true;
  //     if (this.filtrage.filter_VilleArrivee_value !== "") {
  //       let listeFiltreeParVilleArrivee = this.listeAafficher.filter(covoit => covoit.adresseArrivee === this.filtrage.filter_VilleArrivee_value);
  //       if (listeFiltreeParVilleArrivee.length > 0) {
  //         this.disabledFilterVilleDepart = false;
  //         this.disabledFilterDate = false;
  //       }
  //       else {
  //         this.disabledFilterVilleDepart = true;
  //         this.disabledFilterDate = true;
  //       }

  //     }
  //   }
  //   else {
  //     this.disabledFilterVilleDepart = true;
  //     this.disabledFilterDate = true;
  //   }

  // }
  // else {
  //   this.listeAafficher = await this.covoiturageService.recupListeCovoituragesOnServer();
  //   this.disabledFilterVilleDepart = true;
  // }




  async filtrageList() {

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




  // onCreateCovoiturage(): void {
  //   let covoiturageToPush = {
  //     "nombrePlacesRestantes": 45,
  //     "dureeTrajet": 45,
  //     "distanceKm": 99,
  //     "adresseDepart": "1 place du menuet dansant 78350 Noisy les ardillons",
  //     "adresseArrivee": "87 avenue de Maupassant 23000 Guéret"
  //   }

  //   this.covoiturageService
  //     .create(covoiturageToPush)
  //     .subscribe(() => {
  //       /* this.listeCovoiturages.push */
  //     });
  //this.covoituragesAuComplet$ = this.covoiturageService.getAllCovoiturages();
  // this._init();

  /* private _init() {
this.covoiturageService.findAll(this.user)
 .subscribe(covoiturages => {
   this.listeCovoiturages = covoiturages;
 }) */

}
  // private _init() {
  //   this.covoiturageService.getAllCovoiturages();

  // }






/*  this.covoiturageService.create(this.covoiturageToPush).subscribe(covoiturageReceived => {
   this.createdCovoiturage = covoiturageReceived;});

   console.log("covoiturage créeeeeeeeee");
*/



