import {Component, OnInit} from '@angular/core';
import {UtilisateursService} from "../../shared/services/utilisateurs.service";
import {Router} from "@angular/router";
import {Utilisateur} from "../../shared/models/utilisateur";
import {Login} from "../../shared/models/login";
import {AuthentificationService} from "../../shared/services/authentification.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Subscription} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {


  loggedUser: Utilisateur = {};
  unLoggedUser: Login = {};
  email: string | undefined;
  password: string | undefined;
  userId: number = undefined;


  // Données partagées : subscribe from services
  headers = new HttpHeaders();
  currentUserId: number = null;
  loggedBtn: boolean = false;

  private _subscription = new Subscription();

  constructor(private _authService: AuthentificationService,
              private _utilisateurService: UtilisateursService,
              private _router: Router) {
  }

  seConnecter() {
    console.log(this.unLoggedUser.email);
    console.log(this.unLoggedUser);

    this._authService.login(this.unLoggedUser).subscribe({
      next:data=>{
        console.log(data.status);
          //console.log("AuthComp — seConnecter / login.subs(data['JWT-TOKEN']) : " + data['JWT-TOKEN']);
          console.log("AuthComp — seConnecter / login.subs(data) : " + data['JWT-TOKEN']);
          //console.log("AuthComp — seConnecter / login.subs(data['userId']) : " + data['userId']);
          this.userId = data['userId'];
          console.log("AuthComp — seConnecter / this.userId : " + this.userId);
          this._utilisateurService.updateCurrentUserId(this.userId);
          window.localStorage.setItem("JWT-TOKEN", data['JWT-TOKEN']);
          console.log("AuthComp — seConnecter / this.headers : ", this.headers);
          this.headers = this.headers.set("JWT-TOKEN", data['JWT-TOKEN']);
          console.log("AuthComp — seConnecter / this.headers.get(\"JWT-TOKEN\") : ", this.headers.get("JWT-TOKEN"));
          console.log("AuthComp — seConnecter / this.headers.keys() : ", this.headers.keys());
          this.headers.keys().forEach(key => {
            console.log("AuthComp — seConnecter / key:value : ", `${key}: ${this.headers.get(key)}`);
          });
          this.userId = data['userId'];
          this._authService.updateLoggedBtn(true);
          console.log("AuthComp — seConnecter / loggedBtn : ",this.loggedBtn);
          this._authService.updateHeaders(data);
          this._router.navigateByUrl('');
      },
      //show error username or password is incorrect
      error: e=>{
        console.log("error");
      }
    });
    this.unLoggedUser = {};
  }

  createAccount() {
    this._router.navigateByUrl('utilisateurs');
  }

  ngOnInit(): void {
    this._authService.updateLoggedBtn(false);
    this._authService.updateHeaders(new HttpHeaders());
    this._subscription.add(
      this._authService.headers$
        .subscribe(data => {
          this.headers = data;
        })
    );
    this._subscription.add(
      this._utilisateurService.currentIdUser$
        .subscribe(data => {
          this.currentUserId = data;
        })
    );
    this._subscription.add(
      this._authService.loggedBtn$
        .subscribe(data => {
          this.loggedBtn = data;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
