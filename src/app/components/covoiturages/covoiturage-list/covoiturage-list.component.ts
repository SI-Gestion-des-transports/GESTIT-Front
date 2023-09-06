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
  listeFiltree!: Covoiturage[];
  listeAremplir!: Covoiturage[];
  isVilleArriveeFilterDisabled!:boolean;
  countFilteredVilleDepart!:number;
  countries:Covoiturage[] = [];





  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {
    this.covoiturages$ = this.covoiturageService.getAllCovoiturages();
    this.covoituragesByIdUser$ = this.covoiturageService.getAllCovoiturages();
    this.filtrage = new CovoiturageFiltrage();
    this.isVilleArriveeFilterDisabled = true;
    this.countFilteredVilleDepart =0;

  }

  onKey(event: any) { // without type info
    this.value = +event.target.value;
    this.covoituragesByIdUser$ = this.covoiturageService.getFilteredbyUsersCovoit(this.value);
  }


  /* Politique de filtrage:
  La liste de tous les covoiturages s'affiche par défaut au démarrage de la page.
  Deux types de filtrage sont possibles:
  -> La liste peut-être affichée filtrée par l'adresse de départ OU d'arrivée
  -> La liste peut-être également filtrée par date;
  Donc résultat filtrage = (Ville départ XOR ville d'arrivée)ET date.
  */


  onVilleDepart(event: any) {
    console.log("event detectéd");
    this.filtrage.filter_VilleDepart_Value = event.target.value;
    //this.filtrage.filter_VilleArrivee_value = '';
   /* let cocov!:Covoiturage[];
    this.covoiturageService.getAllCovoiturages()
    .subscribe(res => cocov = res); */
   
 
  var covoituragesListeComplete:any = [];
  this.covoiturageService.getAllCovoiturages()
  .forEach((i) => covoituragesListeComplete.push(i) );
  
  console.log(covoituragesListeComplete);

    
   
     
  }
    
  
    

  

  onVilleArrivee(event: any) {
    this.filtrage.filter_VilleArrivee_value = event.target.value;
    this.filtrage.filter_VilleDepart_Value = '';
  }


  listFiltering(filtres:CovoiturageFiltrage){
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
    let filteredItems: Covoiturage[]|undefined;
    this.covoiturageService.getAllCovoiturages().subscribe(res=> filteredItems = res);
    return filteredItems;
   
    
    
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



