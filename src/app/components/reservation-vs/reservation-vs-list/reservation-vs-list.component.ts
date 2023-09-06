import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation-vs-list',
  templateUrl: './reservation-vs-list.component.html',
  styleUrls: ['./reservation-vs-list.component.css']
})
export class ReservationVsListComponent implements OnInit{
  @Input()
  user: Utilisateur={};
  /*
  reservationsVs:ReservationVs[]=[];
  featuredResVs: ReservationVs = {};
  */


  reservationVs: ReservationVs = {};
  allReservationsVs: ReservationVs [] = [];
  upcomingReservationsVsByUser: ReservationVs [] = [];
  pastReservationsVsByUser: ReservationVs [] = [];
  currentUser: Utilisateur = {};
  //currentVs: VehiculeService = {};
  currentReservationVs: ReservationVs = {};
  editedReservationVs: ReservationVs = {};
  modifBtn!: boolean;

  upcompingReservations : boolean = true;


  private _subscription = new Subscription();
  constructor(private _reservationVsService:ReservationVsService,
              private _router: Router) {
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
    this._init();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
  }

  private _init(){
    this._reservationVsService
      .findAll()
      .subscribe(reservationsvs => {this.allReservationsVs = reservationsvs});

    this.upcompingReservations = true;
    this._reservationVsService.findUpcomingByUserId(this.currentUser.id).subscribe(upcomingRes => this.upcomingReservationsVsByUser = upcomingRes)

  }

  getPasReservations(){
    this.upcompingReservations = false;
    this._reservationVsService.findPastByUserId(this.currentUser.id).subscribe(pastRes => this.pastReservationsVsByUser = pastRes);
  }

  getIncomingReservations(){
    this._init();
  }

  newReservation(){
    this._reservationVsService.updateReservationVs({})
    this._router.navigateByUrl('reservationsvs-form');
  }

  startUpdateResVs(reservationToEdit:ReservationVs){
    this._reservationVsService.updateModifBtn(false);
    this._reservationVsService.updateCurrentReservationVs(reservationToEdit);
    this._reservationVsService.updateReservationVs(reservationToEdit);
    this._router.navigateByUrl('reservationsvs-form');
    //this.startUpdateResVsFromList.emit(reservationToEdit);
  }

  deleteReservationVs(reservationToDelete: ReservationVs){
    this._router.navigateByUrl('reservationsvs-item');
    this._reservationVsService.updateCurrentReservationVs(reservationToDelete);
/*    this._reservationVsService.delete(reservationToDelete).subscribe(() =>
      this._init()
    );*/
  }

  /*
  removeSecondsToDate(reservationVs: ReservationVs): ReservationVs{
    reservationVs.dateHeureDepart?.slice(0, 16);
    reservationVs.dateHeureRetour?.slice(0, 16);
    return reservationVs;
  }

  extractDate(dateTime?: string): string {
    return dateTime?.split('T')[0] ?? '';
  }
  extractTime(dateTime?: string): string {
    return dateTime?.split('T')[1]?.slice(0,5) ?? '';
  }
  */

}
