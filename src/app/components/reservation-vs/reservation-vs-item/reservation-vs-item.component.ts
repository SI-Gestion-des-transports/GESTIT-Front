import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";

@Component({
  selector: 'app-reservation-vs-item',
  templateUrl: './reservation-vs-item.component.html',
  styleUrls: ['./reservation-vs-item.component.css']
})
export class ReservationVsItemComponent {

  @Input()
  reservationVs : ReservationVs = {};

  featuredReservation : ReservationVs = {};

  modifBtn: boolean = true;


  constructor(private _reservationVsService: ReservationVsService) {
  }
  startUpdateResVs(resVSUpdated: ReservationVs){
    this.modifBtn = false;
    this.startUpdateResVsFromItem.emit(resVSUpdated);
    //this._reservationVsService.update(resVSUpdated).subscribe();
  }

  delete(resVSDeleted: ReservationVs){
    this._reservationVsService.delete(resVSDeleted).subscribe();
  }

  sendFeaturedRes(res: ReservationVs){
    if(res != this.featuredReservation){
      this.featuredReservation = res;
    } else {

      this.featuredReservation = {};
    }
    this.featuringVsFromItem.emit(this.featuredReservation);
  }

  @Output()
  featuringVsFromItem = new EventEmitter <ReservationVs>();

  @Output()
  startUpdateResVsFromItem = new EventEmitter <ReservationVs>();

}
