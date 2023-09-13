import {Component, HostListener, Input, OnInit} from '@angular/core';
import { Covoiturage_old } from './shared/models/covoiturage_old';
import { Covoiturage } from './shared/models/covoiturage';
import {AuthentificationService} from "./shared/services/authentification.service";
import {environment} from "../environments/environment.development";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GESTIT-Front';

  constructor(private _authService:AuthentificationService) {
  }
  @HostListener('window:beforeunload',['$event'])
  unloadHandler(event:BeforeUnloadEvent){
    if (environment.check){

    }else {
      event.preventDefault();
      fetch(environment.urlApi.logout,
        {
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'JWT-TOKEN': window.localStorage.getItem(environment.JWT)
          }
        }
      ).then(res=>{
        window.localStorage.removeItem(environment.JWT);
        window.close();
      });
    }


  }

  ngOnInit(): void {
   /* if(window.localStorage.getItem("JWT-TOKEN") != null) {
      window.localStorage.removeItem(`JWT-TOKEN`);
    }*/
  }
}
