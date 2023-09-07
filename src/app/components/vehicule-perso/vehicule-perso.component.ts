import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Utilisateur} from "../../shared/models/utilisateur";
import {VehiculePerso} from "../../shared/models/vehicule.perso";
import {Subscription} from "rxjs";
import {ReservationVsService} from "../../shared/services/reservation.vs.service";
import {Router} from "@angular/router";
import {VehiculePersoService} from "../../shared/services/vehicule.perso.service";

@Component({
  selector: 'app-vehicule-perso',
  templateUrl: './vehicule-perso.component.html',
  styleUrls: ['./vehicule-perso.component.css']
})
export class VehiculePersoComponent implements OnInit, OnChanges {

  currentUser: Utilisateur = {};
  currentVP: VehiculePerso = {};

  private _subscription = new Subscription();
  constructor(private   _vehiculePerosService:VehiculePersoService,
              private _router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }



}
