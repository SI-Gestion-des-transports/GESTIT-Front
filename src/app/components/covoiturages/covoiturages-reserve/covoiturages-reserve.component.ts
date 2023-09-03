import { Component, Input, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageReserveProv } from 'src/app/shared/models/covoiturageReserveProv';

@Component({
  selector: 'app-covoiturages-reserve',
  templateUrl: './covoiturages-reserve.component.html',
  styleUrls: ['./covoiturages-reserve.component.css']
})
export class CovoituragesReserveComponent implements OnInit {
  @Input() covoituragereserve!:CovoiturageReserveProv;
  
  title!:string;
 

  constructor() { }

  ngOnInit(): void {
    this.title = "Mon covoiturage";
    this.covoituragereserve.id = 1;
    this.covoituragereserve.nombrePlacesRestantes = 2;
    this.covoituragereserve.dureeTrajet = 102;
    this.covoituragereserve.distanceKm = 75;
    this.covoituragereserve.dateDepart = new Date();
    this.covoituragereserve.adresseDepart = "25 rue des Cornouailles 75000 Paris";
    this.covoituragereserve.adresseArrivee = "45 place des vignobles royaux 33000 Bordeaux";
    this.covoituragereserve.organisateur = undefined;
    this.covoituragereserve.passagers = undefined;
    this.covoituragereserve.vehiculePerso=undefined
  }

  onShowDetails() {
    /* this.covoituragereserve.dureeTrajet++; */
    
  }
}
