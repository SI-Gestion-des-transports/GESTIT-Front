
import { Component, OnInit } from '@angular/core';
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
	arrivee_disabledFilter: boolean;
	arrivee_isFounded: boolean;
	arrivee_searchValue: string;
	arrivee_liste: string[];
	arrivee_style_widget: string;

	/*Gestion du filtre sur la ville de départ*/
	depart_verrouillageWidget: boolean;
	depart_isFounded: boolean;
	depart_searchValue: string;
	depart_liste: string[];
	depart_styleWidget: string;

	/*gestion du filtre sur la date*/
	date_verrouillageWidget: boolean;
	date_isFounded: boolean;
	date_searchValue: Date;
	date_styleWidget: string;

	/*Injection du service*/
	constructor(private covoiturageService: CovoiturageService) { }

	/*initialisation de la page*/
	ngOnInit(): void {
		this.filtrage = new CovoiturageFiltrage();
		this.covoiturages_listeComplete = [];
		this.recupVilles();

		this.arrivee_disabledFilter = false;
		this.arrivee_isFounded = false;
		this.placeholder_villeArrivee = "ville d'arrivée";
		this.arrivee_searchValue = "";
		this.filtrage.villeArrivee_liste = null;
		this.arrivee_liste = [];
		this.arrivee_style_widget = this.WIDGET_STYLE_INIT;

		this.depart_verrouillageWidget = true;
		this.depart_isFounded = false;
		this.date_verrouillageWidget = true;
		this.depart_searchValue = "";
		this.depart_styleWidget = this.WIDGET_STYLE_INIT;

		this.date_searchValue = null;
		this.date_styleWidget = this.WIDGET_STYLE_DATE_INIT;
		this.date_isFounded = false;

		this.filtrageList();
		//this.covoiturages$ = this.covoiturageService.getAllCovoiturages();
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
		this.arrivee_liste = Array.from(new Set(listVilleArriveeWhithDuplicateItems));

		let listVilleDepartWhithDuplicateItems: string[] = [];
		this.covoiturages_listeComplete.forEach((covoit) => {
			listVilleDepartWhithDuplicateItems.push(covoit.adresseDepart.commune);
		});
		this.depart_liste = Array.from(new Set(listVilleDepartWhithDuplicateItems));
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
      //console.log("demande init");
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




	/*  onCreateCovoiturage(): void {
		this.covoiturageToPush = {
		  nombrePlacesRestantes: 45,
		  dureeTrajet: 45,
		  distanceKm: 99,
		  /!*       "adresseDepart": "1 place du menuet dansant 78350 Noisy les ardillons",
		  "adresseArrivee": "87 avenue de Maupassant 23000 Guéret" *!/
		};

		this.covoiturageService.create(this.covoiturageToPush).subscribe(() => {
		  /!* this.listeCovoiturages.push *!/
		});
		//this.covoiturages$ = this.covoiturageService.getAllCovoiturages();
		// this._init();

		/!* private _init() {
	  this.covoiturageService.findAll(this.user)
	   .subscribe(covoiturages => {
		 this.listeCovoiturages = covoiturages;
	   }) *!/
	  }*/

	/*
	private _init() {
	  this.covoiturageService.getAllCovoiturages();


	  /**
	   *Réinitialisation du filtrage
	   *
	   * @Author Atsuhiko Mochizuki
	   */
	onResetFiltrage() {
		this.ngOnInit();
		this.depart_liste = [];
		this.arrivee_liste = [];
		this.filtrageList();
	}



	/**
	 * Traitement du filtrage de la listes de covoiturages côté passager
	 *
	 * @author Atsuhiko Mochizuki
	 */
	async filtrageList() {
    //console.log("il rentre dnas le filtrage");
		let completListOfCovoiturages = await this.covoiturageService.recupListeCovoituragesOnServer();
		if (this.filtrage.filter_VilleArrivee_value !== "") {
      //console.log("des filtres ont été activés");
			let arrivee_listeFiltree = completListOfCovoiturages.filter((covoit) => covoit.adresseArrivee.commune === this.filtrage.filter_VilleArrivee_value);
			if (arrivee_listeFiltree.length > 0) {
				this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
				this.arrivee_disabledFilter = false;
				this.depart_styleWidget = this.WIDGET_STYLE_INIT;
				this.depart_verrouillageWidget = false;
				filtre_Date_style_widget: null;
				this.date_verrouillageWidget = true;
				this.listeAafficher = arrivee_listeFiltree;
				this.arrivee_isFounded = true;
				this.depart_isFounded = false;
				this.date_isFounded = false;

				if (this.filtrage.filter_VilleDepart_Value !== "") {
					let listeFiltree_villeDepart = arrivee_listeFiltree.filter((covoit) => covoit.adresseDepart.commune === this.filtrage.filter_VilleDepart_Value);
					if (listeFiltree_villeDepart.length > 0) {
						this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
						this.arrivee_disabledFilter = true;
						this.depart_styleWidget = this.WIDGET_STYLE_SUCCESS;
						this.depart_verrouillageWidget = false;
						filtre_Date_style_widget: null;
						this.date_verrouillageWidget = false;

						this.listeAafficher = listeFiltree_villeDepart;
						this.arrivee_isFounded = true;
						this.depart_isFounded = true;
						this.date_isFounded = false;

						if (this.filtrage.filter_Date_value) {
              //console.log("présence d'une date")
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
								this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
								this.arrivee_disabledFilter = true;
								this.depart_styleWidget = this.WIDGET_STYLE_SUCCESS;
								this.depart_verrouillageWidget = true;
								this.date_styleWidget = this.WIDGET_STYLE_DATE_SUCCESS;
								this.date_verrouillageWidget = false;
								this.listeAafficher = listeFiltree_byDate;
								this.arrivee_isFounded = true;
								this.depart_isFounded = true;
								this.date_isFounded = true;
							}
							else {
								this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
								this.arrivee_disabledFilter = true;
								this.depart_styleWidget = this.WIDGET_STYLE_SUCCESS;
								this.depart_verrouillageWidget = true;
								this.date_styleWidget = this.WIDGET_STYLE_DATE_INPROGRESS;
								this.date_verrouillageWidget = false;

								this.listeAafficher = listeFiltree_villeDepart;
								this.arrivee_isFounded = true;
								this.depart_isFounded = true;
								this.date_isFounded = false;
							}
						}
						else {
							this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
							this.arrivee_disabledFilter = true;
							this.depart_styleWidget = this.WIDGET_STYLE_SUCCESS;
							this.depart_verrouillageWidget = false;
							filtre_Date_style_widget: null;
							this.date_verrouillageWidget = false;


							this.listeAafficher = listeFiltree_villeDepart;
							this.arrivee_isFounded = true;
							this.depart_isFounded = true;
							this.date_isFounded = false;
						}
					}
					else {
						this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
						this.arrivee_disabledFilter = true;
						this.depart_styleWidget = this.WIDGET_STYLE_INPROGRESS;
						this.depart_verrouillageWidget = false;
						filtre_Date_style_widget: null;
						this.date_verrouillageWidget = true;
						this.listeAafficher = arrivee_listeFiltree;
						this.arrivee_isFounded = true;
						this.depart_isFounded = false;
						this.date_isFounded = false;
					}
				}
				else {
					this.arrivee_style_widget = this.WIDGET_STYLE_SUCCESS;
					this.arrivee_disabledFilter = false;
					this.depart_styleWidget = this.WIDGET_STYLE_INIT;
					this.depart_verrouillageWidget = false;
					filtre_Date_style_widget: null;
					this.date_verrouillageWidget = true;
					this.listeAafficher = arrivee_listeFiltree;
					this.arrivee_isFounded = true;
					this.depart_isFounded = false;
					this.date_isFounded = false;
				}
			}
			else {
				this.arrivee_style_widget = this.WIDGET_STYLE_INPROGRESS;
				this.arrivee_disabledFilter = false;
				this.depart_styleWidget = this.WIDGET_STYLE_INIT;
				this.depart_verrouillageWidget = false;
				filtre_Date_style_widget: null;
				this.date_verrouillageWidget = true;
				this.listeAafficher = arrivee_listeFiltree;
				this.arrivee_isFounded = false;
				this.depart_isFounded = false;
				this.date_isFounded = false;
			}
		}
		else {
			this.arrivee_style_widget = this.WIDGET_STYLE_INIT;
			this.arrivee_disabledFilter = false;
			this.depart_styleWidget = this.WIDGET_STYLE_INIT;
			this.depart_verrouillageWidget = true;
			filtre_Date_style_widget: null;
			this.date_verrouillageWidget = true;
			this.listeAafficher = completListOfCovoiturages;
			this.arrivee_isFounded = false;
			this.depart_isFounded = false;
			this.date_isFounded = false;
		}
	}
}




/*  this.covoiturageService.create(this.covoiturageToPush).subscribe(covoiturageReceived => {
	 this.createdCovoiturage = covoiturageReceived;});

	 console.log("covoiturage créeeeeeeeee");
*/

