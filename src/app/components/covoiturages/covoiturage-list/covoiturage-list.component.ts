import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CovoiturageFiltrage } from 'src/app/shared/models/CovoiturageFiltrage';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';


/**
 * Gestion de l'interface concernant les covoiturages, 
 * au niveau passager
 * @Author Atsuhiko Mochizuki
 * 
 */
@Component({
	selector: 'app-covoiturage-list',
	templateUrl: './covoiturage-list.component.html',
	styleUrls: ['./covoiturage-list.component.css']
})
export class CovoiturageListComponent implements OnInit {

	/*Styles dynamiques*/
	WIDGET_STYLE_INIT = "btn btn-secondary dropdown-toggle";
	WIDGET_STYLE_INPROGRESS = "btn btn-danger dropdown-toggle";
	WIDGET_STYLE_SUCCESS = "btn btn-success dropdown-toggle";
	WIDGET_STYLE_DATE_INIT = "background-color:white";
	WIDGET_STYLE_DATE_INPROGRESS = "background-color:red";
	WIDGET_STYLE_DATE_SUCCESS = "background-color:green";

	/*Contiendra les filtres saisis par l'utilisateur*/
	filtrage!: CovoiturageFiltrage;

	listeAafficher: Array<Covoiturage>;
	covoiturages_listeComplete: Array<Covoiturage>;

	selectedCity: string;
	villeDepart: string;

	/*Gestion visuelle du filtre villes d'arrivée*/
	arrivee_verrouillageDropDown: boolean;
	arrivée_villeIsFounded: boolean;
	arrivee_searchValue: string;
	arrivee_listeForDropDown: string[];
	arrivee_style_widget: string;

	/*Gestion visuelle du filtre villes de départ*/
	depart_verrouillageDropDown: boolean;
	depart_villeIsFounded: boolean;
	depart_searchValue: string;
	depart_listeForDropDown: string[];
	depart_style_widget: string;

	date_verrouillageDatePicker: boolean;
	date_dateIsFounded: boolean;
	date_searchValue: Date;
	date_style_widget: string;

	buttonStyleInit: string;
	buttonStyleInProgress: string;
	buttonStyleFoundResult: string;

	name: string;
	// placeholder_villeArrivee: string;

	constructor(private covoiturageService: CovoiturageService) { }

	ngOnInit(): void {
		this.filtrage = new CovoiturageFiltrage();
		this.arrivee_style_widget = this.WIDGET_STYLE_INIT;
		this.arrivee_verrouillageDropDown = false;
		this.depart_style_widget = this.WIDGET_STYLE_INIT;
		this.depart_verrouillageDropDown = true;
		this.date_style_widget = this.WIDGET_STYLE_DATE_INIT;
		this.date_verrouillageDatePicker = true;
		this.arrivée_villeIsFounded = false;
		this.depart_villeIsFounded = false;
		this.date_dateIsFounded = false;
		this.filtrageList();
	}

	async recupVilles() {

		this.covoiturages_listeComplete = await this.covoiturageService.recupListeCovoituragesOnServer();

		let arrivee_listWithDuplicateItems: string[] = [];
		this.covoiturages_listeComplete.forEach((covoit) => {
			arrivee_listWithDuplicateItems.push(covoit.adresseArrivee.commune);
		});
		this.arrivee_listeForDropDown = Array.from(new Set(arrivee_listWithDuplicateItems));

		let depart_listWithDuplicateItems: string[] = [];
		this.covoiturages_listeComplete.forEach((covoit) => {
			depart_listWithDuplicateItems.push(covoit.adresseDepart.commune);
		});
		this.depart_listeForDropDown = Array.from(new Set(depart_listWithDuplicateItems));
	}

	onFiltrageVilleArriveeChanged(event: any): void {
		this.filtrage.filter_VilleArrivee_value = event.target.value;

		if (this.filtrage.filter_VilleArrivee_value === "--Ville d'arrivée--") {
			this.filtrage.filter_VilleArrivee_value = "";
		}
		this.filtrageList();
	}

