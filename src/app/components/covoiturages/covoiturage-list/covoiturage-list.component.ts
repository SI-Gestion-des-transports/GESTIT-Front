import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CovoiturageFiltrage } from 'src/app/shared/models/CovoiturageFiltrage';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';

/**
 * Gestion visuelle de l'interface dédiée aux covoiturages
 * côté passager
 * 
 * @author Atsuhiko Mochizuki
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

	buttonStyleInit: string;
	buttonStyleInProgress: string;
	buttonStyleFoundResult: string;

	name: string;
	placeholder_villeArrivee: string;
	selectedCity: string;
	villeDepart: string;

	/*Recueuille les choix de filtre de l'utilisateur*/
	filtrage!: CovoiturageFiltrage;

	/*Se chargera d'afficher la liste filtrée en fonction des choix utilisateur*/
	listeAafficher: Array<Covoiturage>;

	covoiturages_listeComplete: Array<Covoiturage>;

	/*Gestion du filtre sur la ville d'arrivée*/
	disabledFilterVilleArrivee: boolean;
	isFoundedVilleArrivee: boolean;
	villeArrivee_searchValue: string;
	VillesArrivee_liste: string[];
	filtre_Arrivee_style_widget: string;

	/*Gestion du filtre sur la ville de départ*/
	disabledFilterVilleDepart: boolean;
	isFoundedVilleDepart: boolean;
	villeDepart_searchValue: string;
	VillesDepart_liste: string[];
	filtre_Depart_style_widget: string;

	/*gestion du filtre sur la date*/
	disabledFilterDate: boolean;
	isFoundedDate: boolean;
	date_searchValue: Date;
	filtre_Date_style_widget: string;

	/*Injection du service*/
	constructor(private covoiturageService: CovoiturageService) { }

	/*initialisation de la page*/
	ngOnInit(): void {
		this.filtrage = new CovoiturageFiltrage();
		this.covoiturages_listeComplete = [];
		this.recupVilles();

		this.disabledFilterVilleArrivee = false;
		this.isFoundedVilleArrivee = false;
		this.placeholder_villeArrivee = "ville d'arrivée";
		this.villeArrivee_searchValue = "";
		this.filtrage.villeArrivee_liste = null;
		this.VillesArrivee_liste = [];
		this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_INIT;

		this.disabledFilterVilleDepart = true;
		this.isFoundedVilleDepart = false;
		this.disabledFilterDate = true;
		this.villeDepart_searchValue = "";
		this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;

		this.date_searchValue = null;
		this.filtre_Date_style_widget = this.WIDGET_STYLE_DATE_INIT;
		this.isFoundedDate = false;

		this.filtrageList();
	}

	/**
	 * Récupère sur le serveur la liste des covoiturages enregistrés, puis 
	 * en extrait les villes pour pourvoir les intégrer par la suite aux dropdown
	 * 
	 * @author Atsuhimo Mochizuki
	 */
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

	/**
	 * Récupère la donnée transmise par l'évènement
	 * @param event 
	 * 
	 * @Author Atsuhiko Mochizuki
	 */
	onFiltrageVilleArriveeChanged(event: any): void {
		this.filtrage.filter_VilleArrivee_value = event.target.value;

		if (this.filtrage.filter_VilleArrivee_value === "--Ville d'arrivée--") {
			console.log("demande init");
			this.filtrage.filter_VilleArrivee_value = "";
		}

		this.filtrageList();
	}

	/**
	 * Récupère la donnée transmise par l'évènement
	 * @param event 
	 * 
	 * @Author Atsuhiko Mochizuki
	 */
	onFiltrageVilleDepartChanged(event: any): void {
		this.filtrage.filter_VilleDepart_Value = event.target.value;

		if (this.filtrage.filter_VilleDepart_Value === "--Ville de départ--") {
			console.log("demande init");
			this.filtrage.filter_VilleDepart_Value = "";
		}

		this.filtrageList();
	}

	/**
	 * Récupère la donnée transmise par l'évènement
	 * @param event 
	 * 
	 * @Author Atsuhiko Mochizuki
	 */
	async onDateEntree(event: any) {
		this.filtrage.filter_Date_value = event.target.value;
		this.filtrageList();
	}

	/**
	 *Réinitialisation du filtrage
	 * 
	 * @Author Atsuhiko Mochizuki
	 */
	onResetFiltrage() {
		this.ngOnInit();
		this.filtrageList();
	}


	/**
	 * Traitement du filtrage de la listes de covoiturages côté passager
	 * 
	 * @author Atsuhiko Mochizuki
	 */
	async filtrageList() {
		console.log("il rentre dnas le filtrage");
		let completListOfCovoiturages = await this.covoiturageService.recupListeCovoituragesOnServer();
		if (this.filtrage.filter_VilleArrivee_value !== "") {
			console.log("des filtres ont été activés");
			let arrivee_listeFiltree = completListOfCovoiturages.filter((covoit) => covoit.adresseArrivee.commune === this.filtrage.filter_VilleArrivee_value);
			if (arrivee_listeFiltree.length > 0) {
				this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
				this.disabledFilterVilleArrivee = false;
				this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
				this.disabledFilterVilleDepart = false;
				filtre_Date_style_widget: null;
				this.disabledFilterDate = true;
				this.listeAafficher = arrivee_listeFiltree;
				this.isFoundedVilleArrivee = true;
				this.isFoundedVilleDepart = false;
				this.isFoundedDate = false;

				if (this.filtrage.filter_VilleDepart_Value !== "") {
					let listeFiltree_villeDepart = arrivee_listeFiltree.filter((covoit) => covoit.adresseDepart.commune === this.filtrage.filter_VilleDepart_Value);
					if (listeFiltree_villeDepart.length > 0) {
						this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
						this.disabledFilterVilleArrivee = true;
						this.filtre_Depart_style_widget = this.WIDGET_STYLE_SUCCESS;
						this.disabledFilterVilleDepart = false;
						filtre_Date_style_widget: null;
						this.disabledFilterDate = false;

						this.listeAafficher = listeFiltree_villeDepart;
						this.isFoundedVilleArrivee = true;
						this.isFoundedVilleDepart = true;
						this.isFoundedDate = false;

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
								this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
								this.disabledFilterVilleArrivee = true;
								this.filtre_Depart_style_widget = this.WIDGET_STYLE_SUCCESS;
								this.disabledFilterVilleDepart = true;
								this.filtre_Date_style_widget = this.WIDGET_STYLE_DATE_SUCCESS;
								this.disabledFilterDate = false;
								this.listeAafficher = listeFiltree_byDate;
								this.isFoundedVilleArrivee = true;
								this.isFoundedVilleDepart = true;
								this.isFoundedDate = true;
							}
							else {
								this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
								this.disabledFilterVilleArrivee = true;
								this.filtre_Depart_style_widget = this.WIDGET_STYLE_SUCCESS;
								this.disabledFilterVilleDepart = true;
								this.filtre_Date_style_widget = this.WIDGET_STYLE_DATE_INPROGRESS;
								this.disabledFilterDate = false;

								this.listeAafficher = listeFiltree_villeDepart;
								this.isFoundedVilleArrivee = true;
								this.isFoundedVilleDepart = true;
								this.isFoundedDate = false;
							}
						}
						else {
							this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
							this.disabledFilterVilleArrivee = true;
							this.filtre_Depart_style_widget = this.WIDGET_STYLE_SUCCESS;
							this.disabledFilterVilleDepart = false;
							filtre_Date_style_widget: null;
							this.disabledFilterDate = false;


							this.listeAafficher = listeFiltree_villeDepart;
							this.isFoundedVilleArrivee = true;
							this.isFoundedVilleDepart = true;
							this.isFoundedDate = false;
						}
					}
					else {
						this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
						this.disabledFilterVilleArrivee = true;
						this.filtre_Depart_style_widget = this.WIDGET_STYLE_INPROGRESS;
						this.disabledFilterVilleDepart = false;
						filtre_Date_style_widget: null;
						this.disabledFilterDate = true;
						this.listeAafficher = arrivee_listeFiltree;
						this.isFoundedVilleArrivee = true;
						this.isFoundedVilleDepart = false;
						this.isFoundedDate = false;
					}
				}
				else {
					this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
					this.disabledFilterVilleArrivee = false;
					this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
					this.disabledFilterVilleDepart = false;
					filtre_Date_style_widget: null;
					this.disabledFilterDate = true;
					this.listeAafficher = arrivee_listeFiltree;
					this.isFoundedVilleArrivee = true;
					this.isFoundedVilleDepart = false;
					this.isFoundedDate = false;
				}
			}
			else {
				this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_INPROGRESS;
				this.disabledFilterVilleArrivee = false;
				this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
				this.disabledFilterVilleDepart = false;
				filtre_Date_style_widget: null;
				this.disabledFilterDate = true;
				this.listeAafficher = arrivee_listeFiltree;
				this.isFoundedVilleArrivee = false;
				this.isFoundedVilleDepart = false;
				this.isFoundedDate = false;
			}
		}
		else {
			this.filtre_Arrivee_style_widget = this.WIDGET_STYLE_INIT;
			this.disabledFilterVilleArrivee = false;
			this.filtre_Depart_style_widget = this.WIDGET_STYLE_INIT;
			this.disabledFilterVilleDepart = true;
			filtre_Date_style_widget: null;
			this.disabledFilterDate = true;
			this.listeAafficher = completListOfCovoiturages;
			this.isFoundedVilleArrivee = false;
			this.isFoundedVilleDepart = false;
			this.isFoundedDate = false;
		}
	}
}