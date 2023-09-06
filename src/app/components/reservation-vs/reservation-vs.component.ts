import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReservationVsService} from "../../shared/services/reservation.vs.service";
import {ReservationVs} from "../../shared/models/reservation.vs";
import {Utilisateur} from "../../shared/models/utilisateur";
import {VehiculeService} from "../../shared/models/vehicule.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reservation-vs',
  templateUrl: './reservation-vs.component.html',
  styleUrls: ['./reservation-vs.component.css']
})
export class ReservationVsComponent implements OnInit, OnChanges {

  @Input()
  user: Utilisateur={};

  reservationVs: ReservationVs = {};
  allReservationsVs: ReservationVs [] = [];
  upcomingReservationsVsByUser: ReservationVs [] = [];
  pastReservationsVsByUser: ReservationVs [] = [];
  currentUser: Utilisateur = {};
  //currentVs: VehiculeService = {};
  currentReservationVs: ReservationVs = {};
  editedReservationVs: ReservationVs = {};
  modifBtn!:boolean;

  private _subscription = new Subscription();
  constructor(private _reservationVsService:ReservationVsService) {
}
/*  ngOnInit() {
    this.allReservationsVs = this._reservationVsService.allReservationsVs;
    this.user = this._reservationVsService.currentUser;
    this.currentReservationVs = this._reservationVsService.currentReservationVs;
    this._init();
  }*/

  ngOnInit(): void {
    this._subscription.add(
      this._reservationVsService.reservationVs$.
      subscribe(data => {
        this.reservationVs = data;
      })
    );
    this._subscription.add(
      this._reservationVsService.allReservationsVs$
        .subscribe(data => {
        this.allReservationsVs = data;
      })
    );
    this._subscription.add(
      this._reservationVsService.upcomingReservationsVsByUser$
        .subscribe(data => {
        this.upcomingReservationsVsByUser = data;
      })
    );
    this._subscription.add(
      this._reservationVsService.pastReservationsVsByUser$
        .subscribe(data => {
          this.pastReservationsVsByUser = data;
        })
    );
    this._subscription.add(
      this._reservationVsService.currentUser$
        .subscribe(data => {
        this.currentUser = data;
      })
    );
/*    this._subscription.add(
      this._reservationVsService.currentVs$
        .subscribe(data => {
        this.currentVs = data;
      })
    );*/
    console.log(this.currentReservationVs.dateHeureRetour);

    this._subscription.add(
      this._reservationVsService.currentReservationVs$
        .subscribe(data => {
        this.currentReservationVs = data;
      })
    );
    console.log(this.currentReservationVs.dateHeureRetour);
    this._subscription.add(
      this._reservationVsService.editedReservationVs$
        .subscribe(data => {
        this.editedReservationVs = data;
      })
    );
    this._subscription.add(
      this._reservationVsService.modifBtn$
        .subscribe(data => {
          this.modifBtn = data;
        })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user){
      this._init();
      console.log("On changes (user.nom) : " + this.user.nom)
    }
    if (this.currentReservationVs.dateHeureRetour != undefined){
      console.log("On changes (currentRes) : " + this.currentReservationVs.dateHeureRetour)
      console.log("TADA")
      console.log(this.currentReservationVs.dateHeureRetour)
      this._init();
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
  }

  private _init(){
    this._reservationVsService
      .findAll();
/*      .subscribe(reservations => {
        this.reservationsVs = reservations;
      });*/
  }

  create(reservationVs:ReservationVs){
    reservationVs.userId = this.user.id;
    console.log("Réservation : " + reservationVs.userId);
    console.log("Réservation : " + reservationVs.dateHeureRetour);
    this._reservationVsService
      .create(reservationVs)
      .subscribe(() =>{
        this.reInitResVs();
        this._init();
    });
  }

  update(resVSUpdated:ReservationVs){
    this._reservationVsService
      .update(resVSUpdated)
      .subscribe(()=>{
        this.reInitResVs();
        this._init();
    })
  }

  delete(resVSDeleted:ReservationVs){
    this._reservationVsService
      .delete(resVSDeleted)
      .subscribe(() => {
      this.reInitResVs();
      this._init()
    })
  }

  startUpdateResaVs(reservationVs:ReservationVs){
    console.log("strated update")
    this.reservationVs = reservationVs;
    this.modifBtn = false;
  }

  undoUpdate(){
    this.modifBtn = !this.modifBtn;
    this.reInitResVs();
    this._init();
  }

  reInitResVs(){
  }


  featuringResVs($event: ReservationVs) {
    this.currentReservationVs = $event;
  }

  startUpdateResVs($event: ReservationVs){
    this.startUpdateResaVs($event);
  }
}
