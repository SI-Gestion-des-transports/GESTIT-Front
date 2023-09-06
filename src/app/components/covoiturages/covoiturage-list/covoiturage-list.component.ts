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

  covoituragesAuComplet$!: Observable<Covoiturage[]>;
  covoituragesFiltres$!: Observable<Covoiturage[]>;

  covoituragesByIdUser$!: Observable<Covoiturage[]>;
  covoiturageToPush!: Covoiturage;
  value!: number;
  value_str!: string;
  filtrage!: CovoiturageFiltrage;
  listeFiltree!: Covoiturage[];
  listeAremplir!: Covoiturage[];
  isVilleArriveeFilterDisabled!: boolean;
  countFilteredVilleDepart!: number;
  countries: Covoiturage[] = [];

  listeServeur: Array<Covoiturage>;


  //
  covoituragesToShow$: Observable<Covoiturage[]>;
  listeAafficher: Array<Covoiturage>;





  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {

    this.filtrage = new CovoiturageFiltrage();
    this.isVilleArriveeFilterDisabled = true;
    this.countFilteredVilleDepart = 0;
    this.covoituragesToShow$ = this.covoiturageService.getAllCovoiturages();
    let listeToShow = this.covoiturageService.recupListeCovoituragesOnServer();
    listeToShow.then((res) => this.listeAafficher = res);

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


  async onVilleDepart(event: any) {

    let filterName: string = event.target.value;
    if (filterName !== "") {
      let list = await this.covoiturageService.recupListeCovoituragesOnServer();
      let filteredByVilleDepart = list.filter((covoit) => covoit.adresseDepart === filterName);
      this.listeAafficher = filteredByVilleDepart;
    }
    else{
      this.covoiturageService.recupListeCovoituragesOnServer()
      .then(res=>this.listeAafficher = res);
    }

    //Ceci marche mais comment recupérer le résultat?
    // let listeComplete: any;
    // console.log("lancement de la promesse:")
    // this.covoiturageService.getAllCovoiturages()
    //   .subscribe(arrayCovoits => arrayCovoits.forEach(covoit => {
    //     listeComplete.push(covoit)
    //   }));

  }













  /*  if (result) {
     resolve(result)
   }
   else {
     reject()
   } */


  /* calcul.then((result)=>{
    console.log('resultat:'+result);
  }).catch(()=>{
      console.log("oops, erreur")
  }) */




  //utilisation


  /*  async recupCovoituragesFromServer(): Promise<Covoiturage[][]> {
     let listeCovoiturages: Array<Covoiturage[]> = [];
     await this.covoiturageService.getAllCovoiturages()
       .forEach((covoit) => listeCovoiturages.push(covoit));
     return listeCovoiturages;
   }
   
   async recup():Array<Covoiturage[]>{
     let listeCovoiturages: Array<Covoiturage[]> = [];
     const resultPromise = new Promise((resolve, reject) => {
       resolve(this.covoiturageService.getAllCovoiturages()
             .forEach((covoit)=>listeCovoiturages.push(covoit)));
     })
     return listeCovoiturages
   } */














  /* const filtered=listeServ.filter(covoit => covoit.adresseDepart === filterName);
  console.log(filtered); */

  /*configuration du filtre et désactivation de son pendant*/
  //this.filtrage.filter_VilleDepart_Value = event.target.value;
  //this.filtrage.filter_VilleArrivee_value = '';

  /*Application du filtre*/
  //ca marche
  // let ages: any[] = [];/*<=== ca MARCHE*/ p
  // this.covoiturageService.getAllCovoiturages()
  //   .forEach((i) => ages.push(i));

  // let listeFiltree:any = ages.(age=>age.onVilleDepart==='Paris');
  // console.log("affichage de la liste filtrée");
  // console.log(listeFiltree); 

  /*  let ages:any = [];
  this.covoiturageService.getAllCovoiturages()
    .subscribe(value=>ages = value); */




  /* console.log(result);
  filteredResearch = ages.filter((res:any) => res.adresseDepart===this.filtrage.filter_VilleDepart_Value);
  console.log("Afficahge liste filtree");
  console.log(filteredResearch); */
  /* let listeFiltree:any = this.filtreur(covoituragesListeComplete);
  console.log("affichage de la liste filtrée");
  console.log(listeFiltree); */

  // }











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
    this.covoituragesAuComplet$ = this.covoiturageService.getAllCovoiturages();
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
    this.covoituragesAuComplet$.pipe(filter(value => value === null));
  }
}



/*  this.covoiturageService.create(this.covoiturageToPush).subscribe(covoiturageReceived => {
   this.createdCovoiturage = covoiturageReceived;});

   console.log("covoiturage créeeeeeeeee");
*/