	onFiltrageVilleDepartChanged(event: any): void {
		this.filtrage.filter_VilleDepart_Value = event.target.value;

		if (this.filtrage.filter_VilleDepart_Value === "--Ville de départ--") {
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
				this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
				//verrouillage
				this.arrivee_verrouillageDropDown = false;
				//départ
				//couleur widget
				this.depart_style_widget = this.WIDGET_STYLE_INIT;
				//verrouillage
				this.depart_verrouillageDropDown = false;
				//date
				//couleur widget
				filtre_Date_style_widget: null;
				//verrouillage
				this.date_verrouillageDatePicker = true;

				//liste à affciher
				this.listeAafficher = arrivee_listeFiltree;
				//Is founded
				//arrivée
				this.arrivée_villeIsFounded = true;
				//depart
				this.depart_villeIsFounded = false;
				//date
				this.date_dateIsFounded = false;

				if (this.filtrage.filter_VilleDepart_Value !== "") {
					let listeFiltree_villeDepart = arrivee_listeFiltree.filter((covoit) => covoit.adresseDepart.commune === this.filtrage.filter_VilleDepart_Value);
					if (listeFiltree_villeDepart.length > 0) {
						//arrivée
						//style widget
						this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
						//verrouillage
						this.arrivee_verrouillageDropDown = true;
						//départ
						//couleur widget
						this.depart_style_widget = this.WIDGET_STYLE_SUCCESS;
						//verrouillage
						this.depart_verrouillageDropDown = false;
						//date
						//couleur widget
						filtre_Date_style_widget: null;
						//verrouillage
						this.date_verrouillageDatePicker = false;

						//liste à affciher
						this.listeAafficher = listeFiltree_villeDepart;
						//Is founded
						//arrivée
						this.arrivée_villeIsFounded = true;
						//depart
						this.depart_villeIsFounded = true;
						//date
						this.date_dateIsFounded = false;

						if (this.filtrage.filter_Date_value) {
							console.log("présence d'une date")
							let listeFiltree_byDate = listeFiltree_villeDepart.filter((covoit) => {
								const dateCovoit = new Date(covoit.dateDepart);
								const dateSouhaitee = new Date(this.filtrage.filter_Date_value);
								if (dateCovoit.getDate() !== dateSouhaitee.getDate()) {
									return false;
								}
								if (dateCovoit.getMonth() !== dateSouhaitee.getMonth()) {
									return false;
								}
								if (dateCovoit.getMonth() !== dateSouhaitee.getMonth()) {
									return false;
								}
								if (dateCovoit.getFullYear() !== dateSouhaitee.getFullYear()) {
									return false;
								}
								return true;
							});
							if (listeFiltree_byDate.length > 0) {
								//arrivée
								//style widget
								this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
								//verrouillage
								this.arrivee_verrouillageDropDown = true;
								//départ
								//couleur widget
								this.depart_style_widget = this.WIDGET_STYLE_SUCCESS;
								//verrouillage
								this.depart_verrouillageDropDown = true;
								//date
								//couleur widget
								this.date_style_widget = this.WIDGET_STYLE_DATE_SUCCESS;
								//verrouillage
								this.date_verrouillageDatePicker = false;

								//liste à affciher
								this.listeAafficher = listeFiltree_byDate;
								//Is founded
								//arrivée
								this.arrivée_villeIsFounded = true;
								//depart
								this.depart_villeIsFounded = true;
								//date
								this.date_dateIsFounded = true;
							}
							else {
								//arrivée
								//style widget
								this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
								//verrouillage
								this.arrivee_verrouillageDropDown = true;
								//départ
								//couleur widget
								this.depart_style_widget = this.WIDGET_STYLE_SUCCESS;
								//verrouillage
								this.depart_verrouillageDropDown = true;
								//date
								//couleur widget
								this.date_style_widget = this.WIDGET_STYLE_DATE_INPROGRESS;
								//verrouillage
								this.date_verrouillageDatePicker = false;

								//liste à affciher
								this.listeAafficher = listeFiltree_villeDepart;
								//Is founded
								//arrivée
								this.arrivée_villeIsFounded = true;
								//depart
								this.depart_villeIsFounded = true;
								//date
								this.date_dateIsFounded = false;
							}
						}
						else {
							//arrivée
							//style widget
							this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
							//verrouillage
							this.arrivee_verrouillageDropDown = true;
							//départ
							//couleur widget
							this.depart_style_widget = this.WIDGET_STYLE_SUCCESS;
							//verrouillage
							this.depart_verrouillageDropDown = false;
							//date
							//couleur widget
							filtre_Date_style_widget: null;
							//verrouillage
							this.date_verrouillageDatePicker = false;

							//liste à affciher
							this.listeAafficher = listeFiltree_villeDepart;
							//Is founded
							//arrivée
							this.arrivée_villeIsFounded = true;
							//depart
							this.depart_villeIsFounded = true;
							//date
							this.date_dateIsFounded = false;
						}

					}
					else {
						//arrivée
						//style widget
						this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
						//verrouillage
						this.arrivee_verrouillageDropDown = true;
						//départ
						//couleur widget
						this.depart_style_widget = this.WIDGET_STYLE_INPROGRESS;
						//verrouillage
						this.depart_verrouillageDropDown = false;
						//date
						//couleur widget
						filtre_Date_style_widget: null;
						//verrouillage
						this.date_verrouillageDatePicker = true;

						//liste à affciher
						this.listeAafficher = arrivee_listeFiltree;
						//Is founded
						//arrivée
						this.arrivée_villeIsFounded = true;
						//depart
						this.depart_villeIsFounded = false;
						//date
						this.date_dateIsFounded = false;
					}
				}
				else {
					//arrivée
					//style widget
					this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
					//verrouillage
					this.arrivee_verrouillageDropDown = false;
					//départ
					//couleur widget
					this.depart_style_widget = this.WIDGET_STYLE_INIT;
					//verrouillage
					this.depart_verrouillageDropDown = false;
					//date
					//couleur widget
					filtre_Date_style_widget: null;
					//verrouillage
					this.date_verrouillageDatePicker = true;

					//liste à affciher
					this.listeAafficher = arrivee_listeFiltree;
					//Is founded
					//arrivée
					this.arrivée_villeIsFounded = true;
					//depart
					this.depart_villeIsFounded = false;
					//date
					this.date_dateIsFounded = false;
				}
			}
			else {
				//arrivée
				//style widget
				this.arrivee_style_widget = this.WIDGET_STYLE_INPROGRESS;
				//verrouillage
				this.arrivee_verrouillageDropDown = false;
				//départ
				//couleur widget
				this.depart_style_widget = this.WIDGET_STYLE_INIT;
				//verrouillage
				this.depart_verrouillageDropDown = false;
				//date
				//couleur widget
				filtre_Date_style_widget: null;
				//verrouillage
				this.date_verrouillageDatePicker = true;

				//liste à affciher
				this.listeAafficher = arrivee_listeFiltree;
				//Is founded
				//arrivée
				this.arrivée_villeIsFounded = false;
				//depart
				this.depart_villeIsFounded = false;
				//date
				this.date_dateIsFounded = false;
			}
		}
		else {
			console.log("aucun filtre activé pour le moment");
			//arrivée
			//style widget
			this.arrivee_style_widget = this.WIDGET_STYLE_INIT;
			//verrouillage
			this.arrivee_verrouillageDropDown = false;
			//départ
			//couleur widget
			this.depart_style_widget = this.WIDGET_STYLE_INIT;
			//verrouillage
			this.depart_verrouillageDropDown = true;
			//date
			//couleur widget
			filtre_Date_style_widget: null;
			//verrouillage
			this.date_verrouillageDatePicker = true;

			//liste à affciher
			this.listeAafficher = completListOfCovoiturages;
			//Is founded
			//arrivée
			this.arrivée_villeIsFounded = false;
			//depart
			this.depart_villeIsFounded = false;
			//date
			this.date_dateIsFounded = false;
		}
	}
}