import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from '../../shared/services/utilisateurs.service';
import { Utilisateur } from '../../shared/models/utilisateur';
import { Covoiturage } from 'src/app/shared/models/covoiturage';
import {ReservationVsService} from "../../shared/services/reservation.vs.service";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css'],
})
export class UtilisateursComponent implements OnInit {
  users: Utilisateur[] = [];

  user: Utilisateur = {};

  loggedUser: Utilisateur = {};

  userFeatured: Utilisateur = {};

  modifBtn: boolean = true;

  loggedBtn: boolean = true;

  constructor(private _utilisateursService: UtilisateursService,
              private _reservationVsService: ReservationVsService) {}

  ngOnInit() {
    this._init();
  }

  private _init() {
    this._utilisateursService.findAll().subscribe((users) => {
      this.users = users;
    });
  }

  create(user: Utilisateur) {
    console.log('Création utilisateur :' + user.nom);
    this._utilisateursService.create(user).subscribe(() => {
      this.reInitUser();
      this._init();
    });
  }

  update(userUpdated: Utilisateur) {
    console.log('updated' + userUpdated);
    this._utilisateursService.update(userUpdated).subscribe(() => {
      this.reInitUser();
      this._init();
      this.modifBtn = true;
    });
  }

  delete(user: Utilisateur) {
    console.log('Entrée delete' + user.id);
    this._utilisateursService.delete(user).subscribe(() => {
      this.reInitUser();
      this._init();
    });
    console.log('Sortie delete' + user.id);
  }

  loginUser(user: Utilisateur) {
    this.loggedUser = user;
    console.log('User logged : ' + this.loggedUser.nom);
    this.loggedBtn = false;
    this._reservationVsService.updateCurrentUser(user);
    console.log("logged from resVsServ : "+ this._reservationVsService.currentUser$);
  }

  logout() {
    this.loggedUser = {};
    this.loggedBtn = true;
    this._reservationVsService.updateCurrentUser({});
  }

  startUpdateUser(user: Utilisateur) {
    console.log('strated update');
    this.user = user;
    this.modifBtn = false;
  }

  undoUpdate() {
    this.modifBtn = !this.modifBtn;
    this.reInitUser();
    this._init();
  }

  reInitUser() {
    this.user = {};
  }
}
