import { Component, Input, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/shared/models/covoiturage';

@Component({
  selector: 'app-covoiturages-reserve',
  templateUrl: './covoiturages-reserve.component.html',
  styleUrls: ['./covoiturages-reserve.component.css']
})
export class CovoituragesReserveComponent implements OnInit {
  @Input() covoituragereserve!:Covoiturage;
  
  title!:string;
  id!: number;
  dateDepart!: Date;
  distance_km!: number;
  duree_trajet!: number;
  nombre_places_restantes!: number;
  adresse_arrivee_id!: number;
  adresse_depart_id!: number;
  organisateur_id!: number;
  vehicule_perso_id!: number;

  constructor() { }

  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.id = 1;
    this.dateDepart = new Date();
    this.distance_km = 102;
    this.duree_trajet = 75;
    this.nombre_places_restantes = 2;
    this.adresse_arrivee_id = 2;
    this.adresse_depart_id = 3;
    this.organisateur_id = 4;
    this.vehicule_perso_id = 2;
  }

  onShowDetails() {
    this.duree_trajet++;
    
  }
}
