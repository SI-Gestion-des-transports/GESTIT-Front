import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthentificationService} from "../shared/services/authentification.service";
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  /*Nota : la navigation se fait ici programmatiquement
  à l'aide du router*/
  constructor(private router: Router,
              private _authService: AuthentificationService) {

  }


  onContinue(): void {
    this.router.navigateByUrl('covoiturages');
  }

  ngOnInit(): void {
    if (window.localStorage.getItem(environment.JWT)) {
      this._authService.verifyJWT().subscribe(res=>{
        if (res.status!=200) {
          window.localStorage.removeItem(environment.JWT)
          this._authService.initEnviroVar()
        }else {
         this._authService.setEnviroVar(res.body);
        };
      })
    }else this._authService.initEnviroVar()
  }

}
