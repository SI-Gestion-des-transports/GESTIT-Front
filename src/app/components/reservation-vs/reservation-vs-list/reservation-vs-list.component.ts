import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";

@Component({
  selector: 'app-reservation-vs-list',
  templateUrl: './reservation-vs-list.component.html',
  styleUrls: ['./reservation-vs-list.component.css']
})
export class ReservationVsListComponent implements OnInit{

  @Input()
  user: Utilisateur={};

  reservationsVs:ReservationVs[]=[];

  featuredResVs: ReservationVs = {};

  constructor(private _reservationVsService:ReservationVsService) {
  }

  ngOnInit() {
    this._init();
  }

  private _init(){
    this._reservationVsService
      .findAll()
      .subscribe(resservationsvs => {this.reservationsVs = resservationsvs});
  }

  featuringResVs($event: ReservationVs){
    console.log($event.dateHeureRetour);
    this.featuredResVs = $event;
    this.featuringVsFromList.emit(this.featuredResVs);
  }

  startUpdateResVs($event:ReservationVs){
    this.startUpdateResVsFromList.emit($event);
  }

  @Output()
  featuringVsFromList = new EventEmitter <ReservationVs>();

  @Output()
  startUpdateResVsFromList = new EventEmitter <ReservationVs>();

}
