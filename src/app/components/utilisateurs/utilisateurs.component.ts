import {Component, OnInit} from '@angular/core';
import {UtilisateursService} from "../../shared/services/utilisateurs.service";
import {Utilisateur} from "../../shared/models/utilisateur";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit{

  users:Utilisateur[]=[];

  user:Utilisateur={};

  userFeatured:Utilisateur={};
  constructor(private _utilisateursService:UtilisateursService) {
  }

  ngOnInit() {
    this._init();
  }

  private _init(){
    this._utilisateursService
      .findAll()
      .subscribe(users => {
        this.users = users;
      });
  }

  create(user:Utilisateur){
    console.log("Création utilisateur :" + user.nom);
    this._utilisateursService
      .create(user)
      .subscribe(()=> {
        this.reInitUser();
        this._init();
      });
  }

  update(userUpdated:Utilisateur){
    console.log("updated"+ userUpdated)
    this._utilisateursService.update(userUpdated).subscribe(()=> {
      this.reInitUser();
      this._init();
    });

  }

  delete(user:Utilisateur){
    this._utilisateursService
      .delete(user)
      .subscribe(()=> {
        this.reInitUser();
        this._init();
      });
  }

  reInitUser() {
    this.user = {};
  }

}
