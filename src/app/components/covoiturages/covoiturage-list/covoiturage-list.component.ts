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

	WIDGET_STYLE_INIT = "btn btn-secondary dropdown-toggle";
	WIDGET_STYLE_INPROGRESS = "btn btn-danger dropdown-toggle";
	WIDGET_STYLE_SUCCESS = "btn btn-success dropdown-toggle";



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
	VillesDepart_liste: string[];

	covoiturages_listeComplete: Array<Covoiturage>;
	selectedCity: string;
	villeDepart: string;
	buttonStyleInit: string;
	buttonStyleInProgress: string;
	buttonStyleFoundResult: string;

	filtre_Arrivee_style_widget: string;
	filtre_Depart_style_widget: string;
	filtre_Date_style_widget: string;






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

		this.recupVilles();
		this.selectedCity = "Vegeta";
		this.villeDepart = "sangoku";


		this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_INIT;

		this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
		//filtre_Date_style_widget: null;
		this.filtrageList();


	}

	async recupVilles() {


		this.covoiturages_listeComplete = await this.covoiturageService.recupListeCovoituragesOnServer();

		let listVilleArriveeWhithDuplicateItems: string[] = [];
		this.covoiturages_listeComplete.forEach((covoit) => {
			listVilleArriveeWhithDuplicateItems.push(covoit.adresseArrivee.commune);
		});
		this.VillesArrivee_liste = Array.from(new Set(listVilleArriveeWhithDuplicateItems));

		let listVilleDepartWhithDuplicateItems: string[] = [];
		this.covoiturages_listeComplete.forEach((covoit) => {
			listVilleDepartWhithDuplicateItems.push(covoit.adresseDepart.commune);
		});
		this.VillesDepart_liste = Array.from(new Set(listVilleDepartWhithDuplicateItems));
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

	onFiltrageVilleArriveeChanged(event: any): void {
		this.filtrage.filter_VilleArrivee_value = event.target.value;
		
		if (this.filtrage.filter_VilleArrivee_value === "--Ville d'arrivée--") {
			console.log("demande init");
			this.filtrage.filter_VilleArrivee_value = "";
		}

		this.filtrageList();
	}

	onFiltrageVilleDepartChanged(event: any): void {
		this.filtrage.filter_VilleDepart_Value = event.target.value;
		
		if (this.filtrage.filter_VilleDepart_Value === "--Ville de départ--") {
			console.log("demande init");
			this.filtrage.filter_VilleDepart_Value = "";
		}

		this.filtrageList();
	}

	async onDateEntree(event: any) {
		this.filtrage.filter_Date_value = event.target.value;
		this.filtrageList();
	}

	onResetFiltrage() {

		this.ngOnInit();
		this.filtrageList();
	}



	async filtrageList() {
		console.log("il rentre dnas le filtrage");
		let completListOfCovoiturages = await this.covoiturageService.recupListeCovoituragesOnServer();
		if (this.filtrage.filter_VilleArrivee_value !== "") {
			console.log("des filtres ont été activés");
			let arrivee_listeFiltree = completListOfCovoiturages.filter((covoit) => covoit.adresseArrivee.commune === this.filtrage.filter_VilleArrivee_value);
			if (arrivee_listeFiltree.length > 0) {
				//arrivée
				//style widget
				this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
				//verrouillage
				this.disabledFilterVilleArrivee = false;
				//départ
				//couleur widget
				this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
				//verrouillage
				this.disabledFilterVilleDepart = false;
				//date
				//couleur widget
				filtre_Date_style_widget: null;
				//verrouillage
				this.disabledFilterDate = true;

				//liste à affciher
				this.listeAafficher = arrivee_listeFiltree;
				//Is founded
				//arrivée
				this.isFoundedVilleArrivee = true;
				//depart
				this.isFoundedVilleDepart = false;
				//date
				this.isFoundedDate = false;

				if (this.filtrage.filter_VilleDepart_Value !== "") {
					let listeFiltree_villeDepart = arrivee_listeFiltree.filter((covoit) => covoit.adresseDepart.commune === this.filtrage.filter_VilleDepart_Value);
					if (listeFiltree_villeDepart.length > 0) {
						//arrivée
						//style widget
						this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
						//verrouillage
						this.disabledFilterVilleArrivee = true;
						//départ
						//couleur widget
						this.filtre_Depart_style_widget = this.WIDGET_STYLE_SUCCESS;
						//verrouillage
						this.disabledFilterVilleDepart = false;
						//date
						//couleur widget
						filtre_Date_style_widget: null;
						//verrouillage
						this.disabledFilterDate = false;

						//liste à affciher
						this.listeAafficher = listeFiltree_villeDepart;
						//Is founded
						//arrivée
						this.isFoundedVilleArrivee = true;
						//depart
						this.isFoundedVilleDepart = true;
						//date
						this.isFoundedDate = false;
					}
					else {
						//arrivée
						//style widget
						this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
						//verrouillage
						this.disabledFilterVilleArrivee = true;
						//départ
						//couleur widget
						this.filtre_Depart_style_widget = this.WIDGET_STYLE_INPROGRESS;
						//verrouillage
						this.disabledFilterVilleDepart = false;
						//date
						//couleur widget
						filtre_Date_style_widget: null;
						//verrouillage
						this.disabledFilterDate = true;

						//liste à affciher
						this.listeAafficher = arrivee_listeFiltree;
						//Is founded
						//arrivée
						this.isFoundedVilleArrivee = true;
						//depart
						this.isFoundedVilleDepart = false;
						//date
						this.isFoundedDate = false;
					}





				}
				else {
					//arrivée
					//style widget
					this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
					//verrouillage
					this.disabledFilterVilleArrivee = false;
					//départ
					//couleur widget
					this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
					//verrouillage
					this.disabledFilterVilleDepart = false;
					//date
					//couleur widget
					filtre_Date_style_widget: null;
					//verrouillage
					this.disabledFilterDate = true;

					//liste à affciher
					this.listeAafficher = arrivee_listeFiltree;
					//Is founded
					//arrivée
					this.isFoundedVilleArrivee = true;
					//depart
					this.isFoundedVilleDepart = false;
					//date
					this.isFoundedDate = false;
				}
			}
			else {
				//arrivée
				//style widget
				this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_INPROGRESS;
				//verrouillage
				this.disabledFilterVilleArrivee = false;
				//départ
				//couleur widget
				this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
				//verrouillage
				this.disabledFilterVilleDepart = false;
				//date
				//couleur widget
				filtre_Date_style_widget: null;
				//verrouillage
				this.disabledFilterDate = true;

				//liste à affciher
				this.listeAafficher = arrivee_listeFiltree;
				//Is founded
				//arrivée
				this.isFoundedVilleArrivee = false;
				//depart
				this.isFoundedVilleDepart = false;
				//date
				this.isFoundedDate = false;
			}
		}
		else {
			console.log("aucun filtre activé pour le moment");
			//arrivée
			//style widget
			this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_INIT;
			//verrouillage
			this.disabledFilterVilleArrivee = false;
			//départ
			//couleur widget
			this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
			//verrouillage
			this.disabledFilterVilleDepart = true;
			//date
			//couleur widget
			filtre_Date_style_widget: null;
			//verrouillage
			this.disabledFilterDate = true;

			//liste à affciher
			this.listeAafficher = completListOfCovoiturages;
			//Is founded
			//arrivée
			this.isFoundedVilleArrivee = false;
			//depart
			this.isFoundedVilleDepart = false;
			//date
			this.isFoundedDate = false;
		}
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



