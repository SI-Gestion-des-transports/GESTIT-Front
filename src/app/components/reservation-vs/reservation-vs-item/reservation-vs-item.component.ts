import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";
import {Subscription} from "rxjs";
import {Utilisateur} from "../../../shared/models/utilisateur";

@Component({
  selector: 'app-reservation-vs-item',
  templateUrl: './reservation-vs-item.component.html',
  styleUrls: ['./reservation-vs-item.component.css']
})
export class ReservationVsItemComponent {


  @Input()
  resaVs : ReservationVs = {};
  //currentReservation : ReservationVs = this._reservationVsService.currentReservationVs;


  reservationVs: ReservationVs = {};
  allReservationsVs: ReservationVs [] = [];
  upcomingReservationsVsByUser: ReservationVs [] = [];
  pastReservationsVsByUser: ReservationVs [] = [];
  currentUser: Utilisateur = {};
  //currentVs: VehiculeService = {};
  currentReservationVs: ReservationVs = {};
  editedReservationVs: ReservationVs = {};
  modifBtn!: boolean;


  private _subscription = new Subscription();
  constructor(private _reservationVsService:ReservationVsService) {
  }

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
    this._subscription.add(
      this._reservationVsService.currentReservationVs$
        .subscribe(data => {
          this.currentReservationVs = data;
        })
    );
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

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
  }

  startUpdateResVs(resVSUpdated: ReservationVs){
    this._reservationVsService.updateModifBtn(false);
    this._reservationVsService.updateCurrentReservationVs(resVSUpdated);
    //this.startUpdateResVsFromItem.emit(resVSUpdated);
    //this._reservationVsService.update(resVSUpdated).subscribe();
  }

  delete(resVSDeleted: ReservationVs){
    this._reservationVsService.delete(resVSDeleted).subscribe();
  }

  featureResaVs(res: ReservationVs){
/*    console.log("featureResaVs (currentRes) : " + res.dateHeureRetour);
    this._reservationVsService.currentReservationVs = res;
    console.log("featureResaVs (currentRes Service) : " + this._reservationVsService.currentReservationVs.dateHeureRetour)*/
  }

  /*
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
  startUpdateResVsFromItem = new EventEmitter <ReservationVs>();*/

}
