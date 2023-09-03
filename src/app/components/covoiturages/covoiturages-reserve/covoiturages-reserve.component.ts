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
    
  }

  onShowDetails() {
    /* this.covoituragereserve.dureeTrajet++; */
    
  }
}
