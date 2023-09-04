import { Component, OnInit } from '@angular/core';
import { CovoiturageReserveProv } from 'src/app/shared/models/covoiturageReserveProv';
import { CovoiturageProvService } from 'src/app/shared/services/covoiturageProv.service';

@Component({
  selector: 'app-covoiturages-reserves-list',
  templateUrl: './covoiturages-reserves-list.component.html',
  styleUrls: ['./covoiturages-reserves-list.component.css']
})
export class CovoituragesReservesListComponent implements OnInit {
  
  covoituragesAinserer!:CovoiturageReserveProv[];
  
  /*Injection du service dans le composant*/
  constructor(private covoiturageProvService:CovoiturageProvService){}
  ngOnInit(): void {
    this.covoituragesAinserer = this.covoiturageProvService.getAllCovoiturages();
  }

}
