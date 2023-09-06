import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Utilisateur} from "../../../shared/models/utilisateur";
import {ReservationVs} from "../../../shared/models/reservation.vs";
import {ReservationVsService} from "../../../shared/services/reservation.vs.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {VehiculeService} from "../../../shared/models/vehicule.service";
import {UtilisateursService} from "../../../shared/services/utilisateurs.service";
import {VehiculeServiceService} from "../../../shared/services/vehicule-service.service";

@Component({
  selector: 'app-reservation-vs-form',
  templateUrl: './reservation-vs-form.component.html',
  styleUrls: ['./reservation-vs-form.component.css']
})
export class ReservationVsFormComponent implements OnInit, OnChanges{

  resasVs:ReservationVs[]=[];
  resaVs: ReservationVs = {};

  reservationVs: ReservationVs = {};
  allReservationsVs: ReservationVs [] = [];
  upcomingReservationsVsByUser: ReservationVs [] = [];
  pastReservationsVsByUser: ReservationVs [] = [];
  currentUser: Utilisateur = {};
  currentVs: VehiculeService = {};
  vehiculesSrv: VehiculeService [] = [];
  currentReservationVs: ReservationVs = {};
  editedReservationVs: ReservationVs = {};
  modifBtn!: boolean;

  private _subscription = new Subscription();

  constructor(private _reservationVsService:ReservationVsService,
              private _utilisateurService: UtilisateursService,
              private _vehiculeSrvService: VehiculeServiceService,
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
    console.log("Réservation Form — Before SUBSCRIPTION / this.currentUser.id" + this.currentUser.id);
    this._subscription.add(
      this._utilisateurService.currentUser$
        .subscribe(data => {
          this.currentUser = data;
        })
    );
    console.log("Réservation Form — After SUBSCRIPTION / this.currentUser.id" + this.currentUser.id);
    this._subscription.add(
      this._reservationVsService.currentVs$
        .subscribe(data => {
          this.currentVs = data;
        })
    );
    this._subscription.add(
      this._vehiculeSrvService.vehiculesSrv$
        .subscribe(data => {
          this.vehiculesSrv = data}));
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
    if (this.currentUser){
      this._init();
      console.log(this.currentUser.nom)
      console.log("Réservation Form — ngOnChanges : currentUser");
    }
    if (this.reservationVs){
      console.log("Réservation Form — ngOnChanges : reservationVs");
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe(); // Se désabonner de tous les observables en une fois
  }

  private _init(){
    console.log("Réservation Form — _init");
    this._reservationVsService
      .findAll()
      .subscribe(reservations => {
        this.resasVs = reservations;
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log("Réservation Form — OnSubmit");
    if(this.currentReservationVs.id){
      this.update(this.reservationVs);
    } else if (!this.currentReservationVs.id){
      this.create(this.reservationVs);
    }
  }

  cancel(){
    console.log("Réservation Form — CANCEL");
    this.reInitResVs();
    this._router.navigateByUrl('reservationsvs/list');
  }

  create(reservationVs:ReservationVs){
    console.log("Réservation Form — CREATE / currentUser.id : " + this.currentUser.id)
    reservationVs.userId = this.currentUser.id;
    console.log("Réservation Form — CREATE / reservation.user.id : " + reservationVs.userId);
    this._reservationVsService
      .create(this.addSecondsToDate(reservationVs))
      .subscribe(() =>{
        this.reInitResVs();
        this._init();
        this._router.navigateByUrl('reservationsvs/list');
      });
  }

  update(updatedReservation : ReservationVs){
    console.log("Réservation Form — UPDATE / reservation.user.id : " + updatedReservation.userId);
    this._reservationVsService.update(updatedReservation).subscribe(() => {
      this.reInitResVs();
      this._router.navigateByUrl('reservationsvs/list');
    });
  }

  reInitResVs(){
    console.log("Réservation Form — ReInitVs");
    this._reservationVsService.updateCurrentReservationVs({});
    this._reservationVsService.updateModifBtn(true);
  }

  private addSecondsToDate(reservationVs: ReservationVs): ReservationVs {
    reservationVs.dateHeureDepart = `${reservationVs.dateHeureDepart}:00`;
    reservationVs.dateHeureRetour = `${reservationVs.dateHeureRetour}:00`;
    return reservationVs;
  }



}
