import {Component, Input} from '@angular/core';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";

@Component({
  selector: 'app-reservation-vs-list',
  templateUrl: './reservation-vs-list.component.html',
  styleUrls: ['./reservation-vs-list.component.css']
})
export class ReservationVsListComponent {

  @Input()
  user: Utilisateur={};

  reservationsVs:ReservationVs[]=[];

  constructor(private _reservationVsService:ReservationVsService) {
  }


}
