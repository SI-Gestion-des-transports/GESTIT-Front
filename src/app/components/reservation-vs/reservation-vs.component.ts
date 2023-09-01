import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReservationVsService} from "../../shared/services/reservation.vs.service";
import {ReservationVs} from "../../shared/models/reservation.vs";
import {Utilisateur} from "../../shared/models/utilisateur";

@Component({
  selector: 'app-reservation-vs',
  templateUrl: './reservation-vs.component.html',
  styleUrls: ['./reservation-vs.component.css']
})
export class ReservationVsComponent implements OnInit, OnChanges {

  @Input()
  user: Utilisateur={};

  reservationsVs:ReservationVs[]=[];

  reservationVs: ReservationVs = {};

  modifBtn:boolean = true;
  constructor(private _reservationVsService:ReservationVsService) {
}
  ngOnInit() {
    this._init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user){
      this._init();
      console.log(this.user.nom)
    }
  }

  private _init(){
    this._reservationVsService
      .findAll()
      .subscribe(reservations => {
        this.reservationsVs = reservations;
      });
  }

  create(reservationVs:ReservationVs){
    reservationVs.userId = this.user.id;
    console.log("Réservation : " + reservationVs.userId);
    console.log("Réservation : " + reservationVs.distanceKm);
    console.log("Réservation : " + reservationVs.dateHeureRetour);

    this._reservationVsService
      .create(reservationVs)
      .subscribe(() =>{
        this.reInitResVs();
        this._init();
    });

  }

  update(reservationVs:ReservationVs){
    this._reservationVsService
      .update(reservationVs)
      .subscribe(()=>{
        this.reInitResVs();
        this._init();
    })
  }

  delete(reservationVs:ReservationVs){
    this._reservationVsService
      .delete(reservationVs)
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


}
