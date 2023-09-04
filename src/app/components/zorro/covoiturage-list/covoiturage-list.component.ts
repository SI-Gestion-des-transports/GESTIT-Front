import { Component, OnInit } from '@angular/core';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import { CovoiturageService } from 'src/app/shared/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-list',
  templateUrl: './covoiturage-list.component.html',
  styleUrls: ['./covoiturage-list.component.css']
})
export class CovoiturageListComponent implements OnInit {
  
  covoituragesAinserer!:Covoiturage[];
  
  /*Injection du service dans le composant*/
  constructor(private covoiturageService:CovoiturageService){}
  ngOnInit(): void {
    this.covoituragesAinserer = this.covoiturageService.getAllCovoiturages();
  }

}
