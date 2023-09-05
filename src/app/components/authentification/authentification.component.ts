import { Component } from '@angular/core';
import {UtilisateursService} from "../../shared/services/utilisateurs.service";
import {Router} from "@angular/router";
import {Utilisateur} from "../../shared/models/utilisateur";
import {Login} from "../../shared/models/login";
import {AuthentificationService} from "../../shared/services/authentification.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {


  loggedUser : Utilisateur = {};
  unLoggedUser: Login = {};
  email: string|undefined;
  password: string|undefined;

  constructor(private _authService: AuthentificationService,
              private _utilisateurService : UtilisateursService,
              private _router : Router) {
  }

  seConnecter(){
    console.log(this.unLoggedUser.email);
    this._authService.login(this.unLoggedUser);
    this.unLoggedUser = {};
  }

  createAccount() {
    this._router.navigateByUrl('utilisateurs');
  }
}
