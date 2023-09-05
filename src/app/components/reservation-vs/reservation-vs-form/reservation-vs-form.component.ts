import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation-vs-form',
  templateUrl: './reservation-vs-form.component.html',
  styleUrls: ['./reservation-vs-form.component.css']
})
export class ReservationVsFormComponent implements OnInit, OnChanges{

  @Input()
  user: Utilisateur={};
  resasVs:ReservationVs[]=[];
  resaVs: ReservationVs = {};

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

  constructor(private _reservationVsService:ReservationVsService,
              private _router: Router) {
  }

  ngOnInit() {

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

  ngOnChanges(changes: SimpleChanges) {
    if (this.user){
      this._init();
      console.log(this.user.nom)
      this._reservationVsService.updateCurrentUser(this.user);
    }
    if (this.reservationVs){
      console.log("Form : reservation changed")
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
  }

  private _init(){
    this._reservationVsService
      .findAll()
      .subscribe(reservations => {
        this.resasVs = reservations;
      });
  }

  create(reservationVs:ReservationVs){
    reservationVs.userId = this.currentUser.id;
    console.log("Réservation : " + reservationVs.userId);
    console.log("Réservation : " + reservationVs.dateHeureRetour);
    this._reservationVsService
      .create(this.addSecondsToDate(reservationVs))
      .subscribe(() =>{
        this.reInitResVs();
        this._init();
        this._router.navigateByUrl('reservationsvs-list');
      });
  }

  update(updatedReservation : ReservationVs){
    this._reservationVsService.update(updatedReservation).subscribe(() => {
      this.reInitResVs();
      this._router.navigateByUrl('reservationsvs-list');
    });
  }

  reInitResVs(){
    this._reservationVsService.updateCurrentReservationVs({});
    this._reservationVsService.updateModifBtn(true);
  }

  private addSecondsToDate(reservationVs: ReservationVs): ReservationVs {
    reservationVs.dateHeureDepart = `${reservationVs.dateHeureDepart}:00`;
    reservationVs.dateHeureRetour = `${reservationVs.dateHeureRetour}:00`;
    return reservationVs;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if(this.currentReservationVs.id){
      this.update(this.reservationVs);
    } else if (!this.currentReservationVs.id){
      this.create(this.reservationVs);
    }
  }

  cancel(){
    this.reInitResVs();
    this._router.navigateByUrl('reservationsvs-list');
  }

}
