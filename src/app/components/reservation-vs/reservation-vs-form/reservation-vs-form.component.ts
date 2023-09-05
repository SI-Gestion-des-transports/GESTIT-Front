import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";

@Component({
  selector: 'app-reservation-vs-form',
  templateUrl: './reservation-vs-form.component.html',
  styleUrls: ['./reservation-vs-form.component.css']
})
export class ReservationVsFormComponent implements OnInit, OnChanges{

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
      .create(this.transformDate(reservationVs))
      .subscribe(() =>{
        this.reInitResVs();
        this._init();
      });

  }

  reInitResVs(){

  }

  private transformDate(reservationVs: ReservationVs): ReservationVs {
    reservationVs.dateHeureDepart = `${reservationVs.dateHeureDepart}:00`;
    reservationVs.dateHeureRetour = `${reservationVs.dateHeureRetour}:00`;
    return reservationVs;
  }

}
